import React from "react";

import { PersonStanding } from "lucide-react";
import dynamic from "next/dynamic";

const ManagePG = dynamic(() => import("@/components/ui-components/gender/ManageGenders"), {
  //ssr: false,
});

const ManageGenderPage: React.FC = () => {

  return (
    <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
      {/* <div className="flex space-y-0 mb-8 ml-0 border border-gray-300 space-x-2 justify-center items-center bg-white rounded-xl shadow-xl w-full h-12"> 
      <PersonStanding className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
        <h3 className="space-y-0 font-semibold">Manage Gender</h3>
      </div> */}

      <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
        <PersonStanding className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
        <h1 className="space-y-0 font-semibold text-indigo-700">Manage Gender</h1>
      </div>
      <ManagePG />
      
    </div>
  );
};

export default ManageGenderPage;