import { getBackendData } from "@/utils";




function init(state) {
    console.log("init");

    state.user = getBackendData("user");
}

export { init };
