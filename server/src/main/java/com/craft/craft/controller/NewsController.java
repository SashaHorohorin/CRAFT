package com.craft.craft.controller;

import com.craft.craft.dto.info.CreateNewsDto;
import com.craft.craft.dto.info.NewsResponseDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.service.info.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    @GetMapping
    public List<NewsResponseDto> getAll(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "3") Integer size,
            @RequestParam(value = "sort", defaultValue = "created") String sortField){
        return newsService.findAll(PageRequest.of(page,size, Sort.by(Sort.Direction.DESC, sortField)))
                .stream().map(NewsResponseDto::getDtoFromNews).collect(Collectors.toList());
    }

    @PostMapping("/create")
    public NewsResponseDto createNews(CreateNewsDto newsDto){
        return NewsResponseDto.getDtoFromNews(newsService.create(newsDto));
    }

    @PostMapping("/update/{id}")
    public NewsResponseDto updateNews(@PathVariable UUID id, CreateNewsDto newsDto) throws ModelNotFoundException {
        return NewsResponseDto.getDtoFromNews(newsService.update(id, newsDto));
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteNews(@PathVariable UUID id){
        return newsService.delete(id);
    }

}
