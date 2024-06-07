import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

export const main = async () => {
  try {
    const { rpc, contracts, stakingAddress } = await fs.readJSON('../cfg.json');
    const { abi } = await fs.readJSON(path.join(contracts, 'staking/IStaking.sol/IStaking.json'));
    const provider = new ethers.JsonRpcProvider(rpc);

    // input params
    const privateKey = '95e06fa1a8411d7f6693f486f0f450b122c58feadbcee43fbd02e13da59395d5';
    const wallet = new ethers.Wallet(privateKey, provider);
    const description = ['join node', 'identity', 'http://cosmos.lucq.fun', 'security contract', 'It is my details'];
    const commission = ['100000000000000000', '100000000000000000', '100000000000000000'];
    const minSelfDelegation = '1';
    const pubkey = 'hqj4VJqg0eiauN08zrUqQ6RW5NyqsJavjc7/b8yFacA=';
    const value = '100000000000000000000';

    const staking = new ethers.Contract(stakingAddress, abi, wallet);
    const tx = await staking.createValidator(description, commission, minSelfDelegation, pubkey, value);
    const receipt = await tx.wait();
    console.log('create validator success, receipt: ', receipt);
  } catch (error) {
    console.log('error', error);
  }
};

main();
