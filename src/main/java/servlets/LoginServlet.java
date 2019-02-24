package servlets;

import java.io.IOException;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import handlers.SessionHandler;
import models.Response;
import models.User;
import utilities.Encryptor;

@WebServlet(urlPatterns = "/login", name = "Login Servlet")
public class LoginServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ObjectMapper mapper = new ObjectMapper();
    String json = req.getReader().lines().collect(Collectors.joining());
    User user = mapper.readValue(json, User.class);

    if(user.getLowercaseUsername() == null)
    	user.setLowercaseUsername(SessionHandler.getUsernameByEmail(user.getEmail()));

    user.setPassword(Encryptor.getSHA256(user.getPassword(), user.getLowercaseUsername()));

    Response<User> response = SessionHandler.login(user);
    if(response.getStatus() == 200) {
      req.getSession();
    }

    resp.setStatus(response.getStatus());
    resp.getWriter().print(mapper.writeValueAsString(response));
  }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {}
}