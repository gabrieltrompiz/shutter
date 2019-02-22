package handlers;

import models.Response;
import models.User;
import utilities.ConnManager;
import utilities.PropertiesReader;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Ptthappy
 */

@SuppressWarnings("Duplicates")
public class SessionHandler {
	private static Connection connection = ConnManager.getConnection();
	private static PropertiesReader prop = PropertiesReader.getInstance();

	public static Response<User> login(User user) {
		Response<User> response = new Response<>();
		String query = prop.getValue("login");
		try {
			PreparedStatement pstmt = connection.prepareStatement(query);
			pstmt.setString(1, user.getLowercaseUsername());
			pstmt.setString(2, user.getPassword());
			ResultSet rs = pstmt.executeQuery();
			if(rs.next()) {
				getUserData(rs, user);
				response.setStatus(200);
				response.setMessage("Access granted");
				response.setData(user);
			}
			else {
				response.setStatus(401);
				response.setMessage("Unauthorized, bad credentials");
			}
		} catch (SQLException e) {
			response.setStatus(500);
			response.setMessage("DB connection error");
			e.printStackTrace();
		}
		return response;
	}

	public static Response<User> register(User user) throws IOException {
		Response<User> response = new Response<>();
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
			user.setPassword(null);
			response.setData(user);
		} catch (SQLException e) {
			e.printStackTrace();
			response.setStatus(500);
			response.setMessage("DB connection error");
		}
		return response;
	}

	//Función para modificar los campos especificados por el usuario.
	//Debería de ir verificando los getters y los que no sean nulos los cambia
	//También pueden agregarsele restricciones de vainas que no se pueden cambiar hmmm
	public static Response<User> modifyUser(User user) {
		return null;
	}

	public static void getUserData(ResultSet rs, User user) throws SQLException {
		user.setLowercaseUsername(rs.getString(2));
		user.setUsername(rs.getString(3));
		user.setName(rs.getString(5));
		user.setLastName(rs.getString(6));
		user.setEmail(rs.getString(7));
    user.setBirthday(rs.getDate(8));
    user.setCreationTime(rs.getTimestamp(9));
    user.setAvatar(rs.getString(10));
    user.setTypeId(rs.getInt(11));
    user.setSex(rs.getBoolean(12));
    user.setEnabled(rs.getBoolean(13));
		user.setPassword(null);
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
		return "";
	}

	public static boolean checkEmail(String email){
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

}







