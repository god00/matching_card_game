from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer, ARRAY, JSON, DateTime
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True)
    score = Column(Integer, index=True, default=0)
    answer = Column(ARRAY(Integer))
    current_state = Column(ARRAY(Integer))
    actions = Column(ARRAY(JSON))
    matched = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User")
