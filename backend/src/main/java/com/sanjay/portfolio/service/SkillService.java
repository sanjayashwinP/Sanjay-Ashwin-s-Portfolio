package com.sanjay.portfolio.service;

import com.sanjay.portfolio.dto.SkillDto;
import com.sanjay.portfolio.entity.Skill;
import com.sanjay.portfolio.exception.ResourceNotFoundException;
import com.sanjay.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Transactional(readOnly = true)
    public List<SkillDto> getAllSkills() {
        return skillRepository.findAllByOrderByCategoryAscDisplayOrderAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Map<String, List<SkillDto>> getSkillsGroupedByCategory() {
        List<SkillDto> all = getAllSkills();
        return all.stream().collect(Collectors.groupingBy(SkillDto::getCategory));
    }

    @Transactional(readOnly = true)
    public SkillDto getSkillById(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));
        return mapToDto(skill);
    }

    @Transactional
    public SkillDto createSkill(SkillDto dto) {
        Skill skill = new Skill(
                dto.getName(),
                dto.getCategory(),
                dto.getProficiencyLevel() != null ? dto.getProficiencyLevel() : "Proficient",
                dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0
        );
        Skill saved = skillRepository.save(skill);
        return mapToDto(saved);
    }

    @Transactional
    public SkillDto updateSkill(Long id, SkillDto dto) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));

        skill.setName(dto.getName());
        skill.setCategory(dto.getCategory());
        if (dto.getProficiencyLevel() != null) {
            skill.setProficiencyLevel(dto.getProficiencyLevel());
        }
        if (dto.getDisplayOrder() != null) {
            skill.setDisplayOrder(dto.getDisplayOrder());
        }

        Skill saved = skillRepository.save(skill);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteSkill(Long id) {
        if (!skillRepository.existsById(id)) {
            throw new ResourceNotFoundException("Skill not found with id: " + id);
        }
        skillRepository.deleteById(id);
    }

    public SkillDto mapToDto(Skill s) {
        SkillDto dto = new SkillDto();
        dto.setId(s.getId());
        dto.setName(s.getName());
        dto.setCategory(s.getCategory());
        dto.setProficiencyLevel(s.getProficiencyLevel());
        dto.setDisplayOrder(s.getDisplayOrder());
        return dto;
    }
}
