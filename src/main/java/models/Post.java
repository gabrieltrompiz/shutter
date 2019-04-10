package models;

import java.sql.Timestamp;
import java.util.ArrayList;

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
	private ArrayList<Comment> comments;
	private ArrayList<Like> likes;
	private int fileCount;
	//Setters
	public void setIdPost(Integer idPost) { this.idPost = idPost; }

	public void setTypePost(Integer typePost) { this.typePost = typePost; }

	public void setCreationTime(Timestamp creationTime) { this.creationTime = creationTime; }

	public void setPostText(String postText) { this.postText = postText; }

	public void setUrl(String url) { this.url = url; }

	public void setUser(User user) { this.user = user; }

	public void setFileCount(int fileCount) { this.fileCount = fileCount; }

	public void setComments(ArrayList<Comment> comments) {
		this.comments = comments;
	}

	public void setLikes(ArrayList<Like> likes) {
		this.likes = likes;
	}

	//Getters
	public Integer getIdPost() { return idPost; }

	public Integer getTypePost() { return typePost; }

	public Timestamp getCreationTime() { return creationTime; }

	public String getPostText() { return postText; }

	public String getUrl() { return url; }

	public User getUser() { return user; }

	public int getFileCount() { return fileCount; }

	public ArrayList<Comment> getComments() {
		return comments;
	}

	public ArrayList<Like> getLikes() {
		return likes;
	}

	//Methods and Stuff
	public void addLike(Like like) {
		this.likes.add(like);
	}

	public void addComment(Comment comment) {
		this.comments.add(comment);
	}
}
