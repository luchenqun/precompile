import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const main = async () => {
  const { rpc, contracts, bankAddress, denom } = await fs.readJSON('../cfg.json');
  const { abi } = await fs.readJSON(path.join(contracts, 'bank/IBank.sol/IBank.json'));
  const provider = new ethers.JsonRpcProvider(rpc);

  // input params
  const address = '0x00000Be6819f41400225702D32d3dd23663Dd690';
  let res;
  const bank = new ethers.Contract(bankAddress, abi, provider);

  res = await bank.balance(address, denom);
  console.log('totalSupply', JSON.stringify(res.toObject(), undefined, 2));
};

main();
