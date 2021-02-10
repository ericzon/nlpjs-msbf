const { dockStart } = require('@nlpjs/basic');

(async () => {
  console.log('msbf start');
  if (process.env.DEBUG_ENABLED === 'true') {
    console.log('MSBF_BOT_APP_ID: ', process.env.MSBF_BOT_APP_ID);
    console.log('MSBF_BOT_APP_PASSWORD: ', process.env.MSBF_BOT_APP_PASSWORD);
  }
  await dockStart();
})();

