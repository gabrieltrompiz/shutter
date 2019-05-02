package models;

import java.sql.Date;

public class Report {
    private Integer reportId;
    private Integer sender;
    private Integer target;
    private Integer typeReport;
    private Date date;
    private String message;
    private Boolean resolved;
    private User user;
    private Post post;
    private Comment comment;

    public Date getDate() {
        return date;
    }

    public Boolean getResolved() {
        return resolved;
    }

    public Integer getReportId() {
        return reportId;
    }

    public Integer getSender() {
        return sender;
    }

    public Integer getTarget() {
        return target;
    }

    public Integer getTypeReport() {
        return typeReport;
    }

    public String getMessage() {
        return message;
    }

    public User getUser() { return user; }

    public Comment getComment() {
        return comment;
    }

    public Post getPost() {
        return post;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setReportId(Integer reportId) {
        this.reportId = reportId;
    }

    public void setResolved(Boolean resolved) {
        this.resolved = resolved;
    }

    public void setSender(Integer sender) {
        this.sender = sender;
    }

    public void setTarget(Integer target) {
        this.target = target;
    }

    public void setTypeReport(Integer typeReport) {
        this.typeReport = typeReport;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
