const web3 = new Web3(window.ethereum);
async function myETHFunction() {
  var network = document.getElementById("network");
  console.log("====>  ", network.value);
  if (
    network.value == 1 ||
    network.value == 3 ||
    network.value == 4 ||
    network.value == 5 ||
    network.value == 42 ||
    network.value == 97
  ) {
    if (window.ethereum !== "undefined") {
      console.log(window.ethereum.isMetaMask);
      console.log("Metamask is installed...");
    }

    var address = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(address);
    flag = 1;

    var balance = await web3.eth.getBalance(address[0]);
    console.log("Balance ==> ", balance);

    var networkId = await web3.eth.net.getId();
    console.log(networkId);
    // document.getElementById("wallet").innerHTML = ;

    var network = document.getElementById("network");
    console.log(web3.utils.toHex(network.value));
    console.log("New network --->> " + network.value);
    document.getElementById("status").innerText = "Status :- Connected";
    document.getElementById("switchnetwork").style.display = "block";
    document.getElementById("address").style.display = "block";
    document.getElementById("ethvalue").style.display = "block";
    document.getElementById("submitbtn").style.display = "block";
    document.getElementById("ethbalance").style.display = "block";

    try {
      if (network.value == 1) {
        display = "Connected to Mainnet network";
      } else if (network.value == 4) {
        display = "Connected to Rinkeby network";
      } else if (network.value == 3) {
        display = "Connected to Ropsten network";
      } else if (network.value == 5) {
        display = "Connected to Goereli network";
      } else if (network.value == 42) {
        display = "Connected to Kovan network";
      } else if (network.value == 97) {
        display = "Connected to Binance Test network";
      }
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(network.value) }],
      });
      document.getElementById("status").innerText = "Status :- Connected";
      document.getElementById("ethconnect").value = address;
      document.getElementById("wallet").innerHTML = display;
      document.getElementById("ethbalance").value = "Get Balance";
    } catch (e) {
      console.log(e);
    }
  } else {
    alert("Select network before connecting.");
  }
}

async function getMetaBalance() {
  if (flag === 1) {
    var address = await ethereum.request({ method: "eth_requestAccounts" });
    var balance = await web3.eth.getBalance(address[0]);

    console.log("Balance from getMetaBalance() ==> ", balance);
    var balanceInETH = web3.utils.fromWei(balance, "ether");
    var digit5Bal = Number(balanceInETH).toFixed(5);
    //   console.log("5  digit ==> ", digit5Bal);
    //   console.log("5 digit bal = > ", balanceInETH.toFixed(5))
    document.getElementById("ethbalance").value = "Balance " + digit5Bal;
  } else {
    alert("You are not connected so connect to Metamask first.");
  }
}

function copyToClipboardForETH() {
  var text = document.getElementById("ethtx");

  // text.value.select();
  navigator.clipboard.writeText(text.value);
  alert("Hash copied to clipboard");
}

async function switchNetwork() {
  let web3 = new Web3(window.ethereum);

  var address = await ethereum.request({ method: "eth_requestAccounts" });
  if (flag === 1) {
    var network = document.getElementById("network");
    console.log(web3.utils.toHex(network.value));
    console.log("New network --->> " + network.value);

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(network.value) }],
      });
      if (network.value == 1) {
        display = "Connected to Mainnet network";
      }
      if (network.value == 4) {
        display = "Connected to Rinkeby network";
      }
      if (network.value == 3) {
        display = "Connected to Ropsten network";
      }
      if (network.value == 5) {
        display = "Connected to Goereli network";
      }
      if (network.value == 42) {
        display = "Connected to Kovan network";
      }
      if (network.value == 97) {
        display = "Connected to Binance Test network";
      }

      console.log("Network Name from switch ==> ", display);

      var balance = await web3.eth.getBalance(address[0]);
      var balanceInETH = web3.utils.fromWei(balance, "ether");
      document.getElementById("wallet").innerHTML = display;
      document.getElementById("ethbalance").value = balanceInETH;
      document.getElementById("address").value = "";
      document.getElementById("ethvalue").value = "";
      document.getElementById("ethtxn").style.display = "none";
      document.getElementById("ethtx").style.display = "none";
    } catch (e) {
      console.log(e);
    }
    getMetaBalance();
  } else {
    alert("You are not connected so please connect your metamask first.");
  }
}

async function sendFunction() {
  await ethereum.enable();
  var address = await ethereum.request({ method: "eth_requestAccounts" });

  try {
    var receiver = document.getElementById("address");
    var ethvalue = document.getElementById("ethvalue");
    var finalReceiver = receiver.value;
    var eth = ethvalue.value;
    console.log("RECEIVER ==== " + receiver.value);
    console.log("ETH VALUE ==== ", ethvalue.value);

    console.log("address[0] ---->  ", address[0]);

    web3.eth.sendTransaction(
      {
        to: finalReceiver,
        from: address[0],
        value: web3.utils.toWei(eth, "ether"),
      },
      function (err, res) {
        console.log("err", err);
        console.log("res", res);
        if (res) {
          alert("Metamask txn successfull ");
          document.getElementById("ethtx").value = res;
          document.getElementById("ethtxn").innerHTML =
            "Click on hash to copy.";
          document.getElementById("ethtx").style.display = "flex";
        } else {
          alert("User cancelled the txn.");
        }
      }
    );
  } catch (e) {
    alert("Wallet address invalid");
    console.log("error :-(  ------>> ", e);
  }
}

const USDTTokenAddress = "0x337610d27c682e347c9cd60bd4b3b107c9d34ddd";

async function customTransfer() {
  const account = await ethereum.request({ method: "eth_requestAccounts" });
  const USDTTokenAbi = [
    {
      constant: false,
      inputs: [
        {
          name: "_to",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      type: "function",
    },
    {
      constant: true,

      inputs: [{ name: "_owner", type: "address" }],

      name: "balanceOf",

      outputs: [{ name: "balance", type: "uint256" }],

      type: "function",
    },
  ];
  const contract = new web3.eth.Contract(USDTTokenAbi, USDTTokenAddress);

  const amount = document.getElementById("tokenvalue").value;
  const toAddress = document.getElementById("address").value;
  const value = amount * 10 ** 18;

  const res = await contract.methods.transfer(toAddress, value).send({ from: account });

  // const res = await contract.methods.balanceOf(toAddress).call();
  console.log(res);
}
