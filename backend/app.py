from dataclasses import fields
import json
import os
from unicodedata import name
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow 

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))

#this configures the database/joins it with the flask application
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'test_database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

#this is a model of the database columns
class Prescriptions(db.Model):
     id = db.Column(db.Integer, primary_key=True)
     name = db.Column(db.String(100))
     dosage = db.Column(db.String(100))
     
     def __init__(self, name, dosage):
         self.name = name


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


@app.route('/update/<id>', methods=['PUT'])
def update_prescription(id):
    prescription = Prescriptions.query.get(id)

    name = request.json['name']
    dosage = request.json['dosage']

    prescription.name = name
    prescription.dosage = dosage

    db.session.commit()
    return prescription_schema.jsonify(prescription)


# @app.route('/delete/<id>/', methods = ['DELETE'])
# def article_delete(id):
#     article = Articles.query.get(id)
#     db.session.delete(article)
#     db.session.commit()

#     return article_schema.jsonify(article)

#this deletes a record from the database
@app.route('/delete/<id>', methods=['DELETE'])
def prescription_deleted(id):
    prescription = Prescriptions.query.get(id)
    db.session.delete(prescription)
    db.session.commit()

    return prescription_schema.jsonify(prescription)

if __name__ == '__main__':
    app.run(debug=True)

