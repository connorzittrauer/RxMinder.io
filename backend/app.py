from dataclasses import dataclass, fields
import json
import os
import time, datetime
from datetime import datetime
from unicodedata import name
from unittest import result
from flask import Flask, request, jsonify ,render_template, redirect, request, session, url_for, flash
from flask_login import UserMixin, LoginManager, login_user, logout_user, login_required, current_user
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow 
from flask_cors import CORS, cross_origin
from flask_wtf import FlaskForm
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length, Email, Regexp, EqualTo
from wtforms import ValidationError

#region classes/models
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

add_config  = {
  "origins": ["http://localhost:3000"],
  "methods": ["GET", "POST", "PATCH", "DELETE", "PUT"],
  "allow_headers": ["Authorization", "Content-Type"]
}

basedir = os.path.abspath(os.path.dirname(__file__))


#this configures the database/joins it with the flask application
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'master.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'hard to guess string'


db = SQLAlchemy(app)
ma = Marshmallow(app)
login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)


# Set association database
user_prescriptions = db.Table('user_prescriptions',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('prescription_id', db.Integer, db.ForeignKey('prescriptions.id'))
)

#this is a model of the database columns
class Prescriptions(db.Model):
     id = db.Column(db.Integer, primary_key=True)
     name = db.Column(db.String(100))
     dosage = db.Column(db.String(100))
     
     times = db.relationship('Times', backref='prescription', lazy=True)

     def __init__(self, name, dosage):
         self.name = name
         self.dosage = dosage
    

class Prescription_Schema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'dosage')
prescription_schema = Prescription_Schema()
prescriptions_schema = Prescription_Schema(many=True)


class Times(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rxid = db.Column(db.Integer, db.ForeignKey('prescriptions.id'))
    time = db.Column(db.String(100))
    meridiem = db.Column(db.String(100))

    def __init__(self, rxid, time, meridiem):
        self.rxid = rxid
        self.time = time
        self.meridiem = meridiem
      

class Times_Schema(ma.Schema):
    class Meta:
        fields = ('id', 'rxid', 'time', 'meridiem')
time_schema = Times_Schema()
times_schema = Times_Schema(many=True)


#create a User class for out database that stores a password
class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(64), unique=True, index=True)
    username = db.Column(db.String(64), unique=True, index=True)
    password_hash = db.Column(db.String(128))
    prescriptions = db.relationship('Prescriptions',
        secondary=user_prescriptions, backref=db.backref('users', lazy='dynamic'), lazy='dynamic')

    @property
    def password(self):
        raise AttributeError('No soup for you!/nPasswords are unreadable.')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    ## Adds a prescription to a user defaults to first user, first prescription
    def prescriptionAdd(userId=1, rxid=1):
        u = User.query.filter_by(id=userId).first()
        p = Prescriptions.query.filter_by(id=rxid).first()
        u.prescriptions.append(p)
        db.session.add(u)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()

#endregion

#configure the login manager so it knows how to identify a user
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))



@app.route('/add', methods=['POST'])
def add_prescription():
    name = request.json['name']
    dosage = request.json['dosage']
    times = request.json['times'] #now sending a list of times/meridiems below
    meridiems = request.json['meridiems']
    prescriptions = Prescriptions(name, dosage)
    db.session.add(prescriptions)
    db.session.commit()
    db.session.refresh(prescriptions)
    i = 0
    for time in times:
        time = Times(prescriptions.id, time, meridiems[i])
        db.session.add(time)
        db.session.commit()
        db.session.refresh(time)
        i = i + 1
    return prescription_schema.jsonify(prescriptions)


@app.route('/addTime', methods=['POST'])
def add_time():
    time = request.json['time']
    meridiem = request.json['meridiem']
    rxid = request.json['rxid']
    t = Times(rxid, time, meridiem)
    db.session.add(t)
    db.session.commit()
    return {"message":"time has been added"}


#this provides current time endpoint for the splash page on the front
@app.route('/current_time', methods=['GET'])
def get_current_time():
    now = datetime.now()
    #currentTime = now.strftime("%I:%M:%P")
    currentTime = now.strftime("%I:%M %p")

    #removes unnecessary leading 0s in time output (e.g '07:15 pm')
    if currentTime[0] == '0':
        currentTime = currentTime[1:]

    return {'time': currentTime.lower()}

#this deletes a record from the database
@app.route('/delete/<id>', methods=['DELETE'])
def prescription_deleted(id):
    prescription = Prescriptions.query.get(id)

    #deletes the corresponding time information
    Times.query.filter_by(rxid=id).delete()

    db.session.delete(prescription)
    db.session.commit()

    return prescription_schema.jsonify(prescription)

