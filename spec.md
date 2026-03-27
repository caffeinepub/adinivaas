# Adinivaas

## Current State
The Jobs section is a full, expanded section with subcategory tabs, filter/sort system, featured jobs, nearby jobs, skill-based, government jobs, all jobs horizontal scroll -- displayed in full on the home page.

## Requested Changes (Diff)

### Add
- A compact Jobs summary on the home page showing key job highlights directly (e.g., 2-3 featured job cards in horizontal scroll, a quick count/summary line like "42 new jobs this week", and a quick-filter row of top job categories)
- A "View All Jobs" or "See More Jobs" CTA button that expands the full Jobs section

### Modify
- Jobs section starts fully minimized/collapsed by default on the home page -- only showing a compact preview (header, 2-3 highlight cards, quick stats, and a "See All" button)
- Full Jobs section (subcategory nav, filters, all subsections) slides down/expands when user taps "See All Jobs"

### Remove
- Nothing removed, just collapsed by default

## Implementation Plan
1. In JobFeedSection.tsx: add a `minimized` state (default true)
2. In minimized state: show a compact header with job count/stats, 2-3 featured job cards in horizontal scroll, top category chips, and a "See All Jobs" CTA
3. In expanded state: show the full existing Jobs UI
4. Wrap expansion in AnimatePresence for smooth slide-down
5. The compact preview should have enough info to be useful -- job title, company, salary, location visible even in minimized state
