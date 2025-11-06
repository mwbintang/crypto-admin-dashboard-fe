import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import Table from "../components/Table/Table";
import { dummyTransactionsData } from "../constants/dummy/transactions";
import { Search } from "lucide-react";
import FilterBar from "../components/FilterBar";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [meta, setMeta] = useState({ page: 1, limit: 5, total: 0 });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: "",
        type: "",
        status: "",
        date: "",
    });

    const fetchTransactions = (page = 1, limit = 5) => {
        setLoading(true);
        setTimeout(() => {
            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedData = dummyTransactionsData.slice(start, end);

            const fakeResponse = {
                data: paginatedData,
                meta: {
                    page,
                    limit,
                    total: dummyTransactionsData.length,
                    totalPages: Math.ceil(dummyTransactionsData.length / limit),
                },
            };

            setTransactions(fakeResponse.data);
            setMeta(fakeResponse.meta);
            setLoading(false);
        }, 800);
    };

    useEffect(() => {
        fetchTransactions(meta.page, meta.limit);
    }, [meta.page, meta.limit]);

    const handlePageChange = (page) => {
        if (page < 1 || page > meta.totalPages) return;
        setMeta((prev) => ({ ...prev, page }));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        setLoading(false);
        let filtered = dummyTransactionsData;

        if (filters.search) {
            filtered = filtered.filter((trx) =>
                trx.user.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.type) {
            filtered = filtered.filter((trx) => trx.type === filters.type);
        }

        if (filters.status) {
            filtered = filtered.filter((trx) => trx.status === filters.status);
        }

        if (filters.date) {
            filtered = filtered.filter((trx) => trx.date === filters.date);
        }

        const start = (meta.page - 1) * meta.limit;
        const end = start + meta.limit;
        setTransactions(filtered.slice(start, end));

        setMeta((prev) => ({
            ...prev,
            total: filtered.length,
            totalPages: Math.ceil(filtered.length / meta.limit),
        }));

        setLoading(false);
    };

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
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${colorMap[value]}`}
                >
                    {value}
                </span>
            );
        }

        return value;
    };

    // Define fields dynamically
    const filterFields = [
        { name: "search", type: "text", placeholder: "Search by user...", icon: Search },
        { name: "type", type: "select", options: ["Top Up", "Withdrawal", "Purchase"], placeholder: "All Types" },
        { name: "status", type: "select", options: ["Completed", "Pending", "Failed"], placeholder: "All Statuses" },
        { name: "date", type: "date" },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Transactions</h2>

            {/* Filter Section */}
            <FilterBar
                fields={filterFields}
                filters={filters}
                onFilterChange={handleFilterChange}
                onApply={applyFilters}
                buttonProps={{ className: "w-full md:w-auto px-5" }}
            />

            {/* Table + Pagination */}
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <Table
                            data={transactions}
                            columns={["id", "user", "type", "amount", "date", "status"]}
                            columnLabels={{
                                id: "Transaction ID",
                                user: "User",
                                type: "Type",
                                amount: "Amount",
                                date: "Date",
                                status: "Status",
                            }}
                            renderCell={renderCell}
                        />
                    </div>

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
