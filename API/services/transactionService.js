const EthereumTx = require('ethereumjs-tx');
const { getWeb3Instant } = require('../utils/web3Util');

const { web3, contract } = getWeb3Instant();

exports.registerDoctor = async (address, id, name, hospital, res) => {
  try {
    const data = await contract.methods.assignDoctor(
      address,
      id,
      name,
      hospital
    );
    const txObj = {
      from: '0xbc5aC9e4bEe4aAE9F0D97F27d9e81B3eBDC8a39a',
      data,
      to: '0xDc6f82EdBa2ed819e42D3Fcbed15513EA92cE874',
      value: 0,
    };
    const adminPrivateKey =
      'E75593C07554C41CC48971A4454DCAF21DA3616AD55C3D3E8747F8ACD0715E19';
    let tx = await createTx(txObj);
    let signedTx = await signTransaction(tx, adminPrivateKey);
    await web3.eth
      .sendSignedTransaction(signedTx)
      .on('transactionHash', (txHash) => {
        res.send({ transactionHash: txHash });
      });
  } catch (e) {
    throw e;
  }
};

const createTx = async (txObj) => {
  const txnCount = await web3.eth.getTransactionCount(txObj.from, 'pending');
  txObj.nonce = txObj.nonce ? txObj.nonce : web3.utils.numberToHex(txnCount);
  if (!txObj.gasPrice) txObj.gasPrice = await web3.eth.getGasPrice();

  txObj.gasLimit = web3.utils.numberToHex(300000);
  txObj.gasPrice = txObj.gasPrice
    ? web3.utils.numberToHex(txObj.gasPrice)
    : undefined;
  txObj.data = txObj.data.encodeABI();
  return txObj;
};

const signTransaction = async (txObj, privateKey) => {
  try {
    const chain = await web3.eth.net.getId();
    const tx = new EthereumTx.Transaction(txObj, { chain });
    const key = Buffer.from(privateKey, 'hex');
    tx.sign(key);
    return '0x' + tx.serialize().toString('hex');
  } catch (e) {
    throw e;
  }
};
