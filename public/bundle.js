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
    document.querySelector("#contact-form").innerHTML = `<input type="text" placeholder="Contact name" id="name-input"><input type="text" id="phone-input" placeholder="Contact Phone"><input type="text" id="address-input" placeholder="Contact Address"><button id="submit-button">Submit</button>`;
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
        if (parsedResponse.length > 0) {
          (0, _Contact.default)(contact.name, contact.phone, contact.address);
        } else document.querySelector("#contact").innerHTML = "Please enter a valid username!";
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
        console.log(parsedUser, parsedUser.length);

        if (parsedUser.length === 0) {
          document.querySelector("#contact").innerHTML = "Please enter a valid username!";
        } else if (parsedUser.length > 0 && parsedUser[0].userPassword === password) {
          sessionStorage.setItem("userId", parsedUser[0].id);
        } else {
          document.querySelector("#contact").innerHTML = "Please enter a valid password!";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL0NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9Db250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvQ29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL0xvZ2luRm9ybS5qcyIsIi4uL3NjcmlwdHMvTG9naW5PYmplY3QuanMiLCIuLi9zY3JpcHRzL1VzZXJBcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9Vc2VyRXZlbnRMaXN0ZW5lcnMuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7QUFDQSxNQUFNLHVCQUF1QixHQUFHLENBQUMsSUFBRCxFQUFPLEtBQVAsRUFBYyxPQUFkLEtBQTBCO0FBQ3RELEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsVUFBdkIsRUFBbUMsU0FBbkMsSUFBaUQsT0FBTSxJQUFLLFdBQVUsS0FBTSxVQUFTLE9BQVEsTUFBN0Y7QUFDSCxDQUZEOztlQUllLHVCOzs7Ozs7Ozs7O0FDTGY7QUFFQSxNQUFNLGNBQWMsR0FBRztBQUNuQixFQUFBLFdBQVcsRUFBRyxNQUFELElBQVk7QUFDdEIsV0FBTyxLQUFLLENBQUUseUNBQXdDLE1BQU8sRUFBakQsRUFBb0QsRUFBcEQsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQO0FBRUYsR0FKa0I7QUFLbkIsRUFBQSxXQUFXLEVBQUcsT0FBRCxJQUFhO0FBQ3RCLFdBQU8sS0FBSyxDQUFFLGdDQUFGLEVBQW1DO0FBQzNDLE1BQUEsTUFBTSxFQUFFLE1BRG1DO0FBRTNDLE1BQUEsT0FBTyxFQUFFO0FBQUMsd0JBQWdCO0FBQWpCLE9BRmtDO0FBRzNDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsT0FBZjtBQUhxQyxL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SUg7QUEvQm1CLENBQXhCO2VBa0NlLGU7Ozs7OztBQ2pDZjs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQVBBO0FBRUE7QUFPQTs7QUFDQSw0QkFBZ0IsYUFBaEI7O0FBQ0EsNEJBQWdCLFVBQWhCOztBQUNBLDRCQUFnQixXQUFoQjs7QUFDQSxxQkFBWSxXQUFaOztBQUNBLHFCQUFZLFdBQVo7O0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBBIENvbnRhY3QgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYSBwZXJzb24ncyBuYW1lLCBwaG9uZSBudW1iZXIsIGFuZCBhZGRyZXNzLlxyXG5jb25zdCBjb250YWN0Q29tcG9uZW50QnVpbGRlciA9IChuYW1lLCBwaG9uZSwgYWRkcmVzcykgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0XCIpLmlubmVySFRNTCArPSBgPGgzPiR7bmFtZX08L2gzPjxwPiR7cGhvbmV9PC9wPjxwPiR7YWRkcmVzc308L3A+YFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb250YWN0Q29tcG9uZW50QnVpbGRlcjsiLCIvLyBBIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudCB0aGF0IGxvYWRzIGV4aXN0aW5nIGNvbnRhY3RzIGZyb20gc3RvcmFnZSwgYW5kIHNhdmVzIG5ldyBvbmVzLiBFYWNoIG5ldyBjb250YWN0IHNob3VsZCBoYXZlIGFuIGF1dG8tZ2VuZXJhdGVkIGlkZW50aWZpZXIuXHJcblxyXG5jb25zdCBjb250YWN0TWFuYWdlciA9IHtcclxuICAgIGxvYWRDb250YWN0OiAodXNlcklkKSA9PiB7XHJcbiAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0cz91c2VySWQ9JHt1c2VySWR9YCwge30pXHJcbiAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xyXG4gICAgfSxcclxuICAgIHNhdmVDb250YWN0OiAoY29udGFjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250YWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RNYW5hZ2VyOyIsIi8vIEEgQ29udGFjdEZvcm0gY29tcG9uZW50IHRoYXQsIHdoZW4gZmlsbGVkIG91dCBhbmQgYSBzdWJtaXQgYnV0dG9uIGlzIHByZXNzZWQsIGFkZHMgYSBuZXcgY29udGFjdCB0byBzdG9yYWdlLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQgKGV2ZW50IGxpc3RlbmVyIG9uIHN1Ym1pdCBidXR0b24pLlxyXG5cclxuaW1wb3J0IGNvbnRhY3RNYW5hZ2VyIGZyb20gXCIuL0NvbnRhY3RDb2xsZWN0aW9uLmpzXCJcclxuaW1wb3J0IHByaW50QWxsQ29udGFjdHMgZnJvbSBcIi4vQ29udGFjdExpc3QuanNcIjtcclxuXHJcbmNvbnN0IGNvbnRhY3RGb3JtID0ge1xyXG4gICAgcHJpbnRzVG9Eb206IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdC1mb3JtXCIpLmlubmVySFRNTCA9IGA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkNvbnRhY3QgbmFtZVwiIGlkPVwibmFtZS1pbnB1dFwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwicGhvbmUtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIkNvbnRhY3QgUGhvbmVcIj48aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImFkZHJlc3MtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIkNvbnRhY3QgQWRkcmVzc1wiPjxidXR0b24gaWQ9XCJzdWJtaXQtYnV0dG9uXCI+U3VibWl0PC9idXR0b24+YFxyXG4gICAgfSxcclxuICAgIHN1Ym1pdENsaWNrOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3QtZm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQuaWQgPT09IFwic3VibWl0LWJ1dHRvblwiKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWUtaW5wdXRcIikudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RQaG9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGhvbmUtaW5wdXRcIikudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RBZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGRyZXNzLWlucHV0XCIpLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29udGFjdE9iamVjdCA9IHtcclxuICAgICAgICAgICAgbmFtZTogY29udGFjdE5hbWUsXHJcbiAgICAgICAgICAgIHBob25lOiBjb250YWN0UGhvbmUsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IGNvbnRhY3RBZGRyZXNzLFxyXG4gICAgICAgICAgICB1c2VySWQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvbnRhY3RPYmplY3QpO1xyXG4gICAgICAgICAgICBjb250YWN0TWFuYWdlci5zYXZlQ29udGFjdChjb250YWN0T2JqZWN0KTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0XCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHByaW50QWxsQ29udGFjdHMoKTtcclxuICAgICAgICB9fSl9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEZvcm07XHJcblxyXG5cclxuIiwiLy8gQSBDb250YWN0TGlzdCBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBhbGwgY29udGFjdHMuIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3QgY29tcG9uZW50IGFuZCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxyXG5cclxuXHJcbmltcG9ydCBjb250YWN0TWFuYWdlciBmcm9tIFwiLi9Db250YWN0Q29sbGVjdGlvbi5qc1wiO1xyXG5pbXBvcnQgY29udGFjdENvbXBvbmVudEJ1aWxkZXIgZnJvbSBcIi4vQ29udGFjdC5qc1wiO1xyXG5cclxuY29uc3QgcHJpbnRBbGxDb250YWN0cyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIik7XHJcbiAgICBjb250YWN0TWFuYWdlci5sb2FkQ29udGFjdCh1c2VySWQpXHJcbiAgICAudGhlbigocGFyc2VkUmVzcG9uc2UpID0+IHtcclxuICAgICAgICBwYXJzZWRSZXNwb25zZS5mb3JFYWNoKChjb250YWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhY3RDb21wb25lbnRCdWlsZGVyKGNvbnRhY3QubmFtZSwgY29udGFjdC5waG9uZSwgY29udGFjdC5hZGRyZXNzKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmludEFsbENvbnRhY3RzOyIsImNvbnN0IGJ1aWxkVXNlckxvZ2luID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1mb3JtXCIpLmlubmVySFRNTCA9IGA8Zm9ybT48aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlVzZXIgTmFtZVwiIGlkPVwicmVnaXN0ZXItdXNlclwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiBpZD1cInJlZ2lzdGVyLXBhc3N3b3JkXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJlbWFpbCBhZGRyZXNzXCIgaWQ9XCJyZWdpc3Rlci1lbWFpbFwiPlxyXG4gICAgPC9mb3JtPjxmb3JtPjxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVXNlciBOYW1lXCIgaWQ9XCJsb2dpbi11c2VyXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIGlkPVwibG9naW4tcGFzc3dvcmRcIj48L2Zvcm0+PGJ1dHRvbiBpZD1cInJlZ2lzdGVyLWJ1dHRvblwiPlJlZ2lzdGVyPC9idXR0b24+PGJ1dHRvbiBpZD1cImxvZ2luLWJ1dHRvblwiPkxvZyBJbjwvYnV0dG9uPjxidXR0b24gaWQ9XCJsb2dvdXQtYnV0dG9uXCI+TG9nIE91dDwvYnV0dG9uPmBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRVc2VyTG9naW47IiwiY29uc3QgYnVpbGRVc2VyT2JqZWN0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdXNlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyLXVzZXJcIikudmFsdWU7XHJcbiAgICBjb25zdCB1c2VyUGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXItcGFzc3dvcmRcIikudmFsdWU7XHJcbiAgICBjb25zdCB1c2VyRW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyLWVtYWlsXCIpLnZhbHVlO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdXNlcm5hbWU6IHVzZXJOYW1lLFxyXG4gICAgICAgIHVzZXJQYXNzd29yZDogdXNlclBhc3MsXHJcbiAgICAgICAgdXNlckVtYWlsQWRkcmVzczogdXNlckVtYWlsXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkVXNlck9iamVjdDsiLCJpbXBvcnQgY29udGFjdENvbXBvbmVudEJ1aWxkZXIgZnJvbSBcIi4vQ29udGFjdC5qc1wiXHJcblxyXG5cclxuY29uc3QgbG9naW5NYW5hZ2VyID0ge1xyXG4gICAgcG9zdE5ld1VzZXI6IGZ1bmN0aW9uKHVzZXJPYmplY3QpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIn0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJPYmplY3QpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9LFxyXG4gICAgbG9naW5Vc2VyOiBmdW5jdGlvbih1c2VybmFtZSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzP3VzZXJuYW1lPSR7dXNlcm5hbWV9YClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgcmV0cmlldmVVc2VyQ29udGFjdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzPyR7dXNlcklEfWAsIHt9KVxyXG4gICAgICAgIC50aGVuKHJlc3VsdHMgPT4gcmVzdWx0cy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oKHBhcnNlZFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHBhcnNlZFJlc3BvbnNlLmZvckVhY2goY29udGFjdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihwYXJzZWRSZXNwb25zZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFjdENvbXBvbmVudEJ1aWxkZXIoY29udGFjdC5uYW1lLCBjb250YWN0LnBob25lLCBjb250YWN0LmFkZHJlc3MpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdFwiKS5pbm5lckhUTUwgPSBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIHVzZXJuYW1lIVwiXHJcblxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9naW5NYW5hZ2VyOyIsImltcG9ydCBidWlsZFVzZXJPYmplY3QgZnJvbSBcIi4vTG9naW5PYmplY3QuanNcIlxyXG5pbXBvcnQgbG9naW5NYW5hZ2VyIGZyb20gXCIuL1VzZXJBcGlNYW5hZ2VyXCJcclxuXHJcbmNvbnN0IHVzZXJDbGlja0V2ZW50cyA9IHtcclxuICAgIHJlZ2lzdGVyRXZlbnQ6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyLWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyT2JqZWN0ID0gYnVpbGRVc2VyT2JqZWN0KCk7XHJcbiAgICAgICAgICAgIGxvZ2luTWFuYWdlci5wb3N0TmV3VXNlcih1c2VyT2JqZWN0KTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBsb2dJbkV2ZW50OiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdXNlcm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLXVzZXJcIikudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1wYXNzd29yZFwiKS52YWx1ZTtcclxuICAgICAgICAgICAgbG9naW5NYW5hZ2VyLmxvZ2luVXNlcih1c2VybmFtZSlcclxuICAgICAgICAgICAgLnRoZW4oKHBhcnNlZFVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcnNlZFVzZXIsIHBhcnNlZFVzZXIubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgaWYocGFyc2VkVXNlci5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdFwiKS5pbm5lckhUTUwgPSBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIHVzZXJuYW1lIVwiO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYocGFyc2VkVXNlci5sZW5ndGggPiAwICYmIHBhcnNlZFVzZXJbMF0udXNlclBhc3N3b3JkID09PSBwYXNzd29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgcGFyc2VkVXNlclswXS5pZClcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3RcIikuaW5uZXJIVE1MID0gXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBwYXNzd29yZCFcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGxvZ091dEV2ZW50OiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dvdXQtYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VySWRcIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdFwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJDbGlja0V2ZW50cztcclxuXHJcbiIsIi8vIEluIG1haW4uanMsIGltcG9ydCB0aGUgQ29udGFjdExpc3QgY29tcG9uZW50IGFuZCB0aGUgQ29udGFjdEZvcm0gY29tcG9uZW50LlxyXG5cclxuLy8gVGhlIHVzZXIgc2hvdWxkIHNlZSB0aGUgY29udGFjdCBmb3JtIGF0IHRoZSB0b3Agb2YgdGhlIHZpZXcsIGFuZCB0aGUgbGlzdCBvZiBjb250YWN0cyB1bmRlcm5lYXRoIGl0LlxyXG5cclxuaW1wb3J0IHByaW50QWxsQ29udGFjdHMgZnJvbSBcIi4vQ29udGFjdExpc3QuanNcIlxyXG5pbXBvcnQgY29udGFjdEZvcm0gZnJvbSBcIi4vQ29udGFjdEZvcm0uanNcIjtcclxuaW1wb3J0IGJ1aWxkVXNlckxvZ2luIGZyb20gXCIuL0xvZ2luRm9ybS5qc1wiO1xyXG5pbXBvcnQgdXNlckNsaWNrRXZlbnRzIGZyb20gXCIuL1VzZXJFdmVudExpc3RlbmVycy5qc1wiO1xyXG5cclxuYnVpbGRVc2VyTG9naW4oKTtcclxudXNlckNsaWNrRXZlbnRzLnJlZ2lzdGVyRXZlbnQoKTtcclxudXNlckNsaWNrRXZlbnRzLmxvZ0luRXZlbnQoKTtcclxudXNlckNsaWNrRXZlbnRzLmxvZ091dEV2ZW50KCk7XHJcbmNvbnRhY3RGb3JtLnByaW50c1RvRG9tKCk7XHJcbmNvbnRhY3RGb3JtLnN1Ym1pdENsaWNrKCk7XHJcbnByaW50QWxsQ29udGFjdHMoKTtcclxuXHJcbiJdfQ==
