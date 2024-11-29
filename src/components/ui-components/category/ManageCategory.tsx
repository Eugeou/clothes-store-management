"use client";
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

import { Table, Button, Modal, Form, Select, Input, Menu, Dropdown, Tag } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';


import { GetAllCategory, CreateCategory, EditCategory } from '@/services/category-service';
import { GetAllGender } from '@/services/genders-service';
import { Category } from '@/types/entities/category-entity';
import { Gender } from '@/types/entities/genders-entity';

import { toast } from 'react-toastify';
import { BookmarkPlus, Eye, Slack, Trash } from 'lucide-react';

import envConfig from "@/configs/config";
import useDebounce from "@/hooks/useDebounce";
import { m, motion } from "framer-motion";


const { Option } = Select;

const ManageCategory = () => {

    const { data: categories , mutate, isLoading } = useSWR(envConfig.NEXT_PUBLIC_API_ENDPOINT + "/category", GetAllCategory, { fallbackData: [] });
    const { data: genders} = useSWR(envConfig.NEXT_PUBLIC_API_ENDPOINT + "/productGender", GetAllGender, { fallbackData: [] });
    

    
    //const [genders, setGenders] = useState<Gender[]>([]);
    //const [loading, setLoading] = useState(true);
    //const [pagination, setPagination] = useState({ pageSize: 10, current: 1 });
    const [visible, setVisible] = useState(false);
    const [modalType, setModalType] = useState<'add' | 'edit'>('edit');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const filteredCategories = (categories as any).filter((category: { name: string; }) =>
        category.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );


    const handleDelete = async (categoryId: string) => {
        try {
        //await axios.delete(`/api/categories/${categoryId}`);
        //await DeleteCategory(categoryId);
        mutate();
        toast.success('Category deleted successfully');
        } catch (error) {
        //console.error('Failed to delete category:', error);
        toast.error('Failed to delete category');
        }
    };

    const handleAddCategory = async (values: Category) => {
        try {
        await CreateCategory(values);
        mutate();
        setVisible(false);
        toast.success('Category created successfully');
        } catch (error) {
        //console.error('Failed to create category:', error);
        toast.error('Failed to create category');
        }
    };

    const handleUpdateCategory = async (values: Category) => {
        try {
        await EditCategory(values);
        mutate();
        setVisible(false);
        toast.success('Category updated successfully');
        } catch (error) {
        console.error('Failed to update category:', error);
        toast.error('Failed to update category');
        }
    };

    const showModal = (type: 'add' | 'edit', category: Category | null = null) => {
        setModalType(type);
        setSelectedCategory(category);
        form.resetFields();
        if (type === 'edit' && category) {
            form.setFieldsValue(category);
        }
        setVisible(true);
    };

    const columns = [
        {
        title: 'Category Name',
        //dataIndex: 'name',
        key: 'name',
        render: (category: Category) => (
            <Tag color="green" key={category.id}>
                {category.name}
            </Tag>
            ),
        },
        {
        title: 'Product Gender',
        //dataIndex: 'productGender',
        key: 'productGender',
        render: (productGender: Gender) => (
            <Tag color="blue" key={productGender.id}>
                {productGender.name}
            </Tag>
            ),
        },
        {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (_: any, record: Category) => (
            <Dropdown
            overlay={
                <Menu>
                <Menu.Item onClick={() => showModal('edit', record)}>
                    <div className=' flex flex-row justify-start items-center space-y-0 space-x-3'>
                    <Eye className="mr-2 font-semibold" width={20} height={20} /> 
                    <p>View</p>
                    </div>
                </Menu.Item>
                <Menu.Item className='mt-2' onClick={() => handleDelete(record.id)}>
                    <div className=' flex flex-row justify-start items-center space-y-0 space-x-3'>
                    <Trash className="mr-2 font-semibold" width={20} height={20} /> 
                    <p>Delete</p>
                    </div>
                </Menu.Item>
                </Menu>
            }
            >
            <Button>
                Choose Action <DownOutlined />
            </Button>
            </Dropdown>
        ),
        },
    ];

    return (
        <div>
        <div className="flex justify-between items-center w-full mb-6">
            <motion.div style={{ width: "70%" }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 1.01 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                <Input className="focus:placeholder-transparent focus:border-blue-500 w-2/3 h-10 border border-gray-400 rounded-lg shadow-lg" 
                    placeholder="Search by branch name"
                    prefix={<SearchOutlined className="mr-2" />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </motion.div>


            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                <Button className="flex flex-row text-center items-center space-x-1 font-semibold h-10 rounded-lg shadow-xl"
                type="primary" 
                onClick={() => showModal('add')}
                icon={<BookmarkPlus />}
                >
                Add New Category
                </Button>
            </motion.div>
        </div>

        <Table 
            dataSource={filteredCategories}
            columns={columns}
            loading={isLoading}
            pagination={{ pageSize: 6 }}
            //onChange={(p) => setPagination(p)}
            className="min-w-full rounded-lg shadow-xl border border-gray-100"
            components={{
                header: {
                    cell: (props: any) => {
                        return (
                            <th {...props} style={{ backgroundColor: '#f0f0f0', fontSize: '16px', fontWeight: 'semibold' }}></th>
                        );
                    }
                }
            }}
            bordered
        />
        <Modal
            open={visible}
            title={modalType === 'add' ? 
            <div className="flex justify-center items-center text-lg font-semibold mb-4 space-x-2">
                <Slack /> 
                <span>Add Category</span>
            </div>
            : <div className="flex justify-center items-center text-lg font-semibold mb-4 space-x-2">
            <Slack /> 
            <span>Category details</span>
            </div>}
            onCancel={() => setVisible(false)}
            onOk={() => form.submit()}
        >
            <Form
            form={form}
            onFinish={modalType === 'add' ? handleAddCategory : handleUpdateCategory}
            layout="vertical"
            initialValues={selectedCategory ? selectedCategory : {}}
            >
            {modalType === 'edit' && (
                <Form.Item name="id" label="ID">
                    <Input disabled />
                </Form.Item>
            )}
            <Form.Item
                name="name"
                label="Category Name"
                rules={[{ required: true, message: 'Please input the category name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="productGender"
                label="Product Gender"
                rules={[{ required: true, message: 'Please select a product gender!' }]}
            >
                <Select>
                {genders.map((gender) => (
                    <Option key={gender.id} value={gender.id}>
                    {gender.name}
                    </Option>
                ))}
                </Select>
            </Form.Item>
            </Form>
        </Modal>
        </div>
    );
    };

    export default ManageCategory;
