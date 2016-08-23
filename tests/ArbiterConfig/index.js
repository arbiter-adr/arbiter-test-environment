import assert from 'assert';
import DeployEngine from 'redux-solidity/dist/DeployEngine';
import Promise from 'bluebird';
import {Cases, ArbiterConfig } from '../../contracts/Case/config';

// Instantiate required deployed contracts;

let deployedArbiterConfig = null;
let deployedCases = null;

// Arbiter Config Tests

it('Should deploy and save ArbiterConfig', function() {
  this.timeout(60000);
  let arbiterConfig = new DeployEngine(ArbiterConfig);

  return arbiterConfig.deploy().then((deployed) => {
    return arbiterConfig.saveDeployed();
  }).then((saved) => {
    assert.equal(saved, true);
  });
});

it('Should return a grace period of 3 days for the config', function() {
  deployedArbiterConfig = require('../../contracts/Case/ArbiterConfig.deployed.json');
  let arbiterConfig = new DeployEngine(ArbiterConfig);

  return arbiterConfig.initDeployed(deployedArbiterConfig).then((contract) => {
    return contract.gracePeriod.callAsync();
  }).then((gracePeriod) => {
    assert.equal(gracePeriod.toNumber(), (3*86400));
  });
});
