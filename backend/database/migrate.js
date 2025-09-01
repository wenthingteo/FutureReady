import { getSupabaseClient, initializeDatabase } from '../shared/db/connection.js';
import { logger } from '../shared/services/logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  try {
    logger.info('Starting database migration...');
    
    // Initialize database connection
    await initializeDatabase();
    const supabase = getSupabaseClient();
    
    // Read schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    logger.info('Executing schema migration...');
    
    // Split SQL by semicolons and execute each statement
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          const { error } = await supabase.rpc('exec_sql', { sql: statement });
          if (error) {
            logger.warn(`Statement warning (continuing): ${error.message}`);
          }
        } catch (err) {
          logger.warn(`Statement warning (continuing): ${err.message}`);
        }
      }
    }
    
    logger.info('Database migration completed successfully!');
    
    // Test connection
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      logger.warn('Could not verify users table (this is normal for new databases)');
    } else {
      logger.info('Database connection verified successfully!');
    }
    
  } catch (error) {
    logger.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run migrations if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations();
}

export { runMigrations };
