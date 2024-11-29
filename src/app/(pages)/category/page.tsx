import React from 'react';

import { Slack } from 'lucide-react';
import dynamic from 'next/dynamic';

//Dynamic import CategoryManager component
const ManageCategory = dynamic(() => import('@/components/ui-components/category/ManageCategory'), {
  //ssr: false
});

const CategoryManagerPage = () => {

  return (
    <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
      <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
        <Slack className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
        <h1 className="space-y-0 font-semibold text-indigo-700">Manage Category</h1>
      </div>
      <ManageCategory />
    </div>
  );
};

export default CategoryManagerPage;
