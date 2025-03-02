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
  const pageRequest = {
    key: '0x00',
    offset: 0,
    limit: 100,
    countTotal: true,
    reverse: false,
  };
  const auth = new ethers.Contract(authAddress, abi, provider);

  const [accounts, pageResponse] = await auth.accounts(pageRequest);
  for (const account of accounts) {
    console.log('account:', account.toObject(true));
  }
  console.log('pageResponse:', pageResponse.toObject(true));
};

main();
