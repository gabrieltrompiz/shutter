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

@WebServlet(urlPatterns = "edit", name = "User Editor Servlet")
public class EditUserServlet extends HttpServlet {

	public EditUserServlet() {
		super();
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

	}

	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

	}

}
