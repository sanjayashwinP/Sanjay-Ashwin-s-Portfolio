package com.sanjay.portfolio.service;

import com.sanjay.portfolio.dto.ContactMessageDto;
import com.sanjay.portfolio.entity.ContactMessage;
import com.sanjay.portfolio.exception.ResourceNotFoundException;
import com.sanjay.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactMessageService {

    private final ContactMessageRepository messageRepository;

    public ContactMessageService(ContactMessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Transactional
    public ContactMessageDto saveMessage(ContactMessageDto dto) {
        String cleanName = dto.getName() != null ? dto.getName().trim() : "";
        String cleanEmail = dto.getEmail() != null ? dto.getEmail().trim().toLowerCase() : "";
        String cleanSubject = dto.getSubject() != null ? dto.getSubject().trim() : "";
        String cleanMessage = dto.getMessage() != null ? dto.getMessage().trim() : "";

        ContactMessage msg = new ContactMessage(cleanName, cleanEmail, cleanSubject, cleanMessage);
        ContactMessage saved = messageRepository.save(msg);
        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public List<ContactMessageDto> getAllMessages() {
        return messageRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public long getUnreadCount() {
        return messageRepository.countByIsReadFalse();
    }

    @Transactional
    public void markAsRead(Long id) {
        ContactMessage msg = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + id));
        msg.setIsRead(true);
        messageRepository.save(msg);
    }

    @Transactional
    public void deleteMessage(Long id) {
        if (!messageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Message not found with id: " + id);
        }
        messageRepository.deleteById(id);
    }

    public ContactMessageDto mapToDto(ContactMessage msg) {
        ContactMessageDto dto = new ContactMessageDto();
        dto.setId(msg.getId());
        dto.setName(msg.getName());
        dto.setEmail(msg.getEmail());
        dto.setSubject(msg.getSubject());
        dto.setMessage(msg.getMessage());
        dto.setIsRead(msg.getIsRead());
        dto.setCreatedAt(msg.getCreatedAt());
        return dto;
    }
}
