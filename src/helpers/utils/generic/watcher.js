import { isEquivalent } from "helpers/utils";

const watcher = (prevProps, currentProps) => {
    return (watchers) => {
        for(let key in watchers){
            if(watchers.hasOwnProperty(key)){
                let predicate, prevValue, currValue;
                const callback = watchers[key];

                if (!prevProps[key] || !currentProps[key]) continue;
                prevValue = prevProps[key].value;
                currValue = currentProps[key].value;
                const isObjectValue = typeof currValue === "object";
                const isValueUpdated = currValue && prevValue !== currValue;

                if(isObjectValue && currValue === null) continue;
                predicate = isObjectValue ? !isEquivalent(prevValue, currValue) : isValueUpdated;

                if(predicate && typeof callback === "function") callback(); //todo: utils saga
            }
        }
    }
};

export default watcher;