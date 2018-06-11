import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { Table } from '@blueriq/angular/lists';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { BlueriqTestSession } from '@blueriq/angular/testing/src/test_session';
import { ButtonTemplate, ContainerTemplate, FieldTemplate, TextItemTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../material/material.module';
import { TextItemComponent } from '../textitem/textitem.component';
import { TableSortComponent } from './sort/table.sort.component';
import { TableComponent } from './table.component';
import { TableReadonlyComponent } from './table.readonly.component';

fdescribe('TableComponent', () => {
  let tableTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent, TableReadonlyComponent,
        TableSortComponent, TextItemComponent],
      providers: [BlueriqComponents.register([
        TableComponent, TableReadonlyComponent,
        TableSortComponent, TextItemComponent]),
        Table,
      ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule,
      ],
    });
  }));

  beforeEach(() => {
    tableTemplate = ContainerTemplate.create();
    tableTemplate.contentStyle('table');
    // Simulate a table so the red-cow framework detects this and can be tested on.
    tableTemplate.children(
      // ---------- Header ----------
      ContainerTemplate
      .create('header')
      .contentStyle('tablerow')
      .children(
        ContainerTemplate
        .create('cell')
        .contentStyle('tablesortedheader')
        .children(
          TextItemTemplate.create('Name').plainText('Name'),
          /* 'descending' itself cannot be tested, since this is done by the backend */
          ButtonTemplate.create().styles('sort', 'descending'),
        ),
      ),
      // ---------- Row #1 ----------
      ContainerTemplate
      .create('row')
      .contentStyle('tablerow')
      .children(
        FieldTemplate.text('Person.Name').value('Mike').readonly(true),
      ),
      // ---------- Row #2 ----------
      ContainerTemplate
      .create('row')
      .contentStyle('tablerow')
      .children(
        FieldTemplate.text('Person.Name').value('Tilly').readonly(true),
      ),
      // ---------- End ----------
    );
    session = BlueriqSessionTemplate.create().build(tableTemplate);
    component = session.get(TableComponent);
  });

  it('should have been created', () => {
    console.log(component.nativeElement);
    expect(component).toBeTruthy();
  });

  it('should have a header displayed with the correct content', () => {
    const matRows = component.nativeElement.querySelectorAll('.mat-row');
    expect(matRows.length).toBe(2);
    expect(matRows[0].innerHTML).toContain('Mike');
    expect(matRows[1].innerHTML).toContain('Tilly');
  });

  it('should have a row with the correct content', () => {
    const matHeaderCell = component.nativeElement.querySelectorAll('.mat-header-cell');
    expect(matHeaderCell.length).toBe(1);
    const headerCellContent = matHeaderCell[0].querySelector('app-textitem').innerHTML;
    expect(headerCellContent).toContain('Name');
  });

});
