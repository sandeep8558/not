import { ApplianceModel } from "./ApplianceModel";

export interface RoomModel {
    user_id: string;
    place_id: string;
    id: string;
    room_name: string;
    appliances: ApplianceModel[],
}