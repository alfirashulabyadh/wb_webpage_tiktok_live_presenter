TikTok Live Presenter - Application Page

Overview

This repository contains a single-page application (Arabic, RTL) for collecting applications for a TikTok live presenter position for "الفراش الأبيض". It includes a simple frontend and a Cloudflare Worker (`worker.js`) that forwards application text and uploaded files to a Telegram group via a bot.

Branding

Colors:
- White: #ffffff
- Brand: #1282a2
- Accent: #e0ae4c
- Dark: #071e22

Font: Cairo (loaded via Google Fonts)

Files

- `index.html` - the main page (RTL Arabic content)
- `styles.css` - CSS with responsive layout and brand colors
- `script.js` - client-side interactivity and validation
- `worker.js` - Cloudflare Worker to receive form POSTs and forward to Telegram
- `README.md` - this file

Deployment (Cloudflare Pages + Worker)

This setup assumes you will host the static site with Cloudflare Pages and use a Worker route to handle `/api/submit`.

1. Create a Cloudflare Pages site and connect to your repository.
2. Create a Cloudflare Worker (or use a Pages Functions) and use `worker.js` as the entry.
3. Add secrets to your Worker environment (via Wrangler or Cloudflare dashboard):
   - `BOT_TOKEN` = 7570106320:AAGvXdpCCCBzQNp2_Z6sQKpcGQw2LAi03N4
   - `CHAT_ID` = -4811555462


Note: for security it's better to set these via the dashboard or `wrangler secret put BOT_TOKEN` and `wrangler secret put CHAT_ID`.

Example using Wrangler (CLI):

```powershell
wrangler secret put BOT_TOKEN
wrangler secret put CHAT_ID
wrangler publish --env production
```

4. Route the worker to handle POST requests to the path:
   jobs.whitebedding.net/tiktok_live_presenter/api/submit

Alternatively, serve the whole site and bind the worker to `jobs.whitebedding.net/tiktok_live_presenter/*`.

CORS and origin

The frontend code posts to `/api/submit` assuming same origin. If the worker is attached under a different origin/path, update `script.js` to use the full endpoint URL.

Limitations & Notes

- Worker file uses placeholder environment variable names; when deploying with Wrangler, bind `BOT_TOKEN` and `CHAT_ID` correctly or modify `worker.js` to use `ENV` bindings.
- Cloudflare Workers support multipart/form-data; file sizes are limited by the platform (check current limits). If you expect large uploads, consider uploading to a storage bucket and sending links instead.
  
Client & Server file-size checks implemented in this project:

- Audio: max 20 MB (client-side + server-side). Accepts MIME starting with `audio/`.
- Photo: max 5 MB (client-side + server-side). Accepts MIME starting with `image/`.

If uploads may exceed platform limits, consider uploading files to Cloudflare R2 or another storage service and then sending public/private links to Telegram from the Worker.

Testing locally

You can test the static site by opening `index.html` in a browser. To test the Worker locally, use `wrangler dev` with the secrets set.

Contact

If you want, I can also prepare a `wrangler.toml` for direct deploy and adjust `worker.js` to use proper environment bindings.