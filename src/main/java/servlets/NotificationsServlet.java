package servlets;

import com.fasterxml.jackson.databind.ObjectMapper;

import handlers.NotificationsHandler;
import handlers.UserHandler;

import models.Like;
import models.Response;
import models.Notification;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

import java.util.ArrayList;
import java.util.stream.Collectors;

/**
 * @author Ptthappy
 */


@WebServlet(urlPatterns = "/notifications", name = "Notification Management Servlet")
public class NotificationsServlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Integer userId = Integer.parseInt(req.getSession(false).getAttribute("user_id").toString());
		Integer notCount = Integer.parseInt(req.getParameter("notifications"));
		Response<ArrayList<Notification>> response = NotificationsHandler.getNotifications(userId, notCount);

		resp.getWriter().print(mapper.writeValueAsString(response));
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doPost(req, resp);
	}

	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doDelete(req, resp);
	}
}
