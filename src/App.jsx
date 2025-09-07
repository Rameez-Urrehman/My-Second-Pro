import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from "./components/Navbar";

const productSchema = yup.object({
  title: yup.string()
    .min(5, "Title must be at least 5 characters")
    .max(15, "Title must be less than 15 characters")
    .required("Title is required"),
  price: yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  stock: yup.number()
    .typeError("Stock must be a number")
    .integer("Stock must be a number")
    .min(0, "Stock cannot be negative")
    .required("Stock is required")
});

export default function App() {
  const [items, setItems] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(productSchema)
  });

  const onSubmit = (data) => {
    setItems([...items, data]);
    reset();
  };

  return (
    <div>
      <Navbar logo="Product Manager" name="Home" />

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Add Product</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                      placeholder="Product title"
                      {...register("title")}
                    />
                    {errors.title && (
                      <div className="invalid-feedback">
                        {errors.title.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                      placeholder="Price"
                      {...register("price")}
                    />
                    {errors.price && (
                      <div className="invalid-feedback">
                        {errors.price.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                      placeholder="Stock quantity"
                      {...register("stock")}
                    />
                    {errors.stock && (
                      <div className="invalid-feedback">
                        {errors.stock.message}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Add Product
                  </button>
                </form>
              </div>
            </div>

            <div>
              <h2 className="mb-4">Products</h2>

              {items.length > 0 && (
                <div className="row">
                  {items.map((item, index) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-3">
                      <div className="card h-100 shadow-sm">
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text mb-1">Price: {parseFloat(item.price).toFixed(2)}</p>
                          <p className="card-text">Stock: {item.stock}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}