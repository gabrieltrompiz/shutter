package servlets;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import handlers.SessionHandler;
import models.Post;
import models.Response;
import models.User;

@WebServlet(urlPatterns = "/posts", name = "User Posts Servlet")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostsServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Response<ArrayList<Post>> response = null;
		String username = req.getParameter("user");
		String timePost = req.getParameter("time");

		if(timePost == null) {
			response = SessionHandler.getUserPosts(username);
		} else {
			Timestamp time = Timestamp.valueOf(timePost);
			response = SessionHandler.getUserPosts(username, time);
		}
		mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		resp.getWriter().print(mapper.writeValueAsString(response));
	}

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        String json = req.getReader().lines().collect(Collectors.joining());
        Post post = mapper.readValue(json, Post.class);
        User user = new User();
        user.setLowercaseUsername(req.getSession(false).getAttribute("username").toString());
        post.setUser(user);
        Response<Integer> response = SessionHandler.addPost(post);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        resp.getWriter().print(mapper.writeValueAsString(response));
    }
}
