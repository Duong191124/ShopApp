package com.example.demo.services;

import com.example.demo.dto.ProductDTO;
import com.example.demo.dto.ProductImageDTO;
import com.example.demo.exceptions.DataNotFoundException;
import com.example.demo.exceptions.InvalidParamExpection;
import com.example.demo.models.Product;
import com.example.demo.models.ProductImage;
import com.example.demo.responses.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

public interface IProductService {

    Product createProduct(ProductDTO productDTO) throws Exception;

    Product getProductById(Long id) throws DataNotFoundException;

    Page<ProductResponse> getAllProducts(PageRequest pageRequest, String keyword, Long categoryId);

    Product updateProduct(ProductDTO productDTO, Long id) throws DataNotFoundException;

    void deleteProduct(Long id);

    boolean existsByName(String name);

    ProductImage createProductImages(Long productId
            , ProductImageDTO productImageDTO)
            throws DataNotFoundException, InvalidParamExpection;

    List<Product> findProductsByIds(List<Long> productIds);

}
