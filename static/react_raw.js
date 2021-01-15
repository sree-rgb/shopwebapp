
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
        {this.state.customers.map((customer) =>  <tr key={customer.id}><td>{customer.mnum}</td><td>{customer.name}</td></tr>)}
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