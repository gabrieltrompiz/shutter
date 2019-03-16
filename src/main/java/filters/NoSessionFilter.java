package filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.Response;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter(urlPatterns = {"/login", "/register"}, filterName = "No Session Filter")
public class NoSessionFilter implements Filter {
	@Override
	public void destroy() {}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;
		HttpSession session = request.getSession(false);

		if(session == null || request.getMethod().equals("OPTIONS")) {
			chain.doFilter(req, resp);
		} else {
			ObjectMapper mapper = new ObjectMapper();
			Response<?> responseObject = new Response<>();
			responseObject.setMessage("Already Logged In");
			responseObject.setStatus(403);
			response.setStatus(403);
			response.getWriter().print(mapper.writeValueAsString(responseObject));
		}
	}
}
