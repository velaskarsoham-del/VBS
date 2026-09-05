const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  degree: { type: String, default: '' },
  institution: { type: String, default: '' },
  startYear: { type: String, default: '' },
  endYear: { type: String, default: '' },
  grade: { type: String, default: '' },
  description: { type: String, default: '' }
});

const SkillSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  level: { type: Number, min: 0, max: 100, default: 80 },
  category: { type: String, default: 'Technical' }
});

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  company: { type: String, default: '' },
  type: { type: String, enum: ['Full-time', 'Internship', 'Freelance', 'Contract', 'Part-time', ''], default: 'Full-time' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  current: { type: Boolean, default: false },
  description: { type: String, default: '' }
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  technologies: [{ type: String }],
  githubUrl: { type: String, default: '' },
  liveDemoUrl: { type: String, default: '' },
  imageUrl: { type: String, default: '' }
});

const CertificationSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  issuingOrganization: { type: String, default: '' },
  issueDate: { type: String, default: '' },
  credentialUrl: { type: String, default: '' }
});

const PortfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      trim: true
    },
    selectedTemplate: {
      type: String,
      enum: ['modern-dev', 'professional', 'creative'],
      default: 'modern-dev'
    },
    published: {
      type: Boolean,
      default: false
    },
    personalInfo: {
      fullName: { type: String, default: '' },
      title: { type: String, default: '' },
      bio: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      profileImage: { type: String, default: '' },
      resumeUrl: { type: String, default: '' }
    },
    education: [EducationSchema],
    skills: [SkillSchema],
    experience: [ExperienceSchema],
    projects: [ProjectSchema],
    certifications: [CertificationSchema],
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
      youtube: { type: String, default: '' },
      website: { type: String, default: '' }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Portfolio', PortfolioSchema);
