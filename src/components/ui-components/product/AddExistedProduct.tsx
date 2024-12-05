// components/AddExistedProducts.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Form, Button, Select, notification, Spin, Table, Space } from 'antd';
import { toast } from 'react-toastify';
import { GetAllProducts } from '@/services/product-service';
import { GetAllColor } from '@/services/color-service';
import { GetAllSize } from '@/services/size-service';
import { AddExistedProduct } from '@/services/product-service';
import { Product } from '@/types/entities/product-entity';
import { Colors } from '@/types/entities/color-entity';
import { Size } from '@/types/entities/size-entity';
import { Plus } from 'lucide-react';
import { motion } from "framer-motion";

import useSWR from 'swr';
import envConfig from '@/configs/config';

const { Option } = Select;

const AddExistedProducts: React.FC = () => {

    const { data: products, mutate, isLoading } = useSWR<Product[]>(envConfig.NEXT_PUBLIC_API_ENDPOINT + "/products", GetAllProducts);
    const { data: colors } = useSWR<Colors[]>(envConfig.NEXT_PUBLIC_API_ENDPOINT + '/color', GetAllColor, { fallbackData: [] });
    const { data: sizes } = useSWR<Size[]>(envConfig.NEXT_PUBLIC_API_ENDPOINT + '/size', GetAllSize, { fallbackData: [] });
    
    
    
    //const [loading, setLoading] = useState<boolean>(true);
    const [selectedItems, setSelectedItems] = useState<{ productId: string, sizeId: string, colorId: string, productName: string, sizeName: string, colorName: string }[]>([]);

    
    const handleAdd = (values: any) => {
        const selectedProduct = products?.find(product => product.id === values.productId);
        const selectedSize = sizes?.find(size => size.id === values.sizeId);
        const selectedColor = colors?.find(color => color.id === values.colorId);

        if (selectedProduct && selectedSize && selectedColor) {
            const newItem = {
                productId: values.productId,
                sizeId: values.sizeId,
                colorId: values.colorId,
                productName: selectedProduct.product_Name,
                sizeName: selectedSize.name,
                colorName: selectedColor.name
            };
            setSelectedItems([...selectedItems, newItem]);
        }
    };

    const handleRemove = (index: number) => {
        const newItems = [...selectedItems];
        newItems.splice(index, 1);
        setSelectedItems(newItems);
    };

    const handleSubmit = async () => {
        try {
            const groupedItems = selectedItems.reduce((acc, item) => {
                if (!acc[item.productId]) {
                    acc[item.productId] = [];
                }
                acc[item.productId].push({ size: item.sizeId, color: item.colorId });
                return acc;
            }, {} as Record<string, { size: string, color: string }[]>);

            await Promise.all(Object.keys(groupedItems)?.map(productId => 
                AddExistedProduct(productId, groupedItems[productId])
            ));

            toast.success('Products updated successfully');
            setSelectedItems([]);
        } catch (error) {
            console.error(error);
            toast.error('Failed to update products');
        }
    };

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },
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
            title: 'Action',
            key: 'action',
            render: (_: any, __: any, index: number) => (
                <Button onClick={() => handleRemove(index)}>Remove</Button>
            ),
        },
    ];

    return (
        <div>
            {isLoading ? (
                <Spin />
            ) : (
                <Form layout="vertical" onFinish={handleAdd}>
                    <Form.Item className=' font-semibold' name="productId" label="Select Product" rules={[{ required: true, message: 'Please select a product' }]}>
                        <Select className='border border-gray-500 rounded-lg hover:border-blue-500 h-10' variant='borderless' placeholder="Select a product" showSearch>
                            {products?.map((product) => (
                                <Option key={product.id} value={product.id}>
                                    <div className="flex items-center">
                                        <img src={product.image?.map((image) => image)[0]} alt={product.product_Name} className="w-6 h-6 rounded-full mr-2" />
                                        {product.product_Name}
                                    </div>
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item className=' font-semibold' name="sizeId" label="Select Size" rules={[{ required: true, message: 'Please select a size' }]}>
                        <Select className='border border-gray-500 rounded-lg hover:border-blue-500 h-10' variant='borderless' placeholder="Select a size">
                            {sizes?.map((size) => (
                                <Option key={size.id} value={size.id}>
                                    {size.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item className=' font-semibold' name="colorId" label="Select Color" rules={[{ required: true, message: 'Please select a color' }]}>
                        <Select className='border border-gray-500 rounded-lg hover:border-blue-500 h-10' variant='borderless' placeholder="Select a color">
                            {colors?.map((color) => (
                                <Option key={color.id} value={color.id}>
                                    {color.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item className='mt-8 flex justify-center items-center w-full'>
                        <Button className='flex justify-center items-center space-x-0 h-10 font-semibold' icon={<Plus height={18} width={18} />} type="primary" htmlType="submit">Add</Button>
                    </Form.Item>
                </Form>
            )}
            <Table className='border border-gray-300 rounded-lg' columns={columns} dataSource={selectedItems} rowKey={(_, index = 0) => index.toString()} pagination={false} bordered />


            
                <motion.div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                    <Button className='w-1/3 flex justify-center items-center space-x-0 h-10 font-semibold' type="primary" onClick={handleSubmit}>Save</Button>
                </motion.div>
            
        </div>
    );
};

export default AddExistedProducts;
