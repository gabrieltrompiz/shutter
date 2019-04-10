package models;

/**
 * @author Ptthappy
 */


public class Like {
	private Integer like_id;
	private Integer user_id;
	private Integer post_id;
	private Integer type_like_id;
	//Setters
	public void setLike_id(Integer like_id) {
		this.like_id = like_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}

	public void setPost_id(Integer post_id) {
		this.post_id = post_id;
	}

	public void setType_like_id(Integer type_like_id) {
		this.type_like_id = type_like_id;
	}

	//Getters
	public Integer getLike_id() {
		return like_id;
	}

	public Integer getUser_id() {
		return user_id;
	}

	public Integer getPost_id() {
		return post_id;
	}

	public Integer getType_like_id() {
		return type_like_id;
	}
}
