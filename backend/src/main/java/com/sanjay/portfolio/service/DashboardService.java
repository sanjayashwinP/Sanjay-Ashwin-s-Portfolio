package com.sanjay.portfolio.service;

import com.sanjay.portfolio.dto.DashboardStatsDto;
import com.sanjay.portfolio.dto.PortfolioDataDto;
import com.sanjay.portfolio.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final CertificationRepository certificationRepository;
    private final ExperienceRepository experienceRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final ProfileService profileService;
    private final SkillService skillService;
    private final ProjectService projectService;
    private final ExperienceService experienceService;
    private final EducationService educationService;
    private final CertificationService certificationService;

    public DashboardService(
            ProjectRepository projectRepository,
            SkillRepository skillRepository,
            CertificationRepository certificationRepository,
            ExperienceRepository experienceRepository,
            ContactMessageRepository contactMessageRepository,
            ProfileService profileService,
            SkillService skillService,
            ProjectService projectService,
            ExperienceService experienceService,
            EducationService educationService,
            CertificationService certificationService) {
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.certificationRepository = certificationRepository;
        this.experienceRepository = experienceRepository;
        this.contactMessageRepository = contactMessageRepository;
        this.profileService = profileService;
        this.skillService = skillService;
        this.projectService = projectService;
        this.experienceService = experienceService;
        this.educationService = educationService;
        this.certificationService = certificationService;
    }

    @Transactional(readOnly = true)
    public DashboardStatsDto getDashboardStats() {
        return new DashboardStatsDto(
                projectRepository.count(),
                skillRepository.count(),
                certificationRepository.count(),
                experienceRepository.count(),
                contactMessageRepository.countByIsReadFalse()
        );
    }

    @Transactional(readOnly = true)
    public PortfolioDataDto getFullPortfolioData() {
        PortfolioDataDto data = new PortfolioDataDto();
        data.setProfile(profileService.getProfile());
        data.setSkills(skillService.getAllSkills());
        data.setSkillsByCategory(skillService.getSkillsGroupedByCategory());
        data.setProjects(projectService.getAllProjects());
        data.setExperience(experienceService.getAllExperience());
        data.setEducation(educationService.getAllEducation());
        data.setCertifications(certificationService.getAllCertifications());
        return data;
    }
}
