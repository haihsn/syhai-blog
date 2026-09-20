// Client-side password gate for /cv. This is NOT real security — the site
// is fully static, so anything referenced by client JS ends up readable in
// the shipped bundle regardless of where it's defined. This only deters
// casual visitors and search engines, not anyone who opens devtools.
export const CV_PASSWORD = 'syhai';

export const cvData = {
  name: 'Sy Hai',
  title: 'Your Professional Title', // e.g. "Software Engineer" — edit me

  experience: [
    {
      company: 'Company Name',
      role: 'Job Title',
      dates: '2023 — Present',
      bullets: [
        'Describe a key achievement or responsibility here.',
        'Add a second bullet with a measurable result.',
        'Optional third bullet.',
      ],
    },
    {
      company: 'Previous Company',
      role: 'Previous Job Title',
      dates: '2020 — 2023',
      bullets: [
        'Describe a key achievement or responsibility here.',
        'Add a second bullet with a measurable result.',
      ],
    },
  ],

  skills: [
    'Skill One', 'Skill Two', 'Skill Three', 'Skill Four',
    'Skill Five', 'Skill Six',
  ],
};
