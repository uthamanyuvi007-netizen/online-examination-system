const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db, runAsync, getAsync, allAsync } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend static files from project root
app.use(express.static(path.join(__dirname)));

// Default route -> serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// ========== AUTHENTICATION ENDPOINTS ==========

// Register
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Check if user exists
        const existingUser = await getAsync('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Insert user
        const result = await runAsync(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );

        const newUser = await getAsync('SELECT id, name, email, role FROM users WHERE id = ?', [result.id]);
        const token = jwt.sign(newUser, JWT_SECRET);

        res.status(201).json({
            message: 'Registration successful',
            user: newUser,
            token: token
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await getAsync('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Update last login
        await runAsync('UPDATE users SET lastLogin = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(userData, JWT_SECRET);

        res.json({
            message: 'Login successful',
            user: userData,
            token: token
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: err.message });
    }
});

// ========== USER MANAGEMENT ENDPOINTS ==========

// Get all students
app.get('/api/users/students', authenticateToken, async (req, res) => {
    try {
        const students = await allAsync('SELECT id, name, email, joined FROM users WHERE role = ?', ['student']);
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all teachers
app.get('/api/users/teachers', authenticateToken, async (req, res) => {
    try {
        const teachers = await allAsync('SELECT id, name, email, joined FROM users WHERE role = ?', ['teacher']);
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user by ID
app.get('/api/users/:id', authenticateToken, async (req, res) => {
    try {
        const user = await getAsync('SELECT id, name, email, role, joined FROM users WHERE id = ?', [req.params.id]);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete user (admin only)
app.delete('/api/users/:id', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only admins can delete users' });
        }

        await runAsync('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ========== EXAM MANAGEMENT ENDPOINTS ==========

// Create exam
app.post('/api/exams', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only teachers/admins can create exams' });
        }

        const { title, description, duration, totalQuestions, passingScore, startDate, endDate } = req.body;

        if (!title || !duration || !totalQuestions) {
            return res.status(400).json({ error: 'Title, duration, and totalQuestions are required' });
        }

        const result = await runAsync(
            `INSERT INTO exams (title, description, duration, totalQuestions, passingScore, createdBy, startDate, endDate) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, description || '', duration, totalQuestions, passingScore || 50, req.user.id, startDate, endDate]
        );

        const exam = await getAsync('SELECT * FROM exams WHERE id = ?', [result.id]);
        res.status(201).json(exam);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all exams
app.get('/api/exams', async (req, res) => {
    try {
        const exams = await allAsync(`
            SELECT e.*, u.name as createdByName 
            FROM exams e 
            LEFT JOIN users u ON e.createdBy = u.id
            ORDER BY e.createdAt DESC
        `);
        res.json(exams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get exam by ID with questions
app.get('/api/exams/:id', async (req, res) => {
    try {
        const exam = await getAsync('SELECT * FROM exams WHERE id = ?', [req.params.id]);
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        const questions = await allAsync('SELECT * FROM questions WHERE examId = ?', [req.params.id]);
        exam.questions = questions;

        res.json(exam);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update exam
app.put('/api/exams/:id', authenticateToken, async (req, res) => {
    try {
        const exam = await getAsync('SELECT * FROM exams WHERE id = ?', [req.params.id]);
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        if (exam.createdBy !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'You can only edit your own exams' });
        }

        const { title, description, duration, totalQuestions, passingScore, startDate, endDate, status } = req.body;

        await runAsync(
            `UPDATE exams SET title = ?, description = ?, duration = ?, totalQuestions = ?, passingScore = ?, startDate = ?, endDate = ?, status = ? WHERE id = ?`,
            [title || exam.title, description || exam.description, duration || exam.duration, totalQuestions || exam.totalQuestions, passingScore || exam.passingScore, startDate, endDate, status || exam.status, req.params.id]
        );

        const updatedExam = await getAsync('SELECT * FROM exams WHERE id = ?', [req.params.id]);
        res.json(updatedExam);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete exam
app.delete('/api/exams/:id', authenticateToken, async (req, res) => {
    try {
        const exam = await getAsync('SELECT * FROM exams WHERE id = ?', [req.params.id]);
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        if (exam.createdBy !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'You can only delete your own exams' });
        }

        await runAsync('DELETE FROM questions WHERE examId = ?', [req.params.id]);
        await runAsync('DELETE FROM exams WHERE id = ?', [req.params.id]);

        res.json({ message: 'Exam deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ========== QUESTIONS ENDPOINTS ==========

// Add question to exam
app.post('/api/exams/:id/questions', authenticateToken, async (req, res) => {
    try {
        const exam = await getAsync('SELECT * FROM exams WHERE id = ?', [req.params.id]);
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        if (exam.createdBy !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'You can only add questions to your own exams' });
        }

        const { questionText, optionA, optionB, optionC, optionD, correctAnswer, marks } = req.body;

        if (!questionText || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const result = await runAsync(
            `INSERT INTO questions (examId, questionText, optionA, optionB, optionC, optionD, correctAnswer, marks) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [req.params.id, questionText, optionA, optionB, optionC, optionD, correctAnswer, marks || 1]
        );

        const question = await getAsync('SELECT * FROM questions WHERE id = ?', [result.id]);
        res.status(201).json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get questions for exam
app.get('/api/exams/:id/questions', async (req, res) => {
    try {
        const questions = await allAsync('SELECT * FROM questions WHERE examId = ?', [req.params.id]);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ========== RESULTS ENDPOINTS ==========

// Submit exam result
app.post('/api/results', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ error: 'Only students can submit results' });
        }

        const { examId, score, totalMarks, answers } = req.body;

        if (!examId || score === undefined || !totalMarks) {
            return res.status(400).json({ error: 'examId, score, and totalMarks are required' });
        }

        const percentage = (score / totalMarks) * 100;

        const result = await runAsync(
            `INSERT INTO results (studentId, examId, score, totalMarks, percentage) 
             VALUES (?, ?, ?, ?, ?)`,
            [req.user.id, examId, score, totalMarks, percentage]
        );

        // Save individual answers
        if (answers && Array.isArray(answers)) {
            for (const answer of answers) {
                await runAsync(
                    `INSERT INTO studentAnswers (resultId, questionId, selectedAnswer, isCorrect) 
                     VALUES (?, ?, ?, ?)`,
                    [result.id, answer.questionId, answer.selectedAnswer, answer.isCorrect ? 1 : 0]
                );
            }
        }

        const savedResult = await getAsync('SELECT * FROM results WHERE id = ?', [result.id]);
        res.status(201).json(savedResult);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get student's results
app.get('/api/results/student/:studentId', authenticateToken, async (req, res) => {
    try {
        if (req.user.id != req.params.studentId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'You can only view your own results' });
        }

        const results = await allAsync(
            `SELECT r.*, e.title as examTitle 
             FROM results r 
             LEFT JOIN exams e ON r.examId = e.id 
             WHERE r.studentId = ? 
             ORDER BY r.submittedAt DESC`,
            [req.params.studentId]
        );

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get exam results (for teachers)
app.get('/api/exams/:examId/results', authenticateToken, async (req, res) => {
    try {
        const exam = await getAsync('SELECT * FROM exams WHERE id = ?', [req.params.examId]);
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        if (exam.createdBy !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'You can only view results for your own exams' });
        }

        const results = await allAsync(
            `SELECT r.*, u.name as studentName, u.email as studentEmail
             FROM results r
             LEFT JOIN users u ON r.studentId = u.id
             WHERE r.examId = ?
             ORDER BY r.submittedAt DESC`,
            [req.params.examId]
        );

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ========== PROCTORING ENDPOINTS ==========

// Start proctoring session
app.post('/api/proctoring/start', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ error: 'Only students can start proctoring sessions' });
        }

        const { examId } = req.body;

        if (!examId) {
            return res.status(400).json({ error: 'examId is required' });
        }

        const result = await runAsync(
            `INSERT INTO proctoringSessions (examId, studentId, status) 
             VALUES (?, ?, ?)`,
            [examId, req.user.id, 'active']
        );

        const session = await getAsync('SELECT * FROM proctoringSessions WHERE id = ?', [result.id]);
        res.status(201).json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// End proctoring session
app.put('/api/proctoring/:sessionId/end', authenticateToken, async (req, res) => {
    try {
        const session = await getAsync('SELECT * FROM proctoringSessions WHERE id = ?', [req.params.sessionId]);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        if (session.studentId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'You can only end your own sessions' });
        }

        await runAsync(
            `UPDATE proctoringSessions SET endTime = CURRENT_TIMESTAMP, status = ? WHERE id = ?`,
            ['ended', req.params.sessionId]
        );

        const updatedSession = await getAsync('SELECT * FROM proctoringSessions WHERE id = ?', [req.params.sessionId]);
        res.json(updatedSession);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add proctoring flag (for suspicious activity)
app.post('/api/proctoring/:sessionId/flag', authenticateToken, async (req, res) => {
    try {
        const { flagType, severity, description } = req.body;

        if (!flagType) {
            return res.status(400).json({ error: 'flagType is required' });
        }

        const result = await runAsync(
            `INSERT INTO proctoringFlags (sessionId, flagType, severity, description) 
             VALUES (?, ?, ?, ?)`,
            [req.params.sessionId, flagType, severity || 'medium', description || '']
        );

        const flag = await getAsync('SELECT * FROM proctoringFlags WHERE id = ?', [result.id]);
        res.status(201).json(flag);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', port: PORT });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log('✓ Press Ctrl+C to stop the server\n');
});
