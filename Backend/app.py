from flask import Flask, request, jsonify
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure the Gemini API key
# Make sure to set the GOOGLE_API_KEY environment variable
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

class RecipeFeedback(BaseModel):
    rating: int
    opinions: list[str]
    suggestions: list[str]

@app.route('/analyze-recipe', methods=['POST'])
def analyze_recipe():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        # Read the image file
        image_data = file.read()

        # Create the Gemini client
        client = genai.GenerativeModel(model_name="gemini-2.5-flash")

        PROMPT_RECETA_PRENATAL = """
Actúa como un dietista/nutricionista experto en salud materna. Evalúa la receta de la imagen y proporciona una calificación, opiniones y sugerencias para una madre gestante.

**Objetivo:**
Evaluar la idoneidad de la receta para una madre gestante, centrándose en su valor nutricional y seguridad.

**Formato de la Salida (Output Estructurado):**
1.  **rating:** Una calificación de 1 a 5, donde 5 es excelente.
2.  **opinions:** Una lista de opiniones sobre la receta, destacando los aspectos positivos y negativos para una madre gestante.
3.  **suggestions:** Una lista de sugerencias para mejorar la receta o alternativas más saludables.
"""

        # Generate content
        response = client.generate_content(
            [
                PROMPT_RECETA_PRENATAL,
                {
                    "mime_type": "image/png",
                    "data": image_data
                }
            ],
            generation_config={
                "response_mime_type": "application/json",
                "response_schema": RecipeFeedback,
            }
        )

        # Return the parsed response
        import json
        json_data = json.loads(response.candidates[0].content.parts[0].text)
        return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True, port=5001)