from flask import Flask, jsonify, render_template, request, session, redirect,url_for,send_file,send_from_directory
import datetime
import os
import random
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import requests

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

# sqlalchemy
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))


@app.route("/")
def index():
	return render_template("index.html")

@app.route("/addcustomer",methods=['POST'])
def addcustomer():
	'''
	Adds new customer to customer list table on database
	'''
	response={'status':'success'}
	customer_mobile = request.form.get("mobile")
	customer_name = request.form.get("name")
	db.execute("INSERT INTO customerlist (mobile_number,customer_name) VALUES (%s,'%s') ;" % (customer_mobile,customer_name))
	db.commit()
	print(customer_name,customer_mobile)
	return jsonify(response)
@app.route("/api/newbill")
def newbill():
	response={'status':'success'}
	db.execute("INSERT INTO billlist (date1,customer_name,total) VALUES ('1609936151') ;")
	print( db.execute('SELECT * FROM billlist;').fetchall())
	return jsonify(response)
