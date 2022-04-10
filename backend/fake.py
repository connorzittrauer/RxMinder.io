from random import randint
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash
from faker import Faker
from faker_biology.taxonomy import ModelOrganism ##https://pypi.org/project/faker-biology/
from app import db, session, User, Prescriptions, Times

def users(count=10):
    fake = Faker()
    i = 0
    while i < count:
        u = User(email=fake.email(),
                username=fake.user_name(),
                password_hash=generate_password_hash('password'))
        db.session.add(u)
        try:
            db.session.commit()
            i += 1
        except IntegrityError:
            db.session.rollback()

def perscriptions(count=10):
    fake = Faker()
    fake.add_provider(ModelOrganism)
    i = 0
    while i < count:
        p = Prescriptions(name=fake.organism_latin(),
                        dosage=f'{randint(1, 5000)}' + 'mg')
        db.session.add(p)
        try:
            db.session.commit()
            print(p.name + ' ' + p.dosage)
        except IntegrityError:
            db.session.rollback()
        t = Times(rxid=p.id,
                time=f'{randint(1, 12):02d}' + ':' + f'{(randint(0, 11) * 5):02d}',
                meridiem=fake.am_pm())
        db.session.add(t)
        try:
            db.session.commit()
            print(t.time + ' ' + t.meridiem)
            i += 1
        except IntegrityError:
            db.session.rollback()

perscriptions(25)