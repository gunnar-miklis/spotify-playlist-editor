import styles from '@/src/components/common/SortingIcon/sorting-icon.module.css';

export default function SortingIcon() {
  return (
    <div className={styles['sorting-icon']}>
      <span className={styles['sorting-icon__up']}>&#x25B4;</span>
      <span className={styles['sorting-icon__down']}>&#x25BE;</span>
    </div>
  );
}
