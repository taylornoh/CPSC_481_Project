from flask import Flask, Response, request, jsonify
from io import BytesIO
import base64
from flask_cors import CORS, cross_origin
import os
import sys
import json
from rubik.cube import Cube
from rubik.solve import Solver

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


def fetch_cube_state_as_str(json_orientation):
    string_orientation = ""
    other_faces = ["Left", "Front", "Right", "Back"]
    
    start_index = 0
    end_index = 3

    for square in json_orientation["data"]["Up"]:
        string_orientation += square[0].upper()

    while (end_index <= 9):
        for face in other_faces:
            color_set = json_orientation["data"][face][start_index:end_index]
            for color in color_set:
                string_orientation += color[0].upper()
        
        start_index += 3
        end_index += 3
    
    for square in json_orientation["data"]["Down"]:
        string_orientation += square[0].upper()

    return string_orientation

def convert_solver_moves(solver_moves):
    legend = {
        "U": "Turn the upper face clockwise (90 degrees)",
        "Ui": "Turn the upper face counterclockwise (90 degrees)",
        "B": "Turn the back face clockwise (90 degrees)",
        "Bi": "Turnthe back face counterclockwise (90 degrees)",
        "E": "Turn the Equatorial slice clockwise (90 degrees)",
        "Ei": "Turn the Equatorial slice counterclockwise (90 degrees)",
        "L": "Turn the Left face clockwise (90 degrees)",
        "Li": "Turn the Left face counterclockwise (90 degrees)",
        "R": "Turn the Right face clockwise (90 degrees)",
        "Ri": "Turn the Right face counterclockwise (90 degrees)",
        "D": "Turn the Down face clockwise (90 degrees)",
        "Di": "Turn the Down face counterclockwise (90 degrees)",
        "F": "Turn the Front face clockwise (90 degrees)",
        "Fi": "Turn the Front face counterclockwise (90 degrees)",
        "S": "Turn the middle vertical slice clockwise (90 degrees)",
        "Si": "Turn the middle vertical slice counterclockwise (90 degrees)",
        "X": "Rotate the entire cube around the X-axis clockwise (viewed from the front)",
        "Xi": "Rotate the entire cube around the X-axis counterclockwise (viewed from the front)",
        "Z": "Rotate the entire cube around the Z-axis clockwise (viewed from the front)",
        "Zi": "Rotate the entire cube around the Z-axis counterclockwise (viewed from the front)"
    }

    converted_moves = []

    for move in solver_moves:
        converted_moves.append(legend[move])
    
    return converted_moves

@app.route("/steps", methods=['GET', 'POST'])
def steps():
    if request.method == "POST":
        json_orientation = request.json["data"]
        string_orientation = fetch_cube_state_as_str(json_orientation)

        cube = Cube(string_orientation)
        solver = Solver(cube)
        solver.solve()

        raw_moves = solver.moves
        converted_moves = convert_solver_moves(raw_moves)

        steps = {
            "raw_moves": raw_moves,
            "converted_moves": converted_moves
        }

        return jsonify(steps)
