package servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.Response;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = "/logout", name = "Logout Servlet")
public class LogoutServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    req.getSession().invalidate();
    Response<?> response = new Response<>();
    ObjectMapper mapper = new ObjectMapper();
    response.setStatus(200);
    response.setMessage("Session ended");
    resp.getWriter().print(mapper.writeValueAsString(response));
  }
}
