import styles from './Client.module.css';

const Client = (props) => {
    const { registrationNm, desk } = props.client;

    return (
        <div className='container text-center mb-2'>
            <div className='row'>
                <h3 className='col'>
                    {registrationNm}
                </h3>
                <h3 className='col'>
                    {desk}
                </h3>
                <div className={styles.wrapper}>
                    <div className={`${styles.divider} ${styles.div_transparent}`} />
                </div>
            </div>
        </div>
    );
}

export default Client;
