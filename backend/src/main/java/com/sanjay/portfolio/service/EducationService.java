package com.sanjay.portfolio.service;

import com.sanjay.portfolio.dto.EducationDto;
import com.sanjay.portfolio.entity.Education;
import com.sanjay.portfolio.exception.ResourceNotFoundException;
import com.sanjay.portfolio.repository.EducationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EducationService {

    private final EducationRepository educationRepository;

    public EducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    @Transactional(readOnly = true)
    public List<EducationDto> getAllEducation() {
        return educationRepository.findAllByOrderByIdAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EducationDto getEducationById(Long id) {
        Education edu = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education not found with id: " + id));
        return mapToDto(edu);
    }

    @Transactional
    public EducationDto createEducation(EducationDto dto) {
        Education edu = new Education(
                dto.getInstitution(),
                dto.getDegree(),
                dto.getFieldOfStudy(),
                dto.getStartDate(),
                dto.getEndDate(),
                dto.getCgpa(),
                dto.getLocation()
        );
        Education saved = educationRepository.save(edu);
        return mapToDto(saved);
    }

    @Transactional
    public EducationDto updateEducation(Long id, EducationDto dto) {
        Education edu = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education not found with id: " + id));

        edu.setInstitution(dto.getInstitution());
        edu.setDegree(dto.getDegree());
        edu.setFieldOfStudy(dto.getFieldOfStudy());
        edu.setStartDate(dto.getStartDate());
        edu.setEndDate(dto.getEndDate());
        edu.setCgpa(dto.getCgpa());
        edu.setLocation(dto.getLocation());

        Education saved = educationRepository.save(edu);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteEducation(Long id) {
        if (!educationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Education not found with id: " + id);
        }
        educationRepository.deleteById(id);
    }

    public EducationDto mapToDto(Education edu) {
        EducationDto dto = new EducationDto();
        dto.setId(edu.getId());
        dto.setInstitution(edu.getInstitution());
        dto.setDegree(edu.getDegree());
        dto.setFieldOfStudy(edu.getFieldOfStudy());
        dto.setStartDate(edu.getStartDate());
        dto.setEndDate(edu.getEndDate());
        dto.setCgpa(edu.getCgpa());
        dto.setLocation(edu.getLocation());
        return dto;
    }
}
