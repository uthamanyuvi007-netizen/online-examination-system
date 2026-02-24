const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'database.db');

// Create and open database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database opening error: ', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    db.serialize(() => {
        // Users table
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT NOT NULL CHECK(role IN ('student', 'teacher', 'admin')),
                joined DATETIME DEFAULT CURRENT_TIMESTAMP,
                lastLogin DATETIME
            )
        `, (err) => {
            if (err) console.error('Users table error:', err);
            else console.log('✓ Users table ready');
        });

        // Exams table
        db.run(`
            CREATE TABLE IF NOT EXISTS exams (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                duration INTEGER NOT NULL,
                totalQuestions INTEGER NOT NULL,
                passingScore INTEGER DEFAULT 50,
                createdBy INTEGER NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                startDate DATETIME,
                endDate DATETIME,
                status TEXT DEFAULT 'draft',
                FOREIGN KEY(createdBy) REFERENCES users(id)
            )
        `, (err) => {
            if (err) console.error('Exams table error:', err);
            else console.log('✓ Exams table ready');
        });

        // Questions table
        db.run(`
            CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                examId INTEGER NOT NULL,
                questionText TEXT NOT NULL,
                optionA TEXT NOT NULL,
                optionB TEXT NOT NULL,
                optionC TEXT NOT NULL,
                optionD TEXT NOT NULL,
                correctAnswer TEXT NOT NULL CHECK(correctAnswer IN ('A', 'B', 'C', 'D')),
                marks INTEGER DEFAULT 1,
                FOREIGN KEY(examId) REFERENCES exams(id)
            )
        `, (err) => {
            if (err) console.error('Questions table error:', err);
            else console.log('✓ Questions table ready');
        });

        // Results table
        db.run(`
            CREATE TABLE IF NOT EXISTS results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                studentId INTEGER NOT NULL,
                examId INTEGER NOT NULL,
                score INTEGER,
                totalMarks INTEGER,
                percentage REAL,
                status TEXT DEFAULT 'submitted',
                submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(studentId) REFERENCES users(id),
                FOREIGN KEY(examId) REFERENCES exams(id)
            )
        `, (err) => {
            if (err) console.error('Results table error:', err);
            else console.log('✓ Results table ready');
        });

        // Student Answers table
        db.run(`
            CREATE TABLE IF NOT EXISTS studentAnswers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                resultId INTEGER NOT NULL,
                questionId INTEGER NOT NULL,
                selectedAnswer TEXT,
                isCorrect BOOLEAN,
                FOREIGN KEY(resultId) REFERENCES results(id),
                FOREIGN KEY(questionId) REFERENCES questions(id)
            )
        `, (err) => {
            if (err) console.error('StudentAnswers table error:', err);
            else console.log('✓ StudentAnswers table ready');
        });

        // Proctoring Sessions table
        db.run(`
            CREATE TABLE IF NOT EXISTS proctoringSessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                examId INTEGER NOT NULL,
                studentId INTEGER NOT NULL,
                startTime DATETIME DEFAULT CURRENT_TIMESTAMP,
                endTime DATETIME,
                status TEXT DEFAULT 'active',
                FOREIGN KEY(examId) REFERENCES exams(id),
                FOREIGN KEY(studentId) REFERENCES users(id)
            )
        `, (err) => {
            if (err) console.error('ProctoringSessions table error:', err);
            else console.log('✓ ProctoringSession table ready');
        });

        // Proctoring Flags table (for cheating attempts)
        db.run(`
            CREATE TABLE IF NOT EXISTS proctoringFlags (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sessionId INTEGER NOT NULL,
                flagType TEXT NOT NULL,
                severity TEXT DEFAULT 'medium',
                description TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(sessionId) REFERENCES proctoringSession(id)
            )
        `, (err) => {
            if (err) console.error('ProctoringFlags table error:', err);
            else console.log('✓ ProctoringFlags table ready');
        });

        // Create default admin user
        createDefaultAdmin();
    });
}

// Create default admin account
function createDefaultAdmin() {
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';
    const hashedPassword = bcrypt.hashSync(adminPassword, 10);

    db.get('SELECT * FROM users WHERE email = ?', [adminEmail], (err, row) => {
        if (!row) {
            db.run(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                ['Administrator', adminEmail, hashedPassword, 'admin'],
                (err) => {
                    if (err) console.error('Error creating admin:', err);
                    else console.log('✓ Default admin user created');
                }
            );
        }
    });
}

// Export database instance and helper functions
module.exports = {
    db,
    
    // Helper: Run query with promise
    runAsync: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, changes: this.changes });
            });
        });
    },

    // Helper: Get single row
    getAsync: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    // Helper: Get all rows
    allAsync: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
};
