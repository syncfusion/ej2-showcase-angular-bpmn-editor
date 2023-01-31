import { Component, ViewEncapsulation, ViewChild,Inject, AfterViewInit } from '@angular/core';
import { AlignmentOptions, BpmnFlow, BpmnFlowModel, BpmnShapeModel, CommandManagerModel, ContextMenuSettings, ContextMenuSettingsModel, DiagramBeforeMenuOpenEventArgs, DiagramComponent, DiagramRegions,  FileFormats, IHistoryChangeArgs, IScrollChangeEventArgs, PageSettingsModel, RulerSettingsModel, ScrollSettingsModel,  SelectorModel, ShapeAnnotationModel,  ZoomOptions } from '@syncfusion/ej2-angular-diagrams';
import { DropDownListComponent, } from '@syncfusion/ej2-angular-dropdowns';
// import { FieldSettingsModel,  } '@syncfusion/ej2-dropdowns';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { Uploader } from '@syncfusion/ej2-inputs';
import { BeforeOpenCloseMenuEventArgs,  } from '@syncfusion/ej2-angular-splitbuttons';
import { formatUnit, createElement, closest } from '@syncfusion/ej2-base';
import {
  Diagram, NodeModel, UndoRedo, ConnectorModel, PointPortModel, Connector, FlowShapeModel,
  SymbolInfo, IDragEnterEventArgs, SnapSettingsModel, MarginModel, TextStyleModel, StrokeStyleModel,
  OrthogonalSegmentModel, Node, PaletteModel,BpmnDiagrams,KeyModifiers,SnapConstraints,DiagramTools,NodeConstraints,Keys,SelectorConstraints,SymbolPalette,PrintAndExport
} from '@syncfusion/ej2-diagrams';
import { ExpandMode, ItemModel as ToolbarItemModel , MenuAnimationSettingsModel } from '@syncfusion/ej2-navigations';
import { ItemModel,MenuEventArgs ,DropDownButton} from '@syncfusion/ej2-splitbuttons';
import { DiagramClientSideEvents, DiagramPropertyBinding } from 'src/scripts/events';
import { NodeProperties, SelectorViewModel } from 'src/scripts/selector';

import { PaperSize, UtilityMethods } from 'src/scripts/utilitymethods';
// import { paletteIconClick } from './script/diagram-common';
Diagram.Inject(UndoRedo,BpmnDiagrams,PrintAndExport);
SymbolPalette.Inject(BpmnDiagrams);

 import {DropDownDataSources } from '../scripts/dropdowndatasource'
import { AnimationSettingsModel, DialogComponent } from '@syncfusion/ej2-angular-popups';

