package smoothie.yogurt;
/*
 * Copyright 2013 Red Hat, Inc.
 *
 * Red Hat licenses this file to you under the Apache License, version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License.  You may obtain a copy of the License at:
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * @author <a href="http://tfox.org">Tim Fox</a>
 */

import java.util.Map;

import org.vertx.java.core.Handler;
import org.vertx.java.core.eventbus.EventBus;
import org.vertx.java.core.http.HttpServer;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.platform.Verticle;

/*
This is a simple Java verticle which receives `ping` messages on the event bus and sends back `pong` replies
 */
public class HttpVerticle extends Verticle {

	public void start() {
		final EventBus eb = vertx.eventBus();
		
		HttpServer server = vertx.createHttpServer();
		server.requestHandler(new Handler<HttpServerRequest>() {
			public void handle(HttpServerRequest request) {
				StringBuilder sb = new StringBuilder();
				for (Map.Entry<String, String> header : request.headers()
						.entries()) {
					sb.append(header.getKey()).append(": ")
							.append(header.getValue()).append("\n");
				}
				request.response().putHeader("content-type", "text/plain");
				request.response().end(sb.toString());
				
				saveRequestLog(sb.toString());
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
