import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import * as portfolioService from '../services/portfolioService';
import { useAuth } from './AuthContext';

const PortfolioContext = createContext();

export const defaultPortfolioState = {
  selectedTemplate: 'modern-dev',
  published: true,
  personalInfo: {
    fullName: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    profileImage: '',
    resumeUrl: ''
  },
  education: [],
  skills: [],
  experience: [],
  projects: [],
  certifications: [],
  socialLinks: {
    github: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    youtube: '',
    website: ''
  }
};

export const PortfolioProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [portfolio, setPortfolio] = useState(defaultPortfolioState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saved' | 'saving' | 'error' | null

  // Load user portfolio when authenticated
  const fetchPortfolio = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await portfolioService.getPortfolio();
      if (data.success && data.portfolio) {
        setPortfolio(data.portfolio);
      }
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  // Real-time local state updater (Triggers synchronous Live Preview update!)
  const updateSection = (section, data) => {
    setPortfolio((prev) => ({
      ...prev,
      [section]: data
    }));
    setSaveStatus(null);
  };

  // Field updater for nested objects like personalInfo or socialLinks
  const updateField = (section, field, value) => {
    setPortfolio((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setSaveStatus(null);
  };

  // Change selected template
  const changeTemplate = (templateId) => {
    setPortfolio((prev) => ({
      ...prev,
      selectedTemplate: templateId
    }));
  };

  // Save current portfolio state to backend
  const savePortfolio = async (overrideData = null) => {
    if (!isAuthenticated) return;

    try {
      setSaving(true);
      setSaveStatus('saving');
      const dataToSave = overrideData || portfolio;
      const data = await portfolioService.updatePortfolio(dataToSave);
      if (data.success) {
        setPortfolio(data.portfolio);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(null), 3000);
        return { success: true, portfolio: data.portfolio };
      }
    } catch (err) {
      console.error('Failed to save portfolio:', err);
      setSaveStatus('error');
      return { success: false, message: err.response?.data?.message || 'Failed to save portfolio' };
    } finally {
      setSaving(false);
    }
  };

  // Upload Profile Image
  const uploadAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const data = await portfolioService.uploadAvatar(formData);
      if (data.success) {
        setPortfolio((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            profileImage: data.imageUrl
          }
        }));
        return { success: true, imageUrl: data.imageUrl };
      }
    } catch (err) {
      console.error('Failed to upload image:', err);
      return { success: false, message: err.response?.data?.message || 'Upload failed' };
    }
  };

  // Toggle publish status
  const togglePublish = async (status) => {
    try {
      const data = await portfolioService.togglePublish(status);
      if (data.success) {
        setPortfolio((prev) => ({
          ...prev,
          published: data.published
        }));
        return { success: true, published: data.published, publicUrl: data.publicUrl };
      }
    } catch (err) {
      console.error('Failed to toggle publish:', err);
      return { success: false };
    }
  };

  // Calculate profile completion percentage (0 - 100%)
  const calculateCompletion = () => {
    let score = 0;
    const maxScore = 7; // 7 core sections

    if (portfolio.personalInfo?.fullName && portfolio.personalInfo?.title && portfolio.personalInfo?.bio) score += 1;
    if (portfolio.education && portfolio.education.length > 0) score += 1;
    if (portfolio.skills && portfolio.skills.length > 0) score += 1;
    if (portfolio.projects && portfolio.projects.length > 0) score += 1;
    if (portfolio.experience && portfolio.experience.length > 0) score += 1;
    if (portfolio.certifications && portfolio.certifications.length > 0) score += 1;
    if (portfolio.socialLinks?.github || portfolio.socialLinks?.linkedin) score += 1;

    return Math.round((score / maxScore) * 100);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        loading,
        saving,
        saveStatus,
        updateSection,
        updateField,
        changeTemplate,
        savePortfolio,
        uploadAvatar,
        togglePublish,
        fetchPortfolio,
        calculateCompletion
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export default PortfolioContext;
