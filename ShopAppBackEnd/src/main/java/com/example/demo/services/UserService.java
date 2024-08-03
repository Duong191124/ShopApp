package com.example.demo.services;

import com.example.demo.components.JwtTokenUtil;
import com.example.demo.dto.UpdateUserDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.exceptions.DataNotFoundException;
import com.example.demo.exceptions.PermissionDenyExpection;
import com.example.demo.models.Role;
import com.example.demo.models.User;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@RequiredArgsConstructor
@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenUtil jwtTokenUtil;

    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public User createUser(UserDTO userDTO) throws Exception {
        String phoneNumber = userDTO.getPhoneNumber();
        //Kiểm tra xem số điện thoại đã tồn tại hay chưa
        if(userRepository.existsByPhoneNumber(phoneNumber)){
            throw new DataIntegrityViolationException("Phone number already exists");
        }
        Role role = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new DataNotFoundException("RoleId not found"));
        if(role.getName().equals(Role.ADMIN)){
            throw new PermissionDenyExpection("You can't register an admin account");
        }
        //Chuyển đổi từ UserDTO => User
        User newUser = User.builder()
                .fullName(userDTO.getFullName())
                .phoneNumber(userDTO.getPhoneNumber())
                .password(userDTO.getPassword())
                .address(userDTO.getAddress())
                .dateOfBirth(userDTO.getDateOfBirth())
                .facebookAccountId(userDTO.getFacebookAccountId())
                .googleAccountId(userDTO.getGoogleAccountId())
                .build();
        //Kiểm tra nếu có accountId, không yêu cầu password
        if(userDTO.getFacebookAccountId() == 0 && userDTO.getGoogleAccountId() == 0){
            String password = userDTO.getPassword();
            //mã hóa password
            String encodedPassword = passwordEncoder.encode(password);
            //Trong phần sercurity
            newUser.setPassword(encodedPassword);
        }
        newUser.setActive(true);
        return userRepository.save(newUser);
    }

    @Override
    public String login(String phoneNumber, String password, Long roleId) throws DataNotFoundException {
        Optional<User> optionalUser = userRepository.findByPhoneNumber(phoneNumber);
        if(optionalUser.isEmpty()){
            throw new DataNotFoundException("can't find phone number");
        }
        User existingUser = optionalUser.get();
        //Kiểm tra password
        if(existingUser.getFacebookAccountId() == 0 && existingUser.getGoogleAccountId() == 0){
            if(!passwordEncoder.matches(password, existingUser.getPassword())){
                throw new BadCredentialsException("Wrong phone number or password");
            }
        }
        Optional<Role> optionalRole = roleRepository.findById(roleId);
        if(optionalRole.isEmpty() || !roleId.equals(existingUser.getRoleId().getId())){
            throw new DataNotFoundException("Role does not exists");
        }
        UsernamePasswordAuthenticationToken authenticationToken
                = new UsernamePasswordAuthenticationToken(
                        phoneNumber, password, existingUser.getAuthorities()
        );
        //Xác thực trong Java Spring Security
        authenticationManager.authenticate(authenticationToken);
        //Trả về JWT
        return jwtTokenUtil.generateToken(existingUser);
    }

    @Override
    public User getUserDetailsFromToken(String token) throws Exception {
        if(jwtTokenUtil.isTokenExpired(token)){
            throw new Exception("Token is expired");
        }
        String phoneNumber = jwtTokenUtil.extractPhoneNumber(token);
        Optional<User> user = userRepository.findByPhoneNumber(phoneNumber);

        if(user.isPresent()){
            return user.get();
        }else{
            throw new Exception("Can't find user");
        }
    }

    @Override
    @Transactional
    public User updateUserDetails(Long userId, UpdateUserDTO updateUserDTO) throws Exception {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("Data not found"));
        String newPhoneNumber = updateUserDTO.getPhoneNumber();
        if(!existingUser.getPhoneNumber().equals(newPhoneNumber) &&
                userRepository.existsByPhoneNumber(newPhoneNumber)){
            throw new DataIntegrityViolationException("Phone number already exists");
        }
        if(updateUserDTO.getFullName() != null){
            existingUser.setFullName(updateUserDTO.getFullName());
        }
        if(newPhoneNumber != null){
            existingUser.setPhoneNumber(newPhoneNumber);
        }
        if(updateUserDTO.getAddress() != null){
            existingUser.setAddress(updateUserDTO.getAddress());
        }
        if(updateUserDTO.getDateOfBirth() != null){
            existingUser.setDateOfBirth(updateUserDTO.getDateOfBirth());
        }
        if(updateUserDTO.getFacebookAccountId() > 0){
            existingUser.setFacebookAccountId(updateUserDTO.getFacebookAccountId());
        }
        if(updateUserDTO.getGoogleAccountId() > 0){
            existingUser.setGoogleAccountId(updateUserDTO.getGoogleAccountId());
        }
        if(updateUserDTO.getPassword() != null && !updateUserDTO.getPassword().isEmpty()){
            String newPassword = updateUserDTO.getPassword();
            String encodedPassword = passwordEncoder.encode(newPassword);
            existingUser.setPassword(encodedPassword);
        }
        return userRepository.save(existingUser);
    }
}
