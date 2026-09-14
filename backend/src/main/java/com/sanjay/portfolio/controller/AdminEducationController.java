package com.sanjay.portfolio.controller;

import com.sanjay.portfolio.dto.ApiResponse;
import com.sanjay.portfolio.dto.EducationDto;
import com.sanjay.portfolio.service.EducationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/education")
@PreAuthorize("hasRole('ADMIN')")
public class AdminEducationController {

    private final EducationService educationService;

    public AdminEducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EducationDto>> createEducation(@Valid @RequestBody EducationDto dto) {
        EducationDto created = educationService.createEducation(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Education record created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EducationDto>> updateEducation(
            @PathVariable Long id,
            @Valid @RequestBody EducationDto dto) {
        EducationDto updated = educationService.updateEducation(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Education record updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEducation(@PathVariable Long id) {
        educationService.deleteEducation(id);
        return ResponseEntity.ok(ApiResponse.ok("Education record deleted successfully", null));
    }
}
