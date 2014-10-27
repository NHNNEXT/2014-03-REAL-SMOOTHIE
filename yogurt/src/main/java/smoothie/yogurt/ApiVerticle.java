package smoothie.yogurt;

import java.net.URLDecoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.vertx.java.core.Handler;
import org.vertx.java.core.MultiMap;
import org.vertx.java.core.buffer.Buffer;
import org.vertx.java.core.eventbus.Message;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.RouteMatcher;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.core.logging.Logger;
import org.vertx.java.platform.Verticle;

public class ApiVerticle extends Verticle {

	JsonObject failMessage = new JsonObject();
	JsonObject successMessage = new JsonObject();
	Logger logger;
	int moves;

	public void start() {

		initMessage();
		logger = container.logger();
		RouteMatcher matcher = new RouteMatcher();

		matcher.post("/api/saveresult", new Handler<HttpServerRequest>() {
			
			public void handle(final HttpServerRequest req) {
				logger.info("POST");
				req.bodyHandler(new Handler<Buffer>() {
					@Override
					public void handle(Buffer buff) {
						Map<String, String> map = null;
						String contentType = req.headers().get("Content-Type");

						if ("application/x-www-form-urlencoded"
								.equals(contentType)) {
							map = getQueryMap(buff.toString()); // takes the
																// buffer string
																// and returns
																// map of post
																// params
						}

						handleMoves(req, map);
					}
				});
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

	public void handleMoves(final HttpServerRequest req, Map<String, String> map) {

		// Get Params
		MultiMap params = req.params();
		// Post Params
		if (map != null)
			params.add(map);

		JsonObject logJson = new JsonObject();

		String moveStr = params.get("moves");
		moves = -1;

		try {
			moves = Integer.parseInt(moveStr);
			if (moves < 0) {
				throw new NumberFormatException();
			}
		} catch (NumberFormatException nfe) {
			req.response().putHeader("content-type", "application/json");
			req.response().end(failMessage.toString());
			return;
		} 
		
		logger.info(moves);
		logJson.putString("time", new Date().toString());
		logJson.putNumber("moves", moves);

		JsonObject operation = new JsonObject();
		operation.putString("action", "save");
		operation.putString("collection", "test");
		operation.putObject("document", logJson);
		// and call the event we want to use
		vertx.eventBus().send("vertx.mongopersistor", operation, new Handler<Message>() {
			public void handle(Message reply) {
				getTopScores(new Handler<Message<JsonObject>>() {
				    public void handle(Message<JsonObject> message) {
				        JsonArray topten = message.body().getArray("results");
				        JsonArray toptenMoves = new JsonArray();
				        for (int i = 0; i < topten.size(); i++) {
				        	JsonObject obj = (JsonObject)topten.get(i);
				        	toptenMoves.add(obj.getInteger("moves"));
				        }
				        req.response().putHeader("content-type", "application/json");
				        successMessage.putBoolean("highscore", moves >= (Integer)toptenMoves.get(toptenMoves.size()-1));
				        successMessage.putArray("topten", toptenMoves);
				        req.response().end(successMessage.toString());
				    }
				});
			}
		});

	}

	public void getTopScores(Handler<Message<JsonObject>> handler) {
		JsonObject operation = new JsonObject();
		operation.putString("action", "find");
		operation.putString("collection", "test");
		operation.putObject("sort", new JsonObject()
				.putNumber("moves", -1));
		operation.putNumber("limit",10);
		
		vertx.eventBus().send("vertx.mongopersistor", operation, handler);
	}

	public static Map<String, String> getQueryMap(String query) {
		String[] params = query.split("&");
		Map<String, String> map = new HashMap<String, String>();
		for (String param : params) {
			String name = param.split("=")[0];
			String value = "";

			try {
				value = URLDecoder.decode(param.split("=")[1], "UTF-8");
			} catch (Exception e) {
				System.out.println("wtf exception: " + e.getMessage());
			}

			map.put(name, value);
		}

		return map;
	}
}
