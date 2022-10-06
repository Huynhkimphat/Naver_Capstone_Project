import Image from 'next/image';
import React from 'react';
import Product from '../../../../static/Product1.png'
const styles = {
    wrapper: 'px-1',
    productInfo: 'inline-block',
    info: 'py-4',
    infoTitle: "font-semibold text-dark",
    title: "float-right text-[20px] font-medium"
}

const InvoiceHeader = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.productInfo}>
                <Image src={Product} alt={'image logo'} width={100} height={100} />
                <div className={styles.info}>
                    <span
                        className={styles.infoTitle}>Avion, Inc.</span><br />
                    <div className={'text-gray-600'}>
                        <span>9498 Harvard Street</span><br />
                        <span>Fairfield, Chicago Town 06824</span><br />
                        <span className="text-dark" title="Phone">Phone:</span>
                        <span>(123) 456-7890</span>
                    </div>
                </div>

            </div>
            <h2 className={styles.title}>INVOICE</h2>
        </div>
    );
};

export default InvoiceHeader;