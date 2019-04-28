package filters;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = "/*", filterName = "CORS Filter")
public class CORSFilter implements Filter {
  @Override
  public void init(FilterConfig filterConfig) {}

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    ((HttpServletResponse) response).addHeader("Access-Control-Allow-Origin", ((HttpServletRequest) request).getHeader("origin"));
    ((HttpServletResponse) response).addHeader("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS ");
    ((HttpServletResponse) response).addHeader("Access-Control-Allow-Headers",  "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
    ((HttpServletResponse) response).addHeader("Access-Control-Allow-Credentials", "true");
    chain.doFilter(request, response);
  }

  @Override
  public void destroy() {

  }
}
