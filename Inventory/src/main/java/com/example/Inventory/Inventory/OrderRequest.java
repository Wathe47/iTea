package com.example.Inventory.Inventory;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    @Id
    @SequenceGenerator(
            name = "order_request_sequence",
            sequenceName = "order_request_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "order_request_sequence"
    )
    private Long id;

    private long quantity;
    private long oldQuantity;
    private long productId;

}
