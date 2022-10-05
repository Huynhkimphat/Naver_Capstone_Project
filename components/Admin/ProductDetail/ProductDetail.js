import React from 'react';
import ProductDetailHeader from './ProductDetailHeader';
const styles = {
    wrapper: 'mx-auto w-full p-4 flex flex-col mt-4 rounded-md',
}
const ProductDetail = (props) => {
    return (
        <div className={styles.wrapper}>
            <ProductDetailHeader id={props.id}></ProductDetailHeader>
        </div>
    );
};

export default ProductDetail;