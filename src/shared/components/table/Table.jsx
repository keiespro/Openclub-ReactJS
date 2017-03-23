import React from 'react'
import './Table.css'

const renderCell = (data, column) => {
  const cellData = column.key ? data[column.key] : null
  return column.customDataRender ? column.customDataRender(cellData, data) : cellData
}

const Table = ({ data, columns }) => (
  <table className="oc-table">
    <tbody>
      <tr className="oc-table-header-row">
        {columns.map((c, i) => (
          <th key={`tableheader${i}`} className="oc-table-header-cell">
            {c.customHeaderRender ? c.customHeaderRender() : c.title }
          </th>
        ))}
      </tr>
      {data.map((d, i) => (
        <tr key={`tablerow${i}`} className="oc-table-data-row">
          {columns.map((c, j) => (
            <td key={`tablecell${i}-${j}`} className="oc-table-data-cell" data-th={c.title}>
              {renderCell(d, c)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)


export default Table
