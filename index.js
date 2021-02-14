const path = require('path');
const { dockStart } = require('@nlpjs/basic');

const port = process.env.PORT || 3000;
const basicScriptPath = path.join(__dirname, 'flows', 'script.dlg');
console.log('basicScriptPath ', basicScriptPath);
const conf = {
  "settings": {
    "nlp": {
      "corpora": [
        "./corpus-en.json",
        "./corpus-es.json"
      ]
    },
    "console": {
      "debug": true
    },
    "api-server": {
      "port": port,
      "serveBot": true,
      "clientPath": path.join(__dirname, 'public')
    }
  },
  "bot": {},
  "use": ["Basic", "LangEs", "ConsoleConnector", "ExpressApiServer", "MsbfConnector", "Bot"]
};

(async () => {
  console.log('msbf starting on port ', port);
  if (process.env.DEBUG_ENABLED === 'true') {
    console.log('MSBF_BOT_APP_ID: ', process.env.MSBF_BOT_APP_ID);
    console.log('MSBF_BOT_APP_PASSWORD: ', process.env.MSBF_BOT_APP_PASSWORD);
  }
  const dock = await dockStart(conf);
  const bot = dock.get('bot');
  if (bot) {
    bot.loadScript(basicScriptPath);
  }
})();

