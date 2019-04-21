package handlers;

import models.*;
import utilities.PoolManager;
import utilities.PropertiesReader;

import java.io.File;
import java.sql.*;
import java.util.ArrayList;

public class PostsHandler {
    private static PoolManager poolManager = PoolManager.getPoolManager();
    private static PropertiesReader prop = PropertiesReader.getInstance();

    public static Response<ArrayList<Post>> getPosts(int id, int from) {
        Response<ArrayList<Post>> response = new Response<>();
        ArrayList<Post> posts = new ArrayList<>();
        Connection con = poolManager.getConn();
        String query = from != 0 ? prop.getValue("getPosts") : prop.getValue("getPostsWithoutLimit");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, id);
            ps.setInt(2, id);
            ps.setInt(3, from);
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
                user.setId(rs.getInt(10));

                post.setLikes(getLikes(post.getIdPost(), con));
                post.setComments(getComments(post.getIdPost(), con));
                post.setFileCount(getFileCount(user.getUsername().toLowerCase(), post.getIdPost()));

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

    public static Response<Integer> addPost(Post post) {
        Response<Integer> response = new Response<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("addPost");
        try {
            PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, post.getUser().getId());
            ps.setInt(2, post.getTypePost());
            ps.setString(3, post.getPostText());
            ps.execute();
            response.setMessage("Added post successfully.");
            response.setStatus(200);
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            response.setData(rs.getInt(1));
        }
        catch (SQLException e) {
            e.printStackTrace();
            response.setMessage("Error while posting.");
            response.setStatus(500);
            response.setData(-1);
        }
        finally {
            poolManager.returnConn(con);
        }
        return response;
    }

    public static Response<ArrayList<Post>> getUserPosts(int username) {
        Response<ArrayList<Post>> response = new Response<>();
        ArrayList<Post> posts = new ArrayList<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getUserPosts");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, username);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Post post = new Post();
                post.setIdPost(rs.getInt(1));
                post.setTypePost(rs.getInt(2));
                post.setPostText(rs.getString(3));
                post.setUrl(rs.getString(4));
                post.setCreationTime(rs.getTimestamp(5));

                post.setLikes(getLikes(post.getIdPost(), con));
                post.setComments(getComments(post.getIdPost(), con));

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

    public static Response<String> deletePost(int userId, int postId) {
        Response<String> response = new Response<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("deletePost");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, postId);
            ps.setInt(2, postId);
            ps.setInt(3, userId);
            ps.setInt(4, postId);
            int affectedRows = ps.executeUpdate();
            if(affectedRows == 0) {
                response.setMessage("Could not delete post");
                response.setStatus(500);
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

    private static int getFileCount(String username, int id) {
        String baseDir = System.getenv("SystemDrive") + "/web2p1/assets/users/" + username + "/" + id + "/";
        int count;
        try {
            File file = new File(baseDir);
            count = file.listFiles().length;
        }
        catch(NullPointerException e) { count = 0; }
        return count;
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
}
