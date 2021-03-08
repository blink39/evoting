var account;web3=new Web3("https://ropsten.infura.io/v3/05d39b8bca0644818cb3c57fc11e9bf3"),account="0x13C1F163E1A62686a939031BA1F8A724a8CBd913";const privateKey1=new ethereumjs.Buffer.Buffer("3050AE56B9C41190763A0A5FDC801AE189A2BB542E31314BD038AB48B42C086C","hex");abi=JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"nik","type":"uint256"}],"name":"validNik","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNikList","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"provinceList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"province","type":"bytes32"}],"name":"validProvince","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"province","type":"bytes32"}],"name":"totalProvinceFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"provinceReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"},{"name":"province","type":"bytes32"},{"name":"nik","type":"uint256"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"time","type":"uint256"},{"indexed":false,"name":"candidateName","type":"bytes32"},{"indexed":false,"name":"nik","type":"uint256"},{"indexed":false,"name":"provinceName","type":"bytes32"}],"name":"VoteCandidate","type":"event"}]'),contract=new web3.eth.Contract(abi),contract.options.address="0x2799D255C36006251144cF7277E3d84577E17199";const contractAddress="0x2799D255C36006251144cF7277E3d84577E17199";candidates={Candidate1:"candidate-1",Candidate2:"candidate-2",Candidate3:"candidate-3"},provinces=["Jakarta","Bandung","Surabaya","Bali"],$(document).ready(function(){candidateNames=Object.keys(candidates);for(var t=[],e=[],a=0;a<candidateNames.length;a++){let e=candidateNames[a];contract.methods.totalVotesFor(web3.utils.asciiToHex(e)).call().then(a=>{$("#"+candidates[e]).html(a),t.push([candidates[e],a])})}for(a=0;a<provinces.length;a++){let t=provinces[a];contract.methods.totalProvinceFor(web3.utils.asciiToHex(t)).call().then(a=>{e.push([t,a])})}setTimeout(function(){for(var a=new Array(3),n=new Array(4),i=0;i<t.length;i++)"candidate-1"==t[i][0]?a[0]=t[i][1]:"candidate-2"==t[i][0]?a[1]=t[i][1]:"candidate-3"==t[i][0]&&(a[2]=t[i][1]);for(var i=0;i<e.length;i++)"Jakarta"==e[i][0]?n[0]=e[i][1]:"Bandung"==e[i][0]?n[1]=e[i][1]:"Surabaya"==e[i][0]?n[2]=e[i][1]:"Bali"==e[i][0]&&(n[3]=e[i][1]);var o=document.getElementById("myChart").getContext("2d"),o=(new Chart(o,{type:"bar",data:{labels:["Candidate 1","Candidate 2","Candidate 3"],datasets:[{label:"Total of Votes",data:a,backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)"],borderWidth:1}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}}),document.getElementById("myPie").getContext("2d")),o=(new Chart(o,{type:"pie",data:{labels:["Candidate 1","Candidate 2","Candidate 3"],datasets:[{label:"Total of Votes",data:a,backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)"],borderWidth:1}]}}),document.getElementById("myChart2").getContext("2d")),o=(new Chart(o,{type:"bar",data:{labels:["Jakarta","Bandung","Surabaya","Bali"],datasets:[{label:"Total of Votes",data:n,backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(128, 0, 0, 0.2)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(128, 0, 0, 1)"],borderWidth:1}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}}),document.getElementById("myPie2").getContext("2d"));new Chart(o,{type:"pie",data:{labels:["Jakarta","Bandung","Surabaya","Bali"],datasets:[{label:"Total of Votes",data:n,backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(128, 0, 0, 0.2)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(128, 0, 0, 1)"],borderWidth:1}]}})},6e3)});