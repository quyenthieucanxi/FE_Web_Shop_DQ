"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, Suspense } from "react";
import Product from "./Product";
import { GetPostsTrend } from "@/services/PostService";


export default function ListProductsTrend() {
    const ITEMSPAGE = 20;
    const fetchData = async (pageParam: number) => {
        try {
            const res = await GetPostsTrend(pageParam, ITEMSPAGE)
            const { totalPost, postList } = res.data;
            return { totalPost, postList };
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const {
        data,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ['query'],
        queryFn: ({ pageParam }) => fetchData(pageParam),
        initialPageParam: 0,
        getNextPageParam: (_, pages) => pages.length + 1,

    });
    return (
        <>
            <div className="grid grid-cols-4 max-sm:grid-cols-3 gap-2 my-6">
                {
                    data?.pages.map((group, i) => {
                        if (!Array.isArray(group)) {
                            return (
                                <Fragment key={i}>
                                    {group?.postList.map((product) => {
                                        return (
                                            <Suspense key={product.id} fallback={
                                                <div className="loading-container">
                                                    <div className="loader"></div>
                                                </div>
                                            }
                                            >
                                                <Product key={product.id} product={product} typeDisplay="row" />
                                            </Suspense>
                                        );
                                    })}
                                </ Fragment>
                            )
                        }
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