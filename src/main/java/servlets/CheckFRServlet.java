package servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import handlers.FriendsHandler;
import models.Response;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = "/checkFriendRequest", name = "Check FR Servlet")
public class CheckFRServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        Integer userId = Integer.parseInt(req.getSession(false).getAttribute("user_id").toString());
        Integer friendId = Integer.parseInt(req.getParameter("id"));
        Response<Boolean> response = FriendsHandler.checkFriendRequest(userId, friendId);
        resp.setStatus(response.getStatus());
        resp.getWriter().print(mapper.writeValueAsString(response));
    }
}
