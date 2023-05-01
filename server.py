from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import vision

import os
import base64
import re
import time


#/home/0917ba2/mysite/celestial-shore-380106-8271a95fb3ec.json
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./celestial-shore-380106-8271a95fb3ec.json"

client = vision.ImageAnnotatorClient()


# f = open("./img.txt", "r")
# imagestring = f.readline()
# content = base64.b64decode(imagestring)
# image = vision.Image(content=content)
# response = client.text_detection(image=image)
# texts = response.text_annotations

# for text in texts:
#     print(text.description)



app = Flask(__name__)
CORS(app)


@app.route("/")
def main():
    return "not here"

@app.route("/utong", methods=['POST'])
def hello():
    try:
        imagestring = request.form['imageInfo']
    except:
        return jsonify({"result":'imagestring died'})
    try:
        content = base64.b64decode(imagestring)
    except:
        return jsonify({"result":'base64 died'})
    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations


    for text in texts:
        chunk = text.description;
        #print(chunk)
        p1 = re.compile(r'\d{4}[.]\d{2}[.]\d{2}') #2023-05-01
        p2 = re.compile(r'\d{2}[.]\d{2}[.]\d{2}') #23-05-01
        p3 = re.compile(r'\d{2}[.]\d{2}') #05-01

        time_array = []

        r1 = p1.findall(chunk)
        for date in r1:
            print(date)
            time_array.append(time.strptime(date, "%Y.%m.%d"))
            return return_value(time_array)

        r2 = p2.findall(chunk)
        for date in r2:
            print(date)
            time_array.append(time.strptime(date, "%y.%m.%d"))
            return return_value(time_array)

        r3 = p3.findall(chunk)
        for date in r3:
            date = "23." + date
            time_product = time.strptime(date, "%y.%m.%d")
            time_array.append(time_product)
            return return_value(time_array)
        

    return jsonify({"result":"not found"})\
    

@app.route("/pummok", methods=['POST'])
def hi():
    try:
        imagestring = request.form['imageInfo']
    except:
        return jsonify({"result":'imagestring died'})
    try:
        content = base64.b64decode(imagestring)
    except:
        return jsonify({"result":'base64 died'})
    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations


    for text in texts:
        chunk = text.description;
        #print(chunk)
        
        p = re.compile(r'\d{8,20}-?\d{0,8}')
        m = p.match(chunk)

        if m:
            return jsonify({"result":chunk})

    return jsonify({"result":"not found"})


def return_value(time_array):
    if len(time_array) > 0:
        res_date = max(time_array)
        print("good!")
        res_date_string = time.strftime("%Y-%m-%d", res_date)
        return jsonify({"result":res_date_string})



if __name__ == '__main__':
    app.run(debug=True)