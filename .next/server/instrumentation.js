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
exports.id = "instrumentation";
exports.ids = ["instrumentation"];
exports.modules = {

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "(instrument)/./src/instrumentation.ts":
/*!********************************!*\
  !*** ./src/instrumentation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   register: () => (/* binding */ register)\n/* harmony export */ });\n/**\r\n * Next.js instrumentation – runs once when the Node server starts.\r\n * Used to install FS security patch so no code (including dependencies)\r\n * can write files outside allowed directories or with suspicious names.\r\n */ async function register() {\n    if (true) {\n        const { installFsSecurityPatch } = await __webpack_require__.e(/*! import() */ \"_instrument_src_lib_fs-security-patch_ts\").then(__webpack_require__.bind(__webpack_require__, /*! @/lib/fs-security-patch */ \"(instrument)/./src/lib/fs-security-patch.ts\"));\n        installFsSecurityPatch();\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGluc3RydW1lbnQpLy4vc3JjL2luc3RydW1lbnRhdGlvbi50cyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Q0FJQyxHQUVNLGVBQWVBO0lBQ3BCLElBQUlDLElBQXFDLEVBQUU7UUFDekMsTUFBTSxFQUFFRyxzQkFBc0IsRUFBRSxHQUFHLE1BQU0sbU5BQWlDO1FBQzFFQTtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIkQ6XFx0YXNrc1xcRGFtaWVuXFxOZXcgZm9sZGVyXFx6b29tcGRmXFxzcmNcXGluc3RydW1lbnRhdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogTmV4dC5qcyBpbnN0cnVtZW50YXRpb24g4oCTIHJ1bnMgb25jZSB3aGVuIHRoZSBOb2RlIHNlcnZlciBzdGFydHMuXHJcbiAqIFVzZWQgdG8gaW5zdGFsbCBGUyBzZWN1cml0eSBwYXRjaCBzbyBubyBjb2RlIChpbmNsdWRpbmcgZGVwZW5kZW5jaWVzKVxyXG4gKiBjYW4gd3JpdGUgZmlsZXMgb3V0c2lkZSBhbGxvd2VkIGRpcmVjdG9yaWVzIG9yIHdpdGggc3VzcGljaW91cyBuYW1lcy5cclxuICovXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXIoKSB7XHJcbiAgaWYgKHByb2Nlc3MuZW52Lk5FWFRfUlVOVElNRSA9PT0gXCJub2RlanNcIikge1xyXG4gICAgY29uc3QgeyBpbnN0YWxsRnNTZWN1cml0eVBhdGNoIH0gPSBhd2FpdCBpbXBvcnQoXCJAL2xpYi9mcy1zZWN1cml0eS1wYXRjaFwiKTtcclxuICAgIGluc3RhbGxGc1NlY3VyaXR5UGF0Y2goKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbInJlZ2lzdGVyIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUlVOVElNRSIsImluc3RhbGxGc1NlY3VyaXR5UGF0Y2giXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(instrument)/./src/instrumentation.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("./webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(instrument)/./src/instrumentation.ts"));
module.exports = __webpack_exports__;

})();