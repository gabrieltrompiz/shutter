package servlets;

import java.io.IOException;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import handlers.SessionHandler;
import models.Response;
import models.User;

@JsonInclude(JsonInclude.Include.NON_NULL)
@WebServlet(urlPatterns = "/search", name = "User Searcher")
public class SearchServlet extends HttpServlet {

	//Esta vaina puede buscar tanto a users en la lista de amigos como users de todos lados dependiendo del param
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String name = req.getParameter("name");
		String search = req.getParameter("search");
		String list = req.getParameter("list");
		Response<ArrayList<User>> response = null;

		if (list.equalsIgnoreCase("friends"))
			response = SessionHandler.searchFriends(name, search);
		else
			response = SessionHandler.searchUsers(name);

		mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		resp.getWriter().print(mapper.writeValueAsString(response));
	}
}
