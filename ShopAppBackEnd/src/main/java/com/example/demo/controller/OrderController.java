package com.example.demo.controller;

import com.example.demo.dto.OrderDTO;
import com.example.demo.exceptions.DataNotFoundException;
import com.example.demo.models.Order;
import com.example.demo.responses.OrderListResponse;
import com.example.demo.responses.OrderResponse;
import com.example.demo.services.IOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/orders")
@RequiredArgsConstructor
public class OrderController {

    private final IOrderService iOrderService;

    @PostMapping("")
    public ResponseEntity<?> createOrder(
            @RequestBody @Valid OrderDTO orderDTO,
            BindingResult result){
        try{
            if(result.hasErrors()){
                List<String> errorMessage = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessage);
            }
            Order order = iOrderService.createOrder(orderDTO);
            return ResponseEntity.ok(order);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity<?> getOrders(@Valid @PathVariable("user_id") Long userId){
        try {
            List<Order> orders = iOrderService.findByUserId(userId);
            return ResponseEntity.ok(orders);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(@Valid @PathVariable("id") Long orderId){
        try {
            Order existingOrder = iOrderService.getOrderById(orderId);
            return ResponseEntity.ok(OrderResponse.fromOrder(existingOrder));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(@Valid @PathVariable Long id,
                                         @Valid @RequestBody OrderDTO orderDTO) throws DataNotFoundException {
        Order existingOrder = iOrderService.updateOrder(orderDTO, id);
        return ResponseEntity.ok(existingOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@Valid @PathVariable Long id){
        //Cập nhật trường active = false
        iOrderService.deleteOrder(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/get-orders-by-keyword")
    public ResponseEntity<OrderListResponse> getOrdersByKeyword(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int limit){
        int pageIndex = page - 1;
        PageRequest pageRequest = PageRequest.of(pageIndex, limit, Sort.by("id").ascending());
        Page<OrderResponse> ordersPage = iOrderService
                .getOrdersByKeyword(keyword, pageRequest)
                .map(OrderResponse::fromOrder);
        int totalPages = ordersPage.getTotalPages();
        List<OrderResponse> orderResponses = ordersPage.getContent();
        return ResponseEntity.ok(OrderListResponse.builder()
                .orders(orderResponses)
                .totalPages(totalPages)
                .build());
    }
}
