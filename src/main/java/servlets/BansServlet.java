package servlets;

import java.io.IOException;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import handlers.UserHandler;
import handlers.AdminHandler;
import models.Comment;
import models.Post;
import models.Response;
import models.User;

@JsonInclude(JsonInclude.Include.NON_NULL)
@WebServlet(urlPatterns = "/bans", name = "Bans Manager Servlet")
public class BansServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        Response<?> response = new Response<>();
        String method = req.getParameter("method");
        int id = Integer.parseInt(req.getParameter("id"));
        System.out.println(method);
        System.out.println(id);

        switch(method) {
            case "banUser":
                response = AdminHandler.changeUserState(id, false);
                break;

            case "unbanUser":
                response = AdminHandler.changeUserState(id, true);
                break;

            case "post":
                response = AdminHandler.deletePost(id);
                break;

            case "comment":
                response = AdminHandler.deleteComment(id);
                break;

            default:
                response.setStatus(404);
                response.setMessage("The resource specified doesn't exist");
        }

        System.out.println(mapper.writeValueAsString(response));
        resp.getWriter().print(mapper.writeValueAsString(response));
    }

}