package servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import handlers.SessionHandler;
import models.Response;
import models.User;
import utilities.Encryptor;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

/**
 * @author Ptthappy
 */

@WebServlet(urlPatterns = "/edit", name = "User Editor Servlet")
public class EditUserServlet extends HttpServlet {

	public EditUserServlet() {
		super();
	}

	//Servlet para la edición del usuario. Antes de editar los datos del usuario, deberá pedirse contraseña.
	//Cuando esta se pida, el servidor va a enviar la clave al servlet de SessionServlet. El cliente debe encargarse
	//de enviar correctamente el username
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String json = req.getReader().lines().collect(Collectors.joining());
		User user = mapper.readValue(json, User.class);

		Response<User> response = SessionHandler.modifyUser(user);
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

	}

}