@app.route('/get-user-id/<email>', methods=['GET'])
def get_user_id(email):
    current_user = User.query.filter_by(email=email).first()
    return jsonify({'CurrentUserID' : current_user.id})

@app.route('/get', methods=['GET'])
def get_prescription():
    all_prescriptions = Prescriptions.query.all()
    results = prescriptions_schema.dump(all_prescriptions)
    return jsonify(results)


@app.route('/get/<id>', methods=['GET'])
def post_details(id):
    prescription = Prescriptions.query.get(id)
    return prescription_schema.jsonify(prescription)


@app.route('/time/<id>', methods=['DELETE'])
def time_delete(id):
    time = Times.query.get(id)
    db.session.delete(time)
    db.session.commit()

    return {"message":"the time was deleted"}


#query all of the times in the times tables
@app.route('/times', methods=['GET'])
def get_times():
    all_times = Times.query.all()
    results = times_schema.dump(all_times)
    return jsonify(results)


#query by the specific prescription 
@app.route('/times/<rxid>', methods=['GET'])
def get_specific_prescription_time(rxid):       
    prescription = Prescriptions.query.get(rxid)
    time_list = []
    for t in prescription.times:
        time_list.append({'id':t.id, 'rxid': t.rxid, 'time': t.time, 'meridiem': t.meridiem})
    return jsonify(time_list)


@app.route('/updateTime/<id>', methods=['PUT'])
def update_time(id):
    newTime = request.json['time']
    newMer = request.json['meridiem']
    time = Times.query.get(id)
    time.time = newTime
    time.meridiem = newMer
    db.session.commit()
    return {"message":"the time was updated"}


#this updates a record from  the database
@app.route('/update/<id>', methods=['GET', 'PUT'])
def update_prescription(id):
    prescription = Prescriptions.query.get(id)

    name = request.json['name']
    dosage = request.json['dosage']

    prescription.name = name
    prescription.dosage = dosage
    db.session.commit()
     
    return prescription_schema.jsonify(prescription)

#fetch all of the prescriptions for a specific user
@app.route('/get-user-prescriptions/<id>', methods=['GET'])
def get_user_prescriptions(id):
    query = User.query.get(id)
    rxIDs = []
    for q in query.prescriptions:
        rxIDs.append({'dosage': q.dosage, 'id': q.id, 'name': q.name})

    return jsonify(rxIDs)

@app.route('/add-user-prescription/<id>', methods=['POST'])
def add_user_prescription(id):
    name = request.json['name']
    dosage = request.json['dosage']
    # times = request.json['times'] #now sending a list of times/meridiems below
    # meridiems = request.json['meridiems']

    #find the current user
    user = User.query.get(id)
    
    #create a new prescription object
    prescription = Prescriptions(name, dosage)
    db.session.add(prescription)
    db.session.commit()
    db.session.refresh(prescription)

    #attach the prescription object to the user
    user.prescriptions.append(prescription)

    try:
        db.session.commit()
    except IntegrityError:
            db.session.rollback()

    return prescription_schema.jsonify(prescription)


#region login logic    
#set up the login view and handle login logic
@app.route('/login', methods=['GET', 'POST'])
def login():
    # this logic is to login with an api call from react frontend
    email = request.json['email']
    password = request.json['password']
    user = User.query.filter_by(email=email).first()
    if user is not None and user.verify_password(password):
        return {'id': user.id, 'success': True}
    return {'success': False}


#set up the logout view and logic
@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.')
    return redirect(url_for('index')) #needs to return json for frontend


#set up the registration view and registration logic
@app.route('/register', methods=['GET', 'POST'])
def register():
    email = request.json['email']
    password = request.json['password']
    username = request.json['userName']
    user = User(email=email,
                username=username,
                password=password)
    db.session.add(user)
    db.session.commit()
    #may need to add validation again just getting it to work -BC
    return {"success" : True}

### Flask backend forms, no need to move
#Define a Login Form to allow users to login
class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Length(1, 64),
                                             Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Keep me logged in')
    submit = SubmitField('Log In')

#Define a Logout Form to allow users to logout
class RegistrationForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Length(1, 64),
                                             Email()])
    username = StringField('Username', validators=[
        DataRequired(), Length(1, 64),
        Regexp('^[A-Za-z][A-Za-z0-9_.]*$', 0,
               'Usernames must have only letters, numbers, dots or '
               'underscores')])
    password = PasswordField('Password', validators=[
        DataRequired(), EqualTo('password2', message='Passwords must match.')])
    password2 = PasswordField('Confirm password', validators=[DataRequired()])
    submit = SubmitField('Register')

    def validate_email(self, field):
        if User.query.filter_by(email=field.data.lower()).first():
            raise ValidationError('Email already registered.')

    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('Username already in use.')

### End Flask baeckend forms

#endregion

if __name__ == '__main__':
    app.run(debug=True)