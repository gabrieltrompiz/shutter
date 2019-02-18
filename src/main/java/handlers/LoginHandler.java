package handlers;

import models.Response;
import models.User;
import utilities.ConnManager;
import utilities.PropertiesReader;

import javax.xml.transform.Result;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@SuppressWarnings("Duplicates")
public class LoginHandler {
  private static Connection connection = ConnManager.getConnection();
  private static PropertiesReader prop = PropertiesReader.getInstance();

  public static Response<?> login(User user) {
    Response<?> response = new Response<>();
    String query = prop.getValue("checkLowercaseUsername");
    try {
      PreparedStatement ps = connection.prepareStatement(query);
      ps.setString(1, user.getLowercaseUsername());
      ResultSet rs = ps.executeQuery();

      if(!rs.next()) {
        response.setStatus(401);
        response.setMessage("Username or email does not exist");
        return response;
      }

      query = prop.getValue("login");
      ps = connection.prepareStatement(query);
      ps.setString(1, user.getLowercaseUsername());
      ps.setString(2, user.getPassword());
      rs = ps.executeQuery();

      if(rs.next()) {
        response.setStatus(200);
        response.setMessage("Access granted");
      }

      else {
        response.setStatus(401);
        response.setMessage("Password is incorrect");
      }

    } catch(SQLException e) {
      e.printStackTrace();
      response.setStatus(500);
      response.setMessage("DB connection error");
    }
    return response;
  }

  public static String getUsernameByEmail(String email) {
    String query = prop.getValue("checkEmail");
    try {
      PreparedStatement pstmt = connection.prepareStatement(query);
      pstmt.setString(1, email);
      ResultSet rs = pstmt.executeQuery();
      if(rs.next()) {
        return rs.getString(3);
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  }

}
