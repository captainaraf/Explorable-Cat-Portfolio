-- Seed initial data

-- Insert default profile
INSERT INTO profiles (name, title, bio, short_description, image_url) VALUES (
  'Your Name',
  'Creative Developer & Designer',
  'I am a passionate developer who loves creating unique and interactive web experiences. My journey in tech has been an adventure, much like a cat exploring new territories!',
  'A creative developer crafting unique digital experiences with code and imagination.',
  '/placeholder.svg?height=400&width=400'
);

-- Insert sample experiences
INSERT INTO experiences (company, position, description, start_date, end_date, is_current, technologies, order_index) VALUES
('Tech Company', 'Senior Developer', 'Led development of innovative web applications with focus on user experience and performance.', '2022-01-01', NULL, true, ARRAY['React', 'Next.js', 'TypeScript', 'Node.js'], 1),
('Startup Inc', 'Full Stack Developer', 'Built scalable applications and mentored junior developers.', '2020-06-01', '2021-12-31', false, ARRAY['Vue.js', 'Python', 'PostgreSQL'], 2),
('Agency Co', 'Junior Developer', 'Started my journey in web development, learning and growing every day.', '2019-01-01', '2020-05-31', false, ARRAY['JavaScript', 'HTML', 'CSS', 'PHP'], 3);

-- Insert sample projects
INSERT INTO projects (title, description, long_description, image_url, technologies, featured, order_index) VALUES
('Project Alpha', 'An innovative web application', 'A comprehensive platform that revolutionizes how users interact with data. Built with modern technologies and a focus on accessibility.', '/placeholder.svg?height=300&width=500', ARRAY['Next.js', 'TypeScript', 'Tailwind'], true, 1),
('Project Beta', 'Mobile-first design system', 'A beautiful and responsive design system that works across all devices.', '/placeholder.svg?height=300&width=500', ARRAY['React Native', 'Figma'], true, 2),
('Project Gamma', 'AI-powered tool', 'An intelligent tool that uses machine learning to solve complex problems.', '/placeholder.svg?height=300&width=500', ARRAY['Python', 'TensorFlow', 'React'], false, 3);

-- Insert sample YouTube videos
INSERT INTO youtube_videos (title, video_url, description, order_index) VALUES
('Building Modern Web Apps', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'A tutorial on building modern web applications', 1),
('Design Systems 101', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introduction to design systems', 2);

-- Insert sample social links
INSERT INTO social_links (platform, url, icon, order_index) VALUES
('GitHub', 'https://github.com', 'github', 1),
('LinkedIn', 'https://linkedin.com', 'linkedin', 2),
('Twitter', 'https://twitter.com', 'twitter', 3);
