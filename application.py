import os
import requests
from flask import Flask, jsonify, render_template, request, session, redirect,url_for,send_file,send_from_directory
import datetime
from shop import *


class tempList(itemList):
	def clearList(self):
		self.itemList=[]


currentlist=tempList()
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

@app.route("/")
def index():
    return render_template("index.html")
@app.route("/clearlist",methods=['POST'])
def clearlist():
	response={'status':'success'}
	currentlist.clearList()
	return jsonify(response)

@app.route("/getmatchlist",methods=['POST'])
def givematchlist():
	response={'status':'success'}
	return jsonify(response)

@app.route("/defaultlist",methods=['POST'])
def defaultlist():
	# response={'status':'success'}
	item=currentlist.getInfos()[-1]
	itemname,rate,qty,amt=item[0],item[1],item[2],item[3]
	response={'status':'success','itemname':itemname,'rate':rate,'qty':qty,'amt':amt}
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

@app.route("/payment",methods=['POST'])
def payment():
	response={'status':'success'}
	payment= float(request.form.get("payment"))
	response['balance']=currentlist.addAmtPaid(payment)
	return jsonify(response)