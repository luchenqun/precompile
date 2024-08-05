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
  const id = '8';
  const auth = new ethers.Contract(authAddress, abi, provider);

  const address = await auth.accountAddressByID(id);
  console.log('account address', address);
};

main();
