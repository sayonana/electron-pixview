import Base64Image from './Base64Image';

export default class Base64ImageList {

    private list: Base64Image[];

    /**
     * 构建的时候 初始化list
     */
    constructor(param?: Base64ImageList) {
        console.log('a Base64ImageList is constructed');
        this.list = [];
        if(param) {
            // this.list = param
            param.getList().map(e => {
                this.list.push(e);
            })
        }
    }

    public getList() {
        return this.list;
    }

    public push(base64Image: Base64Image) {
        this.list.push(base64Image);
    }
}