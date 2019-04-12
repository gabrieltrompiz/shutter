package servlets;

import java.io.IOException;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import handlers.UserHandler;
import models.Response;
import models.User;
import utilities.Encryptor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@WebServlet(urlPatterns = "/login", name = "Login Servlet")
public class LoginServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ObjectMapper mapper = new ObjectMapper();
    String json = req.getReader().lines().collect(Collectors.joining());
    User user = mapper.readValue(json, User.class);

    if(user.getLowercaseUsername() == null)
    	user.setLowercaseUsername(user.getUsername().toLowerCase());

    user.setPassword(Encryptor.getSHA256(user.getPassword(), user.getLowercaseUsername()));

    Response<User> response = UserHandler.login(user);
    if(response.getStatus() == 200) {
      HttpSession session = req.getSession();
      session.setAttribute("user_id", user.getId());
      session.setAttribute("username", user.getLowercaseUsername());
    }
    mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    resp.setStatus(response.getStatus());
    resp.getWriter().print(mapper.writeValueAsString(response));
  }
}