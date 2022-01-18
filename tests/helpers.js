
const adaptRule = (originalRule) => {
   const SEPARATOR_TOKEN = process.env.CORPUS_ANSWERS_SEPARATOR || '|';
   const BOT_START = 'bot> ';
   return originalRule.includes(SEPARATOR_TOKEN) ? originalRule.split(SEPARATOR_TOKEN).map(rule => {
      rule = rule.includes(BOT_START) ? rule : BOT_START + rule;
      return rule;
   }) : [originalRule];
};

module.exports = {
   adaptRule
};