import React from 'react';
import Flight from '../Flight'
import './carrier.scss'
import {Button} from 'antd';
import {Segment} from '../../types/types';

type CarrierType = {
    caption: string;
    price: string;
    flights: Segment.IRootObject[];
}

const Carrier: React.FC<CarrierType> = ({ caption, price, flights}) => {


    return (
        <div className={'carrier'}>
            <div className={'carrier__header'}>
                <div className={'carrier__header-airline'}>
                    <span>{caption}</span>
                </div>
                <div className={'carrier__header-price'}>
                    <span>{price}  ₽</span>
                    <p>Стоимость для одного взрослого пассажира</p>
                </div>
            </div>
            <div className={'carrier__info'}>
                {flights.map((item) => {
                    return (
                        <div key={item.aircraft.caption+item.departureDate}>
                            <Flight
                                departureAirport={item.departureAirport}
                                arrivalAirport={item.arrivalAirport}
                                departureDate={item.departureDate}
                                arrivalDate={item.arrivalDate}
                                stops={item.stops}
                                travelDuration={item.travelDuration}
                            />
                        </div>
                    )
                })}
            </div>
            <div className={'carrier__button'}>
                <Button style={{width: '100%'}} type="primary">Выбрать</Button>
            </div>
        </div>
    );
};

export default Carrier;

