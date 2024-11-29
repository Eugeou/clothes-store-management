import React from "react";
import { Tags } from "lucide-react";


//import ManageSize from "@/src/components/product/ManageSize";
import dynamic from 'next/dynamic';

//Dynamic import ManageSize component
const ManageSize = dynamic(() => import('@/components/ui-components/size/ManageSize'), {
  //ssr: false
});

const ManageSizePage: React.FC = () => {
  
  return (
    <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
      <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
        <Tags className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
        <h1 className="space-y-0 font-semibold text-indigo-700">Manage Size</h1>
      </div>
      <ManageSize/>

    </div>
  );
};

export default ManageSizePage;
