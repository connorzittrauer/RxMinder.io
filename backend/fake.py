from app import db, session, User, Prescriptions, Times
from faker import Faker
from faker_biology.taxonomy import ModelOrganism ##https://pypi.org/project/faker-biology/
from random import randint
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash

def users(count=1):
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

def prescriptions(count=10, numberTimes=3):
    fake = Faker()
    fake.add_provider(ModelOrganism)
    i = 0
    while i < count:
        p = Prescriptions(name=fake.organism_latin(),
                        dosage=f'{randint(1, 5000)}' + 'mg')
        db.session.add(p)
        try:
            db.session.commit()
## debugging values            print(p.name + ' ' + p.dosage + ' Number: ' + f'{i}')
            times(p, numberTimes)
            i += 1
        except IntegrityError:
            db.session.rollback()

def times(p, numberTimes):
    fake = Faker()
    j = 0
    numberTimes = randint(1, numberTimes)
    while j < numberTimes:
        t = Times(rxid=p.id,
                time=f'{randint(1, 12)}' + ':' + f'{(randint(0, 11) * 5):02d}',
                meridiem=fake.am_pm().lower())
        db.session.add(t)
        try:
            db.session.commit()
## debugging values            print(t.time + ' ' + t.meridiem + ' Number: ' + f'{j}')
            j += 1
        except IntegrityError:
            db.session.rollback()

def prescriptionAdd(userId=1, rxid=1):
    u = User.query.filter_by(id=userId).first()
    p = Prescriptions.query.filter_by(id=rxid).first()
    u.prescription.append(p)
    db.session.add(u)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()



## How to use:
'Remove the apostrophes from one of the following functions and set values as needed'
'run "pip install -r fakerReqs.txt" '
'then run "python fake.py" '
'after you are done, feel free to run "pip uninstall -r fakerReqs.txt" '
## Goal for another day, add functions to Flask CLI

## The following makes prescriptions, the defualt is ten with between one and three dosage times, per prescription
'prescriptions()'

## The following makes users, default number is one
'users(3)'

## The following adds prescriptions to a user, defaults to first user, first medicine
'prescriptionAdd()'
