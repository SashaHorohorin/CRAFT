package com.craft.craft.service.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class MailSender {

    @Value("${spring.mail.username}")
    private String username;
    @Autowired
    private JavaMailSender sender;

    @Async
    public void send(String emailTo, String subject, String message){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(username);
        mailMessage.setTo(emailTo);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        sender.send(mailMessage);
    }

    @Async
    public void sendMime(String emailTo, String subject, String message) throws MessagingException {
        MimeMessage mimeMessage = sender.createMimeMessage();
        mimeMessage.setContent(message, "text/html; charset=utf-8");
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setTo(emailTo);
        helper.setFrom(username);
        helper.setSubject(subject);
        sender.send(mimeMessage);
    }

}