from dataclasses import dataclass, fields
import json
import os
import time, datetime
from unicodedata import name
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow 
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

add_config  = {
  "origins": ["http://localhost:3000"],
  "methods": ["GET", "POST"],
  "allow_headers": ["Authorization", "Content-Type"]
}

basedir = os.path.abspath(os.path.dirname(__file__))

#this configures the database/joins it with the flask application
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'test_database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
ma = Marshmallow(app)


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



if __name__ == '__main__':
    app.run(debug=True)

