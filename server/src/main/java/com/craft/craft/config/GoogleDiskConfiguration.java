package com.craft.craft.config;

import com.craft.craft.dto.auth.GoogleRefreshDto;
import com.craft.craft.model.user.BaseUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.auth.oauth2.TokenResponseException;
import com.google.api.client.googleapis.auth.oauth2.*;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/google")
public class GoogleDiskConfiguration {
    private static HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    private static JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    private static final List<String> SCOPES = Collections.singletonList(DriveScopes.DRIVE);

    private static final String USER_IDENTIFIER_KEY = "MY_DUMMY_USER";
    private RestTemplate restTemplate = new RestTemplate();

    @Value("${google.oauth.callback.uri}")
    private String CALLBACK_URI;

    @Value("${google.secret.key.path}")
    private Resource gdSecretKeys;

    private static final String TOKENS_DIRECTORY_PATH = "tokens";

    @Value("${folder.files.upload.id}")
    private String parentId;

    private GoogleAuthorizationCodeFlow flow;

    @Value("${google.update.access.url}")
    private String googleUpdateAccessUrl;
    @Value("${google.client.id}")
    private String googleClientId;
    @Value("${google.client.secret}")
    private String googleClientSecret;
    private String refreshToken;


    @PostConstruct
    public void init() throws Exception {
        GoogleClientSecrets secrets = GoogleClientSecrets.load(JSON_FACTORY,
                new InputStreamReader(gdSecretKeys.getInputStream()));
        flow = new GoogleAuthorizationCodeFlow.Builder(HTTP_TRANSPORT, JSON_FACTORY, secrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .build();
    }

    @Bean
    public Drive getDrive() throws IOException {
        Credential cred = flow.loadCredential(USER_IDENTIFIER_KEY);

        return new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, cred)
                .setApplicationName("craft test").build();
    }

    // https://craft-bc-backend.online/google/googlesignin
    @GetMapping(value = {"/googlesignin"})
    public void doGoogleSignIn(HttpServletResponse response) throws Exception {
        GoogleAuthorizationCodeRequestUrl url = flow.newAuthorizationUrl();
        String redirectURL = url.setRedirectUri(CALLBACK_URI).setAccessType("offline").setApprovalPrompt("force").build();
        response.sendRedirect(redirectURL);
    }

    @GetMapping(value = {"/oauth-google"})
    public String saveAuthorizationCode(HttpServletRequest request) throws Exception {
        String code = request.getParameter("code");
        if (code != null) {
            saveToken(code);
            return "token saved";
        }
        return "token dont saved";
    }

    private void saveToken(String code) throws Exception {
        GoogleTokenResponse response = flow.newTokenRequest(code).setRedirectUri(CALLBACK_URI).execute();
        refreshToken = flow.createAndStoreCredential(response, USER_IDENTIFIER_KEY).getRefreshToken();
        //System.out.println(flow.loadCredential(USER_IDENTIFIER_KEY));
    }

    @PostMapping("/upload")
    public String saveFile(@RequestParam("file") MultipartFile fileR) throws IOException {

        Credential cred = refreshAccessToken(refreshToken, googleClientId, googleClientSecret);
        System.out.println("cred refresh: " + cred.getRefreshToken());
        Drive drive = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, cred)
                .setApplicationName("craft test").build();

        if (fileR != null && !fileR.getOriginalFilename().isEmpty()) {
            String path = System.getProperty("user.dir");

            File uploadDir = new File(path + "/upload-files");
            if (!uploadDir.exists()) {
                boolean cf = uploadDir.mkdirs();
            }
            String uuidFile = UUID.randomUUID().toString();
            String resultFilename = uuidFile + '.' + fileR.getOriginalFilename();
            File fileOnServer = new File(uploadDir + "/" + resultFilename);
            fileR.transferTo(fileOnServer);
            com.google.api.services.drive.model.File fileMetadata = new com.google.api.services.drive.model.File();
            UUID randomName = UUID.randomUUID();
            fileMetadata.setName(randomName + ".jpg");
            fileMetadata.setParents(Collections.singletonList(parentId));
            FileContent mediaContent = new FileContent("image/jpeg", fileOnServer);
            try {
                com.google.api.services.drive.model.File f = drive.files().create(fileMetadata, mediaContent)
                        .setFields("id, parents")
                        .execute();
                return "https://drive.google.com/uc?export=view&id=" + f.getId();
            } catch (GoogleJsonResponseException e) {
                System.err.println("Unable to upload file: " + e.getDetails());
                throw e;
            }
        }
        return "error";
    }

    public Credential refreshAccessToken(String refreshToken, String clientId, String clientSecret) throws IOException {
        try {
            TokenResponse response =
                    new GoogleRefreshTokenRequest(new NetHttpTransport(), JSON_FACTORY,
                            refreshToken, clientId, clientSecret).execute();
            System.out.println("Access token: " + response.getAccessToken());

            return flow.createAndStoreCredential(response, USER_IDENTIFIER_KEY);
        } catch (TokenResponseException e) {
            if (e.getDetails() != null) {
                System.err.println("Error: " + e.getDetails().getError());
                if (e.getDetails().getErrorDescription() != null) {
                    System.err.println(e.getDetails().getErrorDescription());
                }
                if (e.getDetails().getErrorUri() != null) {
                    System.err.println(e.getDetails().getErrorUri());
                }
            } else {
                System.err.println(e.getMessage());
            }
        }
        return null;
    }
}
