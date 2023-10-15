import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store/rootReducer';
import { useTypedSelector } from '../../hooks/hooks';
import { ProductInterface } from './ProductInterface';
import { LangOptions } from '../../i18n/config';


const ProductItem: React.FC<{product: ProductInterface, className:string, onAdd:any}> = ({product, className, onAdd}) => {

    const { currentLanguage }  = useTypedSelector((state:RootState) => state.lang)
    const { t } = useTranslation();
    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'}/>
            <div className={'title'}>{product.title[currentLanguage as keyof LangOptions]}</div>
            <div className={'description'}>{product.description[currentLanguage as keyof LangOptions]}</div>
            <div className={'price'}>
                <span>{t('messages:price')}<b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                {t('messages:add_to_cart')}
            </Button>
        </div>
    );
};

export default ProductItem;
