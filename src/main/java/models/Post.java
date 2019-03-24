package models;

import java.sql.Timestamp;

/**
 * @author Ptthappy
 */


public class Post {
	private Integer idPost;
	private Integer typePost;
	private String postText;
	private String url;
	private Timestamp creationTime;
	private User user;

	//Setters
	public void setIdPost(Integer idPost) { this.idPost = idPost; }

	public void setTypePost(Integer typePost) { this.typePost = typePost; }

	public void setCreationTime(Timestamp creationTime) { this.creationTime = creationTime; }

	public void setPostText(String postText) { this.postText = postText; }

	public void setUrl(String url) { this.url = url; }

	public void setUser(User user) { this.user = user; }

	//Getters
	public Integer getIdPost() { return idPost; }

	public Integer getTypePost() { return typePost; }

	public Timestamp getCreationTime() { return creationTime; }

	public String getPostText() { return postText; }

	public String getUrl() { return url; }

	public User getUser() { return user; }
}
