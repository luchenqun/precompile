import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const main = async () => {
  const { rpc, contracts, authAddress } = await fs.readJSON('../cfg.json');
  const { abi } = await fs.readJSON(path.join(contracts, 'auth/IAuth.sol/IAuth.json'));
  const provider = new ethers.JsonRpcProvider(rpc);

  // input params
  const address = '0x00000Be6819f41400225702D32d3dd23663Dd690';
  const auth = new ethers.Contract(authAddress, abi, provider);

  const account = await auth.account(address);
  console.log('account', JSON.stringify(account.toObject(true), undefined, 2));
};

main();
