import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const main = async () => {
  try {
    const { rpc, contracts, evidenceAddress } = await fs.readJSON('../cfg.json');
    const { abi } = await fs.readJSON(path.join(contracts, 'evidence/IEvidence.sol/IEvidence.json'));
    const provider = new ethers.JsonRpcProvider(rpc);

    const privateKey = 'f78a036930ce63791ea6ea20072986d8c3f16a6811f6a2583b0787c45086f769';
    const wallet = new ethers.Wallet(privateKey, provider);

    // input params
    const height = 1;
    const time = new Date().getTime();
    const power = 100;
    const consensusAddress = '0x2AD60507F1596Af20D5083Bf4baD4969643980e2';

    const evidenceObject = new ethers.Contract(evidenceAddress, abi, wallet);
    const tx = await evidenceObject.submitEvidence(height, time, power, consensusAddress);
    const receipt = await tx.wait();
    console.log('submitEvidence receipt:', JSON.stringify(receipt, undefined, 2));
  } catch (error) {
    console.log('error', error);
  }
};

main();
