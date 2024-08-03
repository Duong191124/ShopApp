package com.example.demo.services;

import com.example.demo.models.Role;
import com.example.demo.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {

    private final RoleRepository roleRepository;

    @Override
    public List<Role> getRole() {
        return roleRepository.findAll();
    }
}
