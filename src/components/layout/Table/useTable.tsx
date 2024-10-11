import { useEffect, useState } from 'react';

import { sortObjectsByField } from '@/src/utils/functions';

export default function useTable<TableData>(tableData: TableData[]) {
  const [table, setTable] = useState<TableData[]>(tableData);
  const [isAsc, setIsAsc] = useState<boolean>(null!);

  useEffect(() => setTable(tableData), [tableData]);

  function handleSortTable(field: keyof TableData) {
    if (!field) {
      setTable(tableData);
      setIsAsc(null!);
    } else {
      const [sortedTableData, isAscToggled] = sortObjectsByField<TableData>(
        field,
        tableData,
        isAsc,
      );
      setTable(sortedTableData);
      setIsAsc(isAscToggled);
    }
  }

  return { table, handleSortTable };
}
