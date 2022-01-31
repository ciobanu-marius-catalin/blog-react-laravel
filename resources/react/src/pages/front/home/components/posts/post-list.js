import { useEffect, useState, useRef } from "react";
import axios from "axios";
import _ from "lodash";
import { Container, Row } from "react-bootstrap";
import { Post } from "./post";
import { useErrorContext } from "@/core";
import InfiniteScroll from "react-infinite-scroll-component";

const initialItemsPerPage = 18;

const placeholderItems = Array(initialItemsPerPage).fill({
    isPlaceholder: true,
});

function PostList() {
    console.log("post list");
    const [page, setPage] = useState(1);
    const fetchQueue = useRef({
        position: 1,
        key: Math.random(),
    });
    const [, setRandomKey] = useState();
    const forceRefresh = () => {
        setRandomKey(Math.random());
    };
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
    function addToFetchQueue() {
        fetchQueue.current = {
            position: fetchQueue.current.position + 1,
            key: Math.random(),
        };
        forceRefresh();
    }
    function removeFromFetchQueue() {
        fetchQueue.current = {
            position: fetchQueue.current.position - 1,
            key: Math.random(),
        };
        forceRefresh();
    }
    const { setError } = useErrorContext();
    let { data, nrOfPages } = useFetchData({
        setError,
        page,
        perPage: itemsPerPage,
        fetchQueue,
        removeFromFetchQueue,
        setPage,
    });

    let items = data;
    if (_.isEmpty(data)) {
        console.log("post-list if");
        items = placeholderItems;
    }

    function fetchInfiniteScrollData() {
        console.log("next", "current page is: " + page);
        addToFetchQueue();
    }

    return (
        <Container className="post-list-page">
            <Row>
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchInfiniteScrollData}
                    hasMore={page !== nrOfPages - 1}
                    scrollThreshold="0.7"
                    // loader={<h4>Loading...</h4>}
                    // endMessage={
                    //     <p style={{ textAlign: "center" }}>
                    //         <b>Yay! You have seen it all</b>
                    //     </p>
                    // }
                >
                    {items.map((post, index) => {
                        return <Post key={index} data={post} />;
                    })}
                </InfiniteScroll>
            </Row>
        </Container>
    );
}

function useFetchData({
    setError,
    perPage = 9,
    page = 1,
    fetchQueue,
    removeFromFetchQueue,
    setPage,
}) {
    let [data, setData] = useState([]);
    let [nrOfPages, setNrOfPages] = useState(0);
    const isLoading = useRef(false);
    const apiPath = "api/posts";
    async function fetchData() {
        try {
            if (isLoading.current) {
                return;
            }
            isLoading.current = true;
            console.log("page", page);
            console.log("use fetched data");
            let fetchResult = await axios.get(apiPath, {
                params: {
                    perPage,
                    page,
                },
            });
            let fetchedData = _.get(fetchResult, "data.data", []);

            if (fetchedData) {
                let newData = data.concat(fetchedData);
                setData(newData);
            }

            let nrOfPages = _.get(fetchResult, ["data", "nrOfPages"]);
            if (nrOfPages) {
                setNrOfPages(nrOfPages);
            }
        } catch (e) {
            setError(e);
            console.error(e);
        } finally {
            isLoading.current = false;
            console.log("finally");
            removeFromFetchQueue();
        }

        console.log("fetch Data");
    }

    useEffect(() => {
        fetchData();
    }, [page]);

    useEffect(() => {
        if (isLoading.current || fetchQueue.current.position === 0) {
            return;
        }
        setPage(page + 1);
    }, [JSON.stringify(fetchQueue.current)]);

    return { data, nrOfPages };
}

export { PostList };
