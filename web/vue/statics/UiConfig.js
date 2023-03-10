const CONFIG = {
  headless: false,
  api: {
    host: "192.168.1.146",
    port: 3007,
    timeout: 10 * 60 * 1000 // 10 minutes
  },
  ui: {
    ssl: false,
    host: "192.168.1.146",
    port: 3007,
    path: "/"
  },
  adapter: "sqlite",
  
  userChartConfig: {
    //patterns:['hasInvertedHammer']
    indicators: [
      "macd",
      "macdSignal",
      "macdHistogram",
      "mystdev",
      "dmPlus",
      "dmLow",
      "momentum"
    ]
    //overlays: []
  }
};

if (typeof window === "undefined") module.exports = CONFIG;
else window.CONFIG = CONFIG;
