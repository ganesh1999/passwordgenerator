var PasswordGenerator = artifacts.require("./PasswordGenerator.sol");

module.exports = function(deployer) {
  deployer.deploy(PasswordGenerator);
};
