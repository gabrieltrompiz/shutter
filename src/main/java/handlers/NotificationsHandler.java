package handlers;

import models.Notification;
import models.Response;
import models.User;
import utilities.PoolManager;
import utilities.PropertiesReader;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 * @author Ptthappy
 */


public class NotificationsHandler {
	private static PoolManager poolManager = PoolManager.getPoolManager();
	private static PropertiesReader prop = PropertiesReader.getInstance();

	public static Response<ArrayList<Notification>> getNotifications(int userId, int notCount) {
		Response<ArrayList<Notification>> response = new Response<>();
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
				not.setTypeNotificationId(rs.getInt(5));
				user.setUsername(rs.getString(6));
				user.setName(rs.getString(7));
				user.setLastName(rs.getString(8));
				not.setUser(user);

				notifications.add(not);
			}
			response.setStatus(200);
			response.setMessage("Notifications Returned");
			response.setData(notifications);
		} catch (SQLException e) {
			e.printStackTrace();
			response.setStatus(500);
			response.setMessage("Notifications Couldn't be Returned");
			response.setData(null);
		}
		poolManager.returnConn(con);
		return response;
	}

}
