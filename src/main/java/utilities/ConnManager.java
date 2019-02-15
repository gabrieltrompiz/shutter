package utilities;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConnManager {

  private static PropertiesReader prop = PropertiesReader.getInstance();
  private static Connection connection = null;

  public static Connection getConnection() {
    try {
      Class.forName(prop.getValue("dbDriver"));
      connection = DriverManager.getConnection(prop.getValue("dbUrl"), prop.getValue("dbUser"), prop.getValue("dbPassword"));
    } catch (Exception e) {
      e.printStackTrace();
    }
    return connection;
  }

  public static void closeConnection() {
    try{
      connection.close();
    }
    catch(SQLException e) {
      e.printStackTrace();
    }
  }
}
