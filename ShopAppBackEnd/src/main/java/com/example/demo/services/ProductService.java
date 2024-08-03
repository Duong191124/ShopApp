package com.example.demo.services;

import com.example.demo.dto.ProductDTO;
import com.example.demo.dto.ProductImageDTO;
import com.example.demo.exceptions.DataNotFoundException;
import com.example.demo.exceptions.InvalidParamExpection;
import com.example.demo.models.Category;
import com.example.demo.models.Product;
import com.example.demo.models.ProductImage;
import com.example.demo.repositories.CategoryRepository;
import com.example.demo.repositories.ProductImageRepository;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.responses.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService{

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final ProductImageRepository productImageRepository;

    @Override
    @Transactional
    public Product createProduct(ProductDTO productDTO) throws DataNotFoundException {
        Category existingCategory = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new DataNotFoundException("Can't find by id"));
        Product newProducts = Product.builder()
                .name(productDTO.getName())
                .price(productDTO.getPrice())
                .description(productDTO.getDescription())
                .thumbnail(productDTO.getThumbnail())
                .categoryId(existingCategory)
                .build();
        return productRepository.save(newProducts);
    }

    @Override
    public Product getProductById(Long id) throws DataNotFoundException {
        return productRepository.findById(id)
                .orElseThrow(() ->
                        new DataNotFoundException("Can't find product with id"));
    }

    @Override
    public Page<ProductResponse> getAllProducts(PageRequest pageRequest, String keyword, Long categoryId) {
        //Lấy danh sách theo sản phẩm theo trang(page) và giới hạn sản phẩm mỗi trang(limit)
        Page<Product> productPage;
        productPage = productRepository.searchProducts(categoryId, keyword, pageRequest);
        return productPage.map(ProductResponse::fromProduct);
    }

    @Override
    @Transactional
    public Product updateProduct(ProductDTO productDTO, Long id) throws DataNotFoundException {
        Product existingProduct = getProductById(id);
        if(existingProduct != null){
            //Copy các thuộc tính từ DTO -> Product
            //Có thể sử dụng ModelMapper
            Category existingCategory = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() ->
                            new DataNotFoundException("Can't find by id"));
            existingProduct.setName(productDTO.getName());
            existingProduct.setCategoryId(existingCategory);
            existingProduct.setDescription(productDTO.getDescription());
            existingProduct.setPrice(productDTO.getPrice());
            existingProduct.setThumbnail(productDTO.getThumbnail());
            return productRepository.save(existingProduct);
        }
        return null;
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        optionalProduct.ifPresent(productRepository::delete);
    }

    @Override
    public boolean existsByName(String name) {
        return productRepository.existsByName(name);
    }

    @Override
    @Transactional
    public ProductImage createProductImages(Long productId
            ,ProductImageDTO productImageDTO) throws DataNotFoundException, InvalidParamExpection {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() ->
                        new DataNotFoundException("Can't find product with id"));
        ProductImage newProductImage = ProductImage.builder()
                .product(existingProduct)
                .imageUrl(productImageDTO.getImageUrl())
                .build();
        //Không cho thêm quá 5 ảnh vào 1 sản phẩm
        int size = productImageRepository.findByProductId(productId).size();
        if(size >= 5){
            throw new InvalidParamExpection("Number of images less than 5");
        }
        return productImageRepository.save(newProductImage);
    }

    @Override
    public List<Product> findProductsByIds(List<Long> productIds){
        return productRepository.findProductsByIds(productIds);
    }

}
