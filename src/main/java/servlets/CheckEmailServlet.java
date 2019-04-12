package servlets;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import handlers.UserHandler;
import models.Response;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@JsonInclude(JsonInclude.Include.NON_NULL)
@WebServlet(urlPatterns = "/checkEmail", name = "Check Email Servlet")
public class CheckEmailServlet extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ObjectMapper mapper = new ObjectMapper();
    String email = req.getParameter("email");
    Response<?> response = new Response<>();
    if(UserHandler.checkEmail(email)) {
      response.setStatus(409);
      response.setMessage("Email already in use");
    } else {
      response.setStatus(200);
      response.setMessage("Email available");
    }
    mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    resp.setStatus(response.getStatus());
    resp.getWriter().print(mapper.writeValueAsString(response));
  }
}