/**
 * Default FlowShape sample
 */

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit{
  @ViewChild('diagram')
  //Diagram Properties
  public diagram: Diagram;
  @ViewChild('exportDialog')
  public exportDialog: DialogComponent;
  @ViewChild('printDialog')
  public printDialog: DialogComponent;
  
  @ViewChild('ddlTextPosition')
  public ddlTextPosition: DropDownListComponent;

  @ViewChild('hyperlinkDialog')
  public hyperlinkDialog: DialogComponent;

  public dropDownDataSources: DropDownDataSources = new DropDownDataSources();
  public selectedItem: SelectorViewModel = new SelectorViewModel();
  public utilityMethods: UtilityMethods = new UtilityMethods();
  public nodeProperties: NodeProperties = new NodeProperties();
  public diagramClientSideEvents: DiagramClientSideEvents = new DiagramClientSideEvents(this.selectedItem);
  public diagramPropertyBinding: DiagramPropertyBinding = new DiagramPropertyBinding(this.selectedItem,this.nodeProperties);
//   public selector:SelectorViewModel = new SelectorViewModel();

  constructor() {​​​​​​​
    
}​​​​​​​
  public ngAfterViewInit(): void {
    // this.generateDiagram();
    // this.generatePalette();
    this.uploader();
    this.diagramClientSideEvents.ddlTextPosition = this.ddlTextPosition;
     this.selectedItem.diagram = this.diagram;
    document.onmouseover = this.menumouseover.bind(this);
  }

  public strokeStyleItemTemplate: string = '<div class="db-ddl-template-style"><span class="${className}"></span></div>';

  public strokeStyleTemplate: string = '<div class="db-ddl-template-style"><span class="${className}"></span></div>';
  public interval: number[] = [
    1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25,
    9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75
  ];
public rulerSettings: RulerSettingsModel = {showRulers:true};
public snapSettings: SnapSettingsModel = { constraints: (SnapConstraints.All),};
public pageSettings: PageSettingsModel = {
  background: { color: 'White' }, width: 600, height: 1500, multiplePage: true, margin: { left: 5, top: 5 },
  orientation: 'Landscape'
};
public scrollSettings:ScrollSettingsModel = { canAutoScroll: false, scrollLimit: 'Infinity', minZoom: 0.25, maxZoom: 30 };
public selectedItems:SelectorModel = { constraints: SelectorConstraints.All};
public drawingObject: ConnectorModel|NodeModel = {type:'Orthogonal'};
public commandManger: CommandManagerModel = {
 commands : [{
        name: 'New',
        canExecute: function () {
           return true
        },
        execute: function () {
            executeCommand(1);
             //CommonKeyboardCommands.diagramClear();
        },
        gesture: {
            key: Keys.N,
            keyModifiers: KeyModifiers.Shift
        }
    },
    {
        name: 'Save',
        canExecute: function () {
           return true
        },
        execute: function () {
            executeCommand(2);
           //CommonKeyboardCommands.download(document.getElementById('diagramName').innerHTML);
        },
        gesture: {
            key: Keys.S,
            keyModifiers: KeyModifiers.Control
        }
    },
    {
        name: 'Open',
        canExecute: function () {
           return true
        },
        execute: function () {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        },
        gesture: {
            key: Keys.O,
            keyModifiers: KeyModifiers.Control
        }
    },
    {
        name: 'Rotate Right 90',
        canExecute: function () {
            return true
        },
        execute: function () {
            executeCommand(4);
            // CommonKeyboardCommands.rotateRight();
        },
        gesture: {
            key: Keys.R,
            keyModifiers: KeyModifiers.Control
        }
    },
    {
        name: 'Rotate Left 90',
        canExecute: function () {
           return true
        },
        execute: function () {
            executeCommand(5);
            // CommonKeyboardCommands.rotateLeft();
        },
        gesture: {
            key: Keys.L,
            keyModifiers: KeyModifiers.Control
        }
    },
    {
        name: 'Flip Horizontal',
        canExecute: function () {
           return true
        },
        execute: function () {
            executeCommand(6);
        },
        gesture: {
            key: Keys.H,
            keyModifiers: KeyModifiers.Control
        }
    },
    {
        name: 'Flip Vertical',
        canExecute: function () {
           return true
        },
        execute: function () {
            executeCommand(7);
        //    CommonKeyboardCommands.flipObjects('Flip Vertical');
        },
        gesture: {
            key: Keys.J,
            keyModifiers: KeyModifiers.Control
        }
    },
    ]};
public contextMenu:ContextMenuSettingsModel = {
    show:true,
    items: [
        {
            text: 'Copy', id: 'Copy', target: '.e-diagramcontent', iconCss: 'sf-icon-copy'
        },
        {
            text: 'Cut', id: 'Cut', target: '.e-diagramcontent', iconCss: 'sf-icon-cut'
        },
        {
            text: 'Paste', id: 'Paste', target: '.e-diagramcontent', iconCss: 'sf-icon-paste'
        },
        {
            text: 'Delete', id: 'Delete', target: '.e-diagramcontent', iconCss: 'sf-icon-delete'
        },
        {
            text: 'Select All', id: 'SelectAll', target: '.e-diagramcontent', iconCss: 'e-menu-icon'
        },
        {
            text: 'Association', id: 'Association',iconCss:'e-bpmn-icons' 
        },
        {
            text: 'Sequence', id: 'Sequence',iconCss:'e-bpmn-icons' 
        },
        {
            text: 'Message Flow', id: 'MessageFlow',iconCss:'e-bpmn-icons' 
        },
        {
            text: 'Condition type', id: 'Condition type', items: [
                    {text: 'Default', id: 'None',iconCss:'e-bpmn-icons'}, {text: 'Conditional', id: 'Conditional Flow',iconCss:'e-bpmn-icons'},
                    {text: 'Normal', id: 'Normal Flow',iconCss:'e-bpmn-icons'},
            ]
        },
        {
            text: 'Direction', id: 'Direction', items: [
                    {text: 'Default', id: 'None',iconCss:'e-bpmn-icons'}, {text: 'Directional', id: 'Directional',iconCss:'e-bpmn-icons'},
                    {text: 'Bi-Directional', id: 'BiDirectional',iconCss:'e-bpmn-icons'},
            ]
        },
        {
            text: 'Ad-Hoc', id: 'Adhoc',
            iconCss: 'e-adhocs e-bpmn-icons e-adhoc',
        }, {
            text: 'Loop', id: 'Loop',
            items: [{ text: 'None', iconCss: 'e-loop e-bpmn-icons e-None', id: 'LoopNone' },
            { text: 'Standard', iconCss: 'e-loop e-bpmn-icons e-Loop', id: 'Standard' },
            { text: 'Parallel Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-ParallelMI', id: 'ParallelMultiInstance' },
            { text: 'Sequence Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-SequentialMI', id: 'SequenceMultiInstance' }]
        }, {
            text: 'Compensation', id: 'taskCompensation',
            iconCss: 'e-compensation e-bpmn-icons e-Compensation',
        }, {
            text: 'Activity-Type', id: 'Activity-Type',
            items: [{ iconCss: 'e-bpmn-icons e-Task', text: 'Task', id: 'Task' }
                ,{ text: 'Collapsed sub-process', iconCss: 'e-bpmn-icons e-SubProcess', id: 'SubProcess' },
            ]
        }, {
            text: 'Boundary', id: 'Boundary',
            items: [{ text: 'Default', iconCss: 'e-boundry e-bpmn-icons e-Default', id: 'Default' },
            { text: 'Call', iconCss: 'e-boundry e-bpmn-icons e-Call', id: 'BoundryCall' },
            { text: 'Event', iconCss: 'e-boundry e-bpmn-icons e-Event', id: 'BoundryEvent' },]
        }, {
            text: 'Data Object', id: 'DataObject',
            items: [{ text: 'None', iconCss: 'e-data e-bpmn-icons e-None', id: 'DataObjectNone' },
            { text: 'Input', iconCss: 'e-data e-bpmn-icons e-DataInput', id: 'Input' },
            { text: 'Output', iconCss: 'e-data e-bpmn-icons e-DataOutput', id: 'Output' }]
        }, {
            text: 'Collection', id: 'collection',
            iconCss: 'e-collection e-bpmn-icons e-ParallelMI',
        }, {
            text: 'Task Call', id: 'DeftCall', 
            iconCss: 'e-call e-bpmn-icons e-CallActivity', 
        }, {
            text: 'Trigger Result', id: 'TriggerResult',
            items: [{ text: 'None', id: 'TriggerNone', iconCss: 'e-trigger e-bpmn-icons e-None' },
            { text: 'Message', id: 'Message', iconCss: 'e-trigger e-bpmn-icons e-InMessage' },
            { text: 'Multiple', id: 'Multiple', iconCss: 'e-trigger e-bpmn-icons e-InMultiple' },
            { text: 'Parallel', id: 'Parallel', iconCss: 'e-trigger e-bpmn-icons e-InParallelMultiple' },
            { text: 'Signal', id: 'Signal', iconCss: 'e-trigger e-bpmn-icons e-InSignal' },
            { text: 'Timer', id: 'Timer', iconCss: 'e-trigger e-bpmn-icons e-InTimer' },
            { text: 'Cancel', id: 'Cancel', iconCss: 'e-trigger e-bpmn-icons e-CancelEnd' },
            { text: 'Escalation', id: 'Escalation', iconCss: 'e-trigger e-bpmn-icons e-InEscalation' },
            { text: 'Error', id: 'Error', iconCss: 'e-trigger e-bpmn-icons e-InError' },
            { text: 'Compensation', id: 'triggerCompensation', iconCss: 'e-trigger e-bpmn-icons e-InCompensation' },
            { text: 'Terminate', id: 'Terminate', iconCss: 'e-trigger e-bpmn-icons e-TerminateEnd' },
            { text: 'Conditional', id: 'Conditional', iconCss: 'e-trigger e-bpmn-icons e-InConditional' },
            { text: 'Link', id: 'Link', iconCss: 'e-trigger e-bpmn-icons e-ThrowLinkin' }
            ]
        },
        {
            text: 'Event Type', id: 'EventType',
            items: [{ text: 'Start', id: 'Start', iconCss: 'e-event e-bpmn-icons e-NoneStart', },
            { text: 'Intermediate', id: 'Intermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
            { text: 'Non-Interrupting Start', id: 'NonInterruptingStart', iconCss: 'e-event e-bpmn-icons e-Noninterruptingstart' },
            { text: 'Throwing Intermediate', id: 'ThrowingIntermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
            {
                text: 'Non-Interrupting Intermediate', id: 'NonInterruptingIntermediate',
                iconCss: 'e-event e-bpmn-icons e-NoninterruptingIntermediate'
            },
            { text: 'End', id: 'End', iconCss: 'e-event e-bpmn-icons e-NoneEnd' }]
        }, {
            text: 'Task Type', id: 'TaskType',
            items: [
                { text: 'None', id: 'TaskNone', iconCss: 'e-task e-bpmn-icons e-None' },
                { text: 'Service', id: 'Service', iconCss: 'e-task e-bpmn-icons e-ServiceTask' },
                { text: 'Business Rule', id: 'BusinessRule', iconCss: 'e-task e-bpmn-icons e-BusinessRule' },
                { text: 'Instantiating Receive', id: 'InstantiatingReceive', iconCss: 'e-task e-bpmn-icons e-InstantiatingReceive' },
                { text: 'Manual', id: 'Manual', iconCss: 'e-task e-bpmn-icons e-ManualCall' },
                { text: 'Receive', id: 'Receive', iconCss: 'e-task e-bpmn-icons e-InMessage' },
                { text: 'Script', id: 'Script', iconCss: 'e-task e-bpmn-icons e-ScriptCall' },
                { text: 'Send', id: 'Send', iconCss: 'e-task e-bpmn-icons e-InMessage' },
                { text: 'User', id: 'User', iconCss: 'e-task e-bpmn-icons e-UserCall' },
            ]
        }, {
            text: 'GateWay', id: 'GateWay',
            iconCss: 'e-bpmn-icons e-Gateway', items: [
                { text: 'None', id: 'GatewayNone', iconCss: 'e-gate e-bpmn-icons e-None sf-icon-check-tick' },
                { text: 'Exclusive', iconCss: 'e-gate e-bpmn-icons e-ExclusiveGatewayWithMarker', id: 'Exclusive' },
                { text: 'Inclusive', iconCss: 'e-gate e-bpmn-icons e-InclusiveGateway', id: 'Inclusive' },
                { text: 'Parallel', iconCss: 'e-gate e-bpmn-icons e-ParallelGateway', id: 'GatewayParallel' },
                { text: 'Complex', iconCss: 'e-gate e-bpmn-icons e-ComplexGateway', id: 'Complex' },
                { text: 'Event Based', iconCss: 'e-gate e-bpmn-icons e-EventBasedGateway', id: 'EventBased' },
                { text: 'Exclusive Event Based', iconCss: 'e-gate e-bpmn-icons e-ExclusiveEventBased', id: 'ExclusiveEventBased' },
                { text: 'Parallel Event Based', iconCss: 'e-gate e-bpmn-icons e-ParallelEventBasedGatewaytostart', id: 'ParallelEventBased' }
            ]
        },
        {
            text: 'Message Type', id: 'MessageType', items: [
                    {text: 'Default', id: 'None',iconCss:'e-bpmn-icons'}, {text: 'Initiating Message', id: 'InitiatingMessage',iconCss:'e-bpmn-icons'},
                    {text: 'Non-Initiating Message', id: 'NonInitiatingMessage',iconCss:'e-bpmn-icons'},
            ]
        },
    ],
    showCustomMenuOnly: true,
};

//SymbolPalette Properties
public symbolMargin: MarginModel = { left: 12, right: 12, top: 12, bottom: 12 };
public expandMode: ExpandMode = 'Multiple';

  //Initialize the flowshapes for the symbol palatte
  public bpmnShapes:NodeModel[]|any = [
    {
        id: 'Task', width: 35, height: 30, 
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',
            },
        },
    },
    {
        id: 'Gateway', width: 30, height: 30, 
        shape: { type: 'Bpmn', shape: 'Gateway',}
    },
    {
        id: 'Intermediate_Event', width: 30, height: 30, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Intermediate' }
        },
    },
    {
        id: 'End_Event', width: 30, height: 30,  shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'End' }
        },
    },
    {
        id: 'Start_Event', width: 30, height: 30, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Start' }
        },
    },
    {
        id:'Collapsed_Sub-process', width:35,height:30,shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'SubProcess', subProcess: { collapsed: true, boundary: 'Default' }
            },
        },
    },
     {
        id: 'Expanded_Sub-Process', width: 35, height: 30, 
        constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
        shape: {
            shape: 'Activity', type: 'Bpmn',
            activity: {
                activity: 'SubProcess', subProcess: {
                    type: 'Transaction', collapsed: false,
                    processes: [], transaction: {
                        cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
                    }
                }
            }
        },
    },
    {
        id:'Sequence_Flow',
        sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
        type: 'Straight',targetDecorator:{shape:'Arrow',style:{fill:'black'}},
        shape: { type: 'Bpmn', flow: 'Sequence',sequence: 'Normal'
        },
    },
    {
        id:'Association_Flow',
        sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 35 },
        type: 'Straight',style:{strokeDashArray:"2 2"},
        targetDecorator:{shape:'None'},sourceDecorator:{shape:'None'},
        shape: { type: 'Bpmn', flow: 'Association',association:'Default'} , 
    },
    {
        id:'Message Flow',
        sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 23 },type: 'Straight',
        sourceDecorator:{shape:'None'},targetDecorator:{shape:'Arrow',style:{fill:'white'}},
        style:{strokeDashArray:'4 4'}
    },
    {
        id: 'Message', width: 35,
        height: 25,shape: { type: 'Bpmn', shape: 'Message',},
      },
    {
        id:'Data_Source', width:30,height:28, shape: {
            type: 'Bpmn', shape: 'DataSource',  
        }
    },
    {
        id: 'Data_Object', width: 30, height: 35, 
        shape: { type: 'Bpmn', shape: 'DataObject', dataObject: { collection: false, type: 'None' } },
    },
   
];

