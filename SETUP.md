# Online Examination System with Proctoring

A complete online examination system with real-time proctoring capabilities. This project uses **Node.js + Express + SQLite** for the backend and **HTML/CSS/JavaScript** for the frontend.

## Features

✅ **User Authentication** - Login/Register with role-based access (Student, Teacher, Admin)
✅ **Exam Management** - Create, edit, delete exams with multiple choice questions
✅ **Real-time Results** - Submit answers and get instant results with scoring
✅ **Student Management** - Add/remove students, track performance
✅ **Proctoring Sessions** - Start/end exam sessions with flag system for suspicious activity
✅ **Dashboard Views** - Separate dashboards for students, teachers, and admins
✅ **Dark Mode** - Theme toggle throughout the application

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- express (web framework)
- sqlite3 (database)
- cors (enable frontend-backend communication)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)

### Step 2: Start the Server

```bash
npm start
```

You should see:
```
✓ Connected to SQLite database
✓ Users table ready
✓ Exams table ready
✓ Questions table ready
✓ Results table ready
✓ StudentAnswers table ready
✓ ProctoringSession table ready
✓ ProctoringFlags table ready
✓ Default admin user created
✓ Server running on http://localhost:5000
```

### Step 3: Open in Browser

Open `http://localhost:3000` (or use Live Server extension) to access the frontend.

**Note**: Make sure the backend server is running before opening the frontend.

## Default Credentials (Created Automatically)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |

You can create additional users via the registration page.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/students` - Get all students (requires auth)
- `GET /api/users/teachers` - Get all teachers (requires auth)
- `GET /api/users/:id` - Get user by ID
- `DELETE /api/users/:id` - Delete user (admin only)

### Exams
- `POST /api/exams` - Create exam
- `GET /api/exams` - Get all exams
- `GET /api/exams/:id` - Get exam with questions
- `PUT /api/exams/:id` - Update exam
- `DELETE /api/exams/:id` - Delete exam

### Questions
- `POST /api/exams/:id/questions` - Add question to exam
- `GET /api/exams/:id/questions` - Get all questions for exam

### Results
- `POST /api/results` - Submit exam result
- `GET /api/results/student/:studentId` - Get student's results
- `GET /api/exams/:examId/results` - Get all results for exam

### Proctoring
- `POST /api/proctoring/start` - Start proctoring session
- `PUT /api/proctoring/:sessionId/end` - End proctoring session
- `POST /api/proctoring/:sessionId/flag` - Add suspicious activity flag

## Project Structure

```
online-examination-system/
├── database.js              # SQLite database setup & schema
├── server.js                # Express server & API routes
├── package.json             # Node.js dependencies
├── .env                      # Environment variables
├── .gitignore               # Git ignore rules
│
├── index.html               # Homepage
├── login.html               # Login page
├── register.html            # Registration page
│
├── pages/
│   ├── student-dashboard.html      # Student home
│   ├── teacher-dashboard.html      # Teacher home
│   ├── admin-dashboard.html        # Admin home
│   ├── take-exam.html              # Exam interface
│   ├── exam-results.html           # Results page
│   ├── create-exam.html            # Create exam form
│   ├── question-bank.html          # Question management
│   └── proctoring-review.html      # Review proctoring records
│
├── js/
│   ├── api.js               # Frontend API client
│   ├── auth.js              # Authentication handlers
│   ├── main.js              # Main utilities
│   ├── student.js           # Student dashboard logic
│   ├── teacher.js           # Teacher dashboard logic
│   ├── admin.js             # Admin dashboard logic
│   ├── exam.js              # Exam taking logic
│   └── proctoring.js        # Proctoring logic
│
├── css/
│   ├── style.css            # Global styles
│   ├── login.css            # Login/register styles
│   ├── dashboard.css        # Dashboard styles
│   └── exam.css             # Exam page styles
│
└── assets/
    └── images/              # Images and icons
```

## Usage

### For Students
1. Register as a student
2. Login to student dashboard
3. View available exams
4. Start an exam - proctoring session begins
5. Answer questions and submit
6. View results and performance

### For Teachers
1. Register as a teacher
2. Login to teacher dashboard
3. Create exams with questions
4. Monitor student results
5. Review proctoring flags for each exam

### For Admins
1. Login with admin credentials
2. Manage all users (add, remove, view)
3. Manage all exams
4. View system-wide statistics
5. Review proctoring incidents

## Troubleshooting

### Server won't start
- Make sure Port 5000 is not in use
- Try `netstat -ano | findstr :5000` (Windows) to check
- Kill the process: `taskkill /PID <PID> /F`

### Frontend can't connect to backend
- Ensure server is running on http://localhost:5000
- Check browser console for CORS errors
- Make sure API endpoints match in `js/api.js`

### Database errors
- Delete `database.db` to reset and recreate tables
- Check file permissions in the project folder

## Security Notes

⚠️ **Important**: This is a development project. For production:
- Change `JWT_SECRET` in `server.js`
- Implement HTTPS
- Add rate limiting
- Implement proper email verification
- Add password reset functionality
- Use environment variables properly
- Add comprehensive input validation
- Implement audit logging

## Future Enhancements

- [ ] Real webcam proctoring integration
- [ ] Screen sharing detection
- [ ] AI-based cheating detection
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Analytics dashboard
- [ ] Mobile app support

## License

MIT License - Feel free to use this project for learning and development.

## Support

For issues or questions, check the troubleshooting section or review the code comments.

---

**Happy Proctoring! 🎓**
