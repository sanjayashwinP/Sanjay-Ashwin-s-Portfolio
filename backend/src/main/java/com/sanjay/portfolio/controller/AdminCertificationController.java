package com.sanjay.portfolio.controller;

import com.sanjay.portfolio.dto.ApiResponse;
import com.sanjay.portfolio.dto.CertificationDto;
import com.sanjay.portfolio.service.CertificationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/certifications")
@PreAuthorize("hasRole('ADMIN')")
public class AdminCertificationController {

    private final CertificationService certificationService;

    public AdminCertificationController(CertificationService certificationService) {
        this.certificationService = certificationService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CertificationDto>> createCertification(@Valid @RequestBody CertificationDto dto) {
        CertificationDto created = certificationService.createCertification(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Certification created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CertificationDto>> updateCertification(
            @PathVariable Long id,
            @Valid @RequestBody CertificationDto dto) {
        CertificationDto updated = certificationService.updateCertification(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Certification updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCertification(@PathVariable Long id) {
        certificationService.deleteCertification(id);
        return ResponseEntity.ok(ApiResponse.ok("Certification deleted successfully", null));
    }
}
