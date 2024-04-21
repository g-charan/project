from flask import Flask,request,jsonify
from datetime import date
import json
from bson import ObjectId
import bson.json_util
import uuid
from flask_cors import CORS
from datetime import date,datetime,time
from User import user


app = Flask(__name__)
CORS(app)


obj = user()

today = 0
a = 0
current_Time = 0


@app.route("/user/add", methods = ["POST"])
def createUser():
    if request.method == "POST":
        data = request.json
        return obj.createUser(data)
    
@app.route("/user/get", methods=["POST"])
def getUsers():
    if request.method == "POST":
        data = request.json
        return obj.getUser(data)


@app.route("/get_store" , methods = ["POST"])
def getStores():
    if request.method == "POST":
        data = request.json
        return obj.getAllStores(data)
      
@app.route("/get_customer" , methods = ["POST"])
def getCustomers():
    if request.method == "POST":
        data = request.json
        return obj.getAllCustomers(data)
      
@app.route("/get_payments" , methods = ["POST"])
def getPayments():
    if request.method == "POST":
        data = request.json
        return obj.getAllPayments(data)
    

      
@app.route("/get_products" , methods = ["POST"])
def getProducts():
    if request.method == "POST":
        data = request.json
        return obj.getAllProducts(data)
    
    
@app.route("/get_store/<int:id>",methods = ["POST","DELETE"])
def deleteStore(id):
    if request.method == "DELETE":
        return obj.deleteStore(id)

    

if __name__ == "__main__":
  # app.run(host="0.0.0.0", port=5000, debug=True)
   app.run( port=5000, debug=True)






