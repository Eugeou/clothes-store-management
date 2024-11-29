"use client";

import { GetAllGender, AddPG, EditPG, DeletePG } from "@/services/genders-service";
import { Gender } from "@/types/entities/genders-entity";
import { Table, Button, Modal, Input, Space, Typography, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BookmarkPlus, Pen, PersonStanding, Trash } from "lucide-react";
import { SearchOutlined } from "@ant-design/icons";
import useSWR from "swr";
import envConfig from "@/configs/config";
import useDebounce from "@/hooks/useDebounce";
import { motion } from "framer-motion";

const ManagePG: React.FC = () => {

    const { data: genders , mutate, isLoading } = useSWR(envConfig.NEXT_PUBLIC_API_ENDPOINT + "/productGender", GetAllGender, { fallbackData: [] });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    
    const [newGenderName, setNewGenderName] = useState("");
    const [editGender, setEditGender] = useState<Gender | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const filteredGenders = (genders as any).filter((gender: { name: string; }) =>
        gender.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    
    const handleAddGender = async () => {
        try {
        await AddPG(newGenderName);
        mutate();
        setNewGenderName("");
        toast.success("Gender added successfully");
        setIsModalVisible(false);
        } catch (error) {
        toast.error("Error adding gender");
        }
    };

    const handleEditGender = async () => {
        if (!editGender) return;
        try {
        await EditPG(editGender.id, newGenderName);
        mutate();
        setEditGender(null);
        setIsEditModalVisible(false);
        toast.success("Gender updated successfully");
        } catch (error) {
        toast.error("Error updating gender");
        }
    };

    const handleDeleteGender = async (genderId: string) => {
        try {
        await DeletePG(genderId);
        mutate();
        toast.success("Gender deleted successfully");
        } catch (error) {
        toast.error("Error while deleting gender");
        }
    };

    const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const columns = [
        {
        title: "Name",
        //dataIndex: "name",
        key: "name",
        render: (text: any, record: Gender) => (
            <Tag color="orange">{record.name}</Tag>
        ),
        },
        {
        title: "Edit",
        key: "edit",
        render: (text: any, record: Gender) => (
            <Button className="border border-blue-500 flex flex-row text-center items-center"
            icon={<Pen height={15} width={15} />}
            onClick={() => {
                setEditGender(record);
                setNewGenderName(record.name);
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
        render: (text: any, record: Gender) => (
            <Button className="border border-red-500 flex flex-row text-center items-center"
            icon={<Trash height={15} width={15} />}
            danger
            onClick={() => handleDeleteGender(record.id)}
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
                    placeholder="Search by product gender name"
                    prefix={<SearchOutlined className="mr-2 " width={40} height={40} />}
                    onChange={handleSearch}
                />
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                <Button className="flex flex-row text-center items-center space-x-1 shadow-xl text-lg h-10 rounded-lg"
                    type="primary"
                    icon={<BookmarkPlus height={18} width={18} />}
                    onClick={() => setIsModalVisible(true)}
                >
                    Add Gender
                </Button>
            </motion.div>
            </div>

        <Table
            dataSource={filteredGenders}
            columns={columns}
            rowKey="id"
            loading={isLoading}
            pagination={{ pageSize: 6 }}
            className="min-w-full shadow-lg border border-gray-300 rounded-lg text-xl font-semibold"
            bordered
        />

        <Modal
            title={
            <div className="flex justify-center items-center text-lg font-semibold mb-4">
                <PersonStanding /> 
                <span>Add Gender</span>
            </div>
            }
            visible={isModalVisible}
            onOk={handleAddGender}
            onCancel={() => setIsModalVisible(false)}
            okText="Add"
        >
            <Input
            placeholder="Enter gender name"
            value={newGenderName}
            onChange={(e) => setNewGenderName(e.target.value)}
            />
        </Modal>

        <Modal 
            title={
            <div className="flex justify-center items-center text-lg font-semibold mb-4">
                <PersonStanding /> 
                <span>Edit Gender</span>
            </div>
            }
            visible={isEditModalVisible}
            onOk={handleEditGender}
            onCancel={() => setIsEditModalVisible(false)}
            okText="Save"
        >
            <Input
            placeholder="Enter gender name"
            value={newGenderName}
            onChange={(e) => setNewGenderName(e.target.value)}
            />
        </Modal>
        </div>
    );
    };

    export default ManagePG;
