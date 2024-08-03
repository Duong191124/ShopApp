package com.example.demo.responses;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Builder
public class ProductListResponse {
    private List<ProductResponse> productResponseList;

    private int totalPages;
}
