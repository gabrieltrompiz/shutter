package models;

/**
 * @author Ptthappy
 */

public class Comment {
	private Integer comment_id;
	private Integer user_id;
	private Integer post_id;
	private String comment_text;
	private String comment_url;
	//Setters
	public void setComment_id(Integer comment_id) {
		this.comment_id = comment_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}

	public void setPost_id(Integer post_id) {
		this.post_id = post_id;
	}

	public void setComment_text(String comment_text) {
		this.comment_text = comment_text;
	}

	public void setComment_url(String comment_url) {
		this.comment_url = comment_url;
	}

	//Getters
	public Integer getComment_id() {
		return comment_id;
	}

	public Integer getUser_id() {
		return user_id;
	}

	public Integer getPost_id() {
		return post_id;
	}

	public String getComment_text() {
		return comment_text;
	}

	public String getComment_url() {
		return comment_url;
	}
}
