import _ from "lodash";

function getBackendData(path, defaultValue) {
    return _.get(window, `backendData.${path}`, defaultValue);
}

export { getBackendData };
