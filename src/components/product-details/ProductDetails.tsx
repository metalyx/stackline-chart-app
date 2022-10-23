import React, { useCallback, useEffect, useState } from 'react';
import { IProduct } from '../../models/IProduct';
import arrow from '../../assets/arrow.svg';
import './ProductDetails.scss';

interface IProductDetails {
    product: IProduct,
}

const localeStringOptions = {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0
}

type sortKeys =
'weekEnding'
| 'retailSales'
| 'wholesaleSales'
| 'unitsSold'
| 'retailerMargin';


const ProductDetails: React.FC<IProductDetails> = ({ product }) => {
    const [sortedProductsSales, setSortedProductsSales] = useState<IProduct['sales']>(product.sales);

    const [sortConfig, setSortConfig] = useState<{key: sortKeys, isAscending: boolean}>()

    const handleSortClick = useCallback((props : {key: sortKeys}) => {
        if (sortConfig?.key === props.key) {
            setSortConfig({
                key: props.key,
                isAscending: !sortConfig.isAscending
            });
        } else {
            setSortConfig({
                key: props.key,
                isAscending: true,
            });
        }
    }, [sortConfig])

    const sortFunction = useCallback(() => {
        if (sortConfig === undefined) {
            return;
        }

        const clonedArray = [...sortedProductsSales];
        clonedArray.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.isAscending ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.isAscending ? 1 : -1;
            }
            return 0;
          });

          setSortedProductsSales(clonedArray);
    }, [sortConfig]);

    useEffect(() => {
        sortFunction();
    }, [sortConfig])

    return (
        <table className='productDetailsTable'>
            <thead>
                <tr>
                    <th onClick={() => handleSortClick({ key: 'weekEnding' })}>
                        Week Ending
                        <img
                            className={`arrow ${sortConfig?.key !== 'weekEnding' ? 'hidden' : ''} ${sortConfig?.isAscending ? 'down' : 'up'}`}
                            src={arrow}
                        />
                    </th>
                    <th onClick={() => handleSortClick({ key: 'retailSales' })}>
                        Retail Sales
                        <img
                            className={`arrow ${sortConfig?.key !== 'retailSales' ? 'hidden' : ''} ${sortConfig?.isAscending ? 'down' : 'up'}`}
                            src={arrow}
                        />
                    </th>
                    <th onClick={() => handleSortClick({ key: 'wholesaleSales' })}>
                        Wholesale Sales
                        <img
                            className={`arrow ${sortConfig?.key !== 'wholesaleSales' ? 'hidden' : ''} ${sortConfig?.isAscending ? 'down' : 'up'}`}
                            src={arrow}
                        />
                    </th>
                    <th onClick={() => handleSortClick({ key: 'unitsSold' })}>
                        Units Sold
                        <img
                            className={`arrow ${sortConfig?.key !== 'unitsSold' ? 'hidden' : ''} ${sortConfig?.isAscending ? 'down' : 'up'}`}
                            src={arrow}
                        />
                    </th>
                    <th onClick={() => handleSortClick({ key: 'retailerMargin' })}>
                        Retailer Margin
                        <img
                            className={`arrow ${sortConfig?.key !== 'retailerMargin' ? 'hidden' : ''} ${sortConfig?.isAscending ? 'down' : 'up'}`}
                            src={arrow}
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedProductsSales.map((productSale) => (
                    <tr key={productSale.weekEnding}>
                        <td>
                            {productSale.weekEnding}
                        </td>
                        <td>
                            {productSale.retailSales.toLocaleString('en-US', localeStringOptions)}
                        </td>
                        <td>
                            {productSale.wholesaleSales.toLocaleString('en-US', localeStringOptions)}
                        </td>
                        <td>
                            {productSale.unitsSold}
                        </td>
                        <td>
                            {productSale.retailerMargin.toLocaleString('en-US', localeStringOptions)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

export default ProductDetails;
