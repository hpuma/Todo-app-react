export const modalMessage = "Delete this list?";

function isFormComplete(inputDict) {
    for (const key in inputDict) {
        if (!inputDict[key]) return false;
    }
    return true;
}

export { isFormComplete };

export default isFormComplete;