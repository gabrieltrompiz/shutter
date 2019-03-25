package servlets;

import com.fasterxml.jackson.annotation.JsonInclude;
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

@JsonInclude(JsonInclude.Include.NON_NULL)
@WebServlet(urlPatterns = "/checkUsername", name = "Check Username Servlet")
public class CheckUsernameServlet extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ObjectMapper mapper = new ObjectMapper();
    String user = req.getParameter("user");
    Response<?> response = new Response<>();
    if(SessionHandler.checkLowercaseUsername(user.toLowerCase())) {
      response.setStatus(409);
      response.setMessage("Username already in use");
    } else {
      response.setStatus(200);
      response.setMessage("Username available");
    }
    mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    resp.setStatus(response.getStatus());
    resp.getWriter().print(mapper.writeValueAsString(response));
  }
}
