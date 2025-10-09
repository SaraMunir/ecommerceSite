export interface Page {
    id: string;
    name: string;
    pageName: string;
    sections: Section[];
    storeId: string;
    storeNumber: string;
    published?: boolean;
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