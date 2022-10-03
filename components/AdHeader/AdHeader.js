import React from 'react';
const styles = {
    wrapper: '',
    direction: 'font-bold ml-4 text-[#535353]'
}
const AdHeader = (props) => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.direction}>{props.direction}</h1>
        </div>
    );
};

export default AdHeader;