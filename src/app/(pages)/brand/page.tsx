import React from "react";

import { Tags } from "lucide-react";
import dynamic from "next/dynamic";

const ManageBrand = dynamic(() => import("@/components/ui-components/brand/ManageBrand"), {
  //ssr: false,
});

const ManageBrandPage: React.FC = () => {

  return (
    <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
      {/* <div className="flex space-y-0 mb-8 ml-0 border border-gray-300 space-x-2 justify-center items-center bg-white rounded-xl shadow-xl w-full h-12"> 
        <Tags className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
        <h1 className="space-y-0 font-semibold">Manage Brand</h1>
      </div> */}

      <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
        <Tags className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
        <h1 className="space-y-0 font-semibold text-indigo-700">Manage Brands</h1>
      </div>
      <ManageBrand />
      
    </div>
  );
};

export default ManageBrandPage;
