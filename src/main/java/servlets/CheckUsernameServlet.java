package servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import handlers.SessionHandler;
import models.Response;
import models.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

@WebServlet(urlPatterns = "/checkUsername", name = "Check Username Servlet")
public class CheckUsernameServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ObjectMapper objectMapper = new ObjectMapper();
    String json = req.getReader().lines().collect(Collectors.joining());
    User user = objectMapper.readValue(json, User.class);
    Response<?> response = new Response<>();
    if(SessionHandler.checkLowercaseUsername(user.getUsername().toLowerCase())) {
      response.setStatus(409);
      response.setMessage("Username already in use");
    }
    else {
      response.setStatus(200);
      response.setMessage("Username available");
    }
    resp.setStatus(response.getStatus());
    resp.getWriter().print(objectMapper.writeValueAsString(response));
  }
}
