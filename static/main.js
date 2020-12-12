document.addEventListener('DOMContentLoaded', () => {



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

function addList(){
	const request = new XMLHttpRequest();

	request.open('POST','/defaultlist/last');
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
addList()


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