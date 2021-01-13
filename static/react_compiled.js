class Customerform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cname: '',
      mnumber: ''
    };
    this.handlenameChange = this.handlenameChange.bind(this);
    this.handlemnumChange = this.handlemnumChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlenameChange(event) {
    this.setState({
      cname: event.target.value
    });
  }

  handlemnumChange(event) {
    this.setState({
      mnumber: event.target.value
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.cname + ' Mobile number:' + this.state.mnumber);
    event.preventDefault();
    this.sendValues(this.state.cname, this.state.mnumber);
  }

  sendValues(cname, mnumber) {
    const request = new XMLHttpRequest();
    request.open('POST', '/addcustomer');

    request.onload = () => {
      const data = JSON.parse(request.responseText);

      if (data.status == 'success') {}

      ;
    }; //End of request.onload


    const data = new FormData();
    data.append('mobile', mnumber);
    data.append('name', cname);
    request.send(data);
  }

  render() {
    return (
      /*#__PURE__*/
      React.createElement("div", {
        className: "customerForm"
      },
      /*#__PURE__*/
      React.createElement("h1", null, "Add New Customer"),
      /*#__PURE__*/
      React.createElement("form", {
        onSubmit: this.handleSubmit
      },
      /*#__PURE__*/
      React.createElement("label", {
        for: "cname"
      }, "Name:"),
      /*#__PURE__*/
      React.createElement("br", null),
      /*#__PURE__*/
      React.createElement("input", {
        type: "text",
        name: "cname",
        value: this.cname,
        onChange: this.handlenameChange
      }),
      /*#__PURE__*/
      React.createElement("br", null),
      /*#__PURE__*/
      React.createElement("label", {
        for: "mnumber"
      }, "Mobile:"),
      /*#__PURE__*/
      React.createElement("br", null),
      /*#__PURE__*/
      React.createElement("input", {
        type: "tel",
        maxLength: "10",
        name: "mnumber",
        value: this.mnumber,
        onChange: this.handlemnumChange
      }),
      /*#__PURE__*/
      React.createElement("br", null),
      /*#__PURE__*/
      React.createElement("input", {
        type: "submit",
        value: "Submit"
      })))
    );
  }

}

ReactDOM.render(
/*#__PURE__*/
React.createElement(Customerform, null), document.getElementById('root'));
