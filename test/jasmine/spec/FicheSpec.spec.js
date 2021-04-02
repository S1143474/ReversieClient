describe("Fiche", () => {

    it("Fiche object exists", () => {
        // Arrange
        let fiche = new Fiche("<td><div class='fiche'></div></td>", 1);
        
        // Assert
        expect(fiche).toBeDefined();
    });

    describe("Fiche Coords", () => {
        it("(id: 1) x = 1, y = 0", () => {
            // Arrange
            let fiche = new Fiche("<td><div class='fiche'></div></td>", 1);
            
            // Act
            fiche.hoverFiche(1);

            // Assert
            expect(fiche.x).toBe(1);
            expect(fiche.y).toBe(0);
        });

        it("(id: 9) x = 1, y = 1", () => {
            // Arrange
            let fiche = new Fiche("<td><div class='fiche'></div></td>", 9);
            
            // Act
            fiche.hoverFiche(1);

            // Assert
            expect(fiche.x).toBe(1);
            expect(fiche.y).toBe(1);
        });

        it("(id: 64) x = 7, y = 7", () => {
            // Arrange
            let fiche = new Fiche("<td><div class='fiche'></div></td>", 63);
            
            // Act
            fiche.hoverFiche(1);

            // Assert
            expect(fiche.x).toBe(7);
            expect(fiche.y).toBe(7);
        });

        it("(id: 21) x = 3, y = 7", () => {
            // Arrange
            let fiche = new Fiche("<td><div class='fiche'></div></td>", 21);
            
            // Act
            fiche.hoverFiche(1);

            // Assert
            expect(fiche.x).toBe(5);
            expect(fiche.y).toBe(2);
        });
    });

    // it("Fiche object hover class added", () => {
        
    // });
});