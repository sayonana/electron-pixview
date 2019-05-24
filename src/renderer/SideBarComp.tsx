import * as React from 'react';
import { SideBar, FileTreeList } from '../style/Style';
import { ipcRenderer } from 'electron'; 

export class SideBarComponet extends React.Component {

    render() {
        return (
            <SideBar>
                <FileTreeList onClick = {this.showData}>打开文件</FileTreeList>
            </SideBar>
        )
    }

    showData = (e) => {
        ipcRenderer.send('open-file');
        ipcRenderer.on('open-file-return', (event, arg) => {
            console.log(arg);
        });
    }

}