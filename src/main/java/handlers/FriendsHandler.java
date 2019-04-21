package handlers;

import models.Response;
import models.User;
import utilities.PoolManager;
import utilities.PropertiesReader;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

@SuppressWarnings("Duplicates")
public class FriendsHandler {
    private static PoolManager poolManager = PoolManager.getPoolManager();
    private static PropertiesReader prop = PropertiesReader.getInstance();

    public static Response<Boolean> addFriend(int userId, int friendId) {
        Connection con = poolManager.getConn();
        Response<Boolean> response = new Response<>();
        String query = prop.getValue("addFriend");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, userId);
            ps.setInt(2, friendId);
            ps.setInt(3, userId);
            ps.setInt(4, friendId);
            ps.execute();
            response.setData(true);
            response.setStatus(200);
            response.setMessage("Friend Request Accepted");

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

    public static Response<Boolean> deleteFriend(int userId, int friendId) {
        Connection con = poolManager.getConn();
        Response<Boolean> response = new Response<>();
        String query = prop.getValue("deleteFriend");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, userId);
            ps.setInt(2, friendId);
            ps.setInt(3, userId);
            ps.setInt(4, friendId);
            if (ps.execute()) {
                response.setData(true);
                response.setStatus(200);
                response.setMessage("User Unfriended");
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

    public static Response<ArrayList<User>> getFriendList(int id) {
        Response<ArrayList<User>> response = new Response<>();
        ArrayList<User> friends = new ArrayList<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("friendList");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                User u = new User();
                u.setId(rs.getInt(1));
                u.setUsername(rs.getString(2));
                u.setName(rs.getString(3));
                u.setLastName(rs.getString(4));
                u.setAvatar(rs.getString(5));
                u.setBirthday(rs.getDate(6));
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

    public static Response<Boolean> checkFriendRequest(int userId, int friendId) {
        Response<Boolean> response = new Response<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("checkFR");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, userId);
            ps.setInt(2, friendId);
            ResultSet rs = ps.executeQuery();
            response.setStatus(200);
            response.setData(rs.next());
        } catch (SQLException e) {
            e.printStackTrace();
            response.setData(false);
            response.setMessage("DB Connection Error");
            response.setStatus(500);
        } finally {
          poolManager.returnConn(con);
        }
        return response;
    }
}
