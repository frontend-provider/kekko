// This config is used in both the
// frontend as well as the web server.

// see https://github.com/askmike/gekko/blob/stable/docs/installing_gekko_on_a_server.md

const CONFIG = {
  headless: true,
  api: {
    host: "localhost",
    port: 3008,
    timeout: 60000 
  },
  ui: {
    ssl: false,
    host: "localhost",
    port: 3008,
    path: "/"
  },
  adapter: "sqlite",
  /**

Gekko-M4-Quasar

   * Gordon UI - configure your additional Indicator names here
   * (standard TA-Lib and Tulip ones are already defined)
   * patterns: for Pattern-Recognizing indicators
   * indicators: for RSI and so on - should not be displayed as Overlay
   * overlays: all Indicators that can be put into the main-chart as overlay, for Example SMA, EMA, Bollinger-Bands etc.
   * Example-Configuration done for tulip-macd - strat
   * If name on chart contains an '_', add the name after the '_' to this array.
   */
userChartConfig:{
//patterns:['hasInvertedHammer']
indicators: ['abs','acos','ad','add','adosc','adx','adxr','ao','apo','aroon',
'aroonosc','asin','atan','atr','avgprice','bbands','bop','cci','ceil','cmo','cos',
'cosh', 'crossany','crossover','cvi','decay', 'dema','di','div','dm',
'dpo','dx','edecay','ema','emv','exp', 'fisher','floor','fosc','hma',
'kama','kvo','lag','linreg','linregintercept','linregslope','ln','log10',
'macd','marketfi','mass', 'max','md','medprice','mfi','min','mom','msw',
'mul','natr','nvi','obv','ppo','psar','pvi','qstick','roc','rocr','round',
'rsi','sin','sinh','sma','sqrt','stddev','stderr','stoch','stochrsi','sub',
'sum','tan','tanh','tema', 'todeg','torad','tr','trima','trix','trunc','tsf',
'typprice','ultosc','var','vhf','vidya','volatility',
'vosc','vwma','wad','wcprice','wilders','willr','wma','zlema']
//overlays: []
}
};

if (typeof window === "undefined") module.exports = CONFIG;
else window.CONFIG = CONFIG;
