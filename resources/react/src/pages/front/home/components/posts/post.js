import { Col } from "react-bootstrap";
import _ from "lodash";
import { Link } from "react-router-dom";
import classnames from "classnames";

function Post({ data = {} }) {
    console.log("post");
    const { thumbnail: url, description, title, id, isPlaceholder } = data;
    const link = `/post?id=${id}`;
    return (
        <Col xs={12} sm={6} md={4} className="p-2">
            <div
                className={classnames("gravity-post-item", {
                    "gravity-post-item--show-placeholder": isPlaceholder,
                })}
            >
                <Link to={link}>
                    <div className="gravity-post-item__image-outer">
                        <div className="gravity-post-item__image-aspect-ratio">
                            {url && <img src={url} alt="featured-image" />}
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
