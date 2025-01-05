// DOM Elements
const question = document.querySelector('.question');
const option1 = document.querySelector('#option-1');
const option2 = document.querySelector('#option-2');
const option3 = document.querySelector('#option-3');
const option4 = document.querySelector('#option-4');
const beginBtn = document.querySelector('.begin-btn');
const selectCategory = document.querySelector('#select-category');
const questionNumber = document.querySelector('.question-number');
const totalQuestions = document.querySelector('.total-questions');
const nextBtn = document.querySelector('.next-btn');
const previousBtn = document.querySelector('.previous-btn');
const restartBtn = document.querySelector('.restart-btn');
const error_msg = document.querySelector('.error-msg');
const display_answer = document.querySelector('.display-answer');
const beginQuiz = document.querySelector('.begin-quiz');
const quizArea = document.querySelector('.quiz-area');
const endArea = document.querySelector('.end-area');
const totalScore = document.querySelector('.total-score');

// Question Bank
const questionBank = {
    'class1': {
        name: 'Class 1',
        questions: [
            {
                question: "What comes after the number 10?",
                options: ["9", "11", "12", "8"],
                correct_answer: "11",
                difficulty: "easy"
            },
            {
                question: "Which animal says 'Meow'?",
                options: ["Dog", "Cat", "Cow", "Duck"],
                correct_answer: "Cat",
                difficulty: "easy"
            },
            {
                question: "What color is the sky during daytime?",
                options: ["Blue", "Green", "Red", "Yellow"],
                correct_answer: "Blue",
                difficulty: "easy"
            }
        ]
    },
    'class2': {
        name: 'Class 2',
        questions: [
            {
                question: "What is 5 + 7?",
                options: ["10", "11", "12", "13"],
                correct_answer: "12",
                difficulty: "easy"
            },
            {
                question: "Which is the longest month of the year?",
                options: ["February", "July", "December", "January"],
                correct_answer: "January",
                difficulty: "medium"
            }
        ]
    },
    'science': {
        name: 'Science',
        questions: [
            {
                question: "What is the chemical symbol for water?",
                options: ["H2O", "CO2", "O2", "N2"],
                correct_answer: "H2O",
                difficulty: "medium"
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correct_answer: "Mars",
                difficulty: "medium"
            }
        ]
    },
    'english': {
        name: 'English',
        questions: [
            {
                question: "Which of these is a proper noun?",
                options: ["London", "city", "book", "tree"],
                correct_answer: "London",
                difficulty: "medium"
            },
            {
                question: "What is the past tense of 'eat'?",
                options: ["eat", "ate", "eaten", "eating"],
                correct_answer: "ate",
                difficulty: "easy"
            }
        ]
    },
    'gk': {
        name: 'General Knowledge',
        questions: [
            {
                question: "What is the capital of India?",
                options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
                correct_answer: "Delhi",
                difficulty: "medium"
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Van Gogh", "Leonardo da Vinci", "Picasso", "Michelangelo"],
                correct_answer: "Leonardo da Vinci",
                difficulty: "hard"
            }
        ]
    }
};

// Global variables
let currentQuestionIndex = 0;
let opts_input = Array.from(document.getElementsByName('options'));
let quizData = null;
let userScore = 0;
let currentQuestionNumber = 1;
let selectedCategory = null;

function displayCategories() {
    // Clear existing options
    selectCategory.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a Category';
    selectCategory.appendChild(defaultOption);
    
    // Add categories from question bank
    Object.keys(questionBank).forEach(categoryId => {
        const option = document.createElement('option');
        option.value = categoryId;
        option.textContent = questionBank[categoryId].name;
        selectCategory.appendChild(option);
    });
}

function updateCategory() {
    selectedCategory = selectCategory.value;
}

function startQuiz() {
    if (!selectedCategory) {
        alert('Please select a category first');
        return;
    }
    
    clearHTML();
    quizData = questionBank[selectedCategory].questions;
    currentQuestionIndex = 0;
    currentQuestionNumber = 1;
    userScore = 0;
    
    beginQuiz.classList.add('hidden');
    quizArea.classList.remove('hidden');
    endArea.classList.add('hidden');
    
    renderHTML();
}

function renderHTML() {
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Display question
    question.textContent = currentQuestion.question;
    
    // Display options
    opts_input.forEach((input, index) => {
        input.checked = false;
        input.nextElementSibling.textContent = currentQuestion.options[index];
        input.nextElementSibling.classList.remove('correct-answer');
    });
    
    // Update question numbers
    questionNumber.textContent = currentQuestionNumber;
    totalQuestions.textContent = quizData.length;
    
    // Hide messages
    error_msg.classList.add('hidden');
    display_answer.classList.add('hidden');
}

function nextQuestion() {
    let selectedOption = opts_input.find(opt => opt.checked);
    let currentQuestion = quizData[currentQuestionIndex];

    if (!selectedOption) {
        error_msg.textContent = 'Please select an option';
        error_msg.classList.remove('hidden');
        return;
    }

    if (selectedOption.nextElementSibling.textContent === currentQuestion.correct_answer) {
        userScore++;
        selectedOption.nextElementSibling.classList.add('correct-answer');
    } else {
        display_answer.textContent = `Correct answer: ${currentQuestion.correct_answer}`;
        display_answer.classList.remove('hidden');
    }

    setTimeout(() => {
        currentQuestionNumber++;
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizData.length) {
            renderHTML();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizArea.classList.add('hidden');
    endArea.classList.remove('hidden');
    totalScore.textContent = `Score: ${userScore} out of ${quizData.length}`;
}

function previousQuestion() {
    if (currentQuestionIndex <= 0) {
        error_msg.textContent = 'This is the first question';
        error_msg.classList.remove('hidden');
        return;
    }
    currentQuestionNumber--;
    currentQuestionIndex--;
    renderHTML();
}

function clearSelectedOption() {
    opts_input.forEach(opt => opt.checked = false);
}

function resetQuiz() {
    currentQuestionIndex = 0;
    currentQuestionNumber = 1;
    userScore = 0;
    selectedCategory = null;
    quizData = null;
    
    beginQuiz.classList.remove('hidden');
    quizArea.classList.add('hidden');
    endArea.classList.add('hidden');
    
    clearHTML();
    displayCategories(); // Reset category dropdown
}

function clearHTML() {
    question.textContent = '';
    opts_input.forEach(opt => {
        opt.checked = false;
        opt.nextElementSibling.textContent = '';
        opt.nextElementSibling.classList.remove('correct-answer');
    });
    error_msg.classList.add('hidden');
    display_answer.classList.add('hidden');
}

// Event Listeners
nextBtn.addEventListener('click', nextQuestion);
previousBtn.addEventListener('click', previousQuestion);
beginBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', resetQuiz);
selectCategory.addEventListener('change', updateCategory);

// Initialize categories when page loads
document.addEventListener('DOMContentLoaded', displayCategories);
