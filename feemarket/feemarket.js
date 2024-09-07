import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const main = async () => {
  const { rpc, contracts, feemarketAddress } = await fs.readJSON('../cfg.json');
  const { abi } = await fs.readJSON(path.join(contracts, 'feemarket/IFeemarket.sol/IFeemarket.json'));
  const provider = new ethers.JsonRpcProvider(rpc);

  // input params
  const feemarket = new ethers.Contract(feemarketAddress, abi, provider);

  const baseFee = await feemarket.baseFee();
  console.log('baseFee', baseFee);

  const params = await feemarket.params();
  console.log('params', JSON.stringify(params.toObject(true), undefined, 2));

  const blockGas = await feemarket.blockGas();
  console.log('blockGas', blockGas);
};

main();
