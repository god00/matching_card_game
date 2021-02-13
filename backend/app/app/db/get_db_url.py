import os

def get_db_url():
    return "postgresql+psycopg2://%s:%s@%s:%s/%s" % (
        os.getenv("POSTGRES_USER"),
        os.getenv("POSTGRES_PASSWORD"),
        os.getenv("DB_HOST", 'localhost'),
        os.getenv("DB_PORT", 5432),
        os.getenv("POSTGRES_DB")
    )