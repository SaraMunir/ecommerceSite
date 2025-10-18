export interface Page {
    id: string;
    _id?: string;
    pageContent?: {
        sections: Section[];
    };
    pageName: string;
    name: string;
    // sections: any[];
    storeId: string;
    storeNumber: string;
    themeKey?: string;
}
export interface Section {
    id: string;
    type: string;
    height: number;
    width: number;
    bgColor: string;
    bgImage: { url: string; show: boolean, alt?: string, file?: File | null, type?: string, _id?: string };
    videoUrl: { url: string; show: boolean };
    bgOpacity: number;

}
export interface Block {
    uid: string;
    type: any;
    rowSpan: any;
    colSpan: any;
    colstart: any;
    rowstart: any;
    blockadded: boolean;
    html: any;
    textBlock?: { 
        content?: string; 
        tag?: string; 
        html?: string;
        font?: any;
    };
    styles?: {
        color?: string;
        backgroundColor?: string;
        fontSize?: string;
        [key: string]: any;
    };
}