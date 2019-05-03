package servlets;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import handlers.UserHandler;
import models.Response;
import models.User;
import utilities.Encryptor;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.stream.Collectors;

@JsonInclude(JsonInclude.Include.NON_NULL)
@WebServlet(urlPatterns = "/register", name = "Register Servlet")
public class RegisterServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  /*Servlet para registrar usuario*/
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    ObjectMapper mapper = new ObjectMapper();
    String json =  req.getReader().lines().collect(Collectors.joining());
    User user = mapper.readValue(json, User.class);
    user.setPassword(Encryptor.getSHA256(user.getPassword(), user.getLowercaseUsername()));
    Response<User> response = UserHandler.register(user);
    if(response.getStatus() == 200) {
        InputStream is = new FileInputStream(System.getenv("SystemDrive") + "/web2p1/assets/avatars/def.png");;
        OutputStream out = new FileOutputStream(System.getenv("SystemDrive") + "/web2p1/assets/avatars/" + user.getLowercaseUsername() + ".png");;
        int read = 0;
        byte[] bytes = new byte[1024];
        while((read = is.read(bytes)) > 0) {
            out.write(bytes, 0, read);
        }
        HttpSession session = req.getSession(true);
        session.setAttribute("user_id", user.getId());
        session.setAttribute("username", user.getLowercaseUsername());
        session.setAttribute("type", user.getTypeId()   );
        is.close();
        out.close();
	}
    res.setStatus(response.getStatus());
    mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    res.getWriter().print(mapper.writeValueAsString(response));
  }
}






