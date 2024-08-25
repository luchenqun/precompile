import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const main = async () => {
  const { rpc, contracts, inflationAddress } = await fs.readJSON('../cfg.json');
  const { abi } = await fs.readJSON(path.join(contracts, 'inflation/IInflation.sol/IInflation.json'));
  const provider = new ethers.JsonRpcProvider(rpc);

  // input params
  const inflation = new ethers.Contract(inflationAddress, abi, provider);

  const period = await inflation.period();
  console.log('period', period);

  const epochMintProvision = await inflation.epochMintProvision();
  console.log('epochMintProvision', JSON.stringify(epochMintProvision.toObject(true), undefined, 2));

  const skippedEpochs = await inflation.skippedEpochs();
  console.log('skippedEpochs', skippedEpochs);

  const circulatingSupply = await inflation.circulatingSupply();
  console.log('circulatingSupply', JSON.stringify(circulatingSupply.toObject(true), undefined, 2));

  const inflationRate = await inflation.inflationRate();
  console.log('inflationRate', JSON.stringify(inflationRate.toObject(true), undefined, 2));

  const params = await inflation.params();
  console.log('params', JSON.stringify(params.toObject(true), undefined, 2));
};

main();
