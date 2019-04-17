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

import handlers.PostsHandler;
import handlers.UserHandler;
import models.Post;
import models.Response;
import models.User;

@WebServlet(urlPatterns = "/posts", name = "User Posts Servlet")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostsServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Integer userId = Integer.parseInt(req.getParameter("user"));
		Response<ArrayList<Post>> response = PostsHandler.getUserPosts(userId);
		mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		resp.getWriter().print(mapper.writeValueAsString(response));
	}

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	    ObjectMapper mapper = new ObjectMapper();
        Integer userId = Integer.parseInt(req.getSession(false).getAttribute("user_id").toString());
        Integer postId = Integer.parseInt(req.getParameter("id"));
        Response<String> response = PostsHandler.deletePost(userId, postId);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        resp.getWriter().print(mapper.writeValueAsString(response));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        String json = req.getReader().lines().collect(Collectors.joining());
        Post post = mapper.readValue(json, Post.class);
        User user = new User();
        user.setId(Integer.parseInt(req.getSession(false).getAttribute("user_id").toString()));
        post.setUser(user);
        Response<Integer> response = PostsHandler.addPost(post);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        resp.getWriter().print(mapper.writeValueAsString(response));
    }
}
