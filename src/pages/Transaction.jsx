import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import Table from "../components/Table/Table";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [meta, setMeta] = useState({ page: 1, limit: 5, total: 0 });
    const [loading, setLoading] = useState(true);

    // Simulate fetching from API
    const fetchTransactions = (page = 1, limit = 5) => {
        setLoading(true);
        setTimeout(() => {
            // create 50 dummy transactions
            const allTransactions = Array.from({ length: 50 }, (_, i) => ({
                id: `TXN-${String(i + 1).padStart(4, "0")}`,
                user: ["John Doe", "Jane Smith", "Michael Johnson", "Anna Brown", "Chris Evans"][i % 5],
                amount: Math.floor(Math.random() * 500000) + 50000,
                date: `2025-11-${String((i % 30) + 1).padStart(2, "0")}`,
                status: ["Completed", "Pending", "Failed"][i % 3],
            }));

            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedData = allTransactions.slice(start, end);

            const fakeResponse = {
                data: paginatedData,
                meta: {
                    page,
                    limit,
                    total: allTransactions.length,
                    totalPages: Math.ceil(allTransactions.length / limit),
                },
            };

            setTransactions(fakeResponse.data);
            setMeta(fakeResponse.meta);
            setLoading(false);
        }, 800);
    };

    // Automatically fetch when meta.page changes
    useEffect(() => {
        fetchTransactions(meta.page, meta.limit);
    }, [meta.page, meta.limit]);

    const handlePageChange = (page) => {
        if (page < 1 || page > meta.totalPages) return;
        setMeta((prev) => ({ ...prev, page })); // ✅ trigger useEffect re-fetch
    };

    // Custom renderer for table cells
    const renderCell = (col, value) => {
        if (col === "amount") {
            return `Rp ${value.toLocaleString("id-ID")}`;
        }

        if (col === "status") {
            const colorMap = {
                Completed: "bg-green-100 text-green-700",
                Pending: "bg-yellow-100 text-yellow-700",
                Failed: "bg-red-100 text-red-700",
            };

            return (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorMap[value]}`}>
                    {value}
                </span>
            );
        }

        return value;
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Transactions</h2>

            {loading ? (
                <Loading />
            ) : (
                <div>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <Table
                            data={transactions}
                            columns={["id", "user", "amount", "date", "status"]}
                            columnLabels={{
                                id: "Transaction ID",
                                user: "User",
                                amount: "Amount",
                                date: "Date",
                                status: "Status",
                            }}
                            renderCell={renderCell}
                        />
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-5 pb-3">
                        <Pagination
                            currentPage={meta.page}
                            totalPages={meta.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;
