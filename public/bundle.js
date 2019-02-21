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
  loadContact: userId => {
    return fetch(`http://localhost:8088/contacts?userId=${userId}`, {}).then(response => response.json());
  },
  saveContact: contact => {
    return fetch(`http://localhost:8088/contacts`, {
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
          address: contactAddress,
          userId: sessionStorage.getItem("userId")
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
  const userId = sessionStorage.getItem("userId");

  _ContactCollection.default.loadContact(userId).then(parsedResponse => {
    parsedResponse.forEach(contact => {
      (0, _Contact.default)(contact.name, contact.phone, contact.address);
    });
  });
};

var _default = printAllContacts;
exports.default = _default;

},{"./Contact.js":1,"./ContactCollection.js":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildUserLogin = () => {
  document.querySelector("#login-form").innerHTML = `<form><input type="text" placeholder="User Name" id="register-user"><input type="text" placeholder="Password" id="register-password"><input type="text" placeholder="email address" id="register-email">
    </form><form><input type="text" placeholder="User Name" id="login-user"><input type="text" placeholder="Password" id="login-password"></form><button id="register-button">Register</button><button id="login-button">Log In</button><button id="logout-button">Log Out</button>`;
};

var _default = buildUserLogin;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildUserObject = () => {
  const userName = document.querySelector("#register-user").value;
  const userPass = document.querySelector("#register-password").value;
  const userEmail = document.querySelector("#register-email").value;
  return {
    username: userName,
    userPassword: userPass,
    userEmailAddress: userEmail
  };
};

var _default = buildUserObject;
exports.default = _default;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Contact = _interopRequireDefault(require("./Contact.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loginManager = {
  postNewUser: function (userObject) {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userObject)
    });
  },
  loginUser: function (username) {
    return fetch(`http://localhost:8088/users?username=${username}`).then(response => response.json());
  },
  retrieveUserContacts: function () {
    return fetch(`http://localhost:8088/contacts?${userID}`, {}).then(results => results.json()).then(parsedResponse => {
      parsedResponse.forEach(contact => {
        (0, _Contact.default)(contact.name, contact.phone, contact.address);
      });
    });
  }
};
var _default = loginManager;
exports.default = _default;

},{"./Contact.js":1}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LoginObject = _interopRequireDefault(require("./LoginObject.js"));

