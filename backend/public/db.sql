-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS results, attendance, parents, exam_controller, marks, enrollments, courses, departments, students, faculty, users;

-- Create the 'users' table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password_hash TEXT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'faculty' table
CREATE TABLE faculty (
    faculty_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    department_id INT,
    designation VARCHAR(50)
);

-- Create the 'students' table
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    department_id INT,
    enrollment_year INT
);

-- Create the 'departments' table
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Create the 'courses' table
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT REFERENCES departments(department_id),
    credit_hours INT
);

-- Create the 'enrollments' table
CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id),
    course_id INT REFERENCES courses(course_id),
    semester VARCHAR(20),
    year INT
);

-- Create the 'marks' table
CREATE TABLE marks (
    mark_id SERIAL PRIMARY KEY,
    enrollment_id INT REFERENCES enrollments(enrollment_id),
    marks_obtained FLOAT,
    total_marks FLOAT
);

-- Create the 'exam_controller' table
CREATE TABLE exam_controller (
    controller_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    department_id INT
);

-- Create the 'parents' table
CREATE TABLE parents (
    parent_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    student_id INT REFERENCES students(student_id)
);

-- Create the 'attendance' table
CREATE TABLE attendance (
    attendance_id SERIAL PRIMARY KEY,
    enrollment_id INT REFERENCES enrollments(enrollment_id),
    date DATE,
    status VARCHAR(20)
);

-- Create the 'results' table
CREATE TABLE results (
    result_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id),
    course_id INT REFERENCES courses(course_id),
    grade VARCHAR(2)
);

-- Sample users (use bcrypt-hashed passwords in production)
INSERT INTO users (username, password_hash, email, role)
VALUES 
('admin1', '$2b$10$1L0nv873ziE8u.Yo0MKxp.vHxhNBQNzOsSkxLHDeLdLY4nOldW6By', 'admin@gmail.com', 'Admin'),
('student1', '$2b$10$p3vrcohj9rZ/vltY8.dluuALpwjplH9UVifkPpfMZ2XBKI.AFBoEC', 'student@gmail.com', 'Student'),
('faculty1', '$2b$10$ADtXmhDE6IyJ81xy9gxMJes1A7KKLf9EjlDG2Lx4Mkdd83V/fNkmi', 'faculty@gmail.com', 'Faculty'),
('hod1', '$2b$10$lJi1zBgk3yYbBFLWamPZmezBqXsHBexbOboJvKM1mWr3RL9Oks1Gm', 'hod@gmail.com', 'HOD'),
('exam1', '$2b$10$EvQl4sJ76SJYjXZn3Yr9Wuw7gG86o1MvlLoFsD7OfBN7Cx8xRFr.6', 'exam@gmail.com', 'ExamController'),
('parent1', ' $2b$10$C/CUn.l5J85vlQ02Gr0deeB/aFVg5ZgeoGBUwIE3Y2upMB6WoR7XW', 'parent@gmail.com', 'Parent');
