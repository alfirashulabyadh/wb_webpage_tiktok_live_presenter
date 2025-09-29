Local test server for /save_order_local

This tiny Flask app accepts POST /save_order_local JSON payloads and saves them to saved_orders/*.json and updates order_counter.json.

Setup (Windows PowerShell):

1. Create and activate a virtual environment (optional but recommended):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install requirements:

```powershell
pip install -r requirements.txt
```

3. Run the local save server:

```powershell
python local_save.py
```

It will listen on http://127.0.0.1:8080. The client code in `script.js` will attempt to POST to `/save_order_local` (relative path). If you open the page as `http://127.0.0.1:8000/main.html` the POST to `/save_order_local` will go to http://127.0.0.1:8000/save_order_local (wrong host/port).

If you serve the static site via the same host/port as the Flask server, e.g. use a reverse proxy or open the HTML from the Flask server, the relative POST will hit the Flask server correctly. Alternatively, change the client to post to `http://127.0.0.1:8080/save_order_local` explicitly while testing.

Suggested quick test:

- Start the save server: `python local_save.py`
- Open the site via a static server on port 8000 or via filesystem. If the site is served from `127.0.0.1:8000`, you'll need to change the client POST URL to `http://127.0.0.1:8080/save_order_local` in `script.js` for testing, or host the static site with the Flask app.

Cloudflare deployment (summary)
--------------------------------

Goal:
- Host the form and API on Cloudflare Workers so the form lives at https://invoice-form3425.whitebedding.net and confirmation pages are served at https://orders.whitebedding.net/{key}.

High-level steps:
1. DNS
	- In your Cloudflare dashboard for the whitebedding.net zone, create two CNAME records:
	  - `invoice-form3425` -> point to the Workers target (you can use the default provided by Cloudflare or leave proxied/flattened as needed). If using Workers Sites with a custom domain, follow Cloudflare docs to map a route.
	  - `orders` -> map to the same Workers namespace (we'll use routing rules to serve confirmation pages on this hostname).

2. Wrangler setup
	- Install Wrangler (npm i -g wrangler) or use the recommended method in Cloudflare docs.
	- Authenticate: `wrangler login` (opens browser and links your account).
	- In `wrangler.toml` the `name` and `main` are set. Optionally add route bindings later.

3. Deploy the worker
	- Build (if bundling) or ensure `worker.js` is ready.
	- Publish: `wrangler publish` (from this project folder). This uploads the worker.

4. Configure routes
	- In Cloudflare dashboard (Workers > Routes) or in wrangler routes, create the following routes:
	  - `invoice-form3425.whitebedding.net/*` -> points to the worker that serves the form (this worker serves static assets when requested from invoice-form host).
	  - `orders.whitebedding.net/*` -> points to the same worker. The worker will detect host header and serve the confirmation page when the path is a confirmation key.

5. (Optional) Use KV or Durable Objects
	- Current implementation stores counters and confirmation data in-memory. For production persistence across instances, bind a KV namespace or Durable Object and replace the in-memory maps in `worker.js` with KV/DO reads/writes. See Cloudflare docs for binding KV to `wrangler.toml` and use `env.YOUR_KV.put()`/`env.YOUR_KV.get()`.

6. Secrets for Facebook CAPI
	- Set the following secrets in your worker environment (wrangler secrets or Cloudflare dashboard):
	  - `FB_ACCESS_TOKEN`, `FB_PAGE_ID`, `IG_ACCESS_TOKEN`, `IG_PAGE_ID`, `DATASET_ID`.
	- When these are set, the worker will forward confirmed orders to the dataset events endpoint.

How the flow works now (in this repo):
- The form (client) uses API_BASE_URL (now set to `https://invoice-form3425.whitebedding.net`).
- When you submit the order and the operator confirms in the modal, the client posts the same JSON to `API_BASE_URL + '/sales_receipt'` for immediate forwarding (this is unchanged).
- New flow: you can also POST the order JSON to `API_BASE_URL + '/create_order'`. That returns a JSON containing `confirmURL` (example: `https://orders.whitebedding.net/abc12320250928`).
- You can share that confirmation URL with the customer. When the customer opens it and clicks "أوافق", the worker records their IP and User-Agent and forwards the stored payload (with __confirmation metadata) to `/sales_receipt` which in turn forwards to Facebook CAPI (if DATASET_ID and FB_ACCESS_TOKEN are configured).

Security & privacy notes
- The worker currently logs and stores payloads in memory (for demo). Move to KV/DO for production and implement retention/deletion policies.
- Make sure you review legal consent requirements for collecting IP/User-Agent. Only collect what's necessary and display clear consent text on the confirmation page.

If you want, I can:
- Update the worker to use KV for confirmation storage and counters (needs a KV namespace id and minor code changes).
- Create a small HTML confirmation template file served from the worker's static assets.


