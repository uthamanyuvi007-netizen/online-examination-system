// API Service for Frontend - c:/online-examination-system/js/api.js

const API_BASE_URL = 'http://localhost:5000/api';

let token = localStorage.getItem('token');

// Set token after login
function setToken(newToken) {
    token = newToken;
    localStorage.setItem('token', newToken);
}

// Get authentication header
function getAuthHeader() {
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

// ========== AUTHENTICATION ==========

const auth = {
    register: async (name, email, password, role) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role })
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                sessionStorage.setItem('user', JSON.stringify(data.user));
            }
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    login: async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                sessionStorage.setItem('user', JSON.stringify(data.user));
            }
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    logout: () => {
        token = null;
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
};

// ========== USER MANAGEMENT ==========

const users = {
    getStudents: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/students`, {
                headers: getAuthHeader()
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    getTeachers: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/teachers`, {
                headers: getAuthHeader()
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    getById: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                headers: getAuthHeader()
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    delete: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'DELETE',
                headers: getAuthHeader()
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }
};

// Admin: get all users
users.getAll = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            headers: getAuthHeader()
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (err) {
        return { success: false, error: err.message };
    }
};

// ========== EXAM MANAGEMENT ==========

const exams = {
    create: async (title, description, duration, totalQuestions, passingScore, startDate, endDate) => {
        try {
            const response = await fetch(`${API_BASE_URL}/exams`, {
                method: 'POST',
                headers: getAuthHeader(),
                body: JSON.stringify({ title, description, duration, totalQuestions, passingScore, startDate, endDate })
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/exams`);
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    getById: async (examId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/exams/${examId}`);
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    update: async (examId, updates) => {
        try {
            const response = await fetch(`${API_BASE_URL}/exams/${examId}`, {
                method: 'PUT',
                headers: getAuthHeader(),
                body: JSON.stringify(updates)
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    delete: async (examId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/exams/${examId}`, {
                method: 'DELETE',
                headers: getAuthHeader()
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }
};

// ========== QUESTIONS ==========

const questions = {
    add: async (examId, questionText, optionA, optionB, optionC, optionD, correctAnswer, marks) => {
        try {
            const response = await fetch(`${API_BASE_URL}/exams/${examId}/questions`, {
                method: 'POST',
                headers: getAuthHeader(),
                body: JSON.stringify({ questionText, optionA, optionB, optionC, optionD, correctAnswer, marks })
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    getByExamId: async (examId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/exams/${examId}/questions`);
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }
};

// ========== RESULTS ==========

const results = {
    submit: async (examId, score, totalMarks, answers) => {
        try {
            const response = await fetch(`${API_BASE_URL}/results`, {
                method: 'POST',
                headers: getAuthHeader(),
                body: JSON.stringify({ examId, score, totalMarks, answers })
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    getStudentResults: async (studentId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/results/student/${studentId}`, {
                headers: getAuthHeader()
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    getExamResults: async (examId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/exams/${examId}/results`, {
                headers: getAuthHeader()
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }
};

// ========== PROCTORING ==========

const proctoring = {
    startSession: async (examId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/proctoring/start`, {
                method: 'POST',
                headers: getAuthHeader(),
                body: JSON.stringify({ examId })
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    endSession: async (sessionId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/proctoring/${sessionId}/end`, {
                method: 'PUT',
                headers: getAuthHeader()
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    },

    addFlag: async (sessionId, flagType, severity, description) => {
        try {
            const response = await fetch(`${API_BASE_URL}/proctoring/${sessionId}/flag`, {
                method: 'POST',
                headers: getAuthHeader(),
                body: JSON.stringify({ flagType, severity, description })
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }
};

// Export all API functions
window.API = {
    auth,
    users,
    exams,
    questions,
    results,
    proctoring,
    setToken,
    token: () => token
};
