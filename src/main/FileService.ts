import { dialog } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
// import * as worker_threads from 'worker_threads' ;

import Base64Image from '../bean/Base64Image';
import Base64ImageList from '../bean/Base64ImageList';
import { JPG, PNG } from '../constant/FileType';
import { FileTree } from '../bean/FileTree';

declare let module: any;

// 图片文件过滤器
const fileFiltersImg: Electron.FileFilter = {
    extensions: ['jpg', 'png'],
    name: 'imageFilter'
}

// 打开文件设置
const openDialogOption: Electron.OpenDialogOptions = {
    defaultPath: '~',
    filters: [fileFiltersImg],
    properties: ['openFile', 'openDirectory', 'multiSelections']
}

export class FileService {

    public static fileTree: FileTree;

    private static base64ImageList: Base64ImageList;

    constructor() {
        console.log('FileService is constructed');
    }

    /**
     * 以 Base64格式读入数据
     * @param 传入路径
     */
    public static readFileBase64(path: string) {
        return fs.readFileSync(path, { encoding: 'base64', flag: 'r' });
    }

    /**
     * 设置路径
     * 通过打开对话框选择
     * 如果传入是的是个目录 则返回这个目录下所有匹配文件列表
     * 否则返回选中的文件列表
     * 将 路径 + base64串 对象穿回去
     * @returns Promise 返回一个Promise对象
     */
    public static selectFile() {
        return new Promise((resolve, reject) => {
            dialog.showOpenDialog(openDialogOption, (data) => {
                console.log('showOpenDialog:');
                console.log(data);

                // 如果没打开东西处理下
                if (data == undefined) {
                    reject("open nothing");
                    return;
                }
                this.fileTree = new FileTree();
                this.traversePath(data, this.fileTree);

                resolve(this.fileTree);

                // let root: FileTree = new FileTree();
                // this.traversePath(data, root);


                // // console.log(this.base64ImageList);
                // resolve(root);
            });
        });
    }

    /**
     * 输入目录路径 将其路径下的所有图片存进去
     * @param path 目录路径
     * @returns 返回当前目录树
     */
    // private static readDirPath(path: string): FileTree {
    // let root: FileTree = new FileTree();
    // this.traversePath(path, root);
    // console.log(root);
    // return root;
    // }

    /**
     * 根据后缀名判断文件是否为图片文件
     */
    private static isImageFile(fileName: string) {
        if (path.extname(fileName) == JPG || path.extname(fileName) == PNG) {
            return true;
        }
        return false;
    }

    /*
    输入为一个路径数组 可能全部是文件，可能全部是目录，可能是文件目录组合
    输入为其父节点
    初始化一个空的根节点
    遍历输入 如果是目录 将其添加进父节点的目录数组 并将这个节点作为新的父节点 继续递归遍历
    如果是 文件 将其添加进父节点的目录数组
    */
    /**
     * 输入当前路径 和 它的父节点
     * 遍历当前目录下所有路径
     * 如果是目录 则递归遍历
     * 如果是图片 则将其添加到当前节点下
     * @param path 需要遍历的路径
     * @param parentTree 父节点
     */
    public static traversePath(filePaths: string[], parentTree?: FileTree) {

        filePaths.forEach(e => {
            // 除了第一次的入参 readdir 方法返回的都不带全路径
            if (parentTree.getPath() != undefined) {
                e = parentTree.getPath() + '/' + e;
            }
            let stat = fs.statSync(e);
            if (stat.isDirectory()) {
                let thisTree = new FileTree(e);
                let childFilePaths: string[] = fs.readdirSync(e);
                parentTree.setChildTree(thisTree); // 将这个节点添加进父节点的 目录数组
                this.traversePath(childFilePaths, thisTree); // 接着去遍历这个节点内容
            } else if (stat.isFile() && this.isImageFile(e)) {
                // console.log(filePath);
                parentTree.setImageList(new Base64Image(e));
            }
        });
    }

    // public static workerT() {
    //     console.log('workerT');
    //     console.log(worker_threads);
    //     console.log(worker_threads.Worker);
    // }

}
