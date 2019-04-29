package utilities;

import java.text.MessageFormat;

import javax.servlet.http.HttpServletRequest;

import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.MimeMessage;

import utilities.PropertiesReader;

public class MailSender extends Thread {
    PropertiesReader props = PropertiesReader.getInstance();

    public MailSender(HttpServletRequest req, String emailTarget, String name, String method) {
        switch(method) {
            case "friendRequest":
                this.sendFriendRequest(req, emailTarget, name);
                break;

            case "tag":
                this.tag(req, emailTarget, name);
                break;

            default:
                break;
        }
    }

    private void init() {

    }

    private void tag(HttpServletRequest  req, String email, String name) {
        Properties properties = System.getProperties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.setProperty("mail.smtp.starttls.enable", "true");
        properties.setProperty("mail.smtp.port", "587");
        properties.setProperty("mail.smtp.user", "pandagram.subscribe@gmail.com");
        properties.setProperty("mail.smtp.auth", "true");
        Session session = Session.getDefaultInstance(properties);
        String host = "localhost:" + req.getServerPort();
        String bodyText = MessageFormat.format(props.getValue("friendRequestMailHTML"), name);

        try {
            MimeMessage msg = new MimeMessage(session);
            msg.setFrom(props.getValue("emailUser"));
            msg.setRecipients(Message.RecipientType.TO,
                    email);
            msg.setSubject("You were tagged on a post");
            msg.setSentDate(new Date());
            Transport.send(msg, props.getValue("emailUser"), props.getValue("emailPassword"));

        } catch(MessagingException e) {
            e.printStackTrace();
        }
    }

    private void sendFriendRequest(HttpServletRequest  req, String email, String name) {
        Properties properties = System.getProperties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.setProperty("mail.smtp.starttls.enable", "true");
        properties.setProperty("mail.smtp.port", "587");
        properties.setProperty("mail.smtp.user", "pandagram.subscribe@gmail.com");
        properties.setProperty("mail.smtp.auth", "true");
        Session session = Session.getDefaultInstance(properties);
        String host = "localhost:" + req.getServerPort();
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
