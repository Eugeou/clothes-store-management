import React from 'react';
import { ImagePlus, PackageOpen } from 'lucide-react';
import dynamic from 'next/dynamic';

//Dynamic import AddNewProduct component
const AddNewProduct = dynamic(() => import('@/components/ui-components/product/AddNewProduct'), {
  //ssr: false
});

const AddProductPage: React.FC = () => {
  return (
    <div className=" flex p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
      <div style={{ flex: 2 }}>
        <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/3 h-12"> 
            <PackageOpen  className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
            <h3 className="space-y-0 font-semibold">Add product information</h3>
        </div>
        <AddNewProduct />
      </div>
      
    </div>
  );
};

export default AddProductPage;
