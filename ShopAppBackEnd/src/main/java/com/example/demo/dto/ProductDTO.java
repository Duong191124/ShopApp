package com.example.demo.dto;

import com.example.demo.models.ProductImage;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Data
@Builder
public class ProductDTO {

    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 10000, message = "aa")
    private String name;

    @Min(value = 0, message = "Không nhỏ hơn 0")
    @Max(value = 10000000, message = "Nhỏ hơn 10,000,000")
    private float price;

    private String thumbnail;

    private String description;

    @JsonProperty("category_id")
    private Long categoryId;

    private List<ProductImage> productImages;
}
