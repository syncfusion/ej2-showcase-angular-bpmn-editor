import { AnnotationAlignment, BpmnActivity, BpmnBoundary, BpmnDataObjects, BpmnEvents, BpmnFlow, BpmnGateway, BpmnGateways, BpmnLoops, BpmnShapeModel, BpmnTasks, BpmnTriggers, Connector, ConnectorModel, ContextMenuItemModel, Diagram, DiagramBeforeMenuOpenEventArgs, HorizontalAlignment, IDragEnterEventArgs, IEndChangeEventArgs, IHistoryChangeArgs, IRotationEventArgs, ISelectionChangeEventArgs, ISizeChangeEventArgs, NodeModel,  PathAnnotationModel,  SelectorModel,  ShapeAnnotationModel, TextAlign, TextStyleModel, UserHandleEventsArgs, UserHandleModel, VerticalAlignment } from "@syncfusion/ej2-angular-diagrams";
import { PathAnnotation,ShapeAnnotation ,SelectorConstraints} from '@syncfusion/ej2-diagrams'
import { AppComponent } from "src/app/app.component";
import { NodeProperties, SelectorViewModel } from "./selector";
import { UtilityMethods } from "./utilitymethods";
import { ChangeArgs as ButtonChangeArgs , ChangeEventArgs as CheckBoxChangeEventArgs,} from '@syncfusion/ej2-buttons'
import { ChangeEventArgs as NumericChangeEventArgs} from '@syncfusion/ej2-inputs';
import { ColorPickerEventArgs } from "@syncfusion/ej2-angular-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-angular-dropdowns";
import { ChangeEventArgs as DropDownChangeEventArgs } from "@syncfusion/ej2-dropdowns"
import { ClickEventArgs as ToolbarClickEventArgs } from "@syncfusion/ej2-navigations"
import { MenuEventArgs } from "@syncfusion/ej2-angular-navigations";


export class DiagramClientSideEvents {
    
    private selectedItem: SelectorViewModel;
    public ddlTextPosition: DropDownListComponent;
    constructor(selectedItem: SelectorViewModel) {
        this.selectedItem = selectedItem;
        
    }

