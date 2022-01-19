import { Col } from "react-bootstrap";
import _ from "lodash";
import { Link } from "react-router-dom";

function Post({ data = {} }) {
    console.log("post");
    const { featured_image: url, description, title, id } = data;
    const link = `/post?id=${id}`;
    return (
        <Col xs={12} sm={6} md={4} className="p-2">
            <div className="gravity-post-item">
                <Link to={link}>
                    <div className="gravity-post-item__image-outer">
                        <div className="gravity-post-item__image-aspect-ratio">
                            <img src={url} alt="featured-image" />
                        </div>
                    </div>
                    <h2 className="gravity-post-item__title">{title}</h2>
                    <p className="gravity-post-item__description">
                        {description}
                    </p>
                </Link>
            </div>
        </Col>
    );
}

export { Post };
