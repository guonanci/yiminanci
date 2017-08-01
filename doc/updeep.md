Object properties:

var person = {
  name: {
    first: 'Jane',
    last: 'West'
  }
};

var result = u({ name: { first: 'Susan' } }, person);

expect(result).to.eql({ name: { first: 'Susan', last: 'West' } });
Array elements:

var scoreboard = {
  scores: [12, 28]
};

var result = u({ scores: { 1: 36 } }, scoreboard);

expect(result).to.eql({ scores: [12, 36] });
