(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// A Contact component that displays a person's name, phone number, and address.
const contactComponentBuilder = (name, phone, address) => {
  document.querySelector("#contact").innerHTML += `<h3>${name}</h3><p>${phone}</p><p>${address}</p>`;
};

var _default = contactComponentBuilder;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// A ContactCollection component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.
const contactManager = {
  loadContact: () => {
    return fetch("http://localhost:8088/contacts", {}).then(response => response.json());
  },
  saveContact: contact => {
    return fetch("http://localhost:8088/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    });
  }
};
var _default = contactManager;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ContactCollection = _interopRequireDefault(require("./ContactCollection.js"));

var _ContactList = _interopRequireDefault(require("./ContactList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component (event listener on submit button).
const contactForm = {
  printsToDom: function () {
    document.querySelector("#contact-form").innerHTML = `<input type="text" id="name-input"><input type="text" id="phone-input"><input type="text" id="address-input"><button id="submit-button">Submit</button>`;
  },
  submitClick: function () {
    document.querySelector("#contact-form").addEventListener("click", () => {
      if (event.target.id === "submit-button") {
        const contactName = document.querySelector("#name-input").value;
        const contactPhone = document.querySelector("#phone-input").value;
        const contactAddress = document.querySelector("#address-input").value;
        const contactObject = {
          name: contactName,
          phone: contactPhone,
          address: contactAddress
        };
        console.log(contactObject);

        _ContactCollection.default.saveContact(contactObject);

        document.querySelector("#contact").innerHTML = "";
        (0, _ContactList.default)();
      }
    });
  }
};
var _default = contactForm;
exports.default = _default;

},{"./ContactCollection.js":2,"./ContactList.js":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ContactCollection = _interopRequireDefault(require("./ContactCollection.js"));

var _Contact = _interopRequireDefault(require("./Contact.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A ContactList component that displays all contacts. It should import the Contact component and the ContactCollection component.
const printAllContacts = () => {
  _ContactCollection.default.loadContact().then(parsedResponse => {
    parsedResponse.forEach(contact => {
      (0, _Contact.default)(contact.name, contact.phone, contact.address);
    });
  });
};

var _default = printAllContacts;
exports.default = _default;

},{"./Contact.js":1,"./ContactCollection.js":2}],5:[function(require,module,exports){
"use strict";

var _ContactList = _interopRequireDefault(require("./ContactList.js"));

var _ContactForm = _interopRequireDefault(require("./ContactForm.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// In main.js, import the ContactList component and the ContactForm component.
// The user should see the contact form at the top of the view, and the list of contacts underneath it.
_ContactForm.default.printsToDom();

_ContactForm.default.submitClick();

(0, _ContactList.default)();

},{"./ContactForm.js":3,"./ContactList.js":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL0NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9Db250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvQ29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7QUFDQSxNQUFNLHVCQUF1QixHQUFHLENBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxPQUFkLEtBQTBCO0FBQ3RELEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsVUFBdkIsRUFBbUMsU0FBbkMsSUFBaUQsT0FBTSxJQUFLLFdBQVUsS0FBTSxVQUFTLE9BQVEsTUFBN0Y7QUFDSCxDQUZEOztlQUllLHVCOzs7Ozs7Ozs7O0FDTGY7QUFFQSxNQUFNLGNBQWMsR0FBRztBQUNuQixFQUFBLFdBQVcsRUFBRSxNQUFNO0FBQ2hCLFdBQU8sS0FBSyxDQUFDLGdDQUFELEVBQW1DLEVBQW5DLENBQUwsQ0FDTixJQURNLENBQ0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRFgsQ0FBUDtBQUVGLEdBSmtCO0FBS25CLEVBQUEsV0FBVyxFQUFHLE9BQUQsSUFBYTtBQUN0QixXQUFPLEtBQUssQ0FBQyxnQ0FBRCxFQUFtQztBQUMzQyxNQUFBLE1BQU0sRUFBRSxNQURtQztBQUUzQyxNQUFBLE9BQU8sRUFBRTtBQUFDLHdCQUFnQjtBQUFqQixPQUZrQztBQUczQyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLE9BQWY7QUFIcUMsS0FBbkMsQ0FBWjtBQUtIO0FBWGtCLENBQXZCO2VBY2UsYzs7Ozs7Ozs7Ozs7QUNkZjs7QUFDQTs7OztBQUhBO0FBS0EsTUFBTSxXQUFXLEdBQUc7QUFDaEIsRUFBQSxXQUFXLEVBQUUsWUFBVztBQUNwQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLFNBQXhDLEdBQXFELHlKQUFyRDtBQUNILEdBSGU7QUFJaEIsRUFBQSxXQUFXLEVBQUUsWUFBVztBQUNwQixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLGdCQUF4QyxDQUF5RCxPQUF6RCxFQUFrRSxNQUFNO0FBQ3BFLFVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLEtBQW9CLGVBQXZCLEVBQXVDO0FBQ3ZDLGNBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLEtBQTFEO0FBQ0EsY0FBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsRUFBdUMsS0FBNUQ7QUFDQSxjQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixnQkFBdkIsRUFBeUMsS0FBaEU7QUFFQSxjQUFNLGFBQWEsR0FBRztBQUN0QixVQUFBLElBQUksRUFBRSxXQURnQjtBQUV0QixVQUFBLEtBQUssRUFBRSxZQUZlO0FBR3RCLFVBQUEsT0FBTyxFQUFFO0FBSGEsU0FBdEI7QUFNSixRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksYUFBWjs7QUFDSSxtQ0FBZSxXQUFmLENBQTJCLGFBQTNCOztBQUNBLFFBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsVUFBdkIsRUFBbUMsU0FBbkMsR0FBK0MsRUFBL0M7QUFDQTtBQUNIO0FBQUMsS0FoQkY7QUFnQkk7QUFyQlEsQ0FBcEI7ZUEwQmUsVzs7Ozs7Ozs7Ozs7QUM1QmY7O0FBQ0E7Ozs7QUFKQTtBQU1BLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTTtBQUMzQiw2QkFBZSxXQUFmLEdBQ0MsSUFERCxDQUNPLGNBQUQsSUFBb0I7QUFDdEIsSUFBQSxjQUFjLENBQUMsT0FBZixDQUF3QixPQUFELElBQWE7QUFDaEMsNEJBQXdCLE9BQU8sQ0FBQyxJQUFoQyxFQUFzQyxPQUFPLENBQUMsS0FBOUMsRUFBcUQsT0FBTyxDQUFDLE9BQTdEO0FBQ0gsS0FGRDtBQUdILEdBTEQ7QUFNSCxDQVBEOztlQVNlLGdCOzs7Ozs7QUNYZjs7QUFDQTs7OztBQUxBO0FBRUE7QUFLQSxxQkFBWSxXQUFaOztBQUNBLHFCQUFZLFdBQVo7O0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBBIENvbnRhY3QgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYSBwZXJzb24ncyBuYW1lLCBwaG9uZSBudW1iZXIsIGFuZCBhZGRyZXNzLlxyXG5jb25zdCBjb250YWN0Q29tcG9uZW50QnVpbGRlciA9IChuYW1lLCBwaG9uZSwgYWRkcmVzcykgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0XCIpLmlubmVySFRNTCArPSBgPGgzPiR7bmFtZX08L2gzPjxwPiR7cGhvbmV9PC9wPjxwPiR7YWRkcmVzc308L3A+YFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb250YWN0Q29tcG9uZW50QnVpbGRlcjsiLCIvLyBBIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudCB0aGF0IGxvYWRzIGV4aXN0aW5nIGNvbnRhY3RzIGZyb20gc3RvcmFnZSwgYW5kIHNhdmVzIG5ldyBvbmVzLiBFYWNoIG5ldyBjb250YWN0IHNob3VsZCBoYXZlIGFuIGF1dG8tZ2VuZXJhdGVkIGlkZW50aWZpZXIuXHJcblxyXG5jb25zdCBjb250YWN0TWFuYWdlciA9IHtcclxuICAgIGxvYWRDb250YWN0OiAoKSA9PiB7XHJcbiAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIiwge30pXHJcbiAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xyXG4gICAgfSxcclxuICAgIHNhdmVDb250YWN0OiAoY29udGFjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0c1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIn0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRhY3QpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdE1hbmFnZXI7IiwiLy8gQSBDb250YWN0Rm9ybSBjb21wb25lbnQgdGhhdCwgd2hlbiBmaWxsZWQgb3V0IGFuZCBhIHN1Ym1pdCBidXR0b24gaXMgcHJlc3NlZCwgYWRkcyBhIG5ldyBjb250YWN0IHRvIHN0b3JhZ2UuIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudCAoZXZlbnQgbGlzdGVuZXIgb24gc3VibWl0IGJ1dHRvbikuXHJcblxyXG5pbXBvcnQgY29udGFjdE1hbmFnZXIgZnJvbSBcIi4vQ29udGFjdENvbGxlY3Rpb24uanNcIlxyXG5pbXBvcnQgcHJpbnRBbGxDb250YWN0cyBmcm9tIFwiLi9Db250YWN0TGlzdC5qc1wiO1xyXG5cclxuY29uc3QgY29udGFjdEZvcm0gPSB7XHJcbiAgICBwcmludHNUb0RvbTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWZvcm1cIikuaW5uZXJIVE1MID0gYDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibmFtZS1pbnB1dFwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwicGhvbmUtaW5wdXRcIj48aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImFkZHJlc3MtaW5wdXRcIj48YnV0dG9uIGlkPVwic3VibWl0LWJ1dHRvblwiPlN1Ym1pdDwvYnV0dG9uPmBcclxuICAgIH0sXHJcbiAgICBzdWJtaXRDbGljazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0LWZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYoZXZlbnQudGFyZ2V0LmlkID09PSBcInN1Ym1pdC1idXR0b25cIil7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lLWlucHV0XCIpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWN0UGhvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bob25lLWlucHV0XCIpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWN0QWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkcmVzcy1pbnB1dFwiKS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RPYmplY3QgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IGNvbnRhY3ROYW1lLFxyXG4gICAgICAgICAgICBwaG9uZTogY29udGFjdFBob25lLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBjb250YWN0QWRkcmVzc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coY29udGFjdE9iamVjdCk7XHJcbiAgICAgICAgICAgIGNvbnRhY3RNYW5hZ2VyLnNhdmVDb250YWN0KGNvbnRhY3RPYmplY3QpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3RcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgcHJpbnRBbGxDb250YWN0cygpO1xyXG4gICAgICAgIH19KX1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb250YWN0Rm9ybTtcclxuXHJcblxyXG4iLCIvLyBBIENvbnRhY3RMaXN0IGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGFsbCBjb250YWN0cy4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXHJcblxyXG5cclxuaW1wb3J0IGNvbnRhY3RNYW5hZ2VyIGZyb20gXCIuL0NvbnRhY3RDb2xsZWN0aW9uLmpzXCI7XHJcbmltcG9ydCBjb250YWN0Q29tcG9uZW50QnVpbGRlciBmcm9tIFwiLi9Db250YWN0LmpzXCI7XHJcblxyXG5jb25zdCBwcmludEFsbENvbnRhY3RzID0gKCkgPT4ge1xyXG4gICAgY29udGFjdE1hbmFnZXIubG9hZENvbnRhY3QoKVxyXG4gICAgLnRoZW4oKHBhcnNlZFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgcGFyc2VkUmVzcG9uc2UuZm9yRWFjaCgoY29udGFjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb250YWN0Q29tcG9uZW50QnVpbGRlcihjb250YWN0Lm5hbWUsIGNvbnRhY3QucGhvbmUsIGNvbnRhY3QuYWRkcmVzcylcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRBbGxDb250YWN0czsiLCIvLyBJbiBtYWluLmpzLCBpbXBvcnQgdGhlIENvbnRhY3RMaXN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RGb3JtIGNvbXBvbmVudC5cclxuXHJcbi8vIFRoZSB1c2VyIHNob3VsZCBzZWUgdGhlIGNvbnRhY3QgZm9ybSBhdCB0aGUgdG9wIG9mIHRoZSB2aWV3LCBhbmQgdGhlIGxpc3Qgb2YgY29udGFjdHMgdW5kZXJuZWF0aCBpdC5cclxuXHJcbmltcG9ydCBwcmludEFsbENvbnRhY3RzIGZyb20gXCIuL0NvbnRhY3RMaXN0LmpzXCJcclxuaW1wb3J0IGNvbnRhY3RGb3JtIGZyb20gXCIuL0NvbnRhY3RGb3JtLmpzXCI7XHJcblxyXG5jb250YWN0Rm9ybS5wcmludHNUb0RvbSgpO1xyXG5jb250YWN0Rm9ybS5zdWJtaXRDbGljaygpO1xyXG5wcmludEFsbENvbnRhY3RzKCk7XHJcblxyXG4iXX0=
