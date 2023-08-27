package com.craft.craft.service.api;


import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.FileContent;
import com.google.api.services.drive.Drive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.UUID;

@Service
public class FileGoogleDiskService implements FileService {

    @Autowired
    private Drive service;

    @Value("${folder.files.upload.id}")
    private String parentId;

    @Override
    public String saveFile(File file) throws IOException {
        //com.google.api.services.drive.model.File result = service.files().get("1K4b-Rlq-nWk2mEf0yLDzB5UO_0ArzrSg").execute();
       // System.out.printf("%s (%s)\n", result.getName(), result.getId());

        com.google.api.services.drive.model.File fileMetadata = new com.google.api.services.drive.model.File();
        UUID randomName = UUID.randomUUID();
        fileMetadata.setName(randomName + ".jpg");
        fileMetadata.setParents(Collections.singletonList(parentId));
        //fileMetadata.setParents(Collections.singletonList("1K4b-Rlq-nWk2mEf0yLDzB5UO_0ArzrSg"));

        //java.io.File filePath = new java.io.File("upload-dir/photo.jpg");
        FileContent mediaContent = new FileContent("image/jpeg", file);
        try {
            com.google.api.services.drive.model.File f = service.files().create(fileMetadata, mediaContent)
                    .setFields("id, parents")
                    .execute();
            return "https://drive.google.com/uc?export=view&id=" + f.getId();
        } catch (GoogleJsonResponseException e) {
            System.err.println("Unable to upload file: " + e.getDetails());
            throw e;
        }
    }
}
