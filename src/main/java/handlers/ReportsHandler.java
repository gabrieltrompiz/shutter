package handlers;

import models.Comment;
import models.Post;
import models.Report;
import models.User;
import utilities.PoolManager;
import utilities.PropertiesReader;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ReportsHandler {
    private static PoolManager poolManager = PoolManager.getPoolManager();
    private static PropertiesReader prop = PropertiesReader.getInstance();

    public static ArrayList<Report> getReports() {
        ArrayList<Report> reports = new ArrayList<>();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getReports");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Report report = new Report();
                User user = new User();
                report.setReportId(rs.getInt(1));
                report.setSender(rs.getInt(2));
                report.setTarget(rs.getInt((3)));
                report.setTypeReport(rs.getInt(4));
                report.setDate(rs.getDate(5));
                report.setMessage(rs.getString(6));
                report.setResolved(rs.getBoolean(7));
                user.setId(report.getSender());
                user.setUsername(rs.getString(8));
                user.setName(rs.getString(9));
                user.setLastName(rs.getString(10));
                if(report.getTypeReport() == 1) {
                    report.setPost(getPost(report.getTarget()));
                }
                else if(report.getTypeReport() == 2) {
                    report.setComment(getComment(report.getTarget()));
                }
                report.setUser(user);
                reports.add(report);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            poolManager.returnConn(con);
        }
        return reports;
    }

    public static void addReport(Report report) {
        Connection con = poolManager.getConn();
        String query = prop.getValue("addReport");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, report.getSender());
            ps.setInt(2, report.getTarget());
            ps.setInt(3, report.getTypeReport());
            ps.setString(4, report.getMessage());
            ps.execute();
        } catch(SQLException e) {
            e.printStackTrace();
        } finally {
            poolManager.returnConn(con);
        }
    }

    public static void setResolved(int id) {
        Connection con = poolManager.getConn();
        String query = prop.getValue("setResolved");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, id);
            ps.execute();
        } catch(SQLException e) {
            e.printStackTrace();
        } finally {
            poolManager.returnConn(con);
        }
    }

    private static Comment getComment(int target) {
        Comment comment = new Comment();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getSingleComment");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, target);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                User user = new User();
                comment.setCommentId(rs.getInt(1));
                comment.setCommentText(rs.getString(2));
                user.setId(rs.getInt(4));
                user.setUsername(rs.getString(6));
                user.setName(rs.getString(7));
                user.setLastName(rs.getString(8));
                comment.setUser(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            poolManager.returnConn(con);
        }
        return comment;
    }

    private static Post getPost(int target) {
        Post post = new Post();
        Connection con = poolManager.getConn();
        String query = prop.getValue("getSinglePost");
        try {
            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, target);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                User user = new User();
                post.setIdPost(rs.getInt(1));
                user.setId(rs.getInt(2));
                post.setTypePost(rs.getInt(3));
                post.setCreationTime(rs.getTimestamp(5));
                user.setUsername(rs.getString(6));
                user.setName(rs.getString(7));
                user.setLastName(rs.getString(8));
                post.setUser(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            poolManager.returnConn(con);
        }
        return post;
    }
}
