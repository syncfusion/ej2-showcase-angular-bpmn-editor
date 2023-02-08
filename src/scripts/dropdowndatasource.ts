import { ItemModel } from '@syncfusion/ej2-splitbuttons';
import { MenuItemModel, } from '@syncfusion/ej2-navigations';
import { ContextMenuItemModel } from '@syncfusion/ej2-angular-diagrams';
import { DropDownButton } from '@syncfusion/ej2-angular-splitbuttons';

export class DropDownDataSources {

    public toolbarItems: any = [

    { prefixIcon: 'sf-icon-undo tb-icons', tooltipText: 'Undo',cssClass: 'tb-item-start tb-item-undo' },
    { prefixIcon: 'sf-icon-redo tb-icons', tooltipText: 'Redo',cssClass: 'tb-item-end tb-item-redo' },
                    { type: 'Separator',},
    { prefixIcon: 'sf-icon-pan', tooltipText: 'Pan Tool',cssClass:'tb-item-start pan-item'},
    { prefixIcon: 'sf-icon-pointer', tooltipText: 'Select Tool',cssClass:'tb-item-middle tb-item-selected'},
    { tooltipText: 'Change Connector Type',template: '<button id="conTypeBtn" style="width:100%;"></button>',cssClass:'tb-item-middle'},
    { prefixIcon: 'sf-icon-text', tooltipText: 'Text Tool',cssClass:'tb-item-end' },
                    // { type: 'Separator',template:'<div style="margin-left:70px;"></div>'},
    { prefixIcon: 'sf-icon-group', tooltipText:'Group',align:'Center',visible:false ,  cssClass: 'tb-item-start tb-item-align-category'},
                    { type: 'Separator', visible: false,align:'Center', },
    {
        prefixIcon: 'sf-icon-align_left', tooltipText: 'Align Left',align:'Center',visible:false ,    cssClass: 'tb-item-middle  tb-item-align-category'
    },
    {
        prefixIcon: 'sf-icon-align_center', tooltipText: 'Align Center',align:'Center',visible:false ,   cssClass: 'tb-item-middle  tb-item-align-category'
    },
    {
        prefixIcon: 'sf-icon-align_right', tooltipText: 'Align Right',align:'Center',visible:false ,    cssClass: 'tb-item-middle  tb-item-align-category'
    },
    {
        prefixIcon: 'sf-icon-align_top', tooltipText: 'Align Top',align:'Center',visible:false ,   cssClass: 'tb-item-middle  tb-item-align-category'
    },
    {
        prefixIcon: 'sf-icon-align_middle', tooltipText: 'Align Middle',align:'Center',visible:false ,  cssClass: 'tb-item-middle  tb-item-align-category'
    },
    {
        prefixIcon: 'sf-icon-align_bottom', tooltipText: 'Align Bottom',align:'Center',visible:false ,   cssClass: 'tb-item-middle  tb-item-align-category'
    },
    {
        prefixIcon: 'sf-icon-distribute_horizontal', tooltipText: 'Distribute Objects Vertically',align:'Center',visible:false ,   cssClass: 'tb-item-middle tb-item-space-category'
    },
    {
        prefixIcon: 'sf-icon-distribute_vertical', tooltipText: 'Distribute Objects Horizontally',align:'Center',visible:false ,    cssClass: 'tb-item-middle tb-item-space-category'
    },
                { type: 'Separator', visible: false,align:'Center',  },
    { prefixIcon: 'sf-icon-bring-forward', tooltipText: 'Bring Forward',align:'Center', visible:false ,    cssClass: 'tb-item-start tb-item-lock-category'},
    { prefixIcon: 'sf-icon-bring-to-front', tooltipText: 'Bring To Front',align:'Center',visible:false ,     cssClass: 'tb-item-middle tb-item-lock-category'},
    { prefixIcon: 'sf-icon-send-backward', tooltipText: 'Send Backward',align:'Center',visible:false ,     cssClass: 'tb-item-middle tb-item-lock-category'},
    { prefixIcon: 'sf-icon-send-to-back', tooltipText: 'Send To Back',align:'Center', visible:false ,    cssClass: 'tb-item-end tb-item-lock-category'},
                    { type: 'Separator', visible: false,align:'Center',   },
    {prefixIcon: 'sf-icon-Lock tb-icons', tooltipText: 'Lock',align:'Center',visible:false ,     cssClass: 'tb-item-start tb-item-lock-category'}, 
    { prefixIcon: 'sf-icon-delete', tooltipText: 'Delete',align:'Center',visible:false ,   cssClass: 'tb-item-end tb-item-lock-category'},
                    { type: 'Separator', visible: false,align:'Center'},
                // {
                //     type: 'Separator',template:'<div style="margin-left:330px;"></div>'
                // },
    {
        cssClass: 'tb-item-end tb-zoom-dropdown-btn', template: '<button id="btnZoomIncrement"></button>',align:'Right'
    },
    { prefixIcon: 'sf-icon-properties' , tooltipText: 'Hide/Show property',template:'<button id="hideProperty"></button>',align:'Right'}
];
    public getFileMenuItems: ItemModel[] = [
        { text: 'New' ,iconCss:'sf-icon-new'}, { text: 'Open',iconCss:'sf-icon-open' }, { separator: true },
        { text: 'Save', iconCss: 'sf-icon-save' },
        { text: 'Export', iconCss: 'sf-icon-export' }, { separator: true },
        { text: 'Print', iconCss: 'sf-icon-print' }
    ];

