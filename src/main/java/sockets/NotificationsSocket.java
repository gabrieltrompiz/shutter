package sockets;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import configurators.HttpSessionConfigurator;
import handlers.FriendsHandler;
import handlers.NotificationsHandler;
import models.Notification;
import models.User;
import utilities.MailSender;

import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

@JsonInclude(JsonInclude.Include.NON_NULL)
@ServerEndpoint(value = "/notifications", configurator = HttpSessionConfigurator.class)
public class NotificationsSocket {

    private Integer id;
    private ArrayList<Notification> notifications;
    private static HashMap<Integer, Session> wsSessions = new HashMap<>();
    private HttpSession httpSession;
//    private static ArrayList<Integer> users = new ArrayList<>();

    @OnOpen
    public void onOpen(Session session, EndpointConfig config) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        this.httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
        this.id = Integer.parseInt(httpSession.getAttribute("user_id").toString());
        wsSessions.put(id, session);
        this.notifications = NotificationsHandler.getNotifications(id, 20);
        session.getBasicRemote().sendText("Notifications;" + mapper.writeValueAsString(notifications));
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        System.out.println(message);
        Notification not = mapper.readValue(message, Notification.class);
        not = NotificationsHandler.addNotification(not);
        if(not.getNotificationAccepted() != null) {
            NotificationsHandler.setAccepted(not.getNotificationAccepted(), not.getNotificationSender(), not.getNotificationReceiver());
        }
        if(not.getTypeNotificationId() == 4) {
            FriendsHandler.addFriend(not.getNotificationReceiver(), not.getNotificationSender());
            session.getBasicRemote().sendText("Friend Added");
            if(wsSessions.get(not.getNotificationReceiver()) != null) {
                wsSessions.get(not.getNotificationReceiver()).getBasicRemote().sendText("Friend Added");
                wsSessions.get(not.getNotificationReceiver()).getBasicRemote().sendText(mapper.writeValueAsString(not));
            }
        }
        else if((not.getTypeNotificationId() == 5 || not.getTypeNotificationId() == 1 || not.getTypeNotificationId() == 2
        || not.getTypeNotificationId() == 3) && wsSessions.containsKey(not.getNotificationReceiver())) {
            if (not.getTypeNotificationId() == 1) {
                User user = FriendsHandler.getUserById(not.getNotificationReceiver());
                MailSender sender = new MailSender(user.getEmail(), user.getName() + user.getLastName(), "friendRequest");
            }
            wsSessions.get(not.getNotificationReceiver()).getBasicRemote().sendText(mapper.writeValueAsString(not));
        }
        this.notifications = NotificationsHandler.getNotifications(id, 20);
        session.getBasicRemote().sendText("Notifications;" + mapper.writeValueAsString(notifications));
    }

    @OnClose
    public void onClose(Session session) {
        wsSessions.remove(this.id);
    }

    @OnError
    public void onError(Session session, Throwable throwable) { throwable.printStackTrace(); }
}
