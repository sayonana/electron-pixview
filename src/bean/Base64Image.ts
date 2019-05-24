
import * as fs from 'fs';
import * as path from 'path';

import { FileService } from '../main/FileService';
import { dialog } from 'electron';
import { JPG,PNG } from '../constant/FileType';
import { JPGHEAD, PNGHEAD } from '../constant/Base64Head';

/**
 * 单个图像对象
 */
export default class Base64Image {

    private _filePath : string;
    private _base64 : string;
    private _extension : string;
    private _dirPath : string;
    private _base64Head : string;
    private _stat : fs.Stats;

    constructor(filePath?: string) {
        console.log('a Base64Image is constructed');
        this._filePath = filePath;
        this._base64 = FileService.readFileBase64(filePath);
        this._extension = path.extname(filePath);
        this._dirPath = path.dirname(filePath);
        this.transExtension();
        this.saveStat();
    }

    /**
     * 自动转化后缀， 主要是把 jpg 转化为 jpeg
     */
    transExtension() {
        if (this._extension == JPG) {
            this._base64Head = JPGHEAD;
        } else if(this._extension == PNG) {
            this._base64Head = PNGHEAD;
        }
    }

    /**
     * 保存文件系统的stat
     */
    saveStat() {
        fs.stat(this._filePath,(err, stats) => {
            if(err) {
                dialog.showErrorBox('获取文件状态', err.toString());
                return;
            }
            this._stat = stats});
    }

    
    public getFilePath() : string {
        return this._filePath;
    }
    public setFilePath(v : string) {
        this._filePath = v;
    }

    public getBase64() : string {
        return this._base64;
    }
    public setBase64(v : string) {
        this._base64 = v;
    }
    
    public getExtension() : string {
        return this._extension;
    }
    public setExtension(v : string) {
        this._extension = v;
    }
    
    public getDirpath() : string {
        return this._dirPath;
    }
    public setDirpath(v : string) {
        this._dirPath = v;
    }
    
    public getBase64Head() : string {
        return this._base64Head;
    }
    public setBase64Head(v : string) {
        this._base64Head = v;
    }
    
    public getStat() : fs.Stats {
        return this._stat;
    }
    public setStat(v : fs.Stats) {
        this._stat = v;
    }
    
    
}
