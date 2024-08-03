package com.example.demo.services;


import com.example.demo.dto.OrderDTO;
import com.example.demo.exceptions.DataNotFoundException;
import com.example.demo.models.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderService {

    Order createOrder (OrderDTO orderDTO) throws DataNotFoundException;

    Order getOrderById (Long id);

    List<Order> findByUserId(Long userId);

    Order updateOrder(OrderDTO orderDTO, Long id) throws DataNotFoundException;

    void deleteOrder (Long id);

    Page<Order> getOrdersByKeyword(String keyword, Pageable pageable);

}
