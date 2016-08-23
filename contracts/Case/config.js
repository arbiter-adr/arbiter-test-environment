/*
Define configuation for outward facing contracts. These configuations
will be used by redux-solidity to compile and deploy contracts.
 */

import Web3 from 'web3';
let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

module.exports = {
  Cases : {
    name: "Cases", // name of the primary contract file (without .sol), e.g. TokenExchange
    directory: __dirname, // path to directory containing src directory with sol files
    sendObject: {
      from: web3.eth.accounts[0],
      gas: 4712388,
    },
    params: [],
    web3
  }
};
