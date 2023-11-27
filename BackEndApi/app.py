from flask import Flask, Response, request, jsonify
from io import BytesIO
import base64
from flask_cors import CORS, cross_origin
import os
import sys
import json
from cube import RubiksCube
from solver import IDA_star, build_heuristic_db

MAX_MOVES = 5
NEW_HEURISTICS = False
HEURISTIC_FILE = 'heuristic.json'

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
    faces = ["Top", "Left", "Front", "Right", "Back", "Bottom"]
    cube_state_str = ""

    # Iterating through the faces in the standard Rubix cube layout order
    for face in faces:
        if face == "Top":
            face = "Up"
        elif face == "Bottom":
            face = "Down"
        # Grabbing the first letter from each square and inserting it into the string
        for square in cube_state_dict[face]:
            cube_state_str += square[0]
    
    return cube_state_str


@app.route("/steps", methods=['GET', 'POST'])
def steps():
    if request.method == "POST":
        with open("test.json", "r") as json_cube:
            cube_state_dict = json.load(json_cube)
            cube_state_str = construct_cube_state_str(cube_state_dict)

            cube = RubiksCube(state=cube_state_str)
            cube.show()

            if os.path.exists(HEURISTIC_FILE):
                with open(HEURISTIC_FILE) as f:
                    h_db = json.load(f)
            else:
                h_db = None

            if h_db is None or NEW_HEURISTICS is True:
                actions = [(r, n, d) for r in ['h', 'v', 's'] for d in [0, 1] for n in range(cube.n)]
                h_db = build_heuristic_db(
                    cube.stringify(),
                    actions,
                    max_moves = MAX_MOVES,
                    heuristic = h_db
                )

                with open(HEURISTIC_FILE, 'w', encoding='utf-8') as f:
                    json.dump(
                        h_db,
                        f,
                        ensure_ascii=False,
                        indent=4
                    )
            
            cube.shuffle(l_rot = MAX_MOVES if MAX_MOVES < 5 else 5, u_rot = MAX_MOVES)
            #--------------------------------
            solver = IDA_star(h_db)
            moves = solver.run(cube.stringify())
            print(moves)

            for m in moves:
                if m[0] == 'h':
                    cube.horizontal_twist(m[1], m[2])
                elif m[0] == 'v':
                    cube.vertical_twist(m[1], m[2])
                elif m[0] == 's':
                    cube.side_twist(m[1], m[2])
            cube.show()

            return moves
