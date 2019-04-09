package sockets;

import handlers.SessionHandler;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;

@ServerEndpoint("/notifications")
public class NotificationsSocket {

	@OnOpen
	public void onOpen(Session session) throws IOException {
		System.out.println("User connected to notifications web socket");
	}

	@OnClose
	public void onClose(Session session) throws IOException {
		SessionHandler.removeClient(session);
		System.out.println("User disconnected from notifications web socket");
	}

	@OnMessage
	public void onMessage(Session session, String msg) throws IOException {

	}

	@OnError
	public void onError(Throwable e) throws IOException {

	}

}