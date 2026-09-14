package com.sanjay.portfolio.controller;

import com.sanjay.portfolio.dto.ApiResponse;
import com.sanjay.portfolio.dto.ContactMessageDto;
import com.sanjay.portfolio.service.ContactMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/messages")
@PreAuthorize("hasRole('ADMIN')")
public class AdminMessageController {

    private final ContactMessageService messageService;

    public AdminMessageController(ContactMessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ContactMessageDto>>> getAllMessages() {
        return ResponseEntity.ok(ApiResponse.ok(messageService.getAllMessages()));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ApiResponse<Void>> markAsRead(@PathVariable Long id) {
        messageService.markAsRead(id);
        return ResponseEntity.ok(ApiResponse.ok("Message marked as read", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMessage(@PathVariable Long id) {
        messageService.deleteMessage(id);
        return ResponseEntity.ok(ApiResponse.ok("Message deleted successfully", null));
    }
}
