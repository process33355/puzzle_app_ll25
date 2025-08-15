// Crossword puzzle game logic
class CrosswordGame {
    constructor() {
        this.correctAnswers = {
            1: 'zwangerschap',
            2: 'drugs',
            3: 'hersen',
            4: 'kip',
            5: 'geboorte',
            6: 'bruiloft',
            7: 'vrienden'
        };
        
        this.correctMysteryCode = 'll25';
        this.correctLink = 'lankawi.store/#ll25';
        
        this.initializeGame();
        this.bindEvents();
    }

    initializeGame() {
        // Star cell positions for mystery code and link
        // These are the positions of the asterisked cells in the puzzle
        this.starCells = [
            { word: 1, position: 3 },    // [1*] - third letter of zwangerschap
            { word: 7, position: 3 },    // [7*] - third letter of vrienden  
            { word: 3, position: 4 },    // [3*] - fourth letter of hersen
            { word: 6, position: 1 },    // [6*] - first letter of bruiloft
            { word: 7, position: 6 },    // [7*] - sixth letter of vrienden
            { word: 2, position: 1 },    // [2*] - first letter of drugs
            { word: 6, position: 6 },    // [6*] - sixth letter of bruiloft
            { word: 5, position: 7 }     // [5*] - seventh letter of geboorte
        ];
    }

    bindEvents() {
        // Bind word input events
        document.querySelectorAll('.word-input').forEach(input => {
            input.addEventListener('input', (e) => {
                this.handleWordInput(e.target);
            });
        });

        // Bind button events
        document.getElementById('fillButton').addEventListener('click', () => {
            this.checkAnswers();
        });

        document.getElementById('visitButton').addEventListener('click', () => {
            this.visitWebsite();
        });
    }

    handleWordInput(input) {
        const word = input.dataset.word;
        const value = input.value.toLowerCase().trim();
        
        if (value.length > 0) {
            input.classList.add('filled');
        } else {
            input.classList.remove('filled');
        }
        
        // Check if all inputs are filled to enable the button
        this.checkButtonState();
    }

    checkButtonState() {
        const allInputs = document.querySelectorAll('.word-input');
        const allFilled = Array.from(allInputs).every(input => input.value.trim().length > 0);
        
        const fillButton = document.getElementById('fillButton');
        fillButton.disabled = !allFilled;
    }

    checkAnswers() {
        // Get all word inputs and check if they match the correct answers
        const userAnswers = {};
        let allCorrect = true;
        
        for (let wordNum = 1; wordNum <= 7; wordNum++) {
            const input = document.querySelector(`[data-word="${wordNum}"]`);
            const userWord = input.value.toLowerCase().trim();
            
            userAnswers[wordNum] = userWord;
            
            if (userWord !== this.correctAnswers[wordNum]) {
                allCorrect = false;
            }
        }
        
        // Check if everything is correct
        if (allCorrect) {
            this.showSuccess();
        } else {
            this.showIncorrect();
        }
    }

    showSuccess() {
        const resultMessage = document.getElementById('resultMessage');
        const websiteButton = document.getElementById('websiteButton');
        const codeDisplay = document.getElementById('codeDisplay');
        const linkDisplay = document.getElementById('linkDisplay');
        
        // Show success message
        resultMessage.textContent = '🎉 Correct! Je hebt de puzzel opgelost!';
        resultMessage.className = 'result-message correct';
        
        // Show the actual mystery code and link with bold formatting
        codeDisplay.innerHTML = `YOUR MYSTERY CODE = <strong>${this.correctMysteryCode}</strong>`;
        linkDisplay.innerHTML = `VISIT <strong>${this.correctLink}</strong>`;
        
        // Show the website button
        websiteButton.style.display = 'block';
    }

    showIncorrect() {
        const resultMessage = document.getElementById('resultMessage');
        const websiteButton = document.getElementById('websiteButton');
        
        resultMessage.textContent = '❌ Niet helemaal correct. Probeer het nog eens!';
        resultMessage.className = 'result-message incorrect';
        websiteButton.style.display = 'none';
    }

    visitWebsite() {
        // Open the website in a new tab
        window.open('https://lankawi.store/#ll25', '_blank');
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CrosswordGame();
});

// Add some visual feedback for filled inputs
document.addEventListener('input', (e) => {
    if (e.target.classList.contains('word-input')) {
        const value = e.target.value.trim();
        if (value.length > 0) {
            e.target.style.borderColor = '#27ae60';
        } else {
            e.target.style.borderColor = '#e9ecef';
        }
    }
}); 