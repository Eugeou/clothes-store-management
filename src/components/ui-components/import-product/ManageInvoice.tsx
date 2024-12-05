"use client";

import React, { useEffect, useState } from 'react';
import { Table, Avatar, Drawer, Button } from 'antd';

import { ImportInvoice, ImportDetailResponse } from '@/types/entities/import-entity';
import { UserProps } from '@/types/entities/user-entity';
import { GetAllImport, GetImportById } from '@/services/import-service';
import { GetUserById } from '@/services/user-service';
import useSWR from 'swr';
import envConfig from '@/configs/config';
import { tr, u } from 'framer-motion/client';

const ManageInvoices: React.FC = () => {

    const { data: imports, isLoading } = useSWR<ImportInvoice[]>(envConfig.NEXT_PUBLIC_API_ENDPOINT + '/imports', GetAllImport, { fallbackData: [] });
    //const { data: users } = useSWR<UserProps[]>(imports ? envConfig.NEXT_PUBLIC_API_ENDPOINT + `/users/${imports[0]?.createdBy}` : null, GetUserById, { fallbackData: [] });
    
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedImport, setSelectedImport] = useState<ImportInvoice | null>(null);
    const [importDetails, setImportDetails] = useState<ImportDetailResponse | null>(null);
    const [user, setUser] = useState<UserProps | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    console.log("imports", imports);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             if (imports && imports.length > 0) {
    //                 const userData = await GetUserById(imports[0].createdBy);
    //                 setUser(userData);
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch imports:', error);
    //         }
    //     };
    //     fetchUserData();
    // }, [user]);

    useEffect(() => {
        const fetchImports = async () => {
            try {
                const data = await GetAllImport();
                const userData = await GetUserById(data[0].createdBy);
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch imports:', error);
            }
        };
        fetchImports();
    }, []);

    const handleViewDetails = async (record: ImportInvoice) => {
        try {
            const userData = await GetUserById(record.createdBy);
            setUser(userData);
            const importData = await GetImportById(record.id);
            setImportDetails(importData.data);
            setSelectedImport(record);
            setDrawerVisible(true);
        } catch (error) {
            console.error('Failed to fetch import details:', error);
        }
    };


    const columns = [
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            render: (createdBy: string) => (
                user && user.id === createdBy ? (
                    <div>
                        <Avatar className='mr-2' src={user.image || '/nextjs-logo.jpg'} />
                        <span>{user.fullName}</span>
                    </div>
                ) : null
            ),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: ImportInvoice) => (
                <Button onClick={() => handleViewDetails(record)}>View</Button>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={imports} rowKey="id" />
            <Drawer
                title="Import Details"
                placement="right"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                width={640}
            >
                {selectedImport && (
                    <div>
                        <div className='flex p-2 mb-2 mt-4 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                            <p><strong>Import ID:</strong> {selectedImport.id}</p>
                        </div>
                        
                        <div className='flex p-2 mb-2 mt-4 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                            <p><strong>Created At:</strong> {selectedImport.createdAt}</p>
                        </div>
                        
                        <div className='flex p-2 mb-2 mt-4 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                            <p><strong>Created By:</strong> {user ? user.fullName : selectedImport.createdBy}</p>
                        </div>
                        
                        <div className='flex p-2 mb-4 mt-4 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                            <p><strong>Total:</strong> {selectedImport.total}</p>
                        </div>
                        
                        <Table
                            columns={[
                                { title: 'Product Item', dataIndex: 'productItem', key: 'productItem' },
                                { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
                                { title: 'Price', dataIndex: 'price', key: 'price' },
                                { title: 'Total', dataIndex: 'total', key: 'total' },
                            ]}
                            className='min-w-full rounded-lg shadow-sm border border-gray-400'
                            bordered
                            dataSource={importDetails?.importItemResponseList || []}
                            rowKey="productItem"
                            pagination={{pageSize: 5}}
                        />
                    </div>
                )}
            </Drawer>
        </div>
    );
};

export default ManageInvoices;
