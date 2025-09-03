import { useState } from "react";
import { useForm } from 'react-hook-form';

export default function App() {
  const [items, setItems] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    setItems([...items, data]);
    reset();
  };

  return (
    <div className="container" style={{padding:'20px'}}>
      <div style={{
        textAlign:'center',
        background:'#f5f5f5',
        border:'1px solid #000000ff',
        padding:'20px',
        width:'100%',
        marginBottom:'20px'
      }}>
        <h2>Add Product</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Enter The title"
            {...register("title",{
              required:"Enter The title",
            })}
            style={{
              margin:'5px',
              padding:'8px',
              width:'250px',
            }}
          />
          {errors.title&&(
            <p style={{color:'red',fontSize:'14px'}}>
              {errors.title.message}
            </p>
          )}
          <br/>

          <input
            type="text"
            placeholder="Enter The Price"
            {...register("price",{
              required:"Enter The Price",
            })}
            style={{
              margin:'5px',
              padding:'8px',
              width:'250px',
            }}
          />
          {errors.price&&(
            <p style={{color:'red',fontSize:'14px'}}>
              {errors.price.message}
            </p>
          )}
          <br/>

          <input
            type="text"
            placeholder="Enter The Stock"
            {...register("stock",{
              required:"Enter The Stock",
            })}
            style={{
              margin:'5px',
              padding:'8px',
              width:'250px',
            }}
          />
          {errors.stock&&(
            <p style={{color:'red',fontSize:'14px'}}>
              {errors.stock.message}
            </p>
          )}
          <br/>

          <button type="submit" style={{
            margin:'10px',
            padding:'10px 15px',
            background:'#007bff',
            color:'white',
            border:'none'
          }}>
            Add Product
          </button>
        </form>
      </div>

      <div className="container">
        <h2>Products</h2>
        <div style={{display:'flex',flexWrap:'wrap'}}>
          {items.map((item,index)=>(
            <div key={index} style={{
              border:'1px solid #ddd',
              padding:'15px',
              margin:'10px',
              borderRadius:'5px',
              width:'200px'
            }}>
              <h3>{item.title}</h3>
              <p>Price: {item.price}</p>
              <p>Stock: {item.stock}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}