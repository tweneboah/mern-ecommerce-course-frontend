import { useEffect, useState } from "react";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOrderItemQty,
  getCartItemsFromLocalStorageAction,
  removeOrderItemQty,
} from "../../../redux/slices/cart/cartSlices";
import { fetchCouponAction } from "../../../redux/slices/coupons/couponsSlice";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";

export default function ShoppingCart() {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, [dispatch]);
  //coupon state
  const [couponCode, setCouponCode] = useState(null);
  const applyCouponSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCouponAction(couponCode));
    setCouponCode("");
  };

  //get coupon  from store
  const { coupon, loading, error, isAdded } = useSelector(
    (state) => state?.coupons
  );
  //get cart items from store
  const { cartItems } = useSelector((state) => state?.carts);
  //add to cart handler
  const changeOrderItemQtyHandler = (productId, qty) => {
    dispatch(changeOrderItemQty({ productId, qty }));
    dispatch(getCartItemsFromLocalStorageAction());
  };
  console.log(cartItems);
  //calculate total price
  let sumTotalPrice = 0;
  sumTotalPrice = cartItems?.reduce((acc, current) => {
    return acc + current?.totalPrice;
  }, 0);

  //check if coupon found
  if (coupon) {
    sumTotalPrice =
      sumTotalPrice - (sumTotalPrice * coupon?.coupon?.discount) / 100;
  }
  //price of the product - (price of product x discount/100)
  //remove cart  Item handler
  const removeOrderItemQtyHandler = (productId) => {
    dispatch(removeOrderItemQty(productId));
    dispatch(getCartItemsFromLocalStorageAction());
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cartItems?.map((product) => (
                <li key={product._id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <p className="font-medium text-gray-700 hover:text-gray-800">
                              {product.name}
                            </p>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.color}</p>

                          <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                            {product.size}
                          </p>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${product?.price} x {product?.qty} = $
                          {product?.totalPrice}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label className="sr-only">
                          Quantity, {product.name}
                        </label>
                        <select
                          onChange={(e) =>
                            changeOrderItemQtyHandler(
                              product?._id,
                              e.target.value
                            )
                          }
                          className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                          {/* use the qty  */}

                          {[...Array(product?.qtyLeft)?.keys()]?.map((x) => {
                            return (
                              <option key={x} value={x + 1}>
                                {x + 1}
                              </option>
                            );
                          })}
                        </select>
                        {/* remove */}
                        <div className="absolute top-0 right-0">
                          <button
                            onClick={() =>
                              removeOrderItemQtyHandler(product?._id)
                            }
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Remove</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  $ {sumTotalPrice}.00
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4"></div>
              {/* add coupon */}
              <dt className="flex items-center text-sm text-gray-600">
                <span>Have coupon code? </span>
              </dt>
              {/* errr */}
              {error && <ErrorMsg message={error?.message} />}
              {isAdded && (
                <SuccessMsg
                  message={`Congratulation you got ${coupon?.coupon?.discount} %`}
                />
              )}
              {/* success */}

              <form onSubmit={applyCouponSubmit}>
                <div className="mt-1">
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    type="text"
                    className="block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter Coupon Code"
                  />
                </div>
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button className="inline-flex  text-center mt-4 items-center rounded border border-transparent bg-green-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Apply coupon
                  </button>
                )}
              </form>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className=" text-xl font-medium text-gray-900">
                  $ {sumTotalPrice}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link
                //  pass data to checkout page
                to="/order-payment"
                state={{
                  sumTotalPrice,
                }}
                className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                Proceed to Checkout
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
