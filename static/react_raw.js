class Customer extends React.Component{
  constructor(props){
     super(props);
    this.state = {name:props.name,mnum:props.mnum}
    };
  
  render(){
    return  (<tr key={this.props.id}><td>{this.state.mnum}</td><td>{this.state.name}</td></tr>)
  }
};

class Viewcustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [{id:0,name:'react_name',mnum:'000000000'}]
    };
  }
 getValues() {
    const request = new XMLHttpRequest();
    request.open('GET', '/viewcustomers');

    request.onload = () => {
      const data = JSON.parse(request.responseText);

      this.setState({customers:data})
      this.forceUpdate()


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
         {this.state.customers.map((customer) =>  <Customer key={customer.id} id={customer.id} mnum={customer.mnum} name={customer.name} />)}

        </tbody>
      </table>
     )
    }
}


ReactDOM.render(
  <>
  <Customerform />
  <Viewcustomers/>
  </>,
  document.getElementById('root')
);