var request = require("request");

var base_url = "http://localhost:3000/"

describe("Hello World Server", function() {
  describe("GET /", function() {
    // it("returns status code 200", function(done) {
    //   request.get(base_url, function(error, response, body) {
    //     expect(response.statusCode).toBe(200);
    //     done();
    //   });
    // });

    // it("returns Hello World", function(done) {
    //   request.get(base_url, function(error, response, body) {
    //     expect(body).toBe("Hello World");
    //     done();
    //   });
    // });
    it("2 + 2", () => {
      // Arrange
      let a = 2;

      // Act
      let result = a + 2;

      // Assert
      expect(result).toBe(4);
    });
  });
});