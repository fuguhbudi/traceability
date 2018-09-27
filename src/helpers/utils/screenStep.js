function setScreenStep(state){
    return (step) => {
        const newStep = {...state};
        for (let prop in newStep) {
            if (newStep.hasOwnProperty(prop)) {
                newStep[prop] = false;
            }
        }
        newStep[step] = true;
        return newStep;
    }
}

export default setScreenStep;