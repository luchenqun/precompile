import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const main = async () => {
  const { rpc, contracts, epochsAddress } = await fs.readJSON('../cfg.json');
  const { abi } = await fs.readJSON(path.join(contracts, 'epochs/IEpochs.sol/IEpochs.json'));
  const provider = new ethers.JsonRpcProvider(rpc);

  // input params
  const pageRequest = {
    key: '0x00',
    offset: 0,
    limit: 100,
    countTotal: true,
    reverse: false,
  };

  const epochsContract = new ethers.Contract(epochsAddress, abi, provider);
  const [epochs, pageResponse] = await epochsContract.epochInfos(pageRequest);
  for (let i = 0; i < epochs.length; i++) {
    const epoch = epochs[i];
    console.log(`epoch ${i + 1}:`, JSON.stringify(epoch.toObject(true), undefined, 2));
  }

  console.log('pageResponse:', pageResponse.toObject(true));
};

main();
