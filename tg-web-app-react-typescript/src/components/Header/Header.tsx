import React, { useEffect } from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store/rootReducer';
import { useTypedDispatch, useTypedSelector } from '../../hooks/hooks';
import { changeLanguageSuccess } from '../../store/lang/langSlice';

const Header = () => {
    const { t, i18n } = useTranslation();
    const {user, onClose} = useTelegram();

    const { currentLanguage }  = useTypedSelector((state:RootState) => state.lang)
    const dispatch = useTypedDispatch()

    const changeLanguageHandler = (lang:string) =>
    {
        i18n.changeLanguage(lang);
        dispatch(changeLanguageSuccess(lang));
    }

    useEffect(() => {
        if (user?.language_code !== undefined) {
            changeLanguageHandler(user?.language_code);
        }
    }, [])

    return (
        <div className={'header'}>
            <Button onClick={onClose}>{t('messages:close')}</Button>
            <span>
                <select className='form-select' onChange={ (event) => {
                        changeLanguageHandler(event.target.value);
                    }}
                >
                    <option value="ru" selected={currentLanguage === "ru"}>ru</option>
                    <option value="en" selected={currentLanguage === "en"}>en</option>
                </select>
            </span>
            <span className={'username'}>
                {user?.username}
            </span>
        </div>
    );
};

export default Header;
