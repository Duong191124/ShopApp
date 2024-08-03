package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class OrderDetailDTO {

    @JsonProperty("order_id")
    @Min(value = 1, message = "OrderID > 0")
    private Long orderId;

    @JsonProperty("product_id")
    @Min(value = 1, message = "ProductId > 0")
    private Long productId;

    @Min(value = 0, message = "Price > 0")
    private Float price;

    @JsonProperty("number_of_products")
    private int numberOfProducts;

    @JsonProperty("total_money")
    @Min(value = 0, message = "TotalMoney > 0")
    private Float totalMoney;

    private String color;
}
