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
  const evidenceHash = '9BFB9396C8506AF5BCF93836C77E8E885628AAD43C1B90D22C9D9DF4830B1744';

  const evidenceObject = new ethers.Contract(evidenceAddress, abi, provider);
  const evidence = await evidenceObject.evidence(evidenceHash);
  console.log('evidence:', JSON.stringify(evidence.toObject(true), undefined, 2));
};

main();
