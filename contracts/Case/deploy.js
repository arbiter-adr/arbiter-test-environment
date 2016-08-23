import config from './config';
import DeployEngine from 'redux-solidity/dist/DeployEngine';


// Deploy Arbiter Config first;






let ArbiterConfig = new DeployEngine(config['ArbiterConfig']);

ArbiterConfig.deploy().then((deployed) => {
  return ArbiterConfig.saveDeployed();
}).then((saved) => {
  console.log(`ArbiterConfig contract has been deployed.`);
}).catch((error) => {
  console.log(error);
});
