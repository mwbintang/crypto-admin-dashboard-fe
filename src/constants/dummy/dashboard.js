const dummyTransactionVolumeData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
        {
            label: "Transaction Volume ($)",
            data: [1200, 900, 1600, 700, 1800, 1100, 950],
            backgroundColor: "rgba(37, 99, 235, 0.6)",
        },
    ],
};

const dummyTransactionTypeData = {
    labels: ["Deposit", "Withdrawal", "Transfer"],
    datasets: [
        {
            data: [360, 230, 152],
            backgroundColor: ["#22c55e", "#ef4444", "#eab308"],
        },
    ],
};

const dummyStats = {
    totalTransactions: 742,
    totalVolume: 56320,
    totalUsers: 128,
}

module.exports = {
    dummyTransactionVolumeData,
    dummyTransactionTypeData,
    dummyStats
};