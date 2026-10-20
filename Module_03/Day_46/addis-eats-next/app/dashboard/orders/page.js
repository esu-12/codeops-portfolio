import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrders } from "@/lib/db";
import OrderTable from "@/app/orders/OrderTable";

export const dynamic = "force-dynamic";

const ALLOWED_SORTS = [
  "createdAt",
  "name",
  "city",
  "grandTotal",
  "status",
];

const PAGE_SIZE = 5;

export default async function DashboardOrdersPage({ searchParams }) {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=%2Fdashboard%2Forders");
  }

  if (session.role !== "staff") {
    return (
      <main className="orders-page">
        <h1>Access denied</h1>
        <p>This orders dashboard is available to staff only.</p>
        <Link href="/dashboard">Return to dashboard</Link>
      </main>
    );
  }

  const params = await searchParams;

  const sort = ALLOWED_SORTS.includes(params?.sort)
    ? params.sort
    : "createdAt";

  const dir = params?.dir === "asc" ? "asc" : "desc";

  const requestedPage = Number.parseInt(params?.page ?? "1", 10);
  const safePage = Number.isFinite(requestedPage)
    ? Math.max(1, requestedPage)
    : 1;

  const orders = await getOrders();

  const sortedOrders = [...orders].sort((a, b) => {
    let comparison = 0;

    if (sort === "grandTotal") {
      comparison = Number(a.grandTotal || 0) - Number(b.grandTotal || 0);
    } else if (sort === "createdAt") {
      comparison =
        new Date(a.createdAt || 0).getTime() -
        new Date(b.createdAt || 0).getTime();
    } else {
      comparison = String(a[sort] || "").localeCompare(String(b[sort] || ""));
    }

    if (comparison === 0) {
      comparison = String(a.id).localeCompare(String(b.id));
    }

    return dir === "asc" ? comparison : -comparison;
  });

  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / PAGE_SIZE));
  const page = Math.min(safePage, totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const pageOrders = sortedOrders.slice(start, start + PAGE_SIZE);

  return (
    <main className="orders-page">
      <p>
        <Link href="/dashboard">← Revenue dashboard</Link>
      </p>

      {orders.length === 0 ? (
        <>
          <h1>All customer orders</h1>
          <p>No orders have been placed yet.</p>
          <p>Orders will appear here after customers complete checkout.</p>
        </>
      ) : (
        <OrderTable
          orders={pageOrders}
          page={page}
          totalPages={totalPages}
          sort={sort}
          dir={dir}
        />
      )}
    </main>
  );
}
