package com.springbootmvc.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.springbootmvc.services.ChatService;
import com.springbootmvc.services.UserService;

@RestController
public class ChatController {

    @Autowired
    ChatService chatService;
    @Autowired
    UserService userService;

    @PostMapping("/chat")
    public ResponseEntity<?> chatWithBot(@RequestHeader(value = "Authorization", required = false) String token, @RequestBody Map<String, String> request) 
    {
        if (token == null || token.isEmpty()) 
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Empty Token !!!");
        }

        String tokenValue = token.replace("Bearer ", "");
        if (!userService.validToken(tokenValue)) 
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token !!!");
        }

        String question = request.get("question");
        if (question == null || question.trim().isEmpty()) 
        {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Please provide a question !!!");
        }

        Object reply = chatService.askPetShopBot(tokenValue, question);
        return ResponseEntity.status(HttpStatus.OK).body(reply);
    }
}
