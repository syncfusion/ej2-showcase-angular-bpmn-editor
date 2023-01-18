import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DiagramAllModule, SymbolPaletteAllModule ,SnappingService} from '@syncfusion/ej2-angular-diagrams';
import { AppComponent } from './app.component';
import { ContextMenuModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule, CheckBoxModule,RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { NumericTextBoxModule , ColorPickerModule ,SliderModule,UploaderModule} from '@syncfusion/ej2-angular-inputs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,DiagramAllModule,SymbolPaletteAllModule,ToolbarModule,ButtonModule,DropDownButtonModule,
    ContextMenuModule,CheckBoxModule,ButtonModule,DropDownListModule,DialogModule,NumericTextBoxModule,ColorPickerModule,
    SliderModule,RadioButtonModule,UploaderModule
  ],
  providers: [SnappingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
