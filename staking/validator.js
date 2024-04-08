import { ethers } from 'ethers';
import fs from 'fs-extra';
import path from 'path';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const convertArrayToObject = (dataArray, abi) => {
  const parsedAbi = abi;
  const validatorObject = {};

  parsedAbi.forEach((item, index) => {
    if (item.type === 'function' && item.outputs) {
      item.outputs.forEach((output, outputIndex) => {
        if (output.type === 'tuple') {
          const tupleValues = dataArray[index];
          const tupleObject = {};
          output.components.forEach((component, componentIndex) => {
            tupleObject[component.name] = tupleValues[componentIndex];
          });
          validatorObject[item.name] = tupleObject;
        } else {
          validatorObject[item.outputs[outputIndex].name] = dataArray[index];
        }
      });
    } else {
      validatorObject[item.name] = dataArray[index];
    }
  });

  return validatorObject;
};

export const main = async () => {
  const { rpc, contracts, stakingAddress } = await fs.readJSON('../cfg.json');
  const { abi } = await fs.readJSON(path.join(contracts, 'staking/IStaking.sol/IStaking.json'));
  const provider = new ethers.JsonRpcProvider(rpc);

  // input params
  const validatorAddress = '0x7a24464c2A92C3774f1C7b0FFCbeee759Fa9934E';

  const staking = new ethers.Contract(stakingAddress, abi, provider);
  const validator = await staking.validator(validatorAddress);
  console.log('validator', JSON.stringify(validator.toObject(), undefined, 2), validator.description.moniker);
};

main();
