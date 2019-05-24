import * as React from 'react';
import { Link } from 'react-router-dom';
import { LargeView, LargeViewCanvas, AppBox, Background, BackgroundBlur } from '../style/Style';
import { ipcRenderer } from 'electron';
import { observer } from 'mobx-react';
import { Store } from '../store/Store';

@observer
export class LargeViewComp extends React.Component {

    private canvas = document.getElementById('canvas');
    private img = new Image();
    private width = 0;
    private height = 0;
    private vertical = 0; // 横屏还是竖， 0 表示 竖

    constructor(props) {
        super(props);
        ipcRenderer.on('resize', () => {
            let ctx = (this.canvas as any).getContext('2d');
            let ratio = this.getPixelRatio(ctx);

            ctx.drawImage(this.img, 0, 0, (Store.height * this.img.width / this.img.height), Store.height);
            // ctx.drawImage(this.img, 0, 0, this.img.width * Store.height / this.img.height * ratio, Store.height * ratio);
        })
    }

    /**
     * 渲染页面前，页面跳转后
     */
    componentWillMount() {
        this.img = new Image();
        console.log(this.props);
        if ((this.props as any).location.state) {
            this.img.src = (this.props as any).location.state.element._base64Head + (this.props as any).location.state.element._base64;
        }
        this.vertical = this.img.width > this.img.height ? 0 : 1;
        this.width = this.img.width;
        this.height = this.img.height;
    }

    /**
     * 已经渲染页面
     */
    componentDidMount() {

        this.canvas = document.getElementById('canvas');
        let ctx = (this.canvas as any).getContext('2d');
        let ratio = this.getPixelRatio(ctx);
        console.log(this.img.width + ' - ' + this.img.height);
        console.log((this.img.width * Store.height / this.img.height) + ' - ' + Store.height);
        // ctx.drawImage(this.img, 0, 0, this.img.width /* Store.height / this.img.height*/ * ratio, this.img.height * ratio);
        ctx.drawImage(this.img, 0, 0, (Store.height * this.img.width / this.img.height) , Store.height);
    }

    private getPixelRatio = function (context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;

        return (window.devicePixelRatio || 1) / backingStore;
    };

    render() {

        let style = {
            width: Store.width + 'px',
            height: Store.height + 'px',
        }

        let bgStyle;

        if ((this.props as any).location.state) {
            bgStyle = {
                backgroundImage: 'url(' + (this.props as any).location.state.element._base64Head + (this.props as any).location.state.element._base64 + ')'
            }
        }

        return (
            <AppBox style = {style}>
                <Link to='/'>点我回去
                    <LargeView>
                        <LargeViewCanvas id='canvas' width={(Store.height * this.img.width / this.img.height)} height={Store.height}></LargeViewCanvas>
                    </LargeView>
                    <BackgroundBlur style={bgStyle}></BackgroundBlur>
                    <Background style={bgStyle}></Background>
                </Link>
            </AppBox>

        )
    }

}