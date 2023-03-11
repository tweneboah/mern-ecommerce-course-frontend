import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../../redux/slices/users/usersSlice";
import CustomerDetails from "./CustomerDetails";
import ShippingAddressDetails from "./ShippingAddressDetails";

export default function CustomerProfile() {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);
  //get data from store
  const { error, loading, profile } = useSelector((state) => state?.users);
  //get orders
  const orders = profile?.user?.orders;

  return (
    <>
      <div className="flex flex-wrap -mx-3 -mb-3 md:mb-0">
        <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0" />
        <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
          <CustomerDetails
            email={profile?.user?.email}
            dateJoined={new Date(profile?.user?.createdAt).toDateString()}
            fullName={profile?.user?.fullname}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0" />
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error?.message}</h2>
      ) : orders?.length <= 0 ? (
        <h2 className="text-center mt-10">No Order Found</h2>
      ) : (
        orders?.map((order) => {
          return (
            <>
              <div className="bg-gray-50">
                <div className="mx-auto max-w-2xl pt-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                  <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
                    <div className="flex sm:items-baseline sm:space-x-4">
                      <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                        <div>
                          <dt className="font-medium text-gray-900">
                            Order number
                          </dt>
                          <dd className="mt-1 text-gray-500">
                            {order?.orderNumber}
                          </dd>
                        </div>
                        <div className="hidden sm:block">
                          <dt className="font-medium text-gray-900">
                            Date placed
                          </dt>
                          <dd className="mt-1 text-gray-500">
                            <time>
                              {new Date(order?.createdAt).toDateString()}
                            </time>
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-900">
                            Total amount
                          </dt>
                          <dd className="mt-1 font-medium text-gray-900">
                            ${order?.totalPrice}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <p className="text-sm text-gray-600">
                      Status:{" "}
                      <time
                        dateTime="2021-03-22"
                        className="font-medium text-gray-900">
                        {order?.status}
                      </time>
                    </p>
                    {/* payment method */}
                    <div>
                      <dt className="font-medium text-gray-900">
                        Payment Method
                      </dt>
                      <dd className="mt-1 font-medium text-gray-900">
                        {order?.paymentMethod}
                      </dd>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="mt-6">
                    <h2 className="sr-only">Products purchased</h2>

                    <div className="space-y-8">
                      {order?.orderItems?.map((product) => (
                        <div
                          key={product.id}
                          className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                          <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                            <div className="sm:flex lg:col-span-7">
                              <div className="aspect-w-1 aspect-h-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                                <img
                                  src={product.image}
                                  alt={product.image}
                                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                />
                              </div>

                              <div className="mt-6 sm:mt-0 sm:ml-6">
                                <h3 className="text-base font-medium text-gray-900">
                                  <a href={product.href}>{product.name}</a>
                                </h3>
                                <p className="mt-2 text-sm font-medium text-gray-900">
                                  ${product.discountedPrice}
                                </p>
                                <p className="mt-3 text-sm text-gray-500">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* payment status icon */}

                          <div className="flex items-center mb-3">
                            <svg
                              className="h-5 w-5 text-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <p className="ml-2 text-sm font-medium text-gray-500">
                              Payment Status: {order.paymentStatus}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* shipping address */}
              <ShippingAddressDetails
                shippingAddress={profile?.user?.shippingAddress}
              />
            </>
          );
        })
      )}
    </>
  );
}
