module.exports = {
  networks: {
    development: {
      // For trontools/quickstart docker image
      privateKey: "",
      userFeePercentage: 30,
      feeLimit: 100000000,
      fullHost: "http://127.0.0.1:9090",
      network_id: "*"
    },
    mainnet: {
      // Don't put your private key here, pass it using an env variable, like:
      // PK=da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0 tronbox migrate --network mainnet
      privateKey: process.env.PK,
      userFeePercentage: 30,
      feeLimit: 100000000,
      fullHost: "https://api.trongrid.io",
      network_id: "*"
    },
    shasta: {
      privateKey:
        "881a7a6004675152c2de3ab2e1e996287c1f013e5f93c1155515cf5d5f5738c3",
      userFeePercentage: 50,
      feeLimit: 1e8,
      fullHost: "https://api.shasta.trongrid.io",
      network_id: "*"
    }
  }
};
