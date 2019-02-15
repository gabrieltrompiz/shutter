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
    if(checkUsername(user.getUserName())) {
      response.setStatus(400);
      response.setMessage("Username already registered");
      return response;
    }
    if(checkEmail(user.getEmail())) {
      response.setStatus(400);
      response.setMessage("Email already in use");
      return response;
    }
    try {
      PreparedStatement pstmt = connection.prepareStatement(query);
      pstmt.setString(1, user.getUserName());
      pstmt.setString(2, user.getPassword());
      pstmt.setString(3, user.getName());
      pstmt.setString(4, user.getLastName());
      pstmt.setString(5, user.getEmail());
      pstmt.setDate(6, user.getBirthday());
      pstmt.setTimestamp(7, user.getCreationTime());
      pstmt.setString(8, user.getAvatar());
      pstmt.setInt(9, user.getTypeId());
      pstmt.setBoolean(10, user.getSex());
      pstmt.setBoolean(11, user.isEnabled());
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

  private static boolean checkUsername(String username) {
    String query = prop.getValue("checkUsername");
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
