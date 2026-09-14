import { request } from './api';

export const adminService = {
  // Stats
  async getDashboardStats() {
    const res = await request('/admin/dashboard/stats');
    return res.data;
  },

  // Profile
  async updateProfile(profileData) {
    const res = await request('/admin/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return res.data;
  },

  // Projects
  async createProject(projectData) {
    const res = await request('/admin/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
    return res.data;
  },

  async updateProject(id, projectData) {
    const res = await request(`/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
    return res.data;
  },

  async deleteProject(id) {
    const res = await request(`/admin/projects/${id}`, {
      method: 'DELETE',
    });
    return res;
  },

  // Skills
  async createSkill(skillData) {
    const res = await request('/admin/skills', {
      method: 'POST',
      body: JSON.stringify(skillData),
    });
    return res.data;
  },

  async updateSkill(id, skillData) {
    const res = await request(`/admin/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(skillData),
    });
    return res.data;
  },

  async deleteSkill(id) {
    const res = await request(`/admin/skills/${id}`, {
      method: 'DELETE',
    });
    return res;
  },

  // Experience
  async createExperience(expData) {
    const res = await request('/admin/experience', {
      method: 'POST',
      body: JSON.stringify(expData),
    });
    return res.data;
  },

  async updateExperience(id, expData) {
    const res = await request(`/admin/experience/${id}`, {
      method: 'PUT',
      body: JSON.stringify(expData),
    });
    return res.data;
  },

  async deleteExperience(id) {
    const res = await request(`/admin/experience/${id}`, {
      method: 'DELETE',
    });
    return res;
  },

  // Education
  async createEducation(eduData) {
    const res = await request('/admin/education', {
      method: 'POST',
      body: JSON.stringify(eduData),
    });
    return res.data;
  },

  async updateEducation(id, eduData) {
    const res = await request(`/admin/education/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eduData),
    });
    return res.data;
  },

  async deleteEducation(id) {
    const res = await request(`/admin/education/${id}`, {
      method: 'DELETE',
    });
    return res;
  },

  // Certifications
  async createCertification(certData) {
    const res = await request('/admin/certifications', {
      method: 'POST',
      body: JSON.stringify(certData),
    });
    return res.data;
  },

  async updateCertification(id, certData) {
    const res = await request(`/admin/certifications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(certData),
    });
    return res.data;
  },

  async deleteCertification(id) {
    const res = await request(`/admin/certifications/${id}`, {
      method: 'DELETE',
    });
    return res;
  },

  // Messages
  async getAllMessages() {
    const res = await request('/admin/messages');
    return res.data;
  },

  async markMessageAsRead(id) {
    const res = await request(`/admin/messages/${id}/read`, {
      method: 'PUT',
    });
    return res;
  },

  async deleteMessage(id) {
    const res = await request(`/admin/messages/${id}`, {
      method: 'DELETE',
    });
    return res;
  }
};