    // public diagram = (document.getElementById('diagram') as any).ej2_instances[0];
    // public toolbarObj = (document.getElementById('toolbarEditor') as any).ej2_instances[0];
    public drawingNode:any;
    public handles = [
        {
            name: 'Clone', pathData: 'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',
            tooltip:{content:'Clone'},
            visible: true, offset: 1, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
        },
        {
            name: 'Delete', pathData: 'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',
            tooltip:{content:'Delete'},
            visible: true, offset: 0, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
        },
        {
            name: 'Draw', pathData: 'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z',
            tooltip:{content:'Draw'},
            visible: true, offset: 0.5, side: 'Right', margin: { top: 0, bottom: 0, left: 0, right: 0 }
        },
    ];
    public selectionChange(args: ISelectionChangeEventArgs): void{
        if(args.state === 'Changed'){
            let diagram = this.selectedItem.diagram;
            let toolbarObj = this.selectedItem.toolbarObj;
            // let diagram = (document.getElementById('diagram') as any).ej2_instances[0];
            // let toolbarObj = (document.getElementById('toolbarEditor') as any).ej2_instances[0];
            var multiSelect;
            var selectedItems = diagram.selectedItems.nodes;
            selectedItems = selectedItems.concat(diagram.selectedItems.connectors as Object[]);
            this.selectedItem.utilityMethods.enableToolbarItems(selectedItems);
            var nodeContainer = document.getElementById('nodePropertyContainer');
            nodeContainer.classList.remove('multiple');
            nodeContainer.classList.remove('connector');
            if (selectedItems.length > 1) {
                multiSelect = true;
                this.multipleSelectionSettings(selectedItems as Object[]);
                    toolbarObj.items[7].tooltipText = 'Group';
                    toolbarObj.items[7].prefixIcon = 'sf-icon-group';
                for(var i =7;i<=25;i++){
                    toolbarObj.items[i].visible = true;
                } 
            }
            else if (selectedItems.length === 1) {
                multiSelect = false;
                
                this.singleSelectionSettings(selectedItems[0] as Object[]);
                for(var i=7;i<=25;i++){
                    if(i<=16)
                    {
                        toolbarObj.items[i].visible = false;
                    }
                    else{
                        toolbarObj.items[i].visible = true;

                    }
                }
                if(selectedItems[0].children && selectedItems[0].children.length>0)
                {
                    toolbarObj.items[7].tooltipText = 'UnGroup';
                    toolbarObj.items[7].prefixIcon = 'sf-icon-ungroup';
                    toolbarObj.items[7].visible = true;
                }
            }
            else {
                this.objectTypeChange('diagram');
                for(var i =7;i<=25;i++){
                    toolbarObj.items[i].visible = false;
                } 
            }
            if(args.newValue.length>0 && (args.newValue[0] as Connector).type === undefined){
                diagram.selectedItems = { constraints: SelectorConstraints.All|SelectorConstraints.UserHandle, userHandles: this.handles as UserHandleModel[] };
                if(diagram.selectedItems.nodes.length>0){
                    this.drawingNode = diagram.selectedItems.nodes[diagram.selectedItems.nodes.length-1];
                }
            }
            else{
            diagram.selectedItems = { constraints:SelectorConstraints.All&~SelectorConstraints.UserHandle };
            }
        } 
    };
    public multipleSelectionSettings(selectedItems:Object[]): void{
        this.objectTypeChange('None');
        let showConnectorPanel: boolean = false, showNodePanel: boolean = false;
        let showTextPanel: boolean = false, showConTextPanel: boolean = false;
        let nodeContainer: HTMLElement = document.getElementById('nodePropertyContainer');
        for (let i: number = 0; i < selectedItems.length; i++) {
            let object: Object = selectedItems[i];
            if ((object as ConnectorModel).type === undefined && (!showNodePanel || !showTextPanel)) {
                showNodePanel = true;
                showTextPanel = (object as NodeModel).annotations.length > 0 &&  (object as NodeModel).annotations[0].content ? true : false;
            } else if ((object as ConnectorModel).type !== undefined && (!showConnectorPanel || !showConTextPanel)) {
                showConnectorPanel = true;
                showConTextPanel = (object as ConnectorModel).annotations.length > 0 && (object as ConnectorModel).annotations[0].content ? true : false;
            }
        }
        let selectItem1: SelectorModel = this.selectedItem.diagram.selectedItems;
        if (showNodePanel) {
            nodeContainer.style.display = '';
            nodeContainer.classList.add('multiple');
            if (showConnectorPanel) {
                nodeContainer.classList.add('connector');
            }
            this.selectedItem.utilityMethods.bindNodeProperties(selectItem1.nodes[0], this.selectedItem);
        }
        if (showConnectorPanel && !showNodePanel) {
            document.getElementById('connectorPropertyContainer').style.display = '';
            this.selectedItem.utilityMethods.bindConnectorProperties(selectItem1.connectors[0], this.selectedItem);
        }
        if (showTextPanel || showConTextPanel) {
            document.getElementById('textPropertyContainer').style.display = '';
            if (showTextPanel && showConTextPanel) {
                document.getElementById('textPositionDiv').style.display = 'none';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            } else {
                document.getElementById('textPositionDiv').style.display = '';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
                if (showConTextPanel) {
                    this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getConnectorTextPositions();
                    //this.selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, this.selectedItem);
                } else {
                    this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getNodeTextPositions();
                    //this.selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, this.selectedItem);
                }
                this.ddlTextPosition.dataBind();
            }
        }
    };
    public singleSelectionSettings(selectedObject:Object): void {
        let object: NodeModel | ConnectorModel = null;
        if ((selectedObject as Connector).type === undefined) {
            this.objectTypeChange('node');
            object = selectedObject as NodeModel;
            this.selectedItem.utilityMethods.bindNodeProperties(object, this.selectedItem);
        } else  {
            this.objectTypeChange('connector');
            object = selectedObject as ConnectorModel;
            this.selectedItem.utilityMethods.bindConnectorProperties(object, this.selectedItem);
        }
        if (object.shape && object.shape.type === 'Text') {
            document.getElementById('textPropertyContainer').style.display = '';
            document.getElementById('toolbarTextAlignmentDiv').style.display = 'none';
            document.getElementById('textPositionDiv').style.display = 'none';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            // this.selectedItem.utilityMethods.bindTextProperties(object.style, this.selectedItem);
        } else if (object.annotations.length > 0 && object.annotations[0].content) {
            document.getElementById('textPropertyContainer').style.display = '';
            let annotation: ShapeAnnotation | PathAnnotation = null;
            document.getElementById('toolbarTextAlignmentDiv').style.display = '';
            document.getElementById('textPositionDiv').style.display = '';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
            this.selectedItem.utilityMethods.bindTextProperties(object.annotations[0].style, this.selectedItem);
            this.selectedItem.utilityMethods.updateHorVertAlign(object.annotations[0].horizontalAlignment, object.annotations[0].verticalAlignment);
            if (object.annotations[0] instanceof ShapeAnnotation) {
                annotation = object.annotations[0] as ShapeAnnotation;
                this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getNodeTextPositions();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition = null;
                this.ddlTextPosition.dataBind();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition = this.selectedItem.utilityMethods.getPosition(annotation.offset);
                this.ddlTextPosition.dataBind();
            } else if (object.annotations[0] instanceof PathAnnotation) {
                annotation = object.annotations[0] as PathAnnotation;
                this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getConnectorTextPositions();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition = null;
                this.ddlTextPosition.dataBind();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition = annotation.alignment;
                this.ddlTextPosition.dataBind();
            }
        }

    };
    public sizeChange(args:ISizeChangeEventArgs){
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.width = (Math.round(args.newValue.width * 100) / 100);
        this.selectedItem.nodeProperties.height = (Math.round(args.newValue.height * 100) / 100);
        if (args.state === 'Completed') {
            this.selectedItem.isModified = true;
            this.selectedItem.preventPropertyChange = false;
        }
    };
    public rotateChange(args:IRotationEventArgs){
        let diagram = this.selectedItem.diagram;
        this.selectedItem.preventPropertyChange = true;
        if(args.state === 'Start' || args.state === 'Progress')
        {
            diagram.selectedItems = { constraints: SelectorConstraints.None};
        }
        if(args.state === 'Completed'){
            diagram.selectedItems = { constraints: SelectorConstraints.All|SelectorConstraints.UserHandle, userHandles: this.handles as UserHandleModel[] };
            this.selectedItem.isModified = true;
            this.selectedItem.preventPropertyChange = false;
        }
        if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors as object).length===1){
           this.selectedItem.nodeProperties.rotateAngle = args.newValue?args.newValue.rotateAngle:diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors as object)[0].rotateAngle;
        }
    };
    public positionChange(args:any){
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.offsetX = (Math.round(args.newValue.offsetX * 100) / 100);
        this.selectedItem.nodeProperties.offsetY = (Math.round(args.newValue.offsetY * 100) / 100);
            if (args.state === 'Completed') {
                this.selectedItem.isModified = true;
                this.selectedItem.preventPropertyChange = false;
            }
    };
    public collectionChange(args: ISelectionChangeEventArgs): void {
        if (args.state === 'Changed') {
            this.selectedItem.isModified = true;
        }
    }
    public dragEnter(args: IDragEnterEventArgs){
        if((args.element as ConnectorModel).type === 'Straight')
        {
            if((args.element as ConnectorModel).sourceDecorator && args.element.style.strokeDashArray === '4 4'){
                (args.element.shape ) = {
                    type: 'Bpmn',
                    flow: 'Message',
                    message: 'Default'
                        } as BpmnFlow
            }  
        }
        else if(((args.element.shape as BpmnShapeModel) as BpmnShapeModel).shape === 'Activity')
        {
            if((args.element.shape as BpmnShapeModel).activity.activity === 'Task')
            {
                (args.element as NodeModel).width = 96; (args.element as NodeModel).height = 72;
            }
            else if((args.element.shape as BpmnShapeModel).activity.activity === 'SubProcess')
            {
                if((args.element.shape as BpmnShapeModel).activity.subProcess.collapsed)
                {
                    (args.element as NodeModel).width = 96; (args.element as NodeModel).height = 72;
                }
                else{
                    (args.element as NodeModel).width = 576; (args.element as NodeModel).height = 384;
                }
            }
        }
        else if((args.element.shape as BpmnShapeModel).shape === 'Event')
        {
            (args.element as NodeModel).width = 50; (args.element as NodeModel).height = 50;
        }
        else if((args.element.shape as BpmnShapeModel).shape === 'Gateway')
        {
            (args.element as NodeModel).width = 60; (args.element as NodeModel).height = 60;
        }
        else if((args.element.shape as BpmnShapeModel).shape === 'Message')
        {
            (args.element as NodeModel).width = 72; (args.element as NodeModel).height = 48;
        }
        else if((args.element.shape as BpmnShapeModel).shape === 'DataObject')
        {
            (args.element as NodeModel).width = 48; (args.element as NodeModel).height = 63;
        }
        else if((args.element.shape as BpmnShapeModel).shape === 'DataSource')
        {
            (args.element as NodeModel).width = 96; (args.element as NodeModel).height = 72;
        }
    }
    public objectTypeChange(objectType:string): void{
        document.getElementById('diagramPropertyContainer').style.display = 'none';
        document.getElementById('nodePropertyContainer').style.display = 'none';
        document.getElementById('textPropertyContainer').style.display = 'none';
        document.getElementById('connectorPropertyContainer').style.display = 'none';
        switch (objectType) {
            case 'diagram':
                document.getElementById('diagramPropertyContainer').style.display = '';
                break;
            case 'node':
                document.getElementById('nodePropertyContainer').style.display = '';
                break;
            case 'connector':
                 document.getElementById('connectorPropertyContainer').style.display = '';
                break;
        }
    };
    public historyChange(){
        // let diagram = (document.getElementById('diagram') as any).ej2_instances[0];
        let diagram = this.selectedItem.diagram;
        let toolbarContainer: HTMLDivElement = document.getElementsByClassName('db-toolbar-container')[0] as HTMLDivElement;
        toolbarContainer.classList.remove('db-undo');
        toolbarContainer.classList.remove('db-redo');
        if (diagram.historyManager.undoStack.length > 0) {
            toolbarContainer.classList.add('db-undo');
        }
        if (diagram.historyManager.redoStack.length > 0) {
            toolbarContainer.classList.add('db-redo');
        }
        this.selectedItem.utilityMethods.viewSelectionChange(diagram)
    };
    public userHandleClick(args:UserHandleEventsArgs){
        switch(args.element.name)
        {
            case 'Delete':
                this.selectedItem.diagram.remove();
                break;
            case 'Clone':
                this.selectedItem.diagram.paste( this.selectedItem.diagram.selectedItems.selectedObjects);
               break;
            case 'Draw':
                this.selectedItem.diagram.drawingObject.shape = {};
                (this.selectedItem.diagram.drawingObject as Connector).type =  (this.selectedItem.diagram.drawingObject as Connector).type? (this.selectedItem.diagram.drawingObject as Connector).type:'Orthogonal';
                (this.selectedItem.diagram.drawingObject as Connector).sourceID = this.drawingNode.id;
                this.selectedItem.diagram.dataBind();
                break;
        }
    };
    public contextMenuOpen(args: DiagramBeforeMenuOpenEventArgs) {
        let diagram = this.selectedItem.diagram;
        this.selectedItem.utilityMethods.updateContextMenuSelection(false,args,diagram);
        var hiddenId:string[] = [];
        if (args.element.className !== 'e-menu-parent e-ul ') {
            hiddenId = ['Adhoc', 'Loop', 'taskCompensation', 'Activity-Type', 'Boundary', 'DataObject',
                'collection', 'DeftCall', 'TriggerResult', 'EventType', 'TaskType', 'GateWay','Copy','Paste','Cut','SelectAll','Delete',
            'Association','Sequence','MessageFlow','Condition type','Direction','MessageType'];
        }
        for (var i = 0; i < args.items.length; i++) {
            if(args.items[i].text === 'Paste')
            {
                if(diagram.commandHandler.clipboardData.pasteIndex !== undefined
                    && diagram.commandHandler.clipboardData.clipObject !==undefined){
                        hiddenId.splice(hiddenId.indexOf(args.items[i].id), 1);
                        
                    }
            }
            if(args.items[i].text === 'Select All')
            {
                if((diagram.nodes.length || diagram.connectors.length))
                {
                    hiddenId.splice(hiddenId.indexOf(args.items[i].id), 1);
                }
            }
            if (diagram.selectedItems.nodes.length || diagram.selectedItems.connectors.length) {
                
                    var item = args.items[i];
                    if(diagram.selectedItems.nodes.length< 1 && diagram.selectedItems.connectors.length)
                    {
                        if((diagram.selectedItems.connectors[0].shape as BpmnFlow) && (diagram.selectedItems.connectors[0].shape as BpmnFlow).type === 'Bpmn')
                        {
                            if(item.text === 'Association' && ((diagram.selectedItems.connectors[0].shape as BpmnFlow) as BpmnFlow).flow === 'Association')
                            {
                                hiddenId.splice(hiddenId.indexOf('Sequence'), 1);
                                hiddenId.splice(hiddenId.indexOf('MessageFlow'), 1);
                                hiddenId.splice(hiddenId.indexOf('Association'), 1);
                                hiddenId.splice(hiddenId.indexOf('Direction'), 1);
                            }
                            else if(item.text === 'Sequence' && ((diagram.selectedItems.connectors[0].shape as BpmnFlow) as BpmnFlow).flow === 'Sequence')
                            {
                                hiddenId.splice(hiddenId.indexOf('Association'), 1);
                                hiddenId.splice(hiddenId.indexOf('MessageFlow'), 1);
                                hiddenId.splice(hiddenId.indexOf('Sequence'), 1);
                                hiddenId.splice(hiddenId.indexOf('Condition type'), 1);
                            }
                            else if(item.text === 'Message Flow' && ((diagram.selectedItems.connectors[0].shape as BpmnFlow) as BpmnFlow).flow === 'Message')
                            {
                                hiddenId.splice(hiddenId.indexOf('Association'), 1);
                                hiddenId.splice(hiddenId.indexOf('Sequence'), 1);
                                hiddenId.splice(hiddenId.indexOf('MessageFlow'), 1);
                                hiddenId.splice(hiddenId.indexOf('MessageType'), 1);
                            }
                        }
                    }
                    
                    if(item.text === 'Cut' || item.text === 'Copy' || item.text === 'Delete')
                        {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }    
    
                    if(diagram.selectedItems.nodes.length){
                    let bpmnShape: BpmnShapeModel = diagram.selectedItems.nodes[0].shape as BpmnShapeModel;
                    if(bpmnShape.type !== 'Text'){
                    if (bpmnShape.shape !== 'DataObject' && bpmnShape.shape !== 'Gateway') {
                        if (item.text === 'Ad-Hoc') {
                            if (bpmnShape.activity.activity === 'SubProcess') {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'Loop' || item.text === 'Compensation') {
                            if (bpmnShape.shape === 'Activity') {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'Activity-Type') {
                            if (bpmnShape.shape === 'Activity' && (bpmnShape.activity.activity === 'Task' || (bpmnShape.activity.activity === 'SubProcess' && bpmnShape.activity.subProcess.collapsed))) {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'Boundary') {
                            if ((bpmnShape.activity.activity === 'SubProcess')) {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                    }
                    if (item.text === 'Data Object') {
                        if ((bpmnShape.shape === 'DataObject')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Collection') {
                        if ((bpmnShape.shape === 'DataObject')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Task Call') {
                        if ((bpmnShape.shape === 'Activity') &&
                            (bpmnShape.activity.activity === 'Task')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Trigger Result') {
                        if ((bpmnShape.shape === 'Event')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Event Type') {
                        if ((bpmnShape.shape === 'Event')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Task Type') {
                        if ((bpmnShape.shape === 'Activity') &&
                            (bpmnShape.activity.activity === 'Task')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'GateWay') {
                        if ((bpmnShape.shape === 'Gateway')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                }
            }
            }
        }
        this.selectedItem.utilityMethods.updateContextMenuSelection(true,args,diagram);
        args.hiddenItems = hiddenId;
        diagram.dataBind();
    };

    public contextMenuClick(args:MenuEventArgs){
        let diagram = this.selectedItem.diagram;
        if (diagram.selectedItems.nodes.length > 0 ) {
            var bpmnShape:BpmnShapeModel = diagram.selectedItems.nodes[0].shape as BpmnShapeModel;
            if (args.item.iconCss.indexOf('e-adhocs') > -1) {
                bpmnShape.activity.subProcess.adhoc = !bpmnShape.activity.subProcess.adhoc;
            }
            if (args.item.iconCss.indexOf("e-event") > -1) {
                bpmnShape.event.event = args.item.id as BpmnEvents;
            }
            if (args.item.iconCss.indexOf("e-trigger") > -1) {
                bpmnShape.event.trigger = args.item.text as BpmnTriggers;
            }
            if (args.item.iconCss.indexOf("e-loop") > -1) {
                var loop = (args.item.id === 'LoopNone') ? 'None' : args.item.id;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.loop = loop as BpmnLoops;
                }
                if (bpmnShape.activity.activity === 'SubProcess') {
                    bpmnShape.activity.subProcess.loop = loop as BpmnLoops;
                }
            }
            if (args.item.iconCss.indexOf("e-compensation") > -1) {
                // var compensation = (args.item.id === 'taskCompensation') ? true : false;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.compensation = !bpmnShape.activity.task.compensation ;
                }
                if (bpmnShape.activity.activity === 'SubProcess') {
                    bpmnShape.activity.subProcess.compensation = ! bpmnShape.activity.subProcess.compensation;
                }
            }
            if (args.item.iconCss.indexOf('e-call') > -1) {
                // var compensations = (args.item.id === 'CallNone') ? false : true;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.call = !bpmnShape.activity.task.call;
                }
            }
            if (args.item.id === 'SubProcess' || args.item.id === 'Task') {
                if (args.item.id === 'Task') {
                    bpmnShape.activity.activity = 'Task';
                    bpmnShape.activity.subProcess.collapsed = false;
                }
                else {
                    bpmnShape.activity.activity = 'SubProcess';
                    bpmnShape.activity.subProcess.collapsed = true;
                }
            }
            if (args.item.iconCss.indexOf('e-boundry') > -1) {
                let call = args.item.id;
                if (args.item.id !== 'Default') {
                    call = (args.item.id === 'BoundryEvent') ? 'Event' : 'Call';
                }
                bpmnShape.activity.subProcess.boundary = call as BpmnBoundary;
            }
            if (args.item.iconCss.indexOf('e-data') > -1) {
                var data = args.item.id === 'DataObjectNone' ? 'None' : args.item.id;
                bpmnShape.dataObject.type = data as BpmnDataObjects;
            }
            if (args.item.iconCss.indexOf('e-collection') > -1) {
                // var collection = (args.item.id === 'Collectioncollection') ? true : false;
                bpmnShape.dataObject.collection =!bpmnShape.dataObject.collection;
            }
            if (args.item.iconCss.indexOf("e-task") > -1) {
                let task:string;
                task = task === 'TaskNone' ? 'None' : args.item.id;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.type = task as BpmnTasks;
                }
            }
            if (args.item.iconCss.indexOf("e-gate") > -1) {
                var gate = args.item.id.replace('Gateway', '');
                if (bpmnShape.shape === 'Gateway') {
                    bpmnShape.gateway.type = gate as BpmnGateways;
                }
            }
            diagram.dataBind();
        }
        if(diagram.selectedItems.connectors.length && (diagram.selectedItems.connectors[0].shape as BpmnFlow))
        {
            if(args.item.id === 'Association')
            {
                ((diagram.selectedItems.connectors[0].shape as BpmnFlow) as BpmnFlow).flow = 'Association';
            }
            if(args.item.id === 'Sequence')
            {
                (diagram.selectedItems.connectors[0].shape as BpmnFlow).flow = 'Sequence';
            }
            if(args.item.id === 'MessageFlow')
            {
                (diagram.selectedItems.connectors[0].shape as BpmnFlow).flow = 'Message';
            }
            if(args.item.id === 'None')
            {
                (diagram.selectedItems.connectors[0].shape as BpmnFlow).flow === 'Sequence' ? 
                (diagram.selectedItems.connectors[0].shape as BpmnFlow).sequence = 'Default':
                (diagram.selectedItems.connectors[0].shape as BpmnFlow).flow === 'Association'?
                (diagram.selectedItems.connectors[0].shape as BpmnFlow).association = 'Default':
                (diagram.selectedItems.connectors[0].shape as BpmnFlow).message = 'Default'
                ;
            }
            if(args.item.id === 'Directional' || args.item.id === 'BiDirectional')
            {
                args.item.id === 'Directional' ? 
                (diagram.selectedItems.connectors[0].shape as BpmnFlow).association = 'Directional':
                (diagram.selectedItems.connectors[0].shape as BpmnFlow).association = 'BiDirectional';
            }
            if(args.item.id === 'Conditional Flow' || args.item.id === 'Normal Flow')
            {
                args.item.id === 'Conditional Flow' ? 
                (diagram.selectedItems.connectors[0].shape as BpmnFlow).sequence = 'Conditional':
                (diagram.selectedItems.connectors[0].shape as BpmnFlow).sequence = 'Normal';
            }
            if(args.item.id === 'InitiatingMessage' || args.item.id === 'NonInitiatingMessage')
            {
                args.item.id === 'InitiatingMessage' ? 
                (diagram.selectedItems.connectors[0].shape as BpmnFlow).message = 'InitiatingMessage':
                (diagram.selectedItems.connectors[0].shape as BpmnFlow).message = 'NonInitiatingMessage';
            }
        diagram.dataBind();
        }
        if (args.item.id === 'Cut') {
            diagram.cut();
        }if (args.item.id === 'Copy') {
            diagram.copy();
        }if (args.item.id === 'Paste') {
            diagram.paste();
        }if (args.item.id === 'Delete'){
            diagram.remove();
        }
        if (args.item.id === 'SelectAll'){
            diagram.selectAll();
        }
    };
    public diagramClear()
    {
        this.selectedItem.diagram.clear();
    }
   
}

export class DiagramPropertyBinding {
    private selectedItem: SelectorViewModel;
    private nodeProperties: NodeProperties;
    constructor(selectedItem: SelectorViewModel,nodeProperties:NodeProperties) {
        this.selectedItem = selectedItem;
        this.nodeProperties = nodeProperties;
    }
    public pageOrientationChange(args: any): void {
        if (args.target) {
            var target = args.target;
            let designContextMenu = (document.getElementById('designContextMenu') as any).ej2_instances[0];
            let diagram = this.selectedItem.diagram;
            var items = designContextMenu.items;
            var option = target.id ? target.id : (args.currentTarget.ej2_instances[0].iconCss === 'sf-icon-portrait'? 'pagePortrait':'pageLandscape');  
            switch (option) {
                case 'pagePortrait':
                    // diagram.pageSettings.isPortrait = true;
                    // diagram.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = 'Portrait';
                    items[0].items[0].iconCss = '';
                    items[0].items[1].iconCss = 'sf-icon-check-tick';
                    document.getElementById('pageLandscape').classList.remove('e-active');
                    break;
                case 'pageLandscape':
                    // diagram.pageSettings.isPortrait = false;
                    // diagram.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = 'Landscape';
                    items[0].items[0].iconCss = 'sf-icon-check-tick';
                    items[0].items[1].iconCss = '';
                    document.getElementById('pagePortrait').classList.remove('e-active');
                    break;
            }
            diagram.dataBind();
        }
    };
    public pageDimensionChange(args: NumericChangeEventArgs|any): void {
        if (args.event) {
            let pageWidth: number = Number(this.selectedItem.pageSettings.pageWidth);
            let pageHeight: number = Number(this.selectedItem.pageSettings.pageHeight);
            let target: HTMLInputElement = args.event.target as HTMLInputElement;
            if (target.tagName.toLowerCase() === 'span') {
                target = target.parentElement.children[0] as HTMLInputElement;
            }
            let diagram: Diagram = this.selectedItem.diagram;
            if (target.id === 'numerictextbox_0') {
                pageWidth = parseInt(target.value.split(',').join(''), 10);
            } else {
                pageHeight = parseInt(target.value.replace(/,/g,''), 10);
            }
            if (pageWidth && pageHeight) {
                if (pageWidth > pageHeight) {
                    this.selectedItem.pageSettings.isPortrait = false;
                    this.selectedItem.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = 'Landscape';
                } else {
                    this.selectedItem.pageSettings.isPortrait = true;
                    this.selectedItem.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = 'Portrait';
                }
                this.selectedItem.pageSettings.pageWidth = diagram.pageSettings.width = pageWidth;
                this.selectedItem.pageSettings.pageHeight = diagram.pageSettings.height = pageHeight;
                diagram.dataBind();
            }
        }
    };
    public pageBackgroundChange1(args: ColorPickerEventArgs|any): void {
        if (args.currentValue) {
            // let target: HTMLInputElement = args.target as HTMLInputElement; 
            let diagram: Diagram = this.selectedItem.diagram;
            diagram.pageSettings.background = {
                color: args.currentValue.rgba
            };
            diagram.dataBind();
        }
    };
    public pageBreaksChange(args: CheckBoxChangeEventArgs): void {
        if (args.event) {
            this.selectedItem.pageSettings.pageBreaks = args.checked;
            this.selectedItem.diagram.pageSettings.showPageBreaks = args.checked;
        }
    };
    public paperListChange(args:any){
        document.getElementById('pageDimension').style.display = 'none';
        document.getElementById('pageOrientation').style.display = '';
        // let diagram = (document.getElementById('diagram') as any).ej2_instances[0];
        let diagram = this.selectedItem.diagram;
        var value = args.value || args.item.value;
        var paperSize = this.selectedItem.utilityMethods.getPaperSize(value);
        var pageWidth = paperSize.pageWidth;
        var pageHeight = paperSize.pageHeight;
        if (pageWidth && pageHeight) {
            if (diagram.pageSettings.orientation === 'Portrait') {
                if (pageWidth > pageHeight) {
                    var temp = pageWidth;
                    pageWidth = pageHeight;
                    pageHeight = temp;
                }
            }
            else {
                if (pageHeight > pageWidth) {
                    var temp = pageHeight;
                    pageHeight = pageWidth;
                    pageWidth = temp;
                }
            }
            diagram.pageSettings.width = pageWidth;
            diagram.pageSettings.height = pageHeight;
        }
        else{
            document.getElementById('pageOrientation').style.display = 'none';
            document.getElementById('pageDimension').style.display = '';
            diagram.pageSettings.width = 1460;
            diagram.pageSettings.height = 600;
        }
        let designContextMenu = (document.getElementById('designContextMenu') as any).ej2_instances[0];
        this.updatePaperSelection(designContextMenu.items[1],args.value);
        diagram.dataBind();
    };
    public updatePaperSelection(items:ContextMenuItemModel,value:string){
        for(let i:number=0;i<items.items.length;i++)
        {
         if(value === (items.items[i] as any).value){
             items.items[i].iconCss = 'sf-icon-check-tick';
         }
         else{
             items.items[i].iconCss = '';
         }
        }
    };
    
    public textPropertyChange(propertyName: string, propertyValue: Object): void {
        if (!this.selectedItem.preventPropertyChange) {
            let diagram: Diagram = this.selectedItem.diagram;
            let selectedObjects: Object[] = diagram.selectedItems.nodes;
            selectedObjects = selectedObjects.concat(diagram.selectedItems.connectors);
            propertyName = propertyName.toLowerCase();
            if (selectedObjects.length > 0) {
                for (let i: number = 0; i < selectedObjects.length; i++) {
                    let node: Object = selectedObjects[i];
                    if ((node as ConnectorModel).type ===undefined || (node as ConnectorModel).type !==undefined) {
                        if ((node as NodeModel).annotations.length > 0) {
                            for (let j: number = 0; j < (node as NodeModel).annotations.length; j++) {
                                let annotation: ShapeAnnotationModel | PathAnnotationModel = null;
                                if ((node as NodeModel).annotations[j] instanceof ShapeAnnotation) {
                                    annotation = (node as NodeModel).annotations[j] as ShapeAnnotationModel;
                                    if (propertyName === 'textposition') {
                                        this.selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.offset = this.selectedItem.utilityMethods.getOffset(propertyValue as string);
                                    }
                                } else if ((node as NodeModel).annotations[j] instanceof PathAnnotation) {
                                    annotation = (node as NodeModel).annotations[j] as PathAnnotationModel;
                                    if (propertyName === 'textposition') {
                                        this.selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.alignment = this.selectedItem.textProperties.textPosition as AnnotationAlignment;
                                    }
                                }
                                if (propertyName === 'left' || propertyName === 'right' || propertyName === 'center') {
                                    annotation.horizontalAlignment = propertyValue as HorizontalAlignment;
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                } else if (propertyName === 'top' || propertyName === 'bottom') {
                                    annotation.verticalAlignment = propertyValue as VerticalAlignment;
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                } else if (propertyName === 'middle') {
                                    annotation.verticalAlignment = 'Center';
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                } else {
                                    this.updateTextProperties(propertyName, propertyValue, annotation.style);
                                }
                            }
                        } else if ((node as NodeModel).shape && (node as NodeModel).shape.type === 'Text') {
                            this.updateTextProperties(propertyName, propertyValue, (node as NodeModel).style);
                        }
                    }
                }
                diagram.dataBind();
                this.selectedItem.isModified = true;
            }
        }
    };

    public toolbarTextStyleChange(args: ToolbarClickEventArgs): void {
        this.textPropertyChange(args.item.tooltipText, false);
    };
    public toolbarTextSubAlignChange(args: ToolbarClickEventArgs): void {
        let propertyName: string = args.item.tooltipText.replace(/[' ']/g, '');
        this.textPropertyChange(propertyName, propertyName);
    };
    public toolbarTextAlignChange(args: ToolbarClickEventArgs): void {
        let propertyName: string = args.item.tooltipText.replace('Align ', '');
        this.textPropertyChange(propertyName, propertyName);
    }
    public textPositionChange(args: DropDownChangeEventArgs): void {
        if (args.value !== null) {
            this.textPropertyChange('textPosition', args.value);
        }
    }
    public updateTextProperties(propertyName: string, propertyValue: Object, annotation: TextStyleModel): void {
        switch (propertyName) {
            case 'bold':
                annotation.bold = !annotation.bold;
                this.updateToolbarState('toolbarTextStyle', annotation.bold, 0);
                break;
            case 'italic':
                annotation.italic = !annotation.italic;
                this.updateToolbarState('toolbarTextStyle', annotation.italic, 1);
                break;
            case 'underline':
                this.selectedItem.textProperties.textDecoration = !this.selectedItem.textProperties.textDecoration;
                annotation.textDecoration = annotation.textDecoration === 'None' || !annotation.textDecoration ? 'Underline' : 'None';
                let dec = annotation.textDecoration === 'Underline'? true:false
                this.updateToolbarState('toolbarTextStyle', dec, 2);
                break;
            case 'aligntextleft':
            case 'aligntextright':
            case 'aligntextcenter':
                annotation.textAlign = propertyValue.toString().replace('AlignText', '') as TextAlign;
                this.selectedItem.utilityMethods.updateTextAlign(annotation.textAlign);
                break;
        }
    };
    public updateToolbarState(toolbarName: string, isSelected: boolean, index: number){
        let toolbarTextStyle: any = document.getElementById(toolbarName);
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            let cssClass: string = toolbarTextStyle.items[index].cssClass;
            toolbarTextStyle.items[index].cssClass = isSelected ? cssClass + ' tb-item-selected' : cssClass.replace(' tb-item-selected', '');
            toolbarTextStyle.dataBind();
        }
    };
    public backgroundTypeSelect(args:any){
        if(args.itemData.text === 'Gradient'){
            this.selectedItem.nodeProperties.gradient = true;
        }
        else{
            this.selectedItem.nodeProperties.gradient = false;
        }
    };
    public gradientDirectionChange(args:any){
        this.selectedItem.nodeProperties.gradientDirection = args.item.value;
        // this.nodeProperties.getGradient(this.selectedItem.diagram.selectedItems.nodes[0]);
    }
    public  download( filename: string){
        this.selectedItem.utilityMethods.download(this.selectedItem.diagram.saveDiagram(),filename);
    }
    public  rotateRight(){
        this.selectedItem.diagram.rotate(this.selectedItem.diagram.selectedItems,90);
    };
    public  rotateLeft(){
        this.selectedItem.diagram.rotate(this.selectedItem.diagram.selectedItems,-90);
    };
    public  flipObjects(flipType:string){
        this.selectedItem.utilityMethods.flipObjects(flipType,this.selectedItem.diagram);
    }
}
   