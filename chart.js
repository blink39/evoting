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

$(document).ready(function() {
	candidateNames = Object.keys(candidates);
	var vote = [];
    var voteProvince = [];
	for(var i = 0; i < candidateNames.length; i++) {
		let name = candidateNames[i];
		contract.methods.totalVotesFor(web3.utils.asciiToHex(name)).call().then((f) => {
			$("#" + candidates[name]).html(f);
			vote.push([candidates[name], f]);
		})
	}

    for(var i = 0; i < provinces.length; i++) {
        let name = provinces[i];
        contract.methods.totalProvinceFor(web3.utils.asciiToHex(name)).call().then((f) => {
            voteProvince.push([name, f]);
        })
    }
    setTimeout(renderGraph, 6000);

    function renderGraph()
    {
        var voteData = new Array(3);
        var voteDataProvince = new Array(4);

        for(var i=0; i < vote.length; i++)
        {
        	if(vote[i][0] == 'candidate-1')
        	{
        		voteData[0] = vote[i][1];
        	}else if(vote[i][0] == 'candidate-2')
        	{
        		voteData[1] = vote[i][1];
        	}else if(vote[i][0] == 'candidate-3')
        	{
        		voteData[2] = vote[i][1];
        	}
        }

        for(var i=0; i < voteProvince.length; i++)
        {
            if(voteProvince[i][0] == 'Jakarta')
            {
                voteDataProvince[0] = voteProvince[i][1];
            }else if(voteProvince[i][0] == 'Bandung')
            {
                voteDataProvince[1] = voteProvince[i][1];
            }else if(voteProvince[i][0] == 'Surabaya')
            {
                voteDataProvince[2] = voteProvince[i][1];
            }else if(voteProvince[i][0] == 'Bali')
            {
                voteDataProvince[3] = voteProvince[i][1];
            }
        }
        
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
                datasets: [{
                    label: 'Total of Votes',
                    data: voteData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        var ctx = document.getElementById('myPie').getContext('2d');
        var myPie = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
                datasets: [{
                    label: 'Total of Votes',
                    data: voteData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            }
        });

        var ctx = document.getElementById('myChart2').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jakarta', 'Bandung', 'Surabaya', 'Bali'],
                datasets: [{
                    label: 'Total of Votes',
                    data: voteDataProvince,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(128, 0, 0, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(128, 0, 0, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        var ctx = document.getElementById('myPie2').getContext('2d');
        var myPie = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Jakarta', 'Bandung', 'Surabaya', 'Bali'],
                datasets: [{
                    label: 'Total of Votes',
                    data: voteDataProvince,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(128, 0, 0, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(128, 0, 0, 1)',
                    ],
                    borderWidth: 1
                }]
            }
        });
    }
});