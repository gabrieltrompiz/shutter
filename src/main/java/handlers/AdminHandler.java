package handlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.*;
import utilities.PoolManager;
import utilities.PropertiesReader;

import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class AdminHandler {
    private static PoolManager poolManager = PoolManager.getPoolManager();
    private static PropertiesReader prop = PropertiesReader.getInstance();


    public static Response<TypePost> postsByType() {
        Response<TypePost> response = new Response<>();
        ArrayList<Post> audioPosts = new ArrayList<>();
        ArrayList<Post> textPosts = new ArrayList<>();
        ArrayList<Post> videoPosts = new ArrayList<>();
        ArrayList<Post> imagePosts = new ArrayList<>();
        TypePost tp = new TypePost();
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
            tp.setAudioPosts(audioPosts);
            tp.setImagePosts(imagePosts);
            tp.setTextPosts(textPosts);
            tp.setVideoPosts(videoPosts);
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

    public static Response<UserGenre> usersByGenre() {
        Response<UserGenre> response = new Response<>();
        ArrayList<User> male = new ArrayList<>();
        ArrayList<User> female = new ArrayList<>();
        UserGenre ug = new UserGenre();
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
                user.setEnabled(rs.getBoolean(8));
                if(user.getSex()) { male.add(user); }
                else { female.add(user); }
            }
            response.setStatus(200);
            response.setMessage("Stats returned.");
            ug.setFemale(female);
            ug.setMale(male);
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
}
