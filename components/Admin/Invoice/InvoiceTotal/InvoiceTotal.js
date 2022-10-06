import React from 'react';
const styles = {
    wrapper: 'mt-10',
    content: "text-right",

}
const InvoiceTotal = () => {
    return (
        <div className={styles}>
            <div className={styles.content}>
                <p className={'py-4'}>Sub - Total amount: 300</p>
                <p className={'py-4'}>VAT (10%) : 30</p>
                <hr />
                <h3 className={'py-2 text-xl font-bold'}>
                    Total : 900
                </h3>
            </div>
        </div>
    );
};

export default InvoiceTotal;