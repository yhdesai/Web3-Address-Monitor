const Web3 = require('web3')
const { IncomingWebhook } = require("@slack/webhook");

var web3 = new Web3(Web3.givenProvider || 'wss://mainnet.infura.io/ws');
const newTransactionLog = new IncomingWebhook("https://hooks.slack.com/...");

var subscription1 = web3.eth.subscribe('logs', {
    address: '0x2859E22Bd00FBE9d3339bE5bAa4d36F5173Cd30e'
}, function (error, result) {
})
.on("data", function (log) {
    //console.log(log);
    web3.eth.getTransaction(log.transactionHash)
        .then(function (transaction) {
            //console.log(transaction)
            if (transaction.value > 0) {
              console.log("Ether sent from " + transaction.from + " to " + transaction.to)
              newTransactionLog.send({text: "Ether sent from " + transaction.from + " to " + transaction.to})
            }
        })
})