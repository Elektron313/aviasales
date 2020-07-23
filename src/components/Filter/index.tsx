import React from 'react';
import { Checkbox } from 'antd';
import {TittleItem} from '../../types/types';
import {CheckboxValueType} from 'antd/es/checkbox/Group';

type FilterType = {
    filterItems: TittleItem[];
    tittle: string;
    onChange?: (value: CheckboxValueType[]) => void;
}
const Filter: React.FC<FilterType> = ({ filterItems, tittle, onChange}) => {

    return (
        <div className={'filter'}>
            <p className={'filter__tittle tittle'}>{tittle}</p>
            <div className={'filter__body'}>
                <Checkbox.Group options={filterItems} onChange={onChange}/>
            </div>
        </div>
    )
};

export default Filter;
