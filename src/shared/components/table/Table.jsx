import React from 'react'
import './Table.css'

const Table = ({ data, columns }) => (
  <table className="oc-table">
    <!-- column headers -->
    <tr className="oc-table-header-row">
      {columns.map(c => {
        <th className="oc-table-header-cell">
          {c.customHeaderRender ? c.customHeaderRender() : c.title }
        </th>
      })}
    </tr>
    <!-- data rows -->
    {data.map((d, i) => (
      <tr className="oc-table-data-row">
        {columns.map(c => (
          <td className="oc-table-data-cell" data-th={c.title}>
            {c.customDataRender ? c.customDataRender(d[c.key], d) : d[c.key]}
          </td>
        )}
      </tr>
    ))}
  </table>
)

export default Table
