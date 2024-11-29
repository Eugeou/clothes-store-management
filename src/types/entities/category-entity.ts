import { Gender } from "./genders-entity";

export interface Category {
    id: string;
    name: string;
    productGender: Gender;
}