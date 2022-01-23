import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import moment from "moment";

function PostPage() {
    const { data } = useFetchData();

    const { featured_image: url, content, title, created_at } = data;

    const dateFormat = moment(created_at).format("MMMM DD, YYYY");

    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center">
                    <div className="gravity-post-page">
                        <div className="px-md-4">
                            <div className="gravity-post-page__date">
                                {"Published " + dateFormat}
                            </div>

                            <h1 className="gravity-post-page__title">
                                {title}
                            </h1>
                        </div>

                        <div className="gravity-post-page__image">
                            <img src={url} alt="featured-image" loading="lazy"/>
                        </div>

                        <p className="gravity-post-page__content px-md-4">
                            {content}
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

function useFetchData({ setError = _.noop } = {}) {
    const location = useLocation();
    let search = location.search;
    let id;
    try {
        const urlSearchParams = new URLSearchParams(search);
        id = urlSearchParams.get("id");
    } catch (e) {}
    let [data, setData] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    const apiPath = `api/posts/${id}`;
    async function fetchData() {
        setIsLoading(true);
        try {
            console.log("use fetched data");
            let fetchResult = await axios.get(apiPath);
            let fetchedData = _.get(fetchResult, "data", {});

            if (fetchedData) {
                setData(fetchedData);
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
    }, []);

    return { data, isLoading };
}

export { PostPage };