    public getEditMenuItems: MenuItemModel[] = [
        { text: 'Undo', iconCss: 'sf-icon-undo' },
        { text: 'Redo', iconCss: 'sf-icon-redo' },
        { separator: true },
        { text: 'Cut', iconCss: 'sf-icon-cut' },
        { text: 'Copy', iconCss: 'sf-icon-copy' },
        { text: 'Paste', iconCss: 'sf-icon-paste' },
        { separator: true },
        { text: 'Rotate',iconCss:'sf-icon-rotate', 
        items:[
            { text: 'Rotate Right 90', iconCss: 'sf-icon-rotate-clockwise' },
            { text: 'Rotate Left 90', iconCss: 'sf-icon-rotate-counter-clockwise' },
            { text: 'Flip Vertical', iconCss: 'sf-icon-flip-vertical' },
            { text: 'Flip Horizontal', iconCss: 'sf-icon-flip-horizontal' },
        ]
    },
        { text: 'Delete', iconCss: 'sf-icon-delete' },
        { separator: true },
        {text: 'Order Commands',iconCss:'sf-icon-Order',
            items:[ { text: 'Bring Forward', iconCss: 'sf-icon-bring-forward' },
                    { text: 'Bring To Front', iconCss: 'sf-icon-bring-to-front' },
                    { text: 'Send Backward', iconCss: 'sf-icon-send-backward' },
                    { text: 'Send To Back', iconCss: 'sf-icon-send-to-back' },
            ]
        } 
      ];
      
    public getDesignMenuItems: MenuItemModel[] = [
        { text: 'Orientation',iconCss: 'sf-icon-page_orientation',
        items:[
            { text: 'Landscape', iconCss: 'sf-icon-check-tick' },
            { text: 'Portrait', iconCss: '' }
        ]    
        },
        { text: 'Size', iconCss: 'em-icons e-copy',
        items:this.paperList1()
        }
      ];
    public getToolsMenuItems: MenuItemModel[] = [
        { text: 'Selection Tool',iconCss: 'sf-icon-pointer' },
        { text: 'Pan Tool', iconCss: 'sf-icon-pan tb-icons' },
        { separator: true },
        { text: 'Connector Tool',iconCss:'sf-icon-orthogonal_line',
        items:[
            {text:'Straight',iconCss: 'sf-icon-straight_line'},
            {text:'Orthogonal',iconCss: 'sf-icon-orthogonal_line'},
            {text:'Bezier',iconCss: 'sf-icon-bezier'},
        ] 
    }
      ];
    public getSelectMenuItems: ItemModel[] = [
        { text: 'Select All',},
        { text: 'Select All Nodes', },
        { text: 'Select All Connectors', },
        { text: 'Deselect All', }
      ];