public palettes: PaletteModel[] = [
  {
    id: 'bpmn_shapes',
    expanded: true,
    symbols: this.bpmnShapes,
    iconCss: 'shapes',
    title: 'BPMN Shapes'
  },
];

public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return {  tooltip: symbol.id.replace('_',' ')};
}

public dropdownListFields: any = { text: 'text', value: 'value' };

public animationSettings: MenuAnimationSettingsModel = { effect: 'None' };
public dialogAnimationSettings: AnimationSettingsModel = { effect: 'None' };
public dlgTarget: HTMLElement = document.body;
public printingButtons: Object[] = this.getDialogButtons('print');
public exportingButtons: Object[] = this.getDialogButtons('export');
public hyperlinkButtons: Object[] = this.getDialogButtons('hyperlink');
public dialogVisibility: boolean = false;


public diagramNameChange(args: any): void {
  (document.getElementById('diagramName') as any).innerHTML = (document.getElementById('diagramEditable') as HTMLInputElement).value;
  document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
}

public zoomContent()
{
    // let diagram = (document.getElementById('diagram') as any).ej2_instances[0];
    return Math.round(this.diagram.scrollSettings.currentZoom*100) + ' %'
};

public diagramNameKeyDown(args: KeyboardEvent): void {
  if (args.which === 13) {
      (document.getElementById('diagramName') as any).innerHTML = (document.getElementById('diagramEditable') as HTMLInputElement).value;
      document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
  }
}
public renameDiagram(args: MouseEvent): void {
  document.getElementsByClassName('db-diagram-name-container')[0].classList.add('db-edit-name');
  let element: HTMLInputElement = (document.getElementById('diagramEditable') as HTMLInputElement);
  element.value = (document.getElementById('diagramName') as any).innerHTML;
  element.focus();
}

