import styled from 'styled-components';

const imgUrl = 'url(' + require('../../assets/bg.jpg') + ')';

export const ImageList = {
    'margin': '0px',
    'max-height': '100px',
    'max-width': '100px',
    'align': 'middle',
    'vertical-align': 'middle',
    // '-webkit-filter': 'shadow(color=#cc66ff,direction=-50)'
    'box-shadow': '10px 10px 5px #222'
}

export const ImageListDiv = {
    'margin': '10px',
    'padding': '0px',
    'height': '100px',
    'width': '100px',
    // 'float': float,
    // 'alignContent': 'middle'
    'align': 'middle',
    'vertical-align': 'middle',
    'text-align': 'center'
}


// 全局样式
export const AppBox = (styled as any).div`
    overflow: hidden;
`
// 背景样式
export const Background = (styled as any).div`
    background-image: ${imgUrl};
    z-index: -1;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 150%;
    height: 150%;
    overflow: hidden;
`;

// 背景样式 模糊
export const BackgroundBlur = (styled as any)(Background)`
    z-index: 0;
    -webkit-filter: blur(20px);
    overflow: hidden;
`;

// 边栏样式
export const SideBar = (styled as any).div`
    position: fixed;
    z-index: 2;
    left: 0px;
    top: 0px;
    height: 100%;
    width: 200px;
    background-color: #00000080;
`;

// 文件树样式
export const FileTreeList = (styled as any).li`
    position: relative;
    z-index: 3;
    text-color: black;
    margin: 10px;
    padding: 10px;
    list-style: none;
`;

// 图片外层div
export const ImageDiv = (styled as any).div`
    margin: 10px;
    padding: 0px;
    height: 100px;
    width: 100px;
    align: middle;
    vertical-align: middle;
    text-align: center;
    float: left;
`;

// 图片本体
export const ImageImg = (styled as any).img`
    margin: 0px;
    max-height: 100px;
    max-width: 100px;
    align: middle;
    vertical-align: 'middle';
    box-shadow: 10px 10px 5px #222;
`;

// 主视图
export const MainViewBox = (styled as any).div`
    position: fiexed;
    left: 200px；
    z-index: 1;
    width: 100%;
    height: 100%;
`;

// 大视图
export const LargeView = (styled as any).div`
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 4;
    width: 102%;
    height: 100%;
    // background-color: black;
    overflow: auto;
    text-align: center;
    // -webkit-scrollbar:{display:none; width:0; height: 0;}
`;

export const LargeViewCanvas = (styled as any).canvas`
    position: relative;
    z-index: 5;
    overflow: hidden;
    // width: 100%;
    // height: 100%;
`;
