import { ethers } from 'ethers';

export const main = async () => {
  const rpc = 'http://127.0.0.1:8545';
  const abi = [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'depositor',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'fundCommunityPool',
      outputs: [
        {
          internalType: 'bool',
          name: 'success',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];
  const provider = new ethers.JsonRpcProvider(rpc);
  const privateKey = 'e54bff83fc945cba77ca3e45d69adc5b57ad8db6073736c8422692abecfb5fe2';
  const wallet = new ethers.Wallet(privateKey, provider);
  const gov = new ethers.Contract('0x0000000000000000000000000000000000000801', abi, wallet);

  const distributionModuleAddress = '0x93354845030274cD4bf1686Abd60AB28EC52e1a7';
  console.log('before fundCommunityPool distributionModuleAddress has balance', await provider.getBalance(distributionModuleAddress));

  const depositor = wallet.address;
  const amount = '1000000000000000000';
  const tx = await gov.fundCommunityPool(depositor, amount);
  const receipt = await tx.wait();
  console.log('fundCommunityPool receipt', receipt);

  console.log('after  fundCommunityPool distributionModuleAddress has balance', await provider.getBalance(distributionModuleAddress));
};

main();
