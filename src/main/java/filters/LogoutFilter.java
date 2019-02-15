package filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.Response;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter(urlPatterns = "/logout", filterName = "Logout Filter")
public class LogoutFilter implements Filter {
  @Override
  public void destroy() {}

  @Override
  public void init(FilterConfig filterConfig) throws ServletException {}

  @Override
  public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
    ObjectMapper mapper = new ObjectMapper();
    Response<?> responseObject = new Response<>();
    HttpServletRequest request = (HttpServletRequest) req;
    HttpServletResponse response = (HttpServletResponse) resp;
    HttpSession session = request.getSession(false);
    if(session != null) {
      chain.doFilter(req, resp);
    }
    else {
      responseObject.setStatus(401);
      responseObject.setMessage("Not Logged In");
      response.getWriter().print(mapper.writeValueAsString(responseObject));
    }
  }
}
