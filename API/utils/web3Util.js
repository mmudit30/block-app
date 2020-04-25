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
    '0xDc6f82EdBa2ed819e42D3Fcbed15513EA92cE874'
  );
  return { web3, contract };
};
