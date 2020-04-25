const Web3 = require('web3');
const Result = require('../Result.json');

exports.getWeb3Instant = () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/ac9126c9073b4e1786b5f7139c5a2b21'
    )
  );
  const contractAbi = Result.abi;
  const contract = new web3.eth.Contract(
    contractAbi,
    '0x038f16Fb148fBBAB34Ff086bF0cCD9e72d8fb381'
  );
  return { web3, contract };
};
