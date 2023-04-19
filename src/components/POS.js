import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { ComponentToPrint } from "./ComponentToPrint";
import { useReactToPrint } from "react-to-print";

const POS = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get("http://localhost:5000/products");
    setProducts(await result.data);
    setIsLoading(false);
  };

  const addProductToCart = async (product) => {
    // check if the adding product exist
    let findProductInCart = await cart.find((i) => {
      return i.id === product.id;
    });

    if (findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(`Added ${newItem.name} to cart`, toastOptions);
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions);
    }
  };

  const removeProduct = async (product) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(newCart);
  };

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((icart) => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  return (
    <div class=" grid grid-cols-3 gap-4 bg-slate-200 h-[100vh]">
      {isLoading ? (
        <div className="w-[900px] bg-blue-600 flex items-center justify-center">
          <h1 className="text-3xl">LOADING</h1>
        </div>
      ) : (
        <div class=" h-[100vh] flex items-center justify-center py-2 flex-wrap gap-4 col-span-2 bg-gradient-to-r from-cyan-900 to-blue-500 ">
          {products.map((product, key) => (
            <div
              key={key}
              class="w-[30%] h-[290px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="p-3 rounded-t-lg h-[12rem] w-full "
                  src={product.image}
                  alt="product image"
                />
              </a>
              <div class="px-2 pb-2">
                <a href="#">
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900">
                    {product.name}
                  </h5>
                </a>
                <div class="flex items-center mt-1 mb-2">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>First star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Second star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Third star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fourth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fifth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                    5.0
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-3xl font-bold text-gray-900">
                    N{product.price}
                  </span>
                  <a
                    onClick={() => addProductToCart(product)}
                    href="#"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="absolute left-[67%] w-[450px]">
        <div style={{ display: "none" }}>
          <ComponentToPrint
            cart={cart}
            totalAmount={totalAmount}
            ref={componentRef}
          />
        </div>

        <div class=" w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header class="px-2 py-2 border-b border-gray-100">
            <h2 class="font-semibold text-gray-800">Customers</h2>
          </header>
          <div class="p-1">
            <div class="">
              <table class="table-auto w-full">
                <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">#</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Name</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Price</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">Qty</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">Total</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody class="text-sm divide-y divide-gray-100">
                  {cart
                    ? cart.map((cartProduct, key) => (
                        <tr key={key}>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-left">{cartProduct.id}</div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                <img
                                  class="rounded-full"
                                  src={cartProduct.image}
                                  width="40"
                                  height="40"
                                  alt="Burak Long"
                                />
                              </div>
                              <div class="font-medium text-gray-800">
                                {cartProduct.name}
                              </div>
                            </div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-left">{cartProduct.quantity}</div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-left font-medium text-green-500">
                              {cartProduct.price}
                            </div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-lg text-center">
                              {cartProduct.totalAmount}
                            </div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => removeProduct(cartProduct)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    : "No Item in Cart"}
                </tbody>
              </table>

              <h2 className="px-2 text-black">Total Amount: N{totalAmount}</h2>
            </div>
            <div className="mt-3">
              {totalAmount !== 0 ? (
                <div>
                  <button className="btn btn-primary" onClick={handlePrint}>
                    Pay Now
                  </button>
                </div>
              ) : (
                "Please add a product to the cart"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;
