package handlers;

import models.Notification;
import models.Response;
import models.User;
import utilities.PoolManager;
import utilities.PropertiesReader;

import java.sql.*;
import java.util.ArrayList;

/**
 * @author Ptthappy
 */


public class NotificationsHandler {
	private static PoolManager poolManager = PoolManager.getPoolManager();
	private static PropertiesReader prop = PropertiesReader.getInstance();

	public static ArrayList<Notification> getNotifications(int userId, int notCount) {
		ArrayList<Notification> notifications = new ArrayList<>();
		Connection con = poolManager.getConn();
		String query = prop.getValue("getNotifications");
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setInt(1, userId);
			ps.setInt(2, notCount);

			ResultSet rs = ps.executeQuery();

			while(rs.next()) {
				Notification not = new Notification();
				User user = new User();
				not.setNotificationId(rs.getInt(1));
				not.setNotificationSender(rs.getInt(2));
				not.setNotificationReceiver(rs.getInt(3));
				not.setNotificationDate(rs.getTimestamp(4));
				not.setNotificationAccepted(rs.getBoolean(5));
				if(rs.wasNull()) { not.setNotificationAccepted(null); }
				not.setTypeNotificationId(rs.getInt(6));
				user.setUsername(rs.getString(7));
				user.setName(rs.getString(8));
				user.setLastName(rs.getString(9));
				not.setUser(user);
				notifications.add(not);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		poolManager.returnConn(con);
		return notifications;
	}

	public static Notification addNotification(Notification notification) {
		Connection con = poolManager.getConn();
		String query = prop.getValue("insertNotification");
		try {
			PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
			ps.setInt(1, notification.getNotificationSender());
			ps.setInt(2, notification.getNotificationReceiver());
			ps.setInt(3, notification.getTypeNotificationId());
			ps.setObject(4, notification.getNotificationAccepted());
			ps.execute();
			ResultSet rs = ps.getGeneratedKeys();
			rs.next();
			notification.setNotificationId(rs.getInt(1));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		poolManager.returnConn(con);
		return notification;
	}

	public static void setAccepted(Boolean accepted, int receiverId, int senderId) {
		Connection con = poolManager.getConn();
		String query = prop.getValue("setAcceptedNotification");
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setBoolean(1, accepted);
			ps.setInt(2, senderId);
			ps.setInt(3, receiverId);
			ps.execute();
		} catch(SQLException e) {
			e.printStackTrace();
		}
		poolManager.returnConn(con);
	}
}
