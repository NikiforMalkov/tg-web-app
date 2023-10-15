import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";
import { useTranslation } from 'react-i18next';

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();
    const { t } = useTranslation();

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [country, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: t('messages:send_details')
        })
    }, [])

    useEffect(() => {
        if(!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])

    const onChangeCountry = (e: ChangeEvent<HTMLInputElement>) => {
        
        setCountry((e.target as HTMLInputElement).value)
    }

    const onChangeStreet = (e: ChangeEvent<HTMLInputElement>) => {
        setStreet((e.target as HTMLInputElement).value)
    }

    const onChangeSubject = (e: ChangeEvent<HTMLSelectElement>) => {
        setSubject((e.target as HTMLSelectElement).value)
    }

    return (
        <div className={"form"}>
            <h3>{t('messages:enter_details')}</h3>
            <input
                className={'input'}
                type="text"
                placeholder={t('messages:country')}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={t('messages:street')}
                value={street}
                onChange={onChangeStreet}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>{t('messages:physical')}</option>
                <option value={'legal'}>{t('messages:legal')}</option>
            </select>
        </div>
    );
};

export default Form;
