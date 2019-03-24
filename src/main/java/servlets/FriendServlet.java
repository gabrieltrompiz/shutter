package servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import handlers.SessionHandler;
import models.Response;
import models.User;

@WebServlet(urlPatterns = "/friends", name = "Friend Management Servlet")
public class FriendServlet extends HttpServlet {

	//Aja convive pa agregar amiwo. TODO Corregir
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String user1 = req.getParameter("user1");
		String user2 = req.getParameter("user2");
		Response<Boolean> response = SessionHandler.addFriend(user1, user2);
		resp.getWriter().print(mapper.writeValueAsString(response));
	}

	//Pa eliminar amiwo. TODO Corregir
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String user1 = req.getParameter("user1").toLowerCase();
		String user2 = req.getParameter("user2").toLowerCase();
		Response<Boolean> response = SessionHandler.deleteFriend(user1, user2);
		resp.getWriter().print(mapper.writeValueAsString(response));
	}

	//Pa obtener la lista de amiwos
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String username = req.getParameter("username").toLowerCase();
		Response<ArrayList<User>> response = SessionHandler.getFriendList(username);
		resp.getWriter().print(mapper.writeValueAsString(response));
	}
}
