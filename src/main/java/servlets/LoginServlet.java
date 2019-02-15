package servlets;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.sql.Connection;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import models.Response;
import models.User;
import utilities.ConnManager;

@WebServlet(urlPatterns = "/login", name = "Login Servlet")
public class LoginServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ObjectMapper mapper = new ObjectMapper();
    String json = req.getReader().lines().collect(Collectors.joining());
    User user = mapper.readValue(json, User.class);
    try {
      Response<String> response = new Response<>();
      HttpSession session = req.getSession();
      session.setAttribute("user", json);
      response.setStatus(200);
      response.setMessage("Logged in successfully as " + user.getUserName());
      resp.getWriter().print(mapper.writeValueAsString(response));
    }
    catch (IOException e) {
      e.printStackTrace();
    }
  }

  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

  }
}
