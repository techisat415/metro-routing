const calculateFare = (distance) => {

    if (distance <= 2) return 11;
    if (distance <= 5) return 21;
    if (distance <= 12) return 32;
    if (distance <= 21) return 43;
    if (distance <= 32) return 54;

    return 64;
};

export { calculateFare };