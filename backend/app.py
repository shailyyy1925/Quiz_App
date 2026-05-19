from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Quiz data - in a real app, this would come from a database
quizzes = [
    {
        "id": 1,
        "title": "General Knowledge Quiz",
        "genre": "General Knowledge",
        "description": "Test your general knowledge with these common questions",
        "questions": [
            {
                "id": 1,
                "question": "What is the capital of France?",
                "options": ["London", "Berlin", "Paris", "Madrid"],
                "correct_answer": 2
            },
            {
                "id": 2,
                "question": "Which planet is known as the Red Planet?",
                "options": ["Venus", "Mars", "Jupiter", "Saturn"],
                "correct_answer": 1
            },
            {
                "id": 3,
                "question": "What is the largest ocean on Earth?",
                "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                "correct_answer": 3
            },
            {
                "id": 4,
                "question": "Who painted the Mona Lisa?",
                "options": ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                "correct_answer": 2
            },
            {
                "id": 5,
                "question": "What is the chemical symbol for gold?",
                "options": ["Go", "Gd", "Au", "Ag"],
                "correct_answer": 2
            }
        ]
    },
    {
        "id": 2,
        "title": "Science Quiz",
        "genre": "Science",
        "description": "Challenge yourself with science-related questions",
        "questions": [
            {
                "id": 1,
                "question": "What is the speed of light?",
                "options": ["299,792 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
                "correct_answer": 0
            },
            {
                "id": 2,
                "question": "What is the powerhouse of the cell?",
                "options": ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
                "correct_answer": 1
            },
            {
                "id": 3,
                "question": "What gas do plants absorb from the atmosphere?",
                "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
                "correct_answer": 2
            },
            {
                "id": 4,
                "question": "What is the chemical formula for water?",
                "options": ["CO2", "H2O", "NaCl", "O2"],
                "correct_answer": 1
            },
            {
                "id": 5,
                "question": "What is the largest organ in the human body?",
                "options": ["Heart", "Liver", "Brain", "Skin"],
                "correct_answer": 3
            }
        ]
    },
    {
        "id": 3,
        "title": "History Quiz",
        "genre": "History",
        "description": "Travel back in time with these history questions",
        "questions": [
            {
                "id": 1,
                "question": "In which year did World War II end?",
                "options": ["1943", "1944", "1945", "1946"],
                "correct_answer": 2
            },
            {
                "id": 2,
                "question": "Who was the first President of the United States?",
                "options": ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
                "correct_answer": 2
            },
            {
                "id": 3,
                "question": "Which ancient wonder was located in Alexandria?",
                "options": ["Hanging Gardens", "Lighthouse", "Colossus", "Mausoleum"],
                "correct_answer": 1
            },
            {
                "id": 4,
                "question": "What year did the Titanic sink?",
                "options": ["1910", "1911", "1912", "1913"],
                "correct_answer": 2
            },
            {
                "id": 5,
                "question": "Who discovered America in 1492?",
                "options": ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Amerigo Vespucci"],
                "correct_answer": 1
            }
        ]
    },
    {
        "id": 4,
        "title": "Geography Quiz",
        "genre": "Geography",
        "description": "Explore the world with geography questions",
        "questions": [
            {
                "id": 1,
                "question": "Which is the longest river in the world?",
                "options": ["Amazon", "Nile", "Yangtze", "Mississippi"],
                "correct_answer": 1
            },
            {
                "id": 2,
                "question": "Which country has the largest population?",
                "options": ["India", "USA", "China", "Indonesia"],
                "correct_answer": 0
            },
            {
                "id": 3,
                "question": "What is the smallest country in the world?",
                "options": ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
                "correct_answer": 2
            },
            {
                "id": 4,
                "question": "Which continent is the Sahara Desert located in?",
                "options": ["Asia", "South America", "Africa", "Australia"],
                "correct_answer": 2
            },
            {
                "id": 5,
                "question": "What is the capital of Australia?",
                "options": ["Sydney", "Melbourne", "Canberra", "Perth"],
                "correct_answer": 2
            }
        ]
    },
    {
        "id": 5,
        "title": "Sports Quiz",
        "genre": "Sports",
        "description": "Test your sports knowledge",
        "questions": [
            {
                "id": 1,
                "question": "How many players are on a soccer team on the field?",
                "options": ["9", "10", "11", "12"],
                "correct_answer": 2
            },
            {
                "id": 2,
                "question": "In which sport would you perform a slam dunk?",
                "options": ["Volleyball", "Basketball", "Tennis", "Baseball"],
                "correct_answer": 1
            },
            {
                "id": 3,
                "question": "How many rings are on the Olympic flag?",
                "options": ["4", "5", "6", "7"],
                "correct_answer": 1
            },
            {
                "id": 4,
                "question": "What sport is known as the 'gentleman's game'?",
                "options": ["Golf", "Cricket", "Tennis", "Polo"],
                "correct_answer": 1
            },
            {
                "id": 5,
                "question": "How long is a marathon?",
                "options": ["26.2 miles", "24.2 miles", "28.2 miles", "30.2 miles"],
                "correct_answer": 0
            }
        ]
    },
    {
        "id": 6,
        "title": "Movies Quiz",
        "genre": "Entertainment",
        "description": "Cinema trivia for movie buffs",
        "questions": [
            {
                "id": 1,
                "question": "Who directed the movie 'Titanic'?",
                "options": ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Martin Scorsese"],
                "correct_answer": 1
            },
            {
                "id": 2,
                "question": "What year was the first 'Star Wars' movie released?",
                "options": ["1975", "1976", "1977", "1978"],
                "correct_answer": 2
            },
            {
                "id": 3,
                "question": "Which actor played Jack in 'Titanic'?",
                "options": ["Brad Pitt", "Tom Cruise", "Leonardo DiCaprio", "Johnny Depp"],
                "correct_answer": 2
            },
            {
                "id": 4,
                "question": "What is the highest-grossing film of all time?",
                "options": ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars: The Force Awakens"],
                "correct_answer": 1
            },
            {
                "id": 5,
                "question": "Which movie features the quote 'Here's looking at you, kid'?",
                "options": ["Gone with the Wind", "Casablanca", "The Godfather", "Citizen Kane"],
                "correct_answer": 1
            }
        ]
    },
    {
        "id": 7,
        "title": "Music Quiz",
        "genre": "Entertainment",
        "description": "Test your music knowledge",
        "questions": [
            {
                "id": 1,
                "question": "Who is known as the 'King of Pop'?",
                "options": ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"],
                "correct_answer": 1
            },
            {
                "id": 2,
                "question": "Which instrument has 88 keys?",
                "options": ["Guitar", "Violin", "Piano", "Flute"],
                "correct_answer": 2
            },
            {
                "id": 3,
                "question": "What band was Freddie Mercury the lead singer of?",
                "options": ["The Beatles", "Led Zeppelin", "Queen", "Pink Floyd"],
                "correct_answer": 2
            },
            {
                "id": 4,
                "question": "Which genre originated in New Orleans?",
                "options": ["Jazz", "Rock", "Country", "Hip Hop"],
                "correct_answer": 0
            },
            {
                "id": 5,
                "question": "How many strings does a standard guitar have?",
                "options": ["4", "5", "6", "7"],
                "correct_answer": 2
            }
        ]
    },
    {
        "id": 8,
        "title": "Technology Quiz",
        "genre": "Technology",
        "description": "Tech trivia for the digital age",
        "questions": [
            {
                "id": 1,
                "question": "Who founded Microsoft?",
                "options": ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"],
                "correct_answer": 1
            },
            {
                "id": 2,
                "question": "What does CPU stand for?",
                "options": ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Computer Processing Unit"],
                "correct_answer": 0
            },
            {
                "id": 3,
                "question": "What year was the iPhone first released?",
                "options": ["2005", "2006", "2007", "2008"],
                "correct_answer": 2
            },
            {
                "id": 4,
                "question": "What programming language is known for its snake logo?",
                "options": ["Java", "Python", "Ruby", "Go"],
                "correct_answer": 1
            },
            {
                "id": 5,
                "question": "What does HTML stand for?",
                "options": ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
                "correct_answer": 0
            }
        ]
    },
    {
        "id": 9,
        "title": "Literature Quiz",
        "genre": "Literature",
        "description": "Bookworms' paradise",
        "questions": [
            {
                "id": 1,
                "question": "Who wrote 'Romeo and Juliet'?",
                "options": ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
                "correct_answer": 1
            },
            {
                "id": 2,
                "question": "What is the first book of the Bible?",
                "options": ["Exodus", "Genesis", "Leviticus", "Numbers"],
                "correct_answer": 1
            },
            {
                "id": 3,
                "question": "Who wrote '1984'?",
                "options": ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],
                "correct_answer": 1
            },
            {
                "id": 4,
                "question": "What is the name of Harry Potter's owl?",
                "options": ["Errol", "Hedwig", "Pigwidgeon", "Scabbers"],
                "correct_answer": 1
            },
            {
                "id": 5,
                "question": "Who wrote 'Pride and Prejudice'?",
                "options": ["Emily Brontë", "Charlotte Brontë", "Jane Austen", "Virginia Woolf"],
                "correct_answer": 2
            }
        ]
    },
    {
        "id": 10,
        "title": "Food & Cooking Quiz",
        "genre": "Food",
        "description": "Culinary knowledge test",
        "questions": [
            {
                "id": 1,
                "question": "What is the main ingredient in guacamole?",
                "options": ["Tomato", "Avocado", "Onion", "Pepper"],
                "correct_answer": 1
            },
            {
                "id": 2,
                "question": "Which country invented sushi?",
                "options": ["China", "Korea", "Japan", "Thailand"],
                "correct_answer": 2
            },
            {
                "id": 3,
                "question": "What spice is derived from the crocus flower?",
                "options": ["Turmeric", "Paprika", "Saffron", "Cumin"],
                "correct_answer": 2
            },
            {
                "id": 4,
                "question": "What type of pasta is shaped like rice grains?",
                "options": ["Orzo", "Ravioli", "Fusilli", "Penne"],
                "correct_answer": 0
            },
            {
                "id": 5,
                "question": "Which fruit is known as the 'king of fruits'?",
                "options": ["Mango", "Durian", "Apple", "Banana"],
                "correct_answer": 1
            }
        ]
    },
    {
        "id": 11,
        "title": "Animals Quiz",
        "genre": "Nature",
        "description": "Test your animal knowledge",
        "questions": [
            {
                "id": 1,
                "question": "What is the largest mammal in the world?",
                "options": ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                "correct_answer": 1
            },
            {
                "id": 2,
                "question": "How many hearts does an octopus have?",
                "options": ["1", "2", "3", "4"],
                "correct_answer": 2
            },
            {
                "id": 3,
                "question": "What is the fastest land animal?",
                "options": ["Lion", "Horse", "Cheetah", "Gazelle"],
                "correct_answer": 2
            },
            {
                "id": 4,
                "question": "Which bird can fly backwards?",
                "options": ["Eagle", "Hummingbird", "Sparrow", "Owl"],
                "correct_answer": 1
            },
            {
                "id": 5,
                "question": "What is a group of lions called?",
                "options": ["Pack", "Herd", "Pride", "Flock"],
                "correct_answer": 2
            }
        ]
    }
]

