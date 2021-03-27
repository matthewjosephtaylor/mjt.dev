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
    hashtags.forEach((hashtag) => {
        Htmls.createElement({
            parent: tagsElement,
            tagName: "div",
            textContent: `#${hashtag}`,
        });
    });
}
function updateTitle({ parent, title, }) {
    Htmls.createElement({ parent, tagName: "span", textContent: title });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2Jhc2ljcy9vYmplY3QvT2JqZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvYmFzaWNzL2h0bWwvU3R5bGVzLnRzIiwid2VicGFjazovLy8uL3NyYy90cy9iYXNpY3MvaHRtbC9IdG1scy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvYXJ0cGFnZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUM5RU8sU0FBUyxZQUFZLENBQUksTUFBUyxFQUFFLGFBQWtCLEVBQUU7SUFDN0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFF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T0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3pCLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxhQUFhLENBQUM7WUFDbEIsTUFBTSxFQUFFLGNBQWM7WUFDdEIsT0FBTyxFQUFFLEdBQUc7WUFDWixXQUFXLEVBQUUsWUFBWTtZQUN6QixVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO1NBQzFCLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLEVBQ3JCLE1BQU0sRUFDTixLQUFLLEdBSU47SUFDQyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ2xCLE1BQU07UUFDTixPQUFPLEVBQUUsS0FBSztRQUNkLFVBQVUsRUFBRTtZQUNWLEdBQUcsRUFBRSxTQUFTLEtBQUssTUFBTTtTQUMxQjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxDQUFDLEdBQUcsRUFBRTtJQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUMvQyxVQUFVLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCB7IE1hcHBlciwgU3VwcGxpZXIgfSBmcm9tIFwiYmFzaWNzL2Z1bmN0aW9uL0Z1bmN0aW9uc1wiO1xuXG5leHBvcnQgdHlwZSBUeXBlUHJlZGljYXRlPFQgPSBvYmplY3Q+ID0gKG1heWJlOiB1bmtub3duKSA9PiBtYXliZSBpcyBUO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlT2JqZWN0PFQ+KHNvdXJjZTogVCwgYWRkaXRpb25hbDogYW55ID0ge30pOiBUIHtcbiAgY29uc3QgcmVzdWx0ID0ge307XG4gIE9iamVjdC5hc3NpZ24ocmVzdWx0LCBzb3VyY2UpO1xuICBPYmplY3QuYXNzaWduKHJlc3VsdCwgYWRkaXRpb25hbCk7XG4gIHJldHVybiByZXN1bHQgYXMgVDtcbn1cblxuZXhwb3J0IHR5cGUgT2JqZWN0RW50cnk8VD4gPSBbc3RyaW5nLCBUXTtcbmV4cG9ydCB0eXBlIE9iamVjdEVudHJpZXM8VD4gPSBPYmplY3RFbnRyeTxUPltdO1xuZXhwb3J0IHR5cGUgUHJvZHVjZXI8VD4gPSAoKSA9PiBUO1xuZXhwb3J0IHR5cGUgVmFsdWVPclByb2R1Y2VyPFQ+ID0gVCB8IFByb2R1Y2VyPFQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbUVudHJ5PFQ+KGVudHJ5OiBba2V5OiBzdHJpbmcsIHZhbHVlOiBUXSkge1xuICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFtlbnRyeV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbUVudHJpZXM8VD4oXG4gIGVudHJpZXM6IE9iamVjdEVudHJpZXM8VD5cbik6IHsgW2sgaW4gc3RyaW5nXTogVCB9IHtcbiAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhlbnRyaWVzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tRW50cmllc011bHRpPFQ+KFxuICBlbnRyaWVzOiBPYmplY3RFbnRyaWVzPFQ+LFxuICBpbml0aWFsOiB7IFtrIGluIHN0cmluZ106IFRbXSB9ID0ge31cbik6IHsgW2sgaW4gc3RyaW5nXTogVFtdIH0ge1xuICByZXR1cm4gbG9vcChcbiAgICBlbnRyaWVzLFxuICAgIChlbnRyeSwgaSwgYWNjKSA9PiB7XG4gICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBlbnRyeTtcbiAgICAgIGxldCB2YWx1ZXNNYXliZTogVFtdID0gYWNjW2tleV07XG4gICAgICBpZiAodmFsdWVzTWF5YmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZXNNYXliZSA9IFtdO1xuICAgICAgICBhY2Nba2V5XSA9IHZhbHVlc01heWJlO1xuICAgICAgfVxuICAgICAgdmFsdWVzTWF5YmUucHVzaCh2YWx1ZSk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sXG4gICAgaW5pdGlhbFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbU9iamVjdHM8VCwgQSBleHRlbmRzIG9iamVjdCwgSSBleHRlbmRzIG9iamVjdD4oXG4gIG9iamVjdHM6IEFbXSxcbiAgaW5pdGlhbDogSSA9IHVuZGVmaW5lZFxuKTogVCAmIEEgJiBJIHtcbiAgaWYgKGluaXRpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIGluaXRpYWwgPSB7fSBhcyBJO1xuICB9XG4gIC8vIE9iamVjdC5hc3NpZ24oaW5pdGlhbCwgc291cmNlKTtcbiAgaWYgKG9iamVjdHMgIT09IHVuZGVmaW5lZCkge1xuICAgIG9iamVjdHMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICBPYmplY3QuYXNzaWduKGluaXRpYWwsIG9iaik7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gaW5pdGlhbCBhcyBUICYgQSAmIEk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tT2JqZWN0PFQsIEEsIEk+KFxuICBzb3VyY2U6IFQsXG4gIGFkZGl0aW9uYWw6IEEgPSB1bmRlZmluZWQsXG4gIGluaXRpYWw6IEkgPSB1bmRlZmluZWRcbik6IFQgJiBBICYgSSB7XG4gIGlmIChpbml0aWFsID09PSB1bmRlZmluZWQpIHtcbiAgICBpbml0aWFsID0ge30gYXMgSTtcbiAgfVxuICBPYmplY3QuYXNzaWduKGluaXRpYWwsIHNvdXJjZSk7XG4gIGlmIChhZGRpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICBPYmplY3QuYXNzaWduKGluaXRpYWwsIGFkZGl0aW9uYWwpO1xuICB9XG4gIHJldHVybiBpbml0aWFsIGFzIFQgJiBBICYgSTtcbn1cblxudHlwZSBaZXJvU3VwcGxpZXI8VD4gPSAoaW5kZXg6IG51bWJlcikgPT4gVDtcblxuZnVuY3Rpb24gaXNaZXJvU3VwcGxpZXI8VD4obWF5YmU6IHVua25vd24pOiBtYXliZSBpcyBaZXJvU3VwcGxpZXI8VD4ge1xuICByZXR1cm4gdHlwZW9mIG1heWJlID09PSBcImZ1bmN0aW9uXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tQXJyYXk8VD4oXG4gIHNvdXJjZU9yU2l6ZTogVCB8IEFycmF5PFQ+IHwgbnVtYmVyLFxuICB6ZXJvOiBaZXJvU3VwcGxpZXI8VD4gfCBUID0gdW5kZWZpbmVkXG4pOiBBcnJheTxUPiB7XG4gIGlmIChzb3VyY2VPclNpemUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHNvdXJjZU9yU2l6ZSk7XG4gIH1cbiAgaWYgKHR5cGVvZiBzb3VyY2VPclNpemUgPT09IFwibnVtYmVyXCIpIHtcbiAgICBjb25zdCBzb3VyY2VPYmplY3QgPSB7IGxlbmd0aDogc291cmNlT3JTaXplIH07XG4gICAgaWYgKGlzWmVyb1N1cHBsaWVyKHplcm8pKSB7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShzb3VyY2VPYmplY3QsICh4LCBpKSA9PiB6ZXJvKGkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEFycmF5LmZyb20oc291cmNlT2JqZWN0LCAoeCwgaSkgPT4gemVybyk7XG4gICAgfVxuICB9XG4gIGlmIChzb3VyY2VPclNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICByZXR1cm4gW3NvdXJjZU9yU2l6ZV0gYXMgQXJyYXk8VD47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b01hbnk8VD4odmFsdWVzOiBUIHwgVFtdKSB7XG4gIGlmICh2YWx1ZXMgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAodmFsdWVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICByZXR1cm4gdmFsdWVzO1xuICB9XG4gIHJldHVybiBbdmFsdWVzXTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvb3BQcm9taXNlPFYsIFI+KFxuICBvYmo6IHsgW2sgaW4gc3RyaW5nXTogViB9IHwgVltdIHwgSW5kZXhhYmxlPFY+LFxuICBhY3Rpb246ICh2OiBWLCBrOiBzdHJpbmcgfCBudW1iZXIsIHI6IFIpID0+IFByb21pc2U8Uj4sXG4gIGluaXRpYWw/OiBSXG4pOiBQcm9taXNlPFI+IHtcbiAgbGV0IGFjY1Byb21pc2U6IFByb21pc2U8Uj4gPSBQcm9taXNlLnJlc29sdmUoaW5pdGlhbCk7XG4gIGZvciAoY29uc3QgW2ssIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvYmopKSB7XG4gICAgY29uc3QgYWNjID0gYXdhaXQgYWNjUHJvbWlzZTtcbiAgICBhY2NQcm9taXNlID0gYWN0aW9uKHZhbHVlLCBrLCBhY2MpO1xuICB9XG4gIHJldHVybiBhY2NQcm9taXNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9vcEZvcjxSPihcbiAgY291bnQ6IG51bWJlcixcbiAgYWN0aW9uOiAoaTogbnVtYmVyLCByOiBSKSA9PiBSLFxuICByZXN1bHQ/OiBSXG4pOiBSIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgcmVzdWx0ID0gYWN0aW9uKGksIHJlc3VsdCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlNYXA8VD4gPSB7XG4gIFtrIGluIHN0cmluZ106IFQgfCBUW107XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbG9vcE11bHRpTWFwPFYsIFI+KFxuICBtdWx0aU1hcDogTXVsdGlNYXA8Vj4sXG4gIGFjdGlvbjogKHZhbHVlOiBWLCBrZXk6IHN0cmluZywgdmFsdWVJbmRleDogbnVtYmVyLCBhY2M6IFIpID0+IFIsXG4gIHJlc3VsdD86IFJcbikge1xuICBpZiAobXVsdGlNYXAgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgbG9vcChtdWx0aU1hcCwgKHZhbHVlcywga2V5KSA9PiB7XG4gICAgbG9vcCh0b01hbnkodmFsdWVzKSwgKHZhbHVlLCBpKSA9PiB7XG4gICAgICByZXN1bHQgPSBhY3Rpb24odmFsdWUsIFN0cmluZyhrZXkpLCBOdW1iZXIoaSksIHJlc3VsdCk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgdHlwZSBJbmRleGFibGU8VD4gPSB7XG4gIGxlbmd0aDogbnVtYmVyO1xuICBpdGVtOiAoaW5kZXg6IG51bWJlcikgPT4gVCB8IG51bGwgfCB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbG9vcDxWLCBSPihcbiAgb2JqOiB7IFtrOiBzdHJpbmddOiBWIH0gfCBWW10gfCBJbmRleGFibGU8Vj4sXG4gIGFjdGlvbjogKHY6IFYsIGs6IHN0cmluZyB8IG51bWJlciwgcjogUikgPT4gUixcbiAgcmVzdWx0PzogUlxuKTogUiB7XG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZm9yIChjb25zdCBbaywgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iaikpIHtcbiAgICByZXN1bHQgPSBhY3Rpb24odmFsdWUsIGssIHJlc3VsdCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvb3BUcmFjZTxWLCBSPihcbiAgb2JqOiB7IFtrIGluIHN0cmluZ106IFYgfSB8IFZbXSxcbiAgYWN0aW9uOiAodjogViwgazogc3RyaW5nLCByOiBSKSA9PiBSLFxuICByZXN1bHQ/OiBSXG4pOiBSIHtcbiAgY29uc29sZS5sb2coXCJsb29waW5nXCIsIG9iaik7XG4gIGZvciAoY29uc3QgW2ssIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvYmopKSB7XG4gICAgY29uc29sZS5sb2coXCJrZXlcIiwgayk7XG4gICAgY29uc29sZS5sb2coXCJ2YWx1ZVwiLCB2YWx1ZSk7XG4gICAgcmVzdWx0ID0gYWN0aW9uKHZhbHVlLCBrLCByZXN1bHQpO1xuICAgIGNvbnNvbGUubG9nKFwia2V5L3ZhbHVlL3Jlc3VsdFwiLCBrLCB2YWx1ZSwgcmVzdWx0KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlUb0ZpcnN0UmVzdDxUPihhcnI6IFRbXSk6IFtULCBUW11dIHtcbiAgaWYgKGFyciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFt1bmRlZmluZWQsIHVuZGVmaW5lZF07XG4gIH1cbiAgcmV0dXJuIFthcnJbMF0sIGFyci5zbGljZSgxKV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJzdEtleShvYmo6IG9iamVjdCk6IHN0cmluZyB7XG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iailbMF07XG59XG5cbmZ1bmN0aW9uIF92YWx1ZUF0SW5kZXg8VD4odmFsdWVzOiBWYWx1ZUNvbnRhaW5lcjxUPiwgaW5kZXg6IG51bWJlciA9IDApOiBUIHtcbiAgaWYgKHZhbHVlcyA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlcyA9PT0gbnVsbCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKHZhbHVlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuIHZhbHVlc1tpbmRleF07XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWVzKTtcbiAgICByZXR1cm4gdmFsdWVzW2tleXNbaW5kZXhdXTtcbiAgfVxuICBpZiAoaW5kZXggPT09IDApIHtcbiAgICByZXR1cm4gdmFsdWVzO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJzdFZhbHVlPFQ+KFxuICB2YWx1ZXM6IFZhbHVlQ29udGFpbmVyPFQ+LFxuICBvcldoYXQ/OiBPcldoYXQ8VD5cbik6IFQge1xuICByZXR1cm4gdmFsdWVBdEluZGV4KHZhbHVlcywgMCwgb3JXaGF0KTtcbn1cblxuZXhwb3J0IHR5cGUgVmFsdWVDb250YWluZXI8VD4gPSBUIHwgVFtdIHwgeyBbayBpbiBzdHJpbmddOiBUIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJzdFZhbHVlT3JUaHJvdzxUPihcbiAgdmFsdWVzOiBWYWx1ZUNvbnRhaW5lcjxUPixcbiAgZXJyb3JQcm92aWRlcjogKCkgPT4gRXJyb3Jcbik6IFQge1xuICByZXR1cm4gZmlyc3RWYWx1ZSh2YWx1ZXMsICgpID0+IHtcbiAgICB0aHJvdyBlcnJvclByb3ZpZGVyKCk7XG4gIH0pIGFzIFQ7XG59XG5cbmV4cG9ydCB0eXBlIEluZGV4VG9WYWx1ZTxUPiA9IChpbmRleD86IG51bWJlcikgPT4gVDtcbmV4cG9ydCB0eXBlIE9yV2hhdDxUPiA9IFQgfCBUW10gfCBJbmRleFRvVmFsdWU8VD47XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZUF0SW5kZXg8VD4oXG4gIHZhbHVlczogVmFsdWVDb250YWluZXI8VD4sXG4gIGluZGV4OiBudW1iZXIgPSAwLFxuICBvcldoYXQ6IE9yV2hhdDxUPiA9IHVuZGVmaW5lZFxuKTogVCB7XG4gIGxldCB2YWx1ZSA9IF92YWx1ZUF0SW5kZXgodmFsdWVzLCBpbmRleCk7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKG9yV2hhdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB2YWx1ZSA9IG9yV2hhdFtpbmRleF07XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3JXaGF0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGNvbnN0IG9yV2hhdEZ1bmN0aW9uOiBJbmRleFRvVmFsdWU8VD4gPSBvcldoYXQgYXMgSW5kZXhUb1ZhbHVlPFQ+O1xuICAgICAgdmFsdWUgPSBvcldoYXRGdW5jdGlvbihpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gb3JXaGF0IGFzIFQ7XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlT2Y8VD4ob2JqOiBvYmplY3QsIGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IFQpOiBUIHtcbiAgbGV0IHZhbHVlID0gb2JqW2tleV07XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZXNUb1ZhbHVlMTxUPihhcmdzOiBUIHwgW1RdLCBkZWZhdWx0VmFsdWVzOiBbVF0pOiBbVF0ge1xuICByZXR1cm4gW3ZhbHVlQXRJbmRleChhcmdzLCAwLCBkZWZhdWx0VmFsdWVzWzBdKV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZXNUb1ZhbHVlMjxUMSwgVDI+KFxuICBhcmdzOiBbVDEsIFQyXSxcbiAgZGVmYXVsdFZhbHVlczogW1QxLCBUMl1cbik6IFtUMSwgVDJdIHtcbiAgcmV0dXJuIFtcbiAgICB2YWx1ZUF0SW5kZXgoYXJncyBhcyBUMVtdLCAwLCBkZWZhdWx0VmFsdWVzWzBdKSxcbiAgICB2YWx1ZUF0SW5kZXgoYXJncyBhcyBUMltdLCAxLCBkZWZhdWx0VmFsdWVzWzFdKSxcbiAgXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlc1RvVmFsdWUzPFQxLCBUMiwgVDM+KFxuICBhcmdzOiBUMVtdIHwgVDJbXSB8IFQzW10sXG4gIGRlZmF1bHRWYWx1ZXM6IFtUMSwgVDIsIFQzXVxuKTogW1QxLCBUMiwgVDNdIHtcbiAgcmV0dXJuIFtcbiAgICB2YWx1ZUF0SW5kZXgoYXJncyBhcyBUMVtdLCAwLCBkZWZhdWx0VmFsdWVzWzBdKSxcbiAgICB2YWx1ZUF0SW5kZXgoYXJncyBhcyBUMltdLCAxLCBkZWZhdWx0VmFsdWVzWzFdKSxcbiAgICB2YWx1ZUF0SW5kZXgoYXJncyBhcyBUM1tdLCAxLCBkZWZhdWx0VmFsdWVzWzJdKSxcbiAgXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvTnVtYmVycyh2YWx1ZXM6IGFueVtdKTogbnVtYmVyW10ge1xuICByZXR1cm4gZnJvbUFycmF5KHZhbHVlcykubWFwKCh2KSA9PiBOdW1iZXIodikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9kdWNlcjxUPihtYXliZTogYW55KTogbWF5YmUgaXMgUHJvZHVjZXI8VD4ge1xuICByZXR1cm4gdHlwZW9mIG1heWJlID09PSBcImZ1bmN0aW9uXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9kdWNlUmVzdWx0PFQ+KHZhbHVlOiBWYWx1ZU9yUHJvZHVjZXI8VD4pOiBUIHtcbiAgaWYgKGlzUHJvZHVjZXIodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlKCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsdWVPckVsc2U8VD4oXG4gIHZhbHVlOiBWYWx1ZU9yUHJvZHVjZXI8VD4sXG4gIG9yV2hhdDogVmFsdWVPclByb2R1Y2VyPFQ+XG4pOiBUIHtcbiAgbGV0IHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgbGV0IGVycm9yID0gdW5kZWZpbmVkO1xuICB0cnkge1xuICAgIHJlc3VsdCA9IHByb2R1Y2VSZXN1bHQodmFsdWUpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZSA9IGVycm9yO1xuICB9XG4gIGlmIChpc05vdFZhbHVlKHJlc3VsdCkpIHtcbiAgICByZXR1cm4gcHJvZHVjZVJlc3VsdChvcldoYXQpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1R5cGU8VD4oXG4gIG9iajogYW55LFxuICB0eXBlUHJlZGljYXRlOiBUeXBlUHJlZGljYXRlPFQ+LFxuICBzdHJpY3Q6IGJvb2xlYW4gPSB0cnVlXG4pOiBUIHtcbiAgLy8gcmV0dXJuIGNsYXJpZnkoXG4gIC8vICAgYHRvVHlwZTogb2JqOiAke29ian0gJHt0eXBlUHJlZGljYXRlPy5uYW1lfSBzdHJpY3Q6ICR7c3RyaWN0fWAsXG4gIC8vICAgKCkgPT4ge1xuICBpZiAoIXN0cmljdCkge1xuICAgIHJldHVybiBvYmogYXMgVDtcbiAgfVxuICBpZiAodHlwZVByZWRpY2F0ZShvYmopKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgYFVuYWJsZSB0byBjb252ZXJ0IG9iamVjdCB0byB0eXBlIHVzaW5nIHR5cGVQcmVkaWNhdGU6ICR7dHlwZVByZWRpY2F0ZT8ubmFtZX0gYFxuICApO1xuICAvLyB9XG4gIC8vICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlVmFsdWU8VD4odW5pdDogKCkgPT4gVCk6IFQge1xuICB0cnkge1xuICAgIHJldHVybiB1bml0KCk7XG4gIH0gY2F0Y2ggKHJlYXNvbikge1xuICAgIGNvbnNvbGUuZXJyb3IocmVhc29uKTtcbiAgICAvLyB0cmFjZSgoKSA9PiByZWFzb24pO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZU9yVGhyb3c8VD4oXG4gIHZhbHVlTWF5YmU6IFQsXG4gIG1lc3NhZ2U6IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpXG4pOiBUIHtcbiAgaWYgKHZhbHVlTWF5YmUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZU1heWJlID09PSBudWxsKSB7XG4gICAgY29uc3QgbWVzc2FnZVN0cmluZyA9IHR5cGVvZiBtZXNzYWdlID09PSBcImZ1bmN0aW9uXCIgPyBtZXNzYWdlKCkgOiBtZXNzYWdlO1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlU3RyaW5nKTtcbiAgfVxuICByZXR1cm4gdmFsdWVNYXliZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdFZhbHVlT3JUaHJvdzxUPihcbiAgb2JqOiB7IFtrIGluIHN0cmluZ106IFQgfSxcbiAga2V5OiBzdHJpbmcsXG4gIG1lc3NhZ2U6IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpID0gKCkgPT5cbiAgICBgbm8ga2V5OiAnJHtrZXl9JyBpbiBvYmplY3Q6ICR7dWdseShvYmopfWBcbik6IFQge1xuICByZXR1cm4gdmFsdWVPclRocm93KG9ialtrZXldLCBtZXNzYWdlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZXR0eShhbnl0aGluZzogYW55KTogc3RyaW5nIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFueXRoaW5nLCB1bmRlZmluZWQsIDIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdWdseShhbnl0aGluZzogYW55KTogc3RyaW5nIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFueXRoaW5nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsdWUobWF5YmU6IHVua25vd24pOiBib29sZWFuIHtcbiAgcmV0dXJuIG1heWJlICE9PSB1bmRlZmluZWQgJiYgbWF5YmUgIT09IG51bGwgJiYgIU51bWJlci5pc05hTihtYXliZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc05vdFZhbHVlKG1heWJlOiB1bmtub3duKTogYm9vbGVhbiB7XG4gIHJldHVybiAhaXNWYWx1ZShtYXliZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdChtYXliZTogdW5rbm93bik6IG1heWJlIGlzIG9iamVjdCB7XG4gIHJldHVybiBpc1ZhbHVlKG1heWJlKSAmJiB0eXBlb2YgbWF5YmUgPT09IFwib2JqZWN0XCI7XG59XG5cbmV4cG9ydCBjb25zdCBpZGVudGl0eSA9IDxUPih2YWx1ZTogVCkgPT4gdmFsdWU7XG5cbmV4cG9ydCB0eXBlIFByaW1pdGl2ZSA9IHN0cmluZyB8IG51bWJlciB8IGJpZ2ludCB8IGJvb2xlYW4gfCBzeW1ib2w7XG5cbi8qKlxuICogTWFwIHZhbHVlIHRvIGFub3RoZXIgdmFsdWUsIHRyZWF0aW5nIHVuZGVmaW5lZCBhbmQgbnVsbCBhcyAnZW1wdHknXG4gKiBAcmV0dXJucyB1bmRlZmluZWQgaWYgdmFsdWUgaXMgdW5kZWZpbmVkIE9SIG51bGwsIG90aGVyd2lzZSBtYXBzIHZhbHVlIHVzaW5nIG1hcHBlciBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwVmFsdWU8VCwgUj4oXG4gIHZhbHVlOiBULFxuICBtYXBwZXI6IFIgfCBNYXBwZXI8VCwgUj4sXG4gIGVsc2VNYXBwZXI/OiBSIHwgU3VwcGxpZXI8Uj5cbik6IFIge1xuICBpZiAoaXNWYWx1ZSh2YWx1ZSkpIHtcbiAgICBpZiAodHlwZW9mIG1hcHBlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICByZXR1cm4gKG1hcHBlciBhcyBGdW5jdGlvbikodmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gbWFwcGVyO1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZWxzZU1hcHBlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICByZXR1cm4gKGVsc2VNYXBwZXIgYXMgRnVuY3Rpb24pKCk7XG4gICAgfVxuICAgIHJldHVybiBlbHNlTWFwcGVyO1xuICB9XG59XG4iLCJpbXBvcnQgeyBpc05vdFZhbHVlIH0gZnJvbSBcImJhc2ljcy9vYmplY3QvT2JqZWN0c1wiO1xuaW1wb3J0ICogYXMgQ1NTIGZyb20gXCJjc3N0eXBlXCI7XG5cbi8qKlxuICogTk9URTogVGhlIHNldHRlciBvbiBzdHlsZSBtYXkgc2lsZW50bHkgY2hhbmdlL2lnbm9yZSB0aGUgdmFsdWVcbiAqIEByZXR1cm5zIHRoZSBfYWN0dWFsXyBzdHlsZSB2YWx1ZXMgdGhhdCB3ZXJlIHNldFxuICovXG5jb25zdCB1cGRhdGUgPSAoe1xuICBzdHlsZSxcbiAgZWxlbWVudCxcbn06IHtcbiAgc3R5bGU/OiBDU1MuUHJvcGVydGllcztcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQgfCBTVkdFbGVtZW50O1xufSk6IENTUy5Qcm9wZXJ0aWVzID0+IHtcbiAgaWYgKGlzTm90VmFsdWUoc3R5bGUpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHNldFByb3BlcnRpZXM6IENTUy5Qcm9wZXJ0aWVzID0ge307XG4gIE9iamVjdC5lbnRyaWVzKHN0eWxlKS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGNvbnN0IFtrLCB2XSA9IGVudHJ5O1xuICAgIGNvbnN0IHN0cmluZ1ZhbHVlID0gU3RyaW5nKHYpO1xuICAgIGVsZW1lbnQuc3R5bGVba10gPSBzdHJpbmdWYWx1ZTtcbiAgICBzZXRQcm9wZXJ0aWVzW2tdID0gZWxlbWVudFtrXTtcbiAgICAvLyBBc3NlcnRpb25zLmFzc2VydChlbGVtZW50LnN0eWxlW2tdID09PSBzdHJpbmdWYWx1ZSwgKCkgPT4gW1xuICAgIC8vICAgYHN0eWxlZCB2YWx1ZSBET0VTIE5PVCBlcXVhbCBzZXQgdmFsdWUgJHtlbGVtZW50LnRhZ05hbWV9ICcke2t9JyA6ICcke3Z9JyAnJHtlbGVtZW50LnN0eWxlW2tdfSdgLFxuICAgIC8vIF0pO1xuICB9KTtcbiAgcmV0dXJuIHNldFByb3BlcnRpZXM7XG59O1xuXG5leHBvcnQgY29uc3QgU3R5bGVzID0ge1xuICB1cGRhdGUsXG59O1xuIiwiaW1wb3J0IHsgU3R5bGVzIH0gZnJvbSBcImJhc2ljcy9odG1sL1N0eWxlc1wiO1xuaW1wb3J0IHsgbWFwVmFsdWUsIGlzVmFsdWUgfSBmcm9tIFwiYmFzaWNzL29iamVjdC9PYmplY3RzXCI7XG5pbXBvcnQgeyBTdmdBdHRyaWJ1dGVzIH0gZnJvbSBcImNzc3R5cGVcIjtcbmltcG9ydCB7IEd1aVN0eWxlIH0gZnJvbSBcInN5bi9ndWkvR3VpU3R5bGVcIjtcblxuZnVuY3Rpb24gdGV4dE9mRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gIHJldHVybiB0ZXh0Tm9kZXNPZkVsZW1lbnQoZWxlbWVudClcbiAgICAubWFwKChjbikgPT4gY24udGV4dENvbnRlbnQpXG4gICAgLmpvaW4oKTtcbn1cbmZ1bmN0aW9uIHRleHROb2Rlc09mRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IENoaWxkTm9kZVtdIHtcbiAgY29uc3QgcmVzdWx0OiBDaGlsZE5vZGVbXSA9IFtdO1xuICBlbGVtZW50LmNoaWxkTm9kZXMuZm9yRWFjaCgoY24pID0+IHtcbiAgICBpZiAoY24ubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGNuKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50PEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXA+KHtcbiAgdGFnTmFtZSxcbiAgcGFyZW50LFxuICBhdHRyaWJ1dGVzLFxuICBkYXRhc2V0cyxcbiAgY2xhenosXG4gIGlkLFxuICBzdHlsZSxcbiAgdGV4dENvbnRlbnQsXG59OiBQYXJ0aWFsPHtcbiAgdGV4dENvbnRlbnQ6IHN0cmluZztcbiAgc3R5bGU6IEd1aVN0eWxlO1xuICB0YWdOYW1lOiBLO1xuICBwYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBhdHRyaWJ1dGVzOiB1bmtub3duO1xuICBkYXRhc2V0czogeyBbayBpbiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgY2xheno6IHN0cmluZztcbiAgaWQ6IHN0cmluZztcbn0+KTogSFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gIG1hcFZhbHVlKHN0eWxlLCAoc3R5bGUpID0+IHtcbiAgICBTdHlsZXMudXBkYXRlKHsgZWxlbWVudCwgc3R5bGUgfSk7XG4gIH0pO1xuICBtYXBWYWx1ZShkYXRhc2V0cywgKGRhdGFzZXRzKSA9PiB7XG4gICAgT2JqZWN0LmVudHJpZXMoZGF0YXNldHMpLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBbaywgdl0gPSBlbnRyeTtcbiAgICAgIGVsZW1lbnQuZGF0YXNldFtrXSA9IHY7XG4gICAgfSk7XG4gIH0pO1xuICBtYXBWYWx1ZShpZCwgKGlkKSA9PiB7XG4gICAgZWxlbWVudC5pZCA9IGlkO1xuICB9KTtcbiAgbWFwVmFsdWUoYXR0cmlidXRlcywgKGF0dHJpYnV0ZXMpID0+IHtcbiAgICBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzKS5mb3JFYWNoKChhdHRyKSA9PiB7XG4gICAgICBjb25zdCBbbmFtZSwgdmFsdWVdID0gYXR0cjtcbiAgICAgIGlmIChpc1ZhbHVlKHZhbHVlKSkge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIG1hcFZhbHVlKGNsYXp6LCAoY2xhenopID0+IHtcbiAgICBjb25zdCBjbGF6emVzID0gY2xhenouc3BsaXQoXCIgXCIpO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGF6emVzKTtcbiAgfSk7XG4gIG1hcFZhbHVlKHRleHRDb250ZW50LCAodGV4dENvbnRlbnQpID0+IHtcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XG4gIH0pO1xuICBtYXBWYWx1ZShwYXJlbnQsIChwYXJlbnQpID0+IHtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gIH0pO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZXhwb3J0IGNvbnN0IEh0bWxzID0ge1xuICB0ZXh0Tm9kZXNPZkVsZW1lbnQsXG4gIHRleHRPZkVsZW1lbnQsXG4gIGNyZWF0ZUVsZW1lbnQsXG59O1xuIiwiaW1wb3J0IHsgSHRtbHMgfSBmcm9tIFwiYmFzaWNzL2h0bWwvSHRtbHNcIjtcbmltcG9ydCB7IHRvTWFueSB9IGZyb20gXCJiYXNpY3Mvb2JqZWN0L09iamVjdHNcIjtcbmltcG9ydCB7XG4gIEFydEFjdGlvbixcbiAgQXJ0SGFzaFRhZyxcbiAgQXJ0UHJvcHJ0aWVzLFxuICBNYXJrZXRpbmdcbn0gZnJvbSBcInByb2R1Y3Rpb24vYXJ0L01hcmtldGluZ1wiO1xuXG4vLyBjb25zdCB0ZXN0TWFya2V0aW5nOiBNYXJrZXRpbmcgPSB7XG4vLyAgIHRpdGxlOiBcIldvcmsgaW4gUHJvZ3Jlc3NcIixcbi8vICAgYmFja2dyb3VuZENvbG9yOiBcImJsYWNrXCIsXG4vLyAgIHRleHRDb2xvcjogXCJ3aGl0ZVwiLFxuLy8gICBoYXNoVGFnOiBbXCJhYnN0cmFjdGRpZ2l0YWxhcnRcIiwgXCJuZXdhZXN0aGV0aWNcIiwgXCJuZXdtZWRpYWFydFwiLCBcIm5mdFwiXSxcbi8vICAgcHJvcGVydHk6IHtcbi8vICAgICBhcnRpc3Q6IFwiTWF0dGhldyBKb3NlcGggVGF5bG9yXCIsXG4vLyAgICAgbWVkaWF0eXBlOiBcImltYWdlL3BuZ1wiLFxuLy8gICAgIHN0eWxlOiBbXCJBYnN0cmFjdFwiLCBcIkRpZ2l0YWxcIiwgXCJWZWN0b3JcIl0sXG4vLyAgICAgeWVhcjogXCIyMDIxXCIsXG4vLyAgIH0sXG4vLyAgIGFjdGlvbjogW1xuLy8gICAgIHtcbi8vICAgICAgIGNhbGxUb0FjdGlvbjogXCJCdXkgb24gT3BlbnNlYVwiLFxuLy8gICAgICAgdXJsOiBcImZvby5iYXIvYmF6XCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICBjYWxsVG9BY3Rpb246IFwiTGlrZSBvbiBpbnN0YVwiLFxuLy8gICAgICAgdXJsOiBcImluc3RhLmlvL2JsYWhcIixcbi8vICAgICB9LFxuLy8gICBdLFxuLy8gfTtcblxuY29uc3QgdXBkYXRlUGFnZSA9ICgpID0+IHtcbiAgY29uc3QgYXJ0Rm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiLmFydC5mb290XCIpO1xuICBjb25zdCBhcnRIZWFkRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoXCIuYXJ0LmhlYWRcIik7XG4gIGNvbnN0IGFydENvbnRlbnRFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihcbiAgICBcIi5hcnQuY29udGVudFwiXG4gICk7XG4gIGNvbnN0IGFydFBhZ2VFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG4gIC8vIGNvbnN0IGFydElkID0gXCJhcnQtMWg0anUwby1rbXBjNzJmcFwiO1xuXG4gIGZldGNoKFwiLi9tYXJrZXRpbmcuanNvblwiKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChtYXJrZXRpbmc6IE1hcmtldGluZykgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJtYXJrZXRpbmcganNvblwiLCBtYXJrZXRpbmcpO1xuICAgICAgLy8gbWFya2V0aW5nID0gdGVzdE1hcmtldGluZztcbiAgICAgIGNvbnN0IHsgYmFja2dyb3VuZENvbG9yLCB0ZXh0Q29sb3IsIGFydElkIH0gPSBtYXJrZXRpbmc7XG4gICAgICBhcnRQYWdlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgICBhcnRQYWdlRWxlbWVudC5zdHlsZS5jb2xvciA9IHRleHRDb2xvcjtcbiAgICAgIHVwZGF0ZVRpdGxlKHtcbiAgICAgICAgcGFyZW50OiBhcnRIZWFkRWxlbWVudCxcbiAgICAgICAgdGl0bGU6IG1hcmtldGluZy50aXRsZSxcbiAgICAgIH0pO1xuICAgICAgdXBkYXRlQ29udGVudCh7XG4gICAgICAgIHBhcmVudDogYXJ0Q29udGVudEVsZW1lbnQsXG4gICAgICAgIGFydElkLFxuICAgICAgfSk7XG4gICAgICB1cGRhdGVQcm9wZXJ0aWVzKHtcbiAgICAgICAgcGFyZW50OiBhcnRGb290RWxlbWVudCxcbiAgICAgICAgcHJvcGVydGllczogbWFya2V0aW5nLnByb3BlcnR5LFxuICAgICAgfSk7XG4gICAgICB1cGRhdGVIYXNodGFncyh7IHBhcmVudDogYXJ0Rm9vdEVsZW1lbnQsIGhhc2h0YWdzOiBtYXJrZXRpbmcuaGFzaFRhZyB9KTtcbiAgICAgIHVwZGF0ZUFjdGlvbnMoeyBwYXJlbnQ6IGFydEZvb3RFbGVtZW50LCBhY3Rpb25zOiBtYXJrZXRpbmcuYWN0aW9uIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgY29uc29sZS5sb2coXCJubyBtYXJrZXRpbmcuanNvbiBmb3VuZFwiKTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZVByb3BlcnRpZXMoe1xuICBwcm9wZXJ0aWVzLFxuICBwYXJlbnQsXG59OiB7XG4gIHBhcmVudDogSFRNTEVsZW1lbnQ7XG4gIHByb3BlcnRpZXM6IFBhcnRpYWw8QXJ0UHJvcHJ0aWVzPjtcbn0pIHtcbiAgY29uc3QgcHJvcGVydGllc0VsZW1lbnQgPSBIdG1scy5jcmVhdGVFbGVtZW50KHtcbiAgICBwYXJlbnQsXG4gICAgdGFnTmFtZTogXCJkaXZcIixcbiAgICBjbGF6ejogXCJhcnQgcHJvcGVydGllc1wiLFxuICB9KTtcbiAgT2JqZWN0LmVudHJpZXMocHJvcGVydGllcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IHByb3A7XG4gICAgSHRtbHMuY3JlYXRlRWxlbWVudCh7XG4gICAgICBwYXJlbnQ6IHByb3BlcnRpZXNFbGVtZW50LFxuICAgICAgdGFnTmFtZTogXCJzcGFuXCIsXG4gICAgICB0ZXh0Q29udGVudDoga2V5LFxuICAgIH0pO1xuICAgIEh0bWxzLmNyZWF0ZUVsZW1lbnQoe1xuICAgICAgcGFyZW50OiBwcm9wZXJ0aWVzRWxlbWVudCxcbiAgICAgIHRhZ05hbWU6IFwic3BhblwiLFxuICAgICAgdGV4dENvbnRlbnQ6IHRvTWFueSh2YWx1ZSkuam9pbihcIixcIiksXG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVIYXNodGFncyh7XG4gIGhhc2h0YWdzLFxuICBwYXJlbnQsXG59OiB7XG4gIHBhcmVudDogSFRNTEVsZW1lbnQ7XG4gIGhhc2h0YWdzOiBBcnRIYXNoVGFnW107XG59KSB7XG4gIGNvbnN0IHRhZ3NFbGVtZW50ID0gSHRtbHMuY3JlYXRlRWxlbWVudCh7XG4gICAgcGFyZW50LFxuICAgIHRhZ05hbWU6IFwiZGl2XCIsXG4gICAgY2xheno6IFwiYXJ0IGhhc2h0YWdzXCIsXG4gIH0pO1xuICBoYXNodGFncy5mb3JFYWNoKChoYXNodGFnKSA9PiB7XG4gICAgSHRtbHMuY3JlYXRlRWxlbWVudCh7XG4gICAgICBwYXJlbnQ6IHRhZ3NFbGVtZW50LFxuICAgICAgdGFnTmFtZTogXCJkaXZcIixcbiAgICAgIHRleHRDb250ZW50OiBgIyR7aGFzaHRhZ31gLFxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVGl0bGUoe1xuICBwYXJlbnQsXG4gIHRpdGxlLFxufToge1xuICBwYXJlbnQ6IEhUTUxFbGVtZW50O1xuICB0aXRsZTogc3RyaW5nO1xufSkge1xuICBIdG1scy5jcmVhdGVFbGVtZW50KHsgcGFyZW50LCB0YWdOYW1lOiBcInNwYW5cIiwgdGV4dENvbnRlbnQ6IHRpdGxlIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBY3Rpb25zKHtcbiAgcGFyZW50LFxuICBhY3Rpb25zLFxufToge1xuICBwYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBhY3Rpb25zOiBBcnRBY3Rpb25bXTtcbn0pIHtcbiAgY29uc3QgYWN0aW9uc0VsZW1lbnQgPSBIdG1scy5jcmVhdGVFbGVtZW50KHtcbiAgICBwYXJlbnQsXG4gICAgdGFnTmFtZTogXCJkaXZcIixcbiAgICBjbGF6ejogXCJhcnQgYWN0aW9uc1wiLFxuICB9KTtcbiAgYWN0aW9ucy5mb3JFYWNoKChhY3Rpb24pID0+IHtcbiAgICBjb25zdCB7IGNhbGxUb0FjdGlvbiwgdXJsIH0gPSBhY3Rpb247XG4gICAgSHRtbHMuY3JlYXRlRWxlbWVudCh7XG4gICAgICBwYXJlbnQ6IGFjdGlvbnNFbGVtZW50LFxuICAgICAgdGFnTmFtZTogXCJhXCIsXG4gICAgICB0ZXh0Q29udGVudDogY2FsbFRvQWN0aW9uLFxuICAgICAgYXR0cmlidXRlczogeyBocmVmOiB1cmwgfSxcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbnRlbnQoe1xuICBwYXJlbnQsXG4gIGFydElkLFxufToge1xuICBwYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBhcnRJZDogc3RyaW5nO1xufSkge1xuICBIdG1scy5jcmVhdGVFbGVtZW50KHtcbiAgICBwYXJlbnQsXG4gICAgdGFnTmFtZTogXCJpbWdcIixcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBzcmM6IGBpbWFnZS0ke2FydElkfS5wbmdgLFxuICAgIH0sXG4gIH0pO1xufVxuXG4oKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcIlRoYW5rIHlvdSBmb3Igdmlld2luZyBteSBhcnQgOilcIik7XG4gIHVwZGF0ZVBhZ2UoKTtcbn0pKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9