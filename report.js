web3 = new Web3('https://ropsten.infura.io/v3/05d39b8bca0644818cb3c57fc11e9bf3');
var account;

account = '0x13C1F163E1A62686a939031BA1F8A724a8CBd913';
const privateKey1 = new ethereumjs.Buffer.Buffer('3050AE56B9C41190763A0A5FDC801AE189A2BB542E31314BD038AB48B42C086C', 'hex');

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"nik","type":"uint256"}],"name":"validNik","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNikList","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"provinceList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"province","type":"bytes32"}],"name":"validProvince","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"province","type":"bytes32"}],"name":"totalProvinceFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"provinceReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"},{"name":"province","type":"bytes32"},{"name":"nik","type":"uint256"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"time","type":"uint256"},{"indexed":false,"name":"candidateName","type":"bytes32"},{"indexed":false,"name":"nik","type":"uint256"},{"indexed":false,"name":"provinceName","type":"bytes32"}],"name":"VoteCandidate","type":"event"}]')

contract = new web3.eth.Contract(abi);
contract.options.address = "0x2799D255C36006251144cF7277E3d84577E17199";
const contractAddress = '0x2799D255C36006251144cF7277E3d84577E17199';

candidates = {"Candidate1": "candidate-1", "Candidate2": "candidate-2", "Candidate3": "candidate-3"};

$(document).ready(function() {
    var temp = [];
	var allEvents = [];
    contract.getPastEvents(
        'AllEvents', //depend on what type you want to get
        {
            fromBlock : 0, //depend on your smart contract
            toBlock : 'latest'
        },
        (err, events) => { 
            for (var key in events) {
                temp = [];
                // skip loop if the property is from prototype
                var obj = events[key];
                var dateTimeStamp = obj.returnValues.time;
                var d = new Date(dateTimeStamp * 1000);
                var s = d.toUTCString();
                s = s.substring(0,s.indexOf("GMT")) + "UTC";
                temp.push(s);
                temp.push(web3.utils.hexToString(obj.returnValues.candidateName));
                temp.push(obj.returnValues.nik);
                temp.push(web3.utils.hexToString(obj.returnValues.provinceName));
                allEvents.push(temp);
            }
        }
    );

    setTimeout(renderTable, 5000);

    function renderTable()
    {
        var str = '';
        for(var i = 0; i < allEvents.length;i++)
        {
            str += '\
                <tr>\
                    <td>'+allEvents[i][0]+'</td>\
                    <td>'+allEvents[i][2]+'</td>\
                    <td>'+allEvents[i][3]+'</td>\
                    <td>'+allEvents[i][1]+'</td>\
                </tr>\
            ';
        }
        $('#dataEvents').html(str);
        
        $('#tableEvents tfoot th').each( function () {
            var title = $(this).text();
            $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
        } );

        var table = $('#tableEvents').DataTable( {
          "ordering": false,
          "columnDefs": [
            {"className": "dt-center", "targets": "_all"}
          ],
        } );
        // Apply the search
        table.columns().every( function () {
            var that = this;
     
            $( 'input', this.footer() ).on( 'keyup change clear', function () {
                if ( that.search() !== this.value ) {
                    that
                        .search( this.value )
                        .draw();
                }
            } );
        } );
    }
});