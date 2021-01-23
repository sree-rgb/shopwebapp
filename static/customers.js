class Customer extends React.Component{
  constructor(props){
     super(props);
    this.state = {name:props.name,mnum:props.mnum,edit_state:false,new_name:props.name,new_number:props.mnum}
    this.handleChange = this.handleChange.bind(this);

    };
  
  sendValues(id,name, mnum) {
    const request = new XMLHttpRequest();
    request.open('POST', '/editcustomer');

    request.onload = () => {
      const data = JSON.parse(request.responseText);

      if (data.status == 'success') {
        this.setState({edit_state:'saved'})
        
      }

      ;
    }; //End of request.onload


    const data = new FormData();
    data.append('id', id)
    data.append('mobile', mnum);
    data.append('name', name);
    request.send(data);
   
  }
  handleChange(event) {   
   const target_name=event.target.name

   if (target_name=='name'){
    this.setState({new_name:event.target.value})
   }
   if (target_name=='mnum'){
    this.setState({new_number:event.target.value})
   }
    }
  edit(){
    if (this.state.edit_state=='saving'){
      return(
        <tr>
          <td>Saving...</td>
        </tr>
        )
    }
    if (this.state.edit_state=='saved'){
      

      return(
        <tr>
          <td>Saved.Refresh Page to see changes.</td>

        </tr>
        )
    }
    if (this.state.edit_state=='delete'){
      return(
        <tr>
          <td>Do you really want</td><td> to delete this customer?.</td>
          <td> <button onClick={()=>{this.props.delcustomer({id:this.props.id})}}>Yes</button> </td> <td><button onClick={()=>{this.setState({edit_state:false})}}>No</button></td>

        </tr>
        )
    }

    if (this.state.edit_state==false){
      return (
        <tr key={this.props.id}>
          <td>{this.state.mnum}</td>
          <td>{this.state.name}</td>
          <td><button onClick={()=>{this.setState({edit_state:true})}}>Edit</button></td>
          <td><button onClick={()=>{this.setState({edit_state:'delete'})}}>Delete</button></td>
        </tr>)
        }
    
    else{

      return(<tr key={this.props.id}><td><input maxLength="10" placeholder={this.state.mnum} onChange={this.handleChange} name='mnum'/></td><td><input placeholder={this.state.name} name='name' onChange={this.handleChange} /></td>
        <td>
          <button onClick={()=>{this.setState({edit_state:false})}}>
              Cancel</button></td>
            <td>
          <button onClick={()=>{this.setState({edit_state:'saving'}); this.sendValues(this.props.id,this.state.new_name,this.state.new_number)}}>
              Save</button></td></tr>)

    }
  }
  render(){
    return  (this.edit())
  }
};

class Viewcustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
    this.delcustomer=this.delcustomer.bind(this);
    this.getValues=this.getValues.bind(this)

  }
  // editcustomer(values,){
  //   // NotImplemented correctly
  //   //
  //     this.setState({customers:this.state.customers.map((customer)=>{
  //     if (customer.id==values.id){
  //       return {'id':values.id,'name':values.name,'mnum':values.mnum}
  //     }
  //     else{
  //       return customer
  //     }
  //   }
  //     )
  // }
  //     )
  // console.log(this.state.customers)
  // }
  delcustomer(values){
    
      const request = new XMLHttpRequest();
    request.open('POST', '/delcustomer');

    request.onload = () => {
      const data = JSON.parse(request.responseText);

      if (data.status == 'success') {
        this.getValues()
 
      }

      ;
    }; //End of request.onload


    const data = new FormData();
    data.append('id', values.id)
    request.send(data);
   
  }
 getValues() {
    const request = new XMLHttpRequest();
    request.open('GET', '/viewcustomers');

    request.onload = () => {
      const data = JSON.parse(request.responseText);

      this.setState({customers:data})



      ;
    };
    request.send()
    } //End 
componentDidMount(){
this.getValues()
}
  render(){
    
    return(
      <table>
        <thead>
          <tr>
          <th>Customer Mobile</th>
          <th>Customer Name</th>
          </tr>
       </thead>
       <tbody>
         {this.state.customers.map((customer) =>  <Customer key={customer.id} id={customer.id} mnum={customer.mnum} name={customer.name} getValues={this.getValues} delcustomer={this.delcustomer}/>)}

        </tbody>
      </table>
     )
    }
}