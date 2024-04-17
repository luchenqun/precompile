import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

export const main = async () => {
  try {
    const { rpc, contracts, slashingAddress } = await fs.readJSON('../cfg.json');
    const { abi } = await fs.readJSON(path.join(contracts, 'slashing/ISlashing.sol/ISlashing.json'));
    const provider = new ethers.JsonRpcProvider(rpc);

    const privateKey = '0bee24236f4f779ce87dbe2d005e7e16f9ea7020ed046c211823370606ed1ef0';
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
