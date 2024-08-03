package com.example.demo.responses;

import com.example.demo.models.Order;
import com.example.demo.models.OrderDetail;
import com.example.demo.models.Product;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Builder
public class OrderDetailResponse {
    private Long id;

    @JsonProperty("order_id")
    private Long orderId;

    @JsonProperty("product_id")
    private Long productId;

    @JsonProperty("price")
    private Float price;

    @JsonProperty("number_of_products")
    private int numberOfProducts;

    @JsonProperty("total_money")
    private Float totalMoney;

    @JsonProperty("color")
    private String color;

    public static OrderDetailResponse fromOrderDetailResponse(OrderDetail orderDetail){
        return OrderDetailResponse
                .builder()
                .id(orderDetail.getId())
                .totalMoney(orderDetail.getTotalMoney())
                .color(orderDetail.getColor())
                .orderId(orderDetail.getOrder().getId())
                .numberOfProducts(orderDetail.getNumberOfProducts())
                .productId(orderDetail.getProduct().getId())
                .price(orderDetail.getPrice())
                .build();
    }

}
