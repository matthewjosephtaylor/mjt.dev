/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/ts/basics/object/Objects.ts
function updateObject(source, additional = {}) {
    const result = {};
    Object.assign(result, source);
    Object.assign(result, additional);
    return result;
}
function fromEntry(entry) {
    return Object.fromEntries([entry]);
}
function fromEntries(entries) {
    return Object.fromEntries(entries);
}
function fromEntriesMulti(entries, initial = {}) {
    return loop(entries, (entry, i, acc) => {
        const [key, value] = entry;
        let valuesMaybe = acc[key];
        if (valuesMaybe === undefined) {
            valuesMaybe = [];
            acc[key] = valuesMaybe;
        }
        valuesMaybe.push(value);
        return acc;
    }, initial);
}
function fromObjects(objects, initial = undefined) {
    if (initial === undefined) {
        initial = {};
    }
    // Object.assign(initial, source);
    if (objects !== undefined) {
        objects.forEach((obj) => {
            Object.assign(initial, obj);
        });
    }
    return initial;
}
function fromObject(source, additional = undefined, initial = undefined) {
    if (initial === undefined) {
        initial = {};
    }
    Object.assign(initial, source);
    if (additional !== undefined) {
        Object.assign(initial, additional);
    }
    return initial;
}
function isZeroSupplier(maybe) {
    return typeof maybe === "function";
}
function fromArray(sourceOrSize, zero = undefined) {
    if (sourceOrSize instanceof Array) {
        return Array.from(sourceOrSize);
    }
    if (typeof sourceOrSize === "number") {
        const sourceObject = { length: sourceOrSize };
        if (isZeroSupplier(zero)) {
            return Array.from(sourceObject, (x, i) => zero(i));
        }
        else {
            return Array.from(sourceObject, (x, i) => zero);
        }
    }
    if (sourceOrSize === undefined) {
        return [];
    }
    return [sourceOrSize];
}
function toMany(values) {
    if (values === undefined) {
        return [];
    }
    if (values instanceof Array) {
        return values;
    }
    return [values];
}
async function loopPromise(obj, action, initial) {
    let accPromise = Promise.resolve(initial);
    for (const [k, value] of Object.entries(obj)) {
        const acc = await accPromise;
        accPromise = action(value, k, acc);
    }
    return accPromise;
}
function loopFor(count, action, result) {
    for (let i = 0; i < count; i++) {
        result = action(i, result);
    }
    return result;
}
function loopMultiMap(multiMap, action, result) {
    if (multiMap === undefined) {
        return result;
    }
    loop(multiMap, (values, key) => {
        loop(toMany(values), (value, i) => {
            result = action(value, String(key), Number(i), result);
        });
    });
    return result;
}
function loop(obj, action, result) {
    if (obj === undefined) {
        return result;
    }
    for (const [k, value] of Object.entries(obj)) {
        result = action(value, k, result);
    }
    return result;
}
function loopTrace(obj, action, result) {
    console.log("looping", obj);
    for (const [k, value] of Object.entries(obj)) {
        console.log("key", k);
        console.log("value", value);
        result = action(value, k, result);
        console.log("key/value/result", k, value, result);
    }
    return result;
}
function arrayToFirstRest(arr) {
    if (arr === undefined) {
        return [undefined, undefined];
    }
    return [arr[0], arr.slice(1)];
}
function firstKey(obj) {
    if (obj === undefined) {
        return undefined;
    }
    return Object.keys(obj)[0];
}
function _valueAtIndex(values, index = 0) {
    if (values === undefined || values === null) {
        return undefined;
    }
    if (values instanceof Array) {
        return values[index];
    }
    if (typeof values === "object") {
        const keys = Object.keys(values);
        return values[keys[index]];
    }
    if (index === 0) {
        return values;
    }
    return undefined;
}
function firstValue(values, orWhat) {
    return valueAtIndex(values, 0, orWhat);
}
function firstValueOrThrow(values, errorProvider) {
    return firstValue(values, () => {
        throw errorProvider();
    });
}
function valueAtIndex(values, index = 0, orWhat = undefined) {
    let value = _valueAtIndex(values, index);
    if (value === undefined) {
        if (orWhat instanceof Array) {
            value = orWhat[index];
        }
        if (typeof orWhat === "function") {
            const orWhatFunction = orWhat;
            value = orWhatFunction(index);
        }
        else {
            value = orWhat;
        }
    }
    return value;
}
function Objects_valueOf(obj, key, defaultValue) {
    let value = obj[key];
    if (value === undefined) {
        value = defaultValue;
        obj[key] = value;
    }
    return value;
}
function valuesToValue1(args, defaultValues) {
    return [valueAtIndex(args, 0, defaultValues[0])];
}
function valuesToValue2(args, defaultValues) {
    return [
        valueAtIndex(args, 0, defaultValues[0]),
        valueAtIndex(args, 1, defaultValues[1]),
    ];
}
function valuesToValue3(args, defaultValues) {
    return [
        valueAtIndex(args, 0, defaultValues[0]),
        valueAtIndex(args, 1, defaultValues[1]),
        valueAtIndex(args, 1, defaultValues[2]),
    ];
}
function toNumbers(values) {
    return fromArray(values).map((v) => Number(v));
}
function isProducer(maybe) {
    return typeof maybe === "function";
}
function produceResult(value) {
    if (isProducer(value)) {
        return value();
    }
    return value;
}
function valueOrElse(value, orWhat) {
    let result = undefined;
    let error = undefined;
    try {
        result = produceResult(value);
    }
    catch (e) {
        e = error;
    }
    if (isNotValue(result)) {
        return produceResult(orWhat);
    }
    return result;
}
function toType(obj, typePredicate, strict = true) {
    // return clarify(
    //   `toType: obj: ${obj} ${typePredicate?.name} strict: ${strict}`,
    //   () => {
    if (!strict) {
        return obj;
    }
    if (typePredicate(obj)) {
        return obj;
    }
    throw new Error(`Unable to convert object to type using typePredicate: ${typePredicate === null || typePredicate === void 0 ? void 0 : typePredicate.name} `);
    // }
    // );
}
function safeValue(unit) {
    try {
        return unit();
    }
    catch (reason) {
        console.error(reason);
        // trace(() => reason);
    }
    return undefined;
}
function valueOrThrow(valueMaybe, message) {
    if (valueMaybe === undefined || valueMaybe === null) {
        const messageString = typeof message === "function" ? message() : message;
        throw new Error(messageString);
    }
    return valueMaybe;
}
function objectValueOrThrow(obj, key, message = () => `no key: '${key}' in object: ${ugly(obj)}`) {
    return valueOrThrow(obj[key], message);
}
function pretty(anything) {
    return JSON.stringify(anything, undefined, 2);
}
function ugly(anything) {
    return JSON.stringify(anything);
}
function isValue(maybe) {
    return maybe !== undefined && maybe !== null && !Number.isNaN(maybe);
}
function isNotValue(maybe) {
    return !isValue(maybe);
}
function isObject(maybe) {
    return isValue(maybe) && typeof maybe === "object";
}
const identity = (value) => value;
/**
 * Map value to another value, treating undefined and null as 'empty'
 * @returns undefined if value is undefined OR null, otherwise maps value using mapper function
 */
