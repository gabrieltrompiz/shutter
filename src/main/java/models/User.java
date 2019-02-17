package models;

import java.sql.Date;
import java.sql.Timestamp;

public class User {
  private String username;
  private String lowercaseUsername;
  private String password;
  private String name;
  private String lastName;
  private String email;
  private Date birthday;
  private Timestamp creationTime;
  private String avatar;
  private int typeId;
  private boolean sex;
  private boolean enabled;


  public String getPassword() {
    return password;
  }

  public String getUsername() {
    return username;
  }

  public String getLowercaseUsername() { return lowercaseUsername; }

  public int getTypeId() {
    return typeId;
  }

  public String getName() {
    return name;
  }

  public Date getBirthday() {
    return birthday;
  }

  public Timestamp getCreationTime() {
    return creationTime;
  }

  public String getAvatar() {
    return avatar;
  }

  public String getEmail() {
    return email;
  }

  public String getLastName() {
    return lastName;
  }

  public boolean getSex() {
    return sex;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setLowercaseUsername(String lowercaseUsername) { this.lowercaseUsername = lowercaseUsername; }

  public void setAvatar(String avatar) {
    this.avatar = avatar;
  }

  public void setBirthday(Date birthday) {
    this.birthday = birthday;
  }

  public void setCreationTime(Timestamp creationTime) {
    this.creationTime = creationTime;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public void setTypeId(int typeId) {
    this.typeId = typeId;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setSex(boolean sex) {
    this.sex = sex;
  }
}

