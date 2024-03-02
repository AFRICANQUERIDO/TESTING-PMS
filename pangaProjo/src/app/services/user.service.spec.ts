import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let testingController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    testingController= TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('registers a user',()=>{
    let mockUser ={
      name: "Miss Ngene",
      image: "image",
      email: "janen@gmail.com",
      phone_number: "07099000",
      password: "12345",
      isDeleted: false,
    isAdmim: false,
      isWelcomed: true
    }
    service.signUpUser(mockUser).subscribe((res)=>{
      expect(res).toBeTruthy()
      expect(res.message).toEqual("User registered successfully")
    })
    const mockRequest = testingController.expectOne('http://localhost:5000/users/signup')
expect(mockRequest.request.method).toEqual('POST')
expect(mockRequest.request.body).toBe(mockUser)
mockRequest.flush({"message":"User registered successfully"})
  })
  it('logs in a user',()=>{
    let mockLogin ={
      email:"janengene12@gmail.com",
      password:'12345'
    }
    service.loginUser(mockLogin).subscribe((res:any)=>{
      expect(res).toBeTruthy()
expect(res.message).toEqual("Logged in successfully")
    })
    const mockRequest = testingController.expectOne('http://localhost:5000/users/login')
expect(mockRequest.request.method).toEqual('POST')
expect(mockRequest.request.body).toBe(mockLogin)
mockRequest.flush({"message":"Logged in successfully"})
  })
})
