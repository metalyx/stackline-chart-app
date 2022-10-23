import { AppDispatch } from '../../store';
import { productSlice } from './ProductSlice';
import data from '../../../constants/data.json';

export const fetchProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.productsFetching());

        // That's how we would do if we have a real API
        // that we can call to fetch our products
        // const response = await axios.get<IProduct[]>(`${API_BASE_URL}/someproduct`);

        // Fake timeout that simulate networking
        setTimeout(() => {
            dispatch(productSlice.actions.productsFetchingSuccess(data))
        }, 600);
        
    } catch (err) {
        if (err instanceof Error) {
            dispatch(productSlice.actions.productsFetchingFailed(err.message))
        } else {
            dispatch(productSlice.actions.productsFetchingFailed('Error has occured'))
        }
    }
}