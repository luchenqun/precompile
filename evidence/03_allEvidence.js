import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const main = async () => {
  const { rpc, contracts, evidenceAddress } = await fs.readJSON('../cfg.json');
  const { abi } = await fs.readJSON(path.join(contracts, 'evidence/IEvidence.sol/IEvidence.json'));
  const provider = new ethers.JsonRpcProvider(rpc);

  // input params
  const pageRequest = {
    key: '0x00',
    offset: 0,
    limit: 100,
    countTotal: true,
    reverse: false,
  };

  const evidenceObject = new ethers.Contract(evidenceAddress, abi, provider);
  const [evidences, pageResponse] = await evidenceObject.allEvidence(pageRequest);
  for (let i = 0; i < evidences.length; i++) {
    const evidence = evidences[i];
    console.log(`evidence ${i + 1}:`, JSON.stringify(evidence.toObject(true), undefined, 2));
  }

  console.log('pageResponse:', pageResponse.toObject(true));
};

main();
