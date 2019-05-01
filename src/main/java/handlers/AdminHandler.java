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

@SuppressWarnings("Duplicates")
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
            tp.put("textPosts", textPosts);
            tp.put("audioPosts", audioPosts);
            tp.put("videoPosts", videoPosts);
            tp.put("imagePosts", imagePosts);
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

    public static Response<ArrayList<Post>> postsByLikes() {
        Response<ArrayList<Post>> response = new Response<>();
        ArrayList<Post> data = new ArrayList<>();
        HashMap<Integer, Integer> unsorted = new HashMap<>();
        HashMap<Integer, Post> posts = new HashMap<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getAllPosts");
        try {
            PreparedStatement ps1 = con.prepareStatement(query);
            ResultSet rs1 = ps1.executeQuery();
            while(rs1.next()) {
                Post post = new Post();
                User user = new User();
                post.setIdPost(rs1.getInt(1));
                post.setTypePost(rs1.getInt(2));
                post.setPostText(rs1.getString(3));
                post.setCreationTime(rs1.getTimestamp(4));
                user.setUsername(rs1.getString(5));
                user.setName(rs1.getString(6));
                user.setLastName(rs1.getString(7));
                user.setId(rs1.getInt(8));
                post.setComments(null);
                post.setUser(user);
                post.setLikes(getLikes(post.getIdPost(), con));
                unsorted.put(post.getIdPost(), post.getLikes().size());
                posts.put(post.getIdPost(), post);
            }
            HashMap<Integer, Integer> sorted = unsorted
                    .entrySet()
                    .stream()
                    .sorted(Collections.reverseOrder(comparingByValue()))
                    .limit(10)
                    .collect(toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e2, LinkedHashMap::new));
            for(Map.Entry me : sorted.entrySet()) {
                data.add(posts.get(me.getKey()));
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

    public static Response<ArrayList<Post>> postsByComments() {
        Response<ArrayList<Post>> response = new Response<>();
        ArrayList<Post> data = new ArrayList<>();
        HashMap<Integer, Integer> unsorted = new HashMap<>();
        HashMap<Integer, Post> posts = new HashMap<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getAllPosts");
        try {
            PreparedStatement ps1 = con.prepareStatement(query);
            ResultSet rs1 = ps1.executeQuery();
            while(rs1.next()) {
                Post post = new Post();
                User user = new User();
                post.setIdPost(rs1.getInt(1));
                post.setTypePost(rs1.getInt(2));
                post.setPostText(rs1.getString(3));
                post.setCreationTime(rs1.getTimestamp(4));
                user.setUsername(rs1.getString(5));
                user.setName(rs1.getString(6));
                user.setLastName(rs1.getString(7));
                user.setId(rs1.getInt(8));
                post.setLikes(null);
                post.setUser(user);
                post.setComments(getComments(post.getIdPost(), con));
                unsorted.put(post.getIdPost(), post.getComments().size());
                posts.put(post.getIdPost(), post);
            }
            HashMap<Integer, Integer> sorted = unsorted
                    .entrySet()
                    .stream()
                    .sorted(Collections.reverseOrder(comparingByValue()))
                    .limit(10)
                    .collect(toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e2, LinkedHashMap::new));
            for(Map.Entry me : sorted.entrySet()) {
                data.add(posts.get(me.getKey()));
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

    private static ArrayList<Like> getLikes(int post_id, Connection con) {
        ArrayList<Like> likes = new ArrayList<>();
        String query = prop.getValue("getLikes");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, post_id);

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                User user = new User();
                Like like = new Like();
                like.setLikeId(rs.getInt(1));
                like.setUserId(rs.getInt(2));
                like.setTypeLikeId(rs.getInt(3));
                user.setId(like.getUserId());
                user.setUsername(rs.getString(4));
                user.setName(rs.getString(5));
                user.setLastName(rs.getString(6));
                like.setUser(user);
                likes.add(like);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
        return likes;
    }

    private static ArrayList<Comment> getComments(int post_id, Connection con) {
        ArrayList<Comment> comments = new ArrayList<>();
        String query = prop.getValue("getComments");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, post_id);

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Comment comment = new Comment();
                User user = new User();
                comment.setCommentId(rs.getInt(1));
                comment.setCommentText(rs.getString(2));
                comment.setCommentUrl(rs.getString(3));
                comment.setUserId(rs.getInt(4));
                user.setUsername(rs.getString(5));
                user.setName(rs.getString(6));
                user.setLastName(rs.getString(7));
                comment.setUser(user);

                comments.add(comment);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
        finally {
            poolManager.returnConn(con);
        }

        return comments;
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

    public static Response<ArrayList<User>> searchUsers(String search) {
        Response<ArrayList<User>> response = new Response<>();
        ArrayList<User> users = new ArrayList<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("searchUsersAdmin");
        try {
            PreparedStatement ps = con.prepareStatement(query);

            ps.setString(1, "%" + search + "%");
            ps.setString(2, "%" + search + "%");
            ps.setString(3, "%" + search + "%");
            ps.setString(4, "%" + search + "%");

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                User user = new User();
                user.setId(rs.getInt(1));
                user.setUsername(rs.getString(2));
                user.setName(rs.getString(3));
                user.setLastName(rs.getString(4));
                user.setAvatar(rs.getString(5));
                user.setBirthday(rs.getDate(6));
                user.setEnabled(rs.getBoolean(7));
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

    public static Response<ArrayList<Post>> searchPosts(String search) {
        Response<ArrayList<Post>> response = new Response<>();
        ArrayList<Post> posts = new ArrayList<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getPostsByContent");
        try {
            PreparedStatement ps = con.prepareStatement(query);

            ps.setString(1, "%" + search + "%");

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Post post = new Post();
                User user = new User();
                post.setIdPost(rs.getInt(1));
                user.setId(rs.getInt(2));
                post.setTypePost(rs.getInt(3));
                post.setPostText(rs.getString(4));
                post.setUrl(rs.getString(5));
                post.setCreationTime(rs.getTimestamp(6));
                user.setUsername(rs.getString(7));
                user.setName(rs.getString(8));
                user.setLastName(rs.getString(9));
                user.setAvatar(rs.getString(10));

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

    public static Response<ArrayList<Comment>> searchComments(String search) {
        Response<ArrayList<Comment>> response = new Response<>();
        ArrayList<Comment> comments = new ArrayList<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getCommentsByContent");
        try {
            PreparedStatement ps = con.prepareStatement(query);

            ps.setString(1, "%" + search + "%");

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {

                Comment comment = new Comment();
                User user = new User();
                comment.setCommentId(rs.getInt(1));
                comment.setCommentText(rs.getString(2));
                comment.setCommentUrl(rs.getString(3));
                comment.setUserId(rs.getInt(4));
                user.setUsername(rs.getString(5));
                user.setName(rs.getString(6));
                user.setLastName(rs.getString(7));
                comment.setUser(user);

                comments.add(comment);
            }
            response.setStatus(200);
            response.setMessage("Comments Returned");
            response.setData(comments);

        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            response.setMessage("DB Connection Error");
        } finally {
            poolManager.returnConn(con);
        }

        return response;
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
