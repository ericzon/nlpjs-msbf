const { dockStart } = require('@nlpjs/basic');

const port = process.env.PORT || 3000;
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
      "serveBot": true
    }
  },
  "use": ["Basic", "LangEs", "ConsoleConnector", "ExpressApiServer", "DirectlineConnector", "MsbfConnector"]
};

(async () => {
  console.log('msbf starting on port ', port);
  if (process.env.DEBUG_ENABLED === 'true') {
    console.log('MSBF_BOT_APP_ID: ', process.env.MSBF_BOT_APP_ID);
    console.log('MSBF_BOT_APP_PASSWORD: ', process.env.MSBF_BOT_APP_PASSWORD);
  }
  await dockStart(conf);
})();

