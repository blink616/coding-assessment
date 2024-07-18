from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import random
import logging

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@router.post("/classify/")
async def classify_image(file: UploadFile = File(...)):
    # Check if the file is provided by checking the filename
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided. Please upload an image.")

    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

    try:
        # Simulate defect detection
        classification = random.choice(["OK", "NOK"])
        logger.info(f"Classified image as {classification}")
        return JSONResponse(content={"success": "true",
                                     "data": {
                                         "classification": classification
                                     }})
    except Exception as e:
        logger.error(f"Error processing file: {e}")

        raise HTTPException(status_code=500, detail="Internal server error")
