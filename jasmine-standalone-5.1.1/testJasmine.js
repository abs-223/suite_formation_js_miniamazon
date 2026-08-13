import { testJasmine } from "../scripts/checkout/paymentSummary.js";

describe('test suite : testJasmine',()=>{
    it('should return the result times five',()=>{
        expect (testJasmine(5)).toEqual(25);
    });
});