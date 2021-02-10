import app.db.base
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://%s:%s@%s:%s/%s" % (
    os.getenv("DB_USER"),
    os.getenv("DB_PASS"),
    os.getenv("DB_HOST", 'localhost'),
    os.getenv("DB_PORT", 5432),
    os.getenv("DB_NAME")
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
