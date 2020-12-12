import os
import requests
from flask import Flask, jsonify, render_template, request, session, redirect,url_for,send_file,send_from_directory
import datetime
from shop import *

currentlist=itemList()
currentlist.addItem(item(75,5,'wheat'))
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/defaultlist",methods=['POST'])
def defaultlist():
	# response={'status':'success'}
	item=currentlist.getInfos()[-1]
	itemname,rate,qty,amt=item[0],item[1],item[2],item[3]
	print(itemname,rate,qty,amt)
	response={'status':'success','itemname':itemname,'rate':rate,'qty':qty,'amt':amt}
	# response={'status':'success','itemname':itemname,'rate':rate,'qty':qty,'amt':amt}
	return jsonify(response)


@app.route("/gettotal",methods=['POST'])
def gettotal():
	response={'status':'success','total':currentlist.getTotal()}
	return jsonify(response)

@app.route("/additem",methods=['POST'])
def addItem():
	response={'status':'success'}
	iname = request.form.get("iname")
	print(iname)
	return jsonify(response)