# !/bin/bash
# Cloudflare build bash file
# set as build command in pages-main ==> settings ==> build configurations
# Cloudflare doc: https://developers.cloudflare.com/pages/how-to/build-commands-branches/

node --dns-result-order=ipv4first \
node_modules/wrangler/bin/wrangler.js pages dev \
--do MY_DO=MyDO@my-do \
-- npm start

