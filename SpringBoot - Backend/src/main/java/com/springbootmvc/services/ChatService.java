package com.springbootmvc.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springbootmvc.controllers.CartController;
import com.springbootmvc.controllers.CategoryController;
import com.springbootmvc.controllers.OrderController;
import com.springbootmvc.controllers.ProductController;
import com.springbootmvc.controllers.UserController;

@Service
public class ChatService {

    @Autowired
    UserService userService;
    @Autowired
    UserController userController;
    @Autowired
    ProductController productController;
    @Autowired
    CategoryController categoryController;
    @Autowired
    OrderController orderController;
    @Autowired
    CartController cartController;
    
    @Value("${groq.api.key}")
    private String groqApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private final String n8nWebhookUrl = "http://localhost:5678/webhook/pet-assistant";

    private final String groqEndpoint = "https://api.groq.com/openai/v1/chat/completions";

    public Object askPetShopBot(String token, String question) {
        try 
        {
        	// Calling n8n workflow to get the API and parameters as response
            Map<String, String> request = new HashMap<>();
            request.put("question", question);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, String>> entity = new HttpEntity<>(request, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    n8nWebhookUrl,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            Map<String, Object> body = response.getBody();

            if (body != null && body.get("reply") != null) 
            {
                Map<String, Object> reply = (Map<String, Object>) body.get("reply");
                String api = (String) reply.get("api");
                Map<String, Object> parameters = (Map<String, Object>) reply.get("parameters");

                // Calling the respective API based on the response received from n8n workflow
                Object rawResponse = returnApiResponse(token, api, parameters);

                // Converting raw response to natural language using GroqAI
                Object formattedResponse = formatResponseWithAI(rawResponse, api);

                return formattedResponse;
            } 
            else 
            {
            	// In case of null response from n8n workflow
                return "Sorry, I couldn’t process your request right now.";
            }
        } 
        catch (Exception e) 
        {
            return "Sorry, there was an error processing your request. " + e.getMessage();
        }
    }

    // This method returns the response by calling an appropriate API based on n8n response
    private Object returnApiResponse(String token, String api, Map<String, Object> parameters) {
        try 
        {
            switch (api) 
            {
                case "/user/{user_id}":
                case "user": 
                {
                    int userId = resolveUserId(token, parameters);
                    return userController.viewDetails(token, userId).getBody();
                }

                case "/user/orders":
                case "/user/orders/{user_id}": 
                {
                    int userId = resolveUserId(token, parameters);
                    return orderController.viewOrders(token, userId).getBody();
                }

                case "/user/{user_id}/cart":
                case "/user/cart": 
                {
                    int userId = resolveUserId(token, parameters);
                    return cartController.viewCart(token, userId).getBody();
                }

                case "/categories":
                    return categoryController.viewCategories(token).getBody();

                case "/products/category": 
                {
                    Object categoryObj = parameters.get("category");
                    String category = (categoryObj == null ? "" : categoryObj.toString());
                    return productController.filterProductsByCategory(token, category).getBody();
                }

                case "/admin/users":
                    return userController.viewUsersList(token).getBody();

                case "/admin/orders":
                    return orderController.viewOrders(token).getBody();

                case "/generalKnowledge":
                    return "Sorry, I can answer only pet shop specific questions";

                default:
                    throw new IllegalArgumentException("Unexpected API : " + api);
            }
        } 
        catch (Exception e) 
        {
            return "Error fetching API response.";
        }
    }

    // This method is used to fetch the current User Id, which is passed as a path parameter during the API call
    // This is required in case the user_id cannot be resolved from user's query 
    private int resolveUserId(String token, Map<String, Object> parameters) 
    {
        Object userIdObj = parameters.get("user_id");
        int userId = (userIdObj == null) ? userService.getUserIdFromToken(token) : Integer.parseInt(userIdObj.toString());
        return userId;
    }

    // This method converts the API response into natural language, which is returned as a response to user's query
    private Object formatResponseWithAI(Object rawResponse, String api) 
    {
        try 
        {
            ObjectMapper objectMapper = new ObjectMapper();
            if (rawResponse == null || (rawResponse instanceof List && ((List<?>) rawResponse).isEmpty())) 
            {
                rawResponse = "No data found.";
            }

            String jsonToSend = objectMapper.writeValueAsString(rawResponse);
            Map<String, Object> requestBody = Map.of(
                    "model", "llama-3.3-70b-versatile",
                    "messages", List.of(
                            Map.of("role", "user",
                                   "content", "Convert this API response into natural language: " + jsonToSend)
                    )
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(groqApiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> aiResponse = restTemplate.postForEntity(
                    groqEndpoint,
                    entity,
                    String.class
            );

            JsonNode root = objectMapper.readTree(aiResponse.getBody());
            return root.get("choices").get(0).get("message").get("content").asText();

        } 
        catch (Exception e) 
        {
            return "I got the data, but couldn’t format it into natural language.";
        }
    }
}

