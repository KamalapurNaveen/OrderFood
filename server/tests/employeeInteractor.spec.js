const { expect } = require('chai');
const sinon = require('sinon');
const {
    registerEmployee, loginEmployee, logoutEmployee,getProfileInfo,getCustomerById,addMoneyToWallet,
    updatePassword,sendOTP,verifyOTP, updateOTPPassword,
} =require('../interactors/employee')
const auth = require('../services/auth.service')
const mail = require('../services/mail.service')

describe('Employee Interactor',()=>{
    let EmployeeModel, CustomerModel, WalletModel;
    let findByIdStub,findOneStub;
    let res;
    beforeEach(() => {
        EmployeeModel = {
            findOne : ()=>{},
            findById : ()=>{}
        };
        findOneStub = sinon.stub(EmployeeModel, 'findOne'),
        findByIdStub = sinon.stub(EmployeeModel, 'findById')

        res = {
            cookies : null,
            cookie : function(name, coookie, {...options}){ this.cookies = 'access_token:token'},
        }
    })

    afterEach(() => {
        sinon.restore()
    })

    describe('registerCustomer', () => {
        it('should throw error when email already exists', async () => {
            const user = {
                name: 'Vijay',
                email: 'vijay@gmail.com',
                mobile : '8283939393',
            };
            findOneStub.resolves(user);
    
            try {
                await registerEmployee({
                    name : 'Vijay',
                    email : 'vijay@gmail.com',
                    mobile : '',
                    password : '',
                    auth,
                    EmployeeModel,
                })
            }catch(error){
                expect(error.message).to.equal('email already exists');
                return;
            }
            
        })
    })

    describe('loginEmployee', () => {
        it('should throw error for invalid email', async () => {
            findOneStub.resolves(null);
    
            try {
                await loginEmployee({
                    email: 'invalid@example.com',
                    password: 'password',
                    auth,
                    EmployeeModel
                });
            } catch (error) {
                expect(error.message).to.equal('invalid email');
                return;
            }
            throw new Error('Test failed');
        });
    
        it('should throw error for invalid password', async () => {
            const user = {
                _id: 'user_id',
                name: 'John Doe',
                email: 'john@example.com',
                salt: 'salt',
                hash: 'hashed_password',
                otp : "1223"
            };
            findOneStub.resolves(user);
            
            try {
                await loginEmployee({
                    email: 'john@example.com',
                    password: 'wrong_password',
                    auth,
                    EmployeeModel
                });
    
            } catch (error) {
                expect(error.message).to.equal('invalid password');
                return;
            }
            throw new Error('Test failed');
        });
    
        it('should set cookie when login is successful', async () => {
            const user = {
                _id: '65c08db4504d89f35a81aea3',
                name: 'John Doe',
                email: 'john@example.com',
                salt: 'ef59d1bf5e1902d925f81d238e040a32',
                hash: '414d8c887f52bd47c8056e942111f055ce91f8108372713338b1e64a4d2ec7ef3ea8f44e4ec9ea427303d7769e699030516143c9f3202949b0b9341b66ba7485'
            };
            findOneStub.resolves(user);
    
            const setCookie = await loginEmployee({
                email: 'john@example.com',
                password: 'rohan',
                auth,
                EmployeeModel
            });
            setCookie(res);
            expect(res.cookies).to.equal('access_token:token')
        });
    });

    describe('updatePassword', () => {
        it('should throw error when no user exists', async () => {
            findByIdStub.resolves(null);
    
            try {
                await updatePassword({
                    id : '',
                    currentPassword : '', 
                    newPassword : '', 
                    EmployeeModel, 
                    auth
                })
            }catch(error){
                expect(error.message).to.equal('invalid user');
                return;
            }
    
        })
    
    
        it('should throw error when invalid password is provided', async () => {
            const user = {
                "name": "Rohan",
                "email": "rohana@gmail.com",
                "mobile": {
                  "$numberLong": "9283028347"
                },
                "salt": "ef59d1bf5e1902d925f81d238e040a32",
                "hash": "414d8c887f52bd47c8056e942111f055ce91f8108372713338b1e64a4d2ec7ef3ea8f44e4ec9ea427303d7769e699030516143c9f3202949b0b9341b66ba7485",
                "wallet_id": {
                  "$oid": "65c08db4504d89f35a81aea1"
                },
                "__v": 0
              }
            findByIdStub.resolves(user);
    
            try {
                await updatePassword({
                    id : '',
                    currentPassword : '123', 
                    newPassword : '', 
                    EmployeeModel, 
                    auth
                })
            }catch(error){
                expect(error.message).to.equal('invalid password');
                return;
            }
    
        })
        
    })

    describe('verifyOTP', () => {
        it('should error for invalid OTP',async ()=>{
            try {
                await verifyOTP({
                    otp : '123', 
                    email : 'mail@gmail.com', 
                    hash : '111', 
                    mail
                })
    
            }catch(error){
                expect(error.message).to.equal('invalid OTP');
                return;
            }     
        })

        it('should return true for valid OTP',async ()=>{
            try {
                let response = await verifyOTP({
                    "hash" : "6dfa508da29712a3f5d2c89d0c4fee7f0594122a50e76603bbc08a79e921c185",
                    "email" : "rohana@gmail.com",
                    "otp" : "1234",
                    mail
                })
                expect(response).to.equal(true);
                return;
            }catch(error){
                throw error
            }     
        })
            
    })

})