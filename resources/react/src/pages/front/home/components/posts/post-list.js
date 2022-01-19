import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Container, Row } from "react-bootstrap";
import { Post } from "./post";
import {

    useErrorContext,
} from "@/core";
function PostList() {
    console.log("post list");
    const [page, setPage] = useState(1);
    const {  setError } = useErrorContext();
    let { data, nrOfPages, isLoading } = useFetchData({
        setError,

        page,
    });

    return (
        <Container>
            <Row>
                {data.map((post, index) => {
                    return <Post key={index} data={post} />;
                })}
            </Row>
        </Container>
    );
}

function useFetchData({ setError, perPage = 9, page = 1 }) {
    let [data, setData] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [nrOfPages, setNrOfPages] = useState(0);
    const apiPath = "api/posts";
    async function fetchData() {
        setIsLoading(true);
        try {
            console.log("use fetched data");
            let fetchResult = await axios.get(apiPath, {
                params: {
                    perPage,
                    page,
                },
            });
            let fetchedData = _.get(fetchResult, "data.data", []);

            if (fetchedData) {
                setData(fetchedData);
            }

            let nrOfPages = _.get(fetchResult, ["data", "nrOfPages"]);
            if (nrOfPages) {
                setNrOfPages(nrOfPages);
            }
        } catch (e) {
            setError(e);
            console.error(e);
        } finally {
            setIsLoading(false);
        }

        console.log("fetch Data");
    }

    useEffect(() => {
        fetchData();
    }, [page]);
    // useEffect(() => {
    //     fetchData();
    // }, []);

    return { data, nrOfPages, isLoading };
}

export { PostList };
