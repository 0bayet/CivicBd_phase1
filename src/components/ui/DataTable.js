/**
 * Simple table. `columns` is an array of { key, header, render? }.
 * `render(row)` can return any node; otherwise row[key] is shown.
 * The wrapper scrolls sideways on small screens so the page never overflows.
 */
export default function DataTable({ caption, columns, rows, getRowKey, emptyMessage = "Nothing to show yet." }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>{emptyMessage}</td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={getRowKey(row)}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
