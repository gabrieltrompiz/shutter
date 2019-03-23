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

/**
 * @author Ptthappy
 */

@WebServlet(urlPatterns = "/search", name = "User Searcher")
public class SearchServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String name = req.getParameter("name");
		Response<ArrayList<User>> result = SessionHandler.searchUsers(name);
		resp.getWriter().print(mapper.writeValueAsString(result));
	}
}
