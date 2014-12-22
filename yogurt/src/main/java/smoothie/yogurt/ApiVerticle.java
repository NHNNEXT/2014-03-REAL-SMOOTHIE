package smoothie.yogurt;

import org.vertx.java.core.Handler;
import org.vertx.java.core.buffer.Buffer;
import org.vertx.java.core.eventbus.Message;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.RouteMatcher;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.core.logging.Logger;
import org.vertx.java.platform.Verticle;

import com.mongodb.util.JSON;

public class ApiVerticle extends Verticle {

	Logger logger;
	int moves;

	public void start() {

		logger = container.logger();
		RouteMatcher matcher = new RouteMatcher();

		matcher.get("/userInfo/:userId", new Handler<HttpServerRequest>() {
			public void handle(final HttpServerRequest req) {
				String userId = req.params().get("userId");
				logger.info("GET");
				
				JsonObject operation = new JsonObject();
				operation.putString("action", "find");
				operation.putString("collection", "userinfo");
				operation.putObject("matcher", new JsonObject()
					.putString("userId", userId));
				
				mongoOperation(req, operation);
			}
		});
		
		matcher.post("/userInfo/:userId", new Handler<HttpServerRequest>() {
			public void handle(final HttpServerRequest req) {
				final String userId = req.params().get("userId");
				logger.info("POST");
				
				req.bodyHandler(new Handler<Buffer>() {
					@Override
					public void handle(Buffer event) {
						final String body = event.getString(0, event.length());
						JsonObject update = (JsonObject) JSON.parse(body);
						
						JsonObject operation = new JsonObject();
						operation.putString("action", "update");
						operation.putString("collection", "userinfo");
						operation.putObject("criteria", new JsonObject()
						.putString("userId", userId));
						operation.putObject("objNew", update);
						operation.putBoolean("upsert", true);
						
						mongoOperation(req, operation);
					}
				});
				
			}
		});
		vertx.createHttpServer().requestHandler(matcher).listen(8080, "0.0.0.0");
	}

	void mongoOperation(final HttpServerRequest req, JsonObject operation) {
		vertx.eventBus().send("vertx.mongopersistor", operation, new Handler<Message>() {
			public void handle(Message reply) {
				req.response().putHeader("content-type", "application/json");
				req.response().end(reply.body().toString());
			}
		});
	}
}
