"use client";
import { GetAllSize, AddSize } from "@/services/size-service";
import { Table, Button, Modal, Input, Space, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BookmarkPlus, Pen, Tags, Trash } from "lucide-react";
import { Size } from "@/types/entities/size-entity";
import { SearchOutlined } from "@ant-design/icons";
import useSWR from "swr";
import envConfig from "@/configs/config";
import useDebounce from "@/hooks/useDebounce";
import { motion } from "framer-motion";

const ManageSize: React.FC = () => {

    const { data: sizes , mutate, isLoading } = useSWR(envConfig.NEXT_PUBLIC_API_ENDPOINT + "/size", GetAllSize, { fallbackData: [] });

    
    const [newSizeName, setNewSizeName] = useState("");
    const [editSize, setEditSize] = useState<Size | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const filteredSizes = (sizes as any).filter((size: { name: string; }) =>
        size.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    

    const handleAddSize = async () => {
        
        try {
        await AddSize(newSizeName);
        mutate();
        setNewSizeName("");
        toast.success("Size added successfully");
        setIsModalVisible(false);
        } catch (error) {
        toast.error("Error adding Size");
        //console.error("Error adding Size:", error);
        }
    };

    const handleEditSize = async () => {
        if (!editSize) return;
        try {
        //await EditSize(editSize.id, newSizeName);
        mutate();
        setEditSize(null);
        setIsEditModalVisible(false);
        toast.success("Size updated successfully");
        } catch (error) {
        toast.error("Error updating Size");
        console.error("Error updating Size:", error);
        }
    };

    const handleDeleteSize = async (SizeId: string) => {
        try {
        //await DeleteSize(SizeId);
        mutate();
        toast.success("Size deleted successfully");
        } catch (error) {
        toast.error("Error deleting Size");
        console.error("Error deleting Size:", error);
        }
    };

    const columns = [
        {
        title: "Name",
        //dataIndex: "name",
        key: "name",
        render: (text: any, record: Size) => <Tag color="blue">{record.name}</Tag>,
        },
        {
        title: "Edit",
        key: "edit",
        render: (text: any, record: Size) => (
            <Button className="border border-blue-500 flex flex-row text-center items-center"
            icon={<Pen className="mr-2 font-semibold" width={20} height={20}   />}
            onClick={() => {
                setEditSize(record);
                setNewSizeName(record.name);
                setIsEditModalVisible(true);
            }}
            >
            Edit
            </Button>
        ),
        },
        {
        title: "Delete",
        key: "delete",
        render: (text: any, record: Size) => (
            <Button className="border border-red-500 flex flex-row text-center items-center"
            icon={<Trash className="mr-2 font-semibold" width={20} height={20}  />}
            danger
            //onClick={() => handleDeleteSize(record.id)}
            >
            Delete
            </Button>
        ),
        },
    ];

    return (
        <div>
        <div className="flex justify-between items-center w-full mb-6">
            <motion.div style={{ width: "70%" }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 1.01 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                <Input className="focus:placeholder-transparent focus:border-blue-500 w-2/3 h-10 border border-gray-400 rounded-lg shadow-lg" 
                    placeholder="Search by size name"
                    prefix={<SearchOutlined className="mr-2" />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                <Button className="flex flex-row text-center items-center space-x-1 text-lg h-10 rounded-lg"
                type="primary"
                icon={<BookmarkPlus />}
                onClick={() => setIsModalVisible(true)}
                >
                Add Size
                </Button>
            </motion.div>
        </div>

        <Table className='border border-gray-100 rounded-lg text-lg font-semibold shadow-lg'
            dataSource={filteredSizes}
            columns={columns}
            rowKey="id"
            loading={isLoading}
            bordered
            components={{
                header: {
                    cell: (props: any) => {
                        return (
                            <th {...props} style={{ backgroundColor: '#f0f0f0', fontSize: '16px', fontWeight: 'semibold' }}></th>
                        );
                    }
                }
            }}

        />

        <Modal
            title={
            <div className="flex justify-center items-center text-lg font-semibold mb-4 space-x-2">
                <Tags /> 
                <span>Add new Size</span>
            </div>
            }
            visible={isModalVisible}
            onOk={handleAddSize}
            onCancel={() => setIsModalVisible(false)}
            okText="Add"
        >
            <Input
            placeholder="Enter Size name"
            value={newSizeName}
            onChange={(e) => setNewSizeName(e.target.value)}
            />
        </Modal>

        <Modal
            title={
            <div className="flex justify-center items-center text-lg font-semibold mb-4 space-x-2">
                <Tags /> 
                <span>Edit size</span>
            </div>
            }
            visible={isEditModalVisible}
            onOk={handleEditSize}
            onCancel={() => setIsEditModalVisible(false)}
            okText="Save"
        >
            <Input
            placeholder="Enter Size name"
            value={newSizeName}
            onChange={(e) => setNewSizeName(e.target.value)}
            />
        </Modal>
        </div>
    );
    };

    export default ManageSize;
