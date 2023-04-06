const CONFIG = {
  headless: false,
  api: {
    host: "192.168.1.146",
    port: 3007,
    timeout: 120000
  },
   ui: {
    ssl: false,
    host: "192.168.1.146",
    port: 3007,
    path: "/",
    timeout:120000,
    cert:"./ssl/cert.pem",
    key:"./ssl/key.pem"
  },
  adapter: "sqlite",
  
  userChartConfig: {
    //patterns:['hasInvertedHammer']
    indicators: []
    //overlays: []
  }
};

if (typeof window === "undefined") module.exports = CONFIG;
else window.CONFIG = CONFIG;
