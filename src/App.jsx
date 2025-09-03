import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";

// Define Zod schema
const productSchema = z.object({

  title: z.string()
    .min(5, "Title must be at least 5 characters")
    .max(15, "Title must be less than 15 characters"),



  price: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number (e.g., 10 or 10.99)")
    .min(1, "Price is required"),



  stock: z.string()
    .regex(/^\d+$/, "Stock must be a whole number")
    .min(1, "Stock is required")
});



export default function App() {
  const [items, setItems] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(productSchema)
  });

  const onSubmit = (data) => {
    setItems([...items, data]);
    reset();
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <div style={{
        textAlign: 'center',
        background: '#f5f5f5',
        border: '1px solid #000000ff',
        padding: '20px',
        width: '100%',
        marginBottom: '20px'
      }}>
        <h2>Add Product</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Enter The title"
            {...register("title")}
            style={{
              margin: '5px',
              padding: '8px',
              width: '250px',
              border: errors.title ? '1px solid red' : '1px solid #ccc'
            }}
          />
          {errors.title && (
            <p style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>
              {errors.title.message}
            </p>
          )}
          <br />

          <input
            type="text"
            placeholder="Enter The Price"
            {...register("price")}
            style={{
              margin: '5px',
              padding: '8px',
              width: '250px',
              border: errors.price ? '1px solid red' : '1px solid #ccc'
            }}
          />
          {errors.price && (
            <p style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>
              {errors.price.message}
            </p>
          )}
          <br />

          <input
            type="text"
            placeholder="Enter The Stock"
            {...register("stock")}
            style={{
              margin: '5px',
              padding: '8px',
              width: '250px',
              border: errors.stock ? '1px solid red' : '1px solid #ccc'
            }}
          />
          {errors.stock && (
            <p style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>
              {errors.stock.message}
            </p>
          )}
          <br />

          <button type="submit" style={{
            margin: '10px',
            padding: '10px 15px',
            background: '#007bff',
            color: 'white',
            border: 'none'
          }}>
            Add Product
          </button>
        </form>
      </div>

      <div className="container">
        <h2>Products</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {items.map((item, index) => (
            <div key={index} style={{
              border: '1px solid #ddd',
              padding: '15px',
              margin: '10px',
              borderRadius: '5px',
              width: '200px',
              background: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                background: '#007bff',
                color: 'white',
                padding: '10px',
                margin: '-15px -15px 15px -15px',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                Product Card
              </div>
              <h3 style={{ margin: '0 0 10px 0' }}>Title: {item.title}</h3>
              <p style={{ margin: '5px 0' }}>Price: {item.price}</p>
              <p style={{ margin: '5px 0' }}>Stock: {item.stock}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}