  public getViewMenuItems: ItemModel[] = [
    { text: 'Show Lines',iconCss: 'sf-icon-check-tick'},
    { text: 'Snap To Grid',iconCss : 'sf-icon-check-tick'},
    { text: 'Snap To Object',iconCss : 'sf-icon-check-tick'},
    { text: 'Show Ruler',iconCss: 'sf-icon-check-tick'},
    { text: 'Show Page Breaks',iconCss: ''},
    { separator: true },
    { text: 'Fit To Width'},
    { text: 'Fit To Page'},
      ];
    public paperList1(){ var items= [
        { text: 'Letter (8.5 in x 11 in)', value: 'Letter',iconCss:'sf-icon-check-tick' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
        { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
        { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
        { text: 'A6 (105 mm x 148 mm)', value: 'A6' },
        ];
         return items
    };
    public conTypeItems:ItemModel[] = [
        {text: 'Straight',iconCss: 'sf-icon-straight_line'},
                     {text: 'Orthogonal',iconCss: 'sf-icon-orthogonal_line'},
                     {text: 'Bezier',iconCss: 'sf-icon-bezier'}
    ];
    public zoomMenuItems:ItemModel[] = [
        { text: 'Zoom In' },{ text: 'Zoom Out' },{ text: 'Zoom to Fit' },{ text: 'Zoom to 50%' },
        { text: 'Zoom to 100%' },{ text: 'Zoom to 200%' },
    ];

    public fileFormats: { [key: string]: Object }[] = [
        { text: 'JPG', value: 'JPG' }, { text: 'PNG', value: 'PNG' },
        { text: 'SVG', value: 'SVG' }
    ];
    public diagramRegions: { [key: string]: Object }[] = [
        { text: 'Content', value: 'Content' }, { text: 'PageSettings', value: 'PageSettings' }
    ];
    public paperList: { [key: string]: Object }[] = [
        { text: 'Letter (8.5 in x 11 in)', value: 'Letter' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
        { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
        { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
        { text: 'A6 (105 mm x 148 mm)', value: 'A6' }, { text: 'Custom', value: 'Custom' },
    ];
    public gradientDirections: { [key: string]: Object }[] = [
        { text: 'Bottom To Top', value: 'South' }, { text: 'Top To Bottom', value: 'North' },
        { text: 'Left To Right', value: 'East' }, { text: 'Right To Left', value: 'West' }
    ];
    public backgroundTypes = [
        {text: 'Solid', value:'Solid'},
        {text:'Gradient',value:'Gradient'}
    ];
    public borderStyles = [
        { text: '', value: '', className: 'ddl-svg-style ddl_linestyle_none' },
        { text: '1,2', value: '1,2', className: 'ddl-svg-style ddl_linestyle_one_two' },
        { text: '3,3', value: '3,3', className: 'ddl-svg-style ddl_linestyle_three_three' },
        { text: '5,3', value: '5,3', className: 'ddl-svg-style ddl_linestyle_five_three' },
        { text: '4,4,1', value: '4,4,1', className: 'ddl-svg-style ddl_linestyle_four_four_one' }
    ];
    public lineStyles = [
        { text: '', value: '', className: 'ddl-svg-style ddl_linestyle_none' },
        { text: '2 2', value: '2 2', className: 'ddl-svg-style ddl_linestyle_one_two' },
        { text: '4 4', value: '4 4', className: 'ddl-svg-style ddl_linestyle_three_three' },
        { text: '5,3', value: '5,3', className: 'ddl-svg-style ddl_linestyle_five_three' },
        { text: '4,4,1', value: '4,4,1', className: 'ddl-svg-style ddl_linestyle_four_four_one' }
    ];
    public lineTypes = [
        { text: 'Straight', value: 'Straight' }, { text: 'Orthogonal', value: 'Orthogonal' },
        { text: 'Bezier', value: 'Bezier' }
    ];
    public decoratorList = [
        { text: 'None', value: 'None' },
        { text: 'Arrow', value: 'Arrow' },
        { text: 'Diamond', value: 'Diamond' },
        { text: 'Open Arrow', value: 'OpenArrow' },
        { text: 'Circle', value: 'Circle' },
        { text: 'Square', value: 'Square' },
        { text: 'Fletch', value: 'Fletch' },
        { text: 'Open Fetch', value: 'OpenFetch' },
        { text: 'Indented Arrow', value: 'IndentedArrow' },
        { text: 'Outdented Arrow', value: 'OutdentedArrow' },
        { text: 'Double Arrow', value: 'DoubleArrow' }
    ];
    public fontFamilyList = [
        { text: 'Arial', value: 'Arial' },
        { text: 'Aharoni', value: 'Aharoni' },
        { text: 'Bell MT', value: 'Bell MT' },
        { text: 'Fantasy', value: 'Fantasy' },
        { text: 'Times New Roman', value: 'Times New Roman' },
        { text: 'Segoe UI', value: 'Segoe UI' },
        { text: 'Verdana', value: 'Verdana' },
    ];
}

