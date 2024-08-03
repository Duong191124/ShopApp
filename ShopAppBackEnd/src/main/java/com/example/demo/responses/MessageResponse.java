package com.example.demo.responses;

import com.example.demo.models.Order;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MessageResponse {
    @JsonProperty("message")
    private String message;

}
