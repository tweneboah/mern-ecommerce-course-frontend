import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateOrderAction } from "../../../redux/slices/orders/ordersSlices";

const UpdateOrders = () => {
  //get the id from params
  const { id } = useParams();
  //dispatch
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState({
    status: "pending",
  });

  const onChange = (e) => {
    dispatch(updateOrderAction({ status: e.target.value, id }));
    //redirect
    window.location.href = "/admin";
  };

  return (
    <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
      <div className="flex flex-1 justify-center">
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700">
            Update Order
          </label>
          <select
            id="location"
            name="status"
            onChange={onChange}
            value={order.status}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue="Canada">
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrders;
