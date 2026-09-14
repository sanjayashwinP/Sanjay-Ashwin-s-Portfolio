package com.sanjay.portfolio.controller;

import com.sanjay.portfolio.dto.*;
import com.sanjay.portfolio.service.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PublicPortfolioController {

    private final DashboardService dashboardService;
    private final ProfileService profileService;
    private final SkillService skillService;
    private final ProjectService projectService;
    private final ExperienceService experienceService;
    private final EducationService educationService;
    private final CertificationService certificationService;
    private final ContactMessageService contactMessageService;

    public PublicPortfolioController(
            DashboardService dashboardService,
            ProfileService profileService,
            SkillService skillService,
            ProjectService projectService,
            ExperienceService experienceService,
            EducationService educationService,
            CertificationService certificationService,
            ContactMessageService contactMessageService) {
        this.dashboardService = dashboardService;
        this.profileService = profileService;
        this.skillService = skillService;
        this.projectService = projectService;
        this.experienceService = experienceService;
        this.educationService = educationService;
        this.certificationService = certificationService;
        this.contactMessageService = contactMessageService;
    }

    @GetMapping("/portfolio")
    public ResponseEntity<ApiResponse<PortfolioDataDto>> getFullPortfolio() {
        PortfolioDataDto data = dashboardService.getFullPortfolioData();
        return ResponseEntity.ok(ApiResponse.ok(data));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<ProfileDto>> getProfile() {
        return ResponseEntity.ok(ApiResponse.ok(profileService.getProfile()));
    }

    @GetMapping("/skills")
    public ResponseEntity<ApiResponse<List<SkillDto>>> getSkills() {
        return ResponseEntity.ok(ApiResponse.ok(skillService.getAllSkills()));
    }

    @GetMapping("/skills/grouped")
    public ResponseEntity<ApiResponse<Map<String, List<SkillDto>>>> getSkillsGrouped() {
        return ResponseEntity.ok(ApiResponse.ok(skillService.getSkillsGroupedByCategory()));
    }

    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getProjects() {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getAllProjects()));
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<ApiResponse<ProjectDto>> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getProjectById(id)));
    }

    @GetMapping("/experience")
    public ResponseEntity<ApiResponse<List<ExperienceDto>>> getExperience() {
        return ResponseEntity.ok(ApiResponse.ok(experienceService.getAllExperience()));
    }

    @GetMapping("/education")
    public ResponseEntity<ApiResponse<List<EducationDto>>> getEducation() {
        return ResponseEntity.ok(ApiResponse.ok(educationService.getAllEducation()));
    }

    @GetMapping("/certifications")
    public ResponseEntity<ApiResponse<List<CertificationDto>>> getCertifications() {
        return ResponseEntity.ok(ApiResponse.ok(certificationService.getAllCertifications()));
    }

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse<ContactMessageDto>> submitContactMessage(
            @Valid @RequestBody ContactMessageDto dto) {
        ContactMessageDto saved = contactMessageService.saveMessage(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Thank you! Your message has been received successfully.", saved));
    }
}
