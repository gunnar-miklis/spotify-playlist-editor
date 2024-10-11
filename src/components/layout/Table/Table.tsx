import type { ReactNode } from 'react';

import SortingIcon from '@/src/components/common/SortingIcon/SortingIcon';
import styles from '@/src/components/layout/Table/table.module.css';
import Paper from '@/src/components/layout/wrappers/Paper/Paper';

type Props = { children: ReactNode };

export default function Table({ children }: Props) {
  return (
    <Paper className={styles['table']}>
      <table className={styles['table__wrapper']}>{children}</table>
    </Paper>
  );
}

export function TableBody({ children }: Props) {
  return <tbody className={styles['table__body']}>{children}</tbody>;
}

/**
 * A reusable table header component (with generic type).
 * - It returns a table header row with dynamically generated header columns.
 * - By default, header columns include a sort button to sort the table by it's property name.
 *
 * @param tableEntry A single (object) entry of the table data array (used to reference the properties).
 * @param handleSortTable The sorting function, which sorts the table by the selected header column.
 * @param propertiesToDisplay A manually selected list of properties to determine which properties should be displayed in the header.
 * @param children Optional: additional manually added header columns. Use to omit the sort button.
 */
export function TableHeader<TableEntry>({
  tableEntry,
  handleSortTable,
  propertiesToDisplay,
  children,
}: {
  tableEntry: TableEntry;
  // eslint-disable-next-line no-unused-vars
  handleSortTable: (field: keyof TableEntry) => void;
  propertiesToDisplay: Partial<keyof TableEntry>[];
  children?: ReactNode;
}) {
  return (
    <thead className={styles['table__header']}>
      <tr className={styles['table__row']}>
        {Object.keys(tableEntry as object).map(
          (objectKey) =>
            propertiesToDisplay.includes(objectKey as keyof TableEntry) && (
              <th className={styles['table__cell-head']} key={objectKey}>
                <button
                  className={styles['table__sort-button']}
                  onClick={() => handleSortTable(objectKey as keyof TableEntry)}
                >
                  {objectKey.toUpperCase()}
                  <SortingIcon />
                </button>
              </th>
            ),
        )}
        {children}
      </tr>
    </thead>
  );
}
