import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const trimProductName = (name) => {
    if (name.length > 30) {
      return name.slice(0, 20) + "...";
    }
    return name;
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel fade pause='hover' className='bg-primary mb-4' touch={true}>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`} className='d-block'>
            <div
              style={{
                height: "300px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
              }}
              className='bg-white'>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className='w-200 d-block w-80'
                style={{ objectFit: "cover", height: "100%" }}
              />
            </div>
            <h3 className='text-center' style={{ opacity: "0" }}>
              {product.description}
            </h3>
            <div className='caption-container'>
              <Carousel.Caption className='carousel-caption'>
                <h2>
                  {trimProductName(product.name)} (${product.price})
                </h2>
              </Carousel.Caption>
            </div>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
