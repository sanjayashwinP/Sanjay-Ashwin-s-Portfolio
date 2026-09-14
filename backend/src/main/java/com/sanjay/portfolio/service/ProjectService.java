package com.sanjay.portfolio.service;

import com.sanjay.portfolio.dto.ProjectDto;
import com.sanjay.portfolio.entity.Project;
import com.sanjay.portfolio.exception.ResourceNotFoundException;
import com.sanjay.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional(readOnly = true)
    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAllByOrderByDisplayOrderAscIdAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProjectDto> getFeaturedProjects() {
        return projectRepository.findByFeaturedTrueOrderByDisplayOrderAscIdAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectDto getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        return mapToDto(project);
    }

    @Transactional
    public ProjectDto createProject(ProjectDto dto) {
        Project p = new Project();
        copyProperties(dto, p);
        Project saved = projectRepository.save(p);
        return mapToDto(saved);
    }

    @Transactional
    public ProjectDto updateProject(Long id, ProjectDto dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        copyProperties(dto, project);
        Project saved = projectRepository.save(project);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }

    private void copyProperties(ProjectDto dto, Project p) {
        p.setTitle(dto.getTitle());
        p.setYear(dto.getYear());
        p.setTagline(dto.getTagline());
        p.setDescription(dto.getDescription());
        p.setTechnologies(dto.getTechnologies());
        p.setFeatures(dto.getFeatures());
        p.setGithubUrl(dto.getGithubUrl());
        p.setLiveDemoUrl(dto.getLiveDemoUrl());
        p.setImageUrl(dto.getImageUrl());
        p.setFeatured(dto.getFeatured() != null ? dto.getFeatured() : true);
        p.setProblemStatement(dto.getProblemStatement());
        p.setSolutionStatement(dto.getSolutionStatement());
        p.setArchitectureNotes(dto.getArchitectureNotes());
        p.setContributions(dto.getContributions());
        p.setFutureImprovements(dto.getFutureImprovements());
        p.setDisplayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0);
    }

    public ProjectDto mapToDto(Project p) {
        ProjectDto dto = new ProjectDto();
        dto.setId(p.getId());
        dto.setTitle(p.getTitle());
        dto.setYear(p.getYear());
        dto.setTagline(p.getTagline());
        dto.setDescription(p.getDescription());
        dto.setTechnologies(p.getTechnologies());
        dto.setFeatures(p.getFeatures());
        dto.setGithubUrl(p.getGithubUrl());
        dto.setLiveDemoUrl(p.getLiveDemoUrl());
        dto.setImageUrl(p.getImageUrl());
        dto.setFeatured(p.getFeatured());
        dto.setProblemStatement(p.getProblemStatement());
        dto.setSolutionStatement(p.getSolutionStatement());
        dto.setArchitectureNotes(p.getArchitectureNotes());
        dto.setContributions(p.getContributions());
        dto.setFutureImprovements(p.getFutureImprovements());
        dto.setDisplayOrder(p.getDisplayOrder());
        return dto;
    }
}
