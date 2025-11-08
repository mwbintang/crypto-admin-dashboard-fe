import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import Table from "../components/Table/Table";
import FilterBar from "../components/FilterBar";
import { Search } from "lucide-react";
import { fetchAllTransactions } from "../services/transaction";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 5, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    status: "",
    date: "",
  });

  const fetchTransactions = async (page = 1, limit = 5, currentFilters = filters) => {
    setLoading(true);

    try {
      const res = await fetchAllTransactions({
        username: currentFilters.search || undefined,
        type: currentFilters.type || undefined,
        status: currentFilters.status || undefined,
        fromDate: currentFilters.date || undefined,
        toDate: currentFilters.date || undefined,
        page,
        limit,
      });

      // Map username for table
      const mappedTransactions = res.transactions.map((trx) => ({
        ...trx,
        user: trx.wallet?.user?.username || "Unknown",
      }));

      setTransactions(mappedTransactions);
      setMeta({
        page: res.meta.page,
        limit: res.meta.limit,
        total: res.meta.total,
        totalPages: res.meta.totalPages,
      });
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(meta.page, meta.limit, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setMeta((prev) => ({ ...prev, page: 1 })); // reset to first page
    fetchTransactions(1, meta.limit, filters);
  };

  const renderCell = (col, value) => {
    if (col === "amount") {
      return `Rp ${value.toLocaleString("id-ID")}`;
    }

    if (col === "status") {
      const colorMap = {
        SUCCESS: "bg-green-100 text-green-700",
        PENDING: "bg-yellow-100 text-yellow-700",
        FAILED: "bg-red-100 text-red-700",
      };

      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorMap[value] || ""}`}>
          {value}
        </span>
      );
    }

    return value;
  };

  const filterFields = [
    { name: "search", type: "text", placeholder: "Search by user...", icon: Search },
    {
      name: "type",
      type: "select",
      options: ["deposit", "withdrawal", "transfer"],
      placeholder: "All Types",
    },
    {
      name: "status",
      type: "select",
      options: ["SUCCESS", "PENDING", "FAILED"],
      placeholder: "All Statuses",
    },
    { name: "date", type: "date" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Transactions</h2>

      <FilterBar
        fields={filterFields}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApply={applyFilters}
        buttonProps={{ className: "w-full md:w-auto px-5" }}
      />

      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table
              data={transactions}
              columns={["id", "user", "type", "amount", "createdAt", "status"]}
              columnLabels={{
                id: "Transaction ID",
                user: "User",
                type: "Type",
                amount: "Amount",
                createdAt: "Date",
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
