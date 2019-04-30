package handlers;

import models.*;
import utilities.PoolManager;
import utilities.PropertiesReader;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;
import static java.util.Map.Entry.*;

public class AdminHandler {
    private static PoolManager poolManager = PoolManager.getPoolManager();
    private static PropertiesReader prop = PropertiesReader.getInstance();


    public static Response<HashMap<String, ArrayList<Post>>> postsByType() {
        Response<HashMap<String, ArrayList<Post>>> response = new Response<>();
        ArrayList<Post> audioPosts = new ArrayList<>();
        ArrayList<Post> textPosts = new ArrayList<>();
        ArrayList<Post> videoPosts = new ArrayList<>();
        ArrayList<Post> imagePosts = new ArrayList<>();
        HashMap<String, ArrayList<Post>> tp = new HashMap<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getAllPosts");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Post post = new Post();
                User user = new User();
                post.setIdPost(rs.getInt(1));
                post.setTypePost(rs.getInt(2));
                post.setPostText(rs.getString(3));
                post.setCreationTime(rs.getTimestamp(4));
                user.setUsername(rs.getString(5));
                user.setName(rs.getString(6));
                user.setLastName(rs.getString(7));
                user.setId(rs.getInt(8));
                post.setLikes(null);
                post.setComments(null);
                post.setUser(user);
                if(post.getTypePost() == 1) { textPosts.add(post); }
                if(post.getTypePost() == 2) { imagePosts.add(post); }
                if(post.getTypePost() == 3) { videoPosts.add(post); }
                if(post.getTypePost() == 4) { audioPosts.add(post); }
            }
            response.setStatus(200);
            tp.put("text", textPosts);
            tp.put("audio", audioPosts);
            tp.put("video", videoPosts);
            tp.put("image", imagePosts);
            response.setMessage("Stats returned.");
            response.setData(tp);

        } catch(SQLException e) {
            response.setStatus(500);
            response.setMessage("DB Connection Error");
        }
        finally {
            poolManager.returnConn(con);
        }
        return response;
    }

    public static Response<HashMap<String, ArrayList<User>>> usersByGenre() {
        Response<HashMap<String, ArrayList<User>>> response = new Response<>();
        ArrayList<User> male = new ArrayList<>();
        ArrayList<User> female = new ArrayList<>();
        HashMap<String, ArrayList<User>> ug = new HashMap<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getAllUsers");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                User user = new User();
                user.setId(rs.getInt(1));
                user.setUsername(rs.getString(2));
                user.setName(rs.getString(3));
                user.setLastName(rs.getString(4));
                user.setBirthday(rs.getDate(5));
                user.setCreationTime(rs.getTimestamp(6));
                user.setSex(rs.getBoolean(7));
                if(user.getSex()) { male.add(user); }
                else { female.add(user); }
            }
            response.setStatus(200);
            response.setMessage("Stats returned.");
            ug.put("male", male);
            ug.put("female", female);
            response.setData(ug);
        } catch(SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            response.setMessage("DB Connection Error");
        }
        finally {
            poolManager.returnConn(con);
        }
        return response;
    }

    public static Response<LinkedHashMap<String, ArrayList<Post>>> usersByPosts() {
        Response<LinkedHashMap<String, ArrayList<Post>>> response = new Response<>();
        HashMap<String, ArrayList<Post>> map = new HashMap<>();
        HashMap<String, Integer> quantity = new HashMap<>();
        LinkedHashMap<String, ArrayList<Post>> data = new LinkedHashMap<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getAllPosts");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Post post = new Post();
                User user = new User();
                post.setIdPost(rs.getInt(1));
                post.setTypePost(rs.getInt(2));
                post.setPostText(rs.getString(3));
                post.setCreationTime(rs.getTimestamp(4));
                user.setUsername(rs.getString(5));
                user.setName(rs.getString(6));
                user.setLastName(rs.getString(7));
                user.setId(rs.getInt(8));
                post.setLikes(null);
                post.setComments(null);
                post.setUser(user);
                if(map.containsKey(user.getUsername())) {
                    map.get(user.getUsername()).add(post);
                    quantity.put(user.getUsername(), quantity.get(user.getUsername()) + 1);
                }
                else {
                    ArrayList<Post> posts = new ArrayList<>();
                    posts.add(post);
                    map.put(user.getUsername(), posts);
                    quantity.put(user.getUsername(), 1);
                }
            }
            HashMap<String, Integer> sorted = quantity
                    .entrySet()
                    .stream()
                    .sorted(Collections.reverseOrder(comparingByValue()))
                    .limit(10)
                    .collect(toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e2, LinkedHashMap::new));
            for(Map.Entry me : sorted.entrySet()) {
                String key = me.getKey().toString();
                data.put(key, map.get(key));
            }
            response.setStatus(200);
            response.setMessage("Stats Returned");
            response.setData(data);

        } catch(SQLException e) {
            response.setStatus(500);
            response.setMessage("DB Connection Error");
        } finally {
            poolManager.returnConn(con);
        }
        return response;
    }

    public static Response<LinkedHashMap<String, ArrayList<User>>> usersByFriends() {
        Response<LinkedHashMap<String, ArrayList<User>>> response = new Response<>();
        HashMap<String, ArrayList<User>> map = new HashMap<>();
        HashMap<String, Integer> quantity = new HashMap<>();
        LinkedHashMap<String, ArrayList<User>> data = new LinkedHashMap<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getAllFriends");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                User user = new User();
                User friend = new User();
                user.setId(rs.getInt(1));
                friend.setId(rs.getInt(2));
                user.setUsername(rs.getString(3));
                friend.setUsername(rs.getString(4));
                friend.setName(rs.getString(5));
                friend.setLastName(rs.getString(6));
                friend.setBirthday(rs.getDate(7));
                friend.setCreationTime(rs.getTimestamp(8));
                friend.setSex(rs.getBoolean(9));
                if(map.containsKey(user.getUsername())) {
                    map.get(user.getUsername()).add(friend);
                    quantity.put(user.getUsername(), quantity.get(user.getUsername()) + 1);
                }
                else {
                    ArrayList<User> users = new ArrayList<>();
                    users.add(friend);
                    map.put(user.getUsername(), users);
                    quantity.put(user.getUsername(), 1);
                }
            }
            HashMap<String, Integer> sorted = quantity
                    .entrySet()
                    .stream()
                    .sorted(Collections.reverseOrder(comparingByValue()))
                    .limit(10)
                    .collect(toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e2, LinkedHashMap::new));
            for(Map.Entry me : sorted.entrySet()) {
                String key = me.getKey().toString();
                data.put(key, map.get(key));
            }
            response.setStatus(200);
            response.setMessage("Stats Returned");
            response.setData(data);
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            response.setMessage("DB Connection Error");
        } finally {
            poolManager.returnConn(con);
        }
        return response;
    }

    public static Response<LinkedHashMap<Integer, ArrayList<User>>> usersByAge() {
        Response<LinkedHashMap<Integer, ArrayList<User>>> response = new Response<>();
        LinkedHashMap<Integer, ArrayList<User>> data = new LinkedHashMap<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getUsersByAge");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                User user = new User();
                user.setId(rs.getInt(1));
                user.setUsername(rs.getString(2));
                user.setName(rs.getString(3));
                user.setLastName(rs.getString(4));
                user.setBirthday(rs.getDate(5));
                user.setCreationTime(rs.getTimestamp(6));
                user.setSex(rs.getBoolean(7));
                int age = Period.between(user.getBirthday().toLocalDate(), LocalDate.now()).getYears();
                if(data.containsKey(age)) {
                    data.get(age).add(user);
                }
                else {
                    ArrayList<User> users = new ArrayList<>();
                    users.add(user);
                    data.put(age, users);
                }
            }
            response.setStatus(200);
            response.setMessage("Stats Returned");
            response.setData(data);
        } catch(SQLException e) {
            response.setStatus(500);
            response.setMessage("DB Connection Error");
        }
        finally {
            poolManager.returnConn(con);
        }
        return response;
    }

    public static Response<?> changeUserState(User user, boolean state) {
        Response<?> response = new Response<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("changeUserState");

        try {
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, user.getId());
            ps.setBoolean(2, state);

            if(ps.executeUpdate() == 1) {
                response.setMessage("User Updated");
            } else {
                response.setMessage("Couldn't update user");
            }
            response.setStatus(200);

        } catch(SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            response.setMessage("DB Connection Error");
        }

        return null;
    }

    public static Response<User> searchUser(String search) {

    }

    public static Response<Post> searchPosts(String search) {

    }

    public static Response<Comment> searchComments(String search) {

    }

    public static Response<?> deletePost(Post post) {
        Response<?> response = new Response<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("deletePost");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, post.getIdPost());
            ps.setInt(2, post.getIdPost());
            ps.setInt(3, post.getUser().getId());
            ps.setInt(4, post.getIdPost());
            int affectedRows = ps.executeUpdate();
            if(affectedRows == 0) {
                response.setMessage("Could not delete post");
                response.setStatus(200);
            } else {
                response.setMessage("Post deleted successfully");
                response.setStatus(200);
            }
        } catch(SQLException e) {
            e.printStackTrace();
            response.setMessage("DB Connection Error");
            response.setStatus(500);
        }
        finally {
            poolManager.returnConn(con);
        }
        return response;
    }

    public static Response<?> deleteComment(Comment comment) {
        Response<?> response = new Response<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("deleteComment");

        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, comment.getUserId());
            ps.setInt(2, comment.getCommentId());

            ps.execute();
            response.setStatus(200);
            response.setMessage("Comment Deleted");

        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            response.setMessage("DB Connection Error");
        }
        finally {
            poolManager.returnConn(con);
        }
        return response;
    }

}
