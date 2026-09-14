package com.sanjay.portfolio.service;

import com.sanjay.portfolio.dto.ProfileDto;
import com.sanjay.portfolio.entity.Profile;
import com.sanjay.portfolio.exception.ResourceNotFoundException;
import com.sanjay.portfolio.repository.ProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Transactional(readOnly = true)
    public ProfileDto getProfile() {
        Profile profile = profileRepository.findFirstByOrderByIdAsc()
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
        return mapToDto(profile);
    }

    @Transactional
    public ProfileDto updateProfile(ProfileDto dto) {
        Profile profile = profileRepository.findFirstByOrderByIdAsc()
                .orElse(new Profile());

        profile.setName(dto.getName());
        profile.setTitle(dto.getTitle());
        profile.setBio(dto.getBio());
        profile.setEmail(dto.getEmail());
        profile.setPhone(dto.getPhone());
        profile.setLocation(dto.getLocation());
        profile.setGithubUrl(dto.getGithubUrl());
        profile.setLinkedinUrl(dto.getLinkedinUrl());
        profile.setResumeUrl(dto.getResumeUrl());
        profile.setCgpa(dto.getCgpa());
        profile.setEducationSummary(dto.getEducationSummary());
        profile.setUpdatedAt(LocalDateTime.now());

        Profile saved = profileRepository.save(profile);
        return mapToDto(saved);
    }

    public ProfileDto mapToDto(Profile p) {
        ProfileDto dto = new ProfileDto();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setTitle(p.getTitle());
        dto.setBio(p.getBio());
        dto.setEmail(p.getEmail());
        dto.setPhone(p.getPhone());
        dto.setLocation(p.getLocation());
        dto.setGithubUrl(p.getGithubUrl());
        dto.setLinkedinUrl(p.getLinkedinUrl());
        dto.setResumeUrl(p.getResumeUrl());
        dto.setCgpa(p.getCgpa());
        dto.setEducationSummary(p.getEducationSummary());
        return dto;
    }
}
