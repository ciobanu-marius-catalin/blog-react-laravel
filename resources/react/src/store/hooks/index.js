import _ from "lodash";
import { modules } from "../modules";
import { useDeepMemo } from "@/core/hooks";
import { useDispatch, useSelector } from "react-redux";

const reactiveSelectorsByModule = {};
console.log("hooks");
_.each(modules, ({ selectors }, moduleName) => {
    let reactiveSelectors = {};

    _.each(selectors, (selectorFunction, selectorName) => {
        let newSelector = () => {
            return useSelector(selectorFunction);
        };
        _.set(reactiveSelectors, selectorName, newSelector);
    });

    _.set(reactiveSelectorsByModule, moduleName, reactiveSelectors);
});

function useNamespacedSelector(moduleName) {
    let reactiveSelectors = _.get(reactiveSelectorsByModule, moduleName);

    return reactiveSelectors;
}

/**
 Cannot create the dispatch function statically like the selectors because we need to add the dispatch function inside
 the functions created and given to the components. The actions given to the components to also dispatch themself. The
 dispatch function is created by the useDispatch hook so in order to give an action that dispatches itself we need
 to created it in the hook and memoise it.
 */
function useNamespacedDispatch(moduleName) {
    let dispatch = useDispatch();
    let actions = _.get(modules, [moduleName, "actions"], {});
    let actionsWithDispatch = useDeepMemo(() => {
        let data = {};

        _.each(actions, (actionFunction, actionName) => {
            let newAction = (payload) => {
                return dispatch(actionFunction(payload));
            };
            _.set(data, actionName, newAction);
        });

        return data;
    }, [moduleName]);

    return actionsWithDispatch;
}

export { useNamespacedSelector, useNamespacedDispatch };
