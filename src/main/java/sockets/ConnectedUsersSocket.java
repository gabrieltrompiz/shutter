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

@ServerEndpoint("/users")
public class ConnectedUsersSocket {

	@OnOpen
	public void onOpen(Session session/*, String username*/) throws IOException {
		/*SessionHandler.addClient(username);*/
		System.out.println("User connected to user web socket");
	}

	@OnClose
	public void onClose(Session session/*, String username*/) throws IOException {
		/*SessionHandler.removeClient(username);*/
		System.out.println("User disconnected from user web socket");
	}

	@OnMessage
	public void onMessage(Session session, String msg) throws IOException {

	}

	@OnError
	public void onError(Throwable e) throws IOException {

	}

}
