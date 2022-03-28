from dataclasses import dataclass, fields
import json
import os
import time, datetime
from unicodedata import name
from flask import Flask, request, jsonify ,render_template, redirect, request, url_for, flash
from flask_login import UserMixin, LoginManager, login_user, logout_user, login_required, current_user
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow 
from flask_cors import CORS, cross_origin
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length, Email, Regexp, EqualTo
from wtforms import ValidationError

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

add_config  = {
  "origins": ["http://localhost:3000"],
  "methods": ["GET", "POST", "PATCH", "DELETE"],
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

#create a User class for out database that stores a password
class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(64), unique=True, index=True)
    username = db.Column(db.String(64), unique=True, index=True)
    password_hash = db.Column(db.String(128))

    @property
    def password(self):
        raise AttributeError('No soup for you!/nPasswords are unreadable.')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

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


@app.route('/time')
def get_current_time():
    currentTime = datetime.datetime.now()
    return {'time': currentTime}

#this is a model of the database columns
class Prescriptions(db.Model):
     id = db.Column(db.Integer, primary_key=True)
     name = db.Column(db.String(100))
     dosage = db.Column(db.String(100))
     
     def __init__(self, name, dosage):
         self.name = name
         self.dosage = dosage


class Prescription_Schema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'dosage')
prescription_schema = Prescription_Schema()
prescriptions_schema = Prescription_Schema(many=True)

#configure the login manager so it knows how to identify a user
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

#set up the main index view
@app.route("/")
def index():
    return render_template('index.html')

@app.route('/get', methods=['GET'])
def get_prescription():
    all_prescriptions = Prescriptions.query.all()
    results = prescriptions_schema.dump(all_prescriptions)
    return jsonify(results)


@app.route('/get/<id>', methods=['GET'])
def post_details(id):
    prescription = Prescriptions.query.get(id)
    return prescription_schema.jsonify(prescription)


@app.route('/add', methods=['POST'])
def add_prescription():
    name = request.json['name']
    dosage = request.json['dosage']

    prescriptions = Prescriptions(name, dosage)
    db.session.add(prescriptions)
    db.session.commit()
    return prescription_schema.jsonify(prescriptions)

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



#this deletes a record from the database
@app.route('/delete/<id>', methods=['DELETE'])
def prescription_deleted(id):
    prescription = Prescriptions.query.get(id)
    db.session.delete(prescription)
    db.session.commit()

    return prescription_schema.jsonify(prescription)

#set up the login view and handle login logic
@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data.lower()).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            next = request.args.get('next')
            if next is None or not next.startswith('/'):
                next = url_for('index')
            return redirect(next)
        flash('Invalid email or password.')
    return render_template('login.html', form=form)

#set up the logout view and logic
@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.')
    return redirect(url_for('index'))

#set up the registration view and registration logic
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    print("before validation")
    if form.validate_on_submit():
        print("after validation")
        user = User(email=form.email.data.lower(),
                    username=form.username.data,
                    password=form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Account Created.')
        return redirect(url_for('login'))
        flash('You can now login')
    return render_template('register.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)

