import { observable, action } from 'mobx';
import { ipcRenderer } from 'electron';

export class Store {

    @observable
    public static width;

    @observable
    public static height;

    constructor() {
        Store.width = '800';
        Store.height = '600';
        ipcRenderer.on('resize',(event,arg) => {
            this.resize(arg);
        });
    }

    public resize = action((size) => {
        Store.width = size[0];
        Store.height = size[1];
    })
}

export default new Store();

