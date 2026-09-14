package com.sanjay.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "project_year", nullable = false, length = 20)
    private String year;

    @Column(length = 255)
    private String tagline;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(length = 500, nullable = false)
    private String technologies;

    @Column(columnDefinition = "TEXT")
    private String features;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "live_demo_url")
    private String liveDemoUrl;

    @Column(name = "image_url")
    private String imageUrl;

    private Boolean featured = true;

    @Column(name = "problem_statement", columnDefinition = "TEXT")
    private String problemStatement;

    @Column(name = "solution_statement", columnDefinition = "TEXT")
    private String solutionStatement;

    @Column(name = "architecture_notes", columnDefinition = "TEXT")
    private String architectureNotes;

    @Column(columnDefinition = "TEXT")
    private String contributions;

    @Column(name = "future_improvements", columnDefinition = "TEXT")
    private String futureImprovements;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    public Project() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTechnologies() {
        return technologies;
    }

    public void setTechnologies(String technologies) {
        this.technologies = technologies;
    }

    public String getFeatures() {
        return features;
    }

    public void setFeatures(String features) {
        this.features = features;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getLiveDemoUrl() {
        return liveDemoUrl;
    }

    public void setLiveDemoUrl(String liveDemoUrl) {
        this.liveDemoUrl = liveDemoUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getFeatured() {
        return featured;
    }

    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }

    public String getProblemStatement() {
        return problemStatement;
    }

    public void setProblemStatement(String problemStatement) {
        this.problemStatement = problemStatement;
    }

    public String getSolutionStatement() {
        return solutionStatement;
    }

    public void setSolutionStatement(String solutionStatement) {
        this.solutionStatement = solutionStatement;
    }

    public String getArchitectureNotes() {
        return architectureNotes;
    }

    public void setArchitectureNotes(String architectureNotes) {
        this.architectureNotes = architectureNotes;
    }

    public String getContributions() {
        return contributions;
    }

    public void setContributions(String contributions) {
        this.contributions = contributions;
    }

    public String getFutureImprovements() {
        return futureImprovements;
    }

    public void setFutureImprovements(String futureImprovements) {
        this.futureImprovements = futureImprovements;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
