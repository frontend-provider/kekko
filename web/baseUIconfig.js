// Note: this file gets copied around, make sure you edit
// the UIconfig located at `gekko/web/vue/dist/UIconfig.js`.

const CONFIG = {
  headless: false,
  api: {
    host: '192.168.1.146',
    port: 3007,
    timeout: 120000
  },
  ui: {
    ssl: false,
    host: '192.168.1.146',
    port: 3007,
    path: '/'
  },
  adapter: 'sqlite'
}

if(typeof window === 'undefined')
  module.exports = CONFIG;
else
  window.CONFIG = CONFIG;
