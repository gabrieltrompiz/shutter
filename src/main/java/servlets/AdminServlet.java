package servlets;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import handlers.AdminHandler;
import models.Response;
import models.TypePost;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@JsonInclude(JsonInclude.Include.NON_NULL)
@WebServlet(urlPatterns = "/admin")
public class AdminServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        Response<?> response = new Response<>();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        if(Integer.parseInt(req.getSession(false).getAttribute("type").toString()) != 2) {
            response.setStatus(403);
            response.setMessage("Forbidden. Only admins allowed.");
            resp.getWriter().print(mapper.writeValueAsString(response));
        }
        String choice = req.getParameter("stat");
        switch(choice) {
            case "postsByType":
                response = AdminHandler.postsByType();
                break;
            case "usersByGenre":
                response = AdminHandler.usersByGenre();
                break;
            case "usersByPosts": break;
            case "usersByFriends": break;
            case "usersByAge": break;
        }
        resp.setStatus(response.getStatus());
        resp.getWriter().print(mapper.writeValueAsString(response));
    }
}
