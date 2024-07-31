import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

export const main = async () => {
  try {
    const { rpc, contracts, slashingAddress } = await fs.readJSON('../cfg.json');
    const { abi } = await fs.readJSON(path.join(contracts, 'slashing/ISlashing.sol/ISlashing.json'));
    const provider = new ethers.JsonRpcProvider(rpc);

    const privateKey = '905fe48e8a775a6d6fcd600efa0e55e1e89e447ceae3eb9400b4f35a258f0510';
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
