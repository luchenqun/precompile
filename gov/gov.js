import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const main = async () => {
  const { rpc, contracts, govAddress } = await fs.readJSON('../cfg.json');
  const { abi } = await fs.readJSON(path.join(contracts, 'gov/IGov.sol/IGov.json'));
  const provider = new ethers.JsonRpcProvider(rpc);

  let res;
  const gov = new ethers.Contract(govAddress, abi, provider);

  // for (const fragment of gov.interface.fragments) {
  //   console.log(fragment.name, fragment.type, fragment.stateMutability, fragment.selector);
  // }

  const proposalId = '3';
  res = await gov.proposal(proposalId);
  console.log('proposal', JSON.stringify(res.toObject(), undefined, 2));

  const status = 0;
  let voter = '0x0000000000000000000000000000000000000000';
  const depositor = '0x0000000000000000000000000000000000000000';
  const pageRequest = {
    key: '0x00',
    offset: 0,
    limit: 100,
    countTotal: true,
    reverse: false,
  };

  res = await gov.proposals(status, voter, depositor, pageRequest);
  console.log('proposals', JSON.stringify(res.toObject(), undefined, 2));

  voter = '0xbf657D0ef7b48167657A703Ed8Fd063F075246D7';
  res = await gov.vote(proposalId, voter);
  console.log('vote', JSON.stringify(res.toObject(), undefined, 2));

  res = await gov.votes(proposalId, pageRequest);
  console.log('votes', JSON.stringify(res.toObject(), undefined, 2));

  res = await gov.depositQuery(proposalId, voter);
  console.log('deposit', JSON.stringify(res.toObject(), undefined, 2));

  res = await gov.deposits(proposalId, pageRequest);
  console.log('deposits', JSON.stringify(res.toObject(), undefined, 2));

  res = await gov.tallyResult(proposalId);
  console.log('tallyResult', JSON.stringify(res.toObject(), undefined, 2));
};

main();
