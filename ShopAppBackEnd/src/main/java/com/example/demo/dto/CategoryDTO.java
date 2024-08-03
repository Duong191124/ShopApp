package com.example.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Data
public class CategoryDTO {
    @NotEmpty(message = "Not can't be empty")
    private String name;
}
