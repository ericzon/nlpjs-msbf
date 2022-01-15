const path = require('path');
const { dockStart } = require('@nlpjs/basic');

const port = process.env.PORT || 3000;
const basicScriptPath = path.join(__dirname, 'flows', 'script.dlg');
const conf = {
  "settings": {
    "nlp": {
      "corpora": [
        "./corpus/corpus-en.json",
        "./corpus/corpus-es.json"
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
  "use": ["Basic", "LangEs", "ExpressApiServer", "MsbfConnector", "Bot"]
};

async function bootstrapApp() {
  console.log('msbf starting on port ', port);
  if (process.env.DEBUG_ENABLED === 'true') {
    console.log('basicScriptPath ', basicScriptPath);
    console.log('MSBF_BOT_APP_ID: ', process.env.MSBF_BOT_APP_ID);
    console.log('MSBF_BOT_APP_PASSWORD: ', process.env.MSBF_BOT_APP_PASSWORD);
  }
  const dock = await dockStart(conf);
  const bot = dock.get('bot');
  if (bot) {
    await bot.loadScript(basicScriptPath);
  }

  return bot;
}

(async () => {
  await bootstrapApp();
})();

module.exports = {
  bootstrapApp
}