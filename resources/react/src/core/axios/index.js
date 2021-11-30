import axios from "axios";

async function initHeaders() {
    //because the requests are made from the same domain we don't need to set with credentials. We only need this flag
    //if we rest api requests are from a different domain.
    axios.defaults.withCredentials = true;
}

export { initHeaders };
