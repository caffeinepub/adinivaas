# Adinivaas – Jobs Section Redesign

## Current State
JobFeedSection.tsx is a simple horizontal scroll grid of image-based job cards with just a title, company name, and image. No filters, no categories, no detail view.

## Requested Changes (Diff)

### Add
- Subcategory navigation: horizontal scrollable pill chips (Full-Time, Part-Time, Freelance/Gigs, Internships, Remote Jobs, Local Jobs, Government Jobs, Skill-Based Work). Active = brown, inactive = light grey.
- Search icon and Filter icon in section header
- Filter drawer: Location, Job Type, Qualification, Salary Range, Industry; Sorting: Latest, Most Relevant, Highest Salary, Nearby Jobs
- Redesigned job cards (vertical list): company logo placeholder, Job Title (bold), Company Name, Location, Salary, Job Type badge, 1-line description, tags (Urgent/Remote/Verified), "Apply Now" CTA button
- Featured Jobs horizontal scroll section at top
- Skill-Based Jobs section (Driver, Electrician, Designer, Teacher, Daily Wage)
- Government Jobs dedicated section
- Nearby Jobs section
- Job Detail full-screen overlay on card tap: title, company, full description, responsibilities, requirements, salary & benefits; actions: Apply Now, Save Job, Share
- Floating "Post a Job" button (bottom right of section)
- Post a Job form: job title, salary, location, description, contact details
- Verified badge on trusted employers
- Report job button
- Quick Apply via WhatsApp button
- Save job (heart) interaction

### Modify
- Replace existing horizontal image-card grid with new vertical list card layout as primary
- Section title stays "Jobs" with Briefcase icon

### Remove
- Old horizontal image-scroll cards

## Implementation Plan
1. Replace JobFeedSection.tsx entirely with a rich redesigned component
2. Subcategory pill navigation at top
3. Featured Jobs horizontal scroll row
4. Vertical list of job cards with full card content
5. Skill-Based Jobs mini section
6. Government Jobs mini section
7. Nearby Jobs mini section
8. Job Detail full-screen overlay
9. Filter drawer
10. Post a Job floating button + form overlay
