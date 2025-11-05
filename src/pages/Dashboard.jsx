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
import { dummyStats, dummyTransactionTypeData, dummyTransactionVolumeData } from "../constants/dummy/dashboard";
import Loading from "../components/Loading";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import StatCard from "../components/StatCard";

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
        // Simulate fetching dummy data
        setTimeout(() => {
            // === Dummy stats ===
            setStats(dummyStats);
            setTransactionTypeData(dummyTransactionTypeData);
            setTransactionVolumeData(dummyTransactionVolumeData)

            setLoading(false);
        }, 1200);
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
