export interface Response<T = unknown> {
    Details?: T | T[];
    Message?: string;
    StatusCode?: number;
    Templates?: string;
}