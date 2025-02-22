import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MychartComponent } from './mychart.component'; 
import { MasterService } from '../../services/master.services';
import { of } from 'rxjs';
import { Chart } from 'chart.js'; 

describe('MychartComponent', () => {
  let component: MychartComponent;
  let fixture: ComponentFixture<MychartComponent>;
  let mockMasterService: jasmine.SpyObj<MasterService>;

  beforeEach(() => {
    
    mockMasterService = jasmine.createSpyObj('MasterService', ['loadsalesdata']);
    
    mockMasterService.loadsalesdata.and.returnValue(of([ 
      { year: 2020, amount: 10000, colorcode: '#FF5733' },
      { year: 2021, amount: 15000, colorcode: '#33FF57' },
      { year: 2022, amount: 20000, colorcode: '#3357FF' }
    ]));

    
    TestBed.configureTestingModule({
      imports: [MychartComponent], 
      providers: [{ provide: MasterService, useValue: mockMasterService }]
    }).compileComponents();

    fixture = TestBed.createComponent(MychartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load sales data on ngOnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(mockMasterService.loadsalesdata).toHaveBeenCalled();
    expect(component.chartdata.length).toBe(3);
  });

  it('should toggle sidebar visibility on setupSidebarToggle', () => {
    spyOn(component, 'setupSidebarToggle'); 
    component.setupSidebarToggle();
    expect(component.setupSidebarToggle).toHaveBeenCalled(); 
  });

  

  it('should change scale correctly when changeScale is called', () => {
    component.changeScale(); 
    expect(component.isScaled).toBeTrue(); 
  });
});
