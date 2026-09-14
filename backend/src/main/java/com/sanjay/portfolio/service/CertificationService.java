package com.sanjay.portfolio.service;

import com.sanjay.portfolio.dto.CertificationDto;
import com.sanjay.portfolio.entity.Certification;
import com.sanjay.portfolio.exception.ResourceNotFoundException;
import com.sanjay.portfolio.repository.CertificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CertificationService {

    private final CertificationRepository certificationRepository;

    public CertificationService(CertificationRepository certificationRepository) {
        this.certificationRepository = certificationRepository;
    }

    @Transactional(readOnly = true)
    public List<CertificationDto> getAllCertifications() {
        return certificationRepository.findAllByOrderByDisplayOrderAscIdAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CertificationDto getCertificationById(Long id) {
        Certification cert = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification not found with id: " + id));
        return mapToDto(cert);
    }

    @Transactional
    public CertificationDto createCertification(CertificationDto dto) {
        Certification cert = new Certification(
                dto.getName(),
                dto.getIssuer(),
                dto.getIssueDate(),
                dto.getCredentialUrl(),
                dto.getCredentialId(),
                dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0
        );
        Certification saved = certificationRepository.save(cert);
        return mapToDto(saved);
    }

    @Transactional
    public CertificationDto updateCertification(Long id, CertificationDto dto) {
        Certification cert = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification not found with id: " + id));

        cert.setName(dto.getName());
        cert.setIssuer(dto.getIssuer());
        cert.setIssueDate(dto.getIssueDate());
        cert.setCredentialUrl(dto.getCredentialUrl());
        cert.setCredentialId(dto.getCredentialId());
        if (dto.getDisplayOrder() != null) {
            cert.setDisplayOrder(dto.getDisplayOrder());
        }

        Certification saved = certificationRepository.save(cert);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteCertification(Long id) {
        if (!certificationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Certification not found with id: " + id);
        }
        certificationRepository.deleteById(id);
    }

    public CertificationDto mapToDto(Certification c) {
        CertificationDto dto = new CertificationDto();
        dto.setId(c.getId());
        dto.setName(c.getName());
        dto.setIssuer(c.getIssuer());
        dto.setIssueDate(c.getIssueDate());
        dto.setCredentialUrl(c.getCredentialUrl());
        dto.setCredentialId(c.getCredentialId());
        dto.setDisplayOrder(c.getDisplayOrder());
        return dto;
    }
}
