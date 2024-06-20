import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

/**
 * @description multiSend
 * defines a method for sending coins from an account to some other accounts.
 */
export const main1 = async () => {
  try {
    const { rpc, contracts, bankAddress } = await fs.readJSON('../cfg.json');
    const { abi } = await fs.readJSON(path.join(contracts, 'bank/IBank.sol/IBank.json'));
    const provider = new ethers.JsonRpcProvider(rpc);

    const privateKey = 'f78a036930ce63791ea6ea20072986d8c3f16a6811f6a2583b0787c45086f769';
    const wallet = new ethers.Wallet(privateKey, provider);

    // input params: case1
    const outputs = [
      {
        toAddress: '0x1111102Dd32160B064F2A512CDEf74bFdB6a9F96',
        amount: [
          { denom: 'usdt', amount: '10' },
          { denom: 'acbo', amount: '20' },
        ],
      },
      {
        toAddress: '0xbf657D0ef7b48167657A703Ed8Fd063F075246D7',
        amount: [{ denom: 'acbo', amount: '10' }],
      },
    ];
    const bank = new ethers.Contract(bankAddress, abi, wallet);
    const tx = await bank.multiSend(outputs);
    const receipt = await tx.wait();
    console.log('multiSend success, receipt1: ', receipt);
  } catch (error) {
    console.log('error', error);
  }
};

export const main2 = async () => {
  try {
    const { rpc, contracts, bankAddress } = await fs.readJSON('../cfg.json');
    const { abi } = await fs.readJSON(path.join(contracts, 'bank/IBank.sol/IBank.json'));
    const provider = new ethers.JsonRpcProvider(rpc);

    const privateKey = 'f78a036930ce63791ea6ea20072986d8c3f16a6811f6a2583b0787c45086f769';
    const wallet = new ethers.Wallet(privateKey, provider);

    // input params: case2
    const outputs = [
      {
        toAddress: '0x1111102Dd32160B064F2A512CDEf74bFdB6a9F96',
        amount: [{ denom: 'acbo', amount: '10' }],
      },
      {
        toAddress: '0xbf657D0ef7b48167657A703Ed8Fd063F075246D7',
        amount: [
          { denom: 'acbo', amount: '20' },
          { denom: 'usdt', amount: '30' },
        ],
      },
    ];
    const bank = new ethers.Contract(bankAddress, abi, wallet);
    const tx = await bank.multiSend(outputs);
    const receipt = await tx.wait();
    console.log('multiSend success, receipt2: ', receipt);
  } catch (error) {
    console.log('error', error);
  }
};

main1();
// main2();
