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
    backgroundColor?: string;
    layout: {
        paddingX?: string;
        paddingY?: string;
        marginX?: string;
        marginY?: string;
        alignmentX?: string;
        alignmentY?: string;
    }
    styles?: {
        color?: string;
        backgroundColor?: string;
        fontSize?: string;
        [key: string]: any;
    };
    textBlock?: { 
        html?: string;
        content?: string; 
        tag?: string; 
        font?: any;
        alignment?: string;
        textCase?: string;
    };
    buttonBlock?: {
        label?: string;
        href?: string;
        variant?: 'primary' | 'secondary' | 'link';
        tag?: string;
        content?: string;
        font?: any;
        alignment?: string;
        textCase?: string;
        background?: string;
    };
    accordionBlock?: {
        heading?: any;
        content?: any;
        accordions?: any[];
        alignment?: string;
    }

}