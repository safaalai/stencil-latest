/**
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		return new Response("Hello World!");
	},
};

export class MyDO {
	state: DurableObjectState;
	env: Env;
	client: any;
	server: any;

	constructor(state: DurableObjectState, env: Env) {
    console.log('Decision DO constructor');
		this.state = state;
		this.env = env;
		this.server = null;
	}
	
  async fetch(request: Request) {
		console.log('Decision DO fetch');

    // Accept a client websocket connection request
		const webSocketPair = new WebSocketPair();
		this.client = webSocketPair[0];
		this.server = webSocketPair[1];
		this.state.acceptWebSocket(this.server);

		// Send a pong for a client ping without incurring Cloudflare charges
		this.state.setWebSocketAutoResponse(
			new WebSocketRequestResponsePair('ping','pong'));

    return new Response(null, { status: 101, webSocket: this.client });
	}

	async webSocketMessage(ws: WebSocket, msg: any) {
		console.log(`webSocketMessage: ${msg}`);
		ws.send(`Ack from my_do!`);
	}

	async webSocketClose(ws: WebSocket, code: number, reason: string, wasClean: boolean) {
		console.log('webSocketClose:', code, reason, wasClean);
		ws.close();
	}

	async webSocketError(ws: WebSocket, error: any) {
		console.log('webSocketError:', error);
		ws.close();
	}
}
