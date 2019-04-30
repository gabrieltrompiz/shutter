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
import models.Response;
import models.User;

@JsonInclude(JsonInclude.Include.NON_NULL)
@WebServlet(urlPatterns = "/search", name = "User Searcher")
public class AdminSearchServlet extends HttpServlet {

    //Esta vaina puede buscar tanto a users en la lista de amigos como users de todos lados dependiendo del param
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        Response<ArrayList<User>> response;
        String search = req.getParameter("search");

        switch(req.getParameter("filter")) {
            case "users":
                response = AdminHandler.searchUsers(search);
                break;

            case "posts":
                response = AdminHandler.searchPosts(search);
                break;

            case "comments":
                response = AdminHandler.searchComments(search);
                break;

            default:

        }

        response = UserHandler.searchUsers(search);

        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        resp.getWriter().print(mapper.writeValueAsString(response));
    }
}