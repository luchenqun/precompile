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
  const validatorAddress = '0xbf657d0ef7b48167657a703ed8fd063f075246d7';
  const delegatorAddress = '0x00000Be6819f41400225702D32d3dd23663Dd690';
  let res;
  const distribution = new ethers.Contract(distributionAddress, abi, provider);

  res = await distribution.validatorDistributionInfo(validatorAddress);
  console.log('validatorDistributionInfo', JSON.stringify(res.toObject(), undefined, 2));

  res = await distribution.validatorOutstandingRewards(validatorAddress);
  console.log('validatorOutstandingRewards', JSON.stringify(res.toObject(), undefined, 2));

  res = await distribution.validatorCommission(validatorAddress);
  console.log('validatorCommission', JSON.stringify(res.toObject(), undefined, 2));

  res = await distribution.delegationRewards(delegatorAddress, validatorAddress);
  console.log('delegationRewards', JSON.stringify(res.toObject(), undefined, 2));

  res = await distribution.delegationTotalRewards(delegatorAddress);
  console.log('delegationTotalRewards', JSON.stringify(res.toObject(), undefined, 2));
};

main();
