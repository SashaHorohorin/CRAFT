package com.craft.craft.dto.info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PageNewsResponseDto {
    private List<NewsResponseDto> news;
    private int totalPages;
}
