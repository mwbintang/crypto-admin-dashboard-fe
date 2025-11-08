import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Loading from "../components/Loading";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import StatCard from "../components/StatCard";
import { dashboardService } from "../services/transaction";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [transactionTypeData, setTransactionTypeData] = useState(null)
    const [transactionVolumeData, setTransactionVolumeData] = useState(null)
    const [stats, setStats] = useState({
        totalTransactions: 0,
        totalVolume: 0,
        totalUsers: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await dashboardService();
                // Adjust stats
                setStats({
                    totalTransactions: res.totalVolume,
                    totalVolume: res.totalAmount,
                    totalUsers: res.totalUsers,
                });

                // Transaction volume per day for chart
                setTransactionVolumeData({
                    labels: res.transactionsPerDay.map((t) => {
                        // You can convert date to day name if needed
                        const date = new Date(t.date);
                        return date.toLocaleDateString("en-US", { weekday: "short" }); // Mon, Tue, ...
                    }),
                    datasets: [
                        {
                            label: "Transaction Volume ($)",
                            data: res.transactionsPerDay.map((t) => t.totalAmount),
                            backgroundColor: "rgba(37, 99, 235, 0.6)",
                        },
                    ],
                });

                // Transaction type distribution chart
                setTransactionTypeData({
                    labels: Object.keys(res.distributionByType).map(
                        (type) => type.charAt(0).toUpperCase() + type.slice(1) // capitalize
                    ),
                    datasets: [
                        {
                            data: Object.values(res.distributionByType),
                            backgroundColor: ["#22c55e", "#ef4444", "#eab308"], // Deposit, Withdrawal, Transfer
                        },
                    ],
                });
            } catch (err) {
                console.error("Failed to fetch dashboard stats:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);


    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

            {loading ? (
                <Loading />
            ) : (
                <>
                    {/* === Summary Cards === */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <StatCard title="Total Transactions" value={stats.totalTransactions} className="border-blue-500" />
                        <StatCard title="Total Volume" value={stats.totalVolume} className="border-green-500" />
                        <StatCard title="Total Users" value={stats.totalUsers} className="border-yellow-500" />
                    </div>

                    {/* === Charts === */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <LineChart data={transactionVolumeData} />
                        <PieChart data={transactionTypeData} />
                    </div>
                </>
            )}
        </div>
    );
}
