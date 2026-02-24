// js/exam.js
document.addEventListener('DOMContentLoaded', function() {
    // Question navigation
    let currentQuestion = 1;
    const totalQuestions = 10;
    
    // Update question number display
    document.querySelector('.question-number').textContent = `Question ${currentQuestion} of ${totalQuestions}`;
    
    // Next button functionality
    document.querySelector('.nav-btn.next')?.addEventListener('click', function() {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            updateQuestion();
        }
    });
    
    // Previous button functionality
    document.querySelector('.nav-btn.prev')?.addEventListener('click', function() {
        if (currentQuestion > 1) {
            currentQuestion--;
            updateQuestion();
        }
    });
    
    // Mark for review
    document.querySelector('.nav-btn.mark-review')?.addEventListener('click', function() {
        const paletteItem = document.querySelector(`.palette-item:nth-child(${currentQuestion})`);
        paletteItem.classList.toggle('marked');
        paletteItem.classList.remove('answered');
    });
    
    // Option selection
    document.querySelectorAll('.option input').forEach(option => {
        option.addEventListener('change', function() {
            const paletteItem = document.querySelector(`.palette-item:nth-child(${currentQuestion})`);
            paletteItem.classList.add('answered');
            paletteItem.classList.remove('marked');
        });
    });
    
    function updateQuestion() {
        // Update navigation buttons
        document.querySelector('.nav-btn.prev').disabled = currentQuestion === 1;
        
        // Update question number display
        document.querySelector('.question-number').textContent = `Question ${currentQuestion} of ${totalQuestions}`;
        
        // Update question text (in real app, this would load from data)
        const questions = [
            "What is the value of x in the equation: 2x + 5 = 15?",
            "What is the square root of 144?",
            "What is the capital of France?",
            "What is the chemical symbol for water?",
            "Who wrote 'Romeo and Juliet'?"
        ];
        
        document.querySelector('.question-text').textContent = 
            questions[currentQuestion - 1] || "Sample question " + currentQuestion;
        
        // Clear selected option
        document.querySelectorAll('.option input').forEach(opt => opt.checked = false);
    }
});