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
  const name = 'bonded_tokens_pool';
  const auth = new ethers.Contract(authAddress, abi, provider);

  const mudoleAccount = await auth.moduleAccountByName(name);
  console.log('mudoleAccount', JSON.stringify(mudoleAccount.toObject(true), undefined, 2));
};

main();
