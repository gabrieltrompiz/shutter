package servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.Response;

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

@MultipartConfig
@WebServlet(urlPatterns = "/files", name = "File Upload Servlet")
public class FilesServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        Response<?> response = new Response<>();
        resp.setContentType("image/png");
        resp.addHeader("Accept-Ranges", "bytes");
        String target = System.getenv("SystemDrive");
        if(req.getParameter("type").equalsIgnoreCase("avatar"))
            target += "/web2p1/assets/avatars/";
        else if(req.getParameter("type").equalsIgnoreCase("post"))
            target += "/web2p1/assets/posts/";
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
            out.flush();
        }
        catch (Exception e) {
            e.printStackTrace();
            response.setStatus(500);
            response.setMessage("Error getting photo.");
        }
        finally {
            response.setStatus(200);
            response.setMessage("Photo sent successfully.");
        }
        resp.getWriter().print(mapper.writeValueAsString(response));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        Response<?>  response = new Response<>();
        Collection<Part> files = req.getParts();
        InputStream fileContent = null;
        OutputStream out = null;
        File fileObj = null;
        try {
            String baseDir = System.getenv("SystemDrive") + "web2p1/assets/users/" + req.getParameter("user") + "/"; // TODO: Agreagar filtro
            for (Part file : files) {
                fileContent = file.getInputStream();
                fileObj = new File(baseDir + this.getFileName(file));
                fileObj.getParentFile().mkdirs();
                out = new FileOutputStream(fileObj);
                int read = 0;
                byte[] bytes = new byte[1024];
                while ((read = fileContent.read(bytes)) != -1) {
                    out.write(bytes, 0, read);
                }
                fileContent.close();
                out.close();
            }
        }
        catch(Exception e) {
            e.printStackTrace();
            response.setStatus(500);
            response.setMessage("Error uploading files.");
        }
        finally {
            response.setStatus(200);
            response.setMessage("File(s) uploaded successfully.");
        }
        resp.getWriter().print(mapper.writeValueAsString(response));
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        Response<?> response = new Response<>();
        Part file = req.getPart("file");
        InputStream fileContent = null;
        OutputStream out = null;
        File fileObj = null;
        try {
            String baseDir = System.getenv("SystemDrive") + "web2p1/assets/avatars/";
            fileContent = file.getInputStream();
            fileObj = new File(baseDir + this.getFileName(file));
            fileObj.getParentFile().mkdirs();
            out = new FileOutputStream(fileObj);
            int read = 0;
            byte[] bytes = new byte[1024];
            while ((read = fileContent.read(bytes)) != -1) {
                out.write(bytes, 0, read);
            }
            fileContent.close();
            out.close();
        }
        catch (Exception e) {
            e.printStackTrace();
            response.setStatus(500);
            response.setMessage("Error uploading file.");
        }
        finally {
            response.setStatus(200);
            response.setMessage("Uploaded file successfully.");
        }
        resp.getWriter().print(mapper.writeValueAsString(response));
    }

    private String getFileName(Part part) {
        for (String content : part.getHeader("content-disposition").split(";")) {
            if (content.trim().startsWith("filename")) {
                return content.substring(content.indexOf('=') + 1).trim().replace("\"", "").split("[.]")[0] + ".png";
            }
        }
        return null;
    }
}
