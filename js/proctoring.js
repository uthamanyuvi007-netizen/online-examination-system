// js/proctoring.js
class ProctoringSystem {
    constructor() {
        this.warnings = [];
        this.violationCount = 0;
        this.maxViolations = 3;
        this.isActive = true;
        this.warningElement = document.getElementById('proctoringWarnings');
        this.initCamera();
        this.startMonitoring();
    }
    
    async initCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoElement = document.getElementById('cameraFeed');
            if (videoElement) {
                videoElement.srcObject = stream;
            }
        } catch (err) {
            this.addWarning('Camera access denied. Please enable camera for proctoring.');
        }
    }
    
    startMonitoring() {
        // Simulate face detection
        setInterval(() => {
            if (!this.isActive) return;
            
            // Randomly simulate proctoring events (for demo)
            const randomEvent = Math.random();
            
            if (randomEvent < 0.1) { // 10% chance of event
                const events = [
                    'Multiple faces detected!',
                    'Looking away from screen',
                    'Mobile phone detected',
                    'Background noise detected',
                    'Face not visible'
                ];
                
                const randomEvent = events[Math.floor(Math.random() * events.length)];
                this.addWarning(randomEvent);
            }
        }, 10000); // Check every 10 seconds
        
        // Simulate tab switching detection
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.addWarning('Tab switching detected!');
            }
        });
    }
    
    addWarning(message) {
        this.violationCount++;
        
        const warning = document.createElement('div');
        warning.className = 'warning-badge';
        warning.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        
        this.warningElement.appendChild(warning);
        
        // Remove after 5 seconds
        setTimeout(() => {
            warning.remove();
        }, 5000);
        
        if (this.violationCount >= this.maxViolations) {
            this.terminateExam('Multiple violations detected. Exam terminated.');
        }
    }
    
    terminateExam(reason) {
        this.isActive = false;
        alert(`⚠️ ${reason}`);
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
            window.location.href = 'student-dashboard.html';
        }, 2000);
    }
}

// Initialize proctoring when on exam page
if (window.location.pathname.includes('take-exam.html')) {
    window.proctor = new ProctoringSystem();
}

// Timer functionality
class ExamTimer {
    constructor(minutes) {
        this.timeLeft = minutes * 60;
        this.timerElement = document.getElementById('timeDisplay');
        this.start();
    }
    
    start() {
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    timeUp() {
        clearInterval(this.interval);
        alert('Time is up! Your exam will be submitted automatically.');
        window.location.href = 'exam-results.html';
    }
}

// Initialize timer
if (document.getElementById('timer')) {
    new ExamTimer(60); // 60 minutes exam
}

function submitExam() {
    if (confirm('Are you sure you want to submit your exam?')) {
        alert('Exam submitted successfully!');
        window.location.href = 'exam-results.html';
    }
}