import { createClient } from '@supabase/supabase-js';
import { logger } from '../services/logger.js';

let supabaseClient = null;

export const initializeDatabase = async () => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }

    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      },
      db: {
        schema: 'public'
      }
    });

    // Test the connection
    const { data, error } = await supabaseClient
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      logger.warn('Database connection test failed:', error.message);
      // This might be expected if the table doesn't exist yet
    } else {
      logger.info('Database connection established successfully');
    }

    return supabaseClient;
  } catch (error) {
    logger.error('Failed to initialize database:', error);
    throw error;
  }
};

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return supabaseClient;
};

// Database utility functions
export const executeQuery = async (query, params = []) => {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc('execute_query', {
      query_text: query,
      query_params: params
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    logger.error('Query execution failed:', error);
    throw error;
  }
};

// Transaction wrapper
export const executeTransaction = async (operations) => {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc('execute_transaction', {
      operations_json: JSON.stringify(operations)
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    logger.error('Transaction execution failed:', error);
    throw error;
  }
};

// Health check
export const checkDatabaseHealth = async () => {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }

    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      responseTime: Date.now()
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

// Close database connection
export const closeDatabase = async () => {
  try {
    if (supabaseClient) {
      // Supabase client doesn't have a close method, but we can clean up
      supabaseClient = null;
      logger.info('Database connection cleaned up');
    }
  } catch (error) {
    logger.error('Error closing database connection:', error);
  }
};

// Graceful shutdown
process.on('SIGTERM', closeDatabase);
process.on('SIGINT', closeDatabase);
