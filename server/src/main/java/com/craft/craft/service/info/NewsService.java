package com.craft.craft.service.info;

import com.craft.craft.dto.info.CreateNewsDto;
import com.craft.craft.dto.info.NewsResponseDto;
import com.craft.craft.error.exeption.ModelNotFoundException;
import com.craft.craft.model.info.News;
import com.craft.craft.model.info.NewsType;
import com.craft.craft.repository.info.NewsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsRepo newsRepo;

    public News create(CreateNewsDto newsDto){
        News news = new News();
        return fillNews(newsDto, news);
    }

    public Page<News> findAll(Pageable pageable){
        return newsRepo.findAll(pageable);
    }

    public News update(UUID id, CreateNewsDto newsDto) throws ModelNotFoundException {
        News news = newsRepo.findById(id).orElseThrow(()-> new ModelNotFoundException("По данному id новость не найдена"));
        return fillNews(newsDto, news);
    }

    public boolean delete(UUID id){
        newsRepo.deleteById(id);
        return true;
    }

    private News fillNews(CreateNewsDto newsDto, News news) {
        news.setType(newsDto.getType());
        news.setTitle(newsDto.getTitle());
        news.setText(newsDto.getText());
        news.setPhotoUrl(newsDto.getPhotoUrl());
        if(!news.getType().equals(NewsType.BASE_NEWS)){
            news.setTextUnderTitle(newsDto.getTextUnderTitle());
            news.setEventDate(newsDto.getEventDate());
            news.setTextUnderDate(newsDto.getTextUnderDate());
        }
        return newsRepo.save(news);
    }
}
