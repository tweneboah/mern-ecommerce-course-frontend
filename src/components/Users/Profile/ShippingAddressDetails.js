export default function ShippingAddressDetails({ shippingAddress }) {
  return (
    <div className="relative">
      <div className="h-56 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://images.pexels.com/photos/6348105/pexels-photo-6348105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:ml-auto md:w-1/2 md:pl-10">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-600 sm:text-4xl">
            Shipping Address Details
          </p>
          <p className="mt-3 text-lg text-gray-600">
            Full Name: {shippingAddress?.firstName} {shippingAddress?.lastName},
          </p>
          <p className="mt-3 text-lg text-gray-600">
            Address: {shippingAddress?.address}
          </p>
          <p className="mt-3 text-lg text-gray-600">
            City: {shippingAddress?.city},
          </p>
          <p className="mt-3 text-lg text-gray-600">
            Country: {shippingAddress?.country},
          </p>
          <p className="mt-3 text-lg text-gray-600">
            Phone: {shippingAddress?.phone},
          </p>
          <p className="mt-3 text-lg text-gray-600">
            Postal code: {shippingAddress?.postalCode},
          </p>
        </div>
      </div>
    </div>
  );
}
