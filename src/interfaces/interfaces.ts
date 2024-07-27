import { FieldTypes } from "./consts";

export interface IFormField {
    fieldName: string;
    label: string;
    isMandatory: boolean;
    fieldType: FieldTypes;
    options?: Array<{ label: string, value: string }>;
}

export interface ISearchResult {
    category: string;
    name: string;
    url: string;
}


export interface ICategoryData {
    name: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: string
    gender: string
    created: string
    edited: string
    url: string
}
