# Quiz Website

A full-stack quiz application with a Python Flask backend and Vite + React frontend.

## Features

- **11 different quizzes** across 10 genres (General Knowledge, Science, History, Geography, Sports, Entertainment, Technology, Literature, Food, Nature)
- Genre-based quiz organization with filtering
- Interactive quiz interface with progress tracking
- Real-time score calculation
- Detailed results view with correct/incorrect answers
- Beautiful gradient UI with Tailwind CSS
- RESTful API backend with CORS support
- Home page to browse and select quizzes

## Tech Stack

### Backend
- Python 3.x
- Flask - Web framework
- Flask-CORS - Cross-origin resource sharing

### Frontend
- React 18
- Vite - Build tool and dev server
- Tailwind CSS - Styling
- JavaScript

## Project Structure

```
.
├── backend/
│   ├── app.py              # Flask application with API endpoints
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── index.html          # HTML entry point
│   ├── package.json        # Node.js dependencies
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── postcss.config.js   # PostCSS configuration
│   └── src/
│       ├── main.jsx        # React entry point
│       ├── index.css       # Global styles with Tailwind
│       ├── App.jsx         # Main application component
│       └── components/
│           ├── Home.jsx    # Home page with quiz selection
│           ├── Quiz.jsx    # Quiz interface component
│           ├── Results.jsx # Results display component
│           └── Loading.jsx # Loading spinner component
└── README.md               # This file
```

## Setup Instructions

### Prerequisites

- Python 3.x installed
- Node.js and npm installed

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the Flask server:
   ```bash
   python app.py
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## Running the Application

1. Start the backend server (in one terminal):
   ```bash
   cd backend
   python app.py
   ```

2. Start the frontend server (in another terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### GET /api/quizzes
Returns a list of all available quizzes with their metadata.

**Response:**
```json
[
  {
    "id": 1,
    "title": "General Knowledge Quiz",
    "genre": "General Knowledge",
    "description": "Test your general knowledge with these common questions",
    "question_count": 5
  }
]
```

### GET /api/quiz/<quiz_id>
Returns a specific quiz data without correct answers.

**Response:**
```json
{
  "id": 1,
  "title": "General Knowledge Quiz",
  "genre": "General Knowledge",
  "description": "Test your general knowledge with these common questions",
  "questions": [
    {
      "id": 1,
      "question": "What is the capital of France?",
      "options": ["London", "Berlin", "Paris", "Madrid"]
    }
  ]
}
```

### POST /api/quiz/<quiz_id>/submit
Submits quiz answers for a specific quiz and returns the score.

**Request Body:**
```json
{
  "answers": {
    "1": 2,
    "2": 1
  }
}
```

**Response:**
```json
{
  "quiz_id": 1,
  "quiz_title": "General Knowledge Quiz",
  "score": 2,
  "total": 5,
  "percentage": 40,
  "results": [
    {
      "question_id": 1,
      "question": "What is the capital of France?",
      "options": ["London", "Berlin", "Paris", "Madrid"],
      "user_answer": 2,
      "correct_answer": 2,
      "is_correct": true
    }
  ]
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy"
}
```

## Customization

### Adding New Quizzes

Edit `backend/app.py` and add a new quiz object to the `quizzes` list:

```python
quizzes = [
    # ... existing quizzes ...
    {
        "id": 12,
        "title": "Your Quiz Title",
        "genre": "Your Genre",
        "description": "Quiz description",
        "questions": [
            {
                "id": 1,
                "question": "Your question?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correct_answer": 0  # Index of correct option (0-based)
            }
        ]
    }
]
```

### Adding Questions to Existing Quizzes

Find the quiz by its ID in the `quizzes` list and add questions to its `questions` array.

### Styling

The frontend uses Tailwind CSS. Modify:
- `frontend/src/index.css` for global styles
- Component files for component-specific styles
- `frontend/tailwind.config.js` for Tailwind theme customization

## Building for Production

### Frontend

```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

### Backend

For production, consider:
- Using a production WSGI server like Gunicorn
- Setting environment variables
- Using a proper database instead of in-memory data
- Implementing authentication and rate limiting

## License

This project is open source and available for educational purposes.
