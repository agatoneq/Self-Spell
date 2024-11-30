from sqlalchemy.dialects.postgresql import ARRAY
from app.db.db import db, Base  # Importujemy db i Base z pliku db.py

class Hobby(db.Model, Base):
    __tablename__ = 'hobby'  # Określamy nazwę tabeli w bazie danych

    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)  
    char = db.Column(ARRAY(db.Float), nullable=False) #cechy nie chce mi się dużo pisać
    url = db.Column(db.String(500), nullable=True)
    def __init__(self, content):
        """Inicjalizuje obiekt  i automatycznie zapisuje go w bazie danych."""
        self.content = content
        db.session.add(self)  # Dodaj obiekt do sesji
        db.session.commit()    # Zatwierdź zmiany w bazie danych
    def __repr__(self):
        """String representation of the object."""
        return f'<Task {self.id}: {self.content}>'
