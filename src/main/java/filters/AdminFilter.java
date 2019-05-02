package filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.Response;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter(urlPatterns = {"/adminSearch", "/admin", "/bans"}, filterName = "Session Filter")
public class AdminFilter implements Filter {
    @Override
    public void destroy() {}

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        ObjectMapper mapper = new ObjectMapper();
        HttpServletRequest request = (HttpServletRequest) req;
        if(Integer.parseInt(request.getSession(false).getAttribute("type").toString()) != 2) {
            Response<?> response = new Response<>();
            response.setStatus(403);
            response.setMessage("Forbidden. Only admins allowed.");
            res.getWriter().print(mapper.writeValueAsString(response));
        } else chain.doFilter(req, res);
    }
}
