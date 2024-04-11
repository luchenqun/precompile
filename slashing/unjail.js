import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

export const main = async () => {
  try {
    const { rpc, contracts, slashingAddress } = await fs.readJSON('../cfg.json');
    const { abi } = await fs.readJSON(path.join(contracts, 'slashing/ISlashing.sol/ISlashing.json'));
    const provider = new ethers.JsonRpcProvider(rpc);

    const privateKey = '95a13267a4fbde17cb12b6e66f89f6d99d3e34768d10b6c2bf1c1de4e0c60fe8';
    const wallet = new ethers.Wallet(privateKey, provider);

    const slashing = new ethers.Contract(slashingAddress, abi, wallet);
    const tx = await slashing.unjail();
    const receipt = await tx.wait();
    console.log('unjail receipt', receipt);
  } catch (error) {
    console.log('error', error);
  }
};

main();
