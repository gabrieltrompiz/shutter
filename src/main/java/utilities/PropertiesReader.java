package utilities;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesReader {
    private static PropertiesReader propr = new PropertiesReader();
    private Properties prop = new Properties();
    private InputStream input = null;

    private PropertiesReader() {
        try {
            input = getClass().getClassLoader().getResourceAsStream("connection.properties");
            prop.load(input);
        } catch (IOException ex) {
            ex.printStackTrace();
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static PropertiesReader getInstance() {
        return propr;
    }

    public String getValue(String key) {
        return prop.getProperty(key);
    }
}
