import * as React from 'react';

import { MainViewBox, ImageDiv, ImageImg } from '../style/Style';
import { Base64Head } from '../constant/Base64Head';
import { ipcRenderer } from 'electron';
import { Link } from 'react-router-dom';

const style = {
    position: 'fixed',
    left: '200px'
}

export class MainViewComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            path: []
        }
        ipcRenderer.on('open-file-return', (e, arg) => {
            console.log(arg);
            let imgList = []
            arg.imageList.list.forEach(element => {
                imgList.push(<ImageDiv key={element._filePath}><Link to = {{pathname: '/LargeViewComp',state: {element}}}><ImageImg src={Base64Head.getHead(element._extension) + element._base64}></ImageImg></Link></ImageDiv>)
            });
            this.setState({
                path: imgList
            })
        });
    }

    render() {
        return (
            <MainViewBox style={style}>
                {(this.state as any).path}
            </MainViewBox>
        )
    }

}