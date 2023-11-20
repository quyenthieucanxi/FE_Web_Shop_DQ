"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, Suspense, useEffect, useState } from "react";
import Product from "./Product";
import axios from "@/libs/axios";
import { CalculateTimePassedAsync, ConvertToDDMMYYYY } from "@/utils/DateHelper";


export default function ListProducts() {

    const [initData, setInitialData] = useState([]);

    useEffect(() => {
        const fetchDataAndSetInitialData = async () => {
            try {
                const result = await fetchData(0);
                setInitialData([result]);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchDataAndSetInitialData();
    }, []);
    const fetchData = async (pageParam: number) => {
        try {
            const res = await axios.get("/api/Post/GetAll");
            const products = res.data.data;
            return products.slice((pageParam - 1) * 20, pageParam * 20);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }

    }
    const {
        data,
        error,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['query'],
        queryFn: ({ pageParam }) => fetchData(pageParam),
        initialPageParam: 0,
        initialData: {
            pages: [initData],
            pageParams: [1],
        },
        getNextPageParam: (_, pages) => pages.length + 1,

    });
    return (
        <>
            <div className="grid grid-cols-5 gap-2 my-6">
                {
                    data?.pages.map((group, i) => {
                        return (
                            <Fragment key={i}>
                                {group.map((product) => {
                                    return (
                                        <Suspense fallback={
                                            <div className="loading-container">
                                                <div className="loader"></div>
                                            </div>}
                                        >
                                            <Product key={product.id} id={(product.id)} name={product.title} price={product.price} image={product.urlImage} address={product.address} 
                                            time={CalculateTimePassedAsync(product.createdTime)} />
                                        </Suspense>
                                    );
                                })}
                            </ Fragment>
                        )
                    })
                }
            </div>
            <div className="flex justify-center">
                <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage} className="font-bold text-blue-400 text-center text-base" type="button">
                    {
                        isFetchingNextPage
                            ? '...'
                            : (data?.pages.length ?? 0) < 21
                                ? 'Xem thêm'
                                : ""
                    }
                </button>
            </div>
        </>
    )
}