package com.sanjay.portfolio.config;

import com.sanjay.portfolio.entity.*;
import com.sanjay.portfolio.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DatabaseInitializer.class);

    private final AdminUserRepository adminUserRepository;
    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final CertificationRepository certificationRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.username:admin}")
    private String adminUsername;

    @Value("${app.admin.password:adminPassword123!}")
    private String adminPassword;

    public DatabaseInitializer(
            AdminUserRepository adminUserRepository,
            ProfileRepository profileRepository,
            SkillRepository skillRepository,
            ProjectRepository projectRepository,
            ExperienceRepository experienceRepository,
            EducationRepository educationRepository,
            CertificationRepository certificationRepository,
            PasswordEncoder passwordEncoder) {
        this.adminUserRepository = adminUserRepository;
        this.profileRepository = profileRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.certificationRepository = certificationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedAdminUser();
        seedProfile();
        seedSkills();
        seedProjects();
        seedExperience();
        seedEducation();
        seedCertifications();
        log.info("Portfolio database verification and seeding completed successfully.");
    }

    private void seedAdminUser() {
        // Delete insecure legacy 'admin' if present
        if (!"admin".equals(adminUsername)) {
            adminUserRepository.findByUsername("admin").ifPresent(adminUserRepository::delete);
        }

        AdminUser admin = adminUserRepository.findByUsername(adminUsername)
                .orElse(new AdminUser());
        admin.setUsername(adminUsername);
        admin.setPassword(passwordEncoder.encode(adminPassword));
        admin.setRole("ROLE_ADMIN");
        adminUserRepository.save(admin);
        log.info("Configured secure admin account: {}", adminUsername);
    }

    private void seedProfile() {
        if (profileRepository.count() == 0) {
            Profile profile = new Profile();
            profile.setName("Sanjay Ashwin");
            profile.setTitle("Java & Full-Stack Developer");
            profile.setBio("Computer Science and Engineering undergraduate with strong knowledge in Java, Spring Boot, Spring Security, and full-stack web development. Passionate about backend development, REST API design, and building scalable applications through practical project experience.");
            profile.setEmail("sanjayashwin502@gmail.com");
            profile.setPhone("+91-8870794020");
            profile.setLocation("Chennai, India");
            profile.setWorkplace("Saveetha Engineering College • CGPA 8.4");
            profile.setGithubUrl("https://github.com/sanjayashwinP");
            profile.setLinkedinUrl("https://www.linkedin.com/in/sanjay-ashwin-62b566376");
            profile.setResumeUrl("/api/resume/download");
            profile.setCgpa("8.4");
            profile.setEducationSummary("B.E. Computer Science and Engineering, Saveetha Engineering College (2023 - 2027)");

            profileRepository.save(profile);
            log.info("Seeded primary profile for Sanjay Ashwin.");
        } else {
            profileRepository.findAll().stream().findFirst().ifPresent(profile -> {
                if (profile.getWorkplace() == null || profile.getWorkplace().isBlank()) {
                    profile.setWorkplace("Saveetha Engineering College • CGPA 8.4");
                    profileRepository.save(profile);
                    log.info("Populated default workplace for profile.");
                }
            });
        }
    }

    private void seedSkills() {
        if (skillRepository.count() == 0) {
            List<Skill> skills = Arrays.asList(
                    // Programming Languages
                    new Skill("Java", "Languages", "Proficient", 1),
                    new Skill("JavaScript", "Languages", "Proficient", 2),
                    new Skill("SQL", "Languages", "Proficient", 3),
                    new Skill("Python", "Languages", "Basics", 4),
                    new Skill("C", "Languages", "Basics", 5),

                    // Frontend
                    new Skill("HTML5", "Frontend", "Proficient", 1),
                    new Skill("CSS3", "Frontend", "Proficient", 2),
                    new Skill("ReactJS", "Frontend", "Proficient", 3),

                    // Backend
                    new Skill("Spring Boot", "Backend", "Proficient", 1),
                    new Skill("Spring Security", "Backend", "Proficient", 2),
                    new Skill("REST APIs", "Backend", "Proficient", 3),

                    // Database
                    new Skill("MySQL", "Database", "Proficient", 1),

                    // Developer Tools
                    new Skill("Git", "Tools", "Proficient", 1),
                    new Skill("GitHub", "Tools", "Proficient", 2),
                    new Skill("Maven", "Tools", "Proficient", 3),
                    new Skill("Postman", "Tools", "Proficient", 4),
                    new Skill("IntelliJ IDEA", "Tools", "Proficient", 5),
                    new Skill("VS Code", "Tools", "Proficient", 6),

                    // Cloud
                    new Skill("AWS Basics", "Cloud", "Foundational", 1),

                    // Core Competencies & Concepts
                    new Skill("Backend Development", "Concepts", "Proficient", 1),
                    new Skill("Problem Solving", "Concepts", "Proficient", 2),
                    new Skill("OOP & Collections Framework", "Concepts", "Proficient", 3),
                    new Skill("JWT Authentication", "Concepts", "Proficient", 4),
                    new Skill("Team Collaboration", "Concepts", "Proficient", 5)
            );

            skillRepository.saveAll(skills);
            log.info("Seeded {} technical skills.", skills.size());
        }
    }

    private void seedProjects() {
        if (projectRepository.count() == 0) {
            Project p = new Project();
            p.setTitle("AI Integrated Online Coding Platform");
            p.setYear("2025");
            p.setTagline("Full-stack online coding platform with Judge0 code execution and Gemini AI error explanation");
            p.setDescription("Developed a full-stack online coding platform using ReactJS and Spring Boot. Integrated Judge0 API for real-time code compilation and execution across programming languages. Implemented AI-powered error explanation and context-aware hint generation using Google Gemini API. Built backend REST APIs and integrated Monaco Editor for IDE-like coding support with a responsive and user-friendly interface.");
            p.setTechnologies("ReactJS, Spring Boot, Judge0 API, Gemini API, Monaco Editor, REST APIs, Git, GitHub");
            p.setFeatures("Real-time remote code compilation and execution via Judge0 API;AI-powered compiler error explanation and hint generation using Gemini API;Embedded Monaco Editor providing syntax highlighting, autocomplete, and line numbers;Clean Spring Boot RESTful API endpoints for problem management and submission handling;Responsive, dark-mode developer interface optimized for desktop and mobile");
            p.setGithubUrl("https://github.com/sanjayashwinP");
            p.setLiveDemoUrl("");
            p.setImageUrl("");
            p.setFeatured(true);
            p.setProblemStatement("Students and beginner programmers often encounter cryptic compiler and runtime errors while coding online, leading to confusion and frustration when self-diagnosing errors.");
            p.setSolutionStatement("Engineered an AI-assisted IDE environment integrating Judge0 for secure code compilation and Google's Gemini API to translate obscure stack traces into intuitive, pedagogical hints without giving away the full answer.");
            p.setArchitectureNotes("React frontend hosts Monaco Editor and communicates with Spring Boot REST endpoints. The backend coordinates compilation tasks with Judge0 engine and prompts Gemini API for targeted diagnostic insights.");
            p.setContributions("Architected the full-stack architecture, developed the Spring Boot backend REST APIs, integrated Judge0 compilation webhooks, built the prompt engineering pipeline for Gemini, and created the responsive React interface.");
            p.setFutureImprovements("Add multi-language file structure support, automated test suite evaluation with test cases, and live multiplayer coding rooms.");
            p.setDisplayOrder(1);

            projectRepository.save(p);
            log.info("Seeded primary project: {}", p.getTitle());
        }
    }

    private void seedExperience() {
        if (experienceRepository.count() == 0) {
            Experience exp = new Experience();
            exp.setCompany("Codveda Technologies");
            exp.setRole("Java Development Intern");
            exp.setLocation("Chennai, India");
            exp.setStartDate("June 2026");
            exp.setEndDate("July 2026");
            exp.setIsCurrent(false);
            exp.setDescription("Worked on Java and Spring Boot technologies for backend application development. Developed RESTful APIs using Spring Boot and implemented CRUD operations for data management. Applied Object-Oriented Programming principles and Java Collections Framework for modular, maintainable code. Performed API testing and debugging using Postman. Gained practical experience with Maven, Git, and MySQL database integration in Spring Boot applications.");
            exp.setTechnologies("Java, Spring Boot, REST APIs, CRUD, OOP, Java Collections Framework, Maven, Git, MySQL, Postman");
            exp.setDisplayOrder(1);

            experienceRepository.save(exp);
            log.info("Seeded experience: {} @ {}", exp.getRole(), exp.getCompany());
        }
    }

    private void seedEducation() {
        if (educationRepository.count() == 0) {
            Education edu = new Education(
                    "Saveetha Engineering College",
                    "B.E. Computer Science and Engineering",
                    "Computer Science and Engineering",
                    "September 2023",
                    "May 2027",
                    "8.4",
                    "Chennai, India"
            );
            educationRepository.save(edu);
            log.info("Seeded education: {}", edu.getInstitution());
        }
    }

    private void seedCertifications() {
        if (certificationRepository.count() == 0) {
            List<Certification> certs = Arrays.asList(
                    new Certification("AWS Academy Cloud Foundations", "AWS Academy", "2024", "", "", 1),
                    new Certification("Prompt Engineering", "Simplilearn", "2024", "", "", 2),
                    new Certification("Spring Boot", "Coursera", "2024", "", "", 3)
            );
            certificationRepository.saveAll(certs);
            log.info("Seeded {} certifications.", certs.size());
        }
    }
}
