package smoothie.yogurt;

import java.util.Date;

import org.vertx.java.core.Handler;
import org.vertx.java.core.MultiMap;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.RouteMatcher;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.platform.Verticle;

public class ApiVerticle extends Verticle {
	
	JsonObject failMessage = new JsonObject();
	JsonObject successMessage = new JsonObject();
	
	public void start() {
		
		initMessage();
		RouteMatcher matcher = new RouteMatcher();
		matcher.get("/api/saveresult", new Handler<HttpServerRequest>() {

			@Override
			public void handle(HttpServerRequest req) {
                MultiMap params = req.params();
                JsonObject logJson = new JsonObject();
                
                Integer moves = Integer.parseInt(params.get("moves"));
                if (moves == null) {
                	req.response().putHeader("content-type", "application/json");
    				req.response().end(failMessage.toString());
    				moves = -1;
                } else {
                	// DB 접근하여 하이스코어 알아오기
                	req.response().putHeader("content-type", "application/json");
    				req.response().end(successMessage.toString());
                }
                
                logJson.putString("time", new Date().toString());
                logJson.putNumber("moves", moves);
                
                JsonObject operation = new JsonObject();
				operation.putString("action", "save");
				operation.putString("collection", "test");
				operation.putObject("document", logJson);
                // and call the event we want to use
                vertx.eventBus().send("vertx.mongopersistor", operation);
				
			}
			
		});
		
		vertx.createHttpServer().requestHandler(matcher).listen(8080);
	}

	private void initMessage() {
		JsonObject error = new JsonObject();
		error.putNumber("code", 400);
		error.putString("message", "Bad Request: Wrong Parameter");
		failMessage.putObject("error", error);
		
		JsonObject success = new JsonObject();
		success.putNumber("code", 0);
		success.putString("message", "success");
		successMessage.putObject("error", success);
	}
}