private btnExportClick(): void {
    let diagram: Diagram = this.selectedItem.diagram;
    diagram.exportDiagram({
        fileName: document.getElementById('diagramName').innerHTML,
        format: this.selectedItem.exportSettings.format as FileFormats,
        region: this.selectedItem.exportSettings.region as DiagramRegions
    });
    this.exportDialog.hide();
};
private btnPrintClick(): void {
    let pageWidth: number = this.selectedItem.printSettings.pageWidth;
    let pageHeight: number = this.selectedItem.printSettings.pageHeight;
    let paperSize: PaperSize = this.selectedItem.utilityMethods.getPaperSize(this.selectedItem.printSettings.paperSize);
    if (paperSize.pageHeight && paperSize.pageWidth) {
        pageWidth = paperSize.pageWidth;
        pageHeight = paperSize.pageHeight;
    }
    if (this.selectedItem.pageSettings.isPortrait) {
        if (pageWidth > pageHeight) {
            let temp: number = pageWidth;
            pageWidth = pageHeight;
            pageHeight = temp;
        }
    } else {
        if (pageHeight > pageWidth) {
            let temp: number = pageHeight;
            pageHeight = pageWidth;
            pageWidth = temp;
        }
    }
    let diagram: Diagram = this.selectedItem.diagram;
    diagram.print({
        region: this.selectedItem.printSettings.region as DiagramRegions, pageHeight: pageHeight, pageWidth: pageWidth,
        multiplePage: !this.selectedItem.printSettings.multiplePage,
        pageOrientation: this.selectedItem.printSettings.isPortrait ? 'Portrait' : 'Landscape'
    });
    this.printDialog.hide();
}
private btnCancelClick(args: MouseEvent): void {
    let ss: HTMLElement = args.target as HTMLElement;
    let key: string = ss.offsetParent.id;
    switch (key) {
        case 'exportDialog':
            this.exportDialog.hide();
            break;
        case 'printDialog':
            this.printDialog.hide();
            break;
        case 'hyperlinkDialog':
            this.hyperlinkDialog.hide();
            break;
    }
};
public insertHyperlink(){
    if (this.selectedItem.diagram.selectedItems.nodes.length > 0) {
        (document.getElementById('hyperlink') as HTMLInputElement).value = '';
        (document.getElementById('hyperlinkText') as HTMLInputElement).value = '';
        if (this.selectedItem.diagram.selectedItems.nodes[0].annotations.length > 0) {
            var annotation =this.selectedItem. diagram.selectedItems.nodes[0].annotations[0];
            if (annotation.hyperlink.link || annotation.content) {
                (document.getElementById('hyperlink') as HTMLInputElement).value = annotation.hyperlink.link;
                (document.getElementById('hyperlinkText') as HTMLInputElement).value = annotation.hyperlink.content || annotation.content;
            }
        }
       this.hyperlinkDialog.show();
        }
   }
private btnHyperLink(): void {
    let node: Node = this.selectedItem.diagram.selectedItems.nodes[0] as Node;
    if (node.annotations.length > 0) {
        node.annotations[0].hyperlink.link = (document.getElementById('hyperlink') as HTMLInputElement).value;
        node.annotations[0].hyperlink.content = (document.getElementById('hyperlinkText') as HTMLInputElement).value;
        this.selectedItem.diagram.dataBind();
    } else {
        let annotation: ShapeAnnotationModel = {
            hyperlink: {
                content: (document.getElementById('hyperlinkText') as HTMLInputElement).value,
                link: (document.getElementById('hyperlink') as HTMLInputElement).value
            }
        };
        this.selectedItem.diagram.addLabels(node, [annotation]);
    }
    this.hyperlinkDialog.hide();
}

public getDialogButtons(dialogType: string): Object[] {
    let buttons: Object[] = [];
    switch (dialogType) {
        case 'export':
            buttons.push({
                click: this.btnExportClick.bind(this), buttonModel: { content: 'Export', cssClass: 'e-flat e-db-primary', isPrimary: true }
            });
            break;
        case 'print':
            buttons.push({
                click: this.btnPrintClick.bind(this), buttonModel: { content: 'Print', cssClass: 'e-flat e-db-primary', isPrimary: true }
            });
            break;
        case 'hyperlink':
            buttons.push({
                click: this.btnHyperLink.bind(this), buttonModel: { content: 'Apply', cssClass: 'e-flat e-db-primary', isPrimary: true }
            });
            break;
    }
    buttons.push({
        click: this.btnCancelClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat', isPrimary: true }
    });
    return buttons;
}

