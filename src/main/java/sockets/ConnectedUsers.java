package sockets;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@ServerEndpoint("/users")
public class ConnectedUsers {
	private static Set<Session> clients = Collections.synchronizedSet(new HashSet<>());

	@OnOpen
	public void onOpen(Session session) throws IOException {
		clients.add(session);
		System.out.println("User connected to web socket");
	}

	@OnClose
	public void onClose(Session session) {
		clients.remove(session);
		System.out.println("User disconnected from web socket");
	}

	@OnMessage
	public void onMessage(Session session, String msg) throws IOException {

	}

	@OnError
	public void onError(Throwable e) throws IOException {

	}

}