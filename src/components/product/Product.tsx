import React from 'react';
import { IProduct } from '../../models/IProduct';
import Badge from '../badge/Badge';
import './Product.scss';

interface ProductProps {
    product: {
        title: IProduct['title'],
        image: IProduct['image']
        tags: IProduct['tags'],
        subtitle: IProduct['subtitle']
    }
}

const Product: React.FC<ProductProps> = ({ product }) => {
    const {
        title,
        image,
        tags,
        subtitle,
    } = product;

    return (
        <aside className='productContainer'>
            <div className='productDescription'>
                <div className='productImage'>
                    <img src={image} />
                </div>
                <h3 className='productTitle'>
                    {title}
                </h3>
                <span className='productSubtitle'>
                    {subtitle}
                </span>
            </div>
            {tags.length > 0 && (
                <div className='productKeywords'>
                    {tags.map ((badgeText) => (
                        <Badge text={badgeText} key={badgeText} />
                    ))}
                </div>
            )}
        </aside>
    )
};

export default Product;
