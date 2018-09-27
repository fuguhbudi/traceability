import numeral from "numeral";
import isEmpty from "lodash.isempty";

export const formatCurrency = (value, isDisplay) => {
    const normalizeValue = !isEmpty(value) ? (typeof value === "string" ? value.replace(/,/g, "") : value) : null;
    return !isEmpty(value) ? numeral(normalizeValue).format( isDisplay ? "0,0.00" : "0.00") : null;
};