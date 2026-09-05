/**
 * AI Portfolio Assistant Service
 * Analyzes developer portfolio data and generates intelligent recommendations.
 */

const analyzePortfolio = (portfolio) => {
  const suggestions = [];
  const missingSections = [];
  const recommendedSkills = [];
  const projectImprovements = [];

  const { personalInfo = {}, education = [], skills = [], experience = [], projects = [], certifications = [], socialLinks = {} } = portfolio || {};

  // 1. Missing Section Analysis
  if (!personalInfo.fullName || !personalInfo.title || !personalInfo.bio) {
    missingSections.push('Personal Information (Full Name, Title, Bio)');
    suggestions.push('Add a compelling headline and bio to introduce yourself to recruiters.');
  }

  if (!personalInfo.profileImage) {
    missingSections.push('Profile Photo');
    suggestions.push('Upload a professional profile photo to increase engagement by up to 40%.');
  }

  if (!education || education.length === 0) {
    missingSections.push('Education Details');
    suggestions.push('Add your degree, university name, and graduation year.');
  }

  if (!skills || skills.length < 4) {
    missingSections.push('Technical Skills');
    suggestions.push('Add at least 5 key technical skills to showcase your proficiency.');
  }

  if (!projects || projects.length < 2) {
    missingSections.push('Projects');
    suggestions.push('Include at least 2 full-stack or technical projects with GitHub links and live demos.');
  }

  if (!experience || experience.length === 0) {
    missingSections.push('Work Experience / Internships');
    suggestions.push('Add any internships, freelance projects, or relevant experience.');
  }

  if (!socialLinks.github || !socialLinks.linkedin) {
    missingSections.push('Social Links (GitHub & LinkedIn)');
    suggestions.push('Connect your GitHub repository and LinkedIn profile for verification.');
  }

  // 2. Skill Recommendation Engine based on Title
  const titleLower = (personalInfo.title || '').toLowerCase();
  const existingSkillNames = skills.map((s) => (s.name || '').toLowerCase());

  const skillDatabase = {
    frontend: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'HTML5/CSS3'],
    backend: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'RESTful APIs', 'JWT', 'Docker'],
    fullstack: ['React', 'Node.js', 'Express', 'MongoDB', 'Git', 'GitHub Actions', 'Postman'],
    ml: ['Python', 'PyTorch', 'Scikit-Learn', 'TensorFlow', 'Pandas', 'NumPy', 'Jupyter']
  };

  let targetCategory = 'fullstack';
  if (titleLower.includes('front')) targetCategory = 'frontend';
  else if (titleLower.includes('back')) targetCategory = 'backend';
  else if (titleLower.includes('ml') || titleLower.includes('machine') || titleLower.includes('ai')) targetCategory = 'ml';

  skillDatabase[targetCategory].forEach((sk) => {
    if (!existingSkillNames.includes(sk.toLowerCase())) {
      recommendedSkills.push(sk);
    }
  });

  // 3. Project Description Enhancement Analysis
  projects.forEach((proj, idx) => {
    if (proj.description && proj.description.length < 40) {
      projectImprovements.push(`Project "${proj.title || `Project #${idx + 1}`}" description is too short. Describe the problem, architecture, and impact.`);
    }
  });

  // 4. Score Calculation
  const totalWeight = 7;
  let filledCount = 7 - missingSections.length;
  if (filledCount < 1) filledCount = 1;
  const completenessScore = Math.round((filledCount / totalWeight) * 100);

  return {
    completenessScore,
    missingSections,
    suggestions,
    recommendedSkills,
    projectImprovements,
    aiSummary: `Portfolio is ${completenessScore}% complete. Recommended focus: ${missingSections[0] || 'Optimizing project descriptions'}.`
  };
};

module.exports = { analyzePortfolio };