private buttonInstance: any;
public menumouseover(args: MouseEvent): void {
    let diagram = this.selectedItem.diagram;
    let target: any = args.target as HTMLButtonElement;
    if (target && (target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu' ||
        target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active')) {
        if (this.buttonInstance && this.buttonInstance.id !== target.id) {
            if (this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                this.buttonInstance.toggle();
                let buttonElement: any = document.getElementById(this.buttonInstance.element.id);
                buttonElement.classList.remove('e-btn-hover');
            }
        }
        let button1: any = target.ej2_instances[0];
        this.buttonInstance = button1;
        if (button1.getPopUpElement().classList.contains('e-popup-close')) {
            button1.toggle();
            if (button1.element.id === 'btnEditMenu') {
                this.enabelEditMenuItems(diagram.selectedItems);
            }
            let buttonElement: any = document.getElementById(this.buttonInstance.element.id);
            buttonElement.classList.add('e-btn-hover');
        }
    } else {
        if (closest(target, '.e-dropdown-popup') === null && closest(target, '.e-dropdown-btn') === null) {
            if (this.buttonInstance && this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                this.buttonInstance.toggle();
                let buttonElement: any = document.getElementById(this.buttonInstance.element.id);
                buttonElement.classList.remove('e-btn-hover');
            }
        }
    }
}

public enabelEditMenuItems(selectedItems:SelectorModel){
        var contextInstance = document.getElementById('editContextMenu');
        let diagram = this.selectedItem.diagram;
        var contextMenu = (contextInstance as any).ej2_instances[0];
        // var selectedItems = this.diagram.selectedItems.nodes;
        // selectedItems = selectedItems.concat(this.diagram.selectedItems.connectors);
        for (var i = 0; i < contextMenu.items.length; i++) {
            contextMenu.enableItems([contextMenu.items[i].text], false);
        }
        var objects = ((selectedItems.nodes as NodeModel) as any).concat(selectedItems.connectors as ConnectorModel);
            if(objects.length>0)
            {
                contextMenu.enableItems(['Cut', 'Copy', 'Delete','Order Commands','Rotate']);
            }
            if(diagram.historyManager.undoStack.length>0){
                contextMenu.enableItems(['Undo']);
            }
            if(diagram.historyManager.redoStack.length>0){
                contextMenu.enableItems(['Redo']);
            }
            if((diagram.commandHandler.clipboardData.pasteIndex !== undefined
                && diagram.commandHandler.clipboardData.clipObject !==undefined)){
                    contextMenu.enableItems(['Paste']);
                }  
}

public exportItems(): ItemModel[]
{
    let exportItems: ItemModel[] = [
        { text: 'JPG' }, { text: 'PNG' }, { text: 'BMP' }, { text: 'SVG' }
    ]
    return exportItems;
}
public onExport(args: any)
{

}
// public  conTypeBtn = new DropDownButton({
//     items: this.dropDownDataSources.conTypeItems, iconCss:'sf-icon-orthogonal_line',
// });
// conTypeBtn.appendTo('#conTypeBtn');

public arrangeMenuBeforeClose(args: BeforeOpenCloseMenuEventArgs): void {
    if (args.event && closest(args.event.target as Element, '.e-dropdown-btn') !== null) {
        args.cancel = true;
    }
    if (!args.element) {
        args.cancel = true;
    }
}
public arrangeMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    (args.element.children[0] as HTMLElement).style.display = 'block';
    if (args.event && closest(args.event.target as Element, '.e-dropdown-btn') !== null) {
        args.cancel = true;
    }
}

public beforeItemRender(args: MenuEventArgs): void {
  let shortCutText: string = this.utilityMethods.getShortCutKey(args.item.text as any);
  if (shortCutText) {
      let shortCutSpan: HTMLElement = document.createElement('span');
       let text: string = args.item.text;
      shortCutSpan.textContent = shortCutText;
      shortCutSpan.style.pointerEvents = 'none';
      args.element.appendChild(shortCutSpan);
      shortCutSpan.setAttribute('class', 'db-shortcut');
  }
//   let diagram = (document.getElementById('diagram') as any).ej2_instances[0];
  let status: boolean = this.enableMenuItems(args.item.text as any, this.selectedItem.diagram);
  if (status) {
      args.element.classList.add('e-disabled');
  } else {
      if (args.element.classList.contains('e-disabled')) {
          args.element.classList.remove('e-disabled');
      }
  }
}

public toolbarCreated(){
     this.selectedItem.toolbarObj = (document.getElementById('toolbarEditor') as any).ej2_instances[0];
     let c = (document.getElementById('conTypeBtn') as any);
     if(this.selectedItem.toolbarObj.items[5].cssClass.indexOf(' tb-item-selected')!==-1){
        c.classList.add('tb-item-selected');
     }
} 

