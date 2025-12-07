-- Add new fields to profiles table for contact info and skills
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS years_of_experience INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS skills TEXT[] DEFAULT '{}';

-- Update the seed data with sample values
UPDATE profiles SET 
  email = 'hello@example.com',
  phone = '+1 (555) 123-4567',
  location = 'San Francisco, CA',
  years_of_experience = 5,
  skills = ARRAY['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Figma', 'Git']
WHERE name = 'Your Name';
