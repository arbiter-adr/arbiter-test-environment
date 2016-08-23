import assert from 'assert';
import DeployEngine from 'redux-solidity/dist/DeployEngine';
import Promise from 'bluebird';
import { Cases } from '../../contracts/Case/config';

// Instantiate required deployed contracts;

let deployedCases = null;

// Arbiter Config Tests

// it('Should deploy and save Cases', function() {
//   this.timeout(60000);
//   let cases = new DeployEngine(Cases);
//
//   return cases.deploy().then((deployed) => {
//     return cases.saveDeployed();
//   }).then((saved) => {
//     assert.equal(saved, true);
//   });
// });


it('Should create a new case and dispatch a "NewCase" event.', function() {
  this.timeout(60000);

  deployedCases = require('../../contracts/Case/Cases.deployed.json');
  let cases = new DeployEngine(Cases);
  let count = 0;
  let opposingParties = ["0x68defe72a679818cddd7f028cef8262a52cac2da"];

  return cases.initDeployed(deployedCases).then((contract) => {
    return contract.newCase.sendTransactionAsync(opposingParties, cases.sendObject);
  }).then((txHash) => {
    console.log(txHash);
    return cases.getTransactionReceipt(txHash);
  }).then(() => {
    cases.events.watch((error, result) => {
      assert.equal(error, null);
      Promise.resolve(result).map((_event) => {
        if(_event.event == 'NewCase' && _event.args._originatingParty == cases.sendObject.from){
          console.log(_event);
          count += 1;
        }
      }).then(() => {
        console.log(count);
        assert.notEqual(count, 0);
        cases.events.stopWatching();
      });
    });
  })
});
