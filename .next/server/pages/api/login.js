"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/login";
exports.ids = ["pages/api/login"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./src/pages/api/login.ts":
/*!********************************!*\
  !*** ./src/pages/api/login.ts ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nasync function handler(req, res) {\n    try {\n        const { headers  } = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(\"http://localhost:3000/login\", {\n            email: req.body.email,\n            password: req.body.password\n        });\n        const token = headers.authorization;\n        const userId = headers.userid;\n        if (!token || !userId) {\n            return res.status(400).json({\n                message: \"Token or user ID missing in headers\"\n            });\n        }\n        return res.status(200).json({\n            token,\n            userId\n        });\n    } catch (error) {\n        if (error.response) {\n            return res.status(error.response.status).json({\n                message: error.response.data.message\n            });\n        }\n        return res.status(500).json({\n            message: \"Internal server error\"\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2xvZ2luLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQzBCO0FBRVgsZUFBZUMsUUFBUUMsR0FBbUIsRUFBRUMsR0FBb0IsRUFBRTtJQUMvRSxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxRQUFPLEVBQUUsR0FBRyxNQUFNSixrREFBVSxDQUFDLCtCQUErQjtZQUNsRU0sT0FBT0osSUFBSUssSUFBSSxDQUFDRCxLQUFLO1lBQ3JCRSxVQUFVTixJQUFJSyxJQUFJLENBQUNDLFFBQVE7UUFDN0I7UUFFQSxNQUFNQyxRQUFRTCxRQUFRTSxhQUFhO1FBQ25DLE1BQU1DLFNBQVNQLFFBQVFRLE1BQU07UUFFN0IsSUFBSSxDQUFDSCxTQUFTLENBQUNFLFFBQVE7WUFDckIsT0FBT1IsSUFBSVUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFBRUMsU0FBUztZQUFzQztRQUMvRSxDQUFDO1FBRUQsT0FBT1osSUFBSVUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFTDtZQUFPRTtRQUFPO0lBQzlDLEVBQUUsT0FBT0ssT0FBWTtRQUNuQixJQUFJQSxNQUFNQyxRQUFRLEVBQUU7WUFDbEIsT0FBT2QsSUFBSVUsTUFBTSxDQUFDRyxNQUFNQyxRQUFRLENBQUNKLE1BQU0sRUFBRUMsSUFBSSxDQUFDO2dCQUFFQyxTQUFTQyxNQUFNQyxRQUFRLENBQUNDLElBQUksQ0FBQ0gsT0FBTztZQUFDO1FBQ3ZGLENBQUM7UUFDRCxPQUFPWixJQUFJVSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLFNBQVM7UUFBd0I7SUFDakU7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmluYW5jZW1hbmFnZXIvLi9zcmMvcGFnZXMvYXBpL2xvZ2luLnRzP2RhOWIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gJ25leHQnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IGhlYWRlcnMgfSA9IGF3YWl0IGF4aW9zLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9sb2dpbicsIHtcclxuICAgICAgZW1haWw6IHJlcS5ib2R5LmVtYWlsLFxyXG4gICAgICBwYXNzd29yZDogcmVxLmJvZHkucGFzc3dvcmQsXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0b2tlbiA9IGhlYWRlcnMuYXV0aG9yaXphdGlvbjtcclxuICAgIGNvbnN0IHVzZXJJZCA9IGhlYWRlcnMudXNlcmlkO1xyXG5cclxuICAgIGlmICghdG9rZW4gfHwgIXVzZXJJZCkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiAnVG9rZW4gb3IgdXNlciBJRCBtaXNzaW5nIGluIGhlYWRlcnMnIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHRva2VuLCB1c2VySWQgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKGVycm9yLnJlc3BvbnNlLnN0YXR1cykuanNvbih7IG1lc3NhZ2U6IGVycm9yLnJlc3BvbnNlLmRhdGEubWVzc2FnZSB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InIH0pO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiYXhpb3MiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiaGVhZGVycyIsInBvc3QiLCJlbWFpbCIsImJvZHkiLCJwYXNzd29yZCIsInRva2VuIiwiYXV0aG9yaXphdGlvbiIsInVzZXJJZCIsInVzZXJpZCIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwiZXJyb3IiLCJyZXNwb25zZSIsImRhdGEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/login.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/login.ts"));
module.exports = __webpack_exports__;

})();