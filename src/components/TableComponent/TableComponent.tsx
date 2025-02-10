import { Table } from "antd";
import type { TableProps } from "antd";

// Extend TableComponentProps từ TableProps của antd
type TableComponentProps<T> = TableProps<T>;

const TableComponent = <T extends object>({
  columns,
  dataSource,
  pagination,
  loading,
  rowKey,
  ...rest // Spread operator để nhận tất cả props khác
}: TableComponentProps<T>) => (
  <Table<T>
    columns={columns}
    dataSource={dataSource}
    pagination={pagination}
    loading={loading}
    rowKey={rowKey}
    {...rest}
  />
);

export default TableComponent;