var _UserApiManager = _interopRequireDefault(require("./UserApiManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userClickEvents = {
  registerEvent: () => {
    document.querySelector("#register-button").addEventListener("click", () => {
      const userObject = (0, _LoginObject.default)();

      _UserApiManager.default.postNewUser(userObject);
    });
  },
  logInEvent: () => {
    document.querySelector("#login-button").addEventListener("click", () => {
      const username = document.querySelector("#login-user").value;
      const password = document.querySelector("#login-password").value;

      _UserApiManager.default.loginUser(username).then(parsedUser => {
        console.log(parsedUser);

        if (parsedUser[0].userPassword === password) {
          sessionStorage.setItem("userId", parsedUser[0].id);
        }
      });
    });
  },
  logOutEvent: () => {
    document.querySelector("#logout-button").addEventListener("click", () => {
      sessionStorage.removeItem("userId");
      document.querySelector("#contact").innerHTML = "";
    });
  }
};
var _default = userClickEvents;
exports.default = _default;

},{"./LoginObject.js":6,"./UserApiManager":7}],9:[function(require,module,exports){
"use strict";

var _ContactList = _interopRequireDefault(require("./ContactList.js"));

var _ContactForm = _interopRequireDefault(require("./ContactForm.js"));

var _LoginForm = _interopRequireDefault(require("./LoginForm.js"));

var _UserEventListeners = _interopRequireDefault(require("./UserEventListeners.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// In main.js, import the ContactList component and the ContactForm component.
// The user should see the contact form at the top of the view, and the list of contacts underneath it.
(0, _LoginForm.default)();

_UserEventListeners.default.registerEvent();

_UserEventListeners.default.logInEvent();

_UserEventListeners.default.logOutEvent();

_ContactForm.default.printsToDom();

_ContactForm.default.submitClick();

(0, _ContactList.default)();

},{"./ContactForm.js":3,"./ContactList.js":4,"./LoginForm.js":5,"./UserEventListeners.js":8}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL0NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9Db250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvQ29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL0xvZ2luRm9ybS5qcyIsIi4uL3NjcmlwdHMvTG9naW5PYmplY3QuanMiLCIuLi9zY3JpcHRzL1VzZXJBcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9Vc2VyRXZlbnRMaXN0ZW5lcnMuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7QUFDQSxNQUFNLHVCQUF1QixHQUFHLENBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxPQUFkLEtBQTBCO0FBQ3RELEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsVUFBdkIsRUFBbUMsU0FBbkMsSUFBaUQsT0FBTSxJQUFLLFdBQVUsS0FBTSxVQUFTLE9BQVEsTUFBN0Y7QUFDSCxDQUZEOztlQUllLHVCOzs7Ozs7Ozs7O0FDTGY7QUFFQSxNQUFNLGNBQWMsR0FBRztBQUNuQixFQUFBLFdBQVcsRUFBRyxNQUFELElBQVk7QUFDdEIsV0FBTyxLQUFLLENBQUUseUNBQXdDLE1BQU8sRUFBakQsRUFBb0QsRUFBcEQsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQO0FBRUYsR0FKa0I7QUFLbkIsRUFBQSxXQUFXLEVBQUcsT0FBRCxJQUFhO0FBQ3RCLFdBQU8sS0FBSyxDQUFFLGdDQUFGLEVBQW1DO0FBQzNDLE1BQUEsTUFBTSxFQUFFLE1BRG1DO0FBRTNDLE1BQUEsT0FBTyxFQUFFO0FBQUMsd0JBQWdCO0FBQWpCLE9BRmtDO0FBRzNDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsT0FBZjtBQUhxQyxLQUFuQyxDQUFaO0FBS0g7QUFYa0IsQ0FBdkI7ZUFjZSxjOzs7Ozs7Ozs7OztBQ2RmOztBQUNBOzs7O0FBSEE7QUFLQSxNQUFNLFdBQVcsR0FBRztBQUNoQixFQUFBLFdBQVcsRUFBRSxZQUFXO0FBQ3BCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsU0FBeEMsR0FBcUQseUpBQXJEO0FBQ0gsR0FIZTtBQUloQixFQUFBLFdBQVcsRUFBRSxZQUFXO0FBQ3BCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsZ0JBQXhDLENBQXlELE9BQXpELEVBQWtFLE1BQU07QUFDcEUsVUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsS0FBb0IsZUFBdkIsRUFBdUM7QUFDdkMsY0FBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsS0FBMUQ7QUFDQSxjQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixFQUF1QyxLQUE1RDtBQUNBLGNBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixFQUF5QyxLQUFoRTtBQUVBLGNBQU0sYUFBYSxHQUFHO0FBQ3RCLFVBQUEsSUFBSSxFQUFFLFdBRGdCO0FBRXRCLFVBQUEsS0FBSyxFQUFFLFlBRmU7QUFHdEIsVUFBQSxPQUFPLEVBQUUsY0FIYTtBQUl0QixVQUFBLE1BQU0sRUFBRSxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QjtBQUpjLFNBQXRCO0FBT0osUUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGFBQVo7O0FBQ0ksbUNBQWUsV0FBZixDQUEyQixhQUEzQjs7QUFDQSxRQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLEVBQW1DLFNBQW5DLEdBQStDLEVBQS9DO0FBQ0E7QUFDSDtBQUFDLEtBakJGO0FBaUJJO0FBdEJRLENBQXBCO2VBMkJlLFc7Ozs7Ozs7Ozs7O0FDN0JmOztBQUNBOzs7O0FBSkE7QUFNQSxNQUFNLGdCQUFnQixHQUFHLE1BQU07QUFDM0IsUUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkIsQ0FBZjs7QUFDQSw2QkFBZSxXQUFmLENBQTJCLE1BQTNCLEVBQ0MsSUFERCxDQUNPLGNBQUQsSUFBb0I7QUFDdEIsSUFBQSxjQUFjLENBQUMsT0FBZixDQUF3QixPQUFELElBQWE7QUFDaEMsNEJBQXdCLE9BQU8sQ0FBQyxJQUFoQyxFQUFzQyxPQUFPLENBQUMsS0FBOUMsRUFBcUQsT0FBTyxDQUFDLE9BQTdEO0FBQ0gsS0FGRDtBQUdILEdBTEQ7QUFNSCxDQVJEOztlQVVlLGdCOzs7Ozs7Ozs7OztBQ2hCZixNQUFNLGNBQWMsR0FBRyxNQUFNO0FBQ3pCLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsU0FBdEMsR0FBbUQ7b1JBQW5EO0FBRUgsQ0FIRDs7ZUFLZSxjOzs7Ozs7Ozs7OztBQ0xmLE1BQU0sZUFBZSxHQUFHLE1BQU07QUFDMUIsUUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDLEtBQTFEO0FBQ0EsUUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLEtBQTlEO0FBQ0EsUUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDLEtBQTVEO0FBRUEsU0FBTztBQUNILElBQUEsUUFBUSxFQUFFLFFBRFA7QUFFSCxJQUFBLFlBQVksRUFBRSxRQUZYO0FBR0gsSUFBQSxnQkFBZ0IsRUFBRTtBQUhmLEdBQVA7QUFRSCxDQWJEOztlQWVlLGU7Ozs7Ozs7Ozs7O0FDZmY7Ozs7QUFHQSxNQUFNLFlBQVksR0FBRztBQUNqQixFQUFBLFdBQVcsRUFBRSxVQUFTLFVBQVQsRUFBcUI7QUFDOUIsV0FBTyxLQUFLLENBQUMsNkJBQUQsRUFBZ0M7QUFDeEMsTUFBQSxNQUFNLEVBQUUsTUFEZ0M7QUFFeEMsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUYrQjtBQUl4QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFVBQWY7QUFKa0MsS0FBaEMsQ0FBWjtBQU9ILEdBVGdCO0FBVWpCLEVBQUEsU0FBUyxFQUFFLFVBQVMsUUFBVCxFQUFtQjtBQUMxQixXQUFPLEtBQUssQ0FBRSx3Q0FBdUMsUUFBUyxFQUFsRCxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURYLENBQVA7QUFFSCxHQWJnQjtBQWNqQixFQUFBLG9CQUFvQixFQUFFLFlBQVc7QUFDN0IsV0FBTyxLQUFLLENBQUUsa0NBQWlDLE1BQU8sRUFBMUMsRUFBNkMsRUFBN0MsQ0FBTCxDQUNOLElBRE0sQ0FDRCxPQUFPLElBQUksT0FBTyxDQUFDLElBQVIsRUFEVixFQUVOLElBRk0sQ0FFQSxjQUFELElBQW9CO0FBQ3RCLE1BQUEsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsT0FBTyxJQUFJO0FBQzlCLDhCQUF3QixPQUFPLENBQUMsSUFBaEMsRUFBc0MsT0FBTyxDQUFDLEtBQTlDLEVBQXFELE9BQU8sQ0FBQyxPQUE3RDtBQUNILE9BRkQ7QUFJSCxLQVBNLENBQVA7QUFTSDtBQXhCZ0IsQ0FBckI7ZUEyQmUsWTs7Ozs7Ozs7Ozs7QUM5QmY7O0FBQ0E7Ozs7QUFFQSxNQUFNLGVBQWUsR0FBRztBQUNwQixFQUFBLGFBQWEsRUFBRSxNQUFNO0FBQ2pCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLGdCQUEzQyxDQUE0RCxPQUE1RCxFQUFxRSxNQUFNO0FBQ3ZFLFlBQU0sVUFBVSxHQUFHLDJCQUFuQjs7QUFDQSw4QkFBYSxXQUFiLENBQXlCLFVBQXpCO0FBQ0gsS0FIRDtBQUlILEdBTm1CO0FBUXBCLEVBQUEsVUFBVSxFQUFFLE1BQU07QUFDZCxJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLGdCQUF4QyxDQUF5RCxPQUF6RCxFQUFrRSxNQUFNO0FBQ3BFLFlBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLEtBQXZEO0FBQ0EsWUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDLEtBQTNEOztBQUNBLDhCQUFhLFNBQWIsQ0FBdUIsUUFBdkIsRUFDQyxJQURELENBQ08sVUFBRCxJQUFnQjtBQUNsQixRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksVUFBWjs7QUFDQSxZQUFHLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxZQUFkLEtBQStCLFFBQWxDLEVBQTRDO0FBQ3hDLFVBQUEsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkIsRUFBaUMsVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjLEVBQS9DO0FBQ0g7QUFDSixPQU5EO0FBT0gsS0FWRDtBQVdILEdBcEJtQjtBQXNCcEIsRUFBQSxXQUFXLEVBQUUsTUFBTTtBQUNmLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDLGdCQUF6QyxDQUEwRCxPQUExRCxFQUFtRSxNQUFNO0FBQ3JFLE1BQUEsY0FBYyxDQUFDLFVBQWYsQ0FBMEIsUUFBMUI7QUFDQSxNQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLEVBQW1DLFNBQW5DLEdBQStDLEVBQS9DO0FBQ0gsS0FIRDtBQUlIO0FBM0JtQixDQUF4QjtlQThCZSxlOzs7Ozs7QUM3QmY7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFQQTtBQUVBO0FBT0E7O0FBQ0EsNEJBQWdCLGFBQWhCOztBQUNBLDRCQUFnQixVQUFoQjs7QUFDQSw0QkFBZ0IsV0FBaEI7O0FBQ0EscUJBQVksV0FBWjs7QUFDQSxxQkFBWSxXQUFaOztBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gQSBDb250YWN0IGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGEgcGVyc29uJ3MgbmFtZSwgcGhvbmUgbnVtYmVyLCBhbmQgYWRkcmVzcy5cclxuY29uc3QgY29udGFjdENvbXBvbmVudEJ1aWxkZXIgPSAobmFtZSwgcGhvbmUsIGFkZHJlc3MpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdFwiKS5pbm5lckhUTUwgKz0gYDxoMz4ke25hbWV9PC9oMz48cD4ke3Bob25lfTwvcD48cD4ke2FkZHJlc3N9PC9wPmBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdENvbXBvbmVudEJ1aWxkZXI7IiwiLy8gQSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQgdGhhdCBsb2FkcyBleGlzdGluZyBjb250YWN0cyBmcm9tIHN0b3JhZ2UsIGFuZCBzYXZlcyBuZXcgb25lcy4gRWFjaCBuZXcgY29udGFjdCBzaG91bGQgaGF2ZSBhbiBhdXRvLWdlbmVyYXRlZCBpZGVudGlmaWVyLlxyXG5cclxuY29uc3QgY29udGFjdE1hbmFnZXIgPSB7XHJcbiAgICBsb2FkQ29udGFjdDogKHVzZXJJZCkgPT4ge1xyXG4gICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHM/dXNlcklkPSR7dXNlcklkfWAsIHt9KVxyXG4gICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcclxuICAgIH0sXHJcbiAgICBzYXZlQ29udGFjdDogKGNvbnRhY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0c2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb250YWN0TWFuYWdlcjsiLCIvLyBBIENvbnRhY3RGb3JtIGNvbXBvbmVudCB0aGF0LCB3aGVuIGZpbGxlZCBvdXQgYW5kIGEgc3VibWl0IGJ1dHRvbiBpcyBwcmVzc2VkLCBhZGRzIGEgbmV3IGNvbnRhY3QgdG8gc3RvcmFnZS4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50IChldmVudCBsaXN0ZW5lciBvbiBzdWJtaXQgYnV0dG9uKS5cclxuXHJcbmltcG9ydCBjb250YWN0TWFuYWdlciBmcm9tIFwiLi9Db250YWN0Q29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCBwcmludEFsbENvbnRhY3RzIGZyb20gXCIuL0NvbnRhY3RMaXN0LmpzXCI7XHJcblxyXG5jb25zdCBjb250YWN0Rm9ybSA9IHtcclxuICAgIHByaW50c1RvRG9tOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtZm9ybVwiKS5pbm5lckhUTUwgPSBgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJuYW1lLWlucHV0XCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwaG9uZS1pbnB1dFwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiYWRkcmVzcy1pbnB1dFwiPjxidXR0b24gaWQ9XCJzdWJtaXQtYnV0dG9uXCI+U3VibWl0PC9idXR0b24+YFxyXG4gICAgfSxcclxuICAgIHN1Ym1pdENsaWNrOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtZm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQuaWQgPT09IFwic3VibWl0LWJ1dHRvblwiKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWUtaW5wdXRcIikudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RQaG9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGhvbmUtaW5wdXRcIikudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RBZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGRyZXNzLWlucHV0XCIpLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29udGFjdE9iamVjdCA9IHtcclxuICAgICAgICAgICAgbmFtZTogY29udGFjdE5hbWUsXHJcbiAgICAgICAgICAgIHBob25lOiBjb250YWN0UGhvbmUsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IGNvbnRhY3RBZGRyZXNzLFxyXG4gICAgICAgICAgICB1c2VySWQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvbnRhY3RPYmplY3QpO1xyXG4gICAgICAgICAgICBjb250YWN0TWFuYWdlci5zYXZlQ29udGFjdChjb250YWN0T2JqZWN0KTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0XCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHByaW50QWxsQ29udGFjdHMoKTtcclxuICAgICAgICB9fSl9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEZvcm07XHJcblxyXG5cclxuIiwiLy8gQSBDb250YWN0TGlzdCBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBhbGwgY29udGFjdHMuIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3QgY29tcG9uZW50IGFuZCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxyXG5cclxuXHJcbmltcG9ydCBjb250YWN0TWFuYWdlciBmcm9tIFwiLi9Db250YWN0Q29sbGVjdGlvbi5qc1wiO1xyXG5pbXBvcnQgY29udGFjdENvbXBvbmVudEJ1aWxkZXIgZnJvbSBcIi4vQ29udGFjdC5qc1wiO1xyXG5cclxuY29uc3QgcHJpbnRBbGxDb250YWN0cyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIik7XHJcbiAgICBjb250YWN0TWFuYWdlci5sb2FkQ29udGFjdCh1c2VySWQpXHJcbiAgICAudGhlbigocGFyc2VkUmVzcG9uc2UpID0+IHtcclxuICAgICAgICBwYXJzZWRSZXNwb25zZS5mb3JFYWNoKChjb250YWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhY3RDb21wb25lbnRCdWlsZGVyKGNvbnRhY3QubmFtZSwgY29udGFjdC5waG9uZSwgY29udGFjdC5hZGRyZXNzKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmludEFsbENvbnRhY3RzOyIsImNvbnN0IGJ1aWxkVXNlckxvZ2luID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1mb3JtXCIpLmlubmVySFRNTCA9IGA8Zm9ybT48aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlVzZXIgTmFtZVwiIGlkPVwicmVnaXN0ZXItdXNlclwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiBpZD1cInJlZ2lzdGVyLXBhc3N3b3JkXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJlbWFpbCBhZGRyZXNzXCIgaWQ9XCJyZWdpc3Rlci1lbWFpbFwiPlxyXG4gICAgPC9mb3JtPjxmb3JtPjxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVXNlciBOYW1lXCIgaWQ9XCJsb2dpbi11c2VyXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIGlkPVwibG9naW4tcGFzc3dvcmRcIj48L2Zvcm0+PGJ1dHRvbiBpZD1cInJlZ2lzdGVyLWJ1dHRvblwiPlJlZ2lzdGVyPC9idXR0b24+PGJ1dHRvbiBpZD1cImxvZ2luLWJ1dHRvblwiPkxvZyBJbjwvYnV0dG9uPjxidXR0b24gaWQ9XCJsb2dvdXQtYnV0dG9uXCI+TG9nIE91dDwvYnV0dG9uPmBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRVc2VyTG9naW47IiwiY29uc3QgYnVpbGRVc2VyT2JqZWN0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdXNlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyLXVzZXJcIikudmFsdWU7XHJcbiAgICBjb25zdCB1c2VyUGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXItcGFzc3dvcmRcIikudmFsdWU7XHJcbiAgICBjb25zdCB1c2VyRW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyLWVtYWlsXCIpLnZhbHVlO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdXNlcm5hbWU6IHVzZXJOYW1lLFxyXG4gICAgICAgIHVzZXJQYXNzd29yZDogdXNlclBhc3MsXHJcbiAgICAgICAgdXNlckVtYWlsQWRkcmVzczogdXNlckVtYWlsXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkVXNlck9iamVjdDsiLCJpbXBvcnQgY29udGFjdENvbXBvbmVudEJ1aWxkZXIgZnJvbSBcIi4vQ29udGFjdC5qc1wiXHJcblxyXG5cclxuY29uc3QgbG9naW5NYW5hZ2VyID0ge1xyXG4gICAgcG9zdE5ld1VzZXI6IGZ1bmN0aW9uKHVzZXJPYmplY3QpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIn0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJPYmplY3QpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9LFxyXG4gICAgbG9naW5Vc2VyOiBmdW5jdGlvbih1c2VybmFtZSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzP3VzZXJuYW1lPSR7dXNlcm5hbWV9YClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgcmV0cmlldmVVc2VyQ29udGFjdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzPyR7dXNlcklEfWAsIHt9KVxyXG4gICAgICAgIC50aGVuKHJlc3VsdHMgPT4gcmVzdWx0cy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oKHBhcnNlZFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHBhcnNlZFJlc3BvbnNlLmZvckVhY2goY29udGFjdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250YWN0Q29tcG9uZW50QnVpbGRlcihjb250YWN0Lm5hbWUsIGNvbnRhY3QucGhvbmUsIGNvbnRhY3QuYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsb2dpbk1hbmFnZXI7IiwiaW1wb3J0IGJ1aWxkVXNlck9iamVjdCBmcm9tIFwiLi9Mb2dpbk9iamVjdC5qc1wiXHJcbmltcG9ydCBsb2dpbk1hbmFnZXIgZnJvbSBcIi4vVXNlckFwaU1hbmFnZXJcIlxyXG5cclxuY29uc3QgdXNlckNsaWNrRXZlbnRzID0ge1xyXG4gICAgcmVnaXN0ZXJFdmVudDogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXItYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJPYmplY3QgPSBidWlsZFVzZXJPYmplY3QoKTtcclxuICAgICAgICAgICAgbG9naW5NYW5hZ2VyLnBvc3ROZXdVc2VyKHVzZXJPYmplY3QpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGxvZ0luRXZlbnQ6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB1c2VybmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tdXNlclwiKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLXBhc3N3b3JkXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICBsb2dpbk1hbmFnZXIubG9naW5Vc2VyKHVzZXJuYW1lKVxyXG4gICAgICAgICAgICAudGhlbigocGFyc2VkVXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFyc2VkVXNlcilcclxuICAgICAgICAgICAgICAgIGlmKHBhcnNlZFVzZXJbMF0udXNlclBhc3N3b3JkID09PSBwYXNzd29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgcGFyc2VkVXNlclswXS5pZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBsb2dPdXRFdmVudDogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9nb3V0LWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwidXNlcklkXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3RcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1c2VyQ2xpY2tFdmVudHM7XHJcblxyXG4iLCIvLyBJbiBtYWluLmpzLCBpbXBvcnQgdGhlIENvbnRhY3RMaXN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RGb3JtIGNvbXBvbmVudC5cclxuXHJcbi8vIFRoZSB1c2VyIHNob3VsZCBzZWUgdGhlIGNvbnRhY3QgZm9ybSBhdCB0aGUgdG9wIG9mIHRoZSB2aWV3LCBhbmQgdGhlIGxpc3Qgb2YgY29udGFjdHMgdW5kZXJuZWF0aCBpdC5cclxuXHJcbmltcG9ydCBwcmludEFsbENvbnRhY3RzIGZyb20gXCIuL0NvbnRhY3RMaXN0LmpzXCJcclxuaW1wb3J0IGNvbnRhY3RGb3JtIGZyb20gXCIuL0NvbnRhY3RGb3JtLmpzXCI7XHJcbmltcG9ydCBidWlsZFVzZXJMb2dpbiBmcm9tIFwiLi9Mb2dpbkZvcm0uanNcIjtcclxuaW1wb3J0IHVzZXJDbGlja0V2ZW50cyBmcm9tIFwiLi9Vc2VyRXZlbnRMaXN0ZW5lcnMuanNcIjtcclxuXHJcbmJ1aWxkVXNlckxvZ2luKCk7XHJcbnVzZXJDbGlja0V2ZW50cy5yZWdpc3RlckV2ZW50KCk7XHJcbnVzZXJDbGlja0V2ZW50cy5sb2dJbkV2ZW50KCk7XHJcbnVzZXJDbGlja0V2ZW50cy5sb2dPdXRFdmVudCgpO1xyXG5jb250YWN0Rm9ybS5wcmludHNUb0RvbSgpO1xyXG5jb250YWN0Rm9ybS5zdWJtaXRDbGljaygpO1xyXG5wcmludEFsbENvbnRhY3RzKCk7XHJcblxyXG4iXX0=
