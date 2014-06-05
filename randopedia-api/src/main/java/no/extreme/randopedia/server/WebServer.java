package no.extreme.randopedia.server;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.eclipse.jetty.server.NCSARequestLog;
import org.eclipse.jetty.server.RequestLog;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.handler.RequestLogHandler;
import org.eclipse.jetty.util.thread.QueuedThreadPool;
import org.eclipse.jetty.util.thread.ThreadPool;
import org.eclipse.jetty.webapp.WebAppContext;

public class WebServer {

    private static final String PROJECT_RELATIVE_PATH_TO_WEBAPP = "src/main/webapp";
    private static final String LOG_PATH = "./var/logs/access/yyyy_mm_dd.request.log";
    private Server server;
    private int port;
    private String bindInterface;

    public WebServer(int port)
    {
        this(port, null);
    }

    public WebServer(int port, String bindInterface)
    {        
        this.port = port;
        this.bindInterface = bindInterface;
    }

    public void start() throws Exception
    {
        server = new Server();
        //server.setThreadPool(createThreadPool());
        server.addConnector(createConnector(server));
        server.setHandler(createHandlers());        
        server.setStopAtShutdown(true);

        server.start();       
    }

    public void join() throws InterruptedException
    {
        server.join();
    }

    public void stop() throws Exception
    {        
        server.stop();
    }
    
    private RequestLog createRequestLog()
    {
        NCSARequestLog log = new NCSARequestLog();
        
     File logPath = new File(LOG_PATH);
        logPath.getParentFile().mkdirs();
                
        log.setFilename(logPath.getPath());
        log.setRetainDays(90);
        log.setExtended(false);
        log.setAppend(true);
        log.setLogTimeZone("GMT");
        log.setLogLatency(true);
        return log;
    }
    
    private ServerConnector createConnector(Server server)
    {
        ServerConnector connector = new ServerConnector(server);
        connector.setPort(port);
        connector.setHost(bindInterface);
        return connector;
    }
    
    

    private HandlerCollection createHandlers()
    {                
        WebAppContext ctx = new WebAppContext();
        ctx.setContextPath("/");

       
        ctx.setWar(PROJECT_RELATIVE_PATH_TO_WEBAPP);

        List<Handler> handlers = new ArrayList<Handler>();

        handlers.add(ctx);

        HandlerList contexts = new HandlerList();
        contexts.setHandlers(handlers.toArray(new Handler[0]));

        RequestLogHandler log = new RequestLogHandler();
        log.setRequestLog(createRequestLog());

        HandlerCollection result = new HandlerCollection();
        result.setHandlers(new Handler[] {contexts, log});

        return result;
    }
}
