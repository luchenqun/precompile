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

  const proposalId = '1';
  res = await gov.proposal(proposalId);
  console.log('proposal', JSON.stringify(res.toObject(), undefined, 2));

  const status = 0;
  const voter = '0x0000000000000000000000000000000000000000';
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

  res = await gov.tallyResult(proposalId);
  console.log('tallyResult', JSON.stringify(res.toObject(), undefined, 2));
};

main();
