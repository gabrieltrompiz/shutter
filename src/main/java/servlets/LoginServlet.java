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

import models.Response;
import models.User;
import utilities.ConnManager;

@WebServlet(urlPatterns = "/login", name = "Servlet")
public class LoginServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;


  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    ObjectMapper mapper = new ObjectMapper();
    String json = request.getReader().lines().collect(Collectors.joining());
    User user = mapper.readValue(json, User.class);
    Connection connection = ConnManager.getConnection();
    try {
      Response<String> responseObject = new Response<>();
      responseObject.setStatus(200);
      responseObject.setMessage("Servlet working correctly");
      responseObject.setData("user sent: " + user.getUserName() + ", password sent: " + user.getPassword());
      response.getWriter().print(mapper.writeValueAsString(responseObject));
    }
    catch (IOException e) {
      e.printStackTrace();
    }
  }

  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

  }
}
