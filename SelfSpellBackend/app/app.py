from flask import Flask, request, jsonify
from app.config.config import get_config_by_name
from app.initialize_functions import initialize_route, initialize_db, initialize_swagger



def create_app(config='development') -> Flask:
    """
    Create a Flask application.

    Args:
        config: The configuration object to use.

    Returns:
        A Flask application instance.
    """
    app = Flask(__name__)
    if config:
        app.config.from_object(get_config_by_name(config))

    # Initialize extensions
    initialize_db(app)

    # Register blueprints
    initialize_route(app)

    # Initialize Swagger
    initialize_swagger(app)

    return app



def calculate_distance(features1, features2):

    squared_differences = [(f1 - f2) * (f1 - f2) for f1, f2 in zip(features1, features2)]
    
    return squared_differences

class Hobby:
    def __init__(self, name, features):
        self.name = name
        self.features = features

# Example list of hobbies with feature vectors (instead of querying the DB)
hobbies = [
    Hobby(name="Painting", features=[0.5, -0.2, 0.3, 0.7]),
    Hobby(name="Cycling", features=[-0.1, 0.4, 0.2, -0.3]),
    Hobby(name="Reading", features=[0.1, -0.1, 0.0, 0.5]),
    Hobby(name="Cooking", features=[0.6, 0.3, -0.4, 0.2])
]

@app.route('/calculate_distances', methods=['POST'])
def calculate_hobby_distances():
    """
    Endpoint to calculate distances between user features and all hobbies.
    Assumes that the user's features are sent in the request body as JSON.
    """
    # Get the user's features from the request (sent as JSON)
    user_features = request.json.get('features')
    if not user_features:
        return jsonify({"error": "User features are required"}), 400
    age = request.json.get('age')
    # Query all hobbies from the database
    hobbies = [    {"name": "Reading", "features": [1, 2, 3, 4, 5], "minAge": 10, "maxAge": 20},
    {"name": "Cooking", "features": [1, 3, 2, 4, 5], "minAge": 10, "maxAge": 20},
    # Add more hobbies with their features
]  # This should be replaced with actual hobby data
    
    # Calculate the distance for each hobby
    hobby_distances = []
    for hobby in hobbies:
        hobby_features = hobby.features  # Each hobby should have a `features` attribute
        # Ensure the lists have the same length
        if len(hobby_features) == len(user_features):
            distance = calculate_distance(user_features, hobby_features)
            if age >= hobby["minAge"] and age <= hobby["maxAge"]:
                isInRange = 0.5
            else:
                isInRange = -0.5
            hobby_distances.append({
                "hobby": hobby.name,  # The hobby name
                "distance": distance+isInRange   # The calculated distance
            })
        else:
            # If the lengths of the features don't match, skip that hobby
            hobby_distances.append({
                "hobby": hobby.name,
                "distance": "Invalid feature length"
            })

    # Return the results as JSON
    return jsonify(hobby_distances)