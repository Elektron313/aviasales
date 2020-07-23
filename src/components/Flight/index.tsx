import React from 'react';
import './flight.scss'
import {Segment} from '../../types/types';
import format from 'date-fns/format';
import { ru } from 'date-fns/locale'
import transformTime from '../../utils/transformTime';



type FlightType = {
    departureAirport: Segment.IDepartureAirport;
    arrivalAirport: Segment.IArrivalAirport;
    departureDate: Date;
    arrivalDate: Date;
    stops: number;
    travelDuration: number;
}

const Flight: React.FC<FlightType> = ({ arrivalAirport, arrivalDate, departureAirport, departureDate, stops, travelDuration  }) => {


    return (
        <div className={'flight'}>
            <div className={'flight__path'}>
                <p>{departureAirport.caption}
                    <span>{`(${departureAirport.uid})`}</span>
                    {'-->'} {arrivalAirport.caption}
                    <span>{`(${arrivalAirport.uid})`}</span>
                </p>
            </div>
            <div className={'flight__time'}>
                <div className={'flight__time-dispatch'}>
                    <p>
                        {format(new Date(departureDate), 'HH:mm')}
                        <span>  {format(new Date(departureDate), 'dd LLL EEEEEE', {locale: ru})}</span>
                    </p>
                </div>
                <div className={'flight__time-path'}>
                    <p>{transformTime(travelDuration)}</p>
                    <p>{stops} пересадок</p>
                </div>
                <div className={'flight__time-arrival'}>
                    <p>
                        <span>{format(new Date(arrivalDate), 'dd LLL EEEEEE', {locale: ru})} </span>
                        {format(new Date(arrivalDate), 'HH:mm')}
                    </p>
                </div>
            </div>
            <div className={'flight__airlane'}>
                <p>Рейс выполняет LOT Polish</p>
            </div>
        </div>
    )
};

export default Flight;