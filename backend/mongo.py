from flask import Flask, jsonify, request, Response
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from dotenv import load_dotenv
import os
from flask_cors import cross_origin


load_dotenv()

app = Flask(__name__)

db = os.getenv("DB")
dbname = os.getenv("DB_NAME")
secret = os.getenv("SECRET")

#env
app.config['MONGO_DBNAME'] = dbname
app.config['MONGO_URI'] = db
app.config['JWT_SECRET_KEY'] = secret

client = MongoClient(app.config['MONGO_URI'])
db = client[app.config['MONGO_DBNAME']]

bcrypt = Bcrypt(app)

CORS(app)

@app.route('/register_user', methods=["POST"])
@cross_origin()
def register_user():
    users = db.users
    username = request.get_json()['username']
    email = request.get_json()['email']
    category = request.get_json()['category']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    admin = False

    user_id = users.insert_one({
        'username': username,
        'email': email,
        'category': category,
        'password': password,
        'admin' : admin,
    }).inserted_id

    new_user = users.find_one({'_id': ObjectId(user_id)})

    result = {'email': new_user['email'] + ' registered'}

    return jsonify({'result': result})

@app.route('/register_admin', methods=["POST"])
@cross_origin()
def register_admin():
    users = db.users
    username = request.get_json()['username']
    email = request.get_json()['email']
    category = request.get_json()['category']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    admin = True

    user_id = users.insert_one({
        'username': username,
        'email': email,
        'category': category,
        'password': password,
        'admin' : admin,
    }).inserted_id

    new_user = users.find_one({'_id': ObjectId(user_id)})

    result = {'email': new_user['email'] + ' registered'}

    return jsonify({'result': result})

@app.route('/login', methods=['POST'])
def login():
    users = db.users
    username = request.get_json()['username']
    password = request.get_json()['password']
    result = ""

    response = users.find_one({'username': username})
    if response:
        if bcrypt.check_password_hash(response['password'], password):
            result = jsonify({'result': response['admin']})
        else:
            result = jsonify({"error": "Invalid username and password"})
    else:
        result = jsonify({"result": "No results found"})
    return result

@app.route('/upload', methods=['POST'])
def upload():
    footpath = db.footpath
    lat = request.get_json()['lat']
    long = request.get_json()['long']
    # file = request.files['image']
    approved = request.get_json()['approved']
    label = request.get_json()['label']
    image_data = request.get_json()['image']
    probability = request.get_json()['probability']

    footpath.insert_one({
        'lat': lat,
        'long': long,
        'image': image_data,
        'label': label,
        'approved':approved,
        'probablity': probability
    }).inserted_id

    return "Inserted successfully"

@app.route('/getExcel', methods=['GET'])
def getExcel():
    footpath = db.footpath

    cursor = footpath.find({})

    csvStr = "Latitude, Longitude, Image, Label"+ "\n" 
    for document in cursor:
          print(document)
          csvStr += document['lat'] + ", "+document['long'] + ", "+ document['image'] + ", "+ document['label'] + "\n" 
    
    return Response(
        csvStr,
        mimetype='text/csv',
        headers={'Content-disposition': 'attachment; filename=data.csv'})

@app.route('/verify', methods =['POST'])
@cross_origin()
def verify():
    footpath = db.footpath
    to_be_ver = footpath.find({'approved':False}).limit(5)
    # print(to_be_ver)
    res = []
    for i in to_be_ver:
        print(i)
        req = {
            'image':i.get('image'),
            'label':i.get('label'),
            'lat':i.get('lat'),
            'long':i.get('long')
        }
        # req_json=json.dumps(req)
        res.append(req)
        print(req)
        
    return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True,port=5000)