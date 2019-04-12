package servlets;

import java.io.IOException;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import handlers.PostsHandler;
import handlers.UserHandler;
import models.Post;
import models.Response;

@JsonInclude(JsonInclude.Include.NON_NULL)
@WebServlet(urlPatterns = "/feed", name = "Feed Servlet")
public class FeedServlet extends HttpServlet {

	//Gettea los posts del feed
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Response<ArrayList<Post>> response;
		Integer id = Integer.parseInt(req.getSession(false).getAttribute("user_id").toString());
		Integer posts = Integer.parseInt(req.getParameter("posts"));
		String username = req.getSession(false).getAttribute("username").toString();
		response = PostsHandler.getPosts(id, posts, username);
		mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		resp.getWriter().print(mapper.writeValueAsString(response));
	}
}
