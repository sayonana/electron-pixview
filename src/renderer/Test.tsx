import * as React from 'react';
import { ipcRenderer } from 'electron';
import { Base64Head } from '../constant/Base64Head';
import { observer } from 'mobx-react';
import store, { Store } from '../store/Store';

// export const App = observer(() => {
//     return <Test>
//         {store.winSize.height}
//     </Test>
// });


@observer
export class Test extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            path: null
        };
    }

    render() {

        let style = {
            height: Store.height + 'px'
        }

        return (
            <div>
                <div style={style}>
                    {/* // <div> */}

                </div>
                {Store.width}
            </div>


            // <div style={BACKGROUND}>
            //     <div style={TEST}>
            //         <div>
            //             <div><a onClick={this.selectFilePath}>打开路径</a></div>
            //             <div style={OutContainer}>
            //                 <div style={InnerContainer}>
            //                     <ul>
            //                         {(this.state as any).path}
            //                     </ul>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div style={BLUR}></div>
            // </div>

        );
    }

    /**
     * 选择要打开的路径
     */
    private selectFilePath = (e) => {
        console.log('selectFilePath');
        ipcRenderer.send('open-file');
        ipcRenderer.on('open-file-return', (event, arg) => {
            console.log(arg);
            this.createListComp(arg);
        });
    }

    /**
     * 将返回的数组转化为 <li> 列表
     * @param param 字符串数组对象
     */
    private createListComp(param: any) {
        let imgList = [];
        console.log(param);
        this.traverseFileTree(param, imgList);
        console.log(imgList);
        this.setState({
            path: imgList
        })
    }

    /**
     * 遍历输入节点 将其节点下图片塞到list里
     * @param node 
     * @param imgList 
     */
    private traverseFileTree(node: any, imgList: any[]) {
        node.imageList.list.forEach(e => {
            // imgList.push(<div style={ImageListDiv}><img style={ImageList} key={e._filePath} src={Base64Head.getHead(e._extension) + e._base64}></img></div>);
        });
        node.childTree.forEach(e => {
            this.traverseFileTree(e, imgList);
        });
    }

}