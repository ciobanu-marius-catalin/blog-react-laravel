import { useMemo, useRef } from "react";
import _ from "lodash";

const useDeepCompareMemoize = (value = []) => {
    const ref = useRef([]);
    if (!_.isEqual(ref.current, value)) {
        ref.current = value;
    }
    return ref.current;
};

//react's use memo compares references for array/objects because of this we use a ref to store the current reference
//and only change the reference when the value of the object changes using a deep compare method.
const useDeepMemo = (callback, dependencies) => {
    const memoisedDependencies = useDeepCompareMemoize(dependencies);
    return useMemo(callback, memoisedDependencies);
};

export { useDeepMemo };
