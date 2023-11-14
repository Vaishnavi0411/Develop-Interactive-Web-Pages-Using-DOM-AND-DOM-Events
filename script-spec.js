const expect = require("chai").expect;
const script = require("../solution/js/script");
const { JSDOM } = require("jsdom");

describe("Solution", function () {
    it("should have function with the name `saveNote`", function () {
        expect(typeof script.saveNote).to.be.equal("function");
    });
    it("should have function with the name `displayNotes`", function () {
        expect(typeof script.displayNotes).to.be.equal("function");
    });
});
describe('saveNote', function () {
    let jsDom;
    before(function () {
        return JSDOM.fromFile('./solution/index.html')
            .then((dom) => {
                global.window = dom.window;
                global.document = window.document;
                jsDom = dom;
            });
    });
    it("should allow adding a new note and display the contents of the new note on the page", function (done) {
        document.getElementById("note-id").value = 1;
        document.getElementById("note-title").value = "test note";
        document.getElementById("note-content").value = "test note content";
        script.saveNote(new jsDom.window.Event("submit"));
        expect(document.getElementById("note-container").textContent).to.contain("test note");
        expect(document.getElementById("note-container").textContent).to.contain("test note content");
        done();
    });
});
describe('displayNotes', function () {
    let jsDom;
    before(function () {
        return JSDOM.fromFile('./solution/index.html')
            .then((dom) => {
                global.window = dom.window;
                global.document = window.document;
                jsDom = dom;
            });
    });
    it("should display all the existing notes", function (done) {
        //create note 1
        document.getElementById("note-id").value = 2;
        document.getElementById("note-title").value = "dummy note 1";
        document.getElementById("note-content").value = "dummy note 1 content";

        script.saveNote(new jsDom.window.Event("submit"));

        //create note 2
        document.getElementById("note-id").value = 3;
        document.getElementById("note-title").value = "dummy note 2";
        document.getElementById("note-content").value = "dummy note 2 content";

        script.saveNote(new jsDom.window.Event("submit"));

        expect(document.getElementById("note-container").textContent).to.contain("dummy note 1");
        expect(document.getElementById("note-container").textContent).to.contain("dummy note 2");
        expect(document.getElementById("note-container").textContent).to.contain("dummy note 1 content");
        expect(document.getElementById("note-container").textContent).to.contain("dummy note 2 content");

        done();
    });
});