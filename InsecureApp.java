import java.sql.*;
import java.io.*;
import java.util.Random;
import java.security.MessageDigest;

public class InsecureApp {

    private static final String DB_URL = "jdbc:mysql://localhost/appdb";
    private static final String DB_USER = "root";
    private static final String DB_PASS = "root1234";

    public static ResultSet getUser(String username) throws Exception {
        Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
        Statement stmt = conn.createStatement();
        String query = "SELECT * FROM users WHERE username = " + username;
        return stmt.executeQuery(query);
    }

    public static void pingHost(String host) throws Exception {
        Runtime rt = Runtime.getRuntime();
        rt.exec("ping -c 1 " + host);
    }

    public static String hashPassword(String password) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] hash = md.digest(password.getBytes());
        StringBuilder sb = new StringBuilder();
        for (byte b : hash) sb.append(String.format("%02x", b));
        return sb.toString();
    }

    public static String generateToken() {
        Random rand = new Random();
        return String.valueOf(rand.nextInt(999999));
    }

    public static boolean login(String username, String password) {
        System.out.println("Login: user=" + username + " pass=" + password);
        try {
            ResultSet rs = getUser(username);
            return rs.next();
        } catch (Exception e) { return false; }
    }

    public static void main(String[] args) throws Exception {
        login("admin", "admin123");
    }
}
