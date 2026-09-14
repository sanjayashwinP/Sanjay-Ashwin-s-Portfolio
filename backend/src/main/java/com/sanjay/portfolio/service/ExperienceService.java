package com.sanjay.portfolio.service;

import com.sanjay.portfolio.dto.ExperienceDto;
import com.sanjay.portfolio.entity.Experience;
import com.sanjay.portfolio.exception.ResourceNotFoundException;
import com.sanjay.portfolio.repository.ExperienceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @Transactional(readOnly = true)
    public List<ExperienceDto> getAllExperience() {
        return experienceRepository.findAllByOrderByDisplayOrderAscIdAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ExperienceDto getExperienceById(Long id) {
        Experience exp = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));
        return mapToDto(exp);
    }

    @Transactional
    public ExperienceDto createExperience(ExperienceDto dto) {
        Experience exp = new Experience();
        copyProperties(dto, exp);
        Experience saved = experienceRepository.save(exp);
        return mapToDto(saved);
    }

    @Transactional
    public ExperienceDto updateExperience(Long id, ExperienceDto dto) {
        Experience exp = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));
        copyProperties(dto, exp);
        Experience saved = experienceRepository.save(exp);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteExperience(Long id) {
        if (!experienceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Experience not found with id: " + id);
        }
        experienceRepository.deleteById(id);
    }

    private void copyProperties(ExperienceDto dto, Experience exp) {
        exp.setCompany(dto.getCompany());
        exp.setRole(dto.getRole());
        exp.setLocation(dto.getLocation());
        exp.setStartDate(dto.getStartDate());
        exp.setEndDate(dto.getEndDate());
        exp.setIsCurrent(dto.getIsCurrent() != null ? dto.getIsCurrent() : false);
        exp.setDescription(dto.getDescription());
        exp.setTechnologies(dto.getTechnologies());
        exp.setDisplayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0);
    }

    public ExperienceDto mapToDto(Experience exp) {
        ExperienceDto dto = new ExperienceDto();
        dto.setId(exp.getId());
        dto.setCompany(exp.getCompany());
        dto.setRole(exp.getRole());
        dto.setLocation(exp.getLocation());
        dto.setStartDate(exp.getStartDate());
        dto.setEndDate(exp.getEndDate());
        dto.setIsCurrent(exp.getIsCurrent());
        dto.setDescription(exp.getDescription());
        dto.setTechnologies(exp.getTechnologies());
        dto.setDisplayOrder(exp.getDisplayOrder());
        return dto;
    }
}
