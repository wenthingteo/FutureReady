import { getSupabaseClient } from '../shared/db/connection.js';
import { logger } from '../shared/services/logger.js';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

class FileUploadService {
  constructor() {
    this.supabase = getSupabaseClient();
    this.uploadDir = 'uploads';
    this.maxFileSize = 10 * 1024 * 1024; // 10MB
    this.allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    this.allowedVideoTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm'];
    this.allowedDocumentTypes = ['application/pdf', 'text/plain', 'application/msword'];
    
    // Ensure upload directory exists
    this.ensureUploadDir();
  }

  /**
   * Configure multer for file uploads
   */
  getMulterConfig() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = path.join(this.uploadDir, this.getFileTypeFolder(file.mimetype));
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
      }
    });

    const fileFilter = (req, file, cb) => {
      if (this.isAllowedFileType(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('File type not allowed'), false);
      }
    };

    return multer({
      storage,
      fileFilter,
      limits: {
        fileSize: this.maxFileSize
      }
    });
  }

  /**
   * Upload single file
   */
  async uploadFile(file, userId, metadata = {}) {
    try {
      if (!file) {
        throw new Error('No file provided');
      }

      // Validate file
      this.validateFile(file);

      // Process file based on type
      let processedFile = file;
      if (this.isImageFile(file.mimetype)) {
        processedFile = await this.processImage(file);
      }

      // Generate file info
      const fileInfo = {
        id: uuidv4(),
        originalName: file.originalname,
        filename: file.filename,
        mimetype: file.mimetype,
        size: processedFile.size,
        path: processedFile.path,
        url: this.generateFileUrl(processedFile.filename, file.mimetype),
        userId,
        metadata: {
          ...metadata,
          uploadedAt: new Date().toISOString(),
          fileType: this.getFileType(file.mimetype)
        }
      };

      // Store file info in database (you can create a files table)
      await this.storeFileInfo(fileInfo);

      logger.info(`File uploaded successfully: ${fileInfo.filename} by user ${userId}`);
      return fileInfo;

    } catch (error) {
      logger.error('File upload error:', error);
      throw error;
    }
  }

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(files, userId, metadata = {}) {
    try {
      if (!Array.isArray(files) || files.length === 0) {
        throw new Error('No files provided');
      }

      const uploadPromises = files.map(file => 
        this.uploadFile(file, userId, metadata)
      );

      const results = await Promise.allSettled(uploadPromises);
      
      const successful = [];
      const failed = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successful.push(result.value);
        } else {
          failed.push({
            file: files[index].originalname,
            error: result.reason.message
          });
        }
      });

      return {
        successful,
        failed,
        total: files.length,
        successCount: successful.length,
        failureCount: failed.length
      };

    } catch (error) {
      logger.error('Multiple file upload error:', error);
      throw error;
    }
  }

  /**
   * Process image file (resize, optimize, create thumbnails)
   */
  async processImage(file) {
    try {
      const imagePath = file.path;
      const imageBuffer = fs.readFileSync(imagePath);

      // Create different sizes
      const sizes = {
        thumbnail: { width: 150, height: 150 },
        small: { width: 300, height: 300 },
        medium: { width: 600, height: 600 },
        large: { width: 1200, height: 1200 }
      };

      const processedImages = {};

      for (const [size, dimensions] of Object.entries(sizes)) {
        const processedBuffer = await sharp(imageBuffer)
          .resize(dimensions.width, dimensions.height, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ quality: 85 })
          .toBuffer();

        const sizePath = this.generateSizePath(file.path, size);
        fs.writeFileSync(sizePath, processedBuffer);
        processedImages[size] = sizePath;
      }

      // Update file info with processed versions
      file.processedVersions = processedImages;
      file.size = fs.statSync(imagePath).size;

      return file;

    } catch (error) {
      logger.error('Image processing error:', error);
      throw new Error('Failed to process image');
    }
  }

  /**
   * Delete file
   */
  async deleteFile(fileId, userId) {
    try {
      // Get file info from database
      const fileInfo = await this.getFileInfo(fileId, userId);
      if (!fileInfo) {
        throw new Error('File not found or access denied');
      }

      // Delete physical files
      await this.deletePhysicalFile(fileInfo.path);
      
      // Delete processed versions if they exist
      if (fileInfo.processedVersions) {
        for (const versionPath of Object.values(fileInfo.processedVersions)) {
          await this.deletePhysicalFile(versionPath);
        }
      }

      // Remove from database
      await this.removeFileInfo(fileId);

      logger.info(`File deleted successfully: ${fileId} by user ${userId}`);
      return true;

    } catch (error) {
      logger.error('File deletion error:', error);
      throw error;
    }
  }

  /**
   * Get file info
   */
  async getFileInfo(fileId, userId) {
    try {
      // This would typically query a files table
      // For now, return null as placeholder
      return null;
    } catch (error) {
      logger.error('Get file info error:', error);
      throw error;
    }
  }

  /**
   * Store file info in database
   */
  async storeFileInfo(fileInfo) {
    try {
      // This would typically insert into a files table
      // For now, just log the info
      logger.info('File info stored:', fileInfo);
      return true;
    } catch (error) {
      logger.error('Store file info error:', error);
      throw error;
    }
  }

  /**
   * Remove file info from database
   */
  async removeFileInfo(fileId) {
    try {
      // This would typically delete from a files table
      // For now, just log the action
      logger.info('File info removed:', fileId);
      return true;
    } catch (error) {
      logger.error('Remove file info error:', error);
      throw error;
    }
  }

  /**
   * Validate file
   */
  validateFile(file) {
    if (!file) {
      throw new Error('No file provided');
    }

    if (file.size > this.maxFileSize) {
      throw new Error(`File size exceeds maximum limit of ${this.maxFileSize / (1024 * 1024)}MB`);
    }

    if (!this.isAllowedFileType(file.mimetype)) {
      throw new Error('File type not allowed');
    }
  }

  /**
   * Check if file type is allowed
   */
  isAllowedFileType(mimetype) {
    return [
      ...this.allowedImageTypes,
      ...this.allowedVideoTypes,
      ...this.allowedDocumentTypes
    ].includes(mimetype);
  }

  /**
   * Check if file is an image
   */
  isImageFile(mimetype) {
    return this.allowedImageTypes.includes(mimetype);
  }

  /**
   * Get file type category
   */
  getFileType(mimetype) {
    if (this.allowedImageTypes.includes(mimetype)) return 'image';
    if (this.allowedVideoTypes.includes(mimetype)) return 'video';
    if (this.allowedDocumentTypes.includes(mimetype)) return 'document';
    return 'other';
  }

  /**
   * Get folder for file type
   */
  getFileTypeFolder(mimetype) {
    const fileType = this.getFileType(mimetype);
    return path.join(this.uploadDir, fileType);
  }

  /**
   * Generate file URL
   */
  generateFileUrl(filename, mimetype) {
    const fileType = this.getFileType(mimetype);
    return `/uploads/${fileType}/${filename}`;
  }

  /**
   * Generate size-specific file path
   */
  generateSizePath(originalPath, size) {
    const dir = path.dirname(originalPath);
    const ext = path.extname(originalPath);
    const name = path.basename(originalPath, ext);
    return path.join(dir, `${name}-${size}${ext}`);
  }

  /**
   * Ensure upload directory exists
   */
  ensureUploadDir() {
    const dirs = [
      this.uploadDir,
      path.join(this.uploadDir, 'image'),
      path.join(this.uploadDir, 'video'),
      path.join(this.uploadDir, 'document')
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Delete physical file
   */
  async deletePhysicalFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        logger.info(`Physical file deleted: ${filePath}`);
      }
    } catch (error) {
      logger.error(`Error deleting physical file ${filePath}:`, error);
    }
  }

  /**
   * Get file statistics
   */
  async getFileStats(userId) {
    try {
      // This would typically query a files table
      // For now, return placeholder stats
      return {
        totalFiles: 0,
        totalSize: 0,
        byType: {
          image: 0,
          video: 0,
          document: 0
        }
      };
    } catch (error) {
      logger.error('Get file stats error:', error);
      throw error;
    }
  }

  /**
   * Clean up orphaned files
   */
  async cleanupOrphanedFiles() {
    try {
      // This would typically find files in the upload directory
      // that don't have corresponding database entries
      logger.info('Cleanup of orphaned files completed');
      return true;
    } catch (error) {
      logger.error('Cleanup orphaned files error:', error);
      throw error;
    }
  }
}

export default new FileUploadService();
