"use client";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { TabContext, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import Product from './Product';
import useAxiosAuth from "@/libs/hooks/useAxiosAuth"
import { useSession } from 'next-auth/react';
import axios from '@/libs/axios';

interface Props {
    tabs: string[]
    typeDisplay: string,
    ByUrl: string
}

export default function LabTabsProductTrend(props: Props) {
    const { data: session } = useSession()
    const axiosAuth = useAxiosAuth();
    const [value, setValue] = useState('1');
    const [data, setData] = useState(null);
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    useEffect(() => {
        const fetchData = async (status: string) => {
            if (session) {
                try {
                    if (props.ByUrl.length > 0)
                    {
                        const res = await axios.get(`/api/Post/GetByRequestTrendByUrl?url=${props.ByUrl}&status=${status}`)
                        setData(res.data);
                    }
                } catch (error) {
                    console.error('Error fetching data from the API', error);
                }

            }
        }
        fetchData(props.tabs[Number.parseInt(value) - 1])
    }, [value, session?.user?.accessToken]);
    return (
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
                        props.tabs.map((tab, i) => <Tab key={i} value={`${i + 1}`} label={tab} />)
                    }

                </Tabs>
                {
                    props.tabs.map((tab, i) => {
                        return (
                            <TabPanel key={i} value={`${i + 1}`}>
                                <div className={` border-white border border-solid  ${props.typeDisplay === "row" ? "grid grid-cols-3 gap-2" : ""} `}  >
                                    {
                                        data?.data?.postList.map((product) => {
                                            return (
                                                <Product key={product.id} product={product} typeDisplay={props.typeDisplay} />
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
    )
}