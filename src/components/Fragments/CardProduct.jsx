import Button from "../Elements/Button";

const CardProduct = (props) => {
  const { children } = props;
  return (
    <div className="flex flex-col justify-between w-full max-w-sm bg-zinc-800 border border-gray-200 rounded-lg shadow overflow-hidden p-3 pb-5 m-2">
      {children}
    </div>
  );
};

const Header = (props) => {
  const { image } = props;
  return (
    <a href="#">
      <img src={image} alt="product" className="rounded aspect-[3/2]" />
    </a>
  );
};

const Body = (props) => {
  const { children, title } = props;
  return (
    <div className="h-full">
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-white pb-1 pt-5">
          {title.length > 30 ? title.slice(0, 30) + "..." : title}
        </h5>
        <p className="text-m text-white pb-5">
          {children.length > 100 ? children.slice(0, 100) + "..." : children}
        </p>
      </a>
    </div>
  );
};

const Footer = (props) => {
  const { price, handleAddToCart, id } = props;

  // const formattedPrice = new Intl.NumberFormat("id-ID", {
  //   style: "currency",
  //   currency: "IDR",
  // })
  //   .format(price)
  //   .replace(/(\.|,)00$/g, "");

  const formattedPrice = price
    .toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    })
    .replace(/(\.|,)00$/g, "");

  return (
    <div className="flex items-center justify-between">
      <span className="text-3xl font-bold text-white">{formattedPrice}</span>
      <Button
        className="bg-blue-600"
        onClick={() => {
          handleAddToCart(id);
        }}
      >
        Add to Cart
      </Button>
    </div>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
