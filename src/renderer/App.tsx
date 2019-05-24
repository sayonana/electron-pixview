import * as React from 'react';
import { observer } from 'mobx-react';
import { Router, Route, Link } from 'react-router-dom';

import { AppBox, Background, BackgroundBlur } from '../style/Style';
import { Store } from '../store/Store';
import { SideBarComponet } from './SideBarComp';
import { MainViewComp } from './MainViewComp';
import { LargeViewComp } from './LargeViewComp';

@observer
export class App extends React.Component {

    // TODO
    // 1. 优化打开文件速度 worker多线程闪退
    // 2. 选中文件处理 
    // 3. 显示大图
    // 4. 优化侧边栏
    // √ 5. 优化窗口大小变化

    render() {
        let style = {
            width: Store.width + 'px',
            height: Store.height + 'px'
        };
        return (
            // <Router>
            //     <div>
            //         <Route path = "/" component = {AppBox}></Route>
            //         <Route path = "/LargeViewComp" component = {LargeViewComp}></Route>
                    <AppBox style={style}>
                        <SideBarComponet></SideBarComponet>
                        <MainViewComp></MainViewComp>
                        <BackgroundBlur />
                        <Background />
                    </AppBox>
                // </div>
            // </Router>

        );
    }

}