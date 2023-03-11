import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import baseURL from "../../utils/baseURL";
import logo from "./logo3.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";
import { getCartItemsFromLocalStorageAction } from "../../redux/slices/cart/cartSlices";
import { logoutAction } from "../../redux/slices/users/usersSlice";
import { fetchCouponsAction } from "../../redux/slices/coupons/couponsSlice";

export default function Navbar() {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  //get data from store
  const { categories } = useSelector((state) => state?.categories);

  const categoriesToDisplay = categories?.categories?.slice(0, 3);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  //get data from store
  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, [dispatch]);
  const { cartItems } = useSelector((state) => state?.carts);
  //get cart items from local storage
  let cartItemsFromLocalStorage;
  //get login user from localstorage

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const isLoggedIn = user?.token ? true : false;
  //logout handler
  const logoutHandler = () => {
    dispatch(logoutAction());
    //reload
    window.location.reload();
  };
  //coupons
  useEffect(() => {
    dispatch(fetchCouponsAction());
  }, [dispatch]);
  //get coupons
  const { coupons, loading, error } = useSelector((state) => state?.coupons);
  //Get current coupon
  const currentCoupon = coupons
    ? coupons?.coupons?.[coupons?.coupons?.length - 1]
    : console.log(currentCoupon);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {/* mobile category menu links */}
                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  {/* {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))} */}
                  {categoriesToDisplay?.length <= 0 ? (
                    <>
                      <Link
                        to="/products?category=clothing"
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Clothing
                      </Link>

                      <Link
                        to="/"
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Men
                      </Link>

                      <Link
                        to="/"
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Women
                      </Link>
                    </>
                  ) : (
                    categoriesToDisplay?.map((category) => {
                      return (
                        <>
                          <Link
                            key={category?._id}
                            to={`/products-filters?category=${category?.name}`}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {category?.name}
                          </Link>
                        </>
                      );
                    })
                  )}
                </div>

                {/* mobile links register/login */}
                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  {!isLoggedIn && (
                    <>
                      <div className="flow-root">
                        <Link
                          to="/register"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Create an account
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/login"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Sign in
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4"></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative z-10">
        <nav aria-label="Top">
          {/* Coupon navbar */}
          {!currentCoupon?.isExpired && (
            <div className="bg-yellow-600">
              <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <p
                  style={{ textAlign: "center", width: "100%" }}
                  className="flex-1 text-center text-sm font-medium text-white lg:flex-none"
                >
                  {currentCoupon
                    ? `${currentCoupon?.code}- ${currentCoupon?.discount}% , ${currentCoupon?.daysLeft}`
                    : "No Flash sale at moment"}
                </p>

                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"></div>
              </div>
            </div>
          )}
          {/* Top navigation  desktop*/}
          {!isLoggedIn && (
            <div className="bg-gray-800">
              <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!isLoggedIn && (
                    <>
                      <Link
                        to="/register"
                        className="text-sm font-medium text-white hover:text-gray-100"
                      >
                        Create an account
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-600"
                        aria-hidden="true"
                      />
                      <Link
                        to="/login"
                        className="text-sm font-medium text-white hover:text-gray-100"
                      >
                        Sign in
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Deskto Navigation */}
          <div className="bg-white">
            <div className="border-b border-gray-200">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:items-center">
                    <Link to="/">
                      <span className="sr-only">Your Company</span>
                      <img
                        className="h-32 pt-2 w-auto"
                        src={logo}
                        alt="i-novotek logo"
                      />
                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/*  menus links*/}
                    <Popover.Group className="ml-8">
                      <div className="flex h-full justify-center space-x-8">
                        {categoriesToDisplay?.length <= 0 ? (
                          <>
                            <Link
                              to="/products?category=clothing"
                              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                            >
                              Clothing
                            </Link>

                            <Link
                              to="/"
                              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                            >
                              Men
                            </Link>

                            <Link
                              to="/"
                              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                            >
                              Women
                            </Link>
                          </>
                        ) : (
                          categoriesToDisplay?.map((category) => {
                            return (
                              <>
                                <Link
                                  key={category?._id}
                                  to={`/products-filters?category=${category?.name}`}
                                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {category?.name}
                                </Link>
                              </>
                            );
                          })
                        )}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile Naviagtion */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  {/* logo */}
                  <Link to="/" className="lg:hidden">
                    <img
                      className="h-32 mt-2 w-auto"
                      src={logo}
                      alt="i-novotek logo"
                    />
                  </Link>

                  {/* login profile icon mobile */}
                  <div className="flex flex-1 items-center justify-end">
                    {user?.userFound?.isAdmin && (
                      <Link
                        to="/admin"
                        className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        {isLoggedIn && (
                          <div className="flex">
                            <Link
                              to="/customer-profile"
                              className="-m-2 p-2 mr-2 text-gray-400 hover:text-gray-500"
                            >
                              <UserIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </Link>
                            {/* logout */}
                            <button onClick={logoutHandler}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>

                      <span
                        className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      />
                      {/* login shopping cart mobile */}
                      <div className="flow-root">
                        <Link
                          to="/shopping-cart"
                          className="group -m-2 flex items-center p-2"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            {cartItems?.length > 0 ? cartItems?.length : 0}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
