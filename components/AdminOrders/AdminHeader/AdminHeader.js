import React from 'react';
const styles = {
    wrapper: '',
    direction: 'font-bold ml-4 text-[#535353]'
}
const AdminHeader = (props) => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.direction}>Home &gt; Orders</h1>
        </div>
    );
};

export default AdminHeader;