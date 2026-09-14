package com.sanjay.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public class ProjectDto {

    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Year is required")
    private String year;

    private String tagline;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Technologies are required")
    private String technologies;

    private String features;
    private String githubUrl;
    private String liveDemoUrl;
    private String imageUrl;
    private Boolean featured = true;

    private String problemStatement;
    private String solutionStatement;
    private String architectureNotes;
    private String contributions;
    private String futureImprovements;
    private Integer displayOrder = 0;

    public ProjectDto() {
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
