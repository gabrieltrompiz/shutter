package servlets;

import java.io.IOException;
import java.util.stream.Collectors;
import java.util.ArrayList;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import handlers.SessionHandler;
import models.FriendHelper;
import models.Response;
import models.User;

@WebServlet(urlPatterns = "/friends", name = "Friend Management Servlet")
public class FriendServlet extends HttpServlet {

	//Aja convive pa agregar amiwo
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String json =  req.getReader().lines().collect(Collectors.joining());
		FriendHelper helper = mapper.readValue(json, FriendHelper.class);
		Response<Boolean> response = SessionHandler.addFriend(helper);
		resp.getWriter().print(mapper.writeValueAsString(response));
	}

	//Pa eliminar amiwo
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String json =  req.getReader().lines().collect(Collectors.joining());
		FriendHelper helper = mapper.readValue(json, FriendHelper.class);
		Response<Boolean> response = SessionHandler.deleteFriend(helper);
		resp.getWriter().print(mapper.writeValueAsString(response));
	}

	//Pa obtener la lista de amiwos
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String json =  req.getReader().lines().collect(Collectors.joining());
		User user = mapper.readValue(json, User.class);
		Response<ArrayList<User>> response = SessionHandler.getFriendList(user);
		resp.getWriter().print(mapper.writeValueAsString(response));
	}
}
