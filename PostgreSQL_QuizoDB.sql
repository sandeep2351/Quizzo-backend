-- Connect to the database (Run this in psql)
\c quizo;

-- Insert sample users (teachers)
INSERT INTO users (username, password) VALUES
('sunny', 'sunny'),
('sandeep', 'demo123'),
('hello', 'demo123');

-- Insert sample quizzes
INSERT INTO quizzes (title, description, teacher_id, created_at) VALUES
('Introduction to Algebra', 'A basic quiz covering fundamental algebraic concepts including linear equations, variables, and simple operations.', 1, NOW()),
('Basic Chemistry Concepts', 'Test your knowledge of atomic structure, periodic table, and chemical bonds. Suitable for high school students.', 1, NOW()),
('World War II Overview', 'Comprehensive quiz covering major events, key figures, and important dates of World War II.', 2, NOW()),
('Shakespeare''s Famous Works', 'Test your knowledge about Shakespeare''s most famous plays, characters, and quotes.', 2, NOW()),
('World Capitals and Countries', 'Challenge yourself with questions about world capitals, countries, and their locations.', 3, NOW()),
('Programming Basics', 'Basic concepts of programming including variables, loops, and conditional statements.', 3, NOW()),
('Human Anatomy Basics', 'Essential questions about human body systems, organs, and their functions.', 1, NOW()),
('Newton''s Laws of Motion', 'Test your understanding of the three laws of motion and their applications.', 2, NOW()),
('Advanced Grammar Rules', 'Challenging questions about complex grammar rules, punctuation, and sentence structure.', 3, NOW()),
('Music Theory Fundamentals', 'Basic concepts of music theory including notes, scales, and chord progressions.', 1, NOW());

-- Additional subject quizzes
INSERT INTO quizzes (title, description, teacher_id, created_at) VALUES
('Calculus Fundamentals', 'Covers derivatives, integrals, and limits. Designed for advanced high school students.', 1, NOW()),
('Environmental Science', 'Topics include climate change, ecosystems, and environmental conservation.', 2, NOW()),
('Web Development Basics', 'HTML, CSS, and JavaScript fundamentals for beginners.', 3, NOW()),
('Ancient Civilizations', 'Explore the history of Egyptian, Greek, and Roman civilizations.', 1, NOW()),
('Renaissance Art', 'Test your knowledge about major Renaissance artists and their famous works.', 2, NOW());
