class Viewcustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [{
        id: 0,
        name: 'suhaas',
        mnum: '908478399'
      }]
    };
  }

  getValues() {
    const request = new XMLHttpRequest();
    request.open('GET', '/viewcustomers');

    request.onload = () => {
      const data = JSON.parse(request.responseText);
      this.setState({
        customers: data
      });
      this.forceUpdate();
    };

    request.send();
  } //End 


  componentDidMount() {
    this.getValues();
  }

  render() {
    return (
      /*#__PURE__*/
      React.createElement("table", null,
      /*#__PURE__*/
      React.createElement("thead", null,
      /*#__PURE__*/
      React.createElement("tr", null,
      /*#__PURE__*/
      React.createElement("th", null, "Customer Mobile"),
      /*#__PURE__*/
      React.createElement("th", null, "Customer Name"))),
      /*#__PURE__*/
      React.createElement("tbody", null, this.state.customers.map(customer =>
      /*#__PURE__*/
      React.createElement("tr", {
        key: customer.id
      },
      /*#__PURE__*/
      React.createElement("td", null, customer.mnum),
      /*#__PURE__*/
      React.createElement("td", null, customer.name)))))
    );
  }

}

ReactDOM.render(
/*#__PURE__*/
React.createElement(React.Fragment, null,
/*#__PURE__*/
React.createElement(Customerform, null),
/*#__PURE__*/
React.createElement(Viewcustomers, null)), document.getElementById('root'));

