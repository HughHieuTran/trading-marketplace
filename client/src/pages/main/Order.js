import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../store/orderSlice';
import { Loading } from '../../component';
const Order = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-hidden  shadow sm:rounded-lg mt-10">
      {orders.length === 0 && (
        <h1 className="text-center text-sm md:text-2xl py-10">
          No Order generated
        </h1>
      )}
      {orders.length > 0 && (
        <ul className="border-t border-gray-200 ">
          {orders.map((order) => {
            return (
              <li
                key={order._id}
                className="grid grid-cols-1 md:grid-cols-2 odd:bg-white ml-0"
              >
                <h1 className="text-2xl md:text-4xl pl-5 pt-5">
                  Order - # {order._id}{' '}
                </h1>
                <ul className="flex flex-col items-center md:items-end justify-center mr-10">
                  {order.products.map((p) => (
                    <li key={p._id}>
                      {p.product.productName} ({p.product.brand}) | amount:{' '}
                      {p.quantity}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Order;
