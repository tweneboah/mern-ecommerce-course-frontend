import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";

const AllCategories = () => {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  //get data from store
  const {
    categories: { categories },
  } = useSelector((state) => state?.categories);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">
              Total Categories [{categories?.length}]
            </span>
          </h2>
          <p>Browse our categories and find the best products for you.</p>
        </div>
      </div>
      <div className="mt-4 flow-root">
        <div className="-my-2">
          <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
            <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid m-2  xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
              {categories?.map((category) => (
                <Link
                  key={category?.name}
                  to={`/products-filters?category=${category?.name}`}
                  className="relative flex h-80 w-56 flex-col mt-4 overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto">
                  <span aria-hidden="true" className="absolute inset-0">
                    <img
                      src={category.image}
                      alt={category?.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                  />
                  <span className="relative mt-auto text-center text-xl font-bold text-white">
                    {category.name} ({category.products.length})
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCategories;
