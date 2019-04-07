package handlers;

import models.Post;
import models.Response;
import models.User;
import utilities.PropertiesReader;
import utilities.PoolManager;
import utilities.Pool;

import java.sql.*;
import java.io.IOException;
import java.util.ArrayList;

/**
 * @author Ptthappy
 */

@SuppressWarnings("Duplicates")
public class SessionHandler {
	private static Pool pool = Pool.getPool();
	private static PoolManager poolManager = PoolManager.getPoolManager();
	private static PropertiesReader prop = PropertiesReader.getInstance();

	public static Response<User> login(User user) {
		Connection con = poolManager.getConn();
		Response<User> response = new Response<>();
		String query = prop.getValue("login");
		try {
			PreparedStatement pstmt = con.prepareStatement(query);
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
		poolManager.returnConn(con);
		return response;
	}

	public static Response<User> register(User user) throws IOException {
		Connection con = poolManager.getConn();
		Response<User> response = new Response<>();
		String query = prop.getValue("registerUser");
		if(checkLowercaseUsername(user.getLowercaseUsername())) {
			response.setStatus(409);
			response.setMessage("Username already registered");
			poolManager.returnConn(con);
			return response;
		}
		if(checkEmail(user.getEmail().toLowerCase())) {
			response.setStatus(409);
			response.setMessage("Email already in use");
			poolManager.returnConn(con);
			return response;
		}
		try {
			PreparedStatement pstmt = con.prepareStatement(query);
			pstmt.setString(1, user.getUsername());
			pstmt.setString(2, user.getLowercaseUsername());
			pstmt.setString(3, user.getPassword());
			pstmt.setString(4, user.getName());
			pstmt.setString(5, user.getLastName());
			pstmt.setString(6, user.getEmail().toLowerCase());
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
		poolManager.returnConn(con);
		return response;
	}

	//Función para modificar los campos especificados por el usuario.
	//Debería de ir verificando los getters y los que no sean nulos los cambia
	//También pueden agregarsele restricciones de vainas que no se pueden cambiar hmmm
	public static Response<User> modifyUser(User user) {
		Connection con = poolManager.getConn();
		Response<User> response = new Response<>();
		String query = prop.getValue("updateUser");
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, user.getName());
			ps.setString(2, user.getLastName());
			ps.setString(3, user.getEmail());
			ps.setDate(4, user.getBirthday());
			ps.setBoolean(5, user.getSex());
			ps.setString(6, user.getLowercaseUsername());
			ps.setString(7, user.getPassword());
			int affectedRows = ps.executeUpdate();
			if(affectedRows == 1) {
				response.setStatus(200);
				response.setMessage("User Update Successfully");
				response.setData(user);
			  } else {
			    response.setStatus(401);
			    response.setMessage("Bad credentials");
			    response.setData(null);
      		}
		} catch (SQLException e) {
			e.printStackTrace();
			response.setStatus(500);
			response.setMessage("DB connection error");
			response.setData(user);
		}
		poolManager.returnConn(con);
		return response;
	}

