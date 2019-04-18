package sockets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.xml.internal.ws.wsdl.writer.document.Message;
import configurators.HttpSessionConfigurator;
import handlers.FriendsHandler;
import models.Response;
import models.User;

import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@ServerEndpoint(value = "/users", configurator = HttpSessionConfigurator.class)
public class UsersSocket {

    private String username;
    private static HashMap<String, Session> wsSessions = new HashMap<>();
    private HttpSession httpSession;
    private static ArrayList<String> users = new ArrayList<>();
    private ArrayList<User> friendList = new ArrayList<>();

    @OnOpen
    public void onOpen(Session session, EndpointConfig config) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        session.getBasicRemote().sendText(mapper.writeValueAsString(users));
        this.httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
        this.username = httpSession.getAttribute("username").toString();
        users.add(this.username);
        wsSessions.put(this.username, session);
        Response<ArrayList<User>> response = FriendsHandler.getFriendList(Integer.parseInt(httpSession.getAttribute("user_id").toString()));
        this.friendList = (ArrayList<User>) response.getData();
        for (User user : friendList) {
            if(wsSessions.containsKey(user.getUsername().toLowerCase())) {
                wsSessions.get(user.getUsername().toLowerCase()).getBasicRemote().sendText("Connected:" + this.username);
            }
        }
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        System.out.println("User connected!");

    }

    @OnClose
    public void onClose(Session session) throws IOException {
        for(User user : this.friendList) {
            if(wsSessions.containsKey(user.getUsername().toLowerCase())) {
                wsSessions.get(user.getUsername().toLowerCase()).getBasicRemote().sendText("Disconnected:" + this.username);
            }
        }
        users.remove(this.username);
        wsSessions.remove(this.username);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.err.println(throwable.getStackTrace());
    }
}