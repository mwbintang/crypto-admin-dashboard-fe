const dummyTransactionsData = Array.from({ length: 50 }, (_, i) => ({
    id: `TXN-${String(i + 1).padStart(4, "0")}`,
    user: ["John Doe", "Jane Smith", "Michael Johnson", "Anna Brown", "Chris Evans"][i % 5],
    amount: Math.floor(Math.random() * 500000) + 50000,
    date: `2025-11-${String((i % 30) + 1).padStart(2, "0")}`,
    status: ["Completed", "Pending", "Failed"][i % 3],
}));

module.exports = {
    dummyTransactionsData
}