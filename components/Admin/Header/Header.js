import React from 'react';
const styles = {
    wrapper: 'bg-admin_color py-4 rounded-t-lg border-b-4 border-gray-300',
    direction: 'font-bold ml-4 text-white'
}
const AdHeader = (props) => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.direction}>{props.direction}</h1>
        </div>
    );
};

export default AdHeader;