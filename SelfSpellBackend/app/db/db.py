from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    id = Column(Integer, primary_key=True, autoincrement=True)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


db = SQLAlchemy(model_class=Base)
