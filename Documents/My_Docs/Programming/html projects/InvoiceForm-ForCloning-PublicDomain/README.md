This repo contains a static invoice webapp plus a Cloudflare Worker stub to
handle minimal API actions (order id generation and accepting sales receipts).

Files of interest
- `main.html`, `script.js`, `style.css` - the static web app (client-side).
- `worker.js` - Cloudflare Worker entrypoint with `/get_order_id` and `/sales_receipt` handlers.
- `wrangler.toml` - basic Wrangler configuration for deployment.

Local development
- Open `main.html` in a browser (file://) or serve with a simple static server.
- The client uses relative paths for API calls; when running the worker locally
	with `wrangler dev`, the endpoints `/get_order_id` and `/sales_receipt` will
	be available.

Deploy to Cloudflare Workers
1. Install Wrangler: `npm install -g wrangler`.
2. Login: `wrangler login` and follow prompts.
3. Publish: `wrangler publish`.

Persistence
- The worker uses an in-memory map for counters which resets when the worker
	restarts. For production, bind a KV namespace or Durable Object and update
	`worker.js` to use the binding. See Cloudflare Workers docs for examples.

Notes
- The original Python `app.py` (Flask) was left in the repo for reference but
	the webapp no longer depends on it. If you want to remove it, delete `app.py`
	and `requirements.txt`.

