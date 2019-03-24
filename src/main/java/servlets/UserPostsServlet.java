package servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import handlers.SessionHandler;
import models.Post;
import models.Response;

@WebServlet(urlPatterns = "/userPosts", name = "User Posts Servlet")
public class UserPostsServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String username = req.getParameter("user").toLowerCase();
		Response<ArrayList<Post>> response = SessionHandler.getUserPosts(username);
		resp.getWriter().print(mapper.writeValueAsString(response));
	}
}