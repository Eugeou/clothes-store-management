import React from 'react';
import { Import } from 'lucide-react';
import dynamic from 'next/dynamic';

//Dynamic import AddImport component
const ImportProduct = dynamic(() => import('@/components/ui-components/import-product/ImportProduct'), {
    //ssr: false
});


const AddImportPage: React.FC = () => {
    return (
        <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
        
        <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
            <Import className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
            <h3 className="space-y-0 font-semibold">Import products</h3>
        </div>
            <div className="container mx-auto my-10">
                
                <ImportProduct />
            </div>
        </div>
    );
};

export default AddImportPage;
