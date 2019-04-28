package models;

import java.util.ArrayList;

public class TypePost {
    private ArrayList<Post> audioPosts;
    private ArrayList<Post> videoPosts;
    private ArrayList<Post> textPosts;
    private ArrayList<Post> imagePosts;

    public ArrayList<Post> getAudioPosts() {
        return audioPosts;
    }

    public ArrayList<Post> getImagePosts() {
        return imagePosts;
    }

    public ArrayList<Post> getTextPosts() {
        return textPosts;
    }

    public ArrayList<Post> getVideoPosts() {
        return videoPosts;
    }

    public void setAudioPosts(ArrayList<Post> audioPosts) {
        this.audioPosts = audioPosts;
    }

    public void setImagePosts(ArrayList<Post> imagePosts) {
        this.imagePosts = imagePosts;
    }

    public void setTextPosts(ArrayList<Post> textPosts) {
        this.textPosts = textPosts;
    }

    public void setVideoPosts(ArrayList<Post> videoPosts) {
        this.videoPosts = videoPosts;
    }
}
