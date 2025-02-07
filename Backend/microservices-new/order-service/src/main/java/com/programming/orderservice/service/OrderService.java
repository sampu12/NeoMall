package com.programming.orderservice.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.programming.orderservice.dto.OrderRequest;
import com.programming.orderservice.dto.OrderResponse;
import com.programming.orderservice.dto.ProductDto;
import com.programming.orderservice.dto.ProductIdDto;
import com.programming.orderservice.model.Order;
import com.programming.orderservice.model.Product;
import com.programming.orderservice.model.ProductId;
import com.programming.orderservice.repository.OrderRepository;
import com.programming.orderservice.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository; 
    
    public void placeOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setUserId(orderRequest.getUserId());
        order.setOrderNumber(UUID.randomUUID().toString());

        List<Product> productList = orderRequest.getProductsList()
                .stream()
                .map(this::findOrCreateProduct)
                .toList();

        order.setProductsList(productList);
        orderRepository.save(order);
    }

    private Product findOrCreateProduct(ProductDto productDto) {
        ProductId productId = new ProductId(productDto.getProductId().getProductId(), 
                                            productDto.getProductId().getCategoryId());

        return productRepository.findById(productId).orElseGet(() -> mapToEntity(productDto));
    }

    private Product mapToEntity(ProductDto productDto) {
        Product product = new Product();
        ProductId productId = new ProductId(productDto.getProductId().getProductId(),
                                             productDto.getProductId().getCategoryId());
        product.setProductId(productId);
        product.setName(productDto.getName());
        product.setImage(productDto.getImage());
        product.setQuantity(productDto.getQuantity());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        return product;
    }

    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::mapToOrderResponse)
                .collect(Collectors.toList());
    }

    private OrderResponse mapToOrderResponse(Order order) {
        List<ProductDto> productDtoList = order.getProductsList()
                .stream()
                .map(this::mapToDto)
                .toList();

        return OrderResponse.builder()
                .userId(order.getUserId())
                .orderNumber(order.getOrderNumber())
                .productDtoList(productDtoList)
                .build();
    }

    private ProductDto mapToDto(Product product) {
        ProductId productId = product.getProductId();
        ProductIdDto productIdDto = new ProductIdDto(productId.getProductId(), productId.getCategoryId());

        return new ProductDto(
                productIdDto,
                product.getName(),
                product.getImage(),
                product.getQuantity(),
                product.getDescription(),
                product.getPrice()
        );
    }

    public List<ProductDto> getAllProductsByUserId(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .flatMap(order -> order.getProductsList().stream())
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
    public List<OrderResponse> searchOrders(String query) {
        List<Order> orders = orderRepository.findByOrderNumberContaining(query);

        return orders.stream()
                .map(this::mapToOrderResponse)  // Using the existing mapping function
                .distinct()  // Remove duplicates
                .collect(Collectors.toList());
    }
}
