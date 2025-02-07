package com.programming.orderservice.model;

import java.math.BigDecimal;
import java.util.List;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @EmbeddedId
    private ProductId productId;

    private String name;
    private String image;
    private int quantity;
    private String description;
    private BigDecimal price;

    @ManyToMany(mappedBy = "productsList", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Order> orders;
}
