const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
  console.log('[SoftTap Startup] Node DNS configured to Google/Cloudflare resolvers:', dns.getServers());
} catch (e) {
  console.warn('[SoftTap Startup] Could not set DNS servers:', e.message);
}
