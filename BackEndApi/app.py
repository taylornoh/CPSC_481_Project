from flask import Flask, Response, request, jsonify
from io import BytesIO
import base64
from flask_cors import CORS, cross_origin
import os
import sys
import json

from twophase import solve

app = Flask(__name__)
cors = CORS(app)

def imageNaming():
    file_path= 'images/image0.jpg'
    
    if(checkFullImage()):
        clearPhotos()

    for num in range(6):
        if(os.path.isfile(file_path)):
            file_path = "images/image" + str(num) + ".jpg"
        else:
            break

    return file_path


def checkFullImage():
    if(os.path.isfile("images/image5.jpg")):
        return True
    return False


def clearPhotos():
    for num in range(6):
        os.remove("images/image" + str(num) + ".jpg")


@app.route("/image", methods=['GET', 'POST'])
def image():
    if(request.method == "POST"):
        bytesOfImage = request.get_data()
        file_path = imageNaming()
        with open(file_path, 'wb') as out:
            out.write(bytesOfImage)

        if(checkFullImage()):
            return "All images Read"
        return "Image read"



def construct_cube_state_str(cube_state_dict):
    faces = ["Up", "Right", "Front", "Down", "Left", "Back"]
    cube_state_str = ""

    face_color_mapping = {}
    for face in faces:
        middle_color = cube_state_dict[face][4]
        face_color_mapping[middle_color[0]] = face[0]

    # Iterating through the faces in the standard Rubix cube layout order
    for face in faces:
        # Grabbing the first letter from each square and inserting it into the string
        for square in cube_state_dict[face]:
            cube_state_str += face_color_mapping[square[0]]

    return cube_state_str

def construct_detailed_steps(steps):
    detailed_steps = []
    move_mapping = {
        "F": "90 degree clockwise turn of Front face",
        "R": "90 degree clockwise turn of Right face",
        "U": "90 degree clockwise turn of Upper face",
        "L": "90 degree clockwise turn of Left face",
        "B": "90 degree clockwise turn of Back face",
        "D": "90 degree clockwise turn of Down face",
        "F'": "90 degree counterclockwise turn of Front face",
        "R'": "90 degree counterclockwise turn of Right face",
        "U'": "90 degree counterclockwise turn of Upper face",
        "L'": "90 degree counterclockwise turn of Left face",
        "B'": "90 degree counterclockwise turn of Back face",
        "D'": "90 degree counterclockwise turn of Down face",
        "F2": "180 degree turn of Front face",
        "R2": "180 degree turn of Right face",
        "U2": "180 degree turn of Upper face",
        "L2": "180 degree turn of Left face",
        "B2": "180 degree turn of Back face",
        "D2": "180 degree turn of Down face"
    }

    for step in steps:
        detailed_steps.append(move_mapping[step])
    
    return detailed_steps

@app.route("/steps", methods=['GET', 'POST'])
def steps():
    if request.method == "POST":
        with open("test.json", "r") as json_cube:
            cube_state_dict = json.load(json_cube)
            cube_state_str = construct_cube_state_str(cube_state_dict)
            
            solution = {
                "steps": [],
                "detailed_steps": []
            }

            solution["steps"] = solve(cube_state_str).split()
            solution["detailed_steps"] = construct_detailed_steps(solution["steps"])

            return jsonify(solution)
