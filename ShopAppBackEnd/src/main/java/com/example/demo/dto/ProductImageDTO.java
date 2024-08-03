package com.example.demo.dto;

import com.example.demo.models.Product;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductImageDTO {

    @JsonProperty("image_url")
    @Size(min = 5, max = 200, message = "> 5")
    private String imageUrl;

    @JsonProperty("product_id")
    @Min(value = 1, message = ">1")
    private Long productId;
}
