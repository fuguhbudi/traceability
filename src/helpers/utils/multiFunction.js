const wait = function(ms, data) {
    return new Promise( resolve => setTimeout(resolve.bind(this, data), ms) );
};

const multiFunction = async function(arrOfFunction) {
    // let arrOfResult = [];
    // for(let i = 0; i < arrOfFunction.length; i++) {
    //     arrOfResult.push(
    //         {result: await this.wait(500, arrOfFunction[i]),},
    //     );
    // }

    var list = {};

    for (let i = 0; i < arrOfFunction.length; i++) {
        list = list.concat({result1: await wait(500, arrOfFunction[i])});
    }

    console.log(list);

    // const a = {
    //     result1: await this.wait(time, arrOfFunction[0]),
    //     result2: await this.wait(time, this.props.dispatch(resetAppointmentId())),
    // };
    // return a
};

export default multiFunction;