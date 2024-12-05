"use client";

import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Table, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ImagePlus, Plus } from 'lucide-react';

import { AddProduct } from '@/services/product-service';
import { GetAllBrand } from '@/services/brand-service';
import { GetAllCategory } from '@/services/category-service';
import { GetAllColor } from '@/services/color-service';
import { GetAllSize } from '@/services/size-service';
import { ProductRequest, ProductItemRequest, CreateProductForm } from '@/types/entities/product-entity';
import { Branch } from '@/types/entities/brand-entity';
import { Colors } from '@/types/entities/color-entity';
import { Size } from '@/types/entities/size-entity';
import { Category } from '@/types/entities/category-entity';

import { toast } from 'react-toastify';
import useSWR from 'swr';
import envConfig from '@/configs/config';

const { Option } = Select;

const AddNewProduct: React.FC = () => {
    const [form] = Form.useForm();

    const { data: colors } = useSWR<Colors[]>(envConfig.NEXT_PUBLIC_API_ENDPOINT + '/color', GetAllColor, { fallbackData: [] });
    const { data: sizes } = useSWR<Size[]>(envConfig.NEXT_PUBLIC_API_ENDPOINT + '/size', GetAllSize, { fallbackData: [] });
    const { data: categories } = useSWR<Category[]>(envConfig.NEXT_PUBLIC_API_ENDPOINT + '/category', GetAllCategory, { fallbackData: [] });
    const { data: branches } = useSWR<Branch[]>(envConfig.NEXT_PUBLIC_API_ENDPOINT + '/branch', GetAllBrand, { fallbackData: [] });
    
    const [productItems, setProductItems] = useState<ProductItemRequest[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    const handleAddProductItem = (values: { size: number; color: number }) => {
        const { size, color } = values;
        if (productItems.some(item => item.size === size && item.color === color)) {
        toast.error("You can't select the same Color or Size twice! Please select again!");
        } else {
        setProductItems([...productItems, { size, color }]);
        }
    };

    const handleRemoveProductItem = (size: number, color: number) => {
        setProductItems(productItems.filter(item => item.size !== size || item.color !== color));
    };

    const handleFileChange = ({ fileList }: { fileList: File[] }) => {
        if (fileList.length > 4) {
        message.error('You can only upload up to 4 files.');
        return;
        }
        setSelectedFiles(fileList.map(file => file as File));
    };

    const handleFinish = async (values: any) => {
        setLoading(true);
        const { product_Name, description, price, category, branch } = values;
        const productRequest: ProductRequest = {
        product_Name,
        description,
        price: parseFloat(price),
        category,
        branch,
        productItemRequests: productItems,
        };
        const createProductForm: CreateProductForm = {
        productRequest,
        images: selectedFiles as unknown as FileList,
        };
        try {
        await AddProduct(createProductForm);
        toast.success('Product created successfully!');
        form.resetFields();
        setProductItems([]);
        setSelectedFiles([]);
        setLoading(false);
        } catch (error) {
        toast.error('Error creating product!');
        setLoading(false);
        }
    };

    const columns = [
        {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        },
        {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
        },
        {
        title: 'Action',
        key: 'action',
        render: (text: any, record: ProductItemRequest) => (
            <Button onClick={() => handleRemoveProductItem(record.size, record.color)}>Remove</Button>
        ),
        },
    ];

    return (
        <div className='flex'>
            <div style={{ flex: 2 }}>
            
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item label="Product Name" name="product_Name" rules={[{ required: true, message: 'Please enter product name' }]}>
                    <Input className='border border-gray-500 rounded-lg hover:border-blue-500'/>
                </Form.Item>
                <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select category' }]}>
                    <Select className='border border-gray-500 rounded-lg hover:border-blue-500' variant='borderless'>
                    {categories?.map((category: any) => (
                        <Option key={category.id} value={category.id}>{category.name}</Option>
                    ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Branch" name="branch" rules={[{ required: true, message: 'Please select branch' }]}>
                    <Select className='border border-gray-500 rounded-lg hover:border-blue-500' variant='borderless'>
                    {branches?.map((branch: any) => (
                        <Option key={branch.id} value={branch.id}>{branch.name}</Option>
                    ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter description' }]}>
                    <Input className='h-10 border border-gray-500 rounded-lg hover:border-blue-500' />
                </Form.Item>
                <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please enter price' }]}>
                    <Input className='border border-gray-500 rounded-lg hover:border-blue-500' type="number" min={1} />
                </Form.Item>
                <Form.Item>
                    <Form.Item label="Size" name="size" rules={[{ required: true, message: 'Please select size' }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '8px' }}>
                    <Select className='border border-gray-500 rounded-lg hover:border-blue-500' variant='borderless'>
                        {sizes?.map((size: any) => (
                        <Option key={size.id} value={size.id}>{size.name}</Option>
                        ))}
                    </Select>
                    </Form.Item>
                    <Form.Item label="Color" name="color" rules={[{ required: true, message: 'Please select color' }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                    <Select className='border border-gray-500 rounded-lg hover:border-blue-500' variant='borderless'>
                        {colors?.map((color: any) => (
                        <Option key={color.id} value={color.id}>{color.name}</Option>
                        ))}
                    </Select>
                    </Form.Item>
                    <div className="flex justify-end items-center w-full">
                    <Button className='flex justify-center items-center space-x-0 font-semibold' 
                        type="primary" icon={<Plus width={18} height={18}/>}  
                        onClick={() => form.validateFields(['size', 'color']).then(handleAddProductItem)}>
                        Add</Button>
                    </div>
                    
                </Form.Item>
                <Table className='border border-gray-200 rounded-md' dataSource={productItems} columns={columns} rowKey={record => `${record.size}-${record.color}`} pagination={false} bordered />
                <Form.Item className='flex justify-center items-center w-full'>
                    <Button
                        className='mt-6 font-semibold'
                        type="primary" 
                        htmlType="submit"
                        loading={loading}
                    >Add Product</Button>
                </Form.Item>
                </Form>
            </div>
            <div className=' flex flex-col ml-2 w-1/3 border-2 rounded-xl rounded-l-none border-l-indigo-600 justify-center items-center'>
                <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/2 h-12"> 
                    <ImagePlus  className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
                    <h3 className="space-y-0 font-semibold">Add Images</h3>
                </div>
                <Upload className='flex justify-center m-4 border border-gray-500 rounded-lg border-dashed'
                listType="picture-card"
                fileList={selectedFiles.map((file, index) => ({ uid: index.toString(), name: file.name, url: URL.createObjectURL(file) }))}
                beforeUpload={(file) => {
                    handleFileChange({ fileList: [...selectedFiles, file] });
                    return false;
                }}
                onRemove={(file) => {
                    handleFileChange({ fileList: selectedFiles.filter((f) => f.name !== file.name) });
                }}
                >
                {selectedFiles.length < 4 && (
                    <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                )}
                </Upload>
            </div>
        
        </div>
    );
    };

export default AddNewProduct;
