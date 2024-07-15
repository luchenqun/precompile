import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const main = async () => {
  const { rpc, contracts, govAddress, denom } = await fs.readJSON('../cfg.json');
  const { abi } = await fs.readJSON(path.join(contracts, 'gov/IGov.sol/IGov.json'));
  const provider = new ethers.JsonRpcProvider(rpc);

  // input params
  const privateKey = 'e54bff83fc945cba77ca3e45d69adc5b57ad8db6073736c8422692abecfb5fe2';
  const wallet = new ethers.Wallet(privateKey, provider);
  const gov = new ethers.Contract(govAddress, abi, wallet);

  const messages = JSON.stringify([
    {
      '@type': '/cosmos.gov.v1.MsgExecLegacyContent',
      authority: 'ethos10d07y265gmmuvt4z0w9aw880jnsr700j78lu59',
      content: {
        '@type': '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
        title: 'Software upgrades: reset evm chain id',
        description: 'reset evm chain id from 9000 to 168168',
        plan: {
          name: 'v13.1.0',
          info: '{"binaries":{"darwin/arm64":"https://github.com/evmos/evmos/releases/download/v16.0.0/evmos_16.0.0_Darwin_arm64.tar.gz?checksum=db85391340c5d6eaec460d355b8ca000dd0ed06b6f2338d24b20eb3ab32d745a","darwin/amd64":"https://github.com/evmos/evmos/releases/download/v16.0.0/evmos_16.0.0_Darwin_amd64.tar.gz?checksum=98c9074e81998cb939c192a9982de93119657e7f7020982eb7629e45bd951a04","linux/arm64":"https://github.com/evmos/evmos/releases/download/v16.0.0/evmos_16.0.0_Linux_arm64.tar.gz?checksum=ecfffdaadd0e05058b78a2c24bdcb763975e95236eb4a63e72c0be7a0ad30b6d","linux/amd64":"https://github.com/evmos/evmos/releases/download/v16.0.0/evmos_16.0.0_Linux_amd64.tar.gz?checksum=dc55e04c7f12768fb32beb1d06f3d113e76059b76d1ac5f13657c8fccf5fc309"}}',
          height: '100000',
          time: '0001-01-01T00:00:00Z',
          upgraded_client_state: null,
        },
      },
    },
  ]);
  const metadata = 'Just Test Proposal';
  const initialDeposit = [
    {
      denom,
      amount: '1000000',
    },
  ];

  const tx = await gov.submitProposal(messages, initialDeposit, metadata);
  const receipt = await tx.wait();
  console.log('legacy submit proposal success, receipt: ', receipt);
};

main();
