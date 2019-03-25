package filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.Response;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter(urlPatterns = {"/logout", "/edit", "/friends"}, filterName = "Session Filter")
public class SessionFilter implements Filter {
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
        if (session != null || request.getMethod().equals("OPTIONS")) {
            chain.doFilter(req, resp);
        } else {
            responseObject.setMessage("Not Logged In");
            responseObject.setStatus(403);
            response.setStatus(403);
            response.getWriter().print(mapper.writeValueAsString(responseObject));
        }
    }
}
