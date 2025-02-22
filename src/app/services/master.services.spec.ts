import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MasterService } from './master.services';
import { salesdata } from '../model/salesdata';

describe('MasterService', () => {
  let service: MasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MasterService]
    });

    service = TestBed.inject(MasterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch sales data correctly', () => {
    const mockSalesData: salesdata[] = [
      { year: 2015, amount: 5000, colorcode: "green" },
      { year: 2016, amount: 6000, colorcode: "yellow" },
      { year: 2017, amount: 2000, colorcode: "red" },
      { year: 2018, amount: 6500, colorcode: "blue" },
      { year: 2019, amount: 4000, colorcode: "grey" },
      { year: 2020, amount: 7000, colorcode: "orange" },
      { year: 2021, amount: 17000, colorcode: "pink" },
      { year: 2022, amount: 21000, colorcode: "pink" }
    ];

    service.loadsalesdata().subscribe((data) => {
      expect(data).toEqual(mockSalesData);
      expect(data.length).toBe(8);
    });

    const req = httpMock.expectOne('http://localhost:3000/sales');
    expect(req.request.method).toBe('GET');

    req.flush(mockSalesData); 
  });
});
