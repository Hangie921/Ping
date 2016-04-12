var expect = chai.expect;
var should = chai.should();

describe('Compare Rands', function() {
	it('should return a random number',function(){
		expect(getRand(3,5)).to.greaterThan(2);
	});

	
});

describe('Compare numbers',function(){
	it('2 should be greater than 1', function() {
		var foo = '2';
		foo.should.be.least(1);
	});
});

describe('Compare data type',function(){
	it('should return true',function(){
		expect(isNum(3)).to.be.true;
		expect(getRand(2,6)).to.greaterThan(1);
		// expect(true).to.be.true;
	});

	it('should return false',function(){
		expect(isNum('3')).to.be.false;
	});
});
