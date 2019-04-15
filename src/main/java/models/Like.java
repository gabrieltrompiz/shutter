package models;

/**
 * @author Ptthappy
 */


public class Like {
	private Integer likeId;
	private Integer userId;
	private Integer postId;
	private Integer typeLikeId;
	//Setters
	public void setLikeId(Integer likeId) {
		this.likeId = likeId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public void setPostId(Integer postId) {
		this.postId = postId;
	}

	public void setTypeLikeId(Integer typeLikeId) {
		this.typeLikeId = typeLikeId;
	}

	//Getters
	public Integer getLikeId() {
		return likeId;
	}

	public Integer getUserId() {
		return userId;
	}

	public Integer getPostId() {
		return postId;
	}

	public Integer getTypeLikeId() {
		return typeLikeId;
	}
}
