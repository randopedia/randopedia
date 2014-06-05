package no.extreme.randopedia;

import no.extreme.randopedia.server.WebServer;

/**
 * Hello Skiers!!
 *
 */
public class App
{
    private WebServer server;
    
    public App() {
        server = new WebServer(8080); 
    }
    
    public static void main( String[] args )
    {
        try {
            new App().start();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    
    public void start() throws Exception {
        server.start();
        server.join();
        
    }
}
