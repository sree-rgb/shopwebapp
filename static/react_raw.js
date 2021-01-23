function Additemform(){
  return (
    <div className='item_main'>
    <h2> Add Item </h2>
    <div className='additemform'>
      <label htmlFor="iname">Item name:</label>
      <input type='text' name='itemname' />
      <br/>
      <label htmlFor="qty">Default Quantity:</label>
      <input  name='qty' />
      <br/>
      <label htmlFor="rate">Default Rate:</label>
      <input  name='rate' />
      <br/>
    </div>
    </div>
    )
}

ReactDOM.render(
  <>
  <Additemform />
  </>,
  document.getElementById('root')
);