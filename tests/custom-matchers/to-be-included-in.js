const toBeIncludedIn = (received, list) => {
   if (typeof list !== 'object'|| !Array.isArray(list)) {
     throw new Error('expected list to be an array');
   }
   
   if (typeof received !== 'string') {
     throw new Error('expected value to be an string');
   }
   
   return list.includes(received) ? ({
     pass: true,
     message: () => `Received value "${received}" in included in [${list}]`
   }) : ({
     pass: false,
     message: () => `Expected "${received}" to be included in list [${list}]`
   });
};

module.exports = toBeIncludedIn;