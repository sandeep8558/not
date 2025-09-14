import { RoomModel } from "./RoomModel";

export interface PlaceModel {
    user_id: string;
    id: string;
    place_name: string;
    address: string;
    ssid: string;
    pswd: string;
    rooms: RoomModel[];
    share_places: any[];
}