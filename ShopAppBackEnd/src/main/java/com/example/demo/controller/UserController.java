package com.example.demo.controller;

import com.example.demo.dto.UpdateUserDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserLoginDTO;
import com.example.demo.exceptions.DataNotFoundException;
import com.example.demo.models.User;
import com.example.demo.responses.LoginResponse;
import com.example.demo.responses.UserResponse;
import com.example.demo.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO, BindingResult result){
        try {
            if(result.hasErrors()){
                List<String> errorMessage = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity
                        .badRequest()
                        .body(errorMessage);
            }
            if(!userDTO.getPassword().equals(userDTO.getReTypePassword())){
                return ResponseEntity.badRequest().body("Password doesn't match");
            }
            userService.createUser(userDTO);
            return ResponseEntity.ok("Register successfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody UserLoginDTO userLoginDTO){
        //Kiểm tra thông tin đăng nhập và sinh token
        try {
            String token = userService.login(userLoginDTO.getPhoneNumber(),
                    userLoginDTO.getPassword(),
                    userLoginDTO.getRoleId());
            //Trả về token trong response
            LoginResponse loginResponse = LoginResponse
                    .builder()
                    .message("Login Successfully")
                    .token(token)
                    .build();
            return ResponseEntity.ok(loginResponse);
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/details")
    public ResponseEntity<UserResponse> getUserDetails(@RequestHeader("Authorization") String authorizationHeader){
        try {
            String extractedtoken = authorizationHeader.substring(7); //Loại bỏ "Bearer " từ chuỗi token
            User user = userService.getUserDetailsFromToken(extractedtoken);
            return ResponseEntity.ok(UserResponse.fromUser(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/details/{userId}")
    public ResponseEntity<UserResponse> updateUserDetails(@PathVariable Long userId, @RequestBody UpdateUserDTO updateUserDTO, @RequestHeader("Authorization") String authorizationHeader){
        try {
            String extractedtoken = authorizationHeader.substring(7); //Loại bỏ "Bearer " từ chuỗi token
            User user = userService.getUserDetailsFromToken(extractedtoken);
            if(!user.getId().equals(userId)){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            User updateUser = userService.updateUserDetails(userId, updateUserDTO);
            return ResponseEntity.ok(UserResponse.fromUser(updateUser));
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
