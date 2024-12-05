"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, FileText, Users, UserPlus, File, Lock, Wand, MessageSquare, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Menu, Package, PencilRuler, PackageOpen, TicketPercent, CalendarHeart, BookUser, Scroll, ScrollText, Import, PieChart, Blocks, ListOrdered, FilePlus, LineChart, TrendingUp } from 'lucide-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Tags, PersonStanding, Slack } from 'lucide-react';
import { BgColorsOutlined, OrderedListOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  
  const router = useRouter();
  
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    //console.log(storedRole);
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleDropdownClick = (menu: string) => {
    if (openDropdown === menu) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(menu);
    }
  };

  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setOpenDropdown(null); // Close all dropdowns when collapsing sidebar
    }
  };

  return (
    <div className={`fixed left-0 top-0 overflow-y-auto bg-white shadow-2xl border border-slate-200 rounded-2xl text-indigo-500 ${isCollapsed ? 'w-20' : 'w-64'} h-full fixed flex flex-col transition-all duration-300`}>
      <div className="flex justify-between items-center p-4">
        
        {!isCollapsed && 
        <motion.div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          ClotheStore
        </motion.div>}
        <div onClick={handleCollapseClick} className="text-gray-100 bg-indigo-600 h-8 w-8 rounded-lg shadow-xl flex items-center justify-center hover:scale-110 transition duration-500 ease-out">
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}

          </motion.button>
        </div>
      </div>
      <nav className="flex-1">
        <ul>
          {/* Only render for ADMIN */}
          {role === 'ADMIN' && (
            <>
              {/* Dashboard Link */}
              <motion.div
                style={{ borderRadius: '50px' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1, borderRadius: '50px' }}
              >
              <li className="p-4 mb-2 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-800">
                <LayoutDashboardIcon className="mr-2" />
                {!isCollapsed && <Link href="/dashboard">Dashboard</Link>}
              </li>
              </motion.div>

              {/*Category Link */}
              <motion.div
                style={{ borderRadius: '50px' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1, borderRadius: '50px' }}
              >
              <li className="p-4 mb-2 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('category')}>
                <div className="flex items-center cursor-pointer">
                  <Slack className="mr-2" />
                  {!isCollapsed && 'Category'}
                </div>
                {!isCollapsed && (
                  <div className={`transform transition-transform duration-300 ${openDropdown === 'category' ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown />
                  </div>
                )}
              </li>
              </motion.div>

             
              <ul
                className={`pl-8 m-2 transition-max-height duration-300 ease-in-out overflow-hidden ${
                  openDropdown === 'category' && !isCollapsed ? 'max-h-64' : 'max-h-0'
                }`}
              >
                <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
                  <Tags  className="mr-2" />
                  <Link href="/brand">Brands</Link>
                </li>
                <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
                  <PersonStanding className="mr-2" />
                  <Link href="/gender">Genders</Link>
                </li>
                <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
                  <Slack className="mr-2" />
                  <Link href="/category">Category</Link>
                </li>
              </ul>
            </>
          )}

          {/* Product Link */}
          {role === 'ADMIN' || role === 'STAFF' ? (
            <>
              {/*Product Link */}
              <motion.div
                style={{ borderRadius: '50px' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1, borderRadius: '50px' }}
              >
              <li className="p-4 mb-2 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('product')}>
                <div className="flex items-center cursor-pointer">
                  <Package className="mr-2" />
                  {!isCollapsed && 'Products'}
                </div>
                {!isCollapsed && (
                  <div className={`transform transition-transform duration-300 ${openDropdown === 'product' ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown />
                  </div>
                )}
              </li>
              </motion.div>

              <ul
                className={`pl-8 m-2 transition-max-height duration-300 ease-in-out overflow-hidden ${
                  openDropdown === 'product' && !isCollapsed ? 'max-h-64' : 'max-h-0'
                }`}
              >
                <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
                  <BgColorsOutlined  className="mr-2" />
                  <Link href="/color">Colors</Link>
                </li>
                <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
                  <Blocks className="mr-2" />
                  <Link href="/sizes">Sizes</Link>
                </li>
                <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
                  <PackageOpen className="mr-2" />
                  <Link href="/product-list">Products list</Link>
                </li>
              </ul>


              {/*Imports Link */}
              <motion.div
                style={{ borderRadius: '50px' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1, borderRadius: '50px' }}
              >
              <li className="p-4 mb-2 rounded-lg hover:bg-indigo-500 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('invoices')}>
              <div className="flex items-center cursor-pointer">
                <Import className="mr-2" />
                {!isCollapsed && 'Invoices'}
              </div>
              {!isCollapsed && (
                <div className={`transform transition-transform duration-300 ${openDropdown === 'invoices' ? 'rotate-180' : 'rotate-0'}`}>
                  <ChevronDown />
                </div>
              )}
            </li>
            </motion.div>

            <ul
              className={`pl-8 m-2 transition-max-height duration-300 ease-in-out focus:outline-none  overflow-hidden ${
                openDropdown === 'invoices' && !isCollapsed ? 'max-h-64' : 'max-h-0'
              }`}
            >
              <li className=" p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-amber-800">
                <ScrollText className="mr-2 rounded-md" />
                <Link href="/list-invoice">List invoices</Link>
              </li>
              
              <li className=" p-2  rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-slate-900">
                <Blocks className="mr-2" />
                <Link href="/import-product">Import products</Link>
              </li>
            </ul>
            </>
          ) : null}

          {/* Events Link */}
          {role === 'ADMIN' || role === 'STAFF' ? (
            <>
              <motion.div
                style={{ borderRadius: '50px' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1, borderRadius: '50px' }}
              >
              <li className="p-4 mb-2 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('events')}>
                <div className="flex items-center cursor-pointer">
                  <CalendarHeart className="mr-2" />
                  {!isCollapsed && 'Events'}
                </div>
                {!isCollapsed && (
                  <div className={`transform transition-transform duration-300 ${openDropdown === 'events' ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown />
                  </div>
                )}
              </li>
              </motion.div>

              <ul
                className={`pl-8 m-2 transition-max-height duration-300 ease-in-out overflow-hidden ${
                  openDropdown === 'events' && !isCollapsed ? 'max-h-64' : 'max-h-0'
                }`}
              >
                <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
                  <TicketPercent  className="mr-2" />
                  <Link href="/coupon">Coupons</Link>
                </li>
              </ul>
            </>
          ) : null}

          {/* Customers Link */}
          {role === 'ADMIN' || role === 'STAFF' ? (
            <>
            <motion.div
                style={{ borderRadius: '50px' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1, borderRadius: '50px' }}
              >
            <li className="p-4 mb-2 rounded-lg hover:bg-indigo-500 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('customers')}>
              <div className="flex items-center cursor-pointer">
                <Users className="mr-2" />
                {!isCollapsed && 'Customers'}
              </div>
              {!isCollapsed && (
                <div className={`transform transition-transform duration-300 ${openDropdown === 'customers' ? 'rotate-180' : 'rotate-0'}`}>
                  <ChevronDown />
                </div>
              )}
            </li>
            </motion.div>

            <ul
              className={`pl-8 m-2 transition-max-height duration-300 ease-in-out focus:outline-none  overflow-hidden ${
                openDropdown === 'customers' && !isCollapsed ? 'max-h-64' : 'max-h-0'
              }`}
            >
              <li className=" p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-amber-800">
                <FileText className="mr-2 rounded-md" />
                <Link href="/pages/manage-customers/list-customers">List Customers</Link>
              </li>
              
              <li className=" p-2  rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-slate-900">
                <UserPlus className="mr-2" />
                <Link href="/pages/manage-customers/add-customer">Add Customer</Link>
              </li>
            </ul>
            </>
          ) : null}

          {/* Staffs Link */}
          {role === 'ADMIN' ? (
            <>
              <motion.div
                style={{ borderRadius: '50px' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1, borderRadius: '50px' }}
              >
              <li className="p-4 mb-2 rounded-lg hover:bg-indigo-500 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('users')}>
                <div className="flex items-center cursor-pointer">
                  <Users className="mr-2" />
                  {!isCollapsed && 'Users'}
                </div>
                {!isCollapsed && (
                  <div className={`transform transition-transform duration-300 ${openDropdown === 'users' ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown />
                  </div>
                )}
              </li>
              </motion.div>

              <ul
                className={`pl-8 m-2 transition-max-height duration-300 ease-in-out focus:outline-none  overflow-hidden ${
                  openDropdown === 'users' && !isCollapsed ? 'max-h-64' : 'max-h-0'
                }`}
              >
                <li className=" p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-amber-800">
                  <BookUser className="mr-2 rounded-md" />
                  <Link href="/pages/manage-users/list-users">List Users</Link>
                </li>
                
                <li className=" p-2  rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-slate-900">
                  <UserPlus className="mr-2" />
                  <Link href="/pages/manage-users/add-user">Add User</Link>
                </li>
              </ul>
            </>
          ) : null}

          {/* Orders Link */}
          {role === 'ADMIN' || role === 'STAFF' ? (
            <>
              <motion.div
                style={{ borderRadius: '50px' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1, borderRadius: '50px' }}
              >
              <li className="p-4 mb-2 rounded-lg hover:bg-indigo-500 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('orders')}>
                <div className="flex items-center cursor-pointer">
                  <ListOrdered className="mr-2" />
                  {!isCollapsed && 'Orders'}
                </div>
                {!isCollapsed && (
                  <div className={`transform transition-transform duration-300 ${openDropdown === 'orders' ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown />
                  </div>
                )}
              </li>
              </motion.div>

              <ul
                className={`pl-8 m-2 transition-max-height duration-300 ease-in-out focus:outline-none  overflow-hidden ${
                  openDropdown === 'orders' && !isCollapsed ? 'max-h-64' : 'max-h-0'
                }`}
              >
                <li className=" p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-amber-800">
                  <ListOrdered className="mr-2 rounded-md" />
                  <Link href="/pages/orders/list-orders">List orders</Link>
                </li>
                
                <li className=" p-2  rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-slate-900">
                  <FilePlus className="mr-2" />
                  <Link href="/pages/orders/create-order">Create order</Link>
                </li>
              </ul>
              </>
            ) : null}

          {/* Reports Link */}
          {role === 'ADMIN' ? (
            <>
            <motion.div
                style={{ borderRadius: '50px' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1, borderRadius: '50px' }}
              >
              <li className="p-4 mb-2 rounded-lg hover:bg-indigo-500 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('reports')}>
              <div className="flex items-center cursor-pointer">
                <PieChart className="mr-2" />
                {!isCollapsed && 'Reports'}
              </div>
              {!isCollapsed && (
                <div className={`transform transition-transform duration-300 ${openDropdown === 'reports' ? 'rotate-180' : 'rotate-0'}`}>
                  <ChevronDown />
                </div>
              )}
            </li>
            </motion.div>
            
            <ul
              className={`pl-8 m-2 transition-max-height duration-300 ease-in-out focus:outline-none  overflow-hidden ${
                openDropdown === 'reports' && !isCollapsed ? 'max-h-64' : 'max-h-0'
              }`}
            >
              <li className=" p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-amber-800">
                <ListOrdered className="mr-2 rounded-md" />
                <Link href="/pages/reports/daily-report">Daily reports</Link>
              </li>
              
              <li className=" p-2 mb-2 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-slate-900">
                <LineChart className="mr-2" />
                <Link href="/pages/reports/monthly-report">Monthly reports</Link>
              </li>

              <li className=" p-2  rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-slate-900">
                <TrendingUp className="mr-2" />
                <Link href="/pages/reports/yearly-report">Yearly reports</Link>
              </li>
              </ul>
            </>
          ) : null}

          
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
