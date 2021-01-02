document.addEventListener('DOMContentLoaded', () => {


function clearList(){
	// Clears current billing list on server

	 const request3 = new XMLHttpRequest();
     request3.open('POST','/clearlist');
       request3.onload = () => {
            //Extract  JSON data from request
            const response = JSON.parse(request3.responseText);
            // Update the result div
            if (response.status=='success') {
            	
    }
}

    request3.send();
        //Send request
    

};

function makeMatch(item){
	// Modify input values rate qty, amt to that the selected item from matchlist
	btn=document.createElement('button')
	btn.textContent=item[0]
	btn.onclick=()=>{
		document.querySelector('#iname').value=item[0]
		document.querySelector('#rate').value=item[1]
		document.querySelector('#qty').value=item[2]
		amtCalculate()
	};
	li=document.createElement('li')
	li.append(btn)
	document.querySelector('ul').append(li)
}
function getMatchList(){
	// Tries to match user given itemname to that prexisting itemlist imported from csv on serverside
	const request4 = new XMLHttpRequest();
	const iname  =  document.querySelector('#iname').value;
	request4.open('POST','/getmatchlist');
	request4.onload = () =>{
		clearMatchList()
		const response = JSON.parse(request4.responseText);
		response.forEach(makeMatch)
	}
	const data = new FormData();
	data.append('iname',iname);
	request4.send(data)
}
function clearMatchList(){
	// clears matchlist
	document.querySelector('ul').innerHTML=''
}
clearList()

getMatchList()
rateAmountTracker()
// clearMatchList()
document.querySelector('#iname').onkeyup=()=>{
	getMatchList()
}

function sendItem(){

	 const request1 = new XMLHttpRequest();
     const iname  =  document.querySelector('#iname').value;
     const rate  =  document.querySelector('#rate').value;
     const qty  =  document.querySelector('#qty').value;
     request1.open('POST','/additem');
       request1.onload = () => {
            //Extract  JSON data from request
            const response = JSON.parse(request1.responseText);
            // Update the result div
            if (response.status=='success') {
            	addList()
    }
}
    const data = new FormData();
    data.append('iname',iname);
    data.append('rate',rate);
    data.append('qty',qty);
    request1.send(data);
        //Send request
    

    return false;

};
document.querySelector('#itembutton').onclick=()=>{sendItem()
};
function getBalance(){

	 const request2 = new XMLHttpRequest();
     const payment  =  document.querySelector('#payment').value;
     request2.open('POST','/payment');
       request2.onload = () => {
            //Extract  JSON data from request
            const response = JSON.parse(request2.responseText);
            // Update the result div
            if (response.status=='success') {
            	document.querySelector('#balance').textContent=response.balance
            	document.querySelector('#amt_paid').textContent=payment

    }
}
    const data = new FormData();
    data.append('payment',payment);
    request2.send(data);
        //Send request
    

    return false;

};
document.querySelector('#paymentbutton').onclick=()=>{getBalance()
};

function addList(){
	const request = new XMLHttpRequest();

	request.open('POST','/defaultlist');
		request.onload = () =>{
			const data =  JSON.parse(request.responseText);
			if (data.status == 'success'){

				var tr = document.createElement("tr");
				tr.id='tr'+data.id

				var td = document.createElement("td");
				td.textContent=data.itemname
				tr.append(td)
				var td2 = document.createElement("td");
				td2.textContent=data.rate
				tr.append(td2)
				var td3 = document.createElement("td");
				td3.textContent=data.qty
				tr.append(td3)
				var td4 = document.createElement("td");
				td4.textContent=data.amt
				tr.append(td4)
				var td5 = document.createElement("td");
				td5.className='no-print'
				var btn5 = document.createElement("button");

				btn5.textContent='Delete'

				btn5.onclick=function(){delItem(data.id)};
				
				td5.append(btn5)
				tr.append(td5)
				document.querySelector('table').append(tr)
				getTotal()
		}
	}
	request.send();
};




function delItem(id){
	const request = new XMLHttpRequest();
	request.open('GET','/delitem/'+id);
	request.onload = () =>{
		const response =  JSON.parse(request.responseText);
		if (response.status=='success'){
			delRow(id)


		}
	}
	request.send();
}

// getTotal()
	}, false);
function getTotal(){
	const request = new XMLHttpRequest();
	request.open('POST','/gettotal');
	request.onload = () =>{

		const data =  JSON.parse(request.responseText);
			if (data.status == 'success'){
				document.querySelector('#Total').textContent=data.total

		}
	}
	request.send();
};

function delRow(id){
	
	length_of_table=document.querySelector('table').childElementCount

	to_be_removed=document.querySelector('#tr'+id)
	document.querySelector('table').removeChild(to_be_removed)
	// to_be_removed.style.display = "none"; 

	getTotal()
}
function rateCalculate(){
	let amt=document.querySelector('#amt')
	let rate=document.querySelector('#rate')
	let qty=document.querySelector('#qty')
	namt=parseFloat(amt.value)
	nqty=parseFloat(qty.value)
	nrate=Math.round((namt/nqty)* 100) / 100
	rate.value=nrate
	return true

}
function amtCalculate(){
	let amt=document.querySelector('#amt')
	let rate=document.querySelector('#rate')
	let qty=document.querySelector('#qty')
	nrate=parseFloat(rate.value)
	nqty=parseFloat(qty.value)
	namt=Math.round((nrate*nqty)* 100) / 100
	amt.value=namt
	return true

}
function rateAmountTracker(){
	let amt=document.querySelector('#amt')
	let rate=document.querySelector('#rate')
	amt.onchange=()=>{
		rateCalculate();
	}
	rate.onchange=()=>{
		amtCalculate();
	}
}