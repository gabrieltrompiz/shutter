package servlets;

import java.io.IOException;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import handlers.SessionHandler;
import models.Response;
import models.User;
import utilities.Encryptor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@WebServlet(urlPatterns = "/logout", name = "Logout Servlet")
public class LogoutServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		req.getSession().invalidate();
		Response<?> response = new Response<>();
		ObjectMapper mapper = new ObjectMapper();
		response.setStatus(200);
		response.setMessage("Session ended");
		mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		res.getWriter().print(mapper.writeValueAsString(response));
	}
}