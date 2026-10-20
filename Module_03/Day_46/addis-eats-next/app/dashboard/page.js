// app/dashboard/page.js:
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrders } from "@/lib/db";
import RevenueChart from "../(components)/RevenueChart/RevenueChart";

export const dynamic = "force-dynamic";

function getLastSevenDays() {
  const days = [];

  for (let offset = 6; offset >= 0; offset--) {
    const date = new Date();
    date.setUTCHours(12, 0, 0, 0);
    date.setUTCDate(date.getUTCDate() - offset);
    days.push(date.toISOString().slice(0, 10));
  }

  return days;
}

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "staff") {
    return (
      <main className="dashboard">
        <h1>Access denied</h1>
        <p>This dashboard is available to staff only.</p>
      </main>
    );
  }

  const orders = await getOrders();

  const completedRevenueOrders = orders.filter(
    (order) => order.status !== "CANCELLED"
  );

  const revenueByCity = new Map();

  for (const order of completedRevenueOrders) {
    const city = String(order.city || "Unknown").trim() || "Unknown";
    const current = revenueByCity.get(city) || 0;

    revenueByCity.set(
      city,
      current + Number(order.grandTotal || 0)
    );
  }

  const byArea = Array.from(revenueByCity, ([area, revenue]) => ({
    area,
    revenue,
  })).sort((a, b) => a.area.localeCompare(b.area));

  const days = getLastSevenDays();

  const dailyCounts = Object.fromEntries(
    days.map((day) => [day, 0])
  );

  for (const order of completedRevenueOrders) {
    if (!order.createdAt) continue;

    const date = new Date(order.createdAt);

    if (Number.isNaN(date.getTime())) continue;

    const day = date.toISOString().slice(0, 10);

    if (Object.hasOwn(dailyCounts, day)) {
      dailyCounts[day] += 1;
    }
  }

  const ordersOverTime = days.map((date) => ({
    date,
    count: dailyCounts[date],
  }));

  return (
    <main className="dashboard">
      <h1>Revenue Dashboard</h1>
      <p>Revenue by delivery neighbourhood</p>

      <RevenueChart
        data={byArea}
        ordersOverTime={ordersOverTime}
      />

      <p>
        <Link href="/dashboard/orders">
          View all customer orders
        </Link>
      </p>
    </main>
  );
}