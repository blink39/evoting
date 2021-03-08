web3 = new Web3('https://ropsten.infura.io/v3/05d39b8bca0644818cb3c57fc11e9bf3');
var account;

account = '0x13C1F163E1A62686a939031BA1F8A724a8CBd913';

const privateKey1 = new ethereumjs.Buffer.Buffer('3050AE56B9C41190763A0A5FDC801AE189A2BB542E31314BD038AB48B42C086C', 'hex');

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"nik","type":"uint256"}],"name":"validNik","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNikList","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"provinceList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"province","type":"bytes32"}],"name":"validProvince","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"province","type":"bytes32"}],"name":"totalProvinceFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"provinceReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"},{"name":"province","type":"bytes32"},{"name":"nik","type":"uint256"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"time","type":"uint256"},{"indexed":false,"name":"candidateName","type":"bytes32"},{"indexed":false,"name":"nik","type":"uint256"},{"indexed":false,"name":"provinceName","type":"bytes32"}],"name":"VoteCandidate","type":"event"}]')

contract = new web3.eth.Contract(abi);

contract.options.address = "0x2799D255C36006251144cF7277E3d84577E17199";
const contractAddress = '0x2799D255C36006251144cF7277E3d84577E17199';

candidates = {"Candidate1": "candidate-1", "Candidate2": "candidate-2", "Candidate3": "candidate-3"};
provinces = ["Jakarta", "Bandung", "Surabaya", "Bali"];

function voteForCandidate(candidate) {
	candidateName = $("#selectCandidate").val();
	provinceName = $("#selectProvince").val();
	nik = $("#inputNIK").val();
	candidateSelect = $("#selectCandidate option:selected").text();
	provinceSelect = $("#selectProvince option:selected").text();

	contract.methods.validCandidate(web3.utils.asciiToHex(candidateName)).call().then((f) => {
		if(f){
			contract.methods.validProvince(web3.utils.asciiToHex(provinceName)).call().then((f) => {
				if(f){
					contract.methods.validNik(nik).call().then((f) => {
						if(!f){
							web3.eth.getTransactionCount(account, (err, txCount) => {
								//Smart contract data
								const data = contract.methods.voteForCandidate(web3.utils.asciiToHex(candidateName), web3.utils.asciiToHex(provinceName), nik).encodeABI();

								//Build the transaction
								const txObject = {
									nonce: web3.utils.toHex(txCount),
									gasLimit: web3.utils.toHex(2100000),
									gasPrice: web3.utils.toHex(web3.utils.toWei('6','gwei')),
									to: contractAddress,
									value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
									data: data
								}

								//Sign the transaction
								// const tx = new Tx(txObject, {'chain':'ropsten'});
								const tx = new ethereumjs.Tx(txObject, {'chain':'ropsten'});
								tx.sign(privateKey1);

								const serializeTx = tx.serialize().toString('hex');
								const raw = '0x' + serializeTx.toString('hex');

								// //Broadcast the transaction
								web3.eth.sendSignedTransaction(raw, (err, txHash) => {
									// console.log('err : ', err, 'txHash : ', txHash);
									$("#txNik").html(nik);
									$("#txProvince").html(provinceSelect);
									$("#txVote").html(candidateSelect);
									$("#txHash").html(txHash);
									let div_id = candidates[candidateName];

									contract.methods.totalVotesFor(web3.utils.asciiToHex(candidateName)).call().then((f) => {
										$("#" + div_id).html(f);
									})
								})
							})
						}
						else
						{
							alert('NIK Already Voted');
						}
					})
				}
				else
				{
					alert('Province Not Valid');
				}
			})
		}
		else{
			alert('Candidate Not Valid');
		}	
	})
}

$(document).ready(function() {
});