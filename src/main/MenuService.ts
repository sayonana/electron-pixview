import { Menu } from 'electron';

const template: Electron.MenuItemConstructorOptions[] = [
    {
        type: 'normal',
        label: '测试菜单',
    },
    {
        type: 'submenu',
        label: '子菜单',
        submenu: [
            {
                type: 'normal',
                label: '测试子菜单',
            },
            {
                role: 'undo',
                label: '撤回',
            },
            {
                role: 'redo',
                label: '刷新'
            }
        ]
    }
];

export class MenuService {

    constructor() {
        console.log('MenuService is constructed');
    }

    /**
     * 构建菜单
     */
    public static buildMenu() {
        console.log("MenuService: buildMenu")
        let menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }
}