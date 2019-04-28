package models;

import java.util.ArrayList;

public class UserGenre {
    private ArrayList<User> male;
    private ArrayList<User> female;

    public ArrayList<User> getMale() {
        return male;
    }

    public ArrayList<User> getFemale() {
        return female;
    }

    public void setMale(ArrayList<User> male) {
        this.male = male;
    }

    public void setFemale(ArrayList<User> female) {
        this.female = female;
    }
}
