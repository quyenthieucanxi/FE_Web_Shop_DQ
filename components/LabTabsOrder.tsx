"use client";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { TabContext, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import useAxiosAuth from "@/libs/hooks/useAxiosAuth"
import { useSession } from 'next-auth/react';
import { OrderList } from '@/types/order';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Order from './Order';
import ModalOrderReview from './ModalOrderReview';

interface Props {
    tabs: string[]
}

export default function LabTabs(props: Props) {
    const { data: session } = useSession()
    const axiosAuth = useAxiosAuth();
    const [value, setValue] = useState('1');
    const [data, setData] = useState<OrderList>(null);
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const fetchDataOrders = async () => {
        try {
            const { data: res }: { data: Response } = await axiosAuth.get(`/api/Order/GetAll`)
            return res.data
        } catch (error) {
            
        }
    }
    const fetchDataOrderByStatus = async (status: string) => {
        try {
            const { data: res }: { data: Response } = await axiosAuth.get(`/api/Order/GetByStatus?status=${status}`)
            return res.data
        } catch (error) {
            
        }
            
            
    }
    const { data: orders }: { data: OrderList } = useQuery({
        queryKey: ['orders', value],
        queryFn: value === '1' ? fetchDataOrders :  () => fetchDataOrderByStatus(props.tabs[Number.parseInt(value) - 1]),
        placeholderData: keepPreviousData,
        enabled: !!session?.user?.accessToken,
    })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [orderReview, setOrderReview] = useState(null);
    const handleOrderReview = (orderID :string ) => {
        setOrderReview(orders.orderList?.find(order => order.id == orderID))
        openModal()
    }

    return (
        <>
            <div>
                <ModalOrderReview isModalOpen={isModalOpen} isCloseModal={closeModal} order={orderReview}  />
            </div>
            <TabContext value={value}>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                >
                    {
                        props.tabs.map((tab, i) => <Tab key={i} value={`${i + 1}`} label={tab + `${Number.parseInt(value) === (i + 1) ? " (" + orders?.totalOrder + ")" : " "}`} />)
                    }
                </Tabs>
                {
                    props.tabs.map((tab, i) => {
                        return (
                            <TabPanel key={i} value={`${i + 1}`}>
                                <div className='bg-gray-200 border-white border border-solid '>
                                    {
                                        orders?.orderList.map((order) => {
                                            return (
                                                <Order key={order.id} order={order} openModal={handleOrderReview} />
                                            );
                                        })
                                    }
                                </div>
                            </TabPanel>
                        )
                    })
                }
            </Box>
        </TabContext >
        </>
        
    )
}