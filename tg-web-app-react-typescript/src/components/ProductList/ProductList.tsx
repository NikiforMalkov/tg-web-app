import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import { ProductInterface } from '../ProductItem/ProductInterface';
import { useTranslation } from 'react-i18next';

const products:Array<ProductInterface> = [
    {id: 1, title: {ru:'Джинсы', en:'Jeans'}, price: 5000, description: {ru:'Синего цвета, прямые', en:'Blue, straight'}},
    {id: 2, title: {ru:'Куртка', en:'Jacket'}, price: 12000, description: {ru:'Зеленого цвета, теплая', en:'Green, warm'}},
    {id: 3, title: {ru:'Джинсы 2', en:'Jeans 2'}, price: 5000, description: {ru:'Синего цвета, прямые', en:'Blue, straight'}},
    {id: 4, title: {ru:'Куртка 8', en:'Jacket 8'}, price: 122, description: {ru:'Зеленого цвета, теплая', en:'Green, warm'}},
    {id: 5, title: {ru:'Джинсы 3', en:'Jeans 3'}, price: 5000, description: {ru:'Синего цвета, прямые', en:'Blue, straight'}},
    {id: 6, title: {ru:'Куртка 7', en:'Jacket 7'}, price: 600, description: {ru:'Зеленого цвета, теплая', en:'Green, warm'}},
    {id: 7, title: {ru:'Джинсы 4', en:'Jeans 4'}, price: 5500, description: {ru:'Синего цвета, прямые', en:'Blue, straight'}},
    {id: 8, title: {ru:'Куртка 5', en:'Jacket 5'}, price: 12000, description: {ru:'Зеленого цвета, теплая', en:'Green, warm'}},
]

const getTotalPrice = (items:Array<ProductInterface> = []) => {
    return items.reduce((acc, item:ProductInterface) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState<Array<ProductInterface>>([]);
    const {tg, queryId} = useTelegram();
    const { t } = useTranslation();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch(process.env.REACT_APP_SERVER + '/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product:ProductInterface) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `${t('messages:buy')} ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
