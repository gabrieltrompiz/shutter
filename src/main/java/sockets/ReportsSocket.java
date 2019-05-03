package sockets;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import configurators.HttpSessionConfigurator;
import handlers.ReportsHandler;
import models.Report;

import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.ArrayList;

@JsonInclude(JsonInclude.Include.NON_NULL)
@ServerEndpoint(value = "/reports", configurator = HttpSessionConfigurator.class)
public class ReportsSocket {

    private static ArrayList<Report> reports;
    private static ArrayList<Session> admins = new ArrayList<>();
    private HttpSession httpSession;

    @OnOpen
    public void onOpen(Session session, EndpointConfig config) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        this.httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
        Integer typeId = Integer.parseInt(httpSession.getAttribute("type").toString());
        if(typeId == 2) {
            admins.add(session);
            reports = ReportsHandler.getReports();
            reports.forEach(report -> {
                System.out.println(report.getDate());
            });
            session.getBasicRemote().sendText(mapper.writeValueAsString(reports));
        }
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        Integer typeId = Integer.parseInt(httpSession.getAttribute("type").toString());
        if (typeId == 1) {
            System.out.println(message);
            Report report = mapper.readValue(message, Report.class);
            report.setSender(Integer.parseInt(this.httpSession.getAttribute("user_id").toString()));
            ReportsHandler.addReport(report);
            reports = ReportsHandler.getReports();
        }
        else if(message.startsWith("Resolve")) {
            Integer reportId = Integer.parseInt(message.split(";")[1]);
            ReportsHandler.setResolved(reportId);
        }
        for (Session sess : admins) {
            if(sess.isOpen())
                sess.getBasicRemote().sendText(mapper.writeValueAsString(reports));
        }
    }
    @OnClose
    public void onClose(Session session) throws IOException {
        Integer typeId = Integer.parseInt(this.httpSession.getAttribute("type").toString());
        if(typeId == 2) {
            admins.remove(session);
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) { throwable.printStackTrace(); }
}
