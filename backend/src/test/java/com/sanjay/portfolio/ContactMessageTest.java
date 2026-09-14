package com.sanjay.portfolio;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sanjay.portfolio.dto.ContactMessageDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ContactMessageTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testValidContactMessageSubmission() throws Exception {
        ContactMessageDto dto = new ContactMessageDto();
        dto.setName("Recruiter Jane");
        dto.setEmail("recruiter@example.com");
        dto.setSubject("Interview Opportunity for Java Backend Developer");
        dto.setMessage("Hi Sanjay, we reviewed your AI coding platform and were impressed. Let's schedule an interview.");

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Recruiter Jane"))
                .andExpect(jsonPath("$.data.id").isNumber());
    }

    @Test
    void testInvalidEmailSubmission() throws Exception {
        ContactMessageDto dto = new ContactMessageDto();
        dto.setName("Test User");
        dto.setEmail("not-a-valid-email");
        dto.setSubject("Question");
        dto.setMessage("Hello");

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }
}
