package models;

import java.sql.Timestamp;

/**
 * @author Ptthappy
 */


public class Notification {
	private Integer notificationId;
	private Integer notificationSender;
	private Integer notificationReceiver;
	private Timestamp notificationDate;
	private Integer typeNotificationId;
	private User user;

	//Getters
	public Integer getNotificationId() {
		return notificationId;
	}

	public Integer getNotificationSender() {
		return notificationSender;
	}

	public Integer getNotificationReceiver() {
		return notificationReceiver;
	}

	public Timestamp getNotificationDate() {
		return notificationDate;
	}

	public Integer getTypeNotificationId() {
		return typeNotificationId;
	}

	public User getUser() {
		return user;
	}

	//Setters
	public void setNotificationId(Integer notificationId) {
		this.notificationId = notificationId;
	}

	public void setNotificationSender(Integer notificationSender) {
		this.notificationSender = notificationSender;
	}

	public void setNotificationReceiver(Integer notificationReceiver) {
		this.notificationReceiver = notificationReceiver;
	}

	public void setNotificationDate(Timestamp notificationDate) {
		this.notificationDate = notificationDate;
	}

	public void setTypeNotificationId(Integer typeNotificationId) {
		this.typeNotificationId = typeNotificationId;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
