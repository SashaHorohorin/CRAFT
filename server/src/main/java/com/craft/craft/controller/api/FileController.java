package com.craft.craft.controller.api;

import com.craft.craft.service.api.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/file")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {
        String id = null;
        if (file != null && !file.getOriginalFilename().isEmpty()) {
            String path = System.getProperty("user.dir");

            File uploadDir = new File(path + "/upload-files");
            if (!uploadDir.exists()) {
                boolean cf = uploadDir.mkdirs();
            }
            String uuidFile = UUID.randomUUID().toString();
            String resultFilename = uuidFile + '.' + file.getOriginalFilename();
            File fileOnServer = new File( uploadDir + "/" + resultFilename);
            file.transferTo(fileOnServer);
            id = fileService.saveFile(fileOnServer);
            fileOnServer.delete();
    }
        return id;
    }

}
