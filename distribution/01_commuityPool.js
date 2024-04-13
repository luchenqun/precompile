import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const main = async () => {
  const { rpc, contracts, distributionAddress } = await fs.readJSON('../cfg.json');
  const { abi } = await fs.readJSON(path.join(contracts, 'distribution/IDistribution.sol/IDistribution.json'));
  const provider = new ethers.JsonRpcProvider(rpc);

  // input params
  let res;
  const distribution = new ethers.Contract(distributionAddress, abi, provider);

  res = await distribution.communityPool();
  console.log('communityPool', JSON.stringify(res.toObject(), undefined, 2));
};

main();
