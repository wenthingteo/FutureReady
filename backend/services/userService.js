import { getSupabaseClient } from '../shared/db/connection.js';
import { logger } from '../shared/services/logger.js';
import bcrypt from 'bcryptjs';

class UserService {
  constructor() {
    this.supabase = getSupabaseClient();
  }

  /**
   * Create a new user
   */
  async createUser(userData) {
    try {
      const { email, password, first_name, last_name, company_name } = userData;
      
      // Check if user already exists
      const { data: existingUser } = await this.supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Hash password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Create user
      const { data: user, error } = await this.supabase
        .from('users')
        .insert([{
          email,
          password_hash: passwordHash,
          first_name,
          last_name,
          company_name,
          role: 'user'
        }])
        .select('id, email, first_name, last_name, company_name, role, created_at')
        .single();

      if (error) {
        logger.error('Error creating user:', error);
        throw new Error('Failed to create user');
      }

      logger.info(`New user created: ${email}`);
      return user;
    } catch (error) {
      logger.error('User creation error:', error);
      throw error;
    }
  }

  /**
   * Authenticate user login
   */
  async authenticateUser(email, password) {
    try {
      // Find user by email
      const { data: user, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (error || !user) {
        throw new Error('Invalid credentials');
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      // Update last login
      await this.supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', user.id);

      // Return user without password
      const { password_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      logger.error('Authentication error:', error);
      throw error;
    }
  }

  /**
   * Get user profile
   */
  async getUserProfile(userId) {
    try {
      const { data: user, error } = await this.supabase
        .from('users')
        .select('id, email, first_name, last_name, company_name, role, created_at, last_login')
        .eq('id', userId)
        .eq('is_active', true)
        .single();

      if (error) {
        logger.error('Error fetching user profile:', error);
        throw new Error('Failed to fetch user profile');
      }

      return user;
    } catch (error) {
      logger.error('Profile fetch error:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId, updateData) {
    try {
      const allowedFields = ['first_name', 'last_name', 'company_name'];
      const filteredData = Object.keys(updateData)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = updateData[key];
          return obj;
        }, {});

      if (Object.keys(filteredData).length === 0) {
        throw new Error('No valid fields to update');
      }

      const { data: updatedUser, error } = await this.supabase
        .from('users')
        .update(filteredData)
        .eq('id', userId)
        .select('id, email, first_name, last_name, company_name, role, created_at, last_login')
        .single();

      if (error) {
        logger.error('Error updating user profile:', error);
        throw new Error('Failed to update user profile');
      }

      logger.info(`User profile updated: ${userId}`);
      return updatedUser;
    } catch (error) {
      logger.error('Profile update error:', error);
      throw error;
    }
  }

  /**
   * Change user password
   */
  async changePassword(userId, currentPassword, newPassword) {
    try {
      // Get current user
      const { data: user, error } = await this.supabase
        .from('users')
        .select('password_hash')
        .eq('id', userId)
        .single();

      if (error || !user) {
        throw new Error('User not found');
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isValidPassword) {
        throw new Error('Current password is incorrect');
      }

      // Hash new password
      const saltRounds = 12;
      const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      const { error: updateError } = await this.supabase
        .from('users')
        .update({ password_hash: newPasswordHash })
        .eq('id', userId);

      if (updateError) {
        logger.error('Error changing password:', updateError);
        throw new Error('Failed to change password');
      }

      logger.info(`Password changed for user: ${userId}`);
      return true;
    } catch (error) {
      logger.error('Password change error:', error);
      throw error;
    }
  }

  /**
   * Get all users (admin only)
   */
  async getAllUsers(adminUserId) {
    try {
      // Verify admin role
      const { data: adminUser } = await this.supabase
        .from('users')
        .select('role')
        .eq('id', adminUserId)
        .single();

      if (!adminUser || adminUser.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }

      const { data: users, error } = await this.supabase
        .from('users')
        .select('id, email, first_name, last_name, company_name, role, is_active, created_at, last_login')
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }

      return users;
    } catch (error) {
      logger.error('Get users error:', error);
      throw error;
    }
  }
}

export default new UserService();
