if(!self.define){let s,e={};const a=(a,c)=>(a=new URL(a+".js",c).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(c,n)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let t={};const r=s=>a(s,i),o={module:{uri:i},exports:t,require:r};e[i]=Promise.all(c.map((s=>o[s]||r(s)))).then((s=>(n(...s),t)))}}define(["./workbox-d25a3628"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"3bffee96ee654c5e2382d33fc39ad703"},{url:"/_next/static/chunks/0980dcec-c77dabe6b15071ab.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/1126-8fffb4617b4f0078.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/1162-607933267a9f13d1.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/1263-f7176aab5ae8be7c.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/1af89220-2abefdac2e929ce5.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/2014-ef5d2a3807ce04b7.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/2472-fc25a35048162f91.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/2772-52c88af3151a4471.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/2864-191e3206e973be0e.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/2960-d946a1dac0888efe.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/2993-4a4c469c59f92c20.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/3094-2f33a87f4f429910.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/3192-9cb7a749d479a0c6.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/3548-2b980f05b08fa581.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/3593-f1f09c88054b7de9.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/3782-b20c8611a1a55f93.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/40d09cf0-1574527ded745610.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/4426-84438cbf9955bb75.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/4563-d3aaea594567f169.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/4686-a58afb5134809c13.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/4736-79afd0c54e9faa40.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/4769.ac309807bdff4eac.js",revision:"ac309807bdff4eac"},{url:"/_next/static/chunks/4f3f28e1-03e9df670102cfa1.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/5054-9f9f768b1c982702.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/5188-ed82c8577aaa9eeb.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/5440-fc2faf2acfb521e7.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/5486-00240de5db3510c4.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/60fee16c-d4fb62a09b3f1443.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/6153-2f4949156956a294.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/6934-c17f67641d74555f.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/7029-643a23736b0e9783.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/7105-97ada3e66b73114b.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/7534-657f6165eb2e00aa.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/756-910a249c01369344.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/77db4785-37517e77ddb0965c.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/781-ccdc2b71f7baacda.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/7829-c1acd3000836352b.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/8084-32be76791a5ab6b5.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/8266-1ab7d3e57ac99afe.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/8431-4f82a53b52036649.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/85-ef5fec836cdb6788.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/8570-628c21a7058d677a.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/859-09c8045d8de9ffad.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/8629ac14-a75f52288c6d3465.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/86aee642-233c1410e62ae09f.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/8908-be5a80cf63e8e1f0.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/8963-d54fc85c5e630cb5.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/9035-2e2419b21ca8603d.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/9471-50440118a3353ff8.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/9726-a8a8716fc86898c1.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/9773-4403ba0c0a906ad8.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/97a9daee-f5be42717d5bf969.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/995-7ea3220a0290a938.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/999-a195e020285b3cf9.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/9e33a154-b719befc6fb61f5b.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(auth)/login/error/page-252af0da1670d1f3.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(auth)/login/page-a95a72d03e02bd44.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(auth)/logout/page-12d5bbce92b61a59.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(auth)/onboarding/page-bf89d017bfa06398.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/(workspace)/layout-d8da4e223974f436.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/(workspace)/page-c4defc19c4ceb9fc.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/(workspace)/page/%5BteamId%5D/%5BfolderId%5D/%5BchannelId%5D/page-6aae23ae7bc29855.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/(workspace)/resources/%5BteamId%5D/%5B%5B...path%5D%5D/page-68b0d8549db46fd9.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/(workspace)/room/%5BteamId%5D/%5BchannelId%5D/page-118642124e4165a1.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/(workspace)/thread/%5BteamId%5D/%5BchannelId%5D/page-581c12d6fb2d40aa.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/(workspace)/thread/%5BteamId%5D/%5BchannelId%5D/post/%5BpostId%5D/page-f75abf50fb2f65ff.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/(workspace)/thread/%5BteamId%5D/%5BchannelId%5D/thread/%5BpostId%5D/page-037bd42be86f8b70.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/join/%5Btoken%5D/page-d8d5e36c3ac096c1.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/settings/(general)/page-1a3e96e5511633ef.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/settings/account/page-c91adaf9fdc1605d.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/settings/groups/%5BgroupId%5D/page-03726e4728e357a1.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/settings/groups/new/page-c68743c3fab0a9d5.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/settings/groups/page-eb1d58e46d50a14d.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/settings/layout-35cec6cbc1d40321.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/settings/members/page-752f03ef0ca80e7d.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/settings/teams/%5BteamId%5D/page-933cf2ef761e7cca.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/settings/teams/new/page-c09599eac97c031c.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/settings/teams/page-e3ad1fe7740d308b.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/%5BworkspaceSlug%5D/settings/upgrade/page-9a69dffd9948ebb5.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/error-e3dfff6cf07de025.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/(workspaces)/page-39f592258a91cec1.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/demo/page-30bfcd52fb466a57.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/layout-dba6092fcefa8f1d.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/not-found-f480e63d9f077421.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/settings/(account)/page-4ff599b2a7531699.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/app/settings/layout-798dfe8dda72dbae.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/ec137d52-cd83f32f9bde8b92.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/framework-af9b1d45774ad36d.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/main-app-f2c99df85944ac61.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/main-ceb7457cb30e4a6a.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/pages/_app-58b9d1c1c26bb5df.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/pages/_error-01585ac2e1e1f6b6.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-f99ea9193d6a8edd.js",revision:"xXN438S5rslTz83vShMw2"},{url:"/_next/static/css/5caf681715d1e9d5.css",revision:"5caf681715d1e9d5"},{url:"/_next/static/css/7bea6c98b612e23a.css",revision:"7bea6c98b612e23a"},{url:"/_next/static/css/c09772e28beba201.css",revision:"c09772e28beba201"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/09627e6950aeea1b-s.woff2",revision:"e92d35b6a41ab1427413d0d62552a056"},{url:"/_next/static/media/21e5c2bd414d2b0a-s.p.woff2",revision:"c5862f50ae49893b8de741d1b2c19629"},{url:"/_next/static/media/265a78f8de3b1914-s.woff2",revision:"b8b7a662fcdf8adbd433109e40456e77"},{url:"/_next/static/media/2d76b21e31f41a15-s.woff2",revision:"933190f51252039fb81b6e3cc4a2721f"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d44f6e5b134b6635-s.woff2",revision:"4ed4c48afe87977196254dd76cdb2f19"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/xXN438S5rslTz83vShMw2/_buildManifest.js",revision:"dfb8a432f838538bab11b49b0e745b88"},{url:"/_next/static/xXN438S5rslTz83vShMw2/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/avatar.jpeg",revision:"1a672b5350a494f5659cc155063042cb"},{url:"/avatar.svg",revision:"32d0b7f2a5363a384dd560819d8d2876"},{url:"/icons/icon-128x128.png",revision:"d626cfe7c65e6e5403bcbb9d13aa5053"},{url:"/icons/icon-144x144.png",revision:"e53a506b62999dc7a4f8b7222f8c5add"},{url:"/icons/icon-152x152.png",revision:"18b3958440703a9ecd3c246a0f3f7c72"},{url:"/icons/icon-16x16.png",revision:"83703514f19796ee15151e450984416d"},{url:"/icons/icon-192x192.png",revision:"27dc12f66697a47b6a8b3ee25ba96257"},{url:"/icons/icon-32x32.png",revision:"25e2c6ee34840568012b32e4314278df"},{url:"/icons/icon-384x384.png",revision:"a40324a3fde2b0b26eeffd4f08bf8be8"},{url:"/icons/icon-512x512.png",revision:"93d6e8e15cfa78dfee55446f607d9a28"},{url:"/icons/icon-72x72.png",revision:"f2ffc41b3482888f3ae614e0dd2f6980"},{url:"/icons/icon-96x96.png",revision:"fba02a40f7ba6fc65be8a2f245480f6d"},{url:"/img.png",revision:"d47b7892dfe8186e9ab349aff59c8fd1"},{url:"/logo-dark.svg",revision:"88adea249d61f73669af7c658f66305e"},{url:"/logo-light.svg",revision:"76f7b782b6ab9c1ab162878aea95b4d5"},{url:"/manifest.json",revision:"916f0452638e1e218105b5962b0b83cd"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/placeholder-image.jpg",revision:"a4f537a7e4d5c80d99281a049bb49d9a"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:a,state:c})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
