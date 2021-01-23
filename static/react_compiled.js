function Additemform() {
  return (
    /*#__PURE__*/
    React.createElement("div", {
      className: "item_main"
    },
    /*#__PURE__*/
    React.createElement("h2", null, " Add Item "),
    /*#__PURE__*/
    React.createElement("div", {
      className: "additemform"
    },
    /*#__PURE__*/
    React.createElement("label", {
      htmlFor: "iname"
    }, "Item name:"),
    /*#__PURE__*/
    React.createElement("input", {
      type: "text",
      name: "itemname"
    }),
    /*#__PURE__*/
    React.createElement("br", null),
    /*#__PURE__*/
    React.createElement("label", {
      htmlFor: "qty"
    }, "Default Quantity:"),
    /*#__PURE__*/
    React.createElement("input", {
      name: "qty"
    }),
    /*#__PURE__*/
    React.createElement("br", null),
    /*#__PURE__*/
    React.createElement("label", {
      htmlFor: "rate"
    }, "Default Rate:"),
    /*#__PURE__*/
    React.createElement("input", {
      name: "rate"
    }),
    /*#__PURE__*/
    React.createElement("br", null)))
  );
}

ReactDOM.render(
/*#__PURE__*/
React.createElement(React.Fragment, null,
/*#__PURE__*/
React.createElement(Additemform, null)), document.getElementById('root'));

