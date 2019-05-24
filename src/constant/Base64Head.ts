import { JPG, PNG } from "./FileType";

export const JPGHEAD = 'data:image/jpeg;base64,'
export const PNGHEAD = 'data:image/png;base64,'

export class Base64Head {

    /**
     * 根据后缀返回相应的文件头
     * @param ext 文件后缀名
     */
    public static getHead(ext: string) {
        if(ext == JPG) {
            return JPGHEAD;
        }
        if(ext == PNG) {
            return PNGHEAD;
        }
    }
}