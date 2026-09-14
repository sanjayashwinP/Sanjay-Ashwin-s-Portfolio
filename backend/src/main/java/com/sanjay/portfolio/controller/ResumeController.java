package com.sanjay.portfolio.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private static final Logger log = LoggerFactory.getLogger(ResumeController.class);

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadResume() {
        try {
            Resource resource = new ClassPathResource("Sanjay_Ashwin_Resume.pdf");
            if (!resource.exists()) {
                log.warn("Resume PDF not found on classpath.");
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"Sanjay_Ashwin_Resume.pdf\"")
                    .body(resource);
        } catch (Exception ex) {
            log.error("Failed to serve resume file: ", ex);
            return ResponseEntity.internalServerError().build();
        }
    }
}
