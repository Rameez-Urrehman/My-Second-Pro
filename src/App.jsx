import { useState } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [touchedFields, setTouchedFields] = useState({
    title: false,
    price: false,
    stock: false
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (error) setError("");
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    if (error) setError("");
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
    if (error) setError("");
  };

  const handleBlurTitle = () => {
    setTouchedFields({ ...touchedFields, title: true });
    if (!title.trim() && !error) {
      setError("Please Enter the title in text");
    }
  };

  const handleBlurPrice = () => {
    setTouchedFields({ ...touchedFields, price: true });
    if (!price.trim() && !error && touchedFields.title) {
      setError("Please Enter the price in numbers");
    }
  };

  const handleBlurStock = () => {
    setTouchedFields({ ...touchedFields, stock: true });
    if (!stock.trim() && !error && touchedFields.title && touchedFields.price) {
      setError("Please Enter the stock in numbers");
    }
  };

  const handleFocus = () => {

    setError("");
  };

  const handleClick = () => {

    if (!title.trim()) {
      setError("Please Enter the title in text");
      setTouchedFields({ title: true, price: true, stock: true });
      return;
    }

    if (!price.trim()) {
      setError("Please Enter the price in numbers");
      setTouchedFields({ title: true, price: true, stock: true });
      return;
    }

    if (!stock.trim()) {
      setError("Please Enter the stock in numbers");
      setTouchedFields({ title: true, price: true, stock: true });
      return;
    }


    const item = {
      title: title,
      price: price,
      stock: stock
    };

    setItems([...items, item]);
    setTitle("");
    setPrice("");
    setStock("");
    setError("");
    setTouchedFields({ title: false, price: false, stock: false });
  };

  return (
    <>
      <div style={{
        background: 'red',
        padding: '2rem',
        marginTop: '8rem',
        margin: '7rem',
        textAlign: 'center'
      }}>

        <div>
          <div><h2>Just a one Question?</h2></div>


          <div>
            <input
              style={{ margin: '5px' }}
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
              onFocus={handleFocus}
              onBlur={handleBlurTitle}
            />
          </div>


          <div>
            <input
              style={{ margin: '5px' }}
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={handlePriceChange}
              onFocus={handleFocus}
              onBlur={handleBlurPrice}
            />
          </div>


          <div>
            <input
              style={{ margin: '5px' }}
              type="text"
              placeholder="Enter stock"
              value={stock}
              onChange={handleStockChange}
              onFocus={handleFocus}
              onBlur={handleBlurStock}
            />
          </div>
        </div>


        {error && (
          <div style={{
            color: 'yellow',
            fontWeight: 'bold',
            margin: '10px',
            fontSize: '16px',
            height: '20px'
          }}>
            {error}
          </div>
        )}

        <div>
          <button className="btn btn-primary" onClick={handleClick}>
            Save Info
          </button>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {items.map((item, index) => (
            <div key={index} className="card m-3 col-md-3">
              <div className="card-body">
                <h3 className="card-heading" style={{
                  color: '#ff6b00',
                  textAlign: 'center',
                  marginBottom: '15px',
                  fontStyle: 'italic'
                }}>
                  Sir G biryani Kb khilain ge?
                </h3>
                <h2 className="card-title">Title: {item.title}</h2>
                <h5 className="card-price">Price: {item.price}</h5>
                <p className="card-stock">Stock: {item.stock}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}