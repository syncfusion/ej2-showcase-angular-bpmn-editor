import { Connector, ConnectorModel, Diagram,DiagramTools,NodeModel, SelectorModel, Node, NodeConstraints, ConnectorConstraints, IHistoryChangeArgs, SnapConstraints, DiagramModel, Gradient, GradientModel, GradientType, DiagramGradient, PointModel, HorizontalAlignment, VerticalAlignment, TextAlign, DiagramBeforeMenuOpenEventArgs, BpmnShapeModel, BpmnFlow, TextStyleModel } from "@syncfusion/ej2-diagrams";
import { ClickEventArgs, ItemModel, MenuModel, OpenCloseMenuEventArgs, Toolbar } from "@syncfusion/ej2-angular-navigations";
import { BeforeOpenCloseMenuEventArgs, MenuEventArgs } from "@syncfusion/ej2-angular-splitbuttons";
import { formatUnit, createElement, closest } from '@syncfusion/ej2-base';
import { AppComponent } from "src/app/app.component";
import { DiagramClientSideEvents } from "./events";
import { SelectorViewModel } from "./selector";
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams'

export class PaperSize {
    public pageWidth: number|any;
    public pageHeight: number|any;
}

export class UtilityMethods {
    public static isOpen: boolean;
    public static selectedItem: SelectorViewModel;
    // private selectedItem:SelectorViewModel =  new SelectorViewModel();
    // constructor(selectedItem: SelectorViewModel) {
    //     this.selectedItem = selectedItem;
    // }
    //private diagramEvents:DiagramClientSideEvents = new DiagramClientSideEvents(this.selectedItem);
    public arrangeMenuBeforeClose(args: BeforeOpenCloseMenuEventArgs): void {
        if (args.event && closest(args.event.target as Element, '.e-dropdown-btn') !== null) {
            args.cancel = true;
        }
        if (!args.element) {
            args.cancel = true;
        }
    };
    public arrangeMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        (args.element.children[0] as HTMLElement).style.display = 'block';
        if (args.event && closest(args.event.target as Element, '.e-dropdown-btn') !== null) {
            args.cancel = true;
        }
    };
    public editContextMenuOpen(args: OpenCloseMenuEventArgs){
        if (args.element.classList.contains('e-menu-parent')) {
            let popup: HTMLElement = document.querySelector('#btnEditMenu-popup') as HTMLElement;
            args.element.style.left = formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
            args.element.style.top = formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
        }
    }
    public toolsContextMenuOpen(args: OpenCloseMenuEventArgs){
        if (args.element.classList.contains('e-menu-parent')) {
            var popup = document.querySelector('#btnToolsMenu-popup') as HTMLElement;
            args.element.style.left = formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
            args.element.style.top = formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
        }
    };
    public designContextMenuOpen(args: OpenCloseMenuEventArgs){
        if (args.element.classList.contains('e-menu-parent')) {
            var popup = document.querySelector('#btnDesignMenu-popup') as HTMLElement;
            args.element.style.left = formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
            args.element.style.top = formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
        }
    };
    public getShortCutKey(menuItem: string): string {
        let shortCutKey: string = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
        switch (menuItem) {
            case 'New':
                shortCutKey = 'Shift' + '+N';
                break;
            case 'Open':
                shortCutKey = shortCutKey + '+O';
                break;
            case 'Save':
                shortCutKey = shortCutKey + '+S';
                break;
            case 'Undo':
                shortCutKey = shortCutKey + '+Z';
                break;
            case 'Redo':
                shortCutKey = shortCutKey + '+Y';
                break;
            case 'Cut':
                shortCutKey = shortCutKey + '+X';
                break;
            case 'Copy':
                shortCutKey = shortCutKey + '+C';
                break;
            case 'Paste':
                shortCutKey = shortCutKey + '+V';
                break;
            case 'Delete':
                shortCutKey = 'Delete';
                break;
            // case 'Select All':
            //     shortCutKey = shortCutKey + '+A';
            //     break;
            case 'Zoom In':
                shortCutKey = shortCutKey + '++';
                break;
            case 'Zoom Out':
                shortCutKey = shortCutKey + '+-';
                break;
            default:
                shortCutKey = '';
                break;
        }
        return shortCutKey;
      }
      
      public flipObjects(flipType:string,diagram:Diagram){
        var selectedObjects = (diagram as any).selectedItems.nodes.concat(diagram.selectedItems.connectors);
        for(let i:number = 0;i<selectedObjects.length;i++)
        {
           selectedObjects[i].flip = flipType === 'Flip Horizontal'? 'Horizontal':'Vertical';
        }
        diagram.dataBind();
      };
    public removeSelectedToolbarItem(toolbarObj:Toolbar){
        for (let i:number = 0; i < toolbarObj.items.length; i++) {
            var item = toolbarObj.items[i];
            if ((item.cssClass as string).indexOf('tb-item-selected') !== -1) {
                item.cssClass = (item.cssClass as string).replace(' tb-item-selected', '');
            }
        }
        // toolbarObj.dataBind();
        // (document.getElementById('conTypeBtn') as HTMLButtonElement).classList.remove('tb-item-selected');
    };
    public onConnectorSelect(args: MenuEventArgs): void{
        let diagram = (document.getElementById('diagram') as any).ej2_instances[0];
        let toolbarObj = (document.getElementById('toolbarEditor') as any).ej2_instances[0];
        // let selected = new SelectorViewModel();
        // let toolbarObj = selected.toolbarObj;
        diagram.clearSelection();
        diagram.drawingObject.sourceID = '';
        diagram.drawingObject.type = args.item.text;
        diagram.tool = DiagramTools.ContinuousDraw;
        diagram.selectedItems.userHandles = [];
        diagram.dataBind();
        this.removeSelectedToolbarItem(toolbarObj);
        let c = (document.getElementById('conTypeBtn') as any)
        toolbarObj.items[5].cssClass+= ' tb-item-selected';
        // c.ej2_instances[0].cssClass +='tb-item-selected';
        // c.ej2_instances[1].cssClass +='tb-item-selected';
        c.classList.add('tb-item-selected');
    };
    public enableToolbarItems(selectedItems:Object[]): void{
        let toolbarContainer: HTMLDivElement = document.getElementsByClassName('db-toolbar-container')[0] as HTMLDivElement;
        let toolbarClassName: string = 'db-toolbar-container';
        if (toolbarContainer.classList.contains('db-undo')) {
            toolbarClassName += ' db-undo';
        }
        if (toolbarContainer.classList.contains('db-redo')) {
            toolbarClassName += ' db-redo';
        }
        toolbarContainer.className = toolbarClassName;
        if (selectedItems.length === 1) {
            toolbarContainer.className = toolbarContainer.className + ' db-select';
            if (selectedItems[0] instanceof Node) {
                if ((selectedItems[0] as Node).children) {
                    if ((selectedItems[0] as Node).children.length > 2) {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple db-node db-group';
                    } else {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-node db-group';
                    }
                } else {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                }
            }
        } else if (selectedItems.length === 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double';
        } else if (selectedItems.length > 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple';
        }
        if (selectedItems.length > 1) {
            let isNodeExist: boolean = false;
            for (let i: number = 0; i < selectedItems.length; i++) {
                if (selectedItems[i] instanceof Node) {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                    break;
                }
            }
        }
    };
    public zoomChange(args:ClickEventArgs){
        let diagram = (document.getElementById('diagram') as any).ej2_instances[0];
        var zoomCurrentValue = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
        var currentZoom = diagram.scrollSettings.currentZoom;
        var zoom: any = {};
        switch (args.item.text) {
            case 'Zoom In':
                diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
                zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'Zoom Out':
                diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
                zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'Zoom to Fit':
                diagram.fitToPage({ mode: 'Page', region: 'Content'});
                zoomCurrentValue.content = diagram.scrollSettings.currentZoom;
                break;
            case 'Zoom to 50%':
                zoom.zoomFactor = (0.5 / currentZoom) - 1;
                diagram.zoomTo(zoom);
                break;
            case 'Zoom to 100%':
                zoom.zoomFactor = (1 / currentZoom) - 1;
                diagram.zoomTo(zoom);
                break;
            case 'Zoom to 200%':
                zoom.zoomFactor = (2 / currentZoom) - 1;
                diagram.zoomTo(zoom);
                break;
        }
        zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom*100) + ' %';  
    };
   
    public lockObject(diagram:any){
        // this.selectedItem.isModified = true;
        //let diagram =  (document.getElementById('diagram') as any).ej2_instances[0];
        for (let i: number = 0; i < (diagram).selectedItems.nodes.length; i++) {
            let node: NodeModel = diagram.selectedItems.nodes[i];
            if ((node as Node).constraints & NodeConstraints.Drag) {
                node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select;
            } else {
                node.constraints = NodeConstraints.Default;
            }
        }
        for (let i: number = 0; i < diagram.selectedItems.connectors.length; i++) {
            let connector: ConnectorModel = diagram.selectedItems.connectors[i];
            if ((connector as Connector).constraints & ConnectorConstraints.Drag) {
                connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select;
            } else {
                connector.constraints = ConnectorConstraints.Default;
            }
        }
        diagram.dataBind();
    };
    public download(data: string, filename: string): void {
        let dataStr: string = data;
        if ((window.navigator as any).msSaveBlob) {
            let blob: Blob = new Blob([dataStr], { type: 'data:text/json;charset=utf-8,' });
            (window.navigator as any).msSaveOrOpenBlob(blob, filename + '.json');
        } else {
            dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(dataStr);
            let a: HTMLAnchorElement = document.createElement('a');
            a.href = dataStr;
            a.download = filename + '.json';
            document.body.appendChild(a);
            a.click();
        }
    };
   
    public getPaperSize(paperName:string){
        let paperSize: PaperSize = new PaperSize();
        switch (paperName) {
            case 'Letter':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1056;
                break;
            case 'Legal':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1344;
                break;
            case 'Tabloid':
                paperSize.pageWidth = 1056;
                paperSize.pageHeight = 1632;
                break;
            case 'A3':
                paperSize.pageWidth = 1122;
                paperSize.pageHeight = 1587;
                break;
            case 'A4':
                paperSize.pageWidth = 793;
                paperSize.pageHeight = 1122;
                break;
            case 'A5':
                paperSize.pageWidth = 559;
                paperSize.pageHeight = 793;
                break;
            case 'A6':
                paperSize.pageWidth = 396;
                paperSize.pageHeight = 559;
                break;
        }
        return paperSize;
    };
    public updateSelection(item:any){
        for(let i:number=0;i<item.parentObj.items.length;i++)
        {
            if(item.text === item.parentObj.items[i].text){
                item.parentObj.items[i].iconCss = 'sf-icon-check-tick';
            }
            else{
                item.parentObj.items[i].iconCss = '';
            }
        }
    };
    // public static openUploadBox(isOpen: boolean, extensionType: string): void {
    //     let defaultUpload: any = document.getElementById('defaultfileupload');
    //     defaultUpload = defaultUpload.ej2_instances[0];
    //     defaultUpload.clearAll();
    //     this.selectedItem.orgDataSettings.extensionType = defaultUpload.allowedExtensions = extensionType;
    //     defaultUpload.dataBind();
    //     this.isOpen = isOpen;
    //     (document.getElementsByClassName('e-file-select-wrap')[0].children[0] as HTMLButtonElement).click();
    // }
    public viewSelectionChange(diagram:Diagram){
    var items = (document.getElementById('btnViewMenu') as any).ej2_instances[0].items;
    items[4].iconCss = diagram.pageSettings.showPageBreaks ? 'sf-icon-check-tick':'';
    // items[5].iconCss = diagram.pageSettings.multiplePage ? 'sf-icon-check-tick':'';
    //let pageBreakChecks = (document.getElementById('showPageBreaks') as any);
    // pageBreakChecks.ownerDocument.activeElement.ej2_instances[0].checked = diagram.pageSettings.showPageBreaks ? true:false;
    //pageBgColor.value = UtilityMethods.prototype.getHexColor(diagram.pageSettings.background.color);
    }

    public bindNodeProperties(node: NodeModel, selectedItem: SelectorViewModel): void {
        selectedItem.preventPropertyChange = true;
        selectedItem.nodeProperties.offsetX = (Math.round(node.offsetX * 100) / 100);
        selectedItem.nodeProperties.offsetY = (Math.round(node.offsetY * 100) / 100);
        selectedItem.nodeProperties.width = node.width ? (Math.round(node.width * 100) / 100) : (Math.round(node.minWidth * 100) / 100);
        selectedItem.nodeProperties.height = node.height ? (Math.round(node.height * 100) / 100) : (Math.round(node.minHeight * 100) / 100);
        selectedItem.nodeProperties.rotateAngle = node.rotateAngle;
        selectedItem.nodeProperties.strokeColor = this.getHexColor(node.style.strokeColor);
        selectedItem.nodeProperties.strokeStyle = node.style.strokeDashArray ? node.style.strokeDashArray : '';
        selectedItem.nodeProperties.strokeWidth = node.style.strokeWidth;
        selectedItem.nodeProperties.fillColor = this.getHexColor(node.style.fill);
        selectedItem.nodeProperties.opacity = node.style.opacity * 100;
        selectedItem.nodeProperties.opacityText = selectedItem.nodeProperties.opacity + '%';
        let   aspectRatioBtn = (document.getElementById('aspectRatioBtn') as any).ej2_instances[0];
        node.constraints & NodeConstraints.AspectRatio ? document.getElementById('aspectRatioBtn').classList.add('e-active') : document.getElementById('aspectRatioBtn').classList.remove('e-active');
        node.constraints & NodeConstraints.AspectRatio ? aspectRatioBtn.iconCss = 'sf-icon-lock': aspectRatioBtn.iconCss = 'sf-icon-unlock';
        (selectedItem.nodeProperties.gradient)= node.style.gradient.type !== 'None' ? true : false;
         var gradientElement = document.getElementById('gradientStyle');
         var backgroundType = document.getElementById('backgroundTypeDropdown');
         (backgroundType as any).ej2_instances[0].index = 0;
             if ((selectedItem.nodeProperties.gradient)) {
                 gradientElement.className = 'row db-prop-row db-gradient-style-show';
                 selectedItem.nodeProperties.gradientColor = node.style.gradient.stops[1].color;
                 (backgroundType as any).ej2_instances[0].index = 1;
                 var gradient = node.style.gradient as DiagramGradient;
                 if (gradient.x1) {
                    selectedItem.nodeProperties.gradientDirection = 'North';
                 }
                 else if (gradient.x2) {
                    selectedItem.nodeProperties.gradientDirection  = 'East';
                 }
                 else if (gradient.y1) {
                    selectedItem.nodeProperties.gradientDirection  = 'West';
                 }
                 else if (gradient.y2) {
                    selectedItem.nodeProperties.gradientDirection = 'South';
                 }
             }
             else {
                 gradientElement.className = 'row db-prop-row db-gradient-style-hide';
                 selectedItem.nodeProperties.gradientColor = '#ffffff';
                 selectedItem.nodeProperties.gradientDirection = 'South';
             }
             selectedItem.preventPropertyChange = false;     
    };
    public bindConnectorProperties(connector: ConnectorModel, selectedItem: SelectorViewModel): void {
        selectedItem.preventPropertyChange = true;
        selectedItem.connectorProperties.lineColor = this.getHexColor(connector.style.strokeColor);
        selectedItem.connectorProperties.lineStyle = connector.style.strokeDashArray ? connector.style.strokeDashArray : '';
        selectedItem.connectorProperties.lineType = connector.type;
        selectedItem.connectorProperties.lineWidth = connector.style.strokeWidth;
        selectedItem.connectorProperties.sourceType = connector.sourceDecorator.shape;
        selectedItem.connectorProperties.targetType = connector.targetDecorator.shape;
        selectedItem.connectorProperties.opacity = connector.style.opacity * 100;
        selectedItem.connectorProperties.opacityText = selectedItem.connectorProperties.opacity + '%';
        selectedItem.connectorProperties.lineJumpSize = connector.bridgeSpace;
        selectedItem.connectorProperties.lineJump = connector.constraints & ConnectorConstraints.Bridging ? true : false;
        if (selectedItem.connectorProperties.lineJump) {
            document.getElementById('lineJumpSizeDiv').style.display = '';
        } else {
            document.getElementById('lineJumpSizeDiv').style.display = 'none';
        }
        selectedItem.connectorProperties.targetSize = connector.targetDecorator.width;
        selectedItem.connectorProperties.sourceSize = connector.sourceDecorator.width;
        selectedItem.preventPropertyChange = false;
    };
    public bindTextProperties(text: TextStyleModel, selectedItem: SelectorViewModel): void {
        selectedItem.preventPropertyChange = true;
        selectedItem.textProperties.fontColor = this.getHexColor(text.color);
        selectedItem.textProperties.fontFamily = text.fontFamily;
        selectedItem.textProperties.fontSize = text.fontSize;
        selectedItem.textProperties.opacity = text.opacity * 100;
        selectedItem.textProperties.opacityText = selectedItem.textProperties.opacity + '%';
        let toolbarTextStyle: any = document.getElementById('toolbarTextStyle');
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            toolbarTextStyle.items[0].cssClass = text.bold ? 'tb-item-start tb-item-selected' : 'tb-item-start';
            toolbarTextStyle.items[1].cssClass = text.italic ? 'tb-item-middle tb-item-selected' : 'tb-item-middle';
            toolbarTextStyle.items[2].cssClass = text.textDecoration === 'Underline' ? 'tb-item-end tb-item-selected' : 'tb-item-end';
        }
        this.updateTextAlign(text.textAlign);
        selectedItem.preventPropertyChange = false;
    };
    
    public getPosition(offset: PointModel): string {
        if (offset.x === 0 && offset.y === 0) {
            return 'TopLeft';
        } else if (offset.x === 0.5 && offset.y === 0) {
            return 'TopCenter';
        } else if (offset.x === 1 && offset.y === 0) {
            return 'TopRight';
        } else if (offset.x === 0 && offset.y === 0.5) {
            return 'MiddleLeft';
        } else if (offset.x === 1 && offset.y === 0.5) {
            return 'MiddleRight';
        } else if (offset.x === 0 && offset.y === 1) {
            return 'BottomLeft';
        } else if (offset.x === 0.5 && offset.y === 1) {
            return 'BottomCenter';
        } else if (offset.x === 1 && offset.y === 1) {
            return 'BottomRight';
        } else {
            return 'Center';
        }
    }
    public getHexColor(colorStr: string): string {
        let a: HTMLDivElement = document.createElement('div');
        a.style.color = colorStr;
        let colors: number[] = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(
            (a: string): number => {
                return parseInt(a, 10);
            }
        );
        document.body.removeChild(a);
        return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : '';
    };
    
    public getOffset(position: string): PointModel {
        switch (position.toLowerCase()) {
            case 'topleft':
                return { x: 0, y: 0 };
            case 'topcenter':
                return { x: 0.5, y: 0 };
            case 'topright':
                return { x: 1, y: 0 };
            case 'middleleft':
                return { x: 0, y: 0.5 };
            default:
                return { x: 0.5, y: 0.5 };
            case 'middleright':
                return { x: 1, y: 0.5 };
            case 'bottomleft':
                return { x: 0, y: 1 };
            case 'bottomcenter':
                return { x: 0.5, y: 1 };
            case 'bottomright':
                return { x: 1, y: 1 };
        }
    };
    public updateHorVertAlign(horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment): void{
        this.updateHorAlign(horizontalAlignment);
        this.updateVerAlign(verticalAlignment);
    };
    public updateHorAlign(horizontalAlignment: HorizontalAlignment){
        var toolbarHorAlignment:any = document.getElementById('toolbarTextAlignmentLeft');
        if (toolbarHorAlignment) {
            toolbarHorAlignment = toolbarHorAlignment.ej2_instances[0];
        }
        if (toolbarHorAlignment) {
            for (var i = 0; i < toolbarHorAlignment.items.length; i++) {
                toolbarHorAlignment.items[i].cssClass = toolbarHorAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            var index = horizontalAlignment === 'Right' ? 0 : (horizontalAlignment === 'Center' ? 1 : 2);
            toolbarHorAlignment.items[index].cssClass = toolbarHorAlignment.items[index].cssClass + ' tb-item-selected';
        }
    };
    public updateVerAlign(verticalAlignment:VerticalAlignment){
        var toolbarVerAlignment:any = document.getElementById('toolbarTextAlignmentTop');
        if (toolbarVerAlignment) {
            toolbarVerAlignment = toolbarVerAlignment.ej2_instances[0];
        }
        if (toolbarVerAlignment) {
            for (var i = 0; i < toolbarVerAlignment.items.length; i++) {
                toolbarVerAlignment.items[i].cssClass = toolbarVerAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            var index = verticalAlignment === 'Bottom' ? 0 : (verticalAlignment === 'Center' ? 1 : 2);
            toolbarVerAlignment.items[index].cssClass = toolbarVerAlignment.items[index].cssClass + ' tb-item-selected';
        }
    };
    public updateTextAlign(textAlign: TextAlign): void{
        let toolbarTextSubAlignment: any = document.getElementById('toolbarTextSubAlignment');
        if (toolbarTextSubAlignment) {
            toolbarTextSubAlignment = toolbarTextSubAlignment.ej2_instances[0];
        }
        if (toolbarTextSubAlignment) {
            for (let i: number = 0; i < toolbarTextSubAlignment.items.length; i++) {
                toolbarTextSubAlignment.items[i].cssClass = toolbarTextSubAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            let index: number = textAlign === 'Left' ? 0 : (textAlign === 'Center' ? 1 : 2)
            toolbarTextSubAlignment.items[index].cssClass = toolbarTextSubAlignment.items[index].cssClass + ' tb-item-selected';
        }
    };

    public hideElements(elementType: string, diagram?: Diagram): void {
        var diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
        if (diagramContainer.classList.contains(elementType)) {
                diagramContainer.classList.remove(elementType);
                ((document.getElementById('hideProperty') as any).style.backgroundColor as any) = '';
                ((document.getElementById('hideProperty') as any).style.color as any) = '#fff';
                (document.getElementById('hideProperty') as any).ej2_instances[0].isPrimary = true;
        }
        else {
            diagramContainer.classList.add(elementType);
            ((document.getElementById('hideProperty') as any).style.backgroundColor as any) = '#e3e3e3';
            ((document.getElementById('hideProperty') as any).style.color as any) = 'black';
            (document.getElementById('hideProperty') as any).ej2_instances[0].isPrimary = false;

            // hidePropertyBtn.isPrimary = false;
        }
        if (diagram) {
            diagram.updateViewPort();
        }
    };
    public updateContextMenuSelection(boolean:boolean,args:DiagramBeforeMenuOpenEventArgs,diagram:Diagram){
        if(diagram.selectedItems.nodes.length>0)
        {
            var bpmnNode = diagram.selectedItems.nodes[0];
            var checked = boolean;
            if(((bpmnNode.shape as BpmnShapeModel) as BpmnShapeModel).shape === 'Gateway')
            {
                if(!args.parentItem){
                    for(let i:number = 0;i<args.items[21].items.length;i++)
                    {
                        if(((bpmnNode.shape as BpmnShapeModel).gateway.type === args.items[21].items[i].text || (bpmnNode.shape as BpmnShapeModel).gateway.type === args.items[21].items[i].id) || !checked)
                        {
                            this.addTick(args,21,checked,i);
                        }
                    }
                }
            }
            else if((bpmnNode.shape as BpmnShapeModel).shape === 'Activity')
            {
                if(!args.parentItem)
                {
                    if((bpmnNode.shape as BpmnShapeModel).activity.activity === 'Task')
                    {
                        for(let i:number = 0;i<args.items[13].items.length;i++)
                        {
                            if((bpmnNode.shape as BpmnShapeModel).activity.activity === args.items[13].items[i].id || ! checked)
                            {
                                this.addTick(args,13,checked,i);
                            }
                        }
                        for(let i:number = 0 ;i<args.items[20].items.length;i++){
                            if((bpmnNode.shape as BpmnShapeModel).activity.task.type === args.items[20].items[i].id || !checked )
                            {
                                this.addTick(args,20,checked,i);
                            } 
                        }
                        if((bpmnNode.shape as BpmnShapeModel).activity.task.call)
                        {
                            this.singleItemTick(args,17,true);
                        }
                        else{
                            this.singleItemTick(args,17,false);
                        }
                        for(let i:number = 0;i<args.items[11].items.length;i++)
                        {
                            if(((bpmnNode.shape as BpmnShapeModel).activity.task.loop === args.items[11].items[i].text || (bpmnNode.shape as BpmnShapeModel).activity.task.loop === args.items[11].items[i].id )|| ! checked)
                            {
                                this.addTick(args,11,checked,i);
                            }
                        }
                        if((bpmnNode.shape as BpmnShapeModel).activity.task.compensation)
                        {
                            this.singleItemTick(args,12,true);
                        }
                        else{
                            this.singleItemTick(args,12,false);
                        }
                    }
                    else if((bpmnNode.shape as BpmnShapeModel).activity.activity === 'SubProcess'){
                        for(let i:number = 0;i<args.items[13].items.length;i++)
                        {
                            if((bpmnNode.shape as BpmnShapeModel).activity.activity === args.items[13].items[i].id || ! checked)
                            {
                                this.addTick(args,13,checked,i);
                            }
                        }
                        for(let i:number = 0;i<args.items[11].items.length;i++)
                        {
                            if(((bpmnNode.shape as BpmnShapeModel).activity.subProcess.loop === args.items[11].items[i].text || (bpmnNode.shape as BpmnShapeModel).activity.subProcess.loop === args.items[11].items[i].id )|| ! checked)
                            {
                               this.addTick(args,11,checked,i);
                            }
                        }
                        for(let i:number = 0;i<args.items[14].items.length;i++)
                        {
                            if(((bpmnNode.shape as BpmnShapeModel).activity.subProcess.boundary === args.items[14].items[i].text || (bpmnNode.shape as BpmnShapeModel).activity.subProcess.boundary === args.items[14].items[i].id )|| ! checked)
                            {
                                this.addTick(args,14,checked,i);
                            }
                        }
                        if((bpmnNode.shape as BpmnShapeModel).activity.subProcess.compensation)
                        {
                            this.singleItemTick(args,12,true);
                        }
                        else{
                            this.singleItemTick(args,12,false);
                        }
                        if((bpmnNode.shape as BpmnShapeModel).activity.subProcess.adhoc)
                        {
                            this.singleItemTick(args,10,true);
                        }
                        else{
                            this.singleItemTick(args,10,false);
                        }
                    }
                }
            }
            else if((bpmnNode.shape as BpmnShapeModel).shape === 'Event')
            {
                if(!args.parentItem)
                {
                    for(let i:number = 0;i<args.items[19].items.length;i++){
                        if(((bpmnNode.shape as BpmnShapeModel).event.event === args.items[19].items[i].text || (bpmnNode.shape as BpmnShapeModel).event.event === args.items[19].items[i].id) || !checked)
                        {
                            this.addTick(args,19,checked,i);
                        }
                    }
                    for(let i:number = 0;i<args.items[18].items.length;i++){
                        if((bpmnNode.shape as BpmnShapeModel).event.trigger === args.items[18].items[i].text || !checked)
                        {
                            this.addTick(args,18,checked,i);
                        }
                    }
                }
            }
            else if((bpmnNode.shape as BpmnShapeModel).shape === 'DataObject')
            {
                if(!args.parentItem)
                {
                    for(let i:number = 0;i<args.items[15].items.length;i++){
                        if((bpmnNode.shape as BpmnShapeModel).dataObject.type === args.items[15].items[i].text || !checked)
                        {
                            this.addTick(args,15,checked,i);
                        }
                    }
                    if((bpmnNode.shape as BpmnShapeModel).dataObject.collection)
                    {
                        this.singleItemTick(args,16,true);
                    }
                    else{
                        this.singleItemTick(args,16,false);
                    }
                }
            }
        }
        if(diagram.selectedItems.connectors.length>0)
        {
            var bpmnConnector = diagram.selectedItems.connectors[0];
            var checked = boolean;
            if(((bpmnConnector.shape as BpmnFlow) as BpmnFlow).type === 'Bpmn'){
                if((bpmnConnector.shape as BpmnFlow).flow === 'Association')
                {
                    if(!args.parentItem){
                        for(let i:number = 0;i<args.items[9].items.length;i++){
                            if(((bpmnConnector.shape as BpmnFlow).association === args.items[9].items[i].id || (bpmnConnector.shape as BpmnFlow).association === args.items[9].items[i].text ) || !checked)
                            {
                                this.addTick(args,9,checked,i);
                            }
                        }
                        this.singleItemTick(args,5,true);
                        this.singleItemTick(args,6,false);
                        this.singleItemTick(args,7,false);
                    }
                }
                if((bpmnConnector.shape as BpmnFlow).flow === 'Sequence')
                {
                    if(!args.parentItem){
                        for(let i:number = 0;i<args.items[8].items.length;i++){
                            if(((bpmnConnector.shape as BpmnFlow).sequence === args.items[8].items[i].text || (bpmnConnector.shape as BpmnFlow).sequence ===  args.items[8].items[i].id) || !checked)
                            {
                                this.addTick(args,8,checked,i);
                            }
                        }
                        this.singleItemTick(args,5,false);
                        this.singleItemTick(args,6,true);
                        this.singleItemTick(args,7,false);
                    }
                }
                if((bpmnConnector.shape as BpmnFlow).flow === 'Message')
                {
                    if(!args.parentItem){
                        for(let i:number = 0;i<args.items[22].items.length;i++){
                            if(((bpmnConnector.shape as BpmnFlow).message === args.items[22].items[i].text || (bpmnConnector.shape as BpmnFlow).message === args.items[22].items[i].id) || !checked)
                            {
                                this.addTick(args,22,checked,i);
                            }
                        }
                        this.singleItemTick(args,5,false);
                        this.singleItemTick(args,6,false);
                        this.singleItemTick(args,7,true);
                    }
                }
            }
        }
        
    };
    public addTick(args:BeforeOpenCloseMenuEventArgs,index:number,checked:boolean,i:number){
        if(checked){
            if( (args.items[index] as any).items[i].iconCss.indexOf('sf-icon-check-tick') === -1){
                (args.items[index] as any).items[i].iconCss+=' sf-icon-check-tick';
            }
        }
        else{
            if( (args.items[index] as any).items[i].iconCss.indexOf('sf-icon-check-tick') !== -1){
                (args.items[index] as any).items[i].iconCss = (args.items[index] as any).items[i].iconCss.replace(' sf-icon-check-tick','');
            }
        }
    };
    public singleItemTick(args:BeforeOpenCloseMenuEventArgs,index:number,boolean:boolean){
        if(boolean)
        {
            if( args.items[index].iconCss.indexOf('sf-icon-check-tick') === -1){
                args.items[index].iconCss+=' sf-icon-check-tick';
            }
        }
        else{
            if( args.items[index].iconCss.indexOf('sf-icon-check-tick') !== -1){
                args.items[index].iconCss = args.items[index].iconCss.replace(' sf-icon-check-tick','');
            }
        }
    };
    public aspectClick(selectedItem:SelectorViewModel){
        var isAspect = true;
     let   aspectRatioBtn = (document.getElementById('aspectRatioBtn') as any).ej2_instances[0];
    if(document.getElementById('aspectRatioBtn').classList.contains('e-active'))
    {
        document.getElementById('aspectRatioBtn').classList.remove('e-active');
        isAspect = false;
        aspectRatioBtn.iconCss =  'sf-icon-unlock'
        
    }
    else{
        document.getElementById('aspectRatioBtn').classList.remove('e-active');
        isAspect = true;
        aspectRatioBtn.iconCss = 'sf-icon-lock';
    }
        selectedItem.nodePropertyChange({propertyName: 'aspectRatio', propertyValue: isAspect}); 
    };

    public fileName(){
        return document.getElementById('diagramName').innerHTML;
    }

}