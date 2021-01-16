class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      mnum: props.mnum,
      edit_state: false,
      new_name: props.name,
      new_number: props.mnum
    };
    this.handleChange = this.handleChange.bind(this);
  }

  sendValues(id, cname, mnumber) {
    const request = new XMLHttpRequest();
    request.open('POST', '/editcustomer');

    request.onload = () => {
      const data = JSON.parse(request.responseText);

      if (data.status == 'success') {
        this.setState({
          edit_state: 'saved'
        });
      }

      ;
    }; //End of request.onload


    const data = new FormData();
    data.append('id', id);
    data.append('mobile', mnumber);
    data.append('name', cname);
    request.send(data);
  }

  handleChange(event) {
    const target_name = event.target.name;

    if (target_name == 'name') {
      this.setState({
        new_name: event.target.value
      });
    }

    if (target_name == 'mnum') {
      this.setState({
        new_number: event.target.value
      });
    }
  }

  edit() {
    if (this.state.edit_state == 'saving') {
      return (
        /*#__PURE__*/
        React.createElement("tr", null,
        /*#__PURE__*/
        React.createElement("td", null, "Saving..."))
      );
    }

    if (this.state.edit_state == 'saved') {
      return (
        /*#__PURE__*/
        React.createElement("tr", null,
        /*#__PURE__*/
        React.createElement("td", null, "Saved.Refresh Page to see changes."))
      );
    }

    if (this.state.edit_state == false) {
      return (
        /*#__PURE__*/
        React.createElement("tr", {
          key: this.props.id
        },
        /*#__PURE__*/
        React.createElement("td", null, this.state.mnum),
        /*#__PURE__*/
        React.createElement("td", null, this.state.name),
        /*#__PURE__*/
        React.createElement("td", null,
        /*#__PURE__*/
        React.createElement("button", {
          onClick: () => {
            this.setState({
              edit_state: true
            });
          }
        }, "Edit")))
      );
    } else {
      return (
        /*#__PURE__*/
        React.createElement("tr", {
          key: this.props.id
        },
        /*#__PURE__*/
        React.createElement("td", null,
        /*#__PURE__*/
        React.createElement("input", {
          placeholder: this.state.mnum,
          onChange: this.handleChange,
          name: "mnum"
        })),
        /*#__PURE__*/
        React.createElement("td", null,
        /*#__PURE__*/
        React.createElement("input", {
          placeholder: this.state.name,
          name: "name",
          onChange: this.handleChange
        })),
        /*#__PURE__*/
        React.createElement("td", null,
        /*#__PURE__*/
        React.createElement("button", {
          onClick: () => {
            this.setState({
              edit_state: false
            });
          }
        }, "Cancel")),
        /*#__PURE__*/
        React.createElement("td", null,
        /*#__PURE__*/
        React.createElement("button", {
          onClick: () => {
            this.setState({
              edit_state: 'saving'
            });
            this.sendValues(this.props.id, this.state.new_name, this.state.new_number);
          }
        }, "Save")))
      );
    }
  }

  render() {
    return this.edit();
  }

}

;

class Viewcustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
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
      React.createElement(Customer, {
        key: customer.id,
        id: customer.id,
        mnum: customer.mnum,
        name: customer.name
      }))))
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

