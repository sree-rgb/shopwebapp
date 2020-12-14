document.addEventListener('DOMContentLoaded', () => {
function clearList(){

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
function getMatchList(){
	const request4 = new XMLHttpRequest();
	const iname  =  document.querySelector('#iname').value;
	request4.open('POST','/getmatchlist');
	request4.onload = () =>{
		const response = JSON.parse(request4.responseText);
		alert(response.status)
	}
	request4.send()
}

clearList()

getMatchList()


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
				document.querySelector('table').append(tr)

				getTotal()
		}
	}
	request.send();
};



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
// getTotal()
	}, false);