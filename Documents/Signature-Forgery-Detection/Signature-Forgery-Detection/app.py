import os
import pickle
import numpy as np
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Load models
def load_model(path):
    with open(path, "rb") as f:
        return pickle.load(f)

random_forest_path = os.getenv("RANDOM_FOREST_MODEL_PATH")
xgboost_path = os.getenv("XGBOOST_MODEL_PATH")

random_forest_model = load_model(random_forest_path)
xgboost_model = load_model(xgboost_path)

print("✅ Models Loaded Successfully!")

app = Flask(__name__, static_folder="static")
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        features = np.array(data["features"]).reshape(1, -1)

        # Ensure models support prediction
        if hasattr(random_forest_model, "predict") and hasattr(xgboost_model, "predict"):
            rf_prediction = int(random_forest_model.predict(features)[0])
            xgb_prediction = int(xgboost_model.predict(features)[0])
        else:
            return jsonify({"error": "Loaded objects are not valid models!"})

        return jsonify({
            "Random_Forest_Prediction": rf_prediction,
            "XGBoost_Prediction": xgb_prediction
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
