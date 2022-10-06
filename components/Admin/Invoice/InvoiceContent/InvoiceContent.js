import React from 'react';
const styles = {
    wrapper: 'flex w-full justify-around py-3 mb-6 flex-col md:flex-row',
    invoiceTo: 'w-[80%]',
    invoiceToTitle: 'font-semibold text-2xl',
    genting: "font-semibold text-dark",
    invoiceRight: 'w-[20%]',
    invoiceNoContainer: "flex  justify-between mt-12 w-max",
    invoiceNo: "font-semibold text-dark mr-2",

}
const InvoiceContent = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.invoiceTo}>
                <h3 className={styles.invoiceToTitle}>Invoice To:</h3>
                <div>
                    <span className={styles.genting}>Genting Holdings.</span><br />
                    <div className={'text-gray-600'}>
                        <span>8626 Maiden Dr. </span><br />
                        <span>Niagara Falls, New York 14304</span>
                    </div>
                </div>

            </div>

            <div className={styles.invoiceRight}>
                <div className={styles.invoiceNoContainer}>
                    <span className={styles.invoiceNo}>Invoice No :</span>
                    <div className="float-right">#1668</div>
                </div>
                <span className="text-dark">Date: 20/11/2022</span>
            </div>
        </div>
    );
};

export default InvoiceContent;