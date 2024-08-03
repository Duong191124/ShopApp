package com.example.demo.services;

import com.example.demo.dto.OrderDetailDTO;
import com.example.demo.exceptions.DataNotFoundException;
import com.example.demo.models.Order;
import com.example.demo.models.OrderDetail;
import com.example.demo.models.Product;
import com.example.demo.repositories.OrderDetailRepository;
import com.example.demo.repositories.OrderRepository;
import com.example.demo.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class OrderDetailService implements IOrderDetailService{

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public OrderDetail createOrderDetail(OrderDetailDTO orderDTO) throws DataNotFoundException {
        //Tìm xem orderId có tồn tại không
        Order order = orderRepository.findById(orderDTO.getOrderId())
                .orElseThrow(() -> new DataNotFoundException("error"));
        //Tìm product theo id
        Product product = productRepository.findById(orderDTO.getProductId())
                .orElseThrow(() -> new DataNotFoundException("error"));
        OrderDetail orderDetail = OrderDetail.builder()
                .order(order)
                .color(orderDTO.getColor())
                .product(product)
                .numberOfProducts(orderDTO.getNumberOfProducts())
                .totalMoney(order.getTotalMoney())
                .price(orderDTO.getPrice())
                .build();
        //Lưu vào db
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public OrderDetail getOrderDetailById(Long id) throws DataNotFoundException {
        return orderDetailRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("error"));
    }

    @Override
    public List<OrderDetail> findByOrderId(Long orderId) {
        return orderDetailRepository.findByOrderId(orderId);
    }

    @Override
    @Transactional
    public OrderDetail updateOrderDetail(OrderDetailDTO orderDetailDTO, Long id) throws DataNotFoundException {
        //Xem orderdetail có tồn tại hay không
        OrderDetail existingOrderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("error"));
        Order existingOrder = orderRepository.findById(orderDetailDTO.getOrderId())
                .orElseThrow(() -> new DataNotFoundException("error"));
        Product existingProduct = productRepository.findById(orderDetailDTO.getProductId())
                .orElseThrow(() -> new DataNotFoundException("error"));
        existingOrderDetail.setOrder(existingOrder);
        existingOrderDetail.setColor(orderDetailDTO.getColor());
        existingOrderDetail.setPrice(orderDetailDTO.getPrice());
        existingOrderDetail.setProduct(existingProduct);
        existingOrderDetail.setTotalMoney(orderDetailDTO.getTotalMoney());
        existingOrderDetail.setNumberOfProducts(orderDetailDTO.getNumberOfProducts());
        return orderDetailRepository.save(existingOrderDetail);
    }

    @Override
    @Transactional
    public void deleteOrderDetail(Long id) {
        orderDetailRepository.deleteById(id);
    }
}
