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