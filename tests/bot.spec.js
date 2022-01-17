const path = require('path');
const { TestConnector } = require('@nlpjs/bot');
const { dock } = require('@nlpjs/basic');

const { bootstrapApp } = require('../index');

const adaptRule = (originalRule) => {
   const SEPARATOR_TOKEN = '|';
   const BOT_START = 'bot> ';
   return originalRule.includes(SEPARATOR_TOKEN) ? originalRule.split(SEPARATOR_TOKEN).map(rule => {
      rule = rule.includes(BOT_START) ? rule : BOT_START + rule;
      return rule;
   }) : [originalRule];
}

describe('Bot tests', () => {
   let bot;
   beforeAll(async () => {
      bot = await bootstrapApp();
   });

   const tests = ['scenario01.dlt', 'scenario02.dlt']

   tests.forEach(testCase => {
      test(testCase, async () => {
         const connector = new TestConnector({ container: bot.container });
         await connector.runScript(path.join(__dirname, 'scenarios', testCase));
         
         expect(connector.messages.length).toBe(connector.expected.length);
         connector.expected.forEach((expectedRule, idx) => {
            const expectedTexts = adaptRule(expectedRule);
            const textReceived = connector.messages[idx];
            expect(textReceived).toBeIncludedIn(expectedTexts);
         });
      });
   });

   afterAll(() => {
      const serverContainer = dock.get('api-server');
      serverContainer.server.close();
   });
});
