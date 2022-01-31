// This function checks if the input string contains only digits
const isDigitsOnly = (x: string): boolean => {
    return parseFloat(x).toString() === x;
};
export default isDigitsOnly;
