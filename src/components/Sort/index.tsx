import React from 'react';
import {Radio} from 'antd';
import './Sort.scss';
import {TittleItem} from '../../types/types';
import {RadioChangeEvent} from 'antd/es/radio';

type SortType = {
    sortItems: TittleItem[];
    radioStyle: React.CSSProperties;
    tittle: string;
    onChange: (e: RadioChangeEvent) => void;
    value: string;
}

const Sort: React.FC<SortType> = ({ sortItems, radioStyle, tittle, onChange, value }) => {

    return (
        <div className={'sort'}>
            <p className={'sort__tittle tittle'}>{tittle}</p>
            <div className={'sort__body'}>
                <Radio.Group onChange={onChange} value={value} name={'sort'}>
                    {sortItems.map(item => {
                        return (
                            <Radio key={item.value} style={radioStyle} value={item.value} >
                                <span>{item.label}</span>
                            </Radio>
                        )
                    })}
                </Radio.Group>
            </div>
        </div>
    );
};

export default Sort