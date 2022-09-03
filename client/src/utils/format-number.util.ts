export const formatNumber = (n: number) => {
    const abbrev = "kmb";
    function round(n: number, precision: number) {
        var prec = Math.pow(10, precision);
        return Math.round(n * prec) / prec;
    }
    let base = Math.floor(Math.log(Math.abs(n)) / Math.log(1000));
    let suffix = abbrev[Math.min(2, base - 1)];
    base = abbrev.indexOf(suffix) + 1;
    return suffix ? round(n / Math.pow(1000, base), 2) + suffix : "" + n;
};
