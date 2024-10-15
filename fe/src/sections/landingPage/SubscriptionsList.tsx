import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FiArrowRight } from "react-icons/fi";
import {
  cancelSubscriptionPlanAsync,
  getAllSubscriptionPlanAsync,
} from "../../features/stripeSlice";
import { useEffect } from "react";

const SubscriptionsList = () => {
  const dispatch = useAppDispatch();

  const { allSubscriptionPlans } = useAppSelector((state) => state.stripe);
  console.log("allSubscriptionPlans", allSubscriptionPlans);

  useEffect(() => {
    dispatch(getAllSubscriptionPlanAsync());
  }, [dispatch]);

  const handleDelete = (id: any) => {
    console.log("id", id);

    dispatch(cancelSubscriptionPlanAsync({id}));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-[8rem] md:pt-[8rem]">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            All Subscriptions
          </h3>
        </div>

        <div className="max-w-lg">
          <Link
            to="/admin-details"
            className="text-gray-800 flex items-center gap-x-1 text-sm font-medium underline underline-offset-4 sm:text-md"
          >
            Back to accounts <FiArrowRight />
          </Link>
        </div>
      </div>
      <div className="mt-7 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-200 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-4">Sr#</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Plan</th>
              <th className="py-3 px-6">Interval</th>
              <th className="py-3 px-6">Start</th>
              <th className="py-3 px-6">End</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {allSubscriptionPlans?.map((data: any, idx: any) => (
              <tr key={data?._id}>
                <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {data?.user?.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {data?.plan?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {data?.plan?.interval}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(data?.start).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(data?.end).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  $ {data?.plan?.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">
                  {data?.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">
                  <button
                    onClick={() => handleDelete(data?.user?._id)}
                    className="text-white bg-red-600 hover:bg-red-700 rounded-md px-4 py-2"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionsList;
