const metroGraph = {
    AIIMS: [
        { station: "INA", time: 2 },
        { station: "Hauz Khas", time: 5 }
    ],

    INA: [
        { station: "AIIMS", time: 2 },
        { station: "Central Secretariat", time: 3 }
    ],

    "Central Secretariat": [
        { station: "INA", time: 3 },
        { station: "Rajiv Chowk", time: 2 }
    ],

    "Rajiv Chowk": [
        { station: "Central Secretariat", time: 2 }
    ],

    "Hauz Khas": [
        { station: "AIIMS", time: 5 },
        { station: "Rajiv Chowk", time: 7 }
    ]
};

export { metroGraph };