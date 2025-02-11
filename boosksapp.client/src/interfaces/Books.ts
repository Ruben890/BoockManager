import { Response } from "./Response";

export interface BookDto extends Response<BookDto> {
    Id: number;
    Title?: string;
    Description?: string;
    PageCount: number;
    Excerpt?: string;
    PublishDate: Date;
}