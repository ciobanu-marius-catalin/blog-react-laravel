import { Redirect } from "react-router-dom";
import { RouteWithLayout } from "../route-with-layout";
import { useNamespacedSelector, USER_MODULE } from "@/store";
const ProtectedRoute = (props) => {
    console.log("protected route");
    const { getIsLoggedIn } = useNamespacedSelector(USER_MODULE);
    console.log(getIsLoggedIn);
    const isLoggedIn = getIsLoggedIn();
    return (
        <>
            {isLoggedIn && <RouteWithLayout {...props} />}
            {!isLoggedIn && <Redirect to="/login" exact={true} />}
        </>
    );
};

export { ProtectedRoute };
