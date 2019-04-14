package servlets;

import com.fasterxml.jackson.databind.ObjectMapper;

import handlers.UserHandler;

import models.Comment;
import models.Response;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

import java.util.stream.Collectors;

/**
 * @author Ptthappy
 */

@WebServlet(urlPatterns = "/comments", name = "Comments Management Servlet")
public class CommentsServlet extends HttpServlet {
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String json = req.getReader().lines().collect(Collectors.joining());
		Comment comment = mapper.readValue(json, Comment.class);
		comment.setUser_id(Integer.parseInt(req.getSession(false).getAttribute("user_id").toString()));

		Response<?> response = UserHandler.addComment(comment);

		resp.getWriter().print(mapper.writeValueAsString(response));
	}

	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String json = req.getReader().lines().collect(Collectors.joining());
		Comment comment = mapper.readValue(json, Comment.class);
		comment.setUser_id(Integer.parseInt(req.getSession(false).getAttribute("user_id").toString()));

		Response<?> response = UserHandler.deleteComment(comment);

		resp.getWriter().print(mapper.writeValueAsString(response));
	}
}
