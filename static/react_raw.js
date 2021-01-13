class Customerform extends React.Component{
  constructor(props){
    super(props);
    this.state={cname:'',mnumber:''};
    this.handlenameChange = this.handlenameChange.bind(this);
    this.handlemnumChange = this.handlemnumChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
      }

  handlenameChange(event) {  
    this.setState({cname: event.target.value});  }
  handlemnumChange(event) {  
    this.setState({mnumber: event.target.value});  }
  
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.cname+' Mobile number:'+this.state.mnumber);
    event.preventDefault();
    this.sendValues(this.state.cname,this.state.mnumber)
    }
  sendValues(cname,mnumber){
    const request = new XMLHttpRequest();
    request.open('POST','/addcustomer');
    request.onload = () =>{
      const data =  JSON.parse(request.responseText);
      if (data.status == 'success'){

      };
    }; //End of request.onload
    const data = new FormData();
    data.append('mobile', mnumber)
    data.append('name', cname);
    request.send(data);
    }; 

  


  render(){

    return (
      <div className='customerForm'>
        <h1>Add New Customer</h1>
        <form onSubmit={this.handleSubmit}>
          <label for="cname">Name:</label>
          <br/>
          <input type='text' name='cname' value={this.cname} onChange={this.handlenameChange} />
          <br/>
          <label for="mnumber">Mobile:</label><br/>
          <input type='tel' maxLength='10' name='mnumber' value={this.mnumber} onChange={this.handlemnumChange}/>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
      )
    }
  }

ReactDOM.render(
  <Customerform/>,
  document.getElementById('root')
);