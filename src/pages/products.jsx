import { Fragment, useEffect, useRef, useState } from "react";
import Button from "../components/Elements/Button";
import CardProduct from "../components/Fragments/CardProduct";
import Counter from "../components/Fragments/Counter";
import { getProducts } from "../services/product.service";

// const products = [
//   {
//     id: 1,
//     name: "Men Shoes",
//     price: 1000000,
//     image: "/images/shoes-1.jpg",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam maiores repudiandae voluptatibus facere libero architecto!",
//   },
//   {
//     id: 2,
//     name: "Women Shoes",
//     price: 2000000,
//     image: "/images/shoes-1.jpg",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque dolore voluptates placeat ullam, exercitationem nesciunt magni debitis repellat reiciendis voluptate eius fugit alias harum aliquid distinctio aspernatur dolorem temporibus mollitia.",
//   },
//   {
//     id: 3,
//     name: "Men Shoes",
//     price: 3000000,
//     image: "/images/shoes-1.jpg",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, nisi.",
//   },
//   {
//     id: 4,
//     name: "Women Shoes",
//     price: 4000000,
//     image: "/images/shoes-1.jpg",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus blanditiis sapiente porro assumenda doloribus itaque, optio nostrum exercitationem?",
//   },
// ];

const email = localStorage.getItem("email");

const ProductsPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useEffect(() => {
    getProducts((res) => {
      setProducts(res);
    });
  }, []);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);

      setTotalPrice(sum);

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = "/login";
  };

  const handleAddToCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id, qty: 1 }]);
    }
  };

  // useRef
  const cartRef = useRef(JSON.parse(localStorage.getItem("cart")) || []);

  const handleAddToCartRef = (id) => {
    cartRef.current = [...cartRef.current, { id, qty: 1 }];
    localStorage.setItem("cart", JSON.stringify(cartRef.current));
  };

  const totalPriceRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);

  return (
    <Fragment>
      <div className="flex justify-end h-20 bg-blue-950 text-white items-center px-10">
        {email}
        <Button className="ml-5 bg-black" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap w-3/4">
          {products.length > 0 &&
            products.map((product) => (
              <CardProduct key={product.id}>
                <CardProduct.Header image={product.image} />

                <CardProduct.Body title={product.title}>
                  {product.description}
                </CardProduct.Body>

                <CardProduct.Footer
                  price={product.price}
                  id={product.id}
                  handleAddToCart={handleAddToCart}
                  // handleAddToCart={handleAddToCartRef}
                />
              </CardProduct>
            ))}
        </div>

        <div className="flex flex-col w-2/5 px-4 border-l-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-3">Cart</h1>

          <table className="text-left table-auto border-collapse border-spacing-2 border">
            <thead>
              <tr>
                <th className="border bg-blue-950 text-white p-2">Product</th>
                <th className="border bg-blue-950 text-white p-2">Price</th>
                <th className="border bg-blue-950 text-white p-2">Quantity</th>
                <th className="border bg-blue-950 text-white p-2">Total</th>
              </tr>
            </thead>

            <tbody>
              {/* {cartRef.current.map((item) => { */}
              {products.length > 0 &&
                cart.map((item) => {
                  const product = products.find(
                    (product) => product.id === item.id
                  );

                  const formattedPrice = product.price
                    .toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .replace(/(\.|,)00$/g, "");

                  const formattedTotalPrice = (product.price * item.qty)
                    .toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .replace(/(\.|,)00$/g, "");

                  return (
                    <tr key={item.id}>
                      <td className="pl-2 w-2/5  border">
                        {product.title.length > 25
                          ? product.title.slice(0, 25) + "..."
                          : product.title}
                      </td>
                      <td className="w-1/5  border">{formattedPrice}</td>
                      <td className="w-1 text-center border">{item.qty}</td>
                      <td className="w-1/4  border">{formattedTotalPrice}</td>
                    </tr>
                  );
                })}

              <tr ref={totalPriceRef}>
                <td colSpan={3} className="pl-2">
                  <b>Total Price</b>
                </td>

                <td className="border">
                  <b>
                    {totalPrice
                      .toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                      .replace(/(\.|,)00$/g, "")}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="mt-5 mb-9">
        <Counter></Counter>
      </div> */}
    </Fragment>
  );
};

export default ProductsPage;
