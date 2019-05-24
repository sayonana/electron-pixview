import Base64ImageList from "./Base64ImageList";
import Base64Image from "./Base64Image";

export class FileTree {

    private path: string; //  表示当前节点的路径
    
    private childTree: FileTree[]; // 子节点列表

    private imageList: Base64ImageList; // 该目录下图片列表

    constructor(path?: string) {
        this.path = path;
        this.childTree = [];
        this.imageList = new Base64ImageList();
    }

    public setImageList(v: Base64Image) {
        this.imageList.push(v);
    }

    public getImageList(): Base64ImageList {
        return this.imageList;
    }

    public setChildTree(v: FileTree) {
        this.childTree.push(v);
    }

    public getChildTree(): FileTree[] {
        return this.childTree;
    }

    public setPath(v: string) {
        this.path = v;
    }

    public getPath(): string {
        return this.path;
    }
    
}
