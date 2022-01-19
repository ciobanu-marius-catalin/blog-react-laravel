import { PostList } from "./components";
import { SearchInput } from "@/components";

const HomePage = () => {
    return (
        <div className="gravity-front-page">
            <div className="gravity-front-page__hero">
                <h1 className="gravity-front-page__title">Blog</h1>
                <p className="gravity-front-page__description">
                    This blog was created by Ciobanu Marius-Catalin for the
                    github portfolio using React and Laravel as the main
                    technologies. You can view the posts or log in to view the
                    CMS dashboard
                </p>
                <div className="gravity-front-page__search">
                    <SearchInput placeholder="Search for posts" />
                </div>
            </div>
            <PostList />
        </div>
    );
};

export { HomePage };
