"use client";

import React, { useState } from 'react';
import { Table, Button, Drawer, Image, Space, Skeleton, Avatar } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { GetAllProducts, DeleteProduct, GetDetailProduct } from '@/services/product-service';
import useSWR from 'swr';
import useDebounce from '@/hooks/useDebounce';
import envConfig from '@/configs/config';
import { Product, ProductItem } from '@/types/entities/product-entity';
import { BookmarkPlus, Search } from 'lucide-react';


const ManageProduct: React.FC = () => {

    const { data: products, mutate, isLoading } = useSWR<Product[]>(envConfig.NEXT_PUBLIC_API_ENDPOINT + "/products", GetAllProducts);

    const [productItems, setProductItems] = useState<ProductItem[]>([]);
    const [visible, setVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const router = useRouter();

    const filteredProducts = (products || [])?.filter((product: { product_Name: string; }) => {
        return product.product_Name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    });

    console.log("products", products);

    const showDrawer = async (product: Product) => {
        setVisible(true);
        setSelectedProduct(product);

        // Fetch additional product details
        try {
            const detailResponse = await GetDetailProduct(product.id);
            console.log("detailResponse", detailResponse);
            setProductItems(detailResponse);
        } catch (error) {
            toast.error('Failed to fetch product details');
        }
    };

    const onClose = () => {
        setVisible(false);
    };

    const deleteProduct = async (id: string) => {
        try {
            await DeleteProduct(id);
            mutate();
            toast.success('Product deleted successfully');
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    const handleEdit = (id: string) => {
        // router.push(`/edit-product/${id}`);
        toast.info('Edit product feature is not available yet');
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            render: (images: string[]) => (
                images?.map((img, index) => (
                    <Image key={index} src={img ? img : "/cancel-order.png"} width={50} />
                )            
                )
            )
        },
        {
            title: 'Name',
            dataIndex: 'product_Name',
            key: 'product_Name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
        },
        {
            title: 'Status',
            dataIndex: 'productStatus',
            key: 'productStatus',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: Product) => (
                <Space size="middle">
                    <Button className='flex justify-center items-center' onClick={() => showDrawer(record)}>
                        <EyeOutlined />
                    </Button>
                    <Button className='flex justify-center items-center' onClick={() => handleEdit(record.id)}>
                        <EditOutlined />
                    </Button>
                    <Button className='flex justify-center items-center' onClick={() => deleteProduct(record.id)}>
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    const productItemColumns = [
        {
            title: 'Size',
            dataIndex: 'sizeName',
            key: 'sizeName',
        },
        {
            title: 'Color',
            dataIndex: 'colorName',
            key: 'colorName',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
    ];

    

    return (
        <div className="p-4">
            <div className="flex flex-row w-full space-x-4 justify-end mb-6">
                <div className="flex w-full justify-start h-10 border border-gray-500 rounded-lg p-2 focus:outline-none hover:border-blue-500 focus:border-transparent shadow-lg">
                    <Search className='text-gray-500 mr-3' />
                    <input
                        className='w-full border-none focus:outline-none'
                        placeholder={"Search by product name"}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button
                    className="flex flex-row text-center items-center space-x-1 text-sm h-10 rounded-lg mb-4 shadow-xl"
                    type="primary"
                    onClick={() => router.push('/add-new-product')}
                    icon={<BookmarkPlus width={18} height={18} />}
                >
                    Add New Product
                </Button>
                <Button
                    className="flex flex-row text-center items-center space-x-1 text-sm h-10 rounded-lg mb-4 shadow-xl"
                    type="primary"
                    onClick={() => router.push('/add-existed-product')}
                    icon={<BookmarkPlus width={18} height={18} />}
                >
                    Add Existed Product
                </Button>
            </div>

            {isLoading ? (
                <Skeleton active />
            ) : (
                <Table
                    className='border border-gray-200 rounded-lg shadow-xl'
                    dataSource={filteredProducts}
                    columns={columns}
                    loading={isLoading}
                    bordered
                    pagination={{ pageSize: 6 }}
                />
            )}

            <Drawer
                title={selectedProduct?.product_Name}
                placement="right"
                onClose={onClose}
                open={visible}
                width={500}
            >
                {selectedProduct && (
                    <>
                        <div className="flex justify-center items-center w-full"><Avatar src={selectedProduct.image} size={100} /></div>
                        
                        <div className="mt-4">
                            <label className="block text-xs font-semibold mb-2">Product Name</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                <p className="text-sm">{selectedProduct.product_Name}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-xs font-semibold mb-2">Description</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                <p className="text-sm">{selectedProduct.description}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-xs font-semibold mb-2">Price</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                <p className="text-sm">{selectedProduct.price}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-xs font-semibold mb-2">Category</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                <p className="text-sm">{selectedProduct.category}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-xs font-semibold mb-2">Branch</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                <p className="text-sm">{selectedProduct.branch}</p>
                            </div>
                        </div>
                        {/* <div className="mt-4">
                            <label className="block text-xs font-semibold mb-2">Status</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                <p className="text-sm">{selectedProduct.productStatus}</p>
                            </div>
                        </div> */}

                        <Table
                            className="mt-4 border border-gray-200 rounded-md shadow-xl"
                            columns={productItemColumns}
                            dataSource={productItems}
                            pagination={false}
                            bordered
                        />
                    </>
                )}
            </Drawer>
        </div>
    );
};

export default ManageProduct;
