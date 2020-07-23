import React, {ChangeEvent} from 'react';
import {Input} from 'antd';
import './PriceRange.scss'
import {RadioChangeEvent} from 'antd/es/radio';

const styleInput = {
    width: '90%'
};
type PriceRangeType = {
    tittle: string;
    onChange: (e: RadioChangeEvent | ChangeEvent<HTMLInputElement>) => void;
};

const PriceRange: React.FC<PriceRangeType> = ({ tittle, onChange }) => {


    return (
        <div className={'price-range'}>
            <p className={'filter__tittle tittle'} >{tittle}</p>
            <div className={'price-range__from'}>
                <p>От</p>
                <Input style={styleInput}  size={'small'} type={'number'} name={'minPrice'} onChange={onChange}/>
            </div>
            <div className={'price-range__to'}>
                <p>До</p>
                <Input style={styleInput} size={'small'} type={'number'} name={'maxPrice'} onChange={onChange}/>
            </div>
        </div>
    );
};

export default PriceRange;