const lisk = require('lisk-elements').default;

exports.liskApiCLient = lisk.APIClient.createTestnetAPIClient();

exports.apiFormatAccount = account => ({
  address: account.address,
  balance: account.balance,
  unconfirmedBalance: account.unconfirmedBalance,
  publicKey: account.publicKey,
  secondPublicKey: account.secondPublicKey || null,
});
