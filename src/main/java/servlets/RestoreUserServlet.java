package servlets;

import java.io.IOException;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import models.User;

/**
 * @author Ptthappy
 */

@WebServlet(urlPatterns = "/restoreUser", name = "Restore User Servlet")
public class RestoreUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	//Se supone que este servlet se usará para reestablecer la contraseña
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
	}
}
