# FastAPI Image Classifier

This project is a FastAPI application that accepts an image through an endpoint and returns a classified response. It's designed for easy integration and scalability, leveraging FastAPI's asynchronous features for high performance.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have Python 3.6+ installed on your system. You can download it from [python.org](https://www.python.org/downloads/).

### Installation

1. **Clone the repository:**

```bash
git clone https://yourprojectlink.git
```

2.  **Navigate to project directory:**

```bash
cd backend
```

3.  **Enable python Virtual Environment:**

```bash
python -m venv venv
source venv/bin/activate
```

4. **Install the requirements:**

```bash
python install -r requirements.txt
```

5. **Start the Fast API Server:**

```
uvicorn main:app --reload
```

This command will start the application on `http://127.0.0.1:8000`. The `--reload` flag enables auto-reload so the server will restart after code changes.

## Base URL

http://127.0.0.1:8000/api/v1

## Usage

To classify an image, send a POST request to the `/classify` endpoint with the image file. The API will return a JSON response with the classification results.

## Deployment

For deployment instructions, refer to FastAPI's official documentation on [Deployment](https://fastapi.tiangolo.com/deployment/).

## Built With

- [FastAPI](https://fastapi.tiangolo.com/) - The web framework used
- [Uvicorn](https://www.uvicorn.org/) - ASGI server for FastAPI
- [Pydantic](https://pydantic-docs.helpmanual.io/) - Data validation and settings management
- [Python-Multipart](https://github.com/andrew-d/python-multipart) - For handling multipart/form-data in Python
