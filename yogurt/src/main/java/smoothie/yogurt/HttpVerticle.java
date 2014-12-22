package smoothie.yogurt;

import java.util.Map;

import org.vertx.java.core.Handler;
import org.vertx.java.core.eventbus.EventBus;
import org.vertx.java.core.http.HttpServer;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.RouteMatcher;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.platform.Verticle;


public class HttpVerticle extends Verticle {

	public void start() {
		final EventBus eb = vertx.eventBus();
		
		HttpServer server = vertx.createHttpServer();
		server.requestHandler(new Handler<HttpServerRequest>() {
			public void handle(HttpServerRequest request) {
				StringBuilder sb = new StringBuilder();
				for (Map.Entry<String, String> header : request.headers()
						.entries()) {
					container.logger().info(header.getKey());
					sb.append(header.getKey()).append(": ")
							.append(header.getValue()).append("\n");
				}
				request.response().putHeader("content-type", "text/plain");
				request.response().end(sb.toString());
				
//				saveRequestLog(sb.toString());
			}

			private void saveRequestLog(String log) {
				JsonObject operation = new JsonObject();
				operation.putString("action", "save");
				operation.putString("collection", "test");
				JsonObject document = new JsonObject();
				document.putString("request", log);
				operation.putObject("document", document);
				eb.send("vertx.mongopersistor", operation);
				
			}
		});
		container.logger().info("http server deploied");
		server.listen(8080, "0.0.0.0");
	}
}
