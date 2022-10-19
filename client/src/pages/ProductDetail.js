import React, { useEffect } from 'react';
import { Navbar, SmallSidebar } from '../component';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getProductDetail } from '../store/productSlice';
import { MdAddShoppingCart } from 'react-icons/md';
import { IoArrowBackCircle } from 'react-icons/io5';

const ProductDetail = () => {
  const {
    productName,
    brand,
    imageUrl,
    condition,
    status,
    shopLocation,
    sellerName,
  } = useSelector((state) => state.getProduct);
  const { user } = useSelector((state) => state.auth);
  const { prodId } = useParams();
  const { showSidebar } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductDetail(prodId));
    // eslint-disable-next-line
  }, [prodId]);

  const addToCartHandler = (e) => {
    if (!user) {
      navigate('/register');
    }
    console.log('add to cart');
  };

  return (
    <div>
      {showSidebar && <SmallSidebar />}
      <Navbar />
      <div className="text-center grid md:grid-flow-col grid-flow-row mt-10">
        <div>
          <h1 className=" pb-5 text-primary-500 font-bold">{productName}</h1>
          <img
            className="mx-auto block w-[700px] h-auto p-10"
            src={imageUrl}
            alt={productName}
          />
        </div>
        <div className=" flex flex-col justify-center items-center md:items-start mt-16 pr-16">
          <h2> brand: {brand} </h2>
          <p className="text-center"> Condition: {condition} </p>
          <p> status: {status} </p>
          <p> shopLocation: {shopLocation} </p>
          <p className="capitalize"> Seller information: {sellerName} </p>

          <button className="btn mb-5" onClick={addToCartHandler}>
            <MdAddShoppingCart className="inline-block" /> Add to Cart
          </button>

          <Link className="btn" to={user ? '/shop' : '/publicShop'}>
            <IoArrowBackCircle className="inline-block" /> Back to the market
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
