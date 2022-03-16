import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy





app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'test_database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Prescription(db.Model):
     id = db.Column(db.Integer, primary_key=True)
     name = db.Column(db.String(100))
     dosage = db.Column(db.Integer)
     
     def __init__(self, name, dosage):
         self.name = name
         self.dosage = dosage


@app.route('/index', methods=['GET'])
def index():
    return {
        'Hello' : 'World'
    }

if __name__ == '__main__':
    app.run(debug=True)

