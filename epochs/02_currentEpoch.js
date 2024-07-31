import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

export const main = async () => {
  const { rpc, contracts, epochsAddress } = await fs.readJSON('../cfg.json');
  const { abi } = await fs.readJSON(path.join(contracts, 'epochs/IEpochs.sol/IEpochs.json'));
  const provider = new ethers.JsonRpcProvider(rpc);

  // input params
  const identifier = 'day';

  const epochs = new ethers.Contract(epochsAddress, abi, provider);
  const currentEpoch = await epochs.currentEpoch(identifier);
  console.log('currentEpoch:', currentEpoch);
};

main();
