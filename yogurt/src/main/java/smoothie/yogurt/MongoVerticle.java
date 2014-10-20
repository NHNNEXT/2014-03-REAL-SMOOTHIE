package smoothie.yogurt;

import org.vertx.java.core.json.JsonObject;
import org.vertx.java.platform.Verticle;

public class MongoVerticle extends Verticle {
	public void start() {
		
		container.deployModule("io.vertx~mod-mongo-persistor~2.1.1",
				new JsonObject("{\"host\":\"localhost\", \"port\":27017, \"db_name\":\"test\", \"pool_size\":10}"));
		container.logger().info("mongo-persistor deploied");
	}
}
