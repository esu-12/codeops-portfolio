// app/orders/loading.js
export default function OrdersLoading() {
  return (
    <main aria-busy="true" aria-label="Loading orders">
      <h1>Orders</h1>
      <p>Loading order records…</p>

      <table className="orders-skeleton">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Customer</th>
            <th scope="col">Neighbourhood</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }, (_, index) => (
            <tr key={index}>
              {Array.from({ length: 5 }, (_, cell) => (
                <td key={cell}>
                  <span className="skeleton-cell" aria-hidden="true" />
                  {cell === 0 && (
                    <span className="sr-only">Loading row {index + 1}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}