package servlets;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.Post;
import models.Response;
import models.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.*;
import java.nio.file.Path;
import java.util.Collection;
import java.util.stream.Collectors;

@MultipartConfig
@WebServlet(urlPatterns = "/files", name = "File Upload Servlet")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FilesServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("image/png");
        resp.addHeader("Accept-Ranges", "bytes");
        String target = System.getenv("SystemDrive");
        if(req.getParameter("type").equalsIgnoreCase("avatar"))
            target += "/web2p1/assets/avatars/";
        else if(req.getParameter("type").equalsIgnoreCase("post"))
            target += "/web2p1/assets/users/" + req.getSession(false).getAttribute("username") + "/" + req.getParameter("id") + "/";
        FileInputStream fileObj = null;
        OutputStream out = resp.getOutputStream();
        try {
            fileObj = new FileInputStream(target + req.getParameter("file"));
            resp.setHeader("Content-Length", Long.toString(fileObj.getChannel().size()));
            int read = 0;
            byte[] bytes = new byte[1024];
            while ((read = fileObj.read(bytes)) != -1) {
                out.write(bytes, 0, read);
            }
            fileObj.close();
            out.close();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        Response<?> response = new Response<>();
        Collection<Part> files = req.getParts();
        int typePost = Integer.parseInt(req.getParameter("typePost"));
        String id = req.getParameter("id");
        String extension = typePost == 2 ? ".png" : typePost == 3 ? ".mkv" : ".flac";
        InputStream fileContent = null;
        OutputStream out = null;
        File fileObj = null;
        try {
        String baseDir = System.getenv("SystemDrive") + "/web2p1/assets/users/" + req.getSession(false).getAttribute("username") +
            "/" + id + "/";
            int i = 0;
            for (Part file : files) {
                i++;
                fileContent = file.getInputStream();
                fileObj = new File(baseDir + i + extension);
                System.out.println(baseDir + i + extension);
                fileObj.getParentFile().mkdirs();
                out = new FileOutputStream(fileObj);
                int read = 0;
                byte[] bytes = new byte[1024];
                while ((read = fileContent.read(bytes)) != -1) {
                    out.write(bytes, 0, read);
                }
                fileContent.close();
                out.close();
                response.setStatus(200);
                response.setMessage("Uploaded files successfully.");
            }
        }
        catch(Exception e) {
            e.printStackTrace();
            response.setStatus(500);
            response.setMessage("Error uploading files");
        }
        resp.getWriter().print(mapper.writeValueAsString(response));
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        Response<?> response = new Response<>();
        Part file = req.getPart("file");
        System.out.println(file);
        InputStream fileContent = null;
        OutputStream out = null;
        File fileObj = null;
        try {
            String baseDir = System.getenv("SystemDrive") + "/web2p1/assets/avatars/";
            fileContent = file.getInputStream();
            fileObj = new File(baseDir + req.getSession(false).getAttribute("username") + ".png");
            fileObj.getParentFile().mkdirs();
            out = new FileOutputStream(fileObj);
            int read = 0;
            byte[] bytes = new byte[1024];
            while ((read = fileContent.read(bytes)) != -1) {
                out.write(bytes, 0, read);
            }
            fileContent.close();
            out.close();
            response.setStatus(200);
            response.setMessage("Uploaded file successfully.");
        }
        catch (Exception e) {
            e.printStackTrace();
            response.setStatus(500);
            response.setMessage("Error uploading file.");
        }
        resp.getWriter().print(mapper.writeValueAsString(response));
    }
}
