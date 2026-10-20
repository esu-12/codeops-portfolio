// app/orders/OrderTable.jsx
import Link from "next/link";

const PAGE_SIZE = 5;
const SORT_FIELDS = {
  createdAt: "Date",
  name: "Customer",
  city: "Neighbourhood",
  grandTotal: "Total",
  status: "Status",
};

const etb = (value) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

function makeUrl(page, sort, dir) {
  const params = new URLSearchParams({
    page: String(page),
    sort,
    dir,
  });

  return `/orders?${params.toString()}`;
}

export default function OrderTable({
  orders,
  page,
  totalPages,
  sort,
  dir,
}) {
  const nextDir = dir === "asc" ? "desc" : "asc";

  return (
    <section aria-labelledby="orders-heading">
      <h1 id="orders-heading">Orders</h1>
      <p>
        Page {page} of {totalPages}
      </p>

      <div className="orders-table-wrap">
        <table>
          <caption>Customer orders, sorted by {SORT_FIELDS[sort]}</caption>
          <thead>
            <tr>
              {Object.entries(SORT_FIELDS).map(([field, label]) => (
                <th scope="col" key={field}>
                  <Link
                    href={makeUrl(
                      1,
                      field,
                      sort === field ? nextDir : "asc"
                    )}
                    aria-label={`Sort by ${label}${
                      sort === field
                        ? `, currently ${dir === "asc" ? "ascending" : "descending"}`
                        : ""
                    }`}
                  >
                    {label}
                    {sort === field
                      ? dir === "asc"
                        ? " ↑"
                        : " ↓"
                      : ""}
                  </Link>
                </th>
              ))}
              <th scope="col">Order details</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <time dateTime={order.createdAt}>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-ET")
                      : "—"}
                  </time>
                </td>
                <td>{order.name || "—"}</td>
                <td>{order.city || "—"}</td>
                <td>{etb(order.grandTotal)}</td>
                <td>{order.status || "—"}</td>
                <td>
                  <Link href={`/orders/${encodeURIComponent(order.id)}`}>
                    View order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Order table pagination" className="pagination">
        {page > 1 ? (
          <Link href={makeUrl(page - 1, sort, dir)}>Previous</Link>
        ) : (
          <span aria-disabled="true">Previous</span>
        )}

        <span aria-current="page">
          Page {page} of {totalPages}
        </span>

        {page < totalPages ? (
          <Link href={makeUrl(page + 1, sort, dir)}>Next</Link>
        ) : (
          <span aria-disabled="true">Next</span>
        )}
      </nav>
    </section>
  );
}