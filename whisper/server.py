from flask import Flask, request, jsonify
import whisper
import os
import tempfile

app = Flask(__name__)
model = whisper.load_model("base")  # can be "tiny", "small", "medium", "large"

@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    # Save file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp:
        file.save(temp.name)
        temp_path = temp.name

    # Run Whisper transcription
    result = model.transcribe(temp_path)

    # Remove temporary file
    os.remove(temp_path)

    return jsonify({"text": result["text"]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
