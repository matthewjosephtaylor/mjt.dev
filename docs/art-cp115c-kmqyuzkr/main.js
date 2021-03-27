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


const testMarketing = {
    title: "Work in Progress",
    backgroundColor: "black",
    textColor: "white",
    hashTag: ["abstractdigitalart", "newaesthetic", "newmediaart", "nft"],
    property: {
        artist: "Matthew Joseph Taylor",
        mediatype: "image/png",
        style: ["Abstract", "Digital", "Vector"],
        year: "2021",
    },
    action: [
        {
            callToAction: "Buy on Opensea",
            url: "foo.bar/baz",
        },
        {
            callToAction: "Like on insta",
            url: "insta.io/blah",
        },
    ],
};
const updatePage = () => {
    const artFootElement = document.body.querySelector(".art.foot");
    const artHeadElement = document.body.querySelector(".art.head");
    const artContentElement = document.body.querySelector(".art.content");
    const artPageElement = document.body;
    const artId = "art-1h4ju0o-kmpc72fp";
    fetch("./marketing.json")
        .then((response) => response.json())
        .then((marketing) => {
        console.log("marketing json", marketing);
        marketing = testMarketing;
        const { backgroundColor, textColor } = marketing;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2Jhc2ljcy9vYmplY3QvT2JqZWN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvYmFzaWNzL2h0bWwvU3R5bGVzLnRzIiwid2VicGFjazovLy8uL3NyYy90cy9iYXNpY3MvaHRtbC9IdG1scy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvYXJ0cGFnZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUM5RU8sU0FBUyxZQUFZLENBQUksTUFBUyxFQUFFLGFBQWtCLEVBQUU7SUFDN0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFF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RSxDQUFDLENBQUM7QUFDdkUsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLEVBQ3JCLE1BQU0sRUFDTixPQUFPLEdBSVI7SUFDQyxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ3pDLE1BQU07UUFDTixPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSxhQUFhO0tBQ3JCLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUN6QixNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUNyQyxLQUFLLENBQUMsYUFBYSxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxjQUFjO1lBQ3RCLE9BQU8sRUFBRSxHQUFHO1lBQ1osV0FBVyxFQUFFLFlBQVk7WUFDekIsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxFQUNyQixNQUFNLEVBQ04sS0FBSyxHQUlOO0lBQ0MsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUNsQixNQUFNO1FBQ04sT0FBTyxFQUFFLEtBQUs7UUFDZCxVQUFVLEVBQUU7WUFDVixHQUFHLEVBQUUsU0FBUyxLQUFLLE1BQU07U0FDMUI7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsQ0FBQyxHQUFHLEVBQUU7SUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDL0MsVUFBVSxFQUFFLENBQUM7QUFDZixDQUFDLENBQUMsRUFBRSxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgeyBNYXBwZXIsIFN1cHBsaWVyIH0gZnJvbSBcImJhc2ljcy9mdW5jdGlvbi9GdW5jdGlvbnNcIjtcblxuZXhwb3J0IHR5cGUgVHlwZVByZWRpY2F0ZTxUID0gb2JqZWN0PiA9IChtYXliZTogdW5rbm93bikgPT4gbWF5YmUgaXMgVDtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU9iamVjdDxUPihzb3VyY2U6IFQsIGFkZGl0aW9uYWw6IGFueSA9IHt9KTogVCB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBPYmplY3QuYXNzaWduKHJlc3VsdCwgc291cmNlKTtcbiAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIGFkZGl0aW9uYWwpO1xuICByZXR1cm4gcmVzdWx0IGFzIFQ7XG59XG5cbmV4cG9ydCB0eXBlIE9iamVjdEVudHJ5PFQ+ID0gW3N0cmluZywgVF07XG5leHBvcnQgdHlwZSBPYmplY3RFbnRyaWVzPFQ+ID0gT2JqZWN0RW50cnk8VD5bXTtcbmV4cG9ydCB0eXBlIFByb2R1Y2VyPFQ+ID0gKCkgPT4gVDtcbmV4cG9ydCB0eXBlIFZhbHVlT3JQcm9kdWNlcjxUPiA9IFQgfCBQcm9kdWNlcjxUPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21FbnRyeTxUPihlbnRyeTogW2tleTogc3RyaW5nLCB2YWx1ZTogVF0pIHtcbiAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhbZW50cnldKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21FbnRyaWVzPFQ+KFxuICBlbnRyaWVzOiBPYmplY3RFbnRyaWVzPFQ+XG4pOiB7IFtrIGluIHN0cmluZ106IFQgfSB7XG4gIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoZW50cmllcyk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUVudHJpZXNNdWx0aTxUPihcbiAgZW50cmllczogT2JqZWN0RW50cmllczxUPixcbiAgaW5pdGlhbDogeyBbayBpbiBzdHJpbmddOiBUW10gfSA9IHt9XG4pOiB7IFtrIGluIHN0cmluZ106IFRbXSB9IHtcbiAgcmV0dXJuIGxvb3AoXG4gICAgZW50cmllcyxcbiAgICAoZW50cnksIGksIGFjYykgPT4ge1xuICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gZW50cnk7XG4gICAgICBsZXQgdmFsdWVzTWF5YmU6IFRbXSA9IGFjY1trZXldO1xuICAgICAgaWYgKHZhbHVlc01heWJlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWVzTWF5YmUgPSBbXTtcbiAgICAgICAgYWNjW2tleV0gPSB2YWx1ZXNNYXliZTtcbiAgICAgIH1cbiAgICAgIHZhbHVlc01heWJlLnB1c2godmFsdWUpO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LFxuICAgIGluaXRpYWxcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21PYmplY3RzPFQsIEEgZXh0ZW5kcyBvYmplY3QsIEkgZXh0ZW5kcyBvYmplY3Q+KFxuICBvYmplY3RzOiBBW10sXG4gIGluaXRpYWw6IEkgPSB1bmRlZmluZWRcbik6IFQgJiBBICYgSSB7XG4gIGlmIChpbml0aWFsID09PSB1bmRlZmluZWQpIHtcbiAgICBpbml0aWFsID0ge30gYXMgSTtcbiAgfVxuICAvLyBPYmplY3QuYXNzaWduKGluaXRpYWwsIHNvdXJjZSk7XG4gIGlmIChvYmplY3RzICE9PSB1bmRlZmluZWQpIHtcbiAgICBvYmplY3RzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgT2JqZWN0LmFzc2lnbihpbml0aWFsLCBvYmopO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGluaXRpYWwgYXMgVCAmIEEgJiBJO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbU9iamVjdDxULCBBLCBJPihcbiAgc291cmNlOiBULFxuICBhZGRpdGlvbmFsOiBBID0gdW5kZWZpbmVkLFxuICBpbml0aWFsOiBJID0gdW5kZWZpbmVkXG4pOiBUICYgQSAmIEkge1xuICBpZiAoaW5pdGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaW5pdGlhbCA9IHt9IGFzIEk7XG4gIH1cbiAgT2JqZWN0LmFzc2lnbihpbml0aWFsLCBzb3VyY2UpO1xuICBpZiAoYWRkaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgT2JqZWN0LmFzc2lnbihpbml0aWFsLCBhZGRpdGlvbmFsKTtcbiAgfVxuICByZXR1cm4gaW5pdGlhbCBhcyBUICYgQSAmIEk7XG59XG5cbnR5cGUgWmVyb1N1cHBsaWVyPFQ+ID0gKGluZGV4OiBudW1iZXIpID0+IFQ7XG5cbmZ1bmN0aW9uIGlzWmVyb1N1cHBsaWVyPFQ+KG1heWJlOiB1bmtub3duKTogbWF5YmUgaXMgWmVyb1N1cHBsaWVyPFQ+IHtcbiAgcmV0dXJuIHR5cGVvZiBtYXliZSA9PT0gXCJmdW5jdGlvblwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbUFycmF5PFQ+KFxuICBzb3VyY2VPclNpemU6IFQgfCBBcnJheTxUPiB8IG51bWJlcixcbiAgemVybzogWmVyb1N1cHBsaWVyPFQ+IHwgVCA9IHVuZGVmaW5lZFxuKTogQXJyYXk8VD4ge1xuICBpZiAoc291cmNlT3JTaXplIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzb3VyY2VPclNpemUpO1xuICB9XG4gIGlmICh0eXBlb2Ygc291cmNlT3JTaXplID09PSBcIm51bWJlclwiKSB7XG4gICAgY29uc3Qgc291cmNlT2JqZWN0ID0geyBsZW5ndGg6IHNvdXJjZU9yU2l6ZSB9O1xuICAgIGlmIChpc1plcm9TdXBwbGllcih6ZXJvKSkge1xuICAgICAgcmV0dXJuIEFycmF5LmZyb20oc291cmNlT2JqZWN0LCAoeCwgaSkgPT4gemVybyhpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHNvdXJjZU9iamVjdCwgKHgsIGkpID0+IHplcm8pO1xuICAgIH1cbiAgfVxuICBpZiAoc291cmNlT3JTaXplID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgcmV0dXJuIFtzb3VyY2VPclNpemVdIGFzIEFycmF5PFQ+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9NYW55PFQ+KHZhbHVlczogVCB8IFRbXSkge1xuICBpZiAodmFsdWVzID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKHZhbHVlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxuICByZXR1cm4gW3ZhbHVlc107XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb29wUHJvbWlzZTxWLCBSPihcbiAgb2JqOiB7IFtrIGluIHN0cmluZ106IFYgfSB8IFZbXSB8IEluZGV4YWJsZTxWPixcbiAgYWN0aW9uOiAodjogViwgazogc3RyaW5nIHwgbnVtYmVyLCByOiBSKSA9PiBQcm9taXNlPFI+LFxuICBpbml0aWFsPzogUlxuKTogUHJvbWlzZTxSPiB7XG4gIGxldCBhY2NQcm9taXNlOiBQcm9taXNlPFI+ID0gUHJvbWlzZS5yZXNvbHZlKGluaXRpYWwpO1xuICBmb3IgKGNvbnN0IFtrLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgIGNvbnN0IGFjYyA9IGF3YWl0IGFjY1Byb21pc2U7XG4gICAgYWNjUHJvbWlzZSA9IGFjdGlvbih2YWx1ZSwgaywgYWNjKTtcbiAgfVxuICByZXR1cm4gYWNjUHJvbWlzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvb3BGb3I8Uj4oXG4gIGNvdW50OiBudW1iZXIsXG4gIGFjdGlvbjogKGk6IG51bWJlciwgcjogUikgPT4gUixcbiAgcmVzdWx0PzogUlxuKTogUiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgIHJlc3VsdCA9IGFjdGlvbihpLCByZXN1bHQpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpTWFwPFQ+ID0ge1xuICBbayBpbiBzdHJpbmddOiBUIHwgVFtdO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvb3BNdWx0aU1hcDxWLCBSPihcbiAgbXVsdGlNYXA6IE11bHRpTWFwPFY+LFxuICBhY3Rpb246ICh2YWx1ZTogViwga2V5OiBzdHJpbmcsIHZhbHVlSW5kZXg6IG51bWJlciwgYWNjOiBSKSA9PiBSLFxuICByZXN1bHQ/OiBSXG4pIHtcbiAgaWYgKG11bHRpTWFwID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGxvb3AobXVsdGlNYXAsICh2YWx1ZXMsIGtleSkgPT4ge1xuICAgIGxvb3AodG9NYW55KHZhbHVlcyksICh2YWx1ZSwgaSkgPT4ge1xuICAgICAgcmVzdWx0ID0gYWN0aW9uKHZhbHVlLCBTdHJpbmcoa2V5KSwgTnVtYmVyKGkpLCByZXN1bHQpO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IHR5cGUgSW5kZXhhYmxlPFQ+ID0ge1xuICBsZW5ndGg6IG51bWJlcjtcbiAgaXRlbTogKGluZGV4OiBudW1iZXIpID0+IFQgfCBudWxsIHwgdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvb3A8ViwgUj4oXG4gIG9iajogeyBbazogc3RyaW5nXTogViB9IHwgVltdIHwgSW5kZXhhYmxlPFY+LFxuICBhY3Rpb246ICh2OiBWLCBrOiBzdHJpbmcgfCBudW1iZXIsIHI6IFIpID0+IFIsXG4gIHJlc3VsdD86IFJcbik6IFIge1xuICBpZiAob2JqID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGZvciAoY29uc3QgW2ssIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvYmopKSB7XG4gICAgcmVzdWx0ID0gYWN0aW9uKHZhbHVlLCBrLCByZXN1bHQpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb29wVHJhY2U8ViwgUj4oXG4gIG9iajogeyBbayBpbiBzdHJpbmddOiBWIH0gfCBWW10sXG4gIGFjdGlvbjogKHY6IFYsIGs6IHN0cmluZywgcjogUikgPT4gUixcbiAgcmVzdWx0PzogUlxuKTogUiB7XG4gIGNvbnNvbGUubG9nKFwibG9vcGluZ1wiLCBvYmopO1xuICBmb3IgKGNvbnN0IFtrLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgIGNvbnNvbGUubG9nKFwia2V5XCIsIGspO1xuICAgIGNvbnNvbGUubG9nKFwidmFsdWVcIiwgdmFsdWUpO1xuICAgIHJlc3VsdCA9IGFjdGlvbih2YWx1ZSwgaywgcmVzdWx0KTtcbiAgICBjb25zb2xlLmxvZyhcImtleS92YWx1ZS9yZXN1bHRcIiwgaywgdmFsdWUsIHJlc3VsdCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5VG9GaXJzdFJlc3Q8VD4oYXJyOiBUW10pOiBbVCwgVFtdXSB7XG4gIGlmIChhcnIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdO1xuICB9XG4gIHJldHVybiBbYXJyWzBdLCBhcnIuc2xpY2UoMSldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyc3RLZXkob2JqOiBvYmplY3QpOiBzdHJpbmcge1xuICBpZiAob2JqID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopWzBdO1xufVxuXG5mdW5jdGlvbiBfdmFsdWVBdEluZGV4PFQ+KHZhbHVlczogVmFsdWVDb250YWluZXI8VD4sIGluZGV4OiBudW1iZXIgPSAwKTogVCB7XG4gIGlmICh2YWx1ZXMgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZXMgPT09IG51bGwpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGlmICh2YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHJldHVybiB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlcyk7XG4gICAgcmV0dXJuIHZhbHVlc1trZXlzW2luZGV4XV07XG4gIH1cbiAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyc3RWYWx1ZTxUPihcbiAgdmFsdWVzOiBWYWx1ZUNvbnRhaW5lcjxUPixcbiAgb3JXaGF0PzogT3JXaGF0PFQ+XG4pOiBUIHtcbiAgcmV0dXJuIHZhbHVlQXRJbmRleCh2YWx1ZXMsIDAsIG9yV2hhdCk7XG59XG5cbmV4cG9ydCB0eXBlIFZhbHVlQ29udGFpbmVyPFQ+ID0gVCB8IFRbXSB8IHsgW2sgaW4gc3RyaW5nXTogVCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gZmlyc3RWYWx1ZU9yVGhyb3c8VD4oXG4gIHZhbHVlczogVmFsdWVDb250YWluZXI8VD4sXG4gIGVycm9yUHJvdmlkZXI6ICgpID0+IEVycm9yXG4pOiBUIHtcbiAgcmV0dXJuIGZpcnN0VmFsdWUodmFsdWVzLCAoKSA9PiB7XG4gICAgdGhyb3cgZXJyb3JQcm92aWRlcigpO1xuICB9KSBhcyBUO1xufVxuXG5leHBvcnQgdHlwZSBJbmRleFRvVmFsdWU8VD4gPSAoaW5kZXg/OiBudW1iZXIpID0+IFQ7XG5leHBvcnQgdHlwZSBPcldoYXQ8VD4gPSBUIHwgVFtdIHwgSW5kZXhUb1ZhbHVlPFQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gdmFsdWVBdEluZGV4PFQ+KFxuICB2YWx1ZXM6IFZhbHVlQ29udGFpbmVyPFQ+LFxuICBpbmRleDogbnVtYmVyID0gMCxcbiAgb3JXaGF0OiBPcldoYXQ8VD4gPSB1bmRlZmluZWRcbik6IFQge1xuICBsZXQgdmFsdWUgPSBfdmFsdWVBdEluZGV4KHZhbHVlcywgaW5kZXgpO1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChvcldoYXQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdmFsdWUgPSBvcldoYXRbaW5kZXhdO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9yV2hhdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBjb25zdCBvcldoYXRGdW5jdGlvbjogSW5kZXhUb1ZhbHVlPFQ+ID0gb3JXaGF0IGFzIEluZGV4VG9WYWx1ZTxUPjtcbiAgICAgIHZhbHVlID0gb3JXaGF0RnVuY3Rpb24oaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IG9yV2hhdCBhcyBUO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZU9mPFQ+KG9iajogb2JqZWN0LCBrZXk6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBUKTogVCB7XG4gIGxldCB2YWx1ZSA9IG9ialtrZXldO1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsdWVzVG9WYWx1ZTE8VD4oYXJnczogVCB8IFtUXSwgZGVmYXVsdFZhbHVlczogW1RdKTogW1RdIHtcbiAgcmV0dXJuIFt2YWx1ZUF0SW5kZXgoYXJncywgMCwgZGVmYXVsdFZhbHVlc1swXSldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsdWVzVG9WYWx1ZTI8VDEsIFQyPihcbiAgYXJnczogW1QxLCBUMl0sXG4gIGRlZmF1bHRWYWx1ZXM6IFtUMSwgVDJdXG4pOiBbVDEsIFQyXSB7XG4gIHJldHVybiBbXG4gICAgdmFsdWVBdEluZGV4KGFyZ3MgYXMgVDFbXSwgMCwgZGVmYXVsdFZhbHVlc1swXSksXG4gICAgdmFsdWVBdEluZGV4KGFyZ3MgYXMgVDJbXSwgMSwgZGVmYXVsdFZhbHVlc1sxXSksXG4gIF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZXNUb1ZhbHVlMzxUMSwgVDIsIFQzPihcbiAgYXJnczogVDFbXSB8IFQyW10gfCBUM1tdLFxuICBkZWZhdWx0VmFsdWVzOiBbVDEsIFQyLCBUM11cbik6IFtUMSwgVDIsIFQzXSB7XG4gIHJldHVybiBbXG4gICAgdmFsdWVBdEluZGV4KGFyZ3MgYXMgVDFbXSwgMCwgZGVmYXVsdFZhbHVlc1swXSksXG4gICAgdmFsdWVBdEluZGV4KGFyZ3MgYXMgVDJbXSwgMSwgZGVmYXVsdFZhbHVlc1sxXSksXG4gICAgdmFsdWVBdEluZGV4KGFyZ3MgYXMgVDNbXSwgMSwgZGVmYXVsdFZhbHVlc1syXSksXG4gIF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b051bWJlcnModmFsdWVzOiBhbnlbXSk6IG51bWJlcltdIHtcbiAgcmV0dXJuIGZyb21BcnJheSh2YWx1ZXMpLm1hcCgodikgPT4gTnVtYmVyKHYpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvZHVjZXI8VD4obWF5YmU6IGFueSk6IG1heWJlIGlzIFByb2R1Y2VyPFQ+IHtcbiAgcmV0dXJuIHR5cGVvZiBtYXliZSA9PT0gXCJmdW5jdGlvblwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvZHVjZVJlc3VsdDxUPih2YWx1ZTogVmFsdWVPclByb2R1Y2VyPFQ+KTogVCB7XG4gIGlmIChpc1Byb2R1Y2VyKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZSgpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlT3JFbHNlPFQ+KFxuICB2YWx1ZTogVmFsdWVPclByb2R1Y2VyPFQ+LFxuICBvcldoYXQ6IFZhbHVlT3JQcm9kdWNlcjxUPlxuKTogVCB7XG4gIGxldCByZXN1bHQgPSB1bmRlZmluZWQ7XG4gIGxldCBlcnJvciA9IHVuZGVmaW5lZDtcbiAgdHJ5IHtcbiAgICByZXN1bHQgPSBwcm9kdWNlUmVzdWx0KHZhbHVlKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGUgPSBlcnJvcjtcbiAgfVxuICBpZiAoaXNOb3RWYWx1ZShyZXN1bHQpKSB7XG4gICAgcmV0dXJuIHByb2R1Y2VSZXN1bHQob3JXaGF0KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9UeXBlPFQ+KFxuICBvYmo6IGFueSxcbiAgdHlwZVByZWRpY2F0ZTogVHlwZVByZWRpY2F0ZTxUPixcbiAgc3RyaWN0OiBib29sZWFuID0gdHJ1ZVxuKTogVCB7XG4gIC8vIHJldHVybiBjbGFyaWZ5KFxuICAvLyAgIGB0b1R5cGU6IG9iajogJHtvYmp9ICR7dHlwZVByZWRpY2F0ZT8ubmFtZX0gc3RyaWN0OiAke3N0cmljdH1gLFxuICAvLyAgICgpID0+IHtcbiAgaWYgKCFzdHJpY3QpIHtcbiAgICByZXR1cm4gb2JqIGFzIFQ7XG4gIH1cbiAgaWYgKHR5cGVQcmVkaWNhdGUob2JqKSkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgIGBVbmFibGUgdG8gY29udmVydCBvYmplY3QgdG8gdHlwZSB1c2luZyB0eXBlUHJlZGljYXRlOiAke3R5cGVQcmVkaWNhdGU/Lm5hbWV9IGBcbiAgKTtcbiAgLy8gfVxuICAvLyApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FmZVZhbHVlPFQ+KHVuaXQ6ICgpID0+IFQpOiBUIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gdW5pdCgpO1xuICB9IGNhdGNoIChyZWFzb24pIHtcbiAgICBjb25zb2xlLmVycm9yKHJlYXNvbik7XG4gICAgLy8gdHJhY2UoKCkgPT4gcmVhc29uKTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsdWVPclRocm93PFQ+KFxuICB2YWx1ZU1heWJlOiBULFxuICBtZXNzYWdlOiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKVxuKTogVCB7XG4gIGlmICh2YWx1ZU1heWJlID09PSB1bmRlZmluZWQgfHwgdmFsdWVNYXliZSA9PT0gbnVsbCkge1xuICAgIGNvbnN0IG1lc3NhZ2VTdHJpbmcgPSB0eXBlb2YgbWVzc2FnZSA9PT0gXCJmdW5jdGlvblwiID8gbWVzc2FnZSgpIDogbWVzc2FnZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZVN0cmluZyk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlTWF5YmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RWYWx1ZU9yVGhyb3c8VD4oXG4gIG9iajogeyBbayBpbiBzdHJpbmddOiBUIH0sXG4gIGtleTogc3RyaW5nLFxuICBtZXNzYWdlOiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKSA9ICgpID0+XG4gICAgYG5vIGtleTogJyR7a2V5fScgaW4gb2JqZWN0OiAke3VnbHkob2JqKX1gXG4pOiBUIHtcbiAgcmV0dXJuIHZhbHVlT3JUaHJvdyhvYmpba2V5XSwgbWVzc2FnZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV0dHkoYW55dGhpbmc6IGFueSk6IHN0cmluZyB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShhbnl0aGluZywgdW5kZWZpbmVkLCAyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVnbHkoYW55dGhpbmc6IGFueSk6IHN0cmluZyB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShhbnl0aGluZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbHVlKG1heWJlOiB1bmtub3duKTogYm9vbGVhbiB7XG4gIHJldHVybiBtYXliZSAhPT0gdW5kZWZpbmVkICYmIG1heWJlICE9PSBudWxsICYmICFOdW1iZXIuaXNOYU4obWF5YmUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOb3RWYWx1ZShtYXliZTogdW5rbm93bik6IGJvb2xlYW4ge1xuICByZXR1cm4gIWlzVmFsdWUobWF5YmUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QobWF5YmU6IHVua25vd24pOiBtYXliZSBpcyBvYmplY3Qge1xuICByZXR1cm4gaXNWYWx1ZShtYXliZSkgJiYgdHlwZW9mIG1heWJlID09PSBcIm9iamVjdFwiO1xufVxuXG5leHBvcnQgY29uc3QgaWRlbnRpdHkgPSA8VD4odmFsdWU6IFQpID0+IHZhbHVlO1xuXG5leHBvcnQgdHlwZSBQcmltaXRpdmUgPSBzdHJpbmcgfCBudW1iZXIgfCBiaWdpbnQgfCBib29sZWFuIHwgc3ltYm9sO1xuXG4vKipcbiAqIE1hcCB2YWx1ZSB0byBhbm90aGVyIHZhbHVlLCB0cmVhdGluZyB1bmRlZmluZWQgYW5kIG51bGwgYXMgJ2VtcHR5J1xuICogQHJldHVybnMgdW5kZWZpbmVkIGlmIHZhbHVlIGlzIHVuZGVmaW5lZCBPUiBudWxsLCBvdGhlcndpc2UgbWFwcyB2YWx1ZSB1c2luZyBtYXBwZXIgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFZhbHVlPFQsIFI+KFxuICB2YWx1ZTogVCxcbiAgbWFwcGVyOiBSIHwgTWFwcGVyPFQsIFI+LFxuICBlbHNlTWFwcGVyPzogUiB8IFN1cHBsaWVyPFI+XG4pOiBSIHtcbiAgaWYgKGlzVmFsdWUodmFsdWUpKSB7XG4gICAgaWYgKHR5cGVvZiBtYXBwZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIChtYXBwZXIgYXMgRnVuY3Rpb24pKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcHBlcjtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGVsc2VNYXBwZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIChlbHNlTWFwcGVyIGFzIEZ1bmN0aW9uKSgpO1xuICAgIH1cbiAgICByZXR1cm4gZWxzZU1hcHBlcjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgaXNOb3RWYWx1ZSB9IGZyb20gXCJiYXNpY3Mvb2JqZWN0L09iamVjdHNcIjtcbmltcG9ydCAqIGFzIENTUyBmcm9tIFwiY3NzdHlwZVwiO1xuXG4vKipcbiAqIE5PVEU6IFRoZSBzZXR0ZXIgb24gc3R5bGUgbWF5IHNpbGVudGx5IGNoYW5nZS9pZ25vcmUgdGhlIHZhbHVlXG4gKiBAcmV0dXJucyB0aGUgX2FjdHVhbF8gc3R5bGUgdmFsdWVzIHRoYXQgd2VyZSBzZXRcbiAqL1xuY29uc3QgdXBkYXRlID0gKHtcbiAgc3R5bGUsXG4gIGVsZW1lbnQsXG59OiB7XG4gIHN0eWxlPzogQ1NTLlByb3BlcnRpZXM7XG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgU1ZHRWxlbWVudDtcbn0pOiBDU1MuUHJvcGVydGllcyA9PiB7XG4gIGlmIChpc05vdFZhbHVlKHN0eWxlKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBzZXRQcm9wZXJ0aWVzOiBDU1MuUHJvcGVydGllcyA9IHt9O1xuICBPYmplY3QuZW50cmllcyhzdHlsZSkuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBjb25zdCBbaywgdl0gPSBlbnRyeTtcbiAgICBjb25zdCBzdHJpbmdWYWx1ZSA9IFN0cmluZyh2KTtcbiAgICBlbGVtZW50LnN0eWxlW2tdID0gc3RyaW5nVmFsdWU7XG4gICAgc2V0UHJvcGVydGllc1trXSA9IGVsZW1lbnRba107XG4gICAgLy8gQXNzZXJ0aW9ucy5hc3NlcnQoZWxlbWVudC5zdHlsZVtrXSA9PT0gc3RyaW5nVmFsdWUsICgpID0+IFtcbiAgICAvLyAgIGBzdHlsZWQgdmFsdWUgRE9FUyBOT1QgZXF1YWwgc2V0IHZhbHVlICR7ZWxlbWVudC50YWdOYW1lfSAnJHtrfScgOiAnJHt2fScgJyR7ZWxlbWVudC5zdHlsZVtrXX0nYCxcbiAgICAvLyBdKTtcbiAgfSk7XG4gIHJldHVybiBzZXRQcm9wZXJ0aWVzO1xufTtcblxuZXhwb3J0IGNvbnN0IFN0eWxlcyA9IHtcbiAgdXBkYXRlLFxufTtcbiIsImltcG9ydCB7IFN0eWxlcyB9IGZyb20gXCJiYXNpY3MvaHRtbC9TdHlsZXNcIjtcbmltcG9ydCB7IG1hcFZhbHVlLCBpc1ZhbHVlIH0gZnJvbSBcImJhc2ljcy9vYmplY3QvT2JqZWN0c1wiO1xuaW1wb3J0IHsgU3ZnQXR0cmlidXRlcyB9IGZyb20gXCJjc3N0eXBlXCI7XG5pbXBvcnQgeyBHdWlTdHlsZSB9IGZyb20gXCJzeW4vZ3VpL0d1aVN0eWxlXCI7XG5cbmZ1bmN0aW9uIHRleHRPZkVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICByZXR1cm4gdGV4dE5vZGVzT2ZFbGVtZW50KGVsZW1lbnQpXG4gICAgLm1hcCgoY24pID0+IGNuLnRleHRDb250ZW50KVxuICAgIC5qb2luKCk7XG59XG5mdW5jdGlvbiB0ZXh0Tm9kZXNPZkVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBDaGlsZE5vZGVbXSB7XG4gIGNvbnN0IHJlc3VsdDogQ2hpbGROb2RlW10gPSBbXTtcbiAgZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2goKGNuKSA9PiB7XG4gICAgaWYgKGNuLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICByZXN1bHQucHVzaChjbik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudDxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwPih7XG4gIHRhZ05hbWUsXG4gIHBhcmVudCxcbiAgYXR0cmlidXRlcyxcbiAgZGF0YXNldHMsXG4gIGNsYXp6LFxuICBpZCxcbiAgc3R5bGUsXG4gIHRleHRDb250ZW50LFxufTogUGFydGlhbDx7XG4gIHRleHRDb250ZW50OiBzdHJpbmc7XG4gIHN0eWxlOiBHdWlTdHlsZTtcbiAgdGFnTmFtZTogSztcbiAgcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgYXR0cmlidXRlczogdW5rbm93bjtcbiAgZGF0YXNldHM6IHsgW2sgaW4gc3RyaW5nXTogc3RyaW5nIH07XG4gIGNsYXp6OiBzdHJpbmc7XG4gIGlkOiBzdHJpbmc7XG59Pik6IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICBtYXBWYWx1ZShzdHlsZSwgKHN0eWxlKSA9PiB7XG4gICAgU3R5bGVzLnVwZGF0ZSh7IGVsZW1lbnQsIHN0eWxlIH0pO1xuICB9KTtcbiAgbWFwVmFsdWUoZGF0YXNldHMsIChkYXRhc2V0cykgPT4ge1xuICAgIE9iamVjdC5lbnRyaWVzKGRhdGFzZXRzKS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgW2ssIHZdID0gZW50cnk7XG4gICAgICBlbGVtZW50LmRhdGFzZXRba10gPSB2O1xuICAgIH0pO1xuICB9KTtcbiAgbWFwVmFsdWUoaWQsIChpZCkgPT4ge1xuICAgIGVsZW1lbnQuaWQgPSBpZDtcbiAgfSk7XG4gIG1hcFZhbHVlKGF0dHJpYnV0ZXMsIChhdHRyaWJ1dGVzKSA9PiB7XG4gICAgT2JqZWN0LmVudHJpZXMoYXR0cmlidXRlcykuZm9yRWFjaCgoYXR0cikgPT4ge1xuICAgICAgY29uc3QgW25hbWUsIHZhbHVlXSA9IGF0dHI7XG4gICAgICBpZiAoaXNWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICBtYXBWYWx1ZShjbGF6eiwgKGNsYXp6KSA9PiB7XG4gICAgY29uc3QgY2xhenplcyA9IGNsYXp6LnNwbGl0KFwiIFwiKTtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY2xhenplcyk7XG4gIH0pO1xuICBtYXBWYWx1ZSh0ZXh0Q29udGVudCwgKHRleHRDb250ZW50KSA9PiB7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xuICB9KTtcbiAgbWFwVmFsdWUocGFyZW50LCAocGFyZW50KSA9PiB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICB9KTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmV4cG9ydCBjb25zdCBIdG1scyA9IHtcbiAgdGV4dE5vZGVzT2ZFbGVtZW50LFxuICB0ZXh0T2ZFbGVtZW50LFxuICBjcmVhdGVFbGVtZW50LFxufTtcbiIsImltcG9ydCB7IEh0bWxzIH0gZnJvbSBcImJhc2ljcy9odG1sL0h0bWxzXCI7XG5pbXBvcnQgeyB0b01hbnkgfSBmcm9tIFwiYmFzaWNzL29iamVjdC9PYmplY3RzXCI7XG5pbXBvcnQge1xuICBBcnRBY3Rpb24sXG4gIEFydEhhc2hUYWcsXG4gIEFydFByb3BydGllcyxcbiAgTWFya2V0aW5nLFxufSBmcm9tIFwicHJvZHVjdGlvbi9hcnQvZm9ybXVsYXMvTWFya2V0aW5nXCI7XG5pbXBvcnQgeyBTeW5Db2xvcnMgfSBmcm9tIFwic3luL2NvbG9yL1N5bkNvbG9yc1wiO1xuXG5jb25zdCB0ZXN0TWFya2V0aW5nOiBNYXJrZXRpbmcgPSB7XG4gIHRpdGxlOiBcIldvcmsgaW4gUHJvZ3Jlc3NcIixcbiAgYmFja2dyb3VuZENvbG9yOiBcImJsYWNrXCIsXG4gIHRleHRDb2xvcjogXCJ3aGl0ZVwiLFxuICBoYXNoVGFnOiBbXCJhYnN0cmFjdGRpZ2l0YWxhcnRcIiwgXCJuZXdhZXN0aGV0aWNcIiwgXCJuZXdtZWRpYWFydFwiLCBcIm5mdFwiXSxcbiAgcHJvcGVydHk6IHtcbiAgICBhcnRpc3Q6IFwiTWF0dGhldyBKb3NlcGggVGF5bG9yXCIsXG4gICAgbWVkaWF0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIHN0eWxlOiBbXCJBYnN0cmFjdFwiLCBcIkRpZ2l0YWxcIiwgXCJWZWN0b3JcIl0sXG4gICAgeWVhcjogXCIyMDIxXCIsXG4gIH0sXG4gIGFjdGlvbjogW1xuICAgIHtcbiAgICAgIGNhbGxUb0FjdGlvbjogXCJCdXkgb24gT3BlbnNlYVwiLFxuICAgICAgdXJsOiBcImZvby5iYXIvYmF6XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICBjYWxsVG9BY3Rpb246IFwiTGlrZSBvbiBpbnN0YVwiLFxuICAgICAgdXJsOiBcImluc3RhLmlvL2JsYWhcIixcbiAgICB9LFxuICBdLFxufTtcblxuY29uc3QgdXBkYXRlUGFnZSA9ICgpID0+IHtcbiAgY29uc3QgYXJ0Rm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiLmFydC5mb290XCIpO1xuICBjb25zdCBhcnRIZWFkRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoXCIuYXJ0LmhlYWRcIik7XG4gIGNvbnN0IGFydENvbnRlbnRFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihcbiAgICBcIi5hcnQuY29udGVudFwiXG4gICk7XG4gIGNvbnN0IGFydFBhZ2VFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG4gIGNvbnN0IGFydElkID0gXCJhcnQtMWg0anUwby1rbXBjNzJmcFwiO1xuXG4gIGZldGNoKFwiLi9tYXJrZXRpbmcuanNvblwiKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChtYXJrZXRpbmc6IE1hcmtldGluZykgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJtYXJrZXRpbmcganNvblwiLCBtYXJrZXRpbmcpO1xuICAgICAgbWFya2V0aW5nID0gdGVzdE1hcmtldGluZztcbiAgICAgIGNvbnN0IHsgYmFja2dyb3VuZENvbG9yLCB0ZXh0Q29sb3IgfSA9IG1hcmtldGluZztcbiAgICAgIGFydFBhZ2VFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvcjtcbiAgICAgIGFydFBhZ2VFbGVtZW50LnN0eWxlLmNvbG9yID0gdGV4dENvbG9yO1xuICAgICAgdXBkYXRlVGl0bGUoe1xuICAgICAgICBwYXJlbnQ6IGFydEhlYWRFbGVtZW50LFxuICAgICAgICB0aXRsZTogbWFya2V0aW5nLnRpdGxlLFxuICAgICAgfSk7XG4gICAgICB1cGRhdGVDb250ZW50KHtcbiAgICAgICAgcGFyZW50OiBhcnRDb250ZW50RWxlbWVudCxcbiAgICAgICAgYXJ0SWQsXG4gICAgICB9KTtcbiAgICAgIHVwZGF0ZVByb3BlcnRpZXMoe1xuICAgICAgICBwYXJlbnQ6IGFydEZvb3RFbGVtZW50LFxuICAgICAgICBwcm9wZXJ0aWVzOiBtYXJrZXRpbmcucHJvcGVydHksXG4gICAgICB9KTtcbiAgICAgIHVwZGF0ZUhhc2h0YWdzKHsgcGFyZW50OiBhcnRGb290RWxlbWVudCwgaGFzaHRhZ3M6IG1hcmtldGluZy5oYXNoVGFnIH0pO1xuICAgICAgdXBkYXRlQWN0aW9ucyh7IHBhcmVudDogYXJ0Rm9vdEVsZW1lbnQsIGFjdGlvbnM6IG1hcmtldGluZy5hY3Rpb24gfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICBjb25zb2xlLmxvZyhcIm5vIG1hcmtldGluZy5qc29uIGZvdW5kXCIpO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gdXBkYXRlUHJvcGVydGllcyh7XG4gIHByb3BlcnRpZXMsXG4gIHBhcmVudCxcbn06IHtcbiAgcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgcHJvcGVydGllczogUGFydGlhbDxBcnRQcm9wcnRpZXM+O1xufSkge1xuICBjb25zdCBwcm9wZXJ0aWVzRWxlbWVudCA9IEh0bWxzLmNyZWF0ZUVsZW1lbnQoe1xuICAgIHBhcmVudCxcbiAgICB0YWdOYW1lOiBcImRpdlwiLFxuICAgIGNsYXp6OiBcImFydCBwcm9wZXJ0aWVzXCIsXG4gIH0pO1xuICBPYmplY3QuZW50cmllcyhwcm9wZXJ0aWVzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgY29uc3QgW2tleSwgdmFsdWVdID0gcHJvcDtcbiAgICBIdG1scy5jcmVhdGVFbGVtZW50KHtcbiAgICAgIHBhcmVudDogcHJvcGVydGllc0VsZW1lbnQsXG4gICAgICB0YWdOYW1lOiBcInNwYW5cIixcbiAgICAgIHRleHRDb250ZW50OiBrZXksXG4gICAgfSk7XG4gICAgSHRtbHMuY3JlYXRlRWxlbWVudCh7XG4gICAgICBwYXJlbnQ6IHByb3BlcnRpZXNFbGVtZW50LFxuICAgICAgdGFnTmFtZTogXCJzcGFuXCIsXG4gICAgICB0ZXh0Q29udGVudDogdG9NYW55KHZhbHVlKS5qb2luKFwiLFwiKSxcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUhhc2h0YWdzKHtcbiAgaGFzaHRhZ3MsXG4gIHBhcmVudCxcbn06IHtcbiAgcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgaGFzaHRhZ3M6IEFydEhhc2hUYWdbXTtcbn0pIHtcbiAgY29uc3QgdGFnc0VsZW1lbnQgPSBIdG1scy5jcmVhdGVFbGVtZW50KHtcbiAgICBwYXJlbnQsXG4gICAgdGFnTmFtZTogXCJkaXZcIixcbiAgICBjbGF6ejogXCJhcnQgaGFzaHRhZ3NcIixcbiAgfSk7XG4gIGhhc2h0YWdzLmZvckVhY2goKGhhc2h0YWcpID0+IHtcbiAgICBIdG1scy5jcmVhdGVFbGVtZW50KHtcbiAgICAgIHBhcmVudDogdGFnc0VsZW1lbnQsXG4gICAgICB0YWdOYW1lOiBcImRpdlwiLFxuICAgICAgdGV4dENvbnRlbnQ6IGAjJHtoYXNodGFnfWAsXG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUaXRsZSh7XG4gIHBhcmVudCxcbiAgdGl0bGUsXG59OiB7XG4gIHBhcmVudDogSFRNTEVsZW1lbnQ7XG4gIHRpdGxlOiBzdHJpbmc7XG59KSB7XG4gIEh0bWxzLmNyZWF0ZUVsZW1lbnQoeyBwYXJlbnQsIHRhZ05hbWU6IFwic3BhblwiLCB0ZXh0Q29udGVudDogdGl0bGUgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFjdGlvbnMoe1xuICBwYXJlbnQsXG4gIGFjdGlvbnMsXG59OiB7XG4gIHBhcmVudDogSFRNTEVsZW1lbnQ7XG4gIGFjdGlvbnM6IEFydEFjdGlvbltdO1xufSkge1xuICBjb25zdCBhY3Rpb25zRWxlbWVudCA9IEh0bWxzLmNyZWF0ZUVsZW1lbnQoe1xuICAgIHBhcmVudCxcbiAgICB0YWdOYW1lOiBcImRpdlwiLFxuICAgIGNsYXp6OiBcImFydCBhY3Rpb25zXCIsXG4gIH0pO1xuICBhY3Rpb25zLmZvckVhY2goKGFjdGlvbikgPT4ge1xuICAgIGNvbnN0IHsgY2FsbFRvQWN0aW9uLCB1cmwgfSA9IGFjdGlvbjtcbiAgICBIdG1scy5jcmVhdGVFbGVtZW50KHtcbiAgICAgIHBhcmVudDogYWN0aW9uc0VsZW1lbnQsXG4gICAgICB0YWdOYW1lOiBcImFcIixcbiAgICAgIHRleHRDb250ZW50OiBjYWxsVG9BY3Rpb24sXG4gICAgICBhdHRyaWJ1dGVzOiB7IGhyZWY6IHVybCB9LFxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29udGVudCh7XG4gIHBhcmVudCxcbiAgYXJ0SWQsXG59OiB7XG4gIHBhcmVudDogSFRNTEVsZW1lbnQ7XG4gIGFydElkOiBzdHJpbmc7XG59KSB7XG4gIEh0bWxzLmNyZWF0ZUVsZW1lbnQoe1xuICAgIHBhcmVudCxcbiAgICB0YWdOYW1lOiBcImltZ1wiLFxuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIHNyYzogYGltYWdlLSR7YXJ0SWR9LnBuZ2AsXG4gICAgfSxcbiAgfSk7XG59XG5cbigoKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiVGhhbmsgeW91IGZvciB2aWV3aW5nIG15IGFydCA6KVwiKTtcbiAgdXBkYXRlUGFnZSgpO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=