import React, { useEffect } from 'react';
import Card from '../../components/card/Card';
import ChartComponent from '../../components/chart/Chart';
import Loader from '../../components/loader/Loader';
import ProductDetails from '../../components/product-details/ProductDetails';
import Product from '../../components/product/Product';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProducts } from '../../store/reducers/product/ProductActionCreators';
import './Main.scss';

const Main: React.FC = () => {

    const dispatch = useAppDispatch();
    const { products, error, isLoading } = useAppSelector(state => state.productReducer);
  
    useEffect(() => {
  
      dispatch(fetchProducts());
  
    }, []);

    return (
        <>
            {isLoading && (
                <div className='loaderContainer'>
                    <Loader />
                </div>
            )}
            {error.length > 0 && (
                <div className='errorMessage'>
                    {error}
                </div>
            )}
            {products.length > 0 && products.map((product) => (
                <div className='productsContainer' key={product.id}>
                    <Card content={<Product product={product} />} />
                    <div className='rightSide'>
                        <Card content={
                                <ChartComponent
                                    dataSets={[
                                        {
                                            label: 'Retail Sales',
                                            data: product.sales.map((productSale) => (
                                                {
                                                    value: productSale.retailSales,
                                                    date: productSale.weekEnding
                                                }
                                            ))
                                        },
                                        {   label: 'Wholesale Sales',
                                            data: product.sales.map((productSale) => (
                                                {
                                                    value: productSale.wholesaleSales,
                                                    date: productSale.weekEnding
                                                }
                                            ))
                                        },
                                    ]}
                                />
                            }
                        />
                        <Card content={<ProductDetails product={product} />} style={{ marginTop: '50px' }}/>
                    </div>
                </div>
            ))}
        </>
    )
};

export default Main;
