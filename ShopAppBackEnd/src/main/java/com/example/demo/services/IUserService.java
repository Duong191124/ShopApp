package com.example.demo.services;

import com.example.demo.dto.UpdateUserDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.exceptions.DataNotFoundException;
import com.example.demo.models.User;


public interface IUserService {

    User createUser(UserDTO userDTO) throws Exception;

    String login(String phoneNumber, String password, Long roleId) throws DataNotFoundException;

    User getUserDetailsFromToken(String token) throws Exception;

    User updateUserDetails(Long userId, UpdateUserDTO updateUserDTO) throws Exception;

}
