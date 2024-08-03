package com.example.demo.responses;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Builder
public class OrderListResponse {
    private List<OrderResponse> orders;

    private int totalPages;
}
