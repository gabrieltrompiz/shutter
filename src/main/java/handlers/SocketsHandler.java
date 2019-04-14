package handlers;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class SocketsHandler {

	private static Set<String> clients = Collections.synchronizedSet(new HashSet<>());

	public static void addClient(String username) {
		clients.add(username);
	}

	public static void removeClient(String username) {
		clients.remove(username);
	}

	public static Set<String> getClients() {
		return clients;
	}
}
