var bsg_abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_usdtAddr",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_defaultRefer",
        "type": "address"
      },
      {
        "internalType": "address[2]",
        "name": "_feeReceivers",
        "type": "address[2]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event",
    "hash": "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
    "shortHash": "0xe1fffcc4"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "DepositBySplit",
    "type": "event",
    "hash": "0x29e90a65bdaddba77321b34070d4cd09a4d33ccf332d7760c852917757eed3cb",
    "shortHash": "0x29e90a65"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "referral",
        "type": "address"
      }
    ],
    "name": "Register",
    "type": "event",
    "hash": "0x98ada70a1cb506dc4591465e1ee9be3fd7a2b6c73ecf3b949009718c9a351519",
    "shortHash": "0x98ada70a"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TransferBySplit",
    "type": "event",
    "hash": "0x6793236d14c3b3aa080156a78046b313bd7fc5dee636846f4254fa3506c81faa",
    "shortHash": "0x6793236d"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "withdrawable",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event",
    "hash": "0x884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a9424364",
    "shortHash": "0x884edad9"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "balStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x732cef4306fd2ac4592a29ee00a6c3f6ea238ffb7f618da4855ecf978818302b",
    "shortHash": "0x732cef43"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "dayLuckUsers",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x857f281d27c3bb5d3f15da3ff4ac962dc95ca7b3089b8cb6dec57263c26d5d34",
    "shortHash": "0x857f281d"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "dayLuckUsersDeposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x85b69f3d0eb9d48b2f548ce33a54b371f9877bbde0834eeb13afe7ebc6a3f636",
    "shortHash": "0x85b69f3d"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "dayTopUsers",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x7424830274d501175f50d057fba5292e4fa4523c4743fc2e8302466c3f00c5c0",
    "shortHash": "0x74248302"
  },
  {
    "inputs": [],
    "name": "defaultRefer",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x85a6327cf4e74ecddaa686dfe56e134327cdf859b4b4592b0716db406498f8b4",
    "shortHash": "0x85a6327c"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "depositors",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0xe4b2fb79e688bea056dc2811f18daf10b2985dbc19babb8a4d560304fc6ebcee",
    "shortHash": "0xe4b2fb79"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "feeReceivers",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x5b3817606e2215eeee9a6a1c63f6bc86168b875521d2b0899195b0b570ec79b4",
    "shortHash": "0x5b381760"
  },
  {
    "inputs": [],
    "name": "isFreezeReward",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x6f0110d328cdae318eb35a5511275411b9f183d5ef75576f7e7b98abab0bd432",
    "shortHash": "0x6f0110d3"
  },
  {
    "inputs": [],
    "name": "lastDistribute",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x47d673395ed1e4d55f6c84ce88df3cb2bfa94e5cc53c288fa54ebf56d3df1ba4",
    "shortHash": "0x47d67339"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "level4Users",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x9fc7f0b9e1e96dc2b0bc55db5a871e1da6b3f2b7880f2ef5624b94bc02ad4a53",
    "shortHash": "0x9fc7f0b9"
  },
  {
    "inputs": [],
    "name": "luckPool",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x672929d8767ce352409e3c13446c907a317877da0bc395a57b97b790616c6952",
    "shortHash": "0x672929d8"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "orderInfos",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "start",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "unfreeze",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isUnfreezed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x60a1cbd713f401fc5b0dd635a8d1ef73075f785a608626be8e290396ea9eba68",
    "shortHash": "0x60a1cbd7"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "rewardInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "capitals",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "statics",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "directs",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "level4Freezed",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "level4Released",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "level5Left",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "level5Freezed",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "level5Released",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "star",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "luck",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "top",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "split",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "splitDebt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0xcbecf6b5626c8c730a989320368de468bc55ca31e9a1ef15eb2f0e7579570792",
    "shortHash": "0xcbecf6b5"
  },
  {
    "inputs": [],
    "name": "starPool",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0xd2e1afb34f44e470ab517cad10f3b576c3e0877958166f81a4f1aff55fc23c42",
    "shortHash": "0xd2e1afb3"
  },
  {
    "inputs": [],
    "name": "startTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x78e97925b0c960112c3f7c467b571e2a7dd5de32093cc2c34bbf3ac813766b87",
    "shortHash": "0x78e97925"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "teamUsers",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x73cb4d059fefdf13c4015e612b2ed350f502d7ce2f0f3f75785d5488758c0bcc",
    "shortHash": "0x73cb4d05"
  },
  {
    "inputs": [],
    "name": "topPool",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x27878484d3fd9a5ce7e21dca7aa4c1f0e084f6b1fc75d4bdca34dc28a02c311b",
    "shortHash": "0x27878484"
  },
  {
    "inputs": [],
    "name": "totalUser",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0xe1604b700f329d4b2800c9d72444106028038d277362f6fe36cff317873ba2f3",
    "shortHash": "0xe1604b70"
  },
  {
    "inputs": [],
    "name": "usdt",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x2f48ab7d4c06f0247b855e84d1c3e37a005e2105e24c196fc1466600f4a12585",
    "shortHash": "0x2f48ab7d"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "referrer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "start",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "level",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxDeposit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalDeposit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "teamNum",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxDirectDeposit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "teamTotalDeposit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalFreezed",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalRevenue",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x1959a0023e291dec73ec0ff032b1ee381e31f58d82fa65f54257fc49da80d28f",
    "shortHash": "0x1959a002"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userLayer1DayDeposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x64047eca583884b6b4c486818ab8a1fd77024e367ba678e519f358d76979d977",
    "shortHash": "0x64047eca"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_referral",
        "type": "address"
      }
    ],
    "name": "register",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "hash": "0x4420e4869750c98a56ac621854d2d00e598698ac87193cdfcbb6ed1164e9cbcd",
    "shortHash": "0x4420e486"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "hash": "0xb6b55f256c3eb337f96418d59e773db6e805074f5e574a2bebb7d71394043619",
    "shortHash": "0xb6b55f25"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "depositBySplit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "hash": "0xc511b3452db35d90badf87a200267b23ff2c5582950153556b4f392654517b2e",
    "shortHash": "0xc511b345"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "transferBySplit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "hash": "0x71a6b69dd1d3886020851d3410dc0e51825e81dc7e117b3b9446cba42ed131e9",
    "shortHash": "0x71a6b69d"
  },
  {
    "inputs": [],
    "name": "distributePoolRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "hash": "0x70abe5fee7d71bcd5c50e8742d3dec1a88569e621930f73c9c6c3b4602e73460",
    "shortHash": "0x70abe5fe"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "hash": "0x3ccfd60b2e3ddce51ab210bfb9db13577f03a21684fa35e4bcd739dd5a30bda2",
    "shortHash": "0x3ccfd60b"
  },
  {
    "inputs": [],
    "name": "getCurDay",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x00a7a56edcf56bcfb0b5965057c7d71ef5efc61336a90b0288d57b2e5d3188e9",
    "shortHash": "0x00a7a56e"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_day",
        "type": "uint256"
      }
    ],
    "name": "getDayLuckLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0xf768990734975b96ae00bc9b8b5a19f2f4cb2e0a63b7d91dccbd710962f57436",
    "shortHash": "0xf7689907"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_layer",
        "type": "uint256"
      }
    ],
    "name": "getTeamUsersLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0xa5b5038cfd912cfb2c14d88e8655d0a22d5c2d47a86f912e8aede0d16b9f3a90",
    "shortHash": "0xa5b5038c"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getOrderLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0xde6b8a2e86c9e531c0639caed5ecbba59f073cda958a10e464a4245ab0c90bf3",
    "shortHash": "0xde6b8a2e"
  },
  {
    "inputs": [],
    "name": "getDepositorsLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x2fea20f686d27379b6ef79411436436f85da6e8aecbecb792127d7c54d12a5fc",
    "shortHash": "0x2fea20f6"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getMaxFreezing",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0xe402a071451b1fa4c435e402757adb7e1bb1802d81966e58a40d87f549521d9d",
    "shortHash": "0xe402a071"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getCurSplit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x4c809c662fb2070ee5fa3b61cc5b8c05e89de4458e7add4e30b1c4aa8a00b44b",
    "shortHash": "0x4c809c66"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getTeamDeposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "hash": "0x7647e0ff0bb4ed90d950d54d3b8188cd1d1bafe151399e762323a881d70442a4",
    "shortHash": "0x7647e0ff"
  }
]