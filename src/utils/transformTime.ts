const transformTime = (time: number) => {
    return `${Math.trunc(time/60)} ч ${time % 60} м`
};

export default transformTime;