function mapValue(value, mapper, elseMapper) {
    if (isValue(value)) {
        if (typeof mapper === "function") {
            return mapper(value);
        }
        return mapper;
    }
    else {
        if (typeof elseMapper === "function") {
            return elseMapper();
        }
        return elseMapper;
    }
}

// CONCATENATED MODULE: ./src/ts/basics/html/Styles.ts

/**
 * NOTE: The setter on style may silently change/ignore the value
 * @returns the _actual_ style values that were set
 */
const update = ({ style, element, }) => {
    if (isNotValue(style)) {
        return;
    }
    const setProperties = {};
    Object.entries(style).forEach((entry) => {
        const [k, v] = entry;
        const stringValue = String(v);
        element.style[k] = stringValue;
        setProperties[k] = element[k];
        // Assertions.assert(element.style[k] === stringValue, () => [
        //   `styled value DOES NOT equal set value ${element.tagName} '${k}' : '${v}' '${element.style[k]}'`,
        // ]);
    });
    return setProperties;
};
const Styles = {
    update,
};

// CONCATENATED MODULE: ./src/ts/basics/html/Htmls.ts


function textOfElement(element) {
    return textNodesOfElement(element)
        .map((cn) => cn.textContent)
        .join();
}
function textNodesOfElement(element) {
    const result = [];
    element.childNodes.forEach((cn) => {
        if (cn.nodeType === 3) {
            result.push(cn);
        }
    });
    return result;
}
function createElement({ tagName, parent, attributes, datasets, clazz, id, style, textContent, }) {
    const element = document.createElement(tagName);
    mapValue(style, (style) => {
        Styles.update({ element, style });
    });
    mapValue(datasets, (datasets) => {
        Object.entries(datasets).forEach((entry) => {
            const [k, v] = entry;
            element.dataset[k] = v;
        });
    });
    mapValue(id, (id) => {
        element.id = id;
    });
    mapValue(attributes, (attributes) => {
        Object.entries(attributes).forEach((attr) => {
            const [name, value] = attr;
            if (isValue(value)) {
                element.setAttribute(name, value);
            }
        });
    });
    mapValue(clazz, (clazz) => {
        const clazzes = clazz.split(" ");
        element.classList.add(...clazzes);
    });
    mapValue(textContent, (textContent) => {
        element.textContent = textContent;
    });
    mapValue(parent, (parent) => {
        parent.appendChild(element);
    });
    return element;
}
const Htmls = {
    textNodesOfElement,
    textOfElement,
    createElement,
};

// CONCATENATED MODULE: ./src/ts/artpage/index.ts


// const testMarketing: Marketing = {
//   title: "Work in Progress",
//   backgroundColor: "black",
//   textColor: "white",
//   hashTag: ["abstractdigitalart", "newaesthetic", "newmediaart", "nft"],
//   property: {
//     artist: "Matthew Joseph Taylor",
//     mediatype: "image/png",
//     style: ["Abstract", "Digital", "Vector"],
//     year: "2021",
//   },
//   action: [
//     {
//       callToAction: "Buy on Opensea",
//       url: "foo.bar/baz",
//     },
//     {
//       callToAction: "Like on insta",
//       url: "insta.io/blah",
//     },
//   ],
// };
const updatePage = () => {
    const artFootElement = document.body.querySelector(".art.foot");
    const artHeadElement = document.body.querySelector(".art.head");
    const artContentElement = document.body.querySelector(".art.content");
    const artPageElement = document.body;
    // const artId = "art-1h4ju0o-kmpc72fp";
    fetch("./marketing.json")
        .then((response) => response.json())
        .then((marketing) => {
        console.log("marketing json", marketing);
        // marketing = testMarketing;
        const { backgroundColor, textColor, artId } = marketing;
        artPageElement.style.backgroundColor = backgroundColor;
        artPageElement.style.color = textColor;
        updateTitle({
            parent: artHeadElement,
            title: marketing.title,
        });
        updateContent({
            parent: artContentElement,
            artId,
        });
        updateProperties({
            parent: artFootElement,
            properties: marketing.property,
        });
        updateHashtags({ parent: artFootElement, hashtags: marketing.hashTag });
        updateActions({ parent: artFootElement, actions: marketing.action });
    })
        .catch((error) => {
        console.log(error);
        console.log("no marketing.json found");
    });
};
function updateProperties({ properties, parent, }) {
    const propertiesElement = Htmls.createElement({
        parent,
        tagName: "div",
        clazz: "art properties",
    });
    Object.entries(properties).forEach((prop) => {
        const [key, value] = prop;
        Htmls.createElement({
            parent: propertiesElement,
            tagName: "span",
            textContent: key,
        });
        Htmls.createElement({
            parent: propertiesElement,
            tagName: "span",
            textContent: toMany(value).join(","),
        });
    });
}
function updateHashtags({ hashtags, parent, }) {
    const tagsElement = Htmls.createElement({
        parent,
        tagName: "div",
        clazz: "art hashtags",
    });
    const combinedTags = [];
    if (Array.isArray(hashtags)) {
        combinedTags.push(...hashtags);
    }
    if (typeof hashtags === "object") {
        combinedTags.push(...Object.entries(hashtags).flatMap(([marketplace, tags]) => {
            return tags;
        }));
    }
    combinedTags.forEach((hashtag) => {
        Htmls.createElement({
            parent: tagsElement,
            tagName: "div",
            textContent: `#${hashtag}`,
        });
    });
}
function updateTitle({ parent, title, }) {
    Htmls.createElement({
        parent,
        tagName: "a",
        textContent: "Back",
        clazz: "back",
        attributes: { href: "../" },
    });
    Htmls.createElement({
        parent,
        tagName: "span",
        textContent: title,
        clazz: "title",
    });
}
function updateActions({ parent, actions, }) {
    const actionsElement = Htmls.createElement({
        parent,
        tagName: "div",
        clazz: "art actions",
    });
    actions.forEach((action) => {
        const { callToAction, url } = action;
        Htmls.createElement({
            parent: actionsElement,
            tagName: "a",
            textContent: callToAction,
            attributes: { href: url },
        });
    });
}
function updateContent({ parent, artId, }) {
    Htmls.createElement({
        parent,
        tagName: "img",
        attributes: {
            src: `image-${artId}.png`,
        },
    });
}
(() => {
    console.log("Thank you for viewing my art :)");
    updatePage();
})();


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2Jhc2ljcy9vYmplY3QvT2JqZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvYmFzaWNzL2h0bWwvU3R5bGVzLnRzIiwid2VicGFjazovLy8uL3NyYy90cy9iYXNpY3MvaHRtbC9IdG1scy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvYXJ0cGFnZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUM5RU8sU0FBUyxZQUFZLENBQUksTUFBUyxFQUFFLGFBQWtCLEVBQUU7SUFDN0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFF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QUFFLFNBQVMsS0FBSyxNQUFNO1NBQzFCO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELENBQUMsR0FBRyxFQUFFO0lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQy9DLFVBQVUsRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IHsgTWFwcGVyLCBTdXBwbGllciB9IGZyb20gXCJiYXNpY3MvZnVuY3Rpb24vRnVuY3Rpb25zXCI7XG5cbmV4cG9ydCB0eXBlIFR5cGVQcmVkaWNhdGU8VCA9IG9iamVjdD4gPSAobWF5YmU6IHVua25vd24pID0+IG1heWJlIGlzIFQ7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVPYmplY3Q8VD4oc291cmNlOiBULCBhZGRpdGlvbmFsOiBhbnkgPSB7fSk6IFQge1xuICBjb25zdCByZXN1bHQgPSB7fTtcbiAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHNvdXJjZSk7XG4gIE9iamVjdC5hc3NpZ24ocmVzdWx0LCBhZGRpdGlvbmFsKTtcbiAgcmV0dXJuIHJlc3VsdCBhcyBUO1xufVxuXG5leHBvcnQgdHlwZSBPYmplY3RFbnRyeTxUPiA9IFtzdHJpbmcsIFRdO1xuZXhwb3J0IHR5cGUgT2JqZWN0RW50cmllczxUPiA9IE9iamVjdEVudHJ5PFQ+W107XG5leHBvcnQgdHlwZSBQcm9kdWNlcjxUPiA9ICgpID0+IFQ7XG5leHBvcnQgdHlwZSBWYWx1ZU9yUHJvZHVjZXI8VD4gPSBUIHwgUHJvZHVjZXI8VD47XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tRW50cnk8VD4oZW50cnk6IFtrZXk6IHN0cmluZywgdmFsdWU6IFRdKSB7XG4gIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoW2VudHJ5XSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tRW50cmllczxUPihcbiAgZW50cmllczogT2JqZWN0RW50cmllczxUPlxuKTogeyBbayBpbiBzdHJpbmddOiBUIH0ge1xuICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKGVudHJpZXMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21FbnRyaWVzTXVsdGk8VD4oXG4gIGVudHJpZXM6IE9iamVjdEVudHJpZXM8VD4sXG4gIGluaXRpYWw6IHsgW2sgaW4gc3RyaW5nXTogVFtdIH0gPSB7fVxuKTogeyBbayBpbiBzdHJpbmddOiBUW10gfSB7XG4gIHJldHVybiBsb29wKFxuICAgIGVudHJpZXMsXG4gICAgKGVudHJ5LCBpLCBhY2MpID0+IHtcbiAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGVudHJ5O1xuICAgICAgbGV0IHZhbHVlc01heWJlOiBUW10gPSBhY2Nba2V5XTtcbiAgICAgIGlmICh2YWx1ZXNNYXliZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlc01heWJlID0gW107XG4gICAgICAgIGFjY1trZXldID0gdmFsdWVzTWF5YmU7XG4gICAgICB9XG4gICAgICB2YWx1ZXNNYXliZS5wdXNoKHZhbHVlKTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSxcbiAgICBpbml0aWFsXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tT2JqZWN0czxULCBBIGV4dGVuZHMgb2JqZWN0LCBJIGV4dGVuZHMgb2JqZWN0PihcbiAgb2JqZWN0czogQVtdLFxuICBpbml0aWFsOiBJID0gdW5kZWZpbmVkXG4pOiBUICYgQSAmIEkge1xuICBpZiAoaW5pdGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaW5pdGlhbCA9IHt9IGFzIEk7XG4gIH1cbiAgLy8gT2JqZWN0LmFzc2lnbihpbml0aWFsLCBzb3VyY2UpO1xuICBpZiAob2JqZWN0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgb2JqZWN0cy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgIE9iamVjdC5hc3NpZ24oaW5pdGlhbCwgb2JqKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBpbml0aWFsIGFzIFQgJiBBICYgSTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21PYmplY3Q8VCwgQSwgST4oXG4gIHNvdXJjZTogVCxcbiAgYWRkaXRpb25hbDogQSA9IHVuZGVmaW5lZCxcbiAgaW5pdGlhbDogSSA9IHVuZGVmaW5lZFxuKTogVCAmIEEgJiBJIHtcbiAgaWYgKGluaXRpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIGluaXRpYWwgPSB7fSBhcyBJO1xuICB9XG4gIE9iamVjdC5hc3NpZ24oaW5pdGlhbCwgc291cmNlKTtcbiAgaWYgKGFkZGl0aW9uYWwgIT09IHVuZGVmaW5lZCkge1xuICAgIE9iamVjdC5hc3NpZ24oaW5pdGlhbCwgYWRkaXRpb25hbCk7XG4gIH1cbiAgcmV0dXJuIGluaXRpYWwgYXMgVCAmIEEgJiBJO1xufVxuXG50eXBlIFplcm9TdXBwbGllcjxUPiA9IChpbmRleDogbnVtYmVyKSA9PiBUO1xuXG5mdW5jdGlvbiBpc1plcm9TdXBwbGllcjxUPihtYXliZTogdW5rbm93bik6IG1heWJlIGlzIFplcm9TdXBwbGllcjxUPiB7XG4gIHJldHVybiB0eXBlb2YgbWF5YmUgPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21BcnJheTxUPihcbiAgc291cmNlT3JTaXplOiBUIHwgQXJyYXk8VD4gfCBudW1iZXIsXG4gIHplcm86IFplcm9TdXBwbGllcjxUPiB8IFQgPSB1bmRlZmluZWRcbik6IEFycmF5PFQ+IHtcbiAgaWYgKHNvdXJjZU9yU2l6ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oc291cmNlT3JTaXplKTtcbiAgfVxuICBpZiAodHlwZW9mIHNvdXJjZU9yU2l6ZSA9PT0gXCJudW1iZXJcIikge1xuICAgIGNvbnN0IHNvdXJjZU9iamVjdCA9IHsgbGVuZ3RoOiBzb3VyY2VPclNpemUgfTtcbiAgICBpZiAoaXNaZXJvU3VwcGxpZXIoemVybykpIHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHNvdXJjZU9iamVjdCwgKHgsIGkpID0+IHplcm8oaSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShzb3VyY2VPYmplY3QsICh4LCBpKSA9PiB6ZXJvKTtcbiAgICB9XG4gIH1cbiAgaWYgKHNvdXJjZU9yU2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHJldHVybiBbc291cmNlT3JTaXplXSBhcyBBcnJheTxUPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvTWFueTxUPih2YWx1ZXM6IFQgfCBUW10pIHtcbiAgaWYgKHZhbHVlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICh2YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHJldHVybiB2YWx1ZXM7XG4gIH1cbiAgcmV0dXJuIFt2YWx1ZXNdO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9vcFByb21pc2U8ViwgUj4oXG4gIG9iajogeyBbayBpbiBzdHJpbmddOiBWIH0gfCBWW10gfCBJbmRleGFibGU8Vj4sXG4gIGFjdGlvbjogKHY6IFYsIGs6IHN0cmluZyB8IG51bWJlciwgcjogUikgPT4gUHJvbWlzZTxSPixcbiAgaW5pdGlhbD86IFJcbik6IFByb21pc2U8Uj4ge1xuICBsZXQgYWNjUHJvbWlzZTogUHJvbWlzZTxSPiA9IFByb21pc2UucmVzb2x2ZShpbml0aWFsKTtcbiAgZm9yIChjb25zdCBbaywgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iaikpIHtcbiAgICBjb25zdCBhY2MgPSBhd2FpdCBhY2NQcm9taXNlO1xuICAgIGFjY1Byb21pc2UgPSBhY3Rpb24odmFsdWUsIGssIGFjYyk7XG4gIH1cbiAgcmV0dXJuIGFjY1Byb21pc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb29wRm9yPFI+KFxuICBjb3VudDogbnVtYmVyLFxuICBhY3Rpb246IChpOiBudW1iZXIsIHI6IFIpID0+IFIsXG4gIHJlc3VsdD86IFJcbik6IFIge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICByZXN1bHQgPSBhY3Rpb24oaSwgcmVzdWx0KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgdHlwZSBNdWx0aU1hcDxUPiA9IHtcbiAgW2sgaW4gc3RyaW5nXTogVCB8IFRbXTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBsb29wTXVsdGlNYXA8ViwgUj4oXG4gIG11bHRpTWFwOiBNdWx0aU1hcDxWPixcbiAgYWN0aW9uOiAodmFsdWU6IFYsIGtleTogc3RyaW5nLCB2YWx1ZUluZGV4OiBudW1iZXIsIGFjYzogUikgPT4gUixcbiAgcmVzdWx0PzogUlxuKSB7XG4gIGlmIChtdWx0aU1hcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBsb29wKG11bHRpTWFwLCAodmFsdWVzLCBrZXkpID0+IHtcbiAgICBsb29wKHRvTWFueSh2YWx1ZXMpLCAodmFsdWUsIGkpID0+IHtcbiAgICAgIHJlc3VsdCA9IGFjdGlvbih2YWx1ZSwgU3RyaW5nKGtleSksIE51bWJlcihpKSwgcmVzdWx0KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCB0eXBlIEluZGV4YWJsZTxUPiA9IHtcbiAgbGVuZ3RoOiBudW1iZXI7XG4gIGl0ZW06IChpbmRleDogbnVtYmVyKSA9PiBUIHwgbnVsbCB8IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBsb29wPFYsIFI+KFxuICBvYmo6IHsgW2s6IHN0cmluZ106IFYgfSB8IFZbXSB8IEluZGV4YWJsZTxWPixcbiAgYWN0aW9uOiAodjogViwgazogc3RyaW5nIHwgbnVtYmVyLCByOiBSKSA9PiBSLFxuICByZXN1bHQ/OiBSXG4pOiBSIHtcbiAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBmb3IgKGNvbnN0IFtrLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgIHJlc3VsdCA9IGFjdGlvbih2YWx1ZSwgaywgcmVzdWx0KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9vcFRyYWNlPFYsIFI+KFxuICBvYmo6IHsgW2sgaW4gc3RyaW5nXTogViB9IHwgVltdLFxuICBhY3Rpb246ICh2OiBWLCBrOiBzdHJpbmcsIHI6IFIpID0+IFIsXG4gIHJlc3VsdD86IFJcbik6IFIge1xuICBjb25zb2xlLmxvZyhcImxvb3BpbmdcIiwgb2JqKTtcbiAgZm9yIChjb25zdCBbaywgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iaikpIHtcbiAgICBjb25zb2xlLmxvZyhcImtleVwiLCBrKTtcbiAgICBjb25zb2xlLmxvZyhcInZhbHVlXCIsIHZhbHVlKTtcbiAgICByZXN1bHQgPSBhY3Rpb24odmFsdWUsIGssIHJlc3VsdCk7XG4gICAgY29uc29sZS5sb2coXCJrZXkvdmFsdWUvcmVzdWx0XCIsIGssIHZhbHVlLCByZXN1bHQpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheVRvRmlyc3RSZXN0PFQ+KGFycjogVFtdKTogW1QsIFRbXV0ge1xuICBpZiAoYXJyID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gW3VuZGVmaW5lZCwgdW5kZWZpbmVkXTtcbiAgfVxuICByZXR1cm4gW2FyclswXSwgYXJyLnNsaWNlKDEpXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0S2V5KG9iajogb2JqZWN0KTogc3RyaW5nIHtcbiAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKVswXTtcbn1cblxuZnVuY3Rpb24gX3ZhbHVlQXRJbmRleDxUPih2YWx1ZXM6IFZhbHVlQ29udGFpbmVyPFQ+LCBpbmRleDogbnVtYmVyID0gMCk6IFQge1xuICBpZiAodmFsdWVzID09PSB1bmRlZmluZWQgfHwgdmFsdWVzID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBpZiAodmFsdWVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICByZXR1cm4gdmFsdWVzW2luZGV4XTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlcyA9PT0gXCJvYmplY3RcIikge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZXMpO1xuICAgIHJldHVybiB2YWx1ZXNba2V5c1tpbmRleF1dO1xuICB9XG4gIGlmIChpbmRleCA9PT0gMCkge1xuICAgIHJldHVybiB2YWx1ZXM7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0VmFsdWU8VD4oXG4gIHZhbHVlczogVmFsdWVDb250YWluZXI8VD4sXG4gIG9yV2hhdD86IE9yV2hhdDxUPlxuKTogVCB7XG4gIHJldHVybiB2YWx1ZUF0SW5kZXgodmFsdWVzLCAwLCBvcldoYXQpO1xufVxuXG5leHBvcnQgdHlwZSBWYWx1ZUNvbnRhaW5lcjxUPiA9IFQgfCBUW10gfCB7IFtrIGluIHN0cmluZ106IFQgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0VmFsdWVPclRocm93PFQ+KFxuICB2YWx1ZXM6IFZhbHVlQ29udGFpbmVyPFQ+LFxuICBlcnJvclByb3ZpZGVyOiAoKSA9PiBFcnJvclxuKTogVCB7XG4gIHJldHVybiBmaXJzdFZhbHVlKHZhbHVlcywgKCkgPT4ge1xuICAgIHRocm93IGVycm9yUHJvdmlkZXIoKTtcbiAgfSkgYXMgVDtcbn1cblxuZXhwb3J0IHR5cGUgSW5kZXhUb1ZhbHVlPFQ+ID0gKGluZGV4PzogbnVtYmVyKSA9PiBUO1xuZXhwb3J0IHR5cGUgT3JXaGF0PFQ+ID0gVCB8IFRbXSB8IEluZGV4VG9WYWx1ZTxUPjtcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlQXRJbmRleDxUPihcbiAgdmFsdWVzOiBWYWx1ZUNvbnRhaW5lcjxUPixcbiAgaW5kZXg6IG51bWJlciA9IDAsXG4gIG9yV2hhdDogT3JXaGF0PFQ+ID0gdW5kZWZpbmVkXG4pOiBUIHtcbiAgbGV0IHZhbHVlID0gX3ZhbHVlQXRJbmRleCh2YWx1ZXMsIGluZGV4KTtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICBpZiAob3JXaGF0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHZhbHVlID0gb3JXaGF0W2luZGV4XTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcldoYXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY29uc3Qgb3JXaGF0RnVuY3Rpb246IEluZGV4VG9WYWx1ZTxUPiA9IG9yV2hhdCBhcyBJbmRleFRvVmFsdWU8VD47XG4gICAgICB2YWx1ZSA9IG9yV2hhdEZ1bmN0aW9uKGluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSBvcldoYXQgYXMgVDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsdWVPZjxUPihvYmo6IG9iamVjdCwga2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogVCk6IFQge1xuICBsZXQgdmFsdWUgPSBvYmpba2V5XTtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICB2YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlc1RvVmFsdWUxPFQ+KGFyZ3M6IFQgfCBbVF0sIGRlZmF1bHRWYWx1ZXM6IFtUXSk6IFtUXSB7XG4gIHJldHVybiBbdmFsdWVBdEluZGV4KGFyZ3MsIDAsIGRlZmF1bHRWYWx1ZXNbMF0pXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlc1RvVmFsdWUyPFQxLCBUMj4oXG4gIGFyZ3M6IFtUMSwgVDJdLFxuICBkZWZhdWx0VmFsdWVzOiBbVDEsIFQyXVxuKTogW1QxLCBUMl0ge1xuICByZXR1cm4gW1xuICAgIHZhbHVlQXRJbmRleChhcmdzIGFzIFQxW10sIDAsIGRlZmF1bHRWYWx1ZXNbMF0pLFxuICAgIHZhbHVlQXRJbmRleChhcmdzIGFzIFQyW10sIDEsIGRlZmF1bHRWYWx1ZXNbMV0pLFxuICBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsdWVzVG9WYWx1ZTM8VDEsIFQyLCBUMz4oXG4gIGFyZ3M6IFQxW10gfCBUMltdIHwgVDNbXSxcbiAgZGVmYXVsdFZhbHVlczogW1QxLCBUMiwgVDNdXG4pOiBbVDEsIFQyLCBUM10ge1xuICByZXR1cm4gW1xuICAgIHZhbHVlQXRJbmRleChhcmdzIGFzIFQxW10sIDAsIGRlZmF1bHRWYWx1ZXNbMF0pLFxuICAgIHZhbHVlQXRJbmRleChhcmdzIGFzIFQyW10sIDEsIGRlZmF1bHRWYWx1ZXNbMV0pLFxuICAgIHZhbHVlQXRJbmRleChhcmdzIGFzIFQzW10sIDEsIGRlZmF1bHRWYWx1ZXNbMl0pLFxuICBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9OdW1iZXJzKHZhbHVlczogYW55W10pOiBudW1iZXJbXSB7XG4gIHJldHVybiBmcm9tQXJyYXkodmFsdWVzKS5tYXAoKHYpID0+IE51bWJlcih2KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb2R1Y2VyPFQ+KG1heWJlOiBhbnkpOiBtYXliZSBpcyBQcm9kdWNlcjxUPiB7XG4gIHJldHVybiB0eXBlb2YgbWF5YmUgPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2R1Y2VSZXN1bHQ8VD4odmFsdWU6IFZhbHVlT3JQcm9kdWNlcjxUPik6IFQge1xuICBpZiAoaXNQcm9kdWNlcih2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUoKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZU9yRWxzZTxUPihcbiAgdmFsdWU6IFZhbHVlT3JQcm9kdWNlcjxUPixcbiAgb3JXaGF0OiBWYWx1ZU9yUHJvZHVjZXI8VD5cbik6IFQge1xuICBsZXQgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICBsZXQgZXJyb3IgPSB1bmRlZmluZWQ7XG4gIHRyeSB7XG4gICAgcmVzdWx0ID0gcHJvZHVjZVJlc3VsdCh2YWx1ZSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBlID0gZXJyb3I7XG4gIH1cbiAgaWYgKGlzTm90VmFsdWUocmVzdWx0KSkge1xuICAgIHJldHVybiBwcm9kdWNlUmVzdWx0KG9yV2hhdCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvVHlwZTxUPihcbiAgb2JqOiBhbnksXG4gIHR5cGVQcmVkaWNhdGU6IFR5cGVQcmVkaWNhdGU8VD4sXG4gIHN0cmljdDogYm9vbGVhbiA9IHRydWVcbik6IFQge1xuICAvLyByZXR1cm4gY2xhcmlmeShcbiAgLy8gICBgdG9UeXBlOiBvYmo6ICR7b2JqfSAke3R5cGVQcmVkaWNhdGU/Lm5hbWV9IHN0cmljdDogJHtzdHJpY3R9YCxcbiAgLy8gICAoKSA9PiB7XG4gIGlmICghc3RyaWN0KSB7XG4gICAgcmV0dXJuIG9iaiBhcyBUO1xuICB9XG4gIGlmICh0eXBlUHJlZGljYXRlKG9iaikpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICBgVW5hYmxlIHRvIGNvbnZlcnQgb2JqZWN0IHRvIHR5cGUgdXNpbmcgdHlwZVByZWRpY2F0ZTogJHt0eXBlUHJlZGljYXRlPy5uYW1lfSBgXG4gICk7XG4gIC8vIH1cbiAgLy8gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVWYWx1ZTxUPih1bml0OiAoKSA9PiBUKTogVCB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHVuaXQoKTtcbiAgfSBjYXRjaCAocmVhc29uKSB7XG4gICAgY29uc29sZS5lcnJvcihyZWFzb24pO1xuICAgIC8vIHRyYWNlKCgpID0+IHJlYXNvbik7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlT3JUaHJvdzxUPihcbiAgdmFsdWVNYXliZTogVCxcbiAgbWVzc2FnZTogc3RyaW5nIHwgKCgpID0+IHN0cmluZylcbik6IFQge1xuICBpZiAodmFsdWVNYXliZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlTWF5YmUgPT09IG51bGwpIHtcbiAgICBjb25zdCBtZXNzYWdlU3RyaW5nID0gdHlwZW9mIG1lc3NhZ2UgPT09IFwiZnVuY3Rpb25cIiA/IG1lc3NhZ2UoKSA6IG1lc3NhZ2U7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2VTdHJpbmcpO1xuICB9XG4gIHJldHVybiB2YWx1ZU1heWJlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0VmFsdWVPclRocm93PFQ+KFxuICBvYmo6IHsgW2sgaW4gc3RyaW5nXTogVCB9LFxuICBrZXk6IHN0cmluZyxcbiAgbWVzc2FnZTogc3RyaW5nIHwgKCgpID0+IHN0cmluZykgPSAoKSA9PlxuICAgIGBubyBrZXk6ICcke2tleX0nIGluIG9iamVjdDogJHt1Z2x5KG9iail9YFxuKTogVCB7XG4gIHJldHVybiB2YWx1ZU9yVGhyb3cob2JqW2tleV0sIG1lc3NhZ2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJldHR5KGFueXRoaW5nOiBhbnkpOiBzdHJpbmcge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYW55dGhpbmcsIHVuZGVmaW5lZCwgMik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1Z2x5KGFueXRoaW5nOiBhbnkpOiBzdHJpbmcge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYW55dGhpbmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWx1ZShtYXliZTogdW5rbm93bik6IGJvb2xlYW4ge1xuICByZXR1cm4gbWF5YmUgIT09IHVuZGVmaW5lZCAmJiBtYXliZSAhPT0gbnVsbCAmJiAhTnVtYmVyLmlzTmFOKG1heWJlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTm90VmFsdWUobWF5YmU6IHVua25vd24pOiBib29sZWFuIHtcbiAgcmV0dXJuICFpc1ZhbHVlKG1heWJlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KG1heWJlOiB1bmtub3duKTogbWF5YmUgaXMgb2JqZWN0IHtcbiAgcmV0dXJuIGlzVmFsdWUobWF5YmUpICYmIHR5cGVvZiBtYXliZSA9PT0gXCJvYmplY3RcIjtcbn1cblxuZXhwb3J0IGNvbnN0IGlkZW50aXR5ID0gPFQ+KHZhbHVlOiBUKSA9PiB2YWx1ZTtcblxuZXhwb3J0IHR5cGUgUHJpbWl0aXZlID0gc3RyaW5nIHwgbnVtYmVyIHwgYmlnaW50IHwgYm9vbGVhbiB8IHN5bWJvbDtcblxuLyoqXG4gKiBNYXAgdmFsdWUgdG8gYW5vdGhlciB2YWx1ZSwgdHJlYXRpbmcgdW5kZWZpbmVkIGFuZCBudWxsIGFzICdlbXB0eSdcbiAqIEByZXR1cm5zIHVuZGVmaW5lZCBpZiB2YWx1ZSBpcyB1bmRlZmluZWQgT1IgbnVsbCwgb3RoZXJ3aXNlIG1hcHMgdmFsdWUgdXNpbmcgbWFwcGVyIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXBWYWx1ZTxULCBSPihcbiAgdmFsdWU6IFQsXG4gIG1hcHBlcjogUiB8IE1hcHBlcjxULCBSPixcbiAgZWxzZU1hcHBlcj86IFIgfCBTdXBwbGllcjxSPlxuKTogUiB7XG4gIGlmIChpc1ZhbHVlKHZhbHVlKSkge1xuICAgIGlmICh0eXBlb2YgbWFwcGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiAobWFwcGVyIGFzIEZ1bmN0aW9uKSh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBtYXBwZXI7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBlbHNlTWFwcGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiAoZWxzZU1hcHBlciBhcyBGdW5jdGlvbikoKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsc2VNYXBwZXI7XG4gIH1cbn1cbiIsImltcG9ydCB7IGlzTm90VmFsdWUgfSBmcm9tIFwiYmFzaWNzL29iamVjdC9PYmplY3RzXCI7XG5pbXBvcnQgKiBhcyBDU1MgZnJvbSBcImNzc3R5cGVcIjtcblxuLyoqXG4gKiBOT1RFOiBUaGUgc2V0dGVyIG9uIHN0eWxlIG1heSBzaWxlbnRseSBjaGFuZ2UvaWdub3JlIHRoZSB2YWx1ZVxuICogQHJldHVybnMgdGhlIF9hY3R1YWxfIHN0eWxlIHZhbHVlcyB0aGF0IHdlcmUgc2V0XG4gKi9cbmNvbnN0IHVwZGF0ZSA9ICh7XG4gIHN0eWxlLFxuICBlbGVtZW50LFxufToge1xuICBzdHlsZT86IENTUy5Qcm9wZXJ0aWVzO1xuICBlbGVtZW50OiBIVE1MRWxlbWVudCB8IFNWR0VsZW1lbnQ7XG59KTogQ1NTLlByb3BlcnRpZXMgPT4ge1xuICBpZiAoaXNOb3RWYWx1ZShzdHlsZSkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qgc2V0UHJvcGVydGllczogQ1NTLlByb3BlcnRpZXMgPSB7fTtcbiAgT2JqZWN0LmVudHJpZXMoc3R5bGUpLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgY29uc3QgW2ssIHZdID0gZW50cnk7XG4gICAgY29uc3Qgc3RyaW5nVmFsdWUgPSBTdHJpbmcodik7XG4gICAgZWxlbWVudC5zdHlsZVtrXSA9IHN0cmluZ1ZhbHVlO1xuICAgIHNldFByb3BlcnRpZXNba10gPSBlbGVtZW50W2tdO1xuICAgIC8vIEFzc2VydGlvbnMuYXNzZXJ0KGVsZW1lbnQuc3R5bGVba10gPT09IHN0cmluZ1ZhbHVlLCAoKSA9PiBbXG4gICAgLy8gICBgc3R5bGVkIHZhbHVlIERPRVMgTk9UIGVxdWFsIHNldCB2YWx1ZSAke2VsZW1lbnQudGFnTmFtZX0gJyR7a30nIDogJyR7dn0nICcke2VsZW1lbnQuc3R5bGVba119J2AsXG4gICAgLy8gXSk7XG4gIH0pO1xuICByZXR1cm4gc2V0UHJvcGVydGllcztcbn07XG5cbmV4cG9ydCBjb25zdCBTdHlsZXMgPSB7XG4gIHVwZGF0ZSxcbn07XG4iLCJpbXBvcnQgeyBTdHlsZXMgfSBmcm9tIFwiYmFzaWNzL2h0bWwvU3R5bGVzXCI7XG5pbXBvcnQgeyBtYXBWYWx1ZSwgaXNWYWx1ZSB9IGZyb20gXCJiYXNpY3Mvb2JqZWN0L09iamVjdHNcIjtcbmltcG9ydCB7IFN2Z0F0dHJpYnV0ZXMgfSBmcm9tIFwiY3NzdHlwZVwiO1xuaW1wb3J0IHsgR3VpU3R5bGUgfSBmcm9tIFwic3luL2d1aS9HdWlTdHlsZVwiO1xuXG5mdW5jdGlvbiB0ZXh0T2ZFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgcmV0dXJuIHRleHROb2Rlc09mRWxlbWVudChlbGVtZW50KVxuICAgIC5tYXAoKGNuKSA9PiBjbi50ZXh0Q29udGVudClcbiAgICAuam9pbigpO1xufVxuZnVuY3Rpb24gdGV4dE5vZGVzT2ZFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogQ2hpbGROb2RlW10ge1xuICBjb25zdCByZXN1bHQ6IENoaWxkTm9kZVtdID0gW107XG4gIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKChjbikgPT4ge1xuICAgIGlmIChjbi5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgcmVzdWx0LnB1c2goY24pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQ8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4oe1xuICB0YWdOYW1lLFxuICBwYXJlbnQsXG4gIGF0dHJpYnV0ZXMsXG4gIGRhdGFzZXRzLFxuICBjbGF6eixcbiAgaWQsXG4gIHN0eWxlLFxuICB0ZXh0Q29udGVudCxcbn06IFBhcnRpYWw8e1xuICB0ZXh0Q29udGVudDogc3RyaW5nO1xuICBzdHlsZTogR3VpU3R5bGU7XG4gIHRhZ05hbWU6IEs7XG4gIHBhcmVudDogSFRNTEVsZW1lbnQ7XG4gIGF0dHJpYnV0ZXM6IHVua25vd247XG4gIGRhdGFzZXRzOiB7IFtrIGluIHN0cmluZ106IHN0cmluZyB9O1xuICBjbGF6ejogc3RyaW5nO1xuICBpZDogc3RyaW5nO1xufT4pOiBIVE1MRWxlbWVudFRhZ05hbWVNYXBbS10ge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgbWFwVmFsdWUoc3R5bGUsIChzdHlsZSkgPT4ge1xuICAgIFN0eWxlcy51cGRhdGUoeyBlbGVtZW50LCBzdHlsZSB9KTtcbiAgfSk7XG4gIG1hcFZhbHVlKGRhdGFzZXRzLCAoZGF0YXNldHMpID0+IHtcbiAgICBPYmplY3QuZW50cmllcyhkYXRhc2V0cykuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IFtrLCB2XSA9IGVudHJ5O1xuICAgICAgZWxlbWVudC5kYXRhc2V0W2tdID0gdjtcbiAgICB9KTtcbiAgfSk7XG4gIG1hcFZhbHVlKGlkLCAoaWQpID0+IHtcbiAgICBlbGVtZW50LmlkID0gaWQ7XG4gIH0pO1xuICBtYXBWYWx1ZShhdHRyaWJ1dGVzLCAoYXR0cmlidXRlcykgPT4ge1xuICAgIE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXMpLmZvckVhY2goKGF0dHIpID0+IHtcbiAgICAgIGNvbnN0IFtuYW1lLCB2YWx1ZV0gPSBhdHRyO1xuICAgICAgaWYgKGlzVmFsdWUodmFsdWUpKSB7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgbWFwVmFsdWUoY2xhenosIChjbGF6eikgPT4ge1xuICAgIGNvbnN0IGNsYXp6ZXMgPSBjbGF6ei5zcGxpdChcIiBcIik7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNsYXp6ZXMpO1xuICB9KTtcbiAgbWFwVmFsdWUodGV4dENvbnRlbnQsICh0ZXh0Q29udGVudCkgPT4ge1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcbiAgfSk7XG4gIG1hcFZhbHVlKHBhcmVudCwgKHBhcmVudCkgPT4ge1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgfSk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5leHBvcnQgY29uc3QgSHRtbHMgPSB7XG4gIHRleHROb2Rlc09mRWxlbWVudCxcbiAgdGV4dE9mRWxlbWVudCxcbiAgY3JlYXRlRWxlbWVudCxcbn07XG4iLCJpbXBvcnQgeyBIdG1scyB9IGZyb20gXCJiYXNpY3MvaHRtbC9IdG1sc1wiO1xuaW1wb3J0IHsgdG9NYW55IH0gZnJvbSBcImJhc2ljcy9vYmplY3QvT2JqZWN0c1wiO1xuaW1wb3J0IHtcbiAgQXJ0QWN0aW9uLFxuICBBcnRIYXNoVGFnLFxuICBBcnRQcm9wcnRpZXMsXG4gIE1hcmtldGluZyxcbn0gZnJvbSBcInByb2R1Y3Rpb24vYXJ0L01hcmtldGluZ1wiO1xuXG4vLyBjb25zdCB0ZXN0TWFya2V0aW5nOiBNYXJrZXRpbmcgPSB7XG4vLyAgIHRpdGxlOiBcIldvcmsgaW4gUHJvZ3Jlc3NcIixcbi8vICAgYmFja2dyb3VuZENvbG9yOiBcImJsYWNrXCIsXG4vLyAgIHRleHRDb2xvcjogXCJ3aGl0ZVwiLFxuLy8gICBoYXNoVGFnOiBbXCJhYnN0cmFjdGRpZ2l0YWxhcnRcIiwgXCJuZXdhZXN0aGV0aWNcIiwgXCJuZXdtZWRpYWFydFwiLCBcIm5mdFwiXSxcbi8vICAgcHJvcGVydHk6IHtcbi8vICAgICBhcnRpc3Q6IFwiTWF0dGhldyBKb3NlcGggVGF5bG9yXCIsXG4vLyAgICAgbWVkaWF0eXBlOiBcImltYWdlL3BuZ1wiLFxuLy8gICAgIHN0eWxlOiBbXCJBYnN0cmFjdFwiLCBcIkRpZ2l0YWxcIiwgXCJWZWN0b3JcIl0sXG4vLyAgICAgeWVhcjogXCIyMDIxXCIsXG4vLyAgIH0sXG4vLyAgIGFjdGlvbjogW1xuLy8gICAgIHtcbi8vICAgICAgIGNhbGxUb0FjdGlvbjogXCJCdXkgb24gT3BlbnNlYVwiLFxuLy8gICAgICAgdXJsOiBcImZvby5iYXIvYmF6XCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICBjYWxsVG9BY3Rpb246IFwiTGlrZSBvbiBpbnN0YVwiLFxuLy8gICAgICAgdXJsOiBcImluc3RhLmlvL2JsYWhcIixcbi8vICAgICB9LFxuLy8gICBdLFxuLy8gfTtcblxuY29uc3QgdXBkYXRlUGFnZSA9ICgpID0+IHtcbiAgY29uc3QgYXJ0Rm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiLmFydC5mb290XCIpO1xuICBjb25zdCBhcnRIZWFkRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoXCIuYXJ0LmhlYWRcIik7XG4gIGNvbnN0IGFydENvbnRlbnRFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihcbiAgICBcIi5hcnQuY29udGVudFwiXG4gICk7XG4gIGNvbnN0IGFydFBhZ2VFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG4gIC8vIGNvbnN0IGFydElkID0gXCJhcnQtMWg0anUwby1rbXBjNzJmcFwiO1xuXG4gIGZldGNoKFwiLi9tYXJrZXRpbmcuanNvblwiKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChtYXJrZXRpbmc6IE1hcmtldGluZykgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJtYXJrZXRpbmcganNvblwiLCBtYXJrZXRpbmcpO1xuICAgICAgLy8gbWFya2V0aW5nID0gdGVzdE1hcmtldGluZztcbiAgICAgIGNvbnN0IHsgYmFja2dyb3VuZENvbG9yLCB0ZXh0Q29sb3IsIGFydElkIH0gPSBtYXJrZXRpbmc7XG4gICAgICBhcnRQYWdlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgICBhcnRQYWdlRWxlbWVudC5zdHlsZS5jb2xvciA9IHRleHRDb2xvcjtcbiAgICAgIHVwZGF0ZVRpdGxlKHtcbiAgICAgICAgcGFyZW50OiBhcnRIZWFkRWxlbWVudCxcbiAgICAgICAgdGl0bGU6IG1hcmtldGluZy50aXRsZSxcbiAgICAgIH0pO1xuICAgICAgdXBkYXRlQ29udGVudCh7XG4gICAgICAgIHBhcmVudDogYXJ0Q29udGVudEVsZW1lbnQsXG4gICAgICAgIGFydElkLFxuICAgICAgfSk7XG4gICAgICB1cGRhdGVQcm9wZXJ0aWVzKHtcbiAgICAgICAgcGFyZW50OiBhcnRGb290RWxlbWVudCxcbiAgICAgICAgcHJvcGVydGllczogbWFya2V0aW5nLnByb3BlcnR5LFxuICAgICAgfSk7XG4gICAgICB1cGRhdGVIYXNodGFncyh7IHBhcmVudDogYXJ0Rm9vdEVsZW1lbnQsIGhhc2h0YWdzOiBtYXJrZXRpbmcuaGFzaFRhZyB9KTtcbiAgICAgIHVwZGF0ZUFjdGlvbnMoeyBwYXJlbnQ6IGFydEZvb3RFbGVtZW50LCBhY3Rpb25zOiBtYXJrZXRpbmcuYWN0aW9uIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgY29uc29sZS5sb2coXCJubyBtYXJrZXRpbmcuanNvbiBmb3VuZFwiKTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZVByb3BlcnRpZXMoe1xuICBwcm9wZXJ0aWVzLFxuICBwYXJlbnQsXG59OiB7XG4gIHBhcmVudDogSFRNTEVsZW1lbnQ7XG4gIHByb3BlcnRpZXM6IFBhcnRpYWw8QXJ0UHJvcHJ0aWVzPjtcbn0pIHtcbiAgY29uc3QgcHJvcGVydGllc0VsZW1lbnQgPSBIdG1scy5jcmVhdGVFbGVtZW50KHtcbiAgICBwYXJlbnQsXG4gICAgdGFnTmFtZTogXCJkaXZcIixcbiAgICBjbGF6ejogXCJhcnQgcHJvcGVydGllc1wiLFxuICB9KTtcbiAgT2JqZWN0LmVudHJpZXMocHJvcGVydGllcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IHByb3A7XG4gICAgSHRtbHMuY3JlYXRlRWxlbWVudCh7XG4gICAgICBwYXJlbnQ6IHByb3BlcnRpZXNFbGVtZW50LFxuICAgICAgdGFnTmFtZTogXCJzcGFuXCIsXG4gICAgICB0ZXh0Q29udGVudDoga2V5LFxuICAgIH0pO1xuICAgIEh0bWxzLmNyZWF0ZUVsZW1lbnQoe1xuICAgICAgcGFyZW50OiBwcm9wZXJ0aWVzRWxlbWVudCxcbiAgICAgIHRhZ05hbWU6IFwic3BhblwiLFxuICAgICAgdGV4dENvbnRlbnQ6IHRvTWFueSh2YWx1ZSkuam9pbihcIixcIiksXG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVIYXNodGFncyh7XG4gIGhhc2h0YWdzLFxuICBwYXJlbnQsXG59OiB7XG4gIHBhcmVudDogSFRNTEVsZW1lbnQ7XG4gIGhhc2h0YWdzOiB7IFtrIGluIHN0cmluZ106IHN0cmluZ1tdIH0gfCBzdHJpbmdbXTtcbn0pIHtcbiAgY29uc3QgdGFnc0VsZW1lbnQgPSBIdG1scy5jcmVhdGVFbGVtZW50KHtcbiAgICBwYXJlbnQsXG4gICAgdGFnTmFtZTogXCJkaXZcIixcbiAgICBjbGF6ejogXCJhcnQgaGFzaHRhZ3NcIixcbiAgfSk7XG5cbiAgY29uc3QgY29tYmluZWRUYWdzOiBzdHJpbmdbXSA9IFtdO1xuICBpZiAoQXJyYXkuaXNBcnJheShoYXNodGFncykpIHtcbiAgICBjb21iaW5lZFRhZ3MucHVzaCguLi5oYXNodGFncyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBoYXNodGFncyA9PT0gXCJvYmplY3RcIikge1xuICAgIGNvbWJpbmVkVGFncy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LmVudHJpZXMoaGFzaHRhZ3MpLmZsYXRNYXAoXG4gICAgICAgIChbbWFya2V0cGxhY2UsIHRhZ3NdOiBbbWFya2V0cGxhY2U6IHN0cmluZywgdGFnczogc3RyaW5nW11dKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRhZ3M7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG4gIGNvbWJpbmVkVGFncy5mb3JFYWNoKChoYXNodGFnKSA9PiB7XG4gICAgSHRtbHMuY3JlYXRlRWxlbWVudCh7XG4gICAgICBwYXJlbnQ6IHRhZ3NFbGVtZW50LFxuICAgICAgdGFnTmFtZTogXCJkaXZcIixcbiAgICAgIHRleHRDb250ZW50OiBgIyR7aGFzaHRhZ31gLFxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVGl0bGUoe1xuICBwYXJlbnQsXG4gIHRpdGxlLFxufToge1xuICBwYXJlbnQ6IEhUTUxFbGVtZW50O1xuICB0aXRsZTogc3RyaW5nO1xufSkge1xuICBIdG1scy5jcmVhdGVFbGVtZW50KHtcbiAgICBwYXJlbnQsXG4gICAgdGFnTmFtZTogXCJhXCIsXG4gICAgdGV4dENvbnRlbnQ6IFwiQmFja1wiLFxuICAgIGNsYXp6OiBcImJhY2tcIixcbiAgICBhdHRyaWJ1dGVzOiB7IGhyZWY6IFwiLi4vXCIgfSxcbiAgfSk7XG4gIEh0bWxzLmNyZWF0ZUVsZW1lbnQoe1xuICAgIHBhcmVudCxcbiAgICB0YWdOYW1lOiBcInNwYW5cIixcbiAgICB0ZXh0Q29udGVudDogdGl0bGUsXG4gICAgY2xheno6IFwidGl0bGVcIixcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFjdGlvbnMoe1xuICBwYXJlbnQsXG4gIGFjdGlvbnMsXG59OiB7XG4gIHBhcmVudDogSFRNTEVsZW1lbnQ7XG4gIGFjdGlvbnM6IEFydEFjdGlvbltdO1xufSkge1xuICBjb25zdCBhY3Rpb25zRWxlbWVudCA9IEh0bWxzLmNyZWF0ZUVsZW1lbnQoe1xuICAgIHBhcmVudCxcbiAgICB0YWdOYW1lOiBcImRpdlwiLFxuICAgIGNsYXp6OiBcImFydCBhY3Rpb25zXCIsXG4gIH0pO1xuICBhY3Rpb25zLmZvckVhY2goKGFjdGlvbikgPT4ge1xuICAgIGNvbnN0IHsgY2FsbFRvQWN0aW9uLCB1cmwgfSA9IGFjdGlvbjtcbiAgICBIdG1scy5jcmVhdGVFbGVtZW50KHtcbiAgICAgIHBhcmVudDogYWN0aW9uc0VsZW1lbnQsXG4gICAgICB0YWdOYW1lOiBcImFcIixcbiAgICAgIHRleHRDb250ZW50OiBjYWxsVG9BY3Rpb24sXG4gICAgICBhdHRyaWJ1dGVzOiB7IGhyZWY6IHVybCB9LFxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29udGVudCh7XG4gIHBhcmVudCxcbiAgYXJ0SWQsXG59OiB7XG4gIHBhcmVudDogSFRNTEVsZW1lbnQ7XG4gIGFydElkOiBzdHJpbmc7XG59KSB7XG4gIEh0bWxzLmNyZWF0ZUVsZW1lbnQoe1xuICAgIHBhcmVudCxcbiAgICB0YWdOYW1lOiBcImltZ1wiLFxuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIHNyYzogYGltYWdlLSR7YXJ0SWR9LnBuZ2AsXG4gICAgfSxcbiAgfSk7XG59XG5cbigoKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiVGhhbmsgeW91IGZvciB2aWV3aW5nIG15IGFydCA6KVwiKTtcbiAgdXBkYXRlUGFnZSgpO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=