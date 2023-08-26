package com.craft.craft.service.api;

import com.google.api.client.googleapis.json.GoogleJsonResponseException;

import java.io.File;
import java.io.IOException;

public interface FileService {
    public String saveFile(File file) throws GoogleJsonResponseException, IOException;
}
