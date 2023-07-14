package com.craft.craft.repository.info;

import com.craft.craft.model.info.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface NewsRepo extends CrudRepository<News, UUID> {
    Page<News> findAll(Pageable pageable);
}
