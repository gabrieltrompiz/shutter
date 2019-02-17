package handlers;

import models.Response;
import models.User;
import utilities.ConnManager;
import utilities.PropertiesReader;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@SuppressWarnings("Duplicates")
public class RegisterHandler {
  private static Connection connection = ConnManager.getConnection();
  private static PropertiesReader prop = PropertiesReader.getInstance();

  public static Response<?> register(User user) {
    Response<?> response = new Response<>();
    String query = prop.getValue("registerUser");
    if(checkLowercaseUsername(user.getLowercaseUsername())) {
      response.setStatus(409);
      response.setMessage("Username already registered");
      return response;
    }
    if(checkEmail(user.getEmail())) {
      response.setStatus(409);
      response.setMessage("Email already in use");
      return response;
    }
    try {
      PreparedStatement pstmt = connection.prepareStatement(query);
      pstmt.setString(1, user.getUsername());
      pstmt.setString(2, user.getLowercaseUsername());
      pstmt.setString(3, user.getPassword());
      pstmt.setString(4, user.getName());
      pstmt.setString(5, user.getLastName());
      pstmt.setString(6, user.getEmail());
      pstmt.setDate(7, user.getBirthday());
      pstmt.setTimestamp(8, user.getCreationTime());
      pstmt.setString(9, user.getAvatar());
      pstmt.setInt(10, user.getTypeId());
      pstmt.setBoolean(11, user.getSex());
      pstmt.setBoolean(12, user.isEnabled());
      pstmt.execute();
      response.setStatus(200);
      response.setMessage("User registered successfully");
    } catch (SQLException e) {
      e.printStackTrace();
      response.setStatus(500);
      response.setMessage("DB connection error");
    }
    return response;
  }

  private static boolean checkLowercaseUsername(String username) {
    String query = prop.getValue("checkLowercaseUsername");
    try {
      PreparedStatement pstmt = connection.prepareStatement(query);
      pstmt.setString(1, username);
      ResultSet rs = pstmt.executeQuery();
      if(rs.next()) {
        return true;
      }
    } catch (SQLException e) {
      e.printStackTrace();
      return true;
    }
    return false;
  }

  private static boolean checkEmail(String email){
    String query = prop.getValue("checkEmail");
    try {
      PreparedStatement pstmt = connection.prepareStatement(query);
      pstmt.setString(1, email);
      ResultSet rs = pstmt.executeQuery();
      if(rs.next()) {
        return true;
      }
    } catch (SQLException e) {
      e.printStackTrace();
      return true;
    }
    return false;
  }
}
