export type TittleItem = {
    label: string;
    value: string | number;
}

export declare namespace Segment {

    interface IClassOfService {
        uid: string;
        caption: string;
    }

    interface IDepartureAirport {
        uid: string;
        caption: string;
    }

    interface IDepartureCity {
        uid: string;
        caption: string;
    }

    interface IAircraft {
        uid: string;
        caption: string;
    }

    interface IArrivalCity {
        uid: string;
        caption: string;
    }

     interface IFreeCabinLuggage {
    }

    interface IPaidCabinLuggage {
    }

    interface IFareBasis {
        ADULT: string;
    }

    interface IADULT {
        pieces: number;
        nil: boolean;
        unit: string;
    }

    interface IFreeLuggage {
        ADULT: IADULT;
    }

    interface IPaidLuggage {
    }

    interface IServicesDetails {
        freeCabinLuggage: IFreeCabinLuggage;
        paidCabinLuggage: IPaidCabinLuggage;
        tariffName: string;
        fareBasis: IFareBasis;
        freeLuggage: IFreeLuggage;
        paidLuggage: IPaidLuggage;
    }

    interface IAirline {
        uid: string;
        caption: string;
        airlineCode: string;
    }

    interface IArrivalAirport {
        uid: string;
        caption: string;
    }

    interface IRootObject {
        classOfServiceCode: string;
        classOfService: IClassOfService;
        departureAirport: IDepartureAirport;
        departureCity: IDepartureCity;
        aircraft: IAircraft;
        travelDuration: number;
        arrivalCity: IArrivalCity;
        arrivalDate: Date;
        flightNumber: string;
        techStopInfos: any[];
        departureDate: Date;
        stops: number;
        servicesDetails: IServicesDetails;
        airline: IAirline;
        starting: boolean;
        arrivalAirport: IArrivalAirport;
    }
}