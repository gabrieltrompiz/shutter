package servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import handlers.UserHandler;
import handlers.AdminHandler;
import models.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@WebServlet(urlPatterns = "/adminSearch", name = "Special Admin Searcher")
public class AdminMessageServlet extends HttpServlet {

    //Esta vaina puede buscar tanto a users en la lista de amigos como users de todos lados dependiendo del param
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        String json = req.getReader().lines().collect(Collectors.joining());
        Mail mail = mapper.readValue(json, Mail.class);

        AdminHandler.sendMessage(mail.getUsername(), mail.getMessage());
    }

}