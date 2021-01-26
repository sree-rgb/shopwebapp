import os
import requests
from flask import Flask, jsonify, render_template, request, session, redirect,url_for,send_file,send_from_directory
import datetime
from shop import *
from itemsearch import *
import csv
# import posprinter,evercom


class tempList(itemList):
	def clearList(self):
		self.item_list=[]


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
	iname = request.form.get("iname")
	return jsonify(csvmatcher(iname))

@app.route("/defaultlist",methods=['POST'])
def defaultlist():
	# response={'status':'success'}
	item=currentlist.getInfos()[-1]
	itemname,rate,qty,amt,id1=item[0],item[1],item[2],item[3],item[4]
	response={'status':'success','itemname':itemname,'rate':rate,'qty':qty,'amt':amt,'id':id1}
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

@app.route("/print",methods=['GET'])
def printpos():
	response={'status':'fail'}
# 	output_str=posprinter.poslabels()
# 	for x in currentlist.getInfos():
# 		iname,rate,qty,amt=x[0],x[1],x[2],x[3]
# 		output_str=output_str+posprinter.poswriter(iname,rate,qty,amt)
# 	output_str=output_str+posprinter.postotal(currentlist.getTotal())
# 	evercom.newprint()
# 	evercom.printLine(output_str)
# 	evercom.endOfPrint()

# 	print(output_str)
	return jsonify(response)
@app.route("/delitem/<string:del_id>")
def delitem(del_id):
	response={'status':'fail'}
	try:
		del_id=int(del_id)
		if currentlist.delItem(del_id):
			response={'status':'success'}
			return jsonify(response)
		return jsonify(response)
	except IndexError:
		return jsonify(response)
	except ValueError:
		return jsonify(response)
	print(int(del_id))
	return jsonify(response)