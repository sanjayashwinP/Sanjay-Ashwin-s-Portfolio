package com.sanjay.portfolio.controller;

import com.sanjay.portfolio.dto.ApiResponse;
import com.sanjay.portfolio.dto.ProfileDto;
import com.sanjay.portfolio.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/profile")
@PreAuthorize("hasRole('ADMIN')")
public class AdminProfileController {

    private final ProfileService profileService;

    public AdminProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ProfileDto>> updateProfile(@Valid @RequestBody ProfileDto dto) {
        ProfileDto updated = profileService.updateProfile(dto);
        return ResponseEntity.ok(ApiResponse.ok("Profile updated successfully", updated));
    }
}
