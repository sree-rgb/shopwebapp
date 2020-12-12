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

@app.route("/defaultlist/<string:list_number>",methods=['POST'])
def defaultlist(list_number):
	# response={'status':'success'}
	if list_number=='last':
		item=currentlist.getInfos()[-1]
		itemname,rate,qty,amt=item[0],item[1],item[2],item[3]
		response={'status':'success','itemname':itemname,'rate':rate,'qty':qty,'amt':amt}
		print(response)
	# response={'status':'success','itemname':itemname,'rate':rate,'qty':qty,'amt':amt}
		return jsonify(response)


@app.route("/gettotal",methods=['POST'])
def gettotal():
	response={'status':'success','total':currentlist.getTotal()}
	return jsonify(response)

@app.route("/additem",methods=['POST'])
def additem():
	response={'status':'success'}
	iname = request.form.get("iname")
	rate = float(request.form.get("rate"))
	qty = float(request.form.get("qty"))
	currentlist.addItem(item(rate,qty,iname))
	return jsonify(response)