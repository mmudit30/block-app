const EthereumTx = require('ethereumjs-tx');
const { getWeb3Instant } = require('../utils/web3Util');

const { web3, contract } = getWeb3Instant();

exports.registerDoctor = async (address, id, name, labId, res) => {
  try {
    const data = await contract.methods.assignDoctor(address, id, name, labId);
    const txObj = {
      from: '0xbc5aC9e4bEe4aAE9F0D97F27d9e81B3eBDC8a39a',
      data,
      to: '0x03f304Fa4e8D015E7bd16030a6AC5F9699A9b4ED',
      value: 0,
    };
    const adminPrivateKey =
      'E75593C07554C41CC48971A4454DCAF21DA3616AD55C3D3E8747F8ACD0715E19';
    let tx = await createTx(txObj);
    let signedTx = await signTransaction(tx, adminPrivateKey);
    await web3.eth
      .sendSignedTransaction(signedTx)
      .once('receipt', (receipt) => {
        console.log(receipt);
        res.send({ success: true });
      });
    // .on('transactionHash', (txHash) => {
    //   res.send({ transactionHash: txHash });
    // });
  } catch (e) {
    throw e;
  }
};
exports.getDoctorInfo = async (doctorId) => {
  const result = await contract.methods.getDoctorInfo(doctorId).call();
  return result;
};
exports.getPatientResult = async (patientId) => {
  const result = await contract.methods.getResult(doctorId).call();
  return result;
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
