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
@WebServlet(urlPatterns = "/adminSearch", name = "Special Admin Searcher")
public class AdminSearchServlet extends HttpServlet {

   //Esta vaina puede buscar tanto a users en la lista de amigos como users de todos lados dependiendo del param
   @Override
   protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       ObjectMapper mapper = new ObjectMapper();
       String search = req.getParameter("search");
       String filter = req.getParameter("filter");

       switch(filter) {
           case "users":
               Response<ArrayList<User>> response1 = AdminHandler.searchUsers(search);
               this.respond(response1, resp, mapper);
               break;

           case "posts":
               Response<ArrayList<Post>> response2 = AdminHandler.searchPosts(search);
               this.respond(response2, resp, mapper);
               break;

           case "comments":
               Response<ArrayList<Comment>> response3 = AdminHandler.searchComments(search);
               this.respond(response3, resp, mapper);
               break;

           default:
               Response<?> response4 = new Response<>();
           		response4.setStatus(404);
           		response4.setMessage("The resource specified doesn't exist");
               this.respond(response4, resp, mapper);
       }

       mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
   }

   private void respond(Response response, HttpServletResponse resp, ObjectMapper mapper) throws IOException {
       resp.getWriter().print(mapper.writeValueAsString(response));
   }
}