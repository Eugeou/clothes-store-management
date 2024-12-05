"use client";

import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Drawer, Form, Input, DatePicker, notification, Skeleton, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import { AddCoupon, GetAllCoupons, UpdateCoupon, DeleteCoupon, GetDetailCoupon } from '@/services/coupon-service';

import { ExistedCoupon, Coupon } from '@/types/entities/coupon-entity';
import { Search, Ticket, TicketPlus } from 'lucide-react';
import useSWR from 'swr';
import useDebounce from '@/hooks/useDebounce';
import { toast } from 'react-toastify';
import envConfig from '@/configs/config';

const { RangePicker } = DatePicker;
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const ManageCoupon: React.FC = () => {

  const { data: coupons, mutate, isLoading } = useSWR(envConfig.NEXT_PUBLIC_API_ENDPOINT + "/coupons", GetAllCoupons, { fallbackData: [] });

  const [selectedCoupon, setSelectedCoupon] = useState<ExistedCoupon | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isAddDrawerVisible, setIsAddDrawerVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // const filteredCoupons = (coupons ?? []).filter((coupon: { name: string; }) =>
  //   coupon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  // );

  console.log("Coupons: ", coupons);

  const handleCardClick = async (couponId: string) => {
    try {
      const data = await GetDetailCoupon(couponId);
      setSelectedCoupon(data);
      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCoupon = async (couponId: string) => {
    try {
      await DeleteCoupon(couponId);
      mutate();
      toast.success('Coupon deleted successfully' );
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete! This coupon is being used in some orders');
    }
  };

  const handleEditCoupon = async (values: any) => {
    if (selectedCoupon) {
      const updatedCoupon: ExistedCoupon = {
        ...selectedCoupon,
        ...values,
        startDate: values.dateRange[0].format('YYYY-MM-DD'),
        endDate: values.dateRange[1].format('YYYY-MM-DD')
      };
      try {
        await UpdateCoupon(selectedCoupon.id, updatedCoupon);
        mutate();
        setIsDrawerVisible(false);
        setIsModalVisible(false);
        toast.success('Coupon updated successfully');
      } catch (error) {
        console.error(error);
        toast.error('Failed to update coupon');
      }
    }
  };

  const handleAddCoupon = async (values: any) => {
    const newCoupon: Coupon = {
      ...values,
      startDate: values.dateRange[0].format('YYYY-MM-DD'),
      endDate: values.dateRange[1].format('YYYY-MM-DD')
    };
    try {
      await AddCoupon(newCoupon);
      mutate();
      setIsAddDrawerVisible(false);
      toast.success('Coupon added successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add coupon');
    }
  };

  const validateDates = (rule: any, value: any, callback: any) => {
    if (value && (value[0].isBefore(dayjs(), 'day') || value[1].isSameOrBefore(value[0], 'day'))) {
      callback('Start date must be today or in the future, and end date must be after the start date.');
    } else {
      callback();
    }
  };


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
    {
      title: 'Discount Value',
      dataIndex: 'discountValue',
      key: 'discountValue',
    },
    {
      title: 'Minimum Bill',
      dataIndex: 'minimumBill',
      key: 'minimumBill',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Status',
      dataIndex: 'eventStatus',
      key: 'eventStatus',
      render: (text: string) => (
        <Tag color={text === 'ACTIVE' ? 'green' : 'orange'}>
          {text}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: ExistedCoupon) => (
        <div>
          <Button className='mr-1' icon={<EyeOutlined />} onClick={() => handleCardClick(record.id)} />
          <Button className='mr-1' icon={<EditOutlined />} onClick={() => {
            setSelectedCoupon(record);
            setIsDrawerVisible(true);
          }} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteCoupon(record.id)} />
        </div>
      )
    }
  ];

  return (
    <div> 
      <div className="flex justify-between items-center w-full space-x-0">
        <Input 
          className="focus:placeholder-transparent focus:border-blue-500 mb-6 w-2/3 h-10 border border-gray-400 rounded-lg shadow-lg" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Search by coupon name"
          size="middle"
          prefix={<Search />}
        />
        <Button className="flex flex-row text-center items-center space-x-1 h-10 rounded-lg mb-6 shadow-xl"
        type="primary" icon={<TicketPlus />} onClick={() => setIsAddDrawerVisible(true)}>Add New Coupon</Button>
      </div> 
      
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Table columns={columns} dataSource={coupons} rowKey="id" loading={isLoading} pagination={{ pageSize: 6 }} className="min-w-full rounded-lg shadow-xl border border-gray-400"
        bordered />
      )}
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>Close</Button>,
        ]}
      >
        {selectedCoupon && (
          <div className='flex flex-col space-y-4'>
            <div className='flex space-x-2 justify-center  mr-2 font-bold text-lg rounded-lg h-10 items-center'>
                <Ticket/>
                <p>Coupon Detail</p>
            </div>

            <div className='flex p-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                <p>Name: {selectedCoupon.name}</p>
            </div>
            
            <div className='flex p-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                <p>Start Date: {dayjs(selectedCoupon.startDate).format('DD-MM-YYYY')}</p>
            </div>
            
            <div className='flex p-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                <p>End Date: {dayjs(selectedCoupon.endDate).format('DD-MM-YYYY')}</p>
            </div>

            <div className='flex p-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                <p>Discount Type: {selectedCoupon.discountValue}</p>
            </div>
            
            <div className='flex p-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                <p>Minimum Bill: {selectedCoupon.minimumBill}</p>
            </div>

            <div className='flex p-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                <p>Quantity: {selectedCoupon.quantity}</p>
            </div>
            
            <div className='flex p-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                <p>Status: {selectedCoupon.eventStatus}</p>
            </div>
          </div>
        )}
      </Modal>
      <Drawer
        title="Edit Coupon"
        open={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        width={400}
      >
        {selectedCoupon && (
          <Form
            layout="vertical"
            initialValues={{
              ...selectedCoupon,
              dateRange: [dayjs(selectedCoupon.startDate), dayjs(selectedCoupon.endDate)]
            }}
            onFinish={handleEditCoupon}
          >
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the coupon name!' }]}>
              <Input className='border border-gray-500 rounded-lg hover:border-blue-500' />
            </Form.Item>
            <Form.Item name="dateRange" label="Date Range" rules={[{ required: true, validator: validateDates }]}>
              <RangePicker className='border border-gray-500 rounded-lg hover:border-blue-500' />
            </Form.Item>
            <Form.Item name="discountValue" label="Discount Value" rules={[{ required: true, message: 'Please input the discount value!' }]}>
              <Input className='border border-gray-500 rounded-lg hover:border-blue-500' placeholder='%' type="number" min={1} max={100} />
            </Form.Item>
            <Form.Item name="minimumBill" label="Minimum Bill" rules={[{ required: true, message: 'Please input the minimum bill!' }]}>
              <Input className='border border-gray-500 rounded-lg hover:border-blue-500' type="number" min={1}/>
            </Form.Item>
            <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please input the quantity!' }]}>
              <Input className='border border-gray-500 rounded-lg hover:border-blue-500' type="number" min={1} />
            </Form.Item>
            <Button type="primary" htmlType="submit">Update Coupon</Button>
          </Form>
        )}
      </Drawer>
      <Drawer
        title="Add new Coupon"
        open={isAddDrawerVisible}
        onClose={() => setIsAddDrawerVisible(false)}
        width={400}
      >
        <Form layout="vertical" onFinish={handleAddCoupon}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the coupon name!' }]}>
            <Input className='border border-gray-500 rounded-lg hover:border-blue-500' />
          </Form.Item>
          <Form.Item name="dateRange" label="Date Range" rules={[{ required: true, validator: validateDates }]}>
            <RangePicker className='border border-gray-500 rounded-lg hover:border-blue-500 h-full' />
          </Form.Item>
          <Form.Item name="discountValue" label="Discount Value" rules={[{ required: true, message: 'Please input the discount value!' }]}>
            <Input className='border border-gray-500 rounded-lg hover:border-blue-500' placeholder='%' type="number" min={1} max={100} />
          </Form.Item>
          <Form.Item name="minimumBill" label="Minimum Bill" rules={[{ required: true, message: 'Please input the minimum bill!' }]}>
            <Input className='border border-gray-500 rounded-lg hover:border-blue-500' type="number" min={1} />
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please input the quantity!' }]}>
            <Input className='border border-gray-500 rounded-lg hover:border-blue-500' type="number" min={1} />
          </Form.Item>
          <Button type="primary" htmlType="submit">Add Coupon</Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default ManageCoupon;
