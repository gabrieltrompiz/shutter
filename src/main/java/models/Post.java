package models;

import java.sql.Timestamp;

/**
 * @author Ptthappy
 */


public class Post {
	private Integer typePost;
	private String postText;
	private String url;
	private Timestamp creationTime;
	private String username;
	private String name;
	private String lastname;

	//Setters
	public void setTypePost(Integer typePost) { this.typePost = typePost; }

	public void setCreationTime(Timestamp creationTime) { this.creationTime = creationTime; }

	public void setPostText(String postText) { this.postText = postText; }

	public void setUrl(String url) { this.url = url; }

	public void setLastname(String lastname) { this.lastname = lastname; }

	public void setName(String name) { this.name = name; }

	public void setUsername(String username) { this.username = username; }

	//Getters
	public Integer getTypePost() { return typePost; }

	public String getPostText() { return postText; }

	public String getLastname() { return lastname; }

	public String getName() { return name; }

	public String getUrl() { return url; }

	public String getUsername() { return username; }

	public Timestamp getCreationTime() { return creationTime; }
}
