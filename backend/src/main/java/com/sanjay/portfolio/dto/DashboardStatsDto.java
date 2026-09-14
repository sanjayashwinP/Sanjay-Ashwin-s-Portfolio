package com.sanjay.portfolio.dto;

public class DashboardStatsDto {

    private long totalProjects;
    private long totalSkills;
    private long totalCertifications;
    private long totalExperience;
    private long unreadMessages;

    public DashboardStatsDto() {
    }

    public DashboardStatsDto(long totalProjects, long totalSkills, long totalCertifications, long totalExperience, long unreadMessages) {
        this.totalProjects = totalProjects;
        this.totalSkills = totalSkills;
        this.totalCertifications = totalCertifications;
        this.totalExperience = totalExperience;
        this.unreadMessages = unreadMessages;
    }

    public long getTotalProjects() {
        return totalProjects;
    }

    public void setTotalProjects(long totalProjects) {
        this.totalProjects = totalProjects;
    }

    public long getTotalSkills() {
        return totalSkills;
    }

    public void setTotalSkills(long totalSkills) {
        this.totalSkills = totalSkills;
    }

    public long getTotalCertifications() {
        return totalCertifications;
    }

    public void setTotalCertifications(long totalCertifications) {
        this.totalCertifications = totalCertifications;
    }

    public long getTotalExperience() {
        return totalExperience;
    }

    public void setTotalExperience(long totalExperience) {
        this.totalExperience = totalExperience;
    }

    public long getUnreadMessages() {
        return unreadMessages;
    }

    public void setUnreadMessages(long unreadMessages) {
        this.unreadMessages = unreadMessages;
    }
}
