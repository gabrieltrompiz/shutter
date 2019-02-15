package utilities;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class ConnManager {

  public static Connection getConnection() {
    PropertiesReader prop = PropertiesReader.getInstance();
    Connection connection = null;
    try {
      Class.forName(prop.getValue("dbDriver"));
      connection = DriverManager.getConnection(prop.getValue("dbUrl"), prop.getValue("dbUser"), prop.getValue("dbPassword"));
    } catch (Exception e) {
      e.printStackTrace();
    }
    return connection;
  }
}
