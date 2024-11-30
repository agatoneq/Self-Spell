import os
from flask import Flask, jsonify, request
from flask.cli import load_dotenv
from app.models.hobby import Hobby
from app.app import create_app

# Load environment variables
load_dotenv()

# Set configuration
config = os.getenv('FLASK_ENV') or 'development'

# Create the Flask app
app = create_app(config)

# Define routes after app initialization
@app.route('/')
def main_page():
    return "Hello, welcome to the hobby recommendation API!"

@app.route('/todos', methods=['GET'])
def get_todos():
    hobbies = Hobby.query.all()
    return jsonify([{
        'id': hobby.id,
        'description': hobby.description,
        'characteristics': hobby.characteristics,
        'url': hobby.url
    } for hobby in hobbies])

def calculate_distance(features1, features2):
    """
    Calculate the squared Euclidean distance between two feature vectors.
    """
    return sum((f1 - f2) ** 2 for f1, f2 in zip(features1, features2))

@app.route('/calculate_distances', methods=['POST'])
def calculate_hobby_distances():
    """
    Calculate distances between user's features and hobbies in the database.
    Includes age-based filtering.
    """
    # Validate and extract JSON request data
    request_data = request.get_json()
    user_features = request_data.get('features')
    age = request_data.get('age')

    if not user_features or not isinstance(user_features, list):
        return jsonify({"error": "Invalid or missing 'features' in request body"}), 400

    if age is None or not isinstance(age, int):
        return jsonify({"error": "Invalid or missing 'age' in request body"}), 400

    # Query all hobbies from the database
    hobbies = Hobby.query.all()

    # Calculate distances for each hobby
    hobby_distances = []
    for hobby in hobbies:
        # Ensure characteristics exist and are the correct length
        hobby_features = hobby.characteristics
        if not hobby_features or len(hobby_features) != len(user_features):
            hobby_distances.append({
                "hobby": hobby.description,
                "distance": "Invalid feature length"
            })
            continue

        # Calculate squared Euclidean distance
        distance = calculate_distance(user_features, hobby_features)

        # Age-based filtering
        is_in_range = 0.5 if hobby.min_age <= age <= hobby.max_age else -0.5

        # Append calculated data
        hobby_distances.append({
            "hobby": hobby.description,
            "distance": distance + is_in_range
        })

    return jsonify(hobby_distances)

if __name__ == "__main__":
    if config == 'development':
        app.run(debug=True)
    else:
        from werkzeug.serving import run_simple
        run_simple('0.0.0.0', 5000, app)
