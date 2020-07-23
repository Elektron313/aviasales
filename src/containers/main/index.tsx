import React, {ChangeEvent, useState} from 'react';
import Sort from '../../components/Sort';
import Filter from '../../components/Filter';
import PriceRange from '../../components/PriceRange';
import {TittleItem} from '../../types/types';
import './Main.scss';
import  data  from '../../flights'
import { orderBy, some } from 'lodash';
import Carrier from '../../components/Carrier';
import {RadioChangeEvent} from 'antd/es/radio';
import {CheckboxValueType} from 'antd/es/checkbox/Group';
import {Button} from 'antd';

const dataFlights = data.result.flights;
const listAirlines = dataFlights.map((item: any) => {
   return {
       airline: item.flight.carrier.caption,
       price: parseInt(item.flight.price.total.amount),
   }
});
const sortAirlines = orderBy(listAirlines, ['price', 'airline'], ['asc', 'asc']);

type Carrier = {
    airline: string;
    price: string;
}
const minPriceAirlanes = sortAirlines.reduce((acc: Carrier[], item) => {
        const index = acc.findIndex(carrier => carrier.airline === item.airline);
        if (index < 0) {
           return [...acc, item]
        }
        return acc
}, []).map((item: any) => ({ label: `${item.airline} от ${item.price} р.`, value: item.airline }));

const radioStyle = {
    display: 'block',
    height: '20px',
    lineHeight: '30px',
};

const sortItems: TittleItem[] = [
    {
        label: '-по возрастанию цены',
        value: 'asc',
    },
    {
        label: '-по убыванию цены',
        value: 'desc',
    },
    // {
    //     label: '-по времени в пути',
    //     value: 'time'
    // }
];

const filterItems: TittleItem[] = [
    {
        label: '- 1 пересадка',
        value: 1,
    },
    {
        label: '-без пересадок',
        value: 0,
    },
];

type StateType = {
    sort: 'asc' | 'desc',
    stops: CheckboxValueType[],
    minPrice: string,
    maxPrice: string,
    airlines: CheckboxValueType[],
    maxLength: number;
}
const Main: React.FC = () => {

    const [state, setState] = useState<StateType>({
        sort: 'asc',
        stops: [],
        minPrice: '',
        maxPrice: '',
        airlines: [],
        maxLength: 10,
    });

    const changeSort = (e: RadioChangeEvent | ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({...prevState, [String(name)]: value}))
    };
    const changeStops = (values: CheckboxValueType[]) => {
        setState((prevState => ({...prevState, stops: values})))
    };
    const changeAirlanes = (values: CheckboxValueType[]) => {
        setState((prevState => ({...prevState, airlines: values})))
    };
    const changeLength = () => {
        setState(prevState => ({...prevState, maxLength: prevState.maxLength + 5}))
    };
    let data = dataFlights;
    data = orderBy(data, (item: any) => parseInt(item.flight.price.total.amount), [state.sort]);
    if (state.stops.length === 1) {
        data = data.reduce((acc: any, item: any) => {
           const filterStops = item.flight.legs.filter((elem: any) => some(elem.segments, {'stops': state.stops[0]}));
           return [...acc, {...item, flight: {...item.flight, legs: filterStops}}]
        }, []);
    }
    if (state.minPrice) {
        data = data.filter((item: any) => parseInt(item.flight.price.total.amount) >= parseInt(state.minPrice))
    }
    if (state.maxPrice) {
        data = data.filter((item: any) => parseInt(item.flight.price.total.amount) <= parseInt(state.maxPrice))
    }
    if (state.airlines.length > 0 ) {
        data = data.filter((item: any) => {
            return state.airlines.some((elem: any) => {
                const value = item.flight.carrier.caption === elem;
                if (value) {
                    return value
                }
            });
        })
    }
    console.log(data)

    return (
        <div className={'main'}>
            <div className={'main__panel-settings'}>
                <div className={'main__panel-settings-item'}>
                    <Sort
                        radioStyle={radioStyle}
                        sortItems={sortItems}
                        tittle={'Сортировать'}
                        onChange={changeSort}
                        value={state.sort}
                    />
                </div>
                <div className={'main__panel-settings-item'}>
                    <Filter
                        filterItems={filterItems}
                        tittle={'Фильтровать'}
                        onChange={changeStops}
                    />
                </div>
                <div className={'main__panel-settings-item'}>
                    <PriceRange tittle={'Цена'} onChange={changeSort}/>
                </div>
                <div className={'main__panel-settings-item'}>
                    <Filter
                        filterItems={minPriceAirlanes}
                        tittle={'Авиакомпании'}
                        onChange={changeAirlanes}
                    />
                </div>
            </div>
            <div>

            </div>
            <div className={'main__list-result'}>
                {data.map((item: any) => {
                    const list = item.flight.legs.reduce((acc: any, elem: any, index: number) => {
                        return [
                            ...acc,
                            <Carrier
                                key={item.flight.carrier.caption + index}
                                caption={item.flight.carrier.caption}
                                price={item.flight.price.total.amount}
                                flights={elem.segments}
                            />
                        ]
                    },[]);
                    return [...list]
                }).slice(0, state.maxLength)}
                <div className={'main__list-result-btn'}>
                    <Button onClick={changeLength}>
                        Продолжить
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Main;
