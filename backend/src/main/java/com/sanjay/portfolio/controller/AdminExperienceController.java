package com.sanjay.portfolio.controller;

import com.sanjay.portfolio.dto.ApiResponse;
import com.sanjay.portfolio.dto.ExperienceDto;
import com.sanjay.portfolio.service.ExperienceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/experience")
@PreAuthorize("hasRole('ADMIN')")
public class AdminExperienceController {

    private final ExperienceService experienceService;

    public AdminExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ExperienceDto>> createExperience(@Valid @RequestBody ExperienceDto dto) {
        ExperienceDto created = experienceService.createExperience(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Experience created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ExperienceDto>> updateExperience(
            @PathVariable Long id,
            @Valid @RequestBody ExperienceDto dto) {
        ExperienceDto updated = experienceService.updateExperience(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Experience updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteExperience(@PathVariable Long id) {
        experienceService.deleteExperience(id);
        return ResponseEntity.ok(ApiResponse.ok("Experience deleted successfully", null));
    }
}
