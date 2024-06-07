import { ethers } from 'ethers';

export const main = async () => {
  const rpc = 'http://127.0.0.1:8545';
  const abi = [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'voter',
          type: 'address',
        },
        {
          internalType: 'uint64',
          name: 'proposalId',
          type: 'uint64',
        },
        {
          internalType: 'enum VoteOption',
          name: 'option',
          type: 'uint8',
        },
        {
          internalType: 'string',
          name: 'metadata',
          type: 'string',
        },
      ],
      name: 'vote',
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
  const gov = new ethers.Contract('0x0000000000000000000000000000000000000805', abi, wallet);

  const voter = wallet.address;
  const proposalId = 1;
  const option = 1; // Yes
  const metadata = 'hello world';

  const tx = await gov.vote(voter, proposalId, option, metadata);
  const receipt = await tx.wait();
  console.log('vote receipt', receipt);
};

main();
