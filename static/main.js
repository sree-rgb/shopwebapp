document.addEventListener('DOMContentLoaded', () => {



function sendItem(){
	alert('yes')
	 const request1 = new XMLHttpRequest();
     const iname  =  document.querySelector('#iname').value;
     request1.open('POST','/additem');
       request1.onload = () => {
            //Extract  JSON data from request
            const data = JSON.parse(request.responseText);
            // Update the result div
            if (data.success) {
 
    }
    const data = new FormData();
    data.append('iname',iname);
        
        //Send request
    request1.send(data)
    return false;
}
document.querySelector('#itembutton').onclick=()=>{sendItem()
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