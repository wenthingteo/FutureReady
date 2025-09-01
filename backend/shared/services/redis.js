import Redis from 'redis';
import { logger } from './logger.js';

let redisClient = null;

export const initializeRedis = () => {
  try {
    redisClient = Redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            logger.error('Redis max reconnection attempts reached');
            return new Error('Redis max reconnection attempts reached');
          }
          return Math.min(retries * 100, 3000);
        }
      }
    });

    redisClient.on('connect', () => {
      logger.info('Redis client connected');
    });

    redisClient.on('ready', () => {
      logger.info('Redis client ready');
    });

    redisClient.on('error', (err) => {
      logger.error('Redis client error:', err);
    });

    redisClient.on('end', () => {
      logger.warn('Redis client connection ended');
    });

    redisClient.on('reconnecting', () => {
      logger.info('Redis client reconnecting...');
    });

    // Connect to Redis
    redisClient.connect().catch((err) => {
      logger.error('Failed to connect to Redis:', err);
    });

    return redisClient;
  } catch (error) {
    logger.error('Redis initialization failed:', error);
    return null;
  }
};

export const getRedisClient = () => {
  if (!redisClient) {
    logger.warn('Redis client not initialized, attempting to initialize...');
    return initializeRedis();
  }
  return redisClient;
};

// Cache operations
export const cacheGet = async (key) => {
  try {
    const client = getRedisClient();
    if (!client) return null;
    
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    logger.error('Redis cache get error:', error);
    return null;
  }
};

export const cacheSet = async (key, value, expireSeconds = 3600) => {
  try {
    const client = getRedisClient();
    if (!client) return false;
    
    await client.setEx(key, expireSeconds, JSON.stringify(value));
    return true;
  } catch (error) {
    logger.error('Redis cache set error:', error);
    return false;
  }
};

export const cacheDelete = async (key) => {
  try {
    const client = getRedisClient();
    if (!client) return false;
    
    await client.del(key);
    return true;
  } catch (error) {
    logger.error('Redis cache delete error:', error);
    return false;
  }
};

export const cacheExists = async (key) => {
  try {
    const client = getRedisClient();
    if (!client) return false;
    
    return await client.exists(key) === 1;
  } catch (error) {
    logger.error('Redis cache exists error:', error);
    return false;
  }
};

// Session operations
export const setSession = async (sessionId, userData, expireSeconds = 86400) => {
  return await cacheSet(`session:${sessionId}`, userData, expireSeconds);
};

export const getSession = async (sessionId) => {
  return await cacheGet(`session:${sessionId}`);
};

export const deleteSession = async (sessionId) => {
  return await cacheDelete(`session:${sessionId}`);
};

// Rate limiting
export const incrementRateLimit = async (key, expireSeconds = 60) => {
  try {
    const client = getRedisClient();
    if (!client) return 0;
    
    const current = await client.incr(key);
    if (current === 1) {
      await client.expire(key, expireSeconds);
    }
    return current;
  } catch (error) {
    logger.error('Redis rate limit increment error:', error);
    return 0;
  }
};

// Close Redis connection
export const closeRedis = async () => {
  try {
    if (redisClient) {
      await redisClient.quit();
      logger.info('Redis connection closed');
    }
  } catch (error) {
    logger.error('Error closing Redis connection:', error);
  }
};

// Graceful shutdown
process.on('SIGTERM', closeRedis);
process.on('SIGINT', closeRedis);
