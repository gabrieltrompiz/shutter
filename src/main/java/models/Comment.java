package models;

/**
 * @author Ptthappy
 */

public class Comment {
	private Integer commentId;
	private Integer userId;
	private Integer postId;
	private String commentText;
	private String commentUrl;
	private User user;
	//Setters
	public void setCommentId(Integer commentId) {
		this.commentId = commentId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public void setPost_id(Integer postId) {
		this.postId = postId;
	}

	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}

	public void setCommentUrl(String commentUrl) {
		this.commentUrl = commentUrl;
	}

	public void setUser(User user) {
		this.user = user;
	}

	//Getters
	public Integer getCommentId() {
		return commentId;
	}

	public Integer getUserId() {
		return userId;
	}

	public Integer getPostId() {
		return postId;
	}

	public String getCommentText() {
		return commentText;
	}

	public String getCommentUrl() {
		return commentUrl;
	}

	public User getUser() {
		return user;
	}
}
