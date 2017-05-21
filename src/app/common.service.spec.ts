import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, ResponseType, XHRBackend, BaseRequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CommonService } from './common.service';

class MockError extends Response implements Error {
  name: any
  message: any
}
describe('postCheckInDetails()', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [CommonService, { provide: XHRBackend, useClass: MockBackend }]
    });
  });

  it('should be successful',
    inject([CommonService, XHRBackend], (commonService, mockBackend) => {
      const successReqBody = { "pnr": 4000, "lastname": "watson", "firstname": "abc" };
      const succesResponse = { "status": 'Success' };

      //service creation
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:3000/newapp/checkin');
        expect(connection.request.method).toEqual(RequestMethod.Post);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');

        var request = JSON.parse(connection.request.getBody());
          let opts = { type: ResponseType.Basic, status: 200, body: succesResponse };
          let responseOpts = new ResponseOptions(opts);
          connection.mockRespond(new Response(responseOpts));
      });
      commonService.postCheckInDetails(successReqBody, 'en').subscribe((response) => {
        console.log(response);
        expect(response.status).toBe('Success');
      }, (error) => {
      }
      );

    }));

  it('should be failed with error code 9001',
    inject([CommonService, XHRBackend], (commonService, mockBackend) => {

      const failureResponse = { "Code": 9001, 'Description': 'Invalid Booking code' };
      const failureReqBody = { "pnr": 2000, "lastname": "watson", "firstname": "abc" };
  
      //service creation
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:3000/newapp/checkin');
        expect(connection.request.method).toEqual(RequestMethod.Post);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');

        var request = JSON.parse(connection.request.getBody());
        if (request.pnr == 2000) {
          let opts = { type: ResponseType.Error, status: 400, body: failureResponse };
          let responseOpts = new ResponseOptions(opts);
          connection.mockError(new MockError(responseOpts));
        }
      });
      //service consume
      //Failure Scenario
      commonService.postCheckInDetails(failureReqBody, 'en').subscribe((response) => {
      }, (error) => {
        expect(error.status).toBe(400);
        expect(error._body.Code).toBe(9001);
        expect(error._body.Description).toBe('Invalid Booking code');
      }
      );
    }));

  it('should be failed with error code 9002',
    inject([CommonService, XHRBackend], (commonService, mockBackend) => {

      const failureResponse = { "Code": 9002, 'Description': 'Family name invalid' };
      const failureReqBody = { "pnr": 4000, "lastname": "Potter", "firstname": "abc" };
  
      //service creation
      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:3000/newapp/checkin');
        expect(connection.request.method).toEqual(RequestMethod.Post);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');

        var request = JSON.parse(connection.request.getBody());
        if (request.lastname != 'watson') {
          let opts = { type: ResponseType.Error, status: 400, body: failureResponse };
          let responseOpts = new ResponseOptions(opts);
          connection.mockError(new MockError(responseOpts));
        }
      });
      //service consume
      //Failure Scenario
      commonService.postCheckInDetails(failureReqBody, 'en').subscribe((response) => {
      }, (error) => {
        expect(error.status).toBe(400);
        expect(error._body.Code).toBe(9002);
        expect(error._body.Description).toBe('Family name invalid');
      }
      );
    }));
});

