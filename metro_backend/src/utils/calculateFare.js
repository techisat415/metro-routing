const calculateFare = (distance) => {

    if (distance <= 2) return 10;
    if (distance <= 5) return 20;
    if (distance <= 12) return 30;
    if (distance <= 21) return 40;
    if (distance <= 32) return 50;

    return 60;
};

export { calculateFare };