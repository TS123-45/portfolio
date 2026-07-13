
INSERT INTO personal_info
(
full_name,
profession,
career_objective,
email,
phone,
location,
github
)
VALUES
(
'Mohanraj C',
'Backend Developer',
'Seeking a Backend Developer position where I can apply my knowledge of JavaScript, Express.js, MySQL, MongoDB, and RESTful APIs to build scalable and efficient applications. Passionate about learning new technologies, solving real-world problems, and contributing to a collaborative software development team while continuously improving my technical skills.',
'mohanrajz8181@gmail.com',
'+91 9840361637',
'Mamallapuram, Tamil Nadu, India',
'https://github.com/TS123-45'
);

# Insert Education
INSERT INTO education
(degree,institution,university,location,start_year,end_year,description)
VALUES
(
'B.E Computer Science and Engineering',
'Anand Institute Of Higher Technology',
'Anna University',
'Kazhipattur, Chennai',
2023,
2027,
'Expected Graduation'
),
(
'Higher Secondary Certificate (Class XII)',
'Government Boys Higher Secondary School',
NULL,
'Thirukazhukundram',
2021,
2022,
NULL
);

# Insert Skills
INSERT INTO skills(category,skill_name) VALUES
('Programming Languages','JavaScript'),
('Programming Languages','Python'),
('Programming Languages','C'),
('Programming Languages','SQL'),

('Backend Technologies','Node.js'),
('Backend Technologies','Express.js'),
('Backend Technologies','RESTful APIs'),

('Databases','MySQL'),
('Databases','MongoDB'),

('Developer Tools','Git'),
('Developer Tools','GitHub'),
('Developer Tools','VS Code'),
('Developer Tools','Postman'),

('Core Concepts','Object-Oriented Programming'),
('Core Concepts','Data Structures'),
('Core Concepts','Algorithms'),
('Core Concepts','JWT Authentication');

INSERT INTO projects
(title,project_type,description,technologies)
VALUES

(
'Restaurant Management System',
'Internship',
'Role-based backend system for restaurant operations.',
'JavaScript, Node.js, Express.js, MySQL, JWT, Google OAuth, Postman'
),

(
'Job Board Platform',
'Internship',
'Backend APIs for employers, job seekers, and administrators.',
'JavaScript, Node.js, Express.js, MongoDB, MySQL, JWT, Multer, Postman'
),

(
'Event Registration System',
'Internship',
'Backend system for event registration and management.',
'JavaScript, Node.js, Express.js, MySQL, JWT, Google OAuth, Postman'
),

(
'Bus Reservation System',
'Academic',
'Backend system for bus reservation.',
'JavaScript, Node.js, Express.js, MySQL'
),

(
'Student Registration System',
'Academic',
'Desktop application for student registration.',
'JavaScript, Node.js, Express.js, MySQL'
),

(
'Road Damage Detection System',
'Academic',
'Embedded system backend for road damage detection.',
'JavaScript, Node.js, Express.js, MySQL, Embedded C, Python'
),

(
'Smart Camera for Theft Detection',
'Academic',
'Backend for smart theft detection camera.',
'JavaScript, Node.js, Express.js, MySQL, Embedded C, Python'
);

# Insert Social Links
INSERT INTO social_links(platform,url)
VALUES
('GitHub','https://github.com/TS123-45'),
('Email','mailto:mohanrajz8181@gmail.com');

# Insert Experience

INSERT INTO experience
(company_name,role,start_date,end_date,description)
VALUES
(
'MotionCut',
'Web Development Intern',
'2025-01-01',
'2025-03-31',
'Completed a 2-month internship focusing on backend and web development.'
);

# Insert Certifications
INSERT INTO certifications
(title,organization,issue_date,description)
VALUES
(
'Python Programming Certification',
'EDUCBA',
'2025-07-01',
'Successfully completed SkillUp 101 – Python Course.'
);

INSERT INTO project_features (project_id, feature) VALUES

-- Restaurant Management System (Project ID: 1)
(1, 'Role-based authentication and authorization'),
(1, 'JWT Authentication'),
(1, 'Google OAuth Login'),
(1, 'Customer Management'),
(1, 'Waiter Management'),
(1, 'Kitchen Staff Management'),
(1, 'Inventory Management'),
(1, 'Admin Dashboard APIs'),
(1, 'MySQL Database Integration'),
(1, 'RESTful API Architecture'),

-- Job Board Platform (Project ID: 2)
(2, 'Employer Registration and Login'),
(2, 'Job Seeker Registration and Login'),
(2, 'JWT Authentication'),
(2, 'Job Posting Management'),
(2, 'Job Application Management'),
(2, 'Resume Upload using Multer'),
(2, 'Admin Management'),
(2, 'RESTful APIs'),
(2, 'MongoDB/MySQL Database Support'),

-- Event Registration System (Project ID: 3)
(3, 'JWT Authentication'),
(3, 'Google OAuth Login'),
(3, 'Event Creation and Management'),
(3, 'Participant Registration'),
(3, 'Admin Dashboard'),
(3, 'RESTful APIs'),
(3, 'MySQL Database Design'),

-- Bus Reservation System (Project ID: 4)
(4, 'User Authentication'),
(4, 'Role-based Authorization'),
(4, 'Bus Search'),
(4, 'Ticket Booking'),
(4, 'Ticket Cancellation'),
(4, 'Booking History'),
(4, 'CRUD Operations'),
(4, 'RESTful APIs'),
(4, 'MySQL Integration'),

-- Student Registration System (Project ID: 5)
(5, 'Student Registration'),
(5, 'Add Student'),
(5, 'Update Student'),
(5, 'Delete Student'),
(5, 'Search Student'),
(5, 'CRUD Operations'),
(5, 'MySQL Database'),

-- Road Damage Detection System (Project ID: 6)
(6, 'Road Damage Detection'),
(6, 'Sensor Data Processing'),
(6, 'Embedded System Integration'),
(6, 'Real-time Monitoring'),
(6, 'Backend API Development'),
(6, 'MySQL Database'),

-- Smart Camera for Theft Detection (Project ID: 7)
(7, 'Motion Detection'),
(7, 'Suspicious Activity Monitoring'),
(7, 'Embedded System Integration'),
(7, 'Backend API Development'),
(7, 'Real-time Surveillance'),
(7, 'MySQL Database');

