"use client";
import { useInfiniteQuery, useQuery, keepPreviousData } from "@tanstack/react-query";
import { Fragment, Suspense, useEffect, useState } from "react";
import Product from "./Product";
import { GetPostLimite } from "@/services/PostService";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, orange } from '@mui/material/colors';


const theme = createTheme({
    palette: {
        secondary: orange,
        primary: {
            main: '#ffba00'
        },
    }
});



const DynamicPagination = dynamic(() => import('@mui/material/Pagination'), { ssr: false });
const DynamicPaginationItem = dynamic(() => import('@mui/material/PaginationItem'), { ssr: false });

interface ListProductsProps {
    pagination?: boolean,
    page?: string,
    catPath?: string,
    search?: string,
    orderByDirection?: string,
}

export default function ListProducts({ pagination = false, page, catPath, search, orderByDirection }: ListProductsProps) {
    const router = useRouter();
    const [initData, setInitialData] = useState([]);
    const ITEMSPAGE = 20;
    const startIndex = page ? Number.parseInt(page) * ITEMSPAGE : 1 * ITEMSPAGE;
    const endIndex = startIndex + ITEMSPAGE;
    useEffect(() => {
        const fetchDataAndSetInitialData = async (pageNumber: number, catPath: string,search: string, orderBy: string) => {
            try {
                const result = await fetchData(pageNumber,catPath,search,orderBy);
                setInitialData([result]);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };
        page ? fetchDataAndSetInitialData(Number.parseInt(page), catPath,search, orderByDirection) : fetchDataAndSetInitialData(1, catPath,search, orderByDirection);
    }, [page, catPath, orderByDirection]);
    const fetchData = async (pageParam: number, catPath?: string,search?: string, orderBy?: string) => {
        try {
            const res = catPath ? await GetPostLimite(pageParam, ITEMSPAGE, catPath,search, orderBy) : await GetPostLimite(pageParam, ITEMSPAGE);
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
        initialData: {
            pages: [initData[0]?.postList],
            pageParams: [1],
        },
        getNextPageParam: (_, pages) => pages.length + 1,

    });
    const { data: dataQuery, isPlaceholderData } = useQuery({
        queryKey: ['page', page ? Number.parseInt(page) : 1, catPath,search, orderByDirection],
        queryFn: () => fetchData((page ? Number.parseInt(page) : 1), catPath,search, orderByDirection),
        placeholderData: keepPreviousData,
    })
    return (
        <>
            <div className="grid grid-cols-4 max-sm:grid-cols-3 gap-2 my-6">
                {
                    pagination ?
                        dataQuery?.postList?.map((product) => {
                            return (
                                <Suspense key={product.id} fallback={
                                    <div className="loading-container">
                                        <div className="loader"></div>
                                    </div>}
                                >
                                    <Product key={product.id} product={product} typeDisplay="row" />
                                </Suspense>
                            );
                        })
                        :
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
            {
                pagination ?
                    <div className="flex justify-center mt-3">
                        <ThemeProvider theme={theme}>
                            <DynamicPagination count={Math.ceil(dataQuery?.postList?.length / ITEMSPAGE)}
                                page={page ? Number.parseInt(page) : 1} variant="outlined" shape="rounded" color="primary"
                                renderItem={(item) => (
                                    <Link href={`/${catPath}${item.page === 1 ? `?orderByDirection=${orderByDirection}` : `?page=${item.page}&orderByDirection=${orderByDirection}`}`} passHref>
                                        <DynamicPaginationItem
                                            onClick={() => {
                                                router.push(`/${catPath}${item.page === 1 ? `?orderByDirection=${orderByDirection}` : `?page=${item.page}&orderByDirection=${orderByDirection}`}`);
                                            }}
                                            {...item}
                                        />
                                    </Link>
                                )} />
                        </ThemeProvider>
                    </div>
                    :
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
            }
        </>
    )
}