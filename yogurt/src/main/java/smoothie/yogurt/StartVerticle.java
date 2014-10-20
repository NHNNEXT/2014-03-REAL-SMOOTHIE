package smoothie.yogurt;

import org.vertx.java.platform.Verticle;

public class StartVerticle extends Verticle {
	public void start() {
		container.deployVerticle("smoothie.yogurt.HttpVerticle");
		container.deployVerticle("smoothie.yogurt.MongoVerticle");
	}
}