public toolbarEditorClick(args:ClickEventArgs): void {
    let diagram = this.selectedItem.diagram;
    let toolbarObj = this.selectedItem.toolbarObj;
    // let diagram = (document.getElementById('diagram') as any).ej2_instances[0];
    // let toolbarObj = (document.getElementById('toolbarEditor') as any).ej2_instances[0];
    let item = args.item.tooltipText;
    switch(item)
    {
        case 'Undo':
            diagram.undo();
            break;
        case 'Redo':
            diagram.redo();
            break;
        case 'Lock':
            this.utilityMethods.lockObject(diagram);
            break;
        case'Delete':
             diagram.remove();
            break;
        case 'Select Tool':
            diagram.clearSelection();
            // diagram.drawingObject = {};
            diagram.tool = DiagramTools.Default;
            break;
        case 'Text Tool':
            // diagram.clearSelection();
            diagram.selectedItems.userHandles = [];
            diagram.drawingObject = { shape: { type: 'Text' }, };
            diagram.tool = DiagramTools.ContinuousDraw;
            break;
        case 'Pan Tool':
            diagram.clearSelection()
            // diagram.drawingObject = {};
            diagram.tool = DiagramTools.ZoomPan;
            break;
        case 'Rotate Clockwise':
            diagram.rotate(diagram.selectedItems,90);
            break;
        case 'Rotate Counter-clockwise':
            diagram.rotate(diagram.selectedItems,-90);
            break;
        case 'Bring To Front':
            diagram.bringToFront();
            break;
        case 'Send To Back':
            diagram.sendToBack();
            break;
        case 'Bring Forward':
            diagram.moveForward();
            break;
        case 'Send Backward':
            diagram.sendBackward();
            break;
        case 'Align Left':
        case 'Align Right':
        case 'Align Top':
        case 'Align Bottom':
        case 'Align Middle':
        case 'Align Center':
            // selectedItem.isModified = true;
            var alignType = item.replace('Align', '');
            var alignType1 = alignType.charAt(0).toUpperCase() + alignType.slice(1);
            diagram.align(alignType1.trim() as AlignmentOptions);
            break;
        case 'Distribute Objects Horizontally':
            diagram.distribute('RightToLeft');
            break;
        case 'Distribute Objects Vertically':
            diagram.distribute('BottomToTop');
            break;
         case 'Group':
            diagram.group();
            args.item.prefixIcon = 'sf-icon-ungroup';
            args.item.tooltipText = 'UnGroup';
            break;
        case 'UnGroup':
            diagram.unGroup();
            args.item.prefixIcon = 'sf-icon-group';
            args.item.tooltipText = 'Group';
            break;
    }
    if (item === 'Select Tool' || item === 'Pan Tool' || item === 'Text Tool' ) {
        if ((args.item.cssClass as string).indexOf('tb-item-selected') === -1) {
            this.utilityMethods.removeSelectedToolbarItem(toolbarObj);
            args.item.cssClass += ' tb-item-selected';
        }
    }
    diagram.dataBind();
};
public menuClick(args:MenuEventArgs): void{

var buttonElement = document.getElementsByClassName('e-btn-hover')[0];
if (buttonElement) {
    buttonElement.classList.remove('e-btn-hover');
}
let diagram = this.selectedItem.diagram;
let toolbarObj = this.selectedItem.toolbarObj;
// let diagram = (document.getElementById('diagram') as any).ej2_instances[0];
// let toolbarObj = (document.getElementById('toolbarEditor') as any).ej2_instances[0];
var option = args.item.text;
switch(option)
{
    case 'New':
        diagram.clear();
       this.diagramClientSideEvents.historyChange();
        break;
    case 'Save':
        this.utilityMethods.download(diagram.saveDiagram(), (document.getElementById('diagramName') as HTMLInputElement).innerHTML);
        break;
    case 'Print':
        let page = (document.getElementById('pageSettingsList') as any).ej2_instances[0]
        this.selectedItem.printSettings.pageHeight = this.selectedItem.diagram.pageSettings.height;
        this.selectedItem.printSettings.pageWidth = this.selectedItem.diagram.pageSettings.width;
        this.selectedItem.printSettings.paperSize = page.value;
        this.selectedItem.printSettings.isPortrait = this.selectedItem.diagram.pageSettings.orientation === 'Portrait'? true:false
        this.selectedItem.printSettings.isLandscape = this.selectedItem.diagram.pageSettings.orientation === 'Landscape'? true:false
        this.selectedItem.printSettings.multiplePage = this.selectedItem.diagram.pageSettings.multiplePage;
        this.printDialog.show();
        break;
    case 'Export':
        this.exportDialog.show();
        break;
    case 'Open':
        (document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button') as any).click();
        break;
    case 'Undo':
        diagram.undo();
        break;
    case 'Redo':
        diagram.redo();
        break;
    case 'Cut':
        diagram.cut();
        break;
    case 'Copy':
        diagram.copy();
        break;
    case 'Paste':
        diagram.paste();
        break;
    case 'Rotate Right 90':
        diagram.rotate(diagram.selectedItems,90);
        this.diagramClientSideEvents.rotateChange(args as any);
        break;
    case 'Rotate Left 90':
        diagram.rotate(diagram.selectedItems,-90);
        this.diagramClientSideEvents.rotateChange(args as any);
        break;
    case 'Flip Vertical':
        this.utilityMethods.flipObjects(option,diagram);
        break;
    case 'Flip Horizontal':
        this.utilityMethods.flipObjects(option,diagram);
        break;
    case 'Delete':
        diagram.remove();
        break;
    case 'Send To Back':
        diagram.sendToBack();
        break;
    case 'Bring To Front':
        diagram.bringToFront();
        break;
    case 'Send Backward':
        diagram.sendBackward();
        break;
    case 'Bring Forward':
        diagram.moveForward();
        break;
    case 'Landscape':
        (args.item as any).parentObj.items[1].iconCss = '';
        args.item.iconCss = 'sf-icon-check-tick';
        diagram.pageSettings.orientation = 'Landscape';
        document.getElementById('pageLandscape').classList.add('e-active');
        document.getElementById('pagePortrait').classList.remove('e-active');
        break;
    case 'Portrait':
        (args.item as any).parentObj.items[0].iconCss = '';
        args.item.iconCss = 'sf-icon-check-tick';
        diagram.pageSettings.orientation = 'Portrait';
        document.getElementById('pagePortrait').classList.add('e-active');
        document.getElementById('pageLandscape').classList.remove('e-active');
        break;
    case 'Letter (8.5 in x 11 in)':
    case 'Legal (8.5 in x 14 in)':
    case 'A3 (297 mm x 420 mm)':
    case 'A4 (210 mm x 297 mm)':
    case 'A5 (148 mm x 210 mm)':
    case 'A6 (105 mm x 148 mm)':
    case 'Tabloid (279 mm x 432 mm)':
        this.diagramPropertyBinding.paperListChange(args)
        // pageSettingsList.text = args.item.text;
        this.utilityMethods.updateSelection(args.item)
        this.selectedItem.pageSettings.paperSize = (args.item as any).value;
        break;
    case 'Select All':
        diagram.clearSelection();
        diagram.selectAll();
        break;
    case 'Select All Nodes':
        diagram.clearSelection();
        diagram.select(diagram.nodes);
        break;
    case 'Select All Connectors':
        diagram.clearSelection();
        diagram.select(diagram.connectors);
        break;
    case 'Deselect All':
        diagram.clearSelection();
        break;
    case 'Selection Tool':
        diagram.tool = DiagramTools.Default;
        this.utilityMethods.removeSelectedToolbarItem(toolbarObj);
        break;
    case 'Pan Tool':
        diagram.clearSelection();
        diagram.tool = DiagramTools.ZoomPan;
        this.utilityMethods.removeSelectedToolbarItem(toolbarObj);
        break;
    case 'Orthogonal':
        diagram.clearSelection();
        this.selectedItem.utilityMethods.onConnectorSelect(args);
        break;
    case 'Straight':
        diagram.clearSelection();
        this.selectedItem.utilityMethods.onConnectorSelect(args);
        break;
    case 'Bezier':
        diagram.clearSelection();
        this.selectedItem.utilityMethods.onConnectorSelect(args);
        break;
    case 'Show Lines':
        diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.ShowLines;
        args.item.iconCss  = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
    case 'Snap To Grid':
        diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.SnapToLines;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
    case 'Snap To Object':
        diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.SnapToObject;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
    case 'Show Ruler':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        diagram.rulerSettings.showRulers = !diagram.rulerSettings.showRulers;
        break;
    case 'Show Page Breaks':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        diagram.pageSettings.showPageBreaks = !diagram.pageSettings.showPageBreaks;
        // showPageBreaks.checked = !showPageBreaks.checked;
        break;
    // case 'Show Multiple page':
    //     args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
    //     diagram.pageSettings.multiplePage = ! diagram.pageSettings.multiplePage;
    //     break;
    case 'Fit To Width':
        diagram.fitToPage({mode:'Width'});
        break;
    case 'Fit To Page':
        diagram.fitToPage({ mode: 'Page', region: 'Content'});
        break;
}
if (option === 'Pan Tool') {
    if (toolbarObj.items[3].cssClass.indexOf('tb-item-selected') === -1) {
        toolbarObj.items[3].cssClass += ' tb-item-selected';
    }
}
else if (option === 'Selection Tool') {
    if (toolbarObj.items[4].cssClass.indexOf('tb-item-selected') === -1) {
        toolbarObj.items[4].cssClass += ' tb-item-selected';
    }
}
else if (option ===  'Orthogonal' || option === 'Straight' || option === 'Bezier') {
    (document.getElementById('conTypeBtn') as HTMLButtonElement).classList.add('tb-item-selected');
}
diagram.dataBind();
}

// public onUploadSuccess(args: { [key: string]: Object }): void {
//     (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
//     if (args.operation !== 'remove') {
//         let file1: { [key: string]: Object } = args.file as { [key: string]: Object };
//         let file: Blob = file1.rawFile as Blob;
//         OrgChartUtilityMethods.fileType = file1.type.toString();
//         let reader: FileReader = new FileReader();
//         if (OrgChartUtilityMethods.fileType.toLowerCase() === 'jpg' || OrgChartUtilityMethods.fileType.toLowerCase() === 'png') {
//             reader.readAsDataURL(file);
//             reader.onloadend = this.setImage.bind(this);
//         } else {
//             reader.readAsText(file);
//             if (OrgChartUtilityMethods.fileType === 'json' && CommonKeyboardCommands.isOpen) {
//                 reader.onloadend = this.loadDiagram.bind(this);
//             } else {
//                 OrgChartUtilityMethods.isUploadSuccess = true;
//                 reader.onloadend = OrgChartUtilityMethods.readFile.bind(OrgChartUtilityMethods);
//             }
//         }
//         this.utilityMethods.isOpen = false;
//     }
// }

// public onUploadFailure(args: { [key: string]: Object }): void {
//     (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
// }

// public onUploadFileSelected(args: { [key: string]: Object }): void {
//     (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = '';
// }

public uploader(){
    let uploadObj:Uploader = new Uploader({
    asyncSettings: {
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
    },
    success: this.onUploadSuccess,
    showFileList:false
  });
  uploadObj.appendTo('#fileupload');
  }

  public onUploadSuccess(args:any) {
    var file1 = args.file;
    var file = file1.rawFile;
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = AppComponent.loadDiagram
  }
  
  //Load the diagraming object.
  public static loadDiagram(event:any) {
    let diagrm = (document.getElementById('diagram') as any).ej2_instances[0];
    diagrm.loadDiagram(event.target.result);
    // this.diagram.loadDiagram(event.target.result);
  }

public enableMenuItems(itemText: string, diagram: Diagram): boolean {
  let selectedItems: Object[] = diagram.selectedItems.nodes as Object[];
  selectedItems = selectedItems.concat(diagram.selectedItems.connectors as ConnectorModel);
  if (itemText) {
      let commandType: string = itemText.replace(/[' ']/g, '');
      if (selectedItems.length === 0) {
          switch (commandType.toLowerCase()) {
              case 'cut':
                  return true;
              case 'copy':
                  return true;
              case 'delete':
                  return true;
              case 'duplicate':
                  return true;
          }
      }
      if (selectedItems.length > 1) {
          switch (commandType.toLowerCase()) {
              case 'edittooltip':
                  return true;
          }
      }
    //   if (!(diagram.commandHandler.clipboardData.pasteIndex !== undefined
    //     && diagram.commandHandler.clipboardData.clipObject !==undefined) && itemText === 'Paste') {
    //       return true;
    //   }
    //   if (itemText === 'Undo' && (diagram as any).historyManager.undoStack.length === 0) {
    //       return true;
    //   }
    //   if (itemText === 'Redo' && (diagram as any).historyManager.redoStack.length === 0) {
    //       return true;
    //   }
      if (itemText === 'Select All') {
          if (diagram.nodes.length === 0 && diagram.connectors.length === 0) {
              return true;
          }
      }
  }
  return false;
}

  public nodeDefaults(node: NodeModel): NodeModel {
    // node.userHandles = [];
    (node as NodeModel).ports = getNodePorts();
    return node;
  }

  public connDefaults(obj: Connector) {
    if(obj.annotations.length>0){
      (obj as any).annotations[0].style.fill = 'White'
      }
      return obj;
  }
  public diagramCreated(): void {
    this.diagram.fitToPage({ mode: 'Page', region: 'Content'});
    // this.selectedItem.diagram = this.diagram;
  }


  public zoomMenuItems: ItemModel[] = [
    { text: '400%' }, { text: '300%' }, { text: '200%' }, { text: '150%' },
    { text: '100%' }, { text: '75%' }, { text: '50%' }, { text: '25%' }, { separator: true },
    { text: 'Fit To Screen' }
];
//   public dragEnter(args: IDragEnterEventArgs): void {
//     let obj: NodeModel = args.element as NodeModel;
//     if (obj && obj.width && obj.height) {
//       let oWidth: number = obj.width;
//       let oHeight: number = obj.height;
//       let ratio: number = 100 / obj.width;
//       obj.width = 100;
//       obj.height *= ratio;
//       // obj.offsetX += (obj.width - oWidth) / 2;
//       // obj.offsetY += (obj.height - oHeight) / 2;
//     //   obj.style = { fill: '#357BD2', strokeColor: 'white' };
//     }
//   }
// Initialize Nodes for diagram
public nodes:NodeModel[] = [
  {
    id: 'Start1', offsetX:100, offsetY: 300 , width: 50, height: 50, shape: {
        type: 'Bpmn', shape: 'Event',
        event: { event: 'Start' }
    },
},
{
    id: 'Task1', width: 120, height: 75, offsetX: 250, offsetY: 300,
    shape: {
        type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task',task: {type:'Receive'}
        },
    },
    annotations:[{content:'Receive Book lending Request'}]
},
{
    id: 'Task2', width: 120, height: 75, offsetX: 420, offsetY: 300,
    shape: {
        type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task',task: {type:'Service'}
        },
    },
    annotations:[{content:'Get the Book Status',offset:{x:0.5,y:0.6}}]
},
{
    id: 'Gateway1', width: 70, height: 60, offsetX: 570, offsetY: 300,
    shape: { type: 'Bpmn', shape: 'Gateway',  },
},
{
    id: 'Task3', width: 120, height: 75, offsetX: 780, offsetY: 300,
    shape: {
        type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task',task: {type:'Send'}
        },
    },
    annotations:[{content:'On loan Reply'}]
},
{
    id: 'Gateway2', width: 70, height: 60, offsetX: 920, offsetY: 300,
    shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'EventBased' } },
},
{
    id: 'Intermediate1', offsetX:1050, offsetY: 300 , width: 50, height: 50, shape: {
        type: 'Bpmn', shape: 'Event',
        event: { event: 'Intermediate',trigger:'Message'},
    },
    annotations:[{content:'Decline Hold',offset:{x:0.5,y:1.0},verticalAlignment:'Top'}]
},
{
    id: 'Task4', width: 120, height: 75, offsetX: 1200, offsetY: 300,
    shape: {
        type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task',task: {type:'Receive'}
        },
    },
    annotations:[{content:'Cancel Request'}]
},
{
    id: 'End1', offsetX:1400, offsetY: 300 , width: 50, height: 50, shape: {
        type: 'Bpmn', shape: 'Event',
        event: { event: 'End',},
    },
},
{
    id: 'Intermediate2', offsetX:1050, offsetY: 200 , width: 50, height: 50, shape: {
        type: 'Bpmn', shape: 'Event',
        event: { event: 'Intermediate',trigger:'Message'},
    },
    annotations:[{content:'Hold Book',offset:{x:0.5,y:1.0},verticalAlignment:'Top'}]
},
{
    id: 'Intermediate3', offsetX:1050, offsetY: 400 , width: 50, height: 50, shape: {
        type: 'Bpmn', shape: 'Event',
        event: { event: 'Intermediate',trigger:'Message'},
    },
    annotations:[{content:'One Week',offset:{x:0.5,y:1.0},verticalAlignment:'Top'}]
},
{
    id: 'Intermediate4', offsetX:900, offsetY: 60 , width: 50, height: 50, shape: {
        type: 'Bpmn', shape: 'Event',
        event: { event: 'Intermediate',trigger:'Message'},
    },
    annotations:[{content:'Two Weeks',offset:{x:0.5,y:1.0},verticalAlignment:'Top'}]
},
{
    id: 'Task5', width: 120, height: 75, offsetX: 780, offsetY: 550,
    shape: {
        type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task',task: {type:'User'}
        },
    },
    annotations:[{content:'Checkout the Book'}]
},
{
    id: 'Task6', width: 120, height: 75, offsetX: 1050, offsetY: 550,
    shape: {
        type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task',task: {type:'Receive'}
        },
    },
    annotations:[{content:'Checkout Reply'}]
},
{
    id: 'Task7', width: 120, height: 75, offsetX: 1200, offsetY: 200,
    shape: {
        type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task',task: {type:'Service'}
        },
    },
    annotations:[{content:'Request Hold'}]
},
{
    id: 'Task8', width: 120, height: 75, offsetX: 1400, offsetY: 200,
    shape: {
        type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task',task: {type:'Receive'}
        },
    },
    annotations:[{content:'Hold Reply'}]
},
]

 // Initialize connectors for diagram
  public connectors:ConnectorModel[] = [
    {
        id:'connector1',sourceID:'Start1',targetID:'Task1',type:'Orthogonal'
    },
    {
        id:'connector2',sourceID:'Task1',targetID:'Task2',type:'Orthogonal'
    },
    {
        id:'connector3',sourceID:'Task2',targetID:'Gateway1',type:'Orthogonal'
    },
    {
        id:'connector4',sourceID:'Gateway1',targetID:'Task3',annotations:[{content:'Book is on Loan'}],type:'Orthogonal'
    },
    {
        id:'connector5',sourceID:'Task3',targetID:'Gateway2',type:'Orthogonal'
    },
    {
        id:'connector6',sourceID:'Gateway2',targetID:'Intermediate1',sourcePortID:'right',targetPortID:'left',type:'Orthogonal'
    },
    {
        id:'connector7',sourceID:'Intermediate1',targetID:'Task4',type:'Orthogonal'
    },
    {
        id:'connector8',sourceID:'Task4',targetID:'End1',type:'Orthogonal'
    },
    {
        id:'connector9',sourceID:'Gateway2',targetID:'Intermediate2',sourcePortID:'top',targetPortID:'left',type:'Orthogonal'
    },
    {
        id:'connector10',sourceID:'Gateway2',targetID:'Intermediate3',sourcePortID:'bottom',targetPortID:'left',type:'Orthogonal'
    },
    {
        id:'connector11',sourceID:'Intermediate2',targetID:'Task7',type:'Orthogonal'
    },
    {
        id:'connector12',sourceID:'Intermediate3',targetID:'Task4',sourcePortID:'right',targetPortID:'bottom',type:'Orthogonal'
    },
    {
        id:'connector13',sourceID:'Task7',targetID:'Task8',type:'Orthogonal'
    },
    {
        id:'connector14',sourceID:'Task8',targetID:'Intermediate4',sourcePortID:'top',targetPortID:'right',type:'Orthogonal'
    },
    {
        id:'connector15',sourceID:'Intermediate4',targetID:'Task2',sourcePortID:'left',targetPortID:'top',type:'Orthogonal'
    },
    {
        id:'connector16',sourceID:'Gateway1',targetID:'Task5',sourcePortID:'bottom',targetPortID:'left',
        annotations:[{content:'Book is Avaliable'}],type:'Orthogonal'
    },
    {
        id:'connector17',sourceID:'Task5',targetID:'Task6',type:'Orthogonal'
    },
    {
        id:'connector18',sourceID:'Task6',targetID:'End1',sourcePortID:'right',targetPortID:'bottom',type:'Orthogonal'
    },
]



  //Initializes connector symbols for the symbol palette
  private connectorSymbols: ConnectorModel[] = [
    {
      id: 'Link1',
      type: 'Orthogonal',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} },
      style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
      id: 'link3',
      type: 'Orthogonal',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: 'None' }
    },
    {
      id: 'Link21',
      type: 'Straight',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} },
      style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
      id: 'link23',
      type: 'Straight',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: 'None' }
    },
    {
      id: 'link33',
      type: 'Bezier',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: 'None' }
    }
  ];
  public diagramCreate(args: Object): void {
    // paletteIconClick();
  }
}

  //Create and add ports for node.
  function getNodePorts(): PointPortModel[] {
    let ports: PointPortModel[] = [
        { id: 'left', shape: 'Circle', offset: { x: 0, y: 0.5 } },
        { id: 'bottom', shape: 'Circle', offset: { x: 0.5, y: 1 } },
        { id: 'right', shape: 'Circle', offset: { x: 1, y: 0.5 } },
        { id: 'top', shape: 'Circle', offset: { x: 0.5, y: 0 } }
    ];
    return ports;
  };

  function executeCommand(args:number){
    let diagram = (document.getElementById('diagram') as any).ej2_instances[0];
    switch(args){
        case 1:
            diagram.clear();
        break;
        case 2:
            download(diagram.saveDiagram(),document.getElementById('diagramName').innerHTML);
        break;
        case 4:
            if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length>0){
            diagram.rotate(diagram.selectedItems,90);
            }
        break;
        case 5:
            if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length>0){
            diagram.rotate(diagram.selectedItems,-90);
            }
        break;
        case 6:
            if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length>0){
            flip(diagram,'Flip Horizontal');
            }
        break;
        case 7:
            if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length>0){
            flip(diagram,'Flip Vertical');
            }
        break;
    }
  }
  function flip(diagram:Diagram,flipType:string)
  {
    var selectedObjects = (diagram).selectedItems.nodes.concat(diagram.selectedItems.connectors as object);
        for(let i:number = 0;i<selectedObjects.length;i++)
        {
           selectedObjects[i].flip = flipType === 'Flip Horizontal'? 'Horizontal':'Vertical';
        }
        diagram.dataBind();
  }

  function download(data: string, filename: string): void {
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
  }
