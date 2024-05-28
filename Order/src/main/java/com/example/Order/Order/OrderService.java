package com.example.Order.Order;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }



    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public List<Order> getOrdersByCustomerEmail(String customerEmail) {
        return orderRepository.findByCustomerEmail(customerEmail);
    }

    public List<Order> getOrdersByManufacturerEmail(String email) {
        return orderRepository.findByManufacturerEmail(email);
    }



    public void addNewOrder(Order order) {
        orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        boolean exists = orderRepository.existsById(id);
        if(!exists) {
            throw new IllegalStateException("Order with id: " + id + " does not exist");
        }
        orderRepository.deleteById(id);
    }

    @Transactional
    public void updateOrder(Long orderId, Order order) {
        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalStateException("Inventory with id: " + orderId + " does not exist"));


        if (order.getQuantity() != 0) {

            if (order.getQuantity() > 0 && !Objects.equals(existingOrder.getQuantity(), order.getQuantity())) {
                long newTotalPrice = order.getQuantity() * existingOrder.getUnitPrice();

                existingOrder.setTotalPrice(newTotalPrice);
                existingOrder.setQuantity(order.getQuantity());
            }
        }

    }
}