@app.route('/api/quizzes', methods=['GET'])
def get_all_quizzes():
    """Get list of all available quizzes"""
    quizzes_list = [
        {
            "id": quiz["id"],
            "title": quiz["title"],
            "genre": quiz["genre"],
            "description": quiz["description"],
            "question_count": len(quiz["questions"])
        }
        for quiz in quizzes
    ]
    return jsonify(quizzes_list)

@app.route('/api/quiz/<int:quiz_id>', methods=['GET'])
def get_quiz(quiz_id):
    """Get a specific quiz data without correct answers"""
    quiz = next((q for q in quizzes if q["id"] == quiz_id), None)
    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404
    
    quiz_without_answers = {
        "id": quiz["id"],
        "title": quiz["title"],
        "genre": quiz["genre"],
        "description": quiz["description"],
        "questions": [
            {
                "id": q["id"],
                "question": q["question"],
                "options": q["options"]
            }
            for q in quiz["questions"]
        ]
    }
    return jsonify(quiz_without_answers)

@app.route('/api/quiz/<int:quiz_id>/submit', methods=['POST'])
def submit_quiz(quiz_id):
    """Submit quiz answers and calculate score"""
    quiz = next((q for q in quizzes if q["id"] == quiz_id), None)
    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404
    
    data = request.json
    user_answers = data.get('answers', {})
    
    score = 0
    total = len(quiz["questions"])
    results = []
    
    for question in quiz["questions"]:
        q_id = str(question["id"])
        user_answer = user_answers.get(q_id)
        is_correct = user_answer == question["correct_answer"]
        
        if is_correct:
            score += 1
        
        results.append({
            "question_id": question["id"],
            "question": question["question"],
            "options": question["options"],
            "user_answer": user_answer,
            "correct_answer": question["correct_answer"],
            "is_correct": is_correct
        })
    
    return jsonify({
        "quiz_id": quiz_id,
        "quiz_title": quiz["title"],
        "score": score,
        "total": total,
        "percentage": round((score / total) * 100, 2),
        "results": results
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
