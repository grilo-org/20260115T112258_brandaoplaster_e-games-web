import styles from "@/styles/NoData.module.css";

interface NoDataProps {
  message?: string
}

const NoData: React.FC<NoDataProps> = ({ message = 'No data registered or found' }) => {
    return (
      <div className={styles.admin_panel}>
        {message}
      </div>
    )
  }

export default NoData;