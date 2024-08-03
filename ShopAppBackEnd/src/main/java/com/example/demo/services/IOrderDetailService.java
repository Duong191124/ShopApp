package com.example.demo.services;


import com.example.demo.dto.OrderDetailDTO;
import com.example.demo.exceptions.DataNotFoundException;
import com.example.demo.models.OrderDetail;

import java.util.List;

public interface IOrderDetailService {
    OrderDetail createOrderDetail (OrderDetailDTO orderDTO) throws DataNotFoundException;

    OrderDetail getOrderDetailById (Long id) throws DataNotFoundException;

    List<OrderDetail> findByOrderId (Long orderId);

    OrderDetail updateOrderDetail (OrderDetailDTO orderDTO, Long id) throws DataNotFoundException;

    void deleteOrderDetail (Long id);
}
