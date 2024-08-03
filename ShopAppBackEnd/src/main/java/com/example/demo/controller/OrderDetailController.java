package com.example.demo.controller;

import com.example.demo.dto.OrderDetailDTO;
import com.example.demo.exceptions.DataNotFoundException;
import com.example.demo.models.OrderDetail;
import com.example.demo.responses.OrderDetailResponse;
import com.example.demo.services.IOrderDetailService;
import com.example.demo.services.OrderDetailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/order_details")
@RequiredArgsConstructor
public class OrderDetailController {

    private final IOrderDetailService orderDetailService;

    @PostMapping("")
    public ResponseEntity<?> createOrderDetail(
            @Valid @RequestBody OrderDetailDTO orderDetailDTO
    ) throws DataNotFoundException {
        OrderDetail newOrderDetail = orderDetailService.createOrderDetail(orderDetailDTO);
        return ResponseEntity.ok(OrderDetailResponse.fromOrderDetailResponse(newOrderDetail));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderDetail(
            @Valid @PathVariable("id") Long id
    ) throws DataNotFoundException {
        OrderDetail orderDetail = orderDetailService.getOrderDetailById(id);
        return ResponseEntity.ok(OrderDetailResponse.fromOrderDetailResponse(orderDetail));
    }

    //Lấy ra order_details của một order nào đó
    @GetMapping("/order/{orderId}")
    public ResponseEntity<?> getOrderDetails(
            @Valid @PathVariable("orderId") Long orderId
    ){
        List<OrderDetail> orderDetails = orderDetailService.findByOrderId(orderId);
        List<OrderDetailResponse> orderDetailResponses = orderDetails
                .stream()
                .map(OrderDetailResponse::fromOrderDetailResponse).toList();
        return ResponseEntity.ok(orderDetailResponses);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrderDetails(
            @Valid @PathVariable("id") Long id,
            @RequestBody OrderDetailDTO orderDetailDTO
    ) throws DataNotFoundException {
        OrderDetail orderDetail = orderDetailService.updateOrderDetail(orderDetailDTO, id);
        return ResponseEntity.ok(orderDetail);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrderDetails(
            @Valid @PathVariable("id") Long id
    ){
        orderDetailService.deleteOrderDetail(id);
        return ResponseEntity.ok("delete successfully");
    }

}
