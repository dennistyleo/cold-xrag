import psycopg2
from psycopg2.pool import SimpleConnectionPool
from contextlib import contextmanager
import os

# P0: Set up PostgreSQL connection pool, Handle DB failures (try-catch)
try:
    db_pool = SimpleConnectionPool(
        1, 10,
        user=os.environ.get('DB_USER', 'postgres'),
        password=os.environ.get('DB_PASSWORD', 'postgres'),
        host=os.environ.get('DB_HOST', 'localhost'),
        port=os.environ.get('DB_PORT', '5432'),
        database=os.environ.get('DB_NAME', 'coldxrag')
    )
    if db_pool:
        print("Connection pool created successfully")
except (Exception, psycopg2.DatabaseError) as error:
    print("Error while connecting to PostgreSQL", error)
    db_pool = None

@contextmanager
def get_db_connection():
    if not db_pool:
        raise Exception("Database pool is not initialized.")
    conn = db_pool.getconn()
    try:
        yield conn
    finally:
        db_pool.putconn(conn)