	public static Response<Boolean> addFriend(String user1, String user2) {
		Connection con = poolManager.getConn();
		Response<Boolean> response = new Response<>();
		String query = prop.getValue("addFriend");
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, user1);
			ps.setString(2, user2);
			ps.setString(3, user1);
			ps.setString(4, user2);
		    ps.execute();
            response.setData(true);
            response.setStatus(200);
            response.setMessage("Friend Request Sent");

		} catch (SQLException e) {
			e.printStackTrace();
			response.setStatus(500);
			response.setMessage("DB Connection Error");
			response.setData(false);
		} finally {
			poolManager.returnConn(con);
		}
		return response;
	}

	public static Response<Boolean> deleteFriend(String user1, String user2) {
		Connection con = poolManager.getConn();
		Response<Boolean> response = new Response<>();
		String query = prop.getValue("deleteFriend");
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, user1);
			ps.setString(2, user2);
			ps.setString(3, user1);
			ps.setString(4, user2);
			if (ps.execute()) {
				response.setData(true);
				response.setStatus(200);
				response.setMessage("User Deleted");
			} else {
				response.setData(false);
				response.setStatus(200);
				response.setMessage("Couldn't Delete Friend");
			}

		} catch (SQLException e) {
			e.printStackTrace();
			response.setStatus(500);
			response.setMessage("DB Connection Error");
			response.setData(false);
		} finally {
			poolManager.returnConn(con);
		}
		return response;
	}

	public static Response<ArrayList<User>> getFriendList(String username) {
		Response<ArrayList<User>> response = new Response<>();
		ArrayList<User> friends = new ArrayList<>();
		Connection con = poolManager.getConn();
		String query = prop.getValue("friendList");
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, username);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				User u = new User();
				u.setUsername(rs.getString(1));
				u.setName(rs.getString(2));
				u.setLastName(rs.getString(3));
				u.setAvatar(rs.getString(4));
				friends.add(u);
			}
			response.setData(friends);
			response.setMessage("List Returned");
			response.setStatus(200);
		} catch (Exception e) {
			e.printStackTrace();
			response.setMessage("DB Connection Error");
			response.setStatus(500);
		} finally {
			poolManager.returnConn(con);
		}
		return response;
	}

	public static Response<ArrayList<User>> searchUsers(String search) {
		Response<ArrayList<User>> response = new Response<>();
		ArrayList<User> users = new ArrayList<>();
		Connection con = poolManager.getConn();
		String query = prop.getValue("searchUsers");
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, "%" + search + "%");
			ps.setString(2, "%" + search + "%");
			ps.setString(3, "%" + search + "%");
			ps.setString(4, "%" + search + "%");
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				User user = new User();
				user.setUsername(rs.getString(1));
				user.setName(rs.getString(2));
				user.setLastName(rs.getString(3));
				user.setAvatar(rs.getString(4));
				users.add(user);
			}

			response.setData(users);
			response.setMessage("List Returned");
			response.setStatus(200);
		} catch (SQLException e) {
			e.printStackTrace();
			response.setMessage("DB Connection Error");
			response.setStatus(500);
		} finally {
			poolManager.returnConn(con);
		}

		return response;
	}

	public static Response<ArrayList<User>> searchFriends(String name, String search) {
		Response<ArrayList<User>> response = new Response<>();
		ArrayList<User> friends = new ArrayList<>();
		Connection con = poolManager.getConn();
		String query = prop.getValue("searchFriends");
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, name);
			ps.setString(2, "%" + search + "%");
			ps.setString(3, "%" + search + "%");
			ps.setString(4, "%" + search + "%");
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				User user = new User();
				user.setUsername(rs.getString(1));
				user.setName(rs.getString(2));
				user.setLastName(rs.getString(3));
				user.setAvatar(rs.getString(4));
				friends.add(user);
			}

			response.setData(friends);
			response.setMessage("List Returned");
			response.setStatus(200);
		} catch (SQLException e) {
			e.printStackTrace();
			response.setMessage("DB Connection Error");
			response.setStatus(500);
		} finally {
			poolManager.returnConn(con);
		}

		return response;
	}

	public static Response<ArrayList<Post>> getPosts(String username) {
		Response<ArrayList<Post>> response = new Response<>();
		ArrayList<Post> posts = new ArrayList<>();
		Connection con = poolManager.getConn();
		String query = prop.getValue("getPosts");
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, username);
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				Post post = new Post();
				User user = new User();

				post.setIdPost(rs.getInt(1));
				post.setTypePost(rs.getInt(2));
				post.setPostText(rs.getString(3));
				post.setUrl(rs.getString(4));
				post.setCreationTime(rs.getTimestamp(5));
				user.setUsername(rs.getString(6));
				user.setName(rs.getString(7));
				user.setLastName(rs.getString(8));
				user.setAvatar(rs.getString(9));

				post.setUser(user);
				posts.add(post);
			}
			response.setData(posts);
			response.setMessage("Posts Returned");
			response.setStatus(200);
		} catch(SQLException e) {
			e.printStackTrace();
			response.setMessage("DB Connection Error");
			response.setStatus(500);
		} finally {
			poolManager.returnConn(con);
		}

		return response;
	}

	public static Response<ArrayList<Post>> getPosts(String username, Timestamp time) {
		Response<ArrayList<Post>> response = new Response<>();
		ArrayList<Post> posts = new ArrayList<>();
		Connection con = poolManager.getConn();
		String query = prop.getValue("getMorePosts");
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, username);
			ps.setTimestamp(2, time);
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				Post post = new Post();
				User user = new User();

				post.setIdPost(rs.getInt(1));
				post.setTypePost(rs.getInt(2));
				post.setPostText(rs.getString(3));
				post.setUrl(rs.getString(4));
				post.setCreationTime(rs.getTimestamp(5));
				user.setUsername(rs.getString(6));
				user.setName(rs.getString(7));
				user.setLastName(rs.getString(8));
				user.setAvatar(rs.getString(9));

				post.setUser(user);
				posts.add(post);
			}
			response.setData(posts);
			response.setMessage("Posts Returned");
			response.setStatus(200);
		} catch(SQLException e) {
			e.printStackTrace();
			response.setMessage("DB Connection Error");
			response.setStatus(500);
		} finally {
			poolManager.returnConn(con);
		}

		return response;
	}

	public static Response<ArrayList<Post>> getUserPosts(String username) {
		Response<ArrayList<Post>> response = new Response<>();
		ArrayList<Post> posts = new ArrayList<>();
		Connection con = poolManager.getConn();
		String query = prop.getValue("getUserPosts");
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, username);
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				Post post = new Post();
				post.setIdPost(rs.getInt(1));
				post.setTypePost(rs.getInt(2));
				post.setPostText(rs.getString(3));
				post.setUrl(rs.getString(4));
				post.setCreationTime(rs.getTimestamp(5));

				posts.add(post);
			}
			response.setData(posts);
			response.setMessage("User Posts Returned");
			response.setStatus(200);

		} catch (SQLException e) {
			e.printStackTrace();
			response.setMessage("DB Connection Error");
			response.setStatus(500);
		} finally {
			poolManager.returnConn(con);
		}

		return response;
	}

	public static Response<ArrayList<Post>> getUserPosts(String username, Timestamp time) {
		Response<ArrayList<Post>> response = new Response<>();
		ArrayList<Post> posts = new ArrayList<>();
		Connection con = poolManager.getConn();
		String query = prop.getValue("getMoreUserPosts");
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, username);
			ps.setTimestamp(2, time);
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				Post post = new Post();
				post.setIdPost(rs.getInt(1));
				post.setTypePost(rs.getInt(2));
				post.setPostText(rs.getString(3));
				post.setUrl(rs.getString(4));
				post.setCreationTime(rs.getTimestamp(5));

				posts.add(post);
			}
			response.setData(posts);
			response.setMessage("User Posts Returned");
			response.setStatus(200);

		} catch (SQLException e) {
			e.printStackTrace();
			response.setMessage("DB Connection Error");
			response.setStatus(500);
		} finally {
			poolManager.returnConn(con);
		}

		return response;
	}

	public static Response<Boolean> addPost(Post post) {
	    Response<Boolean> response = new Response<>();
	    Connection con = poolManager.getConn();
	    String query = prop.getValue("addPost");
	    try {
	        PreparedStatement ps = con.prepareStatement(query);
	        ps.setInt(1, post.getTypePost());
	        ps.setString(2, post.getPostText());
	        ps.setString(3, post.getUser().getLowercaseUsername());
	        ps.execute();
	        response.setMessage("Added post successfully.");
	        response.setStatus(200);
	        response.setData(true);
        }
        catch (SQLException e) {
	        e.printStackTrace();
	        response.setMessage("Error while posting.");
	        response.setStatus(500);
	        response.setData(false);
        }
        finally {
	        poolManager.returnConn(con);
        }
        return response;
    }

	private static void getUserData(ResultSet rs, User user) throws SQLException {
		user.setUsername(rs.getString(2));
		user.setLowercaseUsername(rs.getString(3));
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
		Connection con = poolManager.getConn();
		String query = prop.getValue("checkEmail");
		try {
			PreparedStatement pstmt = con.prepareStatement(query);
			pstmt.setString(1, email);
			ResultSet rs = pstmt.executeQuery();
			if(rs.next()) {
				poolManager.returnConn(con);
				return rs.getString(3);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		poolManager.returnConn(con);
		return "";
	}

	public static boolean checkEmail(String email){
		Connection con = poolManager.getConn();
		String query = prop.getValue("checkEmail");
		try {
			PreparedStatement pstmt = con.prepareStatement(query);
			pstmt.setString(1, email.toLowerCase());
			ResultSet rs = pstmt.executeQuery();
			if(rs.next()) {
				poolManager.returnConn(con);
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			poolManager.returnConn(con);
			return true;
		}
		poolManager.returnConn(con);
		return false;
	}

	public static boolean checkLowercaseUsername(String username) {
		Connection con = poolManager.getConn();
		String query = prop.getValue("checkLowercaseUsername");
		try {
			PreparedStatement pstmt = con.prepareStatement(query);
			pstmt.setString(1, username);
			ResultSet rs = pstmt.executeQuery();
			if(rs.next()) {
				poolManager.returnConn(con);
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			poolManager.returnConn(con);
			return true;
		}
		poolManager.returnConn(con);
		return false;
	}
}
