package filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.Response;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebFilter(urlPatterns = "/login", filterName = "Login Filter")
public class LoginFilter implements Filter {

  @Override
  public void destroy() {}

  @Override
  public void init(FilterConfig filterConfig) {}

  @Override
  public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
    ObjectMapper mapper = new ObjectMapper();
    Response<?> responseObject = new Response<>();
    HttpServletRequest request = (HttpServletRequest) req;
    HttpServletResponse response = (HttpServletResponse) resp;
    HttpSession session = request.getSession(false);
    System.out.println(session);
    if (session == null) {
      chain.doFilter(req, resp);
    }
    else {
      responseObject.setMessage("Already logged in");
      responseObject.setStatus(403);
      response.setStatus(403);
      response.getWriter().print(mapper.writeValueAsString(responseObject));
    }
  }
}
