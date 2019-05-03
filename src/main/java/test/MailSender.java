package test;

import java.text.MessageFormat;

import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.MimeMessage;

import utilities.PropertiesReader;

public class MailSender extends Thread {
    PropertiesReader props = PropertiesReader.getInstance();
    private String method;
    private String name;
    private String emailTarget;

    public MailSender(String emailTarget, String name, String method) {
        this.emailTarget = emailTarget;
        this.name = name;
        this.method = method;

        run();
    }

    @SuppressWarnings("Duplicates")
    public void run() {
        switch(method) {
            case "friendRequest":
                this.sendFriendRequest(emailTarget, name);
                break;

            case "tag":
                this.tag(emailTarget, name);
                break;

            default:
                break;
        }
    }

    @SuppressWarnings("Duplicates")
    private void tag(String email, String name) {
        Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.setProperty("mail.smtp.starttls.enable", "true");
        properties.setProperty("mail.smtp.port", "587");
        properties.setProperty("mail.smtp.user", props.getValue("emailUser"));
        properties.setProperty("mail.smtp.auth", "true");
        Session session = Session.getDefaultInstance(properties);
        String bodyText = MessageFormat.format(props.getValue("friendRequestMailHTML"), name);

        try {
            MimeMessage msg = new MimeMessage(session);
            msg.setFrom(props.getValue("emailUser"));
            msg.setRecipients(Message.RecipientType.TO,
                    email);
            msg.setSubject("You were tagged on a post");
            msg.setSentDate(new Date());
            msg.setText(bodyText);
            Transport.send(msg, props.getValue("emailUser"), props.getValue("emailPassword"));

        } catch(MessagingException e) {
            e.printStackTrace();
        }
    }

    @SuppressWarnings("Duplicates")
    private void sendFriendRequest(String email, String name) {
        Properties properties = System.getProperties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.setProperty("mail.smtp.starttls.enable", "true");
        properties.setProperty("mail.smtp.port", "587");
        properties.setProperty("mail.smtp.user", props.getValue("emailUser"));
        properties.setProperty("mail.smtp.auth", "true");
        Session session = Session.getDefaultInstance(properties);
        String bodyText = MessageFormat.format(props.getValue("tagMailHTML"), name);

        try {
            MimeMessage msg = new MimeMessage(session);
            msg.setFrom(props.getValue("emailUser"));
            msg.setRecipients(Message.RecipientType.TO,
                    email);
            msg.setSubject("You have a Friend Request on Pandagram");
            msg.setSentDate(new Date());
            msg.setText(bodyText);
            Transport.send(msg, props.getValue("emailUser"), props.getValue("emailPassword"));

        } catch(MessagingException e) {
            e.printStackTrace();
        }
    }
}
