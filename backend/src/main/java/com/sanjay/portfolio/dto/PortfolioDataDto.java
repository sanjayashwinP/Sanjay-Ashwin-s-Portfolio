package com.sanjay.portfolio.dto;

import java.util.List;
import java.util.Map;

public class PortfolioDataDto {

    private ProfileDto profile;
    private List<SkillDto> skills;
    private Map<String, List<SkillDto>> skillsByCategory;
    private List<ProjectDto> projects;
    private List<ExperienceDto> experience;
    private List<EducationDto> education;
    private List<CertificationDto> certifications;

    public PortfolioDataDto() {
    }

    public ProfileDto getProfile() {
        return profile;
    }

    public void setProfile(ProfileDto profile) {
        this.profile = profile;
    }

    public List<SkillDto> getSkills() {
        return skills;
    }

    public void setSkills(List<SkillDto> skills) {
        this.skills = skills;
    }

    public Map<String, List<SkillDto>> getSkillsByCategory() {
        return skillsByCategory;
    }

    public void setSkillsByCategory(Map<String, List<SkillDto>> skillsByCategory) {
        this.skillsByCategory = skillsByCategory;
    }

    public List<ProjectDto> getProjects() {
        return projects;
    }

    public void setProjects(List<ProjectDto> projects) {
        this.projects = projects;
    }

    public List<ExperienceDto> getExperience() {
        return experience;
    }

    public void setExperience(List<ExperienceDto> experience) {
        this.experience = experience;
    }

    public List<EducationDto> getEducation() {
        return education;
    }

    public void setEducation(List<EducationDto> education) {
        this.education = education;
    }

    public List<CertificationDto> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<CertificationDto> certifications) {
        this.certifications = certifications;
    }
}
