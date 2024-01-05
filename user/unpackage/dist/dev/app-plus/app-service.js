if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  var _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa;
  "use strict";
  function formatAppLog(type2, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type2, filename, ...args);
    } else {
      console[type2].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const mpMixin = {};
  function email(value2) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value2);
  }
  function mobile(value2) {
    return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value2);
  }
  function url(value2) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value2);
  }
  function date$1(value2) {
    if (!value2)
      return false;
    if (number$1(value2))
      value2 = +value2;
    return !/Invalid|NaN/.test(new Date(value2).toString());
  }
  function dateISO(value2) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value2);
  }
  function number$1(value2) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value2);
  }
  function string$1(value2) {
    return typeof value2 === "string";
  }
  function digits(value2) {
    return /^\d+$/.test(value2);
  }
  function idCard(value2) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value2
    );
  }
  function carNo(value2) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value2.length === 7) {
      return creg.test(value2);
    }
    if (value2.length === 8) {
      return xreg.test(value2);
    }
    return false;
  }
  function amount(value2) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value2);
  }
  function chinese(value2) {
    const reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value2);
  }
  function letter(value2) {
    return /^[a-zA-Z]*$/.test(value2);
  }
  function enOrNum(value2) {
    const reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value2);
  }
  function contains(value2, param) {
    return value2.indexOf(param) >= 0;
  }
  function range$2(value2, param) {
    return value2 >= param[0] && value2 <= param[1];
  }
  function rangeLength(value2, param) {
    return value2.length >= param[0] && value2.length <= param[1];
  }
  function landline(value2) {
    const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value2);
  }
  function empty(value2) {
    switch (typeof value2) {
      case "undefined":
        return true;
      case "string":
        if (value2.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value2)
          return true;
        break;
      case "number":
        if (value2 === 0 || isNaN(value2))
          return true;
        break;
      case "object":
        if (value2 === null || value2.length === 0)
          return true;
        for (const i2 in value2) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value2) {
    if (typeof value2 === "string") {
      try {
        const obj = JSON.parse(value2);
        if (typeof obj === "object" && obj) {
          return true;
        }
        return false;
      } catch (e2) {
        return false;
      }
    }
    return false;
  }
  function array$1(value2) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value2);
    }
    return Object.prototype.toString.call(value2) === "[object Array]";
  }
  function object$1(value2) {
    return Object.prototype.toString.call(value2) === "[object Object]";
  }
  function code(value2, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value2);
  }
  function func(value2) {
    return typeof value2 === "function";
  }
  function promise(value2) {
    return object$1(value2) && func(value2.then) && func(value2.catch);
  }
  function image(value2) {
    const newValue = value2.split("?")[0];
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
    return IMAGE_REGEXP.test(newValue);
  }
  function video(value2) {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
    return VIDEO_REGEXP.test(value2);
  }
  function regExp(o2) {
    return o2 && Object.prototype.toString.call(o2) === "[object RegExp]";
  }
  const test = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    amount,
    array: array$1,
    carNo,
    chinese,
    code,
    contains,
    date: date$1,
    dateISO,
    digits,
    email,
    empty,
    enOrNum,
    func,
    idCard,
    image,
    jsonString,
    landline,
    letter,
    mobile,
    number: number$1,
    object: object$1,
    promise,
    range: range$2,
    rangeLength,
    regExp,
    string: string$1,
    url,
    video
  }, Symbol.toStringTag, { value: "Module" }));
  function strip(num, precision = 15) {
    return +parseFloat(Number(num).toPrecision(precision));
  }
  function digitLength(num) {
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  }
  function float2Fixed(num) {
    if (num.toString().indexOf("e") === -1) {
      return Number(num.toString().replace(".", ""));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }
  function checkBoundary(num) {
    {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        formatAppLog("warn", "at uni_modules/uv-ui-tools/libs/function/digit.js:45", `${num} 超出了精度限制，结果可能不正确`);
      }
    }
  }
  function iteratorOperation(arr, operation) {
    const [num1, num2, ...others] = arr;
    let res = operation(num1, num2);
    others.forEach((num) => {
      res = operation(res, num);
    });
    return res;
  }
  function times$1(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, times$1);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }
  function divide(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, divide);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    return times$1(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
  }
  function round(num, ratio) {
    const base = Math.pow(10, ratio);
    let result = divide(Math.round(Math.abs(times$1(num, base))), base);
    if (num < 0 && result !== 0) {
      result = times$1(result, -1);
    }
    return result;
  }
  function range$1(min = 0, max = 0, value2 = 0) {
    return Math.max(min, Math.min(max, Number(value2)));
  }
  function getPx(value2, unit = false) {
    if (number$1(value2)) {
      return unit ? `${value2}px` : Number(value2);
    }
    if (/(rpx|upx)$/.test(value2)) {
      return unit ? `${uni.upx2px(parseInt(value2))}px` : Number(uni.upx2px(parseInt(value2)));
    }
    return unit ? `${parseInt(value2)}px` : parseInt(value2);
  }
  function sleep(value2 = 30) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, value2);
    });
  }
  function os() {
    return uni.getSystemInfoSync().platform.toLowerCase();
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      const gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    }
    return 0;
  }
  function guid(len = 32, firstU = true, radix = null) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i2 = 0; i2 < len; i2++)
        uuid[i2] = chars[0 | Math.random() * radix];
    } else {
      let r2;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i2 = 0; i2 < 36; i2++) {
        if (!uuid[i2]) {
          r2 = 0 | Math.random() * 16;
          uuid[i2] = chars[i2 == 19 ? r2 & 3 | 8 : r2];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return `u${uuid.join("")}`;
    }
    return uuid.join("");
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function addStyle(customStyle, target = "object") {
    if (empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i2 = 0; i2 < styleArray.length; i2++) {
        if (styleArray[i2]) {
          const item = styleArray[i2].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i2 in customStyle) {
      const key = i2.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i2]};`;
    }
    return trim(string2);
  }
  function addUnit(value2 = "auto", unit = ((_b) => (_b = ((_a) => (_a = uni == null ? void 0 : uni.$uv) == null ? void 0 : _a.config)()) == null ? void 0 : _b.unit)() ? ((_d) => (_d = ((_c) => (_c = uni == null ? void 0 : uni.$uv) == null ? void 0 : _c.config)()) == null ? void 0 : _d.unit)() : "px") {
    value2 = String(value2);
    return number$1(value2) ? `${value2}${unit}` : value2;
  }
  function deepClone(obj, cache = /* @__PURE__ */ new WeakMap()) {
    if (obj === null || typeof obj !== "object")
      return obj;
    if (cache.has(obj))
      return cache.get(obj);
    let clone;
    if (obj instanceof Date) {
      clone = new Date(obj.getTime());
    } else if (obj instanceof RegExp) {
      clone = new RegExp(obj);
    } else if (obj instanceof Map) {
      clone = new Map(Array.from(obj, ([key, value2]) => [key, deepClone(value2, cache)]));
    } else if (obj instanceof Set) {
      clone = new Set(Array.from(obj, (value2) => deepClone(value2, cache)));
    } else if (Array.isArray(obj)) {
      clone = obj.map((value2) => deepClone(value2, cache));
    } else if (Object.prototype.toString.call(obj) === "[object Object]") {
      clone = Object.create(Object.getPrototypeOf(obj));
      cache.set(obj, clone);
      for (const [key, value2] of Object.entries(obj)) {
        clone[key] = deepClone(value2, cache);
      }
    } else {
      clone = Object.assign({}, obj);
    }
    cache.set(obj, clone);
    return clone;
  }
  function deepMerge$1(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || target === null || typeof source !== "object" || source === null)
      return target;
    const merged = Array.isArray(target) ? target.slice() : Object.assign({}, target);
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      const sourceValue = source[prop];
      const targetValue = merged[prop];
      if (sourceValue instanceof Date) {
        merged[prop] = new Date(sourceValue);
      } else if (sourceValue instanceof RegExp) {
        merged[prop] = new RegExp(sourceValue);
      } else if (sourceValue instanceof Map) {
        merged[prop] = new Map(sourceValue);
      } else if (sourceValue instanceof Set) {
        merged[prop] = new Set(sourceValue);
      } else if (typeof sourceValue === "object" && sourceValue !== null) {
        merged[prop] = deepMerge$1(targetValue, sourceValue);
      } else {
        merged[prop] = sourceValue;
      }
    }
    return merged;
  }
  function error(err) {
    {
      formatAppLog("error", "at uni_modules/uv-ui-tools/libs/function/index.js:250", `uvui提示：${err}`);
    }
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]") {
        throw new TypeError(
          "fillString must be String"
        );
      }
      const str = this;
      if (str.length >= maxLength)
        return String(str);
      const fillLength = maxLength - str.length;
      let times2 = Math.ceil(fillLength / fillString.length);
      while (times2 >>= 1) {
        fillString += fillString;
        if (times2 === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, formatStr = "yyyy-mm-dd") {
    let date2;
    if (!dateTime) {
      date2 = /* @__PURE__ */ new Date();
    } else if (/^\d{10}$/.test(dateTime == null ? void 0 : dateTime.toString().trim())) {
      date2 = new Date(dateTime * 1e3);
    } else if (typeof dateTime === "string" && /^\d+$/.test(dateTime.trim())) {
      date2 = new Date(Number(dateTime));
    } else if (typeof dateTime === "string" && dateTime.includes("-") && !dateTime.includes("T")) {
      date2 = new Date(dateTime.replace(/-/g, "/"));
    } else {
      date2 = new Date(dateTime);
    }
    const timeSource = {
      "y": date2.getFullYear().toString(),
      // 年
      "m": (date2.getMonth() + 1).toString().padStart(2, "0"),
      // 月
      "d": date2.getDate().toString().padStart(2, "0"),
      // 日
      "h": date2.getHours().toString().padStart(2, "0"),
      // 时
      "M": date2.getMinutes().toString().padStart(2, "0"),
      // 分
      "s": date2.getSeconds().toString().padStart(2, "0")
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const key in timeSource) {
      const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
      if (ret) {
        const beginIndex = key === "y" && ret.length === 2 ? 2 : 0;
        formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
      }
    }
    return formatStr;
  }
  function timeFrom(timestamp = null, format2 = "yyyy-mm-dd") {
    if (timestamp == null)
      timestamp = Number(/* @__PURE__ */ new Date());
    timestamp = parseInt(timestamp);
    if (timestamp.toString().length == 10)
      timestamp *= 1e3;
    let timer = (/* @__PURE__ */ new Date()).getTime() - timestamp;
    timer = parseInt(timer / 1e3);
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = `${parseInt(timer / 60)}分钟前`;
        break;
      case (timer >= 3600 && timer < 86400):
        tips = `${parseInt(timer / 3600)}小时前`;
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = `${parseInt(timer / 86400)}天前`;
        break;
      default:
        if (format2 === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = `${parseInt(timer / (86400 * 30))}个月前`;
          } else {
            tips = `${parseInt(timer / (86400 * 365))}年前`;
          }
        } else {
          tips = timeFormat(timestamp, format2);
        }
    }
    return tips;
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    const prefix = isPrefix ? "?" : "";
    const _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (const key in data) {
      const value2 = data[key];
      if (["", void 0, null].indexOf(value2) >= 0) {
        continue;
      }
      if (value2.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i2 = 0; i2 < value2.length; i2++) {
              _result.push(`${key}[${i2}]=${value2[i2]}`);
            }
            break;
          case "brackets":
            value2.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
            break;
          case "repeat":
            value2.forEach((_value) => {
              _result.push(`${key}=${_value}`);
            });
            break;
          case "comma":
            let commaStr = "";
            value2.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(`${key}=${commaStr}`);
            break;
          default:
            value2.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
        }
      } else {
        _result.push(`${key}=${value2}`);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  function toast(title, duration = 2e3) {
    uni.showToast({
      title: String(title),
      icon: "none",
      duration
    });
  }
  function type2icon(type2 = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type2) == -1)
      type2 = "success";
    let iconName = "";
    switch (type2) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function priceFormat(number2, decimals = 0, decimalPoint = ".", thousandsSeparator = ",") {
    number2 = `${number2}`.replace(/[^0-9+-Ee.]/g, "");
    const n2 = !isFinite(+number2) ? 0 : +number2;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
    const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
    let s2 = "";
    s2 = (prec ? round(n2, prec) + "" : `${Math.round(n2)}`).split(".");
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s2[0])) {
      s2[0] = s2[0].replace(re, `$1${sep}$2`);
    }
    if ((s2[1] || "").length < prec) {
      s2[1] = s2[1] || "";
      s2[1] += new Array(prec - s2[1].length + 1).join("0");
    }
    return s2.join(dec);
  }
  function getDuration(value2, unit = true) {
    const valueNum = parseInt(value2);
    if (unit) {
      if (/s$/.test(value2))
        return value2;
      return value2 > 30 ? `${value2}ms` : `${value2}s`;
    }
    if (/ms$/.test(value2))
      return valueNum;
    if (/s$/.test(value2))
      return valueNum > 30 ? valueNum : valueNum * 1e3;
    return valueNum;
  }
  function padZero(value2) {
    return `00${value2}`.slice(-2);
  }
  function formValidate(instance, event) {
    const formItem = $parent.call(instance, "uv-form-item");
    const form = $parent.call(instance, "uv-form");
    if (formItem && form) {
      form.validateField(formItem.prop, () => {
      }, event);
    }
  }
  function getProperty(obj, key) {
    if (!obj) {
      return;
    }
    if (typeof key !== "string" || key === "") {
      return "";
    }
    if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      let firstObj = obj[keys[0]] || {};
      for (let i2 = 1; i2 < keys.length; i2++) {
        if (firstObj) {
          firstObj = firstObj[keys[i2]];
        }
      }
      return firstObj;
    }
    return obj[key];
  }
  function setProperty(obj, key, value2) {
    if (!obj) {
      return;
    }
    const inFn = function(_obj, keys, v2) {
      if (keys.length === 1) {
        _obj[keys[0]] = v2;
        return;
      }
      while (keys.length > 1) {
        const k = keys[0];
        if (!_obj[k] || typeof _obj[k] !== "object") {
          _obj[k] = {};
        }
        keys.shift();
        inFn(_obj[k], keys, v2);
      }
    };
    if (typeof key !== "string" || key === "")
      ;
    else if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      inFn(obj, keys, value2);
    } else {
      obj[key] = value2;
    }
  }
  function page() {
    var _a;
    const pages2 = getCurrentPages();
    const route2 = (_a = pages2[pages2.length - 1]) == null ? void 0 : _a.route;
    return `/${route2 ? route2 : ""}`;
  }
  function pages() {
    const pages2 = getCurrentPages();
    return pages2;
  }
  function getHistoryPage(back = 0) {
    const pages2 = getCurrentPages();
    const len = pages2.length;
    return pages2[len - 1 + back];
  }
  function setConfig({
    props: props2 = {},
    config = {},
    color = {},
    zIndex = {}
  }) {
    const {
      deepMerge: deepMerge2
    } = uni.$uv;
    uni.$uv.config = deepMerge2(uni.$uv.config, config);
    uni.$uv.props = deepMerge2(uni.$uv.props, props2);
    uni.$uv.color = deepMerge2(uni.$uv.color, color);
    uni.$uv.zIndex = deepMerge2(uni.$uv.zIndex, zIndex);
  }
  const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    $parent,
    addStyle,
    addUnit,
    deepClone,
    deepMerge: deepMerge$1,
    error,
    formValidate,
    getDuration,
    getHistoryPage,
    getProperty,
    getPx,
    guid,
    os,
    padZero,
    page,
    pages,
    priceFormat,
    queryParams,
    random,
    randomArray,
    range: range$1,
    setConfig,
    setProperty,
    sleep,
    sys,
    timeFormat,
    timeFrom,
    toast,
    trim,
    type2icon
  }, Symbol.toStringTag, { value: "Module" }));
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false,
        // 是否需要拦截
        events: {}
        // 页面间通信接口，用于监听被打开页面发送到当前页面的数据。hbuilderx 2.8.9+ 开始支持。
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = queryParams(params, false);
        return url2 += `&${query}`;
      }
      query = queryParams(params);
      return url2 += query;
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig = {};
      if (typeof options === "string") {
        mergeConfig.url = this.mixinParam(options, params);
        mergeConfig.type = "navigateTo";
      } else {
        mergeConfig = deepMerge$1(this.config, options);
        mergeConfig.url = this.mixinParam(options.url, options.params);
      }
      if (mergeConfig.url === page())
        return;
      if (params.intercept) {
        mergeConfig.intercept = params.intercept;
      }
      mergeConfig.params = params;
      mergeConfig = deepMerge$1(this.config, mergeConfig);
      if (typeof mergeConfig.intercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          mergeConfig.intercept(mergeConfig, resolve);
        });
        isNext && this.openPage(mergeConfig);
      } else {
        this.openPage(mergeConfig);
      }
    }
    // 执行路由跳转
    openPage(config) {
      const {
        url: url2,
        type: type2,
        delta,
        animationType,
        animationDuration,
        events
      } = config;
      if (config.type == "navigateTo" || config.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration,
          events
        });
      }
      if (config.type == "redirectTo" || config.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config.type == "switchTab" || config.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config.type == "reLaunch" || config.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config.type == "navigateBack" || config.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  let timeout = null;
  function debounce(func2, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(() => {
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  let flag;
  function throttle(func2, wait = 500, immediate = true) {
    if (immediate) {
      if (!flag) {
        flag = true;
        typeof func2 === "function" && func2();
        setTimeout(() => {
          flag = false;
        }, wait);
      }
    } else if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  const mixin = {
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
      // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
      customStyle: {
        type: [Object, String],
        default: () => ({})
      },
      customClass: {
        type: String,
        default: ""
      },
      // 跳转的页面路径
      url: {
        type: String,
        default: ""
      },
      // 页面跳转的类型
      linkType: {
        type: String,
        default: "navigateTo"
      }
    },
    data() {
      return {};
    },
    onLoad() {
      this.$uv.getRect = this.$uvGetRect;
    },
    created() {
      this.$uv.getRect = this.$uvGetRect;
    },
    computed: {
      $uv() {
        var _a, _b;
        return {
          ...index,
          test,
          route,
          debounce,
          throttle,
          unit: (_b = (_a = uni == null ? void 0 : uni.$uv) == null ? void 0 : _a.config) == null ? void 0 : _b.unit
        };
      },
      /**
       * 生成bem规则类名
       * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
       * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
       * @param {String} name 组件名称
       * @param {Array} fixed 一直会存在的类名
       * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
       * @returns {Array|string}
       */
      bem() {
        return function(name, fixed, change) {
          const prefix = `uv-${name}--`;
          const classes = {};
          if (fixed) {
            fixed.map((item) => {
              classes[prefix + this[item]] = true;
            });
          }
          if (change) {
            change.map((item) => {
              this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
            });
          }
          return Object.keys(classes);
        };
      }
    },
    methods: {
      // 跳转某一个页面
      openPage(urlKey = "url") {
        const url2 = this[urlKey];
        if (url2) {
          uni[this.linkType]({
            url: url2
          });
        }
      },
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uvGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = {};
        this.parent = this.$uv.$parent.call(this, parentName);
        if (this.parent.children) {
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
        }
        if (this.parent && this.parentData) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
        }
      },
      // 阻止事件冒泡
      preventEvent(e2) {
        e2 && typeof e2.stopPropagation === "function" && e2.stopPropagation();
      },
      // 空操作
      noop(e2) {
        this.preventEvent(e2);
      }
    },
    onReachBottom() {
      uni.$emit("uvOnReachBottom");
    },
    beforeDestroy() {
      if (this.parent && array$1(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    },
    // 兼容vue3
    unmounted() {
      if (this.parent && array$1(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    }
  };
  const icons$1 = {
    "uvicon-level": "e68f",
    "uvicon-checkbox-mark": "e659",
    "uvicon-folder": "e694",
    "uvicon-movie": "e67c",
    "uvicon-star-fill": "e61e",
    "uvicon-star": "e618",
    "uvicon-phone-fill": "e6ac",
    "uvicon-phone": "e6ba",
    "uvicon-apple-fill": "e635",
    "uvicon-backspace": "e64d",
    "uvicon-attach": "e640",
    "uvicon-empty-data": "e671",
    "uvicon-empty-address": "e68a",
    "uvicon-empty-favor": "e662",
    "uvicon-empty-car": "e657",
    "uvicon-empty-order": "e66b",
    "uvicon-empty-list": "e672",
    "uvicon-empty-search": "e677",
    "uvicon-empty-permission": "e67d",
    "uvicon-empty-news": "e67e",
    "uvicon-empty-history": "e685",
    "uvicon-empty-coupon": "e69b",
    "uvicon-empty-page": "e60e",
    "uvicon-empty-wifi-off": "e6cc",
    "uvicon-reload": "e627",
    "uvicon-order": "e695",
    "uvicon-server-man": "e601",
    "uvicon-search": "e632",
    "uvicon-more-dot-fill": "e66f",
    "uvicon-scan": "e631",
    "uvicon-map": "e665",
    "uvicon-map-fill": "e6a8",
    "uvicon-tags": "e621",
    "uvicon-tags-fill": "e613",
    "uvicon-eye": "e664",
    "uvicon-eye-fill": "e697",
    "uvicon-eye-off": "e69c",
    "uvicon-eye-off-outline": "e688",
    "uvicon-mic": "e66d",
    "uvicon-mic-off": "e691",
    "uvicon-calendar": "e65c",
    "uvicon-trash": "e623",
    "uvicon-trash-fill": "e6ce",
    "uvicon-play-left": "e6bf",
    "uvicon-play-right": "e6b3",
    "uvicon-minus": "e614",
    "uvicon-plus": "e625",
    "uvicon-info-circle": "e69f",
    "uvicon-info-circle-fill": "e6a7",
    "uvicon-question-circle": "e622",
    "uvicon-question-circle-fill": "e6bc",
    "uvicon-close": "e65a",
    "uvicon-checkmark": "e64a",
    "uvicon-checkmark-circle": "e643",
    "uvicon-checkmark-circle-fill": "e668",
    "uvicon-setting": "e602",
    "uvicon-setting-fill": "e6d0",
    "uvicon-heart": "e6a2",
    "uvicon-heart-fill": "e68b",
    "uvicon-camera": "e642",
    "uvicon-camera-fill": "e650",
    "uvicon-more-circle": "e69e",
    "uvicon-more-circle-fill": "e684",
    "uvicon-chat": "e656",
    "uvicon-chat-fill": "e63f",
    "uvicon-bag": "e647",
    "uvicon-error-circle": "e66e",
    "uvicon-error-circle-fill": "e655",
    "uvicon-close-circle": "e64e",
    "uvicon-close-circle-fill": "e666",
    "uvicon-share": "e629",
    "uvicon-share-fill": "e6bb",
    "uvicon-share-square": "e6c4",
    "uvicon-shopping-cart": "e6cb",
    "uvicon-shopping-cart-fill": "e630",
    "uvicon-bell": "e651",
    "uvicon-bell-fill": "e604",
    "uvicon-list": "e690",
    "uvicon-list-dot": "e6a9",
    "uvicon-zhifubao-circle-fill": "e617",
    "uvicon-weixin-circle-fill": "e6cd",
    "uvicon-weixin-fill": "e620",
    "uvicon-qq-fill": "e608",
    "uvicon-qq-circle-fill": "e6b9",
    "uvicon-moments-circel-fill": "e6c2",
    "uvicon-moments": "e6a0",
    "uvicon-car": "e64f",
    "uvicon-car-fill": "e648",
    "uvicon-warning-fill": "e6c7",
    "uvicon-warning": "e6c1",
    "uvicon-clock-fill": "e64b",
    "uvicon-clock": "e66c",
    "uvicon-edit-pen": "e65d",
    "uvicon-edit-pen-fill": "e679",
    "uvicon-email": "e673",
    "uvicon-email-fill": "e683",
    "uvicon-minus-circle": "e6a5",
    "uvicon-plus-circle": "e603",
    "uvicon-plus-circle-fill": "e611",
    "uvicon-file-text": "e687",
    "uvicon-file-text-fill": "e67f",
    "uvicon-pushpin": "e6d1",
    "uvicon-pushpin-fill": "e6b6",
    "uvicon-grid": "e68c",
    "uvicon-grid-fill": "e698",
    "uvicon-play-circle": "e6af",
    "uvicon-play-circle-fill": "e62a",
    "uvicon-pause-circle-fill": "e60c",
    "uvicon-pause": "e61c",
    "uvicon-pause-circle": "e696",
    "uvicon-gift-fill": "e6b0",
    "uvicon-gift": "e680",
    "uvicon-kefu-ermai": "e660",
    "uvicon-server-fill": "e610",
    "uvicon-coupon-fill": "e64c",
    "uvicon-coupon": "e65f",
    "uvicon-integral": "e693",
    "uvicon-integral-fill": "e6b1",
    "uvicon-home-fill": "e68e",
    "uvicon-home": "e67b",
    "uvicon-account": "e63a",
    "uvicon-account-fill": "e653",
    "uvicon-thumb-down-fill": "e628",
    "uvicon-thumb-down": "e60a",
    "uvicon-thumb-up": "e612",
    "uvicon-thumb-up-fill": "e62c",
    "uvicon-lock-fill": "e6a6",
    "uvicon-lock-open": "e68d",
    "uvicon-lock-opened-fill": "e6a1",
    "uvicon-lock": "e69d",
    "uvicon-red-packet": "e6c3",
    "uvicon-photo-fill": "e6b4",
    "uvicon-photo": "e60d",
    "uvicon-volume-off-fill": "e6c8",
    "uvicon-volume-off": "e6bd",
    "uvicon-volume-fill": "e624",
    "uvicon-volume": "e605",
    "uvicon-download": "e670",
    "uvicon-arrow-up-fill": "e636",
    "uvicon-arrow-down-fill": "e638",
    "uvicon-play-left-fill": "e6ae",
    "uvicon-play-right-fill": "e6ad",
    "uvicon-arrow-downward": "e634",
    "uvicon-arrow-leftward": "e63b",
    "uvicon-arrow-rightward": "e644",
    "uvicon-arrow-upward": "e641",
    "uvicon-arrow-down": "e63e",
    "uvicon-arrow-right": "e63c",
    "uvicon-arrow-left": "e646",
    "uvicon-arrow-up": "e633",
    "uvicon-skip-back-left": "e6c5",
    "uvicon-skip-forward-right": "e61f",
    "uvicon-arrow-left-double": "e637",
    "uvicon-man": "e675",
    "uvicon-woman": "e626",
    "uvicon-en": "e6b8",
    "uvicon-twitte": "e607",
    "uvicon-twitter-circle-fill": "e6cf"
  };
  const props$t = {
    props: {
      // 图标类名
      name: {
        type: String,
        default: ""
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: "#606266"
      },
      // 字体大小，单位px
      size: {
        type: [String, Number],
        default: "16px"
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: false
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [String, Number],
        default: null
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: "uvicon"
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: ""
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: "right"
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: "15px"
      },
      // label的颜色
      labelColor: {
        type: String,
        default: "#606266"
      },
      // label与图标的距离
      space: {
        type: [String, Number],
        default: "3px"
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: "aspectFit"
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: ""
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: ""
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: 0
      },
      // 是否阻止事件传播
      stop: {
        type: Boolean,
        default: false
      },
      ...(_f = (_e = uni.$uv) == null ? void 0 : _e.props) == null ? void 0 : _f.icon
    }
  };
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$1r = {
    name: "uv-icon",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$t],
    data() {
      return {
        colorType: [
          "primary",
          "success",
          "info",
          "error",
          "warning"
        ]
      };
    },
    computed: {
      uClasses() {
        let classes = [];
        classes.push(this.customPrefix);
        classes.push(this.customPrefix + "-" + this.name);
        if (this.color && this.colorType.includes(this.color))
          classes.push("uv-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: this.$uv.addUnit(this.size),
          lineHeight: this.$uv.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$uv.addUnit(this.top)
        };
        if (this.color && !this.colorType.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        const isBase64 = this.name.indexOf("data:") > -1 && this.name.indexOf("base64") > -1;
        return this.name.indexOf("/") !== -1 || isBase64;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? this.$uv.addUnit(this.width) : this.$uv.addUnit(this.size);
        style.height = this.height ? this.$uv.addUnit(this.height) : this.$uv.addUnit(this.size);
        return style;
      },
      // 通过图标名，查找对应的图标
      icon() {
        const code2 = icons$1["uvicon-" + this.name];
        return code2 ? unescape(`%u${code2}`) : ["uvicon"].indexOf(this.customPrefix) > -1 ? this.name : "";
      }
    },
    methods: {
      clickHandler(e2) {
        this.$emit("click", this.index);
        this.stop && this.preventEvent(e2);
      }
    }
  };
  function _sfc_render$1q(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-icon", ["uv-icon--" + _ctx.labelPos]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "uv-icon__img",
          src: _ctx.name,
          mode: _ctx.imgMode,
          style: vue.normalizeStyle([$options.imgStyle, _ctx.$uv.addStyle(_ctx.customStyle)])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("text", {
          key: 1,
          class: vue.normalizeClass(["uv-icon__icon", $options.uClasses]),
          style: vue.normalizeStyle([$options.iconStyle, _ctx.$uv.addStyle(_ctx.customStyle)]),
          "hover-class": _ctx.hoverClass
        }, vue.toDisplayString($options.icon), 15, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 '),
        _ctx.label !== "" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "uv-icon__label",
            style: vue.normalizeStyle({
              color: _ctx.labelColor,
              fontSize: _ctx.$uv.addUnit(_ctx.labelSize),
              marginLeft: _ctx.labelPos == "right" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginTop: _ctx.labelPos == "bottom" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginRight: _ctx.labelPos == "left" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginBottom: _ctx.labelPos == "top" ? _ctx.$uv.addUnit(_ctx.space) : 0
            })
          },
          vue.toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$h = /* @__PURE__ */ _export_sfc(_sfc_main$1r, [["render", _sfc_render$1q], ["__scopeId", "data-v-b7a6dd5d"], ["__file", "E:/BankSystem/user/uni_modules/uv-icon/components/uv-icon/uv-icon.vue"]]);
  let MPAnimation$1 = class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type2, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1$1.includes(type2)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type2 === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type2}(${args + unit}) `;
      } else {
        styles.styles[type2] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  };
  const animateTypes1$1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2$1 = ["opacity", "backgroundColor"];
  const animateTypes3$1 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1$1.concat(animateTypes2$1, animateTypes3$1).forEach((type2) => {
    MPAnimation$1.prototype[type2] = function(...args) {
      this.animation[type2](...args);
      return this;
    };
  });
  function createAnimation$1(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation$1(option, _this);
  }
  const _sfc_main$1q = {
    name: "uv-transition",
    mixins: [mpMixin, mixin],
    emits: ["click", "change"],
    props: {
      // 是否展示组件
      show: {
        type: Boolean,
        default: false
      },
      // 使用的动画模式
      mode: {
        type: [Array, String, null],
        default() {
          return "fade";
        }
      },
      // 动画的执行时间，单位ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 使用的动画过渡函数
      timingFunction: {
        type: String,
        default: "ease-out"
      },
      customClass: {
        type: String,
        default: ""
      },
      // nvue模式下 是否直接显示，在uv-list等cell下面使用就需要设置
      cellChild: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 初始化动画条件
      transformStyles() {
        const style = {
          transform: this.transform,
          opacity: this.opacity,
          ...this.$uv.addStyle(this.customStyle),
          "transition-duration": `${this.duration / 1e3}s`
        };
        return this.$uv.addStyle(style, "string");
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: this.timingFunction,
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation$1(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i2 in obj) {
          try {
            if (typeof obj[i2] === "object") {
              this.animation[i2](...obj[i2]);
            } else {
              this.animation[i2](obj[i2]);
            }
          } catch (e2) {
            formatAppLog("error", "at uni_modules/uv-transition/components/uv-transition/uv-transition.vue:166", `方法 ${i2} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation$1(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过渡动画
      close(type2) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type2) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type3, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type3)[mode];
          } else {
            styles.transform += this.animationType(type3)[mode] + " ";
          }
        };
        if (typeof this.mode === "string") {
          buildStyle(type2, this.mode);
        } else {
          this.mode.forEach((mode) => {
            buildStyle(type2, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type2) {
        let buildTranfrom = (type3, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type3 ? 0 : 1;
          } else {
            aniNum = type3 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type3 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type3 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type3 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type3 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.mode === "string") {
          buildTranfrom(type2, this.mode);
        } else {
          this.mode.forEach((mode) => {
            buildTranfrom(type2, mode);
          });
        }
        return this.animation;
      },
      animationType(type2) {
        return {
          fade: type2 ? 1 : 0,
          "slide-top": `translateY(${type2 ? "0" : "-100%"})`,
          "slide-right": `translateX(${type2 ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type2 ? "0" : "100%"})`,
          "slide-left": `translateX(${type2 ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type2 ? 1 : 0.8}) scaleY(${type2 ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type2 ? 1 : 1.2}) scaleY(${type2 ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$1p(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_4$3 = /* @__PURE__ */ _export_sfc(_sfc_main$1q, [["render", _sfc_render$1p], ["__file", "E:/BankSystem/user/uni_modules/uv-transition/components/uv-transition/uv-transition.vue"]]);
  const props$s = {
    props: {
      color: {
        type: String,
        default: "#d6d7d9"
      },
      // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
      length: {
        type: [String, Number],
        default: "100%"
      },
      // 线条方向，col-竖向，row-横向
      direction: {
        type: String,
        default: "row"
      },
      // 是否显示细边框
      hairline: {
        type: Boolean,
        default: true
      },
      // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
      margin: {
        type: [String, Number],
        default: 0
      },
      // 是否虚线，true-虚线，false-实线
      dashed: {
        type: Boolean,
        default: false
      },
      ...(_h = (_g = uni.$uv) == null ? void 0 : _g.props) == null ? void 0 : _h.line
    }
  };
  const _sfc_main$1p = {
    name: "uv-line",
    mixins: [mpMixin, mixin, props$s],
    computed: {
      lineStyle() {
        const style = {};
        style.margin = this.margin;
        if (this.direction === "row") {
          style.borderBottomWidth = "1px";
          style.borderBottomStyle = this.dashed ? "dashed" : "solid";
          style.width = this.$uv.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleY(0.5)";
        } else {
          style.borderLeftWidth = "1px";
          style.borderLeftStyle = this.dashed ? "dashed" : "solid";
          style.height = this.$uv.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleX(0.5)";
        }
        style.borderColor = this.color;
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$1o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-line",
        style: vue.normalizeStyle([$options.lineStyle])
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_4$2 = /* @__PURE__ */ _export_sfc(_sfc_main$1p, [["render", _sfc_render$1o], ["__scopeId", "data-v-dcf8cb8f"], ["__file", "E:/BankSystem/user/uni_modules/uv-line/components/uv-line/uv-line.vue"]]);
  const props$r = {
    props: {
      // input的label提示语
      label: {
        type: String,
        default: ""
      },
      // 绑定的值
      prop: {
        type: String,
        default: ""
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: [Boolean],
        default: false
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: ""
      },
      // label的宽度，单位px
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // 右侧图标
      rightIcon: {
        type: String,
        default: ""
      },
      // 左侧图标
      leftIcon: {
        type: String,
        default: ""
      },
      // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
      required: {
        type: Boolean,
        default: false
      },
      leftIconStyle: {
        type: [String, Object],
        default: ""
      },
      ...(_j = (_i = uni.$uv) == null ? void 0 : _i.props) == null ? void 0 : _j.formItem
    }
  };
  const _sfc_main$1o = {
    name: "uv-form-item",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$r],
    data() {
      return {
        // 错误提示语
        message: "",
        parentData: {
          // 提示文本的位置
          labelPosition: "left",
          // 提示文本对齐方式
          labelAlign: "left",
          // 提示文本的样式
          labelStyle: {},
          // 提示文本的宽度
          labelWidth: 45,
          // 错误提示方式
          errorType: "message"
        }
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.updateParentData();
        if (!this.parent) {
          this.$uv.error("uv-form-item需要结合uv-form组件使用");
        }
      },
      // 获取父组件的参数
      updateParentData() {
        this.getParentData("uv-form");
      },
      // 移除uv-form-item的校验结果
      clearValidate() {
        this.message = null;
      },
      // 清空当前的组件的校验结果，并重置为初始值
      resetField() {
        const value2 = this.$uv.getProperty(this.parent.originalModel, this.prop);
        this.$uv.setProperty(this.parent.model, this.prop, value2);
        this.message = null;
      },
      // 点击组件
      clickHandler() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$1n(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_4$3);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_4$2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-form-item" }, [
      vue.createElementVNode(
        "view",
        {
          class: "uv-form-item__body",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args)),
          style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle), {
            flexDirection: (_ctx.labelPosition || $data.parentData.labelPosition) === "left" ? "row" : "column"
          }])
        },
        [
          vue.createCommentVNode(' 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" '),
          vue.renderSlot(_ctx.$slots, "label", {}, () => [
            _ctx.required || _ctx.leftIcon || _ctx.label ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: "uv-form-item__body__left",
                style: vue.normalizeStyle({
                  width: _ctx.$uv.addUnit(_ctx.labelWidth || $data.parentData.labelWidth),
                  marginBottom: $data.parentData.labelPosition === "left" ? 0 : "5px"
                })
              },
              [
                vue.createCommentVNode(" 为了块对齐 "),
                vue.createElementVNode("view", { class: "uv-form-item__body__left__content" }, [
                  vue.createCommentVNode(" nvue不支持伪元素before "),
                  _ctx.required ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "uv-form-item__body__left__content__required"
                  }, "*")) : vue.createCommentVNode("v-if", true),
                  _ctx.leftIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "uv-form-item__body__left__content__icon"
                  }, [
                    vue.createVNode(_component_uv_icon, {
                      name: _ctx.leftIcon,
                      "custom-style": _ctx.leftIconStyle
                    }, null, 8, ["name", "custom-style"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "text",
                    {
                      class: "uv-form-item__body__left__content__label",
                      style: vue.normalizeStyle([$data.parentData.labelStyle, {
                        justifyContent: $data.parentData.labelAlign === "left" ? "flex-start" : $data.parentData.labelAlign === "center" ? "center" : "flex-end"
                      }])
                    },
                    vue.toDisplayString(_ctx.label),
                    5
                    /* TEXT, STYLE */
                  )
                ])
              ],
              4
              /* STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ], true),
          vue.createElementVNode("view", { class: "uv-form-item__body__right" }, [
            vue.createElementVNode("view", { class: "uv-form-item__body__right__content" }, [
              vue.createElementVNode("view", { class: "uv-form-item__body__right__content__slot" }, [
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ]),
              vue.createElementVNode("view", { class: "item__body__right__content__icon" }, [
                vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
              ])
            ])
          ])
        ],
        4
        /* STYLE */
      ),
      vue.renderSlot(_ctx.$slots, "error", {}, () => [
        !!$data.message && $data.parentData.errorType === "message" ? (vue.openBlock(), vue.createBlock(_component_uv_transition, {
          key: 0,
          show: true,
          duration: 100,
          mode: "fade"
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode(
              "text",
              {
                class: "uv-form-item__body__right__message",
                style: vue.normalizeStyle({
                  marginLeft: _ctx.$uv.addUnit($data.parentData.labelPosition === "top" ? 0 : _ctx.labelWidth || $data.parentData.labelWidth)
                })
              },
              vue.toDisplayString($data.message),
              5
              /* TEXT, STYLE */
            )
          ]),
          _: 1
          /* STABLE */
        })) : vue.createCommentVNode("v-if", true)
      ], true),
      _ctx.borderBottom ? (vue.openBlock(), vue.createBlock(_component_uv_line, {
        key: 0,
        color: $data.message && $data.parentData.errorType === "border-bottom" ? "#f56c6c" : "#d6d7d9"
      }, null, 8, ["color"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$b = /* @__PURE__ */ _export_sfc(_sfc_main$1o, [["render", _sfc_render$1n], ["__scopeId", "data-v-d1e73275"], ["__file", "E:/BankSystem/user/uni_modules/uv-form/components/uv-form-item/uv-form-item.vue"]]);
  const props$q = {
    props: {
      // 当前form的需要验证字段的集合
      model: {
        type: Object,
        default: () => ({})
      },
      // 验证规则
      rules: {
        type: [Object, Function, Array],
        default: () => ({})
      },
      // 有错误时的提示方式，message-提示信息，toast-进行toast提示
      // border-bottom-下边框呈现红色，none-无提示
      errorType: {
        type: String,
        default: "message"
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: Boolean,
        default: true
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: "left"
      },
      // label的宽度，单位px
      labelWidth: {
        type: [String, Number],
        default: 45
      },
      // lable字体的对齐方式
      labelAlign: {
        type: String,
        default: "left"
      },
      // lable的样式，对象形式
      labelStyle: {
        type: Object,
        default: () => ({})
      },
      ...(_l = (_k = uni.$uv) == null ? void 0 : _k.props) == null ? void 0 : _l.form
    }
  };
  const formatRegExp = /%[sdj%]/g;
  let warning = function warning2() {
  };
  if (typeof process !== "undefined" && process.env && true && typeof window !== "undefined" && typeof document !== "undefined") {
    warning = function warning2(type2, errors) {
      if (typeof console !== "undefined" && console.warn) {
        if (errors.every((e2) => typeof e2 === "string")) {
          formatAppLog("warn", "at uni_modules/uv-form/components/uv-form/valid.js:28", type2, errors);
        }
      }
    };
  }
  function convertFieldsError(errors) {
    if (!errors || !errors.length)
      return null;
    const fields = {};
    errors.forEach((error2) => {
      const { field } = error2;
      fields[field] = fields[field] || [];
      fields[field].push(error2);
    });
    return fields;
  }
  function format() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    let i2 = 1;
    const f2 = args[0];
    const len = args.length;
    if (typeof f2 === "function") {
      return f2.apply(null, args.slice(1));
    }
    if (typeof f2 === "string") {
      let str = String(f2).replace(formatRegExp, (x) => {
        if (x === "%%") {
          return "%";
        }
        if (i2 >= len) {
          return x;
        }
        switch (x) {
          case "%s":
            return String(args[i2++]);
          case "%d":
            return Number(args[i2++]);
          case "%j":
            try {
              return JSON.stringify(args[i2++]);
            } catch (_) {
              return "[Circular]";
            }
            break;
          default:
            return x;
        }
      });
      for (let arg = args[i2]; i2 < len; arg = args[++i2]) {
        str += ` ${arg}`;
      }
      return str;
    }
    return f2;
  }
  function isNativeStringType(type2) {
    return type2 === "string" || type2 === "url" || type2 === "hex" || type2 === "email" || type2 === "pattern";
  }
  function isEmptyValue$1(value2, type2) {
    if (value2 === void 0 || value2 === null) {
      return true;
    }
    if (type2 === "array" && Array.isArray(value2) && !value2.length) {
      return true;
    }
    if (isNativeStringType(type2) && typeof value2 === "string" && !value2) {
      return true;
    }
    return false;
  }
  function asyncParallelArray(arr, func2, callback) {
    const results = [];
    let total = 0;
    const arrLength = arr.length;
    function count(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === arrLength) {
        callback(results);
      }
    }
    arr.forEach((a2) => {
      func2(a2, count);
    });
  }
  function asyncSerialArray(arr, func2, callback) {
    let index2 = 0;
    const arrLength = arr.length;
    function next(errors) {
      if (errors && errors.length) {
        callback(errors);
        return;
      }
      const original = index2;
      index2 += 1;
      if (original < arrLength) {
        func2(arr[original], next);
      } else {
        callback([]);
      }
    }
    next([]);
  }
  function flattenObjArr(objArr) {
    const ret = [];
    Object.keys(objArr).forEach((k) => {
      ret.push.apply(ret, objArr[k]);
    });
    return ret;
  }
  function asyncMap(objArr, option, func2, callback) {
    if (option.first) {
      const _pending = new Promise((resolve, reject) => {
        const next = function next2(errors) {
          callback(errors);
          return errors.length ? reject({
            errors,
            fields: convertFieldsError(errors)
          }) : resolve();
        };
        const flattenArr = flattenObjArr(objArr);
        asyncSerialArray(flattenArr, func2, next);
      });
      _pending.catch((e2) => e2);
      return _pending;
    }
    let firstFields = option.firstFields || [];
    if (firstFields === true) {
      firstFields = Object.keys(objArr);
    }
    const objArrKeys = Object.keys(objArr);
    const objArrLength = objArrKeys.length;
    let total = 0;
    const results = [];
    const pending = new Promise((resolve, reject) => {
      const next = function next2(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === objArrLength) {
          callback(results);
          return results.length ? reject({
            errors: results,
            fields: convertFieldsError(results)
          }) : resolve();
        }
      };
      if (!objArrKeys.length) {
        callback(results);
        resolve();
      }
      objArrKeys.forEach((key) => {
        const arr = objArr[key];
        if (firstFields.indexOf(key) !== -1) {
          asyncSerialArray(arr, func2, next);
        } else {
          asyncParallelArray(arr, func2, next);
        }
      });
    });
    pending.catch((e2) => e2);
    return pending;
  }
  function complementError(rule) {
    return function(oe) {
      if (oe && oe.message) {
        oe.field = oe.field || rule.fullField;
        return oe;
      }
      return {
        message: typeof oe === "function" ? oe() : oe,
        field: oe.field || rule.fullField
      };
    };
  }
  function deepMerge(target, source) {
    if (source) {
      for (const s2 in source) {
        if (source.hasOwnProperty(s2)) {
          const value2 = source[s2];
          if (typeof value2 === "object" && typeof target[s2] === "object") {
            target[s2] = { ...target[s2], ...value2 };
          } else {
            target[s2] = value2;
          }
        }
      }
    }
    return target;
  }
  function required(rule, value2, source, errors, options, type2) {
    if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue$1(value2, type2 || rule.type))) {
      errors.push(format(options.messages.required, rule.fullField));
    }
  }
  function whitespace(rule, value2, source, errors, options) {
    if (/^\s+$/.test(value2) || value2 === "") {
      errors.push(format(options.messages.whitespace, rule.fullField));
    }
  }
  const pattern$1 = {
    // http://emailregex.com/
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    ),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
  };
  var types$1 = {
    integer: function integer2(value2) {
      return /^(-)?\d+$/.test(value2);
    },
    float: function float(value2) {
      return /^(-)?\d+(\.\d+)?$/.test(value2);
    },
    array: function array2(value2) {
      return Array.isArray(value2);
    },
    regexp: function regexp2(value2) {
      if (value2 instanceof RegExp) {
        return true;
      }
      try {
        return !!new RegExp(value2);
      } catch (e2) {
        return false;
      }
    },
    date: function date2(value2) {
      return typeof value2.getTime === "function" && typeof value2.getMonth === "function" && typeof value2.getYear === "function";
    },
    number: function number2(value2) {
      if (isNaN(value2)) {
        return false;
      }
      return typeof +value2 === "number";
    },
    object: function object2(value2) {
      return typeof value2 === "object" && !types$1.array(value2);
    },
    method: function method2(value2) {
      return typeof value2 === "function";
    },
    email: function email2(value2) {
      return typeof value2 === "string" && !!value2.match(pattern$1.email) && value2.length < 255;
    },
    url: function url2(value2) {
      return typeof value2 === "string" && !!value2.match(pattern$1.url);
    },
    hex: function hex(value2) {
      return typeof value2 === "string" && !!value2.match(pattern$1.hex);
    }
  };
  function type(rule, value2, source, errors, options) {
    if (rule.required && value2 === void 0) {
      required(rule, value2, source, errors, options);
      return;
    }
    const custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
    const ruleType = rule.type;
    if (custom.indexOf(ruleType) > -1) {
      if (!types$1[ruleType](value2)) {
        errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
      }
    } else if (ruleType && typeof value2 !== rule.type) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  }
  function range(rule, value2, source, errors, options) {
    const len = typeof rule.len === "number";
    const min = typeof rule.min === "number";
    const max = typeof rule.max === "number";
    const spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    let val = value2;
    let key = null;
    const num = typeof value2 === "number";
    const str = typeof value2 === "string";
    const arr = Array.isArray(value2);
    if (num) {
      key = "number";
    } else if (str) {
      key = "string";
    } else if (arr) {
      key = "array";
    }
    if (!key) {
      return false;
    }
    if (arr) {
      val = value2.length;
    }
    if (str) {
      val = value2.replace(spRegexp, "_").length;
    }
    if (len) {
      if (val !== rule.len) {
        errors.push(format(options.messages[key].len, rule.fullField, rule.len));
      }
    } else if (min && !max && val < rule.min) {
      errors.push(format(options.messages[key].min, rule.fullField, rule.min));
    } else if (max && !min && val > rule.max) {
      errors.push(format(options.messages[key].max, rule.fullField, rule.max));
    } else if (min && max && (val < rule.min || val > rule.max)) {
      errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
    }
  }
  const ENUM = "enum";
  function enumerable(rule, value2, source, errors, options) {
    rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
    if (rule[ENUM].indexOf(value2) === -1) {
      errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(", ")));
    }
  }
  function pattern$1$1(rule, value2, source, errors, options) {
    if (rule.pattern) {
      if (rule.pattern instanceof RegExp) {
        rule.pattern.lastIndex = 0;
        if (!rule.pattern.test(value2)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value2, rule.pattern));
        }
      } else if (typeof rule.pattern === "string") {
        const _pattern = new RegExp(rule.pattern);
        if (!_pattern.test(value2)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value2, rule.pattern));
        }
      }
    }
  }
  const rules = {
    required,
    whitespace,
    type,
    range,
    enum: enumerable,
    pattern: pattern$1$1
  };
  function string(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue$1(value2, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options, "string");
      if (!isEmptyValue$1(value2, "string")) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
        rules.pattern(rule, value2, source, errors, options);
        if (rule.whitespace === true) {
          rules.whitespace(rule, value2, source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function method(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function number(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (value2 === "") {
        value2 = void 0;
      }
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function _boolean(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function regexp(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (!isEmptyValue$1(value2)) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function integer(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function floatFn(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function array(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue$1(value2, "array") && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options, "array");
      if (!isEmptyValue$1(value2, "array")) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function object(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  const ENUM$1 = "enum";
  function enumerable$1(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules[ENUM$1](rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function pattern$2(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue$1(value2, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (!isEmptyValue$1(value2, "string")) {
        rules.pattern(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function date(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (!isEmptyValue$1(value2)) {
        let dateObject;
        if (typeof value2 === "number") {
          dateObject = new Date(value2);
        } else {
          dateObject = value2;
        }
        rules.type(rule, dateObject, source, errors, options);
        if (dateObject) {
          rules.range(rule, dateObject.getTime(), source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function required$1(rule, value2, callback, source, options) {
    const errors = [];
    const type2 = Array.isArray(value2) ? "array" : typeof value2;
    rules.required(rule, value2, source, errors, options, type2);
    callback(errors);
  }
  function type$1(rule, value2, callback, source, options) {
    const ruleType = rule.type;
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue$1(value2, ruleType) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options, ruleType);
      if (!isEmptyValue$1(value2, ruleType)) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function any(rule, value2, callback, source, options) {
    const errors = [];
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
    }
    callback(errors);
  }
  const validators = {
    string,
    method,
    number,
    boolean: _boolean,
    regexp,
    integer,
    float: floatFn,
    array,
    object,
    enum: enumerable$1,
    pattern: pattern$2,
    date,
    url: type$1,
    hex: type$1,
    email: type$1,
    required: required$1,
    any
  };
  function newMessages() {
    return {
      default: "Validation error on field %s",
      required: "%s is required",
      enum: "%s must be one of %s",
      whitespace: "%s cannot be empty",
      date: {
        format: "%s date %s is invalid for format %s",
        parse: "%s date could not be parsed, %s is invalid ",
        invalid: "%s date %s is invalid"
      },
      types: {
        string: "%s is not a %s",
        method: "%s is not a %s (function)",
        array: "%s is not an %s",
        object: "%s is not an %s",
        number: "%s is not a %s",
        date: "%s is not a %s",
        boolean: "%s is not a %s",
        integer: "%s is not an %s",
        float: "%s is not a %s",
        regexp: "%s is not a valid %s",
        email: "%s is not a valid %s",
        url: "%s is not a valid %s",
        hex: "%s is not a valid %s"
      },
      string: {
        len: "%s must be exactly %s characters",
        min: "%s must be at least %s characters",
        max: "%s cannot be longer than %s characters",
        range: "%s must be between %s and %s characters"
      },
      number: {
        len: "%s must equal %s",
        min: "%s cannot be less than %s",
        max: "%s cannot be greater than %s",
        range: "%s must be between %s and %s"
      },
      array: {
        len: "%s must be exactly %s in length",
        min: "%s cannot be less than %s in length",
        max: "%s cannot be greater than %s in length",
        range: "%s must be between %s and %s in length"
      },
      pattern: {
        mismatch: "%s value %s does not match pattern %s"
      },
      clone: function clone() {
        const cloned = JSON.parse(JSON.stringify(this));
        cloned.clone = this.clone;
        return cloned;
      }
    };
  }
  const messages = newMessages();
  function Schema(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  Schema.prototype = {
    messages: function messages2(_messages) {
      if (_messages) {
        this._messages = deepMerge(newMessages(), _messages);
      }
      return this._messages;
    },
    define: function define2(rules2) {
      if (!rules2) {
        throw new Error("Cannot configure a schema with no rules");
      }
      if (typeof rules2 !== "object" || Array.isArray(rules2)) {
        throw new Error("Rules must be an object");
      }
      this.rules = {};
      let z;
      let item;
      for (z in rules2) {
        if (rules2.hasOwnProperty(z)) {
          item = rules2[z];
          this.rules[z] = Array.isArray(item) ? item : [item];
        }
      }
    },
    validate: function validate(source_, o2, oc) {
      const _this = this;
      if (o2 === void 0) {
        o2 = {};
      }
      if (oc === void 0) {
        oc = function oc2() {
        };
      }
      let source = source_;
      let options = o2;
      let callback = oc;
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (!this.rules || Object.keys(this.rules).length === 0) {
        if (callback) {
          callback();
        }
        return Promise.resolve();
      }
      function complete(results) {
        let i2;
        let errors = [];
        let fields = {};
        function add(e2) {
          if (Array.isArray(e2)) {
            let _errors;
            errors = (_errors = errors).concat.apply(_errors, e2);
          } else {
            errors.push(e2);
          }
        }
        for (i2 = 0; i2 < results.length; i2++) {
          add(results[i2]);
        }
        if (!errors.length) {
          errors = null;
          fields = null;
        } else {
          fields = convertFieldsError(errors);
        }
        callback(errors, fields);
      }
      if (options.messages) {
        let messages$1 = this.messages();
        if (messages$1 === messages) {
          messages$1 = newMessages();
        }
        deepMerge(messages$1, options.messages);
        options.messages = messages$1;
      } else {
        options.messages = this.messages();
      }
      let arr;
      let value2;
      const series = {};
      const keys = options.keys || Object.keys(this.rules);
      keys.forEach((z) => {
        arr = _this.rules[z];
        value2 = source[z];
        arr.forEach((r2) => {
          let rule = r2;
          if (typeof rule.transform === "function") {
            if (source === source_) {
              source = { ...source };
            }
            value2 = source[z] = rule.transform(value2);
          }
          if (typeof rule === "function") {
            rule = {
              validator: rule
            };
          } else {
            rule = { ...rule };
          }
          rule.validator = _this.getValidationMethod(rule);
          rule.field = z;
          rule.fullField = rule.fullField || z;
          rule.type = _this.getType(rule);
          if (!rule.validator) {
            return;
          }
          series[z] = series[z] || [];
          series[z].push({
            rule,
            value: value2,
            source,
            field: z
          });
        });
      });
      const errorFields = {};
      return asyncMap(series, options, (data, doIt) => {
        const { rule } = data;
        let deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
        deep = deep && (rule.required || !rule.required && data.value);
        rule.field = data.field;
        function addFullfield(key, schema) {
          return { ...schema, fullField: `${rule.fullField}.${key}` };
        }
        function cb(e2) {
          if (e2 === void 0) {
            e2 = [];
          }
          let errors = e2;
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
          if (!options.suppressWarning && errors.length) {
            Schema.warning("async-validator:", errors);
          }
          if (errors.length && rule.message) {
            errors = [].concat(rule.message);
          }
          errors = errors.map(complementError(rule));
          if (options.first && errors.length) {
            errorFields[rule.field] = 1;
            return doIt(errors);
          }
          if (!deep) {
            doIt(errors);
          } else {
            if (rule.required && !data.value) {
              if (rule.message) {
                errors = [].concat(rule.message).map(complementError(rule));
              } else if (options.error) {
                errors = [options.error(rule, format(options.messages.required, rule.field))];
              } else {
                errors = [];
              }
              return doIt(errors);
            }
            let fieldsSchema = {};
            if (rule.defaultField) {
              for (const k in data.value) {
                if (data.value.hasOwnProperty(k)) {
                  fieldsSchema[k] = rule.defaultField;
                }
              }
            }
            fieldsSchema = { ...fieldsSchema, ...data.rule.fields };
            for (const f2 in fieldsSchema) {
              if (fieldsSchema.hasOwnProperty(f2)) {
                const fieldSchema = Array.isArray(fieldsSchema[f2]) ? fieldsSchema[f2] : [fieldsSchema[f2]];
                fieldsSchema[f2] = fieldSchema.map(addFullfield.bind(null, f2));
              }
            }
            const schema = new Schema(fieldsSchema);
            schema.messages(options.messages);
            if (data.rule.options) {
              data.rule.options.messages = options.messages;
              data.rule.options.error = options.error;
            }
            schema.validate(data.value, data.rule.options || options, (errs) => {
              const finalErrors = [];
              if (errors && errors.length) {
                finalErrors.push.apply(finalErrors, errors);
              }
              if (errs && errs.length) {
                finalErrors.push.apply(finalErrors, errs);
              }
              doIt(finalErrors.length ? finalErrors : null);
            });
          }
        }
        let res;
        if (rule.asyncValidator) {
          res = rule.asyncValidator(rule, data.value, cb, data.source, options);
        } else if (rule.validator) {
          res = rule.validator(rule, data.value, cb, data.source, options);
          if (res === true) {
            cb();
          } else if (res === false) {
            cb(rule.message || `${rule.field} fails`);
          } else if (res instanceof Array) {
            cb(res);
          } else if (res instanceof Error) {
            cb(res.message);
          }
        }
        if (res && res.then) {
          res.then(() => cb(), (e2) => cb(e2));
        }
      }, (results) => {
        complete(results);
      });
    },
    getType: function getType(rule) {
      if (rule.type === void 0 && rule.pattern instanceof RegExp) {
        rule.type = "pattern";
      }
      if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
        throw new Error(format("Unknown rule type %s", rule.type));
      }
      return rule.type || "string";
    },
    getValidationMethod: function getValidationMethod(rule) {
      if (typeof rule.validator === "function") {
        return rule.validator;
      }
      const keys = Object.keys(rule);
      const messageIndex = keys.indexOf("message");
      if (messageIndex !== -1) {
        keys.splice(messageIndex, 1);
      }
      if (keys.length === 1 && keys[0] === "required") {
        return validators.required;
      }
      return validators[this.getType(rule)] || false;
    }
  };
  Schema.register = function register(type2, validator) {
    if (typeof validator !== "function") {
      throw new Error("Cannot register a validator by type, validator is not a function");
    }
    validators[type2] = validator;
  };
  Schema.warning = warning;
  Schema.messages = messages;
  Schema.warning = function() {
  };
  const _sfc_main$1n = {
    name: "uv-form",
    mixins: [mpMixin, mixin, props$q],
    provide() {
      return {
        uForm: this
      };
    },
    data() {
      return {
        formRules: {},
        // 规则校验器
        validator: {},
        // 原始的model快照，用于resetFields方法重置表单时使用
        originalModel: null
      };
    },
    watch: {
      // 监听规则的变化
      rules: {
        immediate: true,
        handler(n2) {
          this.setRules(n2);
        }
      },
      // 监听属性的变化，通知子组件uv-form-item重新获取信息
      propsChange(n2) {
        var _a;
        if ((_a = this.children) == null ? void 0 : _a.length) {
          this.children.map((child) => {
            typeof child.updateParentData == "function" && child.updateParentData();
          });
        }
      },
      // 监听model的初始值作为重置表单的快照
      model: {
        immediate: true,
        handler(n2) {
          if (!this.originalModel) {
            this.originalModel = this.$uv.deepClone(n2);
          }
        }
      }
    },
    computed: {
      propsChange() {
        return [
          this.errorType,
          this.borderBottom,
          this.labelPosition,
          this.labelWidth,
          this.labelAlign,
          this.labelStyle
        ];
      }
    },
    created() {
      this.children = [];
    },
    methods: {
      // 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
      setRules(rules2) {
        if (Object.keys(rules2).length === 0)
          return;
        if (Object.keys(this.model).length === 0) {
          this.$uv.error("设置rules，model必须设置！如果已经设置，请刷新页面。");
          return;
        }
        this.formRules = rules2;
        this.validator = new Schema(rules2);
      },
      // 清空所有uv-form-item组件的内容，本质上是调用了uv-form-item组件中的resetField()方法
      resetFields() {
        this.resetModel();
      },
      // 重置model为初始值的快照
      resetModel(obj) {
        this.children.map((child) => {
          const prop = child == null ? void 0 : child.prop;
          const value2 = this.$uv.getProperty(this.originalModel, prop);
          this.$uv.setProperty(this.model, prop, value2);
        });
      },
      // 清空校验结果
      clearValidate(props2) {
        props2 = [].concat(props2);
        this.children.map((child) => {
          if (props2[0] === void 0 || props2.includes(child.prop)) {
            child.message = null;
          }
        });
      },
      // 对部分表单字段进行校验
      async validateField(value2, callback, event = null) {
        this.$nextTick(() => {
          const errorsRes = [];
          value2 = [].concat(value2);
          this.children.map((child) => {
            const childErrors = [];
            if (value2.includes(child.prop)) {
              const propertyVal = this.$uv.getProperty(
                this.model,
                child.prop
              );
              const propertyChain = child.prop.split(".");
              const propertyName = propertyChain[propertyChain.length - 1];
              const rule = this.formRules[child.prop];
              if (!rule)
                return;
              const rules2 = [].concat(rule);
              for (let i2 = 0; i2 < rules2.length; i2++) {
                const ruleItem = rules2[i2];
                const trigger = [].concat(ruleItem == null ? void 0 : ruleItem.trigger);
                if (event && !trigger.includes(event))
                  continue;
                const validator = new Schema({
                  [propertyName]: ruleItem
                });
                validator.validate(
                  {
                    [propertyName]: propertyVal
                  },
                  (errors, fields) => {
                    if (this.$uv.test.array(errors)) {
                      errorsRes.push(...errors);
                      childErrors.push(...errors);
                    }
                    this.$nextTick(() => {
                      var _a, _b;
                      child.message = ((_a = childErrors[0]) == null ? void 0 : _a.message) ? (_b = childErrors[0]) == null ? void 0 : _b.message : null;
                    });
                  }
                );
              }
            }
          });
          typeof callback === "function" && callback(errorsRes);
        });
      },
      // 校验全部数据
      validate(callback) {
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            const formItemProps = this.children.map(
              (item) => item.prop
            );
            this.validateField(formItemProps, (errors) => {
              if (errors.length) {
                this.errorType === "toast" && this.$uv.toast(errors[0].message);
                reject(errors);
              } else {
                resolve(true);
              }
            });
          });
        });
      }
    }
  };
  function _sfc_render$1m(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-form" }, [
      vue.renderSlot(_ctx.$slots, "default")
    ]);
  }
  const __easycom_2$6 = /* @__PURE__ */ _export_sfc(_sfc_main$1n, [["render", _sfc_render$1m], ["__file", "E:/BankSystem/user/uni_modules/uv-form/components/uv-form/uv-form.vue"]]);
  const icons = {
    "id": "2852637",
    "name": "uniui图标库",
    "font_family": "uniicons",
    "css_prefix_text": "uniui-",
    "description": "",
    "glyphs": [
      {
        "icon_id": "25027049",
        "name": "yanse",
        "font_class": "color",
        "unicode": "e6cf",
        "unicode_decimal": 59087
      },
      {
        "icon_id": "25027048",
        "name": "wallet",
        "font_class": "wallet",
        "unicode": "e6b1",
        "unicode_decimal": 59057
      },
      {
        "icon_id": "25015720",
        "name": "settings-filled",
        "font_class": "settings-filled",
        "unicode": "e6ce",
        "unicode_decimal": 59086
      },
      {
        "icon_id": "25015434",
        "name": "shimingrenzheng-filled",
        "font_class": "auth-filled",
        "unicode": "e6cc",
        "unicode_decimal": 59084
      },
      {
        "icon_id": "24934246",
        "name": "shop-filled",
        "font_class": "shop-filled",
        "unicode": "e6cd",
        "unicode_decimal": 59085
      },
      {
        "icon_id": "24934159",
        "name": "staff-filled-01",
        "font_class": "staff-filled",
        "unicode": "e6cb",
        "unicode_decimal": 59083
      },
      {
        "icon_id": "24932461",
        "name": "VIP-filled",
        "font_class": "vip-filled",
        "unicode": "e6c6",
        "unicode_decimal": 59078
      },
      {
        "icon_id": "24932462",
        "name": "plus_circle_fill",
        "font_class": "plus-filled",
        "unicode": "e6c7",
        "unicode_decimal": 59079
      },
      {
        "icon_id": "24932463",
        "name": "folder_add-filled",
        "font_class": "folder-add-filled",
        "unicode": "e6c8",
        "unicode_decimal": 59080
      },
      {
        "icon_id": "24932464",
        "name": "yanse-filled",
        "font_class": "color-filled",
        "unicode": "e6c9",
        "unicode_decimal": 59081
      },
      {
        "icon_id": "24932465",
        "name": "tune-filled",
        "font_class": "tune-filled",
        "unicode": "e6ca",
        "unicode_decimal": 59082
      },
      {
        "icon_id": "24932455",
        "name": "a-rilidaka-filled",
        "font_class": "calendar-filled",
        "unicode": "e6c0",
        "unicode_decimal": 59072
      },
      {
        "icon_id": "24932456",
        "name": "notification-filled",
        "font_class": "notification-filled",
        "unicode": "e6c1",
        "unicode_decimal": 59073
      },
      {
        "icon_id": "24932457",
        "name": "wallet-filled",
        "font_class": "wallet-filled",
        "unicode": "e6c2",
        "unicode_decimal": 59074
      },
      {
        "icon_id": "24932458",
        "name": "paihangbang-filled",
        "font_class": "medal-filled",
        "unicode": "e6c3",
        "unicode_decimal": 59075
      },
      {
        "icon_id": "24932459",
        "name": "gift-filled",
        "font_class": "gift-filled",
        "unicode": "e6c4",
        "unicode_decimal": 59076
      },
      {
        "icon_id": "24932460",
        "name": "fire-filled",
        "font_class": "fire-filled",
        "unicode": "e6c5",
        "unicode_decimal": 59077
      },
      {
        "icon_id": "24928001",
        "name": "refreshempty",
        "font_class": "refreshempty",
        "unicode": "e6bf",
        "unicode_decimal": 59071
      },
      {
        "icon_id": "24926853",
        "name": "location-ellipse",
        "font_class": "location-filled",
        "unicode": "e6af",
        "unicode_decimal": 59055
      },
      {
        "icon_id": "24926735",
        "name": "person-filled",
        "font_class": "person-filled",
        "unicode": "e69d",
        "unicode_decimal": 59037
      },
      {
        "icon_id": "24926703",
        "name": "personadd-filled",
        "font_class": "personadd-filled",
        "unicode": "e698",
        "unicode_decimal": 59032
      },
      {
        "icon_id": "24923351",
        "name": "back",
        "font_class": "back",
        "unicode": "e6b9",
        "unicode_decimal": 59065
      },
      {
        "icon_id": "24923352",
        "name": "forward",
        "font_class": "forward",
        "unicode": "e6ba",
        "unicode_decimal": 59066
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrow-right",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrowthinright",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrow-left",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrowthinleft",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrow-up",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrowthinup",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrow-down",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrowthindown",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "bottom",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "arrowdown",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "right",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "arrowright",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "top",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "arrowup",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "left",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "arrowleft",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923334",
        "name": "eye",
        "font_class": "eye",
        "unicode": "e651",
        "unicode_decimal": 58961
      },
      {
        "icon_id": "24923335",
        "name": "eye-filled",
        "font_class": "eye-filled",
        "unicode": "e66a",
        "unicode_decimal": 58986
      },
      {
        "icon_id": "24923336",
        "name": "eye-slash",
        "font_class": "eye-slash",
        "unicode": "e6b3",
        "unicode_decimal": 59059
      },
      {
        "icon_id": "24923337",
        "name": "eye-slash-filled",
        "font_class": "eye-slash-filled",
        "unicode": "e6b4",
        "unicode_decimal": 59060
      },
      {
        "icon_id": "24923305",
        "name": "info-filled",
        "font_class": "info-filled",
        "unicode": "e649",
        "unicode_decimal": 58953
      },
      {
        "icon_id": "24923299",
        "name": "reload-01",
        "font_class": "reload",
        "unicode": "e6b2",
        "unicode_decimal": 59058
      },
      {
        "icon_id": "24923195",
        "name": "mic_slash_fill",
        "font_class": "micoff-filled",
        "unicode": "e6b0",
        "unicode_decimal": 59056
      },
      {
        "icon_id": "24923165",
        "name": "map-pin-ellipse",
        "font_class": "map-pin-ellipse",
        "unicode": "e6ac",
        "unicode_decimal": 59052
      },
      {
        "icon_id": "24923166",
        "name": "map-pin",
        "font_class": "map-pin",
        "unicode": "e6ad",
        "unicode_decimal": 59053
      },
      {
        "icon_id": "24923167",
        "name": "location",
        "font_class": "location",
        "unicode": "e6ae",
        "unicode_decimal": 59054
      },
      {
        "icon_id": "24923064",
        "name": "starhalf",
        "font_class": "starhalf",
        "unicode": "e683",
        "unicode_decimal": 59011
      },
      {
        "icon_id": "24923065",
        "name": "star",
        "font_class": "star",
        "unicode": "e688",
        "unicode_decimal": 59016
      },
      {
        "icon_id": "24923066",
        "name": "star-filled",
        "font_class": "star-filled",
        "unicode": "e68f",
        "unicode_decimal": 59023
      },
      {
        "icon_id": "24899646",
        "name": "a-rilidaka",
        "font_class": "calendar",
        "unicode": "e6a0",
        "unicode_decimal": 59040
      },
      {
        "icon_id": "24899647",
        "name": "fire",
        "font_class": "fire",
        "unicode": "e6a1",
        "unicode_decimal": 59041
      },
      {
        "icon_id": "24899648",
        "name": "paihangbang",
        "font_class": "medal",
        "unicode": "e6a2",
        "unicode_decimal": 59042
      },
      {
        "icon_id": "24899649",
        "name": "font",
        "font_class": "font",
        "unicode": "e6a3",
        "unicode_decimal": 59043
      },
      {
        "icon_id": "24899650",
        "name": "gift",
        "font_class": "gift",
        "unicode": "e6a4",
        "unicode_decimal": 59044
      },
      {
        "icon_id": "24899651",
        "name": "link",
        "font_class": "link",
        "unicode": "e6a5",
        "unicode_decimal": 59045
      },
      {
        "icon_id": "24899652",
        "name": "notification",
        "font_class": "notification",
        "unicode": "e6a6",
        "unicode_decimal": 59046
      },
      {
        "icon_id": "24899653",
        "name": "staff",
        "font_class": "staff",
        "unicode": "e6a7",
        "unicode_decimal": 59047
      },
      {
        "icon_id": "24899654",
        "name": "VIP",
        "font_class": "vip",
        "unicode": "e6a8",
        "unicode_decimal": 59048
      },
      {
        "icon_id": "24899655",
        "name": "folder_add",
        "font_class": "folder-add",
        "unicode": "e6a9",
        "unicode_decimal": 59049
      },
      {
        "icon_id": "24899656",
        "name": "tune",
        "font_class": "tune",
        "unicode": "e6aa",
        "unicode_decimal": 59050
      },
      {
        "icon_id": "24899657",
        "name": "shimingrenzheng",
        "font_class": "auth",
        "unicode": "e6ab",
        "unicode_decimal": 59051
      },
      {
        "icon_id": "24899565",
        "name": "person",
        "font_class": "person",
        "unicode": "e699",
        "unicode_decimal": 59033
      },
      {
        "icon_id": "24899566",
        "name": "email-filled",
        "font_class": "email-filled",
        "unicode": "e69a",
        "unicode_decimal": 59034
      },
      {
        "icon_id": "24899567",
        "name": "phone-filled",
        "font_class": "phone-filled",
        "unicode": "e69b",
        "unicode_decimal": 59035
      },
      {
        "icon_id": "24899568",
        "name": "phone",
        "font_class": "phone",
        "unicode": "e69c",
        "unicode_decimal": 59036
      },
      {
        "icon_id": "24899570",
        "name": "email",
        "font_class": "email",
        "unicode": "e69e",
        "unicode_decimal": 59038
      },
      {
        "icon_id": "24899571",
        "name": "personadd",
        "font_class": "personadd",
        "unicode": "e69f",
        "unicode_decimal": 59039
      },
      {
        "icon_id": "24899558",
        "name": "chatboxes-filled",
        "font_class": "chatboxes-filled",
        "unicode": "e692",
        "unicode_decimal": 59026
      },
      {
        "icon_id": "24899559",
        "name": "contact",
        "font_class": "contact",
        "unicode": "e693",
        "unicode_decimal": 59027
      },
      {
        "icon_id": "24899560",
        "name": "chatbubble-filled",
        "font_class": "chatbubble-filled",
        "unicode": "e694",
        "unicode_decimal": 59028
      },
      {
        "icon_id": "24899561",
        "name": "contact-filled",
        "font_class": "contact-filled",
        "unicode": "e695",
        "unicode_decimal": 59029
      },
      {
        "icon_id": "24899562",
        "name": "chatboxes",
        "font_class": "chatboxes",
        "unicode": "e696",
        "unicode_decimal": 59030
      },
      {
        "icon_id": "24899563",
        "name": "chatbubble",
        "font_class": "chatbubble",
        "unicode": "e697",
        "unicode_decimal": 59031
      },
      {
        "icon_id": "24881290",
        "name": "upload-filled",
        "font_class": "upload-filled",
        "unicode": "e68e",
        "unicode_decimal": 59022
      },
      {
        "icon_id": "24881292",
        "name": "upload",
        "font_class": "upload",
        "unicode": "e690",
        "unicode_decimal": 59024
      },
      {
        "icon_id": "24881293",
        "name": "weixin",
        "font_class": "weixin",
        "unicode": "e691",
        "unicode_decimal": 59025
      },
      {
        "icon_id": "24881274",
        "name": "compose",
        "font_class": "compose",
        "unicode": "e67f",
        "unicode_decimal": 59007
      },
      {
        "icon_id": "24881275",
        "name": "qq",
        "font_class": "qq",
        "unicode": "e680",
        "unicode_decimal": 59008
      },
      {
        "icon_id": "24881276",
        "name": "download-filled",
        "font_class": "download-filled",
        "unicode": "e681",
        "unicode_decimal": 59009
      },
      {
        "icon_id": "24881277",
        "name": "pengyouquan",
        "font_class": "pyq",
        "unicode": "e682",
        "unicode_decimal": 59010
      },
      {
        "icon_id": "24881279",
        "name": "sound",
        "font_class": "sound",
        "unicode": "e684",
        "unicode_decimal": 59012
      },
      {
        "icon_id": "24881280",
        "name": "trash-filled",
        "font_class": "trash-filled",
        "unicode": "e685",
        "unicode_decimal": 59013
      },
      {
        "icon_id": "24881281",
        "name": "sound-filled",
        "font_class": "sound-filled",
        "unicode": "e686",
        "unicode_decimal": 59014
      },
      {
        "icon_id": "24881282",
        "name": "trash",
        "font_class": "trash",
        "unicode": "e687",
        "unicode_decimal": 59015
      },
      {
        "icon_id": "24881284",
        "name": "videocam-filled",
        "font_class": "videocam-filled",
        "unicode": "e689",
        "unicode_decimal": 59017
      },
      {
        "icon_id": "24881285",
        "name": "spinner-cycle",
        "font_class": "spinner-cycle",
        "unicode": "e68a",
        "unicode_decimal": 59018
      },
      {
        "icon_id": "24881286",
        "name": "weibo",
        "font_class": "weibo",
        "unicode": "e68b",
        "unicode_decimal": 59019
      },
      {
        "icon_id": "24881288",
        "name": "videocam",
        "font_class": "videocam",
        "unicode": "e68c",
        "unicode_decimal": 59020
      },
      {
        "icon_id": "24881289",
        "name": "download",
        "font_class": "download",
        "unicode": "e68d",
        "unicode_decimal": 59021
      },
      {
        "icon_id": "24879601",
        "name": "help",
        "font_class": "help",
        "unicode": "e679",
        "unicode_decimal": 59001
      },
      {
        "icon_id": "24879602",
        "name": "navigate-filled",
        "font_class": "navigate-filled",
        "unicode": "e67a",
        "unicode_decimal": 59002
      },
      {
        "icon_id": "24879603",
        "name": "plusempty",
        "font_class": "plusempty",
        "unicode": "e67b",
        "unicode_decimal": 59003
      },
      {
        "icon_id": "24879604",
        "name": "smallcircle",
        "font_class": "smallcircle",
        "unicode": "e67c",
        "unicode_decimal": 59004
      },
      {
        "icon_id": "24879605",
        "name": "minus-filled",
        "font_class": "minus-filled",
        "unicode": "e67d",
        "unicode_decimal": 59005
      },
      {
        "icon_id": "24879606",
        "name": "micoff",
        "font_class": "micoff",
        "unicode": "e67e",
        "unicode_decimal": 59006
      },
      {
        "icon_id": "24879588",
        "name": "closeempty",
        "font_class": "closeempty",
        "unicode": "e66c",
        "unicode_decimal": 58988
      },
      {
        "icon_id": "24879589",
        "name": "clear",
        "font_class": "clear",
        "unicode": "e66d",
        "unicode_decimal": 58989
      },
      {
        "icon_id": "24879590",
        "name": "navigate",
        "font_class": "navigate",
        "unicode": "e66e",
        "unicode_decimal": 58990
      },
      {
        "icon_id": "24879591",
        "name": "minus",
        "font_class": "minus",
        "unicode": "e66f",
        "unicode_decimal": 58991
      },
      {
        "icon_id": "24879592",
        "name": "image",
        "font_class": "image",
        "unicode": "e670",
        "unicode_decimal": 58992
      },
      {
        "icon_id": "24879593",
        "name": "mic",
        "font_class": "mic",
        "unicode": "e671",
        "unicode_decimal": 58993
      },
      {
        "icon_id": "24879594",
        "name": "paperplane",
        "font_class": "paperplane",
        "unicode": "e672",
        "unicode_decimal": 58994
      },
      {
        "icon_id": "24879595",
        "name": "close",
        "font_class": "close",
        "unicode": "e673",
        "unicode_decimal": 58995
      },
      {
        "icon_id": "24879596",
        "name": "help-filled",
        "font_class": "help-filled",
        "unicode": "e674",
        "unicode_decimal": 58996
      },
      {
        "icon_id": "24879597",
        "name": "plus-filled",
        "font_class": "paperplane-filled",
        "unicode": "e675",
        "unicode_decimal": 58997
      },
      {
        "icon_id": "24879598",
        "name": "plus",
        "font_class": "plus",
        "unicode": "e676",
        "unicode_decimal": 58998
      },
      {
        "icon_id": "24879599",
        "name": "mic-filled",
        "font_class": "mic-filled",
        "unicode": "e677",
        "unicode_decimal": 58999
      },
      {
        "icon_id": "24879600",
        "name": "image-filled",
        "font_class": "image-filled",
        "unicode": "e678",
        "unicode_decimal": 59e3
      },
      {
        "icon_id": "24855900",
        "name": "locked-filled",
        "font_class": "locked-filled",
        "unicode": "e668",
        "unicode_decimal": 58984
      },
      {
        "icon_id": "24855901",
        "name": "info",
        "font_class": "info",
        "unicode": "e669",
        "unicode_decimal": 58985
      },
      {
        "icon_id": "24855903",
        "name": "locked",
        "font_class": "locked",
        "unicode": "e66b",
        "unicode_decimal": 58987
      },
      {
        "icon_id": "24855884",
        "name": "camera-filled",
        "font_class": "camera-filled",
        "unicode": "e658",
        "unicode_decimal": 58968
      },
      {
        "icon_id": "24855885",
        "name": "chat-filled",
        "font_class": "chat-filled",
        "unicode": "e659",
        "unicode_decimal": 58969
      },
      {
        "icon_id": "24855886",
        "name": "camera",
        "font_class": "camera",
        "unicode": "e65a",
        "unicode_decimal": 58970
      },
      {
        "icon_id": "24855887",
        "name": "circle",
        "font_class": "circle",
        "unicode": "e65b",
        "unicode_decimal": 58971
      },
      {
        "icon_id": "24855888",
        "name": "checkmarkempty",
        "font_class": "checkmarkempty",
        "unicode": "e65c",
        "unicode_decimal": 58972
      },
      {
        "icon_id": "24855889",
        "name": "chat",
        "font_class": "chat",
        "unicode": "e65d",
        "unicode_decimal": 58973
      },
      {
        "icon_id": "24855890",
        "name": "circle-filled",
        "font_class": "circle-filled",
        "unicode": "e65e",
        "unicode_decimal": 58974
      },
      {
        "icon_id": "24855891",
        "name": "flag",
        "font_class": "flag",
        "unicode": "e65f",
        "unicode_decimal": 58975
      },
      {
        "icon_id": "24855892",
        "name": "flag-filled",
        "font_class": "flag-filled",
        "unicode": "e660",
        "unicode_decimal": 58976
      },
      {
        "icon_id": "24855893",
        "name": "gear-filled",
        "font_class": "gear-filled",
        "unicode": "e661",
        "unicode_decimal": 58977
      },
      {
        "icon_id": "24855894",
        "name": "home",
        "font_class": "home",
        "unicode": "e662",
        "unicode_decimal": 58978
      },
      {
        "icon_id": "24855895",
        "name": "home-filled",
        "font_class": "home-filled",
        "unicode": "e663",
        "unicode_decimal": 58979
      },
      {
        "icon_id": "24855896",
        "name": "gear",
        "font_class": "gear",
        "unicode": "e664",
        "unicode_decimal": 58980
      },
      {
        "icon_id": "24855897",
        "name": "smallcircle-filled",
        "font_class": "smallcircle-filled",
        "unicode": "e665",
        "unicode_decimal": 58981
      },
      {
        "icon_id": "24855898",
        "name": "map-filled",
        "font_class": "map-filled",
        "unicode": "e666",
        "unicode_decimal": 58982
      },
      {
        "icon_id": "24855899",
        "name": "map",
        "font_class": "map",
        "unicode": "e667",
        "unicode_decimal": 58983
      },
      {
        "icon_id": "24855825",
        "name": "refresh-filled",
        "font_class": "refresh-filled",
        "unicode": "e656",
        "unicode_decimal": 58966
      },
      {
        "icon_id": "24855826",
        "name": "refresh",
        "font_class": "refresh",
        "unicode": "e657",
        "unicode_decimal": 58967
      },
      {
        "icon_id": "24855808",
        "name": "cloud-upload",
        "font_class": "cloud-upload",
        "unicode": "e645",
        "unicode_decimal": 58949
      },
      {
        "icon_id": "24855809",
        "name": "cloud-download-filled",
        "font_class": "cloud-download-filled",
        "unicode": "e646",
        "unicode_decimal": 58950
      },
      {
        "icon_id": "24855810",
        "name": "cloud-download",
        "font_class": "cloud-download",
        "unicode": "e647",
        "unicode_decimal": 58951
      },
      {
        "icon_id": "24855811",
        "name": "cloud-upload-filled",
        "font_class": "cloud-upload-filled",
        "unicode": "e648",
        "unicode_decimal": 58952
      },
      {
        "icon_id": "24855813",
        "name": "redo",
        "font_class": "redo",
        "unicode": "e64a",
        "unicode_decimal": 58954
      },
      {
        "icon_id": "24855814",
        "name": "images-filled",
        "font_class": "images-filled",
        "unicode": "e64b",
        "unicode_decimal": 58955
      },
      {
        "icon_id": "24855815",
        "name": "undo-filled",
        "font_class": "undo-filled",
        "unicode": "e64c",
        "unicode_decimal": 58956
      },
      {
        "icon_id": "24855816",
        "name": "more",
        "font_class": "more",
        "unicode": "e64d",
        "unicode_decimal": 58957
      },
      {
        "icon_id": "24855817",
        "name": "more-filled",
        "font_class": "more-filled",
        "unicode": "e64e",
        "unicode_decimal": 58958
      },
      {
        "icon_id": "24855818",
        "name": "undo",
        "font_class": "undo",
        "unicode": "e64f",
        "unicode_decimal": 58959
      },
      {
        "icon_id": "24855819",
        "name": "images",
        "font_class": "images",
        "unicode": "e650",
        "unicode_decimal": 58960
      },
      {
        "icon_id": "24855821",
        "name": "paperclip",
        "font_class": "paperclip",
        "unicode": "e652",
        "unicode_decimal": 58962
      },
      {
        "icon_id": "24855822",
        "name": "settings",
        "font_class": "settings",
        "unicode": "e653",
        "unicode_decimal": 58963
      },
      {
        "icon_id": "24855823",
        "name": "search",
        "font_class": "search",
        "unicode": "e654",
        "unicode_decimal": 58964
      },
      {
        "icon_id": "24855824",
        "name": "redo-filled",
        "font_class": "redo-filled",
        "unicode": "e655",
        "unicode_decimal": 58965
      },
      {
        "icon_id": "24841702",
        "name": "list",
        "font_class": "list",
        "unicode": "e644",
        "unicode_decimal": 58948
      },
      {
        "icon_id": "24841489",
        "name": "mail-open-filled",
        "font_class": "mail-open-filled",
        "unicode": "e63a",
        "unicode_decimal": 58938
      },
      {
        "icon_id": "24841491",
        "name": "hand-thumbsdown-filled",
        "font_class": "hand-down-filled",
        "unicode": "e63c",
        "unicode_decimal": 58940
      },
      {
        "icon_id": "24841492",
        "name": "hand-thumbsdown",
        "font_class": "hand-down",
        "unicode": "e63d",
        "unicode_decimal": 58941
      },
      {
        "icon_id": "24841493",
        "name": "hand-thumbsup-filled",
        "font_class": "hand-up-filled",
        "unicode": "e63e",
        "unicode_decimal": 58942
      },
      {
        "icon_id": "24841494",
        "name": "hand-thumbsup",
        "font_class": "hand-up",
        "unicode": "e63f",
        "unicode_decimal": 58943
      },
      {
        "icon_id": "24841496",
        "name": "heart-filled",
        "font_class": "heart-filled",
        "unicode": "e641",
        "unicode_decimal": 58945
      },
      {
        "icon_id": "24841498",
        "name": "mail-open",
        "font_class": "mail-open",
        "unicode": "e643",
        "unicode_decimal": 58947
      },
      {
        "icon_id": "24841488",
        "name": "heart",
        "font_class": "heart",
        "unicode": "e639",
        "unicode_decimal": 58937
      },
      {
        "icon_id": "24839963",
        "name": "loop",
        "font_class": "loop",
        "unicode": "e633",
        "unicode_decimal": 58931
      },
      {
        "icon_id": "24839866",
        "name": "pulldown",
        "font_class": "pulldown",
        "unicode": "e632",
        "unicode_decimal": 58930
      },
      {
        "icon_id": "24813798",
        "name": "scan",
        "font_class": "scan",
        "unicode": "e62a",
        "unicode_decimal": 58922
      },
      {
        "icon_id": "24813786",
        "name": "bars",
        "font_class": "bars",
        "unicode": "e627",
        "unicode_decimal": 58919
      },
      {
        "icon_id": "24813788",
        "name": "cart-filled",
        "font_class": "cart-filled",
        "unicode": "e629",
        "unicode_decimal": 58921
      },
      {
        "icon_id": "24813790",
        "name": "checkbox",
        "font_class": "checkbox",
        "unicode": "e62b",
        "unicode_decimal": 58923
      },
      {
        "icon_id": "24813791",
        "name": "checkbox-filled",
        "font_class": "checkbox-filled",
        "unicode": "e62c",
        "unicode_decimal": 58924
      },
      {
        "icon_id": "24813794",
        "name": "shop",
        "font_class": "shop",
        "unicode": "e62f",
        "unicode_decimal": 58927
      },
      {
        "icon_id": "24813795",
        "name": "headphones",
        "font_class": "headphones",
        "unicode": "e630",
        "unicode_decimal": 58928
      },
      {
        "icon_id": "24813796",
        "name": "cart",
        "font_class": "cart",
        "unicode": "e631",
        "unicode_decimal": 58929
      }
    ]
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$1m = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: icons.glyphs
      };
    },
    computed: {
      unicode() {
        let code2 = this.icons.find((v2) => v2.font_class === this.type);
        if (code2) {
          return unescape(`%u${code2.unicode}`);
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$1l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle({ color: $props.color, "font-size": $options.iconSize }),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$g = /* @__PURE__ */ _export_sfc(_sfc_main$1m, [["render", _sfc_render$1l], ["__scopeId", "data-v-d31e1c47"], ["__file", "E:/BankSystem/user/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  let platform = "other";
  const _sfc_main$1l = {
    name: "UniFab",
    emits: ["fabClick", "trigger"],
    props: {
      pattern: {
        type: Object,
        default() {
          return {};
        }
      },
      horizontal: {
        type: String,
        default: "left"
      },
      vertical: {
        type: String,
        default: "bottom"
      },
      direction: {
        type: String,
        default: "horizontal"
      },
      content: {
        type: Array,
        default() {
          return [];
        }
      },
      show: {
        type: Boolean,
        default: false
      },
      popMenu: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        fabShow: false,
        isShow: false,
        isAndroidNvue: platform === "android",
        styles: {
          color: "#3c3e49",
          selectedColor: "#007AFF",
          backgroundColor: "#fff",
          buttonColor: "#007AFF",
          iconColor: "#fff",
          icon: "plusempty"
        }
      };
    },
    computed: {
      contentWidth(e2) {
        return (this.content.length + 1) * 55 + 15 + "px";
      },
      contentWidthMin() {
        return "55px";
      },
      // 动态计算宽度
      boxWidth() {
        return this.getPosition(3, "horizontal");
      },
      // 动态计算高度
      boxHeight() {
        return this.getPosition(3, "vertical");
      },
      // 计算左下位置
      leftBottom() {
        return this.getPosition(0, "left", "bottom");
      },
      // 计算右下位置
      rightBottom() {
        return this.getPosition(0, "right", "bottom");
      },
      // 计算左上位置
      leftTop() {
        return this.getPosition(0, "left", "top");
      },
      rightTop() {
        return this.getPosition(0, "right", "top");
      },
      flexDirectionStart() {
        return this.getPosition(1, "vertical", "top");
      },
      flexDirectionEnd() {
        return this.getPosition(1, "vertical", "bottom");
      },
      horizontalLeft() {
        return this.getPosition(2, "horizontal", "left");
      },
      horizontalRight() {
        return this.getPosition(2, "horizontal", "right");
      },
      // 计算 nvue bottom
      nvueBottom() {
        uni.getSystemInfoSync().windowBottom;
        return 30;
      }
    },
    watch: {
      pattern: {
        handler(val, oldVal) {
          this.styles = Object.assign({}, this.styles, val);
        },
        deep: true
      }
    },
    created() {
      this.isShow = this.show;
      if (this.top === 0) {
        this.fabShow = true;
      }
      this.styles = Object.assign({}, this.styles, this.pattern);
    },
    methods: {
      _onClick() {
        this.$emit("fabClick");
        if (!this.popMenu) {
          return;
        }
        this.isShow = !this.isShow;
      },
      open() {
        this.isShow = true;
      },
      close() {
        this.isShow = false;
      },
      /**
       * 按钮点击事件
       */
      _onItemClick(index2, item) {
        if (!this.isShow) {
          return;
        }
        this.$emit("trigger", {
          index: index2,
          item
        });
      },
      /**
       * 获取 位置信息
       */
      getPosition(types2, paramA, paramB) {
        if (types2 === 0) {
          return this.horizontal === paramA && this.vertical === paramB;
        } else if (types2 === 1) {
          return this.direction === paramA && this.vertical === paramB;
        } else if (types2 === 2) {
          return this.direction === paramA && this.horizontal === paramB;
        } else {
          return this.isShow && this.direction === paramA ? this.contentWidth : this.contentWidthMin;
        }
      }
    }
  };
  function _sfc_render$1k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$g);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-cursor-point" }, [
      $props.popMenu && ($options.leftBottom || $options.rightBottom || $options.leftTop || $options.rightTop) && $props.content.length > 0 ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass([{
            "uni-fab--leftBottom": $options.leftBottom,
            "uni-fab--rightBottom": $options.rightBottom,
            "uni-fab--leftTop": $options.leftTop,
            "uni-fab--rightTop": $options.rightTop
          }, "uni-fab"]),
          style: vue.normalizeStyle($options.nvueBottom)
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass([{
                "uni-fab__content--left": $props.horizontal === "left",
                "uni-fab__content--right": $props.horizontal === "right",
                "uni-fab__content--flexDirection": $props.direction === "vertical",
                "uni-fab__content--flexDirectionStart": $options.flexDirectionStart,
                "uni-fab__content--flexDirectionEnd": $options.flexDirectionEnd,
                "uni-fab__content--other-platform": !$data.isAndroidNvue
              }, "uni-fab__content"]),
              style: vue.normalizeStyle({ width: $options.boxWidth, height: $options.boxHeight, backgroundColor: $data.styles.backgroundColor }),
              elevation: "5"
            },
            [
              $options.flexDirectionStart || $options.horizontalLeft ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-fab__item uni-fab__item--first"
              })) : vue.createCommentVNode("v-if", true),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($props.content, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: index2,
                    class: vue.normalizeClass([{ "uni-fab__item--active": $data.isShow }, "uni-fab__item"]),
                    onClick: ($event) => $options._onItemClick(index2, item)
                  }, [
                    vue.createElementVNode("image", {
                      src: item.active ? item.selectedIconPath : item.iconPath,
                      class: "uni-fab__item-image",
                      mode: "aspectFit"
                    }, null, 8, ["src"]),
                    vue.createElementVNode(
                      "text",
                      {
                        class: "uni-fab__item-text",
                        style: vue.normalizeStyle({ color: item.active ? $data.styles.selectedColor : $data.styles.color })
                      },
                      vue.toDisplayString(item.text),
                      5
                      /* TEXT, STYLE */
                    )
                  ], 10, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              $options.flexDirectionEnd || $options.horizontalRight ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-fab__item uni-fab__item--first"
              })) : vue.createCommentVNode("v-if", true)
            ],
            6
            /* CLASS, STYLE */
          )
        ],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass([{
            "uni-fab__circle--leftBottom": $options.leftBottom,
            "uni-fab__circle--rightBottom": $options.rightBottom,
            "uni-fab__circle--leftTop": $options.leftTop,
            "uni-fab__circle--rightTop": $options.rightTop,
            "uni-fab__content--other-platform": !$data.isAndroidNvue
          }, "uni-fab__circle uni-fab__plus"]),
          style: vue.normalizeStyle({ "background-color": $data.styles.buttonColor, "bottom": $options.nvueBottom }),
          onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
        },
        [
          vue.createVNode(_component_uni_icons, {
            class: vue.normalizeClass(["fab-circle-icon", { "uni-fab__plus--active": $data.isShow && $props.content.length > 0 }]),
            type: $data.styles.icon,
            color: $data.styles.iconColor,
            size: "32"
          }, null, 8, ["type", "color", "class"]),
          vue.createCommentVNode(` <view class="fab-circle-v"  :class="{'uni-fab__plus--active': isShow && content.length > 0}"></view>\r
			<view class="fab-circle-h" :class="{'uni-fab__plus--active': isShow  && content.length > 0}"></view> `)
        ],
        6
        /* CLASS, STYLE */
      )
    ]);
  }
  const __easycom_2$5 = /* @__PURE__ */ _export_sfc(_sfc_main$1l, [["render", _sfc_render$1k], ["__scopeId", "data-v-85f34dfc"], ["__file", "E:/BankSystem/user/uni_modules/uni-fab/components/uni-fab/uni-fab.vue"]]);
  const _sfc_main$1k = {
    data() {
      return {
        username: "",
        password: "",
        error: "",
        title: "uni-fab",
        directionStr: "垂直",
        horizontal: "left",
        vertical: "bottom",
        direction: "horizontal",
        that: "",
        pattern: {
          color: "#7A7E83",
          backgroundColor: "#fff",
          selectedColor: "#007AFF",
          buttonColor: "#ff0000",
          iconColor: "#fff"
        },
        is_color_type: false,
        content: [
          {
            iconPath: "/static/switch.png",
            text: "短信登录",
            active: false
          },
          {
            iconPath: "/static/find.png",
            text: "找回密码",
            active: false
          },
          {
            iconPath: "/static/register.png",
            text: "注册",
            active: false
          }
        ]
      };
    },
    methods: {
      onUsernameInput(event) {
        this.username = event.detail.value;
      },
      onPasswordInput(event) {
        this.password = event.detail.value;
      },
      onLoginClick() {
        let that = this;
        uni.request({
          url: "https://120.55.37.93/login",
          method: "POST",
          data: {
            "userName": that.username,
            "password": that.password
            //"userName":'18629153578',  "password": '18629153578ljf' ,
          },
          success: (res) => {
            if (res.data.code === 200) {
              uni.showToast({
                title: "登录成功",
                icon: "success"
              });
              uni.setStorageSync("token", res.data.data.token);
              uni.setStorageSync("userName", that.username);
              uni.request({
                url: "https://120.55.37.93/query/bankCard",
                method: "GET",
                data: {},
                header: {
                  "token": res.data.data.token
                },
                success: (res2) => {
                  uni.setStorageSync("tranferCardId", res2.data.data[0].cardId);
                },
                fail: (error2) => {
                  formatAppLog("log", "at pages/login/login.vue:113", error2);
                }
              });
              uni.request({
                url: "https://120.55.37.93/query/customerInfo",
                method: "GET",
                data: {},
                header: {
                  "token": res.data.data.token
                },
                success: (res2) => {
                  uni.setStorageSync("name", res2.data.data.surname + res2.data.data.name);
                },
                fail: (error2) => {
                  formatAppLog("log", "at pages/login/login.vue:127", error2);
                }
              });
              uni.switchTab({
                url: "/pages/home/home"
              });
            } else {
              uni.showToast({
                title: "请输入正确的手机号和密码",
                icon: "error"
              });
            }
            formatAppLog("log", "at pages/login/login.vue:144", res);
          },
          fail: (error2) => {
            if (error2.data.code === 300)
              ;
            else {
              formatAppLog("log", "at pages/login/login.vue:151", "登录失败，但原因未知");
              formatAppLog("log", "at pages/login/login.vue:152", error2);
            }
          }
        });
      },
      trigger(e2) {
        formatAppLog("log", "at pages/login/login.vue:163", e2);
        if (e2.index == 0)
          uni.navigateTo({
            url: "/pages/login-message/login-message"
          });
        if (e2.index == 1)
          uni.navigateTo({
            url: "/pages/findOne/findOne"
          });
        if (e2.index == 2)
          uni.navigateTo({
            url: "/pages/register/register"
          });
      },
      fabClick() {
      }
    }
  };
  function _sfc_render$1j(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1$b);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_2$6);
    const _component_uni_fab = resolveEasycom(vue.resolveDynamicComponent("uni-fab"), __easycom_2$5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("text", { class: "title" }),
      vue.createElementVNode("text", { class: "title" }),
      vue.createElementVNode("text", { class: "title" }, "登录"),
      vue.createVNode(_component_uv_form, null, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_form_item, {
            label: "+86",
            "border-bottom": true
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "input",
                {
                  class: "input",
                  type: "text",
                  placeholder: "  请输入手机号",
                  onInput: _cache[0] || (_cache[0] = (...args) => $options.onUsernameInput && $options.onUsernameInput(...args))
                },
                null,
                32
                /* HYDRATE_EVENTS */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uv_form_item, { "border-bottom": true }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "input",
                {
                  class: "input",
                  type: "password",
                  placeholder: "  请输入密码",
                  onInput: _cache[1] || (_cache[1] = (...args) => $options.onPasswordInput && $options.onPasswordInput(...args))
                },
                null,
                32
                /* HYDRATE_EVENTS */
              )
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createElementVNode("text", { class: "title" }),
      vue.createElementVNode("button", {
        class: "button",
        type: "warn",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.onLoginClick && $options.onLoginClick(...args))
      }, "登录"),
      vue.createElementVNode("text", { class: "title" }),
      $data.error ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: "error"
        },
        vue.toDisplayString($data.error),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true),
      vue.createVNode(_component_uni_fab, {
        pattern: $data.pattern,
        content: $data.content,
        horizontal: $data.horizontal,
        vertical: $data.vertical,
        direction: $data.direction,
        onTrigger: $options.trigger,
        onFabClick: $options.fabClick
      }, null, 8, ["pattern", "content", "horizontal", "vertical", "direction", "onTrigger", "onFabClick"])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$1k, [["render", _sfc_render$1j], ["__file", "E:/BankSystem/user/pages/login/login.vue"]]);
  const _sfc_main$1j = {
    data() {
      return {
        // state:false,
        //轮播
        swiperList: [
          { sid: 0, src: "自定义src0", img: "../../static/HM-shophome/swiper-img/0.jpg" },
          { sid: 1, src: "自定义src1", img: "../../static/HM-shophome/swiper-img/1.jpg" },
          { sid: 2, src: "自定义src2", img: "../../static/HM-shophome/swiper-img/2.jpg" },
          { sid: 3, src: "自定义src3", img: "../../static/HM-shophome/swiper-img/3.jpg" }
        ],
        //分类
        categoryList: [
          [
            //第一页
            { cat_id: 0, img: "../../static/icon/icon_home_account.svg", title: "账户", url: "/pages/accountView/accountView" },
            { cat_id: 1, img: "../../static/icon/icon_home_personalInfo.svg", title: "个人信息", url: "/pages/personalInformation/personalInformation" },
            { cat_id: 2, img: "../../static/icon/icon_home_transfer.svg", title: "转账", url: "/pages/transfer/transfer" },
            { cat_id: 3, img: "../../static/icon/icon_home_transferRecord.svg", title: "转账记录", url: "/pages/transferRecord/transferRecord" },
            { cat_id: 4, img: "../../static/icon/icon_home_transactionRecord.svg", title: "交易明细", url: "/pages/transactionRecord/transactionRecord" },
            { cat_id: 5, img: "../../static/icon/icon_home_RAE.svg", title: "月度收支", url: "/pages/monthIE/monthIE" },
            { cat_id: 6, img: "../../static/icon/icon_home_safetySettings.svg", title: "安全中心", url: "/pages/securityAndSettings/securityAndSettings" },
            { cat_id: 7, img: "../../static/icon/icon_home_code.svg", title: "收付款", url: "/pages/QRcode/QRcode" },
            { cat_id: 8, img: "../../static/icon/icon_home_scan.svg", title: "扫一扫", url: "scan" },
            { cat_id: 9, img: "../../static/icon/icon_home_transactionSettings.svg", title: "限额", url: "" }
          ]
          // [//第二页
          // 	// { cat_id: 9, img: '../../static/icon/icon_home_transactionSettings.svg', title: '限额' },
          // 	// { cat_id: 11, img: '../../static/HM-shophome/category-img/11.png', title: '乳液' },
          // 	// { cat_id: 12, img: '../../static/HM-shophome/category-img/12.png', title: '梳子' },
          // 	// { cat_id: 13, img: '../../static/HM-shophome/category-img/13.png', title: '刷子' },
          // 	// { cat_id: 14, img: '../../static/HM-shophome/category-img/14.png', title: '洗脸仪' },
          // 	// { cat_id: 15, img: '../../static/HM-shophome/category-img/15.png', title: '洗面奶' },
          // 	// { cat_id: 16, img: '../../static/HM-shophome/category-img/16.png', title: '香水' }
          // ]
        ],
        //推荐商品 3个
        pickList: [
          { goods_id: 0, img: "../../static/image/ad1.png", price: "", slogan: "" },
          { goods_id: 1, img: "../../static/image/ad2.jpg", price: "", slogan: "" },
          { goods_id: 2, img: "../../static/image/ad3.jpg", price: "", slogan: "" }
        ],
        //猜你喜欢列表
        productList: [
          { goods_id: 0, img: "../../static/HM-shophome/img/p1.jpg", name: "商品名称商品名称商品名称商品名称商品名称", price: "￥168", slogan: "1235人付款" },
          { goods_id: 1, img: "../../static/HM-shophome/img/p2.jpg", name: "商品名称商品名称商品名称商品名称商品名称", price: "￥168", slogan: "1235人付款" },
          { goods_id: 2, img: "../../static/HM-shophome/img/p3.jpg", name: "商品名称商品名称商品名称商品名称商品名称", price: "￥168", slogan: "1235人付款" },
          { goods_id: 3, img: "../../static/HM-shophome/img/p4.jpg", name: "商品名称商品名称商品名称商品名称商品名称", price: "￥168", slogan: "1235人付款" },
          { goods_id: 4, img: "../../static/HM-shophome/img/p5.jpg", name: "商品名称商品名称商品名称商品名称商品名称", price: "￥168", slogan: "1235人付款" },
          { goods_id: 5, img: "../../static/HM-shophome/img/p6.jpg", name: "商品名称商品名称商品名称商品名称商品名称", price: "￥168", slogan: "1235人付款" },
          { goods_id: 6, img: "../../static/HM-shophome/img/p7.jpg", name: "商品名称商品名称商品名称商品名称商品名称", price: "￥168", slogan: "1235人付款" },
          { goods_id: 7, img: "../../static/HM-shophome/img/p8.jpg", name: "商品名称商品名称商品名称商品名称商品名称", price: "￥168", slogan: "1235人付款" },
          { goods_id: 8, img: "../../static/HM-shophome/img/p9.jpg", name: "商品名称商品名称商品名称商品名称商品名称", price: "￥168", slogan: "1235人付款" },
          { goods_id: 9, img: "../../static/HM-shophome/img/p10.jpg", name: "商品名称商品名称商品名称商品名称商品名称", price: "￥168", slogan: "1235人付款" }
        ],
        categoryHeight: "150px",
        currentPageindex: 0,
        headerPosition: "fixed",
        loadingText: "正在加载..."
      };
    },
    computed: {},
    onReady() {
    },
    activated() {
    },
    // onPageScroll(e){
    // 	//兼容iOS端下拉时顶部漂移
    // 	if(e.scrollTop>=0){
    // 		this.headerPosition = "fixed";
    // 	}else{
    // 		this.headerPosition = "absolute";
    // 	}
    // },
    //下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
    // onPullDownRefresh() {
    //        setTimeout(function () {
    //            uni.stopPullDownRefresh();
    //        }, 1000);
    //    },
    //上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
    // onReachBottom(){
    // 	uni.showToast({title: '触发上拉加载'});
    // 	let len = this.productList.length;
    // 	if(len>=40){
    // 		this.loadingText="到底了";
    // 		return false;
    // 	}
    // 	let end_goods_id = this.productList[len-1].goods_id;
    // 	for(let i=1;i<=10;i++){
    // 		let goods_id = end_goods_id+i;
    // 		let p = { goods_id: goods_id, img: '../../static/HM-shophome/img/p'+(goods_id%10==0?10:goods_id%10)+'.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' };
    // 		this.productList.push(p);
    // 	}
    // },
    onLoad() {
    },
    methods: {
      // islogin(){
      // 	return getApp().globalData.islogin
      // },
      // clickLogin(){
      // 	uni.navigateTo({
      // 		url:"/pages/login/login"
      // 	})
      // },
      clickExit() {
        uni.showModal({
          content: "请确认是否退出当前登录账号？",
          success(res) {
            if (res.confirm) {
              uni.getStorage({
                key: "token",
                success: function(res2) {
                  let _token = res2.data;
                  uni.showLoading({
                    title: "",
                    mask: true
                  });
                  uni.request({
                    url: "https://120.55.37.93/user/logout",
                    method: "GET",
                    header: {
                      "token": _token
                    },
                    data: {},
                    success: function(res3) {
                      if (res3.data.code == 200) {
                        uni.showToast({
                          title: "注销成功"
                        });
                        uni.navigateTo({
                          url: "/pages/login/login"
                        });
                      }
                      uni.hideLoading();
                    },
                    fail: function(error2) {
                      uni.hideLoading();
                      uni.showToast({
                        title: "错误，稍后再试",
                        icon: "error",
                        duration: 2e3
                      });
                    }
                  });
                }
              });
            }
          }
        });
      },
      //扫一扫
      scan() {
        let token_ = "";
        uni.getStorage({
          key: "token",
          success(res) {
            token_ = res.data;
            formatAppLog("log", "at pages/home/home.vue:234", res.data);
            formatAppLog("log", "at pages/home/home.vue:235", 1);
            uni.scanCode({
              success: function(res2) {
                if (res2.scanType == "QR_CODE") {
                  uni.setStorageSync("orderId", res2.result);
                  formatAppLog("log", "at pages/home/home.vue:240", res2);
                  uni.request({
                    url: "https://120.55.37.93/TDCode/verify?orderId=" + res2.result,
                    method: "GET",
                    header: {
                      "token": token_
                    },
                    success: function(res3) {
                      formatAppLog("log", "at pages/home/home.vue:248", res3);
                      uni.setStorage({
                        key: "payeeName",
                        data: res3.data.data.payeeName
                      });
                      uni.setStorage({
                        key: "payeeCardNumber",
                        data: res3.data.data.payeeCardNumber
                      });
                      uni.getStorage({
                        key: "payeeName",
                        success: function(res4) {
                          formatAppLog("log", "at pages/home/home.vue:260", res4);
                        }
                      });
                      uni.navigateTo({
                        url: "/pages/codeTransfer/codeTransfer",
                        success: function(res4) {
                        }
                      });
                    },
                    fail: function(error2) {
                      formatAppLog("log", "at pages/home/home.vue:271", "寄咯");
                    }
                  });
                }
              }
            });
          }
        });
      },
      //搜索跳转
      toSearch() {
      },
      //轮播图跳转
      toSwiper(e2) {
      },
      //分类跳转
      toCategory(e2) {
        if (e2.url == "scan") {
          this.scan();
        } else {
          uni.navigateTo({
            url: e2.url
          });
        }
      },
      //推荐商品跳转
      toPick(e2) {
      },
      //商品跳转
      toGoods(e2) {
      },
      //更新分类指示器
      categoryChange(event) {
        this.currentPageindex = event.detail.current;
      },
      //分类图片加载完毕
      categoryImgLoad(e2) {
        this.categoryImg = this.categoryImg ? this.categoryImg + 1 : 1;
        if (this.categoryImg == 10) {
          this.getCategoryHeight();
        }
      },
      //更新分类高度
      getCategoryHeight() {
        let view = uni.createSelectorQuery().select(".category-list");
        view.fields(
          {
            size: true
          },
          (data) => {
            this.categoryHeight = data.height + "px";
          }
        ).exec();
      }
    }
  };
  function _sfc_render$1i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" 状态栏 "),
      vue.createElementVNode(
        "view",
        {
          class: "status",
          style: vue.normalizeStyle({ position: $data.headerPosition })
        },
        null,
        4
        /* STYLE */
      ),
      vue.createCommentVNode(" 漂浮头部 "),
      vue.createElementVNode(
        "view",
        {
          class: "header",
          style: vue.normalizeStyle({ position: $data.headerPosition })
        },
        [
          vue.createElementVNode("view", { class: "menu" }, [
            vue.createElementVNode("image", {
              mode: "widthFix",
              src: "/static/icon/icon_exit.svg",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.clickExit && $options.clickExit(...args))
            })
          ]),
          vue.createCommentVNode(' 			<view v-else class="menu">\r\n				<image mode="widthFix" src="../../static/icon/icon_login.svg" @click="clickLogin"></image>\r\n			</view> '),
          vue.createElementVNode("view", { class: "input" }, [
            vue.createElementVNode("view", { class: "icon search" }),
            vue.createElementVNode("input", {
              placeholder: "搜索一下",
              onClick: _cache[1] || (_cache[1] = ($event) => $options.toSearch())
            })
          ]),
          vue.createElementVNode("view", { class: "scan" }, [
            vue.createElementVNode("view", {
              class: "icon scan",
              onClick: _cache[2] || (_cache[2] = (...args) => $options.scan && $options.scan(...args))
            })
          ])
        ],
        4
        /* STYLE */
      ),
      vue.createCommentVNode(" 占位 "),
      vue.createElementVNode("view", { class: "place" }),
      vue.createCommentVNode(" 轮播图 "),
      vue.createElementVNode("view", { class: "swiper-view" }, [
        vue.createElementVNode("swiper", {
          class: "swiper",
          "indicator-dots": "true",
          autoplay: "true",
          circular: "true",
          "indicator-active-color": "#ffffff"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.swiperList, (swiper) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", {
                key: swiper.sid,
                onClick: ($event) => $options.toSwiper(swiper)
              }, [
                vue.createElementVNode("image", {
                  mode: "aspectFill",
                  src: swiper.img
                }, null, 8, ["src"])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "keep-out" })
      ]),
      vue.createCommentVNode(" 分类轮播 "),
      vue.createElementVNode("view", { class: "category" }, [
        vue.createElementVNode("view", { class: "box" }, [
          vue.createElementVNode(
            "swiper",
            {
              class: "swiper",
              duration: "300",
              style: vue.normalizeStyle({ height: $data.categoryHeight }),
              onChange: _cache[4] || (_cache[4] = (...args) => $options.categoryChange && $options.categoryChange(...args))
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.categoryList, (page2, pageindex) => {
                  return vue.openBlock(), vue.createElementBlock("swiper-item", { key: pageindex }, [
                    vue.createElementVNode("view", { class: "category-list" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(page2, (category) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "icon",
                            key: category.cat_id,
                            onClick: ($event) => $options.toCategory(category)
                          }, [
                            vue.createElementVNode("image", {
                              mode: "widthFix",
                              src: category.img,
                              onLoad: _cache[3] || (_cache[3] = (...args) => $options.categoryImgLoad && $options.categoryImgLoad(...args))
                            }, null, 40, ["src"]),
                            vue.createElementVNode(
                              "view",
                              null,
                              vue.toDisplayString(category.title),
                              1
                              /* TEXT */
                            )
                          ], 8, ["onClick"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            36
            /* STYLE, HYDRATE_EVENTS */
          ),
          vue.createElementVNode("view", { class: "dots" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.categoryList, (page2, pageindex) => {
                return vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: pageindex,
                    class: vue.normalizeClass({ active: pageindex == $data.currentPageindex })
                  },
                  null,
                  2
                  /* CLASS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ]),
      vue.createCommentVNode(' 		<view class="pick">\r\n			<view class="box">\r\n				<view style="height: 900rpx;"></view>\r\n			</view>\r\n		</view> '),
      vue.createCommentVNode(" 推荐商品 "),
      vue.createElementVNode("view", { class: "pick" }, [
        vue.createElementVNode("view", { class: "box" }, [
          vue.createElementVNode("image", {
            mode: "widthFix",
            src: "/static/image/ad1.png"
          })
        ])
      ]),
      vue.createCommentVNode(" 广告横幅 "),
      vue.createElementVNode("view", { class: "banner" }, [
        vue.createElementVNode("image", {
          mode: "widthFix",
          src: "/static/HM-shophome/banner.jpg"
        })
      ])
    ]);
  }
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$1j, [["render", _sfc_render$1i], ["__file", "E:/BankSystem/user/pages/home/home.vue"]]);
  const props$p = {
    props: {
      // 文字颜色
      color: {
        type: String,
        default: ""
      },
      // 字体大小，单位px
      fontSize: {
        type: [String, Number],
        default: 14
      },
      // 是否显示下划线
      underLine: {
        type: Boolean,
        default: false
      },
      // 要跳转的链接
      href: {
        type: String,
        default: ""
      },
      // 小程序中复制到粘贴板的提示语
      mpTips: {
        type: String,
        default: "链接已复制，请在浏览器打开"
      },
      // 下划线颜色
      lineColor: {
        type: String,
        default: ""
      },
      // 超链接的问题，不使用slot形式传入，是因为nvue下无法修改颜色
      text: {
        type: String,
        default: ""
      },
      ...(_n = (_m = uni.$uv) == null ? void 0 : _m.props) == null ? void 0 : _n.link
    }
  };
  const _sfc_main$1i = {
    name: "uv-link",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$p],
    computed: {
      linkStyle() {
        const style = {
          color: this.color,
          fontSize: this.$uv.addUnit(this.fontSize),
          // line-height设置为比字体大小多2px
          lineHeight: this.$uv.addUnit(this.$uv.getPx(this.fontSize) + 2),
          textDecoration: this.underLine ? "underline" : "none"
        };
        return style;
      }
    },
    methods: {
      openLink() {
        plus.runtime.openURL(this.href);
        this.$emit("click");
      }
    }
  };
  function _sfc_render$1h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        class: "uv-link",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.openLink && $options.openLink(...args), ["stop"])),
        style: vue.normalizeStyle([$options.linkStyle, _ctx.$uv.addStyle(_ctx.customStyle)])
      },
      vue.toDisplayString(_ctx.text),
      5
      /* TEXT, STYLE */
    );
  }
  const __easycom_1$a = /* @__PURE__ */ _export_sfc(_sfc_main$1i, [["render", _sfc_render$1h], ["__scopeId", "data-v-86e87617"], ["__file", "E:/BankSystem/user/uni_modules/uv-link/components/uv-link/uv-link.vue"]]);
  const value = {
    computed: {
      // 经处理后需要显示的值
      value() {
        const {
          text,
          mode,
          format: format2,
          href
        } = this;
        if (mode === "price") {
          if (!/^\d+(\.\d+)?$/.test(text)) {
            error("金额模式下，text参数需要为金额格式");
          }
          if (func(format2)) {
            return format2(text);
          }
          return priceFormat(text, 2);
        }
        if (mode === "date") {
          !date$1(text) && error("日期模式下，text参数需要为日期或时间戳格式");
          if (func(format2)) {
            return format2(text);
          }
          if (format2) {
            return timeFormat(text, format2);
          }
          return timeFormat(text, "yyyy-mm-dd");
        }
        if (mode === "phone") {
          if (func(format2)) {
            return format2(text);
          }
          if (format2 === "encrypt") {
            return `${text.substr(0, 3)}****${text.substr(7)}`;
          }
          return text;
        }
        if (mode === "name") {
          !(typeof text === "string") && error("姓名模式下，text参数需要为字符串格式");
          if (func(format2)) {
            return format2(text);
          }
          if (format2 === "encrypt") {
            return this.formatName(text);
          }
          return text;
        }
        if (mode === "link") {
          !url(href) && error("超链接模式下，href参数需要为URL格式");
          return text;
        }
        return text;
      }
    },
    methods: {
      // 默认的姓名脱敏规则
      formatName(name) {
        let value2 = "";
        if (name.length === 2) {
          value2 = name.substr(0, 1) + "*";
        } else if (name.length > 2) {
          let char = "";
          for (let i2 = 0, len = name.length - 2; i2 < len; i2++) {
            char += "*";
          }
          value2 = name.substr(0, 1) + char + name.substr(-1, 1);
        } else {
          value2 = name;
        }
        return value2;
      }
    }
  };
  const button = {
    props: {
      lang: String,
      sessionFrom: String,
      sendMessageTitle: String,
      sendMessagePath: String,
      sendMessageImg: String,
      showMessageCard: Boolean,
      appParameter: String,
      formType: String,
      openType: String
    }
  };
  const openType = {
    props: {
      openType: String
    },
    emits: ["getphonenumber", "getuserinfo", "error", "opensetting", "launchapp", "contact", "chooseavatar", "addgroupapp", "chooseaddress", "subscribe", "login", "im"],
    methods: {
      onGetPhoneNumber(event) {
        this.$emit("getphonenumber", event.detail);
      },
      onGetUserInfo(event) {
        this.$emit("getuserinfo", event.detail);
      },
      onError(event) {
        this.$emit("error", event.detail);
      },
      onOpenSetting(event) {
        this.$emit("opensetting", event.detail);
      },
      onLaunchApp(event) {
        this.$emit("launchapp", event.detail);
      },
      onContact(event) {
        this.$emit("contact", event.detail);
      },
      onChooseavatar(event) {
        this.$emit("chooseavatar", event.detail);
      },
      onAgreeprivacyauthorization(event) {
        this.$emit("agreeprivacyauthorization", event.detail);
      },
      onAddgroupapp(event) {
        this.$emit("addgroupapp", event.detail);
      },
      onChooseaddress(event) {
        this.$emit("chooseaddress", event.detail);
      },
      onSubscribe(event) {
        this.$emit("subscribe", event.detail);
      },
      onLogin(event) {
        this.$emit("login", event.detail);
      },
      onIm(event) {
        this.$emit("im", event.detail);
      }
    }
  };
  const props$o = {
    props: {
      // 主题颜色
      type: {
        type: String,
        default: ""
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      // 显示的值
      text: {
        type: [String, Number],
        default: ""
      },
      // 前置图标
      prefixIcon: {
        type: String,
        default: ""
      },
      // 后置图标
      suffixIcon: {
        type: String,
        default: ""
      },
      // 文本处理的匹配模式
      // text-普通文本，price-价格，phone-手机号，name-姓名，date-日期，link-超链接
      mode: {
        type: String,
        default: ""
      },
      // mode=link下，配置的链接
      href: {
        type: String,
        default: ""
      },
      // 格式化规则
      format: {
        type: [String, Function],
        default: ""
      },
      // mode=phone时，点击文本是否拨打电话
      call: {
        type: Boolean,
        default: true
      },
      // 小程序的打开方式
      openType: {
        type: String,
        default: ""
      },
      // 是否粗体，默认normal
      bold: {
        type: Boolean,
        default: false
      },
      // 是否块状
      block: {
        type: Boolean,
        default: false
      },
      // 文本显示的行数，如果设置，超出此行数，将会显示省略号
      lines: {
        type: [String, Number],
        default: ""
      },
      // 文本颜色
      color: {
        type: String,
        default: "#303133"
      },
      // 字体大小
      size: {
        type: [String, Number],
        default: 15
      },
      // 图标的样式
      iconStyle: {
        type: [Object, String],
        default: () => ({
          fontSize: "15px"
        })
      },
      // 文字装饰，下划线，中划线等，可选值 none|underline|line-through
      decoration: {
        type: String,
        default: "none"
      },
      // 外边距，对象、字符串，数值形式均可
      margin: {
        type: [Object, String, Number],
        default: 0
      },
      // 文本行高
      lineHeight: {
        type: [String, Number],
        default: ""
      },
      // 文本对齐方式，可选值left|center|right
      align: {
        type: String,
        default: "left"
      },
      // 文字换行，可选值break-word|normal|anywhere
      wordWrap: {
        type: String,
        default: "normal"
      },
      ...(_p = (_o = uni.$uv) == null ? void 0 : _o.props) == null ? void 0 : _p.text
    }
  };
  const _sfc_main$1h = {
    name: "uv-text",
    emits: ["click"],
    mixins: [mpMixin, mixin, value, props$o],
    computed: {
      valueStyle() {
        const style = {
          textDecoration: this.decoration,
          fontWeight: this.bold ? "bold" : "normal",
          wordWrap: this.wordWrap,
          fontSize: this.$uv.addUnit(this.size)
        };
        !this.type && (style.color = this.color);
        this.isNvue && this.lines && (style.lines = this.lines);
        if (this.isNvue && this.mode != "price" && !this.prefixIcon && !this.suffixIcon) {
          style.flex = 1;
          style.textAlign = this.align === "left" ? "flex-start" : this.align === "center" ? "center" : "right";
        }
        this.lineHeight && (style.lineHeight = this.$uv.addUnit(this.lineHeight));
        !this.isNvue && this.block && (style.display = "block");
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      isNvue() {
        let nvue = false;
        return nvue;
      },
      isMp() {
        let mp = false;
        return mp;
      }
    },
    data() {
      return {};
    },
    methods: {
      clickHandler() {
        if (this.call && this.mode === "phone") {
          uni.makePhoneCall({
            phoneNumber: this.text
          });
        }
        this.$emit("click");
      }
    }
  };
  function _sfc_render$1g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_link = resolveEasycom(vue.resolveDynamicComponent("uv-link"), __easycom_1$a);
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-text", []]),
        style: vue.normalizeStyle({
          margin: _ctx.margin,
          justifyContent: _ctx.align === "left" ? "flex-start" : _ctx.align === "center" ? "center" : "flex-end"
        }),
        onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        _ctx.mode === "price" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: vue.normalizeClass(["uv-text__price", _ctx.type && `uv-text__value--${_ctx.type}`]),
            style: vue.normalizeStyle([$options.valueStyle])
          },
          "￥",
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.prefixIcon ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "uv-text__prefix-icon"
        }, [
          vue.createVNode(_component_uv_icon, {
            name: _ctx.prefixIcon,
            customStyle: _ctx.$uv.addStyle(_ctx.iconStyle)
          }, null, 8, ["name", "customStyle"])
        ])) : vue.createCommentVNode("v-if", true),
        _ctx.mode === "link" ? (vue.openBlock(), vue.createBlock(_component_uv_link, {
          key: 2,
          text: _ctx.value,
          href: _ctx.href,
          underLine: ""
        }, null, 8, ["text", "href"])) : _ctx.openType && $options.isMp ? (vue.openBlock(), vue.createElementBlock("button", {
          key: 3,
          class: "uv-reset-button uv-text__value",
          style: vue.normalizeStyle([$options.valueStyle]),
          openType: _ctx.openType,
          onGetuserinfo: _cache[0] || (_cache[0] = (...args) => _ctx.onGetUserInfo && _ctx.onGetUserInfo(...args)),
          onContact: _cache[1] || (_cache[1] = (...args) => _ctx.onContact && _ctx.onContact(...args)),
          onGetphonenumber: _cache[2] || (_cache[2] = (...args) => _ctx.onGetPhoneNumber && _ctx.onGetPhoneNumber(...args)),
          onError: _cache[3] || (_cache[3] = (...args) => _ctx.onError && _ctx.onError(...args)),
          onLaunchapp: _cache[4] || (_cache[4] = (...args) => _ctx.onLaunchApp && _ctx.onLaunchApp(...args)),
          onOpensetting: _cache[5] || (_cache[5] = (...args) => _ctx.onOpenSetting && _ctx.onOpenSetting(...args)),
          lang: _ctx.lang,
          "session-from": _ctx.sessionFrom,
          "send-message-title": _ctx.sendMessageTitle,
          "send-message-path": _ctx.sendMessagePath,
          "send-message-img": _ctx.sendMessageImg,
          "show-message-card": _ctx.showMessageCard,
          "app-parameter": _ctx.appParameter
        }, vue.toDisplayString(_ctx.value), 45, ["openType", "lang", "session-from", "send-message-title", "send-message-path", "send-message-img", "show-message-card", "app-parameter"])) : (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 4,
            class: vue.normalizeClass(["uv-text__value", [
              _ctx.type && `uv-text__value--${_ctx.type}`,
              _ctx.lines && `uv-line-${_ctx.lines}`
            ]]),
            style: vue.normalizeStyle([$options.valueStyle])
          },
          vue.toDisplayString(_ctx.value),
          7
          /* TEXT, CLASS, STYLE */
        )),
        _ctx.suffixIcon ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 5,
          class: "uv-text__suffix-icon"
        }, [
          vue.createVNode(_component_uv_icon, {
            name: _ctx.suffixIcon,
            customStyle: _ctx.$uv.addStyle(_ctx.iconStyle)
          }, null, 8, ["name", "customStyle"])
        ])) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$9 = /* @__PURE__ */ _export_sfc(_sfc_main$1h, [["render", _sfc_render$1g], ["__scopeId", "data-v-8da47eb3"], ["__file", "E:/BankSystem/user/uni_modules/uv-text/components/uv-text/uv-text.vue"]]);
  const props$n = {
    props: {
      // 头像图片路径(不能为相对路径)
      src: {
        type: String,
        default: ""
      },
      // 头像形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: "circle"
      },
      // 头像尺寸
      size: {
        type: [String, Number],
        default: 40
      },
      // 裁剪模式
      mode: {
        type: String,
        default: "scaleToFill"
      },
      // 显示的文字
      text: {
        type: String,
        default: ""
      },
      // 背景色
      bgColor: {
        type: String,
        default: "#c0c4cc"
      },
      // 文字颜色
      color: {
        type: String,
        default: "#fff"
      },
      // 文字大小
      fontSize: {
        type: [String, Number],
        default: 18
      },
      // 显示的图标
      icon: {
        type: String,
        default: ""
      },
      // 显示小程序头像，只对百度，微信，QQ小程序有效
      mpAvatar: {
        type: Boolean,
        default: false
      },
      // 是否使用随机背景色
      randomBgColor: {
        type: Boolean,
        default: false
      },
      // 加载失败的默认头像(组件有内置默认图片)
      defaultUrl: {
        type: String,
        default: ""
      },
      // 如果配置了randomBgColor为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间
      colorIndex: {
        type: [String, Number],
        // 校验参数规则，索引在0-19之间
        validator(n2) {
          return range$2(n2, [0, 19]) || n2 === "";
        },
        default: ""
      },
      // 组件标识符
      name: {
        type: String,
        default: ""
      },
      ...(_r = (_q = uni.$uv) == null ? void 0 : _q.props) == null ? void 0 : _r.avatar
    }
  };
  const base64Avatar = "data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwfHx8fHx8fHx8fAQcHBw0MDRgQEBgaFREVGh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCADIAMgDAREAAhEBAxEB/8QAcQABAQEAAwEBAAAAAAAAAAAAAAUEAQMGAgcBAQAAAAAAAAAAAAAAAAAAAAAQAAIBAwICBgkDBQAAAAAAAAABAhEDBCEFMVFBYXGREiKBscHRMkJSEyOh4XLxYjNDFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHbHFyZ/Dam+yLA+Z2L0Pjtyj2poD4AAAAAAAAAAAAAAAAAAAAAAAAKWFs9y6lcvvwQeqj8z9wFaziY1n/HbUX9XF97A7QAGXI23EvJ1goyfzR0YEfN269jeZ+a03pNe0DIAAAAAAAAAAAAAAAAAAAACvtO3RcVkXlWutuL9YFYAAAAAOJRjKLjJVi9GmB5/csH/mu1h/in8PU+QGMAAAAAAAAAAAAAAAAAAaMDG/6MmMH8C80+xAelSSVFolwQAAAAAAAHVlWI37ErUulaPk+hgeYnCUJuElSUXRrrQHAAAAAAAAAAAAAAAAABa2Oz4bM7r4zdF2ICmAAAAAAAAAg7zZ8GX41wuJP0rRgYAAAAAAAAAAAAAAAAAD0m2R8ODaXU33tsDSAAAAAAAAAlb9HyWZcnJd9PcBHAAAAAAAAAAAAAAAAAPS7e64Vn+KA0AAAAAAAAAJm+v8Ftf3ewCKAAAAAAAAAAAAAAAAAX9muqeGo9NttP06+0DcAAAAAAAAAjb7dTu2ra+VOT9P8AQCWAAAAAAAAAAAAAAAAAUNmyPt5Ltv4bui/kuAF0AAAAAAADiUlGLlJ0SVW+oDzOXfd/Ind6JPRdS0QHSAAAAAAAAAAAAAAAAAE2nVaNcGB6Lbs6OTao9LsF51z60BrAAAAAABJ3jOVHjW3r/sa9QEgAAAAAAAAAAAAAAAAAAAPu1duWriuW34ZR4MC9hbnZyEoy8l36XwfYBsAAADaSq9EuLAlZ+7xSdrGdW9Hc5dgEdtt1erfFgAAAAAAAAAAAAAAAAADVjbblX6NR8MH80tEBRs7HYivyzlN8lovaBPzduvY0m6eK10TXtAyAarO55lpJK54orolr+4GqO/Xaea1FvqbXvA+Z77kNeW3GPbV+4DJfzcm/pcm3H6Vou5AdAFLC2ed2Pjv1txa8sV8T6wOL+yZEKu1JXFy4MDBOE4ScZxcZLinoB8gAAAAAAAAAAAB242LeyJ+C3GvN9C7QLmJtePYpKS+5c+p8F2IDYAANJqj1T4oCfk7Nj3G5Wn9qXJax7gJ93Z82D8sVNc4v30A6Xg5i42Z+iLfqARwcyT0sz9MWvWBps7LlTf5Grce9/oBTxdtxseklHxT+uWr9AGoAB138ezfj4bsFJdD6V2MCPm7RdtJzs1uW1xXzL3gTgAAAAAAAAADRhYc8q74I6RWs5ckB6GxYtWLat21SK731sDsAAAAAAAAAAAAAAAASt021NO/YjrxuQXT1oCOAAAAAAABzGLlJRSq26JAelwsWONYjbXxcZvmwO8AAAAAAAAAAAAAAAAAAef3TEWPkVivx3NY9T6UBiAAAAAABo2+VmGXblddIJ8eivRUD0oAAAAAAAAAAAAAAAAAAAYt4tKeFKVNYNSXfRgefAAAAAAAAr7VuSSWPedKaW5v1MCsAAAAAAAAAAAAAAAAAAIe6bj96Ts2n+JPzSXzP3ATgAAAAAAAAFbbt1UUrOQ9FpC4/UwK6aaqtU+DAAAAAAAAAAAAAAA4lKMIuUmoxWrb4ARNx3R3q2rLpa4Sl0y/YCcAAAAAAAAAAANmFud7G8r89r6X0dgFvGzLGRGtuWvTF6NAdwAAAAAAAAAAAy5W442PVN+K59EePp5ARMvOv5MvO6QXCC4AZwAAAAAAAAAAAAAcxlKLUotprg1owN+PvORborq+7Hnwl3gUbO74VzRydt8pKn68ANcJwmqwkpLmnUDkAAAAfNy9atqtyagut0AxXt5xIV8Fbj6lRd7Am5G65V6qUvtwfyx94GMAAAAAAAAAAAAAAAAAAAOU2nVOj5gdsc3LiqRvTpyqwOxbnnrhdfpSfrQB7pnv/AGvuS9gHXPMy5/Fem1yq0v0A6W29XqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z";
  const _sfc_main$1g = {
    name: "uv-avatar",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$n],
    data() {
      return {
        // 如果配置randomBgColor参数为true，在图标或者文字的模式下，会随机从中取出一个颜色值当做背景色
        colors: [
          "#ffb34b",
          "#f2bba9",
          "#f7a196",
          "#f18080",
          "#88a867",
          "#bfbf39",
          "#89c152",
          "#94d554",
          "#f19ec2",
          "#afaae4",
          "#e1b0df",
          "#c38cc1",
          "#72dcdc",
          "#9acdcb",
          "#77b1cc",
          "#448aca",
          "#86cefa",
          "#98d1ee",
          "#73d1f1",
          "#80a7dc"
        ],
        avatarUrl: this.src,
        allowMp: false
      };
    },
    watch: {
      // 监听头像src的变化，赋值给内部的avatarUrl变量，因为图片加载失败时，需要修改图片的src为默认值
      // 而组件内部不能直接修改props的值，所以需要一个中间变量
      src: {
        immediate: true,
        handler(newVal) {
          this.avatarUrl = newVal;
          if (!newVal) {
            this.errorHandler();
          }
        }
      }
    },
    computed: {
      imageStyle() {
        const style = {};
        return style;
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.src.indexOf("/") !== -1;
      },
      // 图片加载时失败时触发
      errorHandler() {
        this.avatarUrl = this.defaultUrl || base64Avatar;
      },
      clickHandler() {
        this.$emit("click", this.name);
      }
    }
  };
  function _sfc_render$1f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_text = resolveEasycom(vue.resolveDynamicComponent("uv-text"), __easycom_1$9);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-avatar", [`uv-avatar--${_ctx.shape}`]]),
        style: vue.normalizeStyle([{
          backgroundColor: _ctx.text || _ctx.icon ? _ctx.randomBgColor ? $data.colors[_ctx.colorIndex !== "" ? _ctx.colorIndex : _ctx.$uv.random(0, 19)] : _ctx.bgColor : "transparent",
          width: _ctx.$uv.addUnit(_ctx.size),
          height: _ctx.$uv.addUnit(_ctx.size)
        }, _ctx.$uv.addStyle(_ctx.customStyle)]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          _ctx.mpAvatar && $data.allowMp ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [],
            64
            /* STABLE_FRAGMENT */
          )) : _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 1,
            name: _ctx.icon,
            size: _ctx.fontSize,
            color: _ctx.color
          }, null, 8, ["name", "size", "color"])) : _ctx.text ? (vue.openBlock(), vue.createBlock(_component_uv_text, {
            key: 2,
            text: _ctx.text,
            size: _ctx.fontSize,
            color: _ctx.color,
            align: "center",
            customStyle: "justify-content: center"
          }, null, 8, ["text", "size", "color"])) : (vue.openBlock(), vue.createElementBlock("image", {
            key: 3,
            class: vue.normalizeClass(["uv-avatar__image", [`uv-avatar__image--${_ctx.shape}`]]),
            src: $data.avatarUrl || _ctx.defaultUrl,
            mode: _ctx.mode,
            onError: _cache[0] || (_cache[0] = (...args) => $options.errorHandler && $options.errorHandler(...args)),
            style: vue.normalizeStyle([{
              width: _ctx.$uv.addUnit(_ctx.size),
              height: _ctx.$uv.addUnit(_ctx.size)
            }])
          }, null, 46, ["src", "mode"]))
        ], true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$f = /* @__PURE__ */ _export_sfc(_sfc_main$1g, [["render", _sfc_render$1f], ["__scopeId", "data-v-fa9b0ca7"], ["__file", "E:/BankSystem/user/uni_modules/uv-avatar/components/uv-avatar/uv-avatar.vue"]]);
  const props$m = {
    props: {
      // 占父容器宽度的多少等分，总分为12份
      span: {
        type: [String, Number],
        default: 12
      },
      // 指定栅格左侧的间隔数(总12栏)
      offset: {
        type: [String, Number],
        default: 0
      },
      // 水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)
      justify: {
        type: String,
        default: "start"
      },
      // 垂直对齐方式，可选值为top、center、bottom、stretch
      align: {
        type: String,
        default: "stretch"
      },
      // 文字对齐方式
      textAlign: {
        type: String,
        default: "left"
      },
      ...(_t = (_s = uni.$uv) == null ? void 0 : _s.props) == null ? void 0 : _t.col
    }
  };
  const _sfc_main$1f = {
    name: "uv-col",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$m],
    data() {
      return {
        width: 0,
        parentData: {
          gutter: 0
        },
        gridNum: 12
      };
    },
    computed: {
      uJustify() {
        if (this.justify == "end" || this.justify == "start")
          return "flex-" + this.justify;
        else if (this.justify == "around" || this.justify == "between")
          return "space-" + this.justify;
        else
          return this.justify;
      },
      uAlignItem() {
        if (this.align == "top")
          return "flex-start";
        if (this.align == "bottom")
          return "flex-end";
        else
          return this.align;
      },
      colStyle() {
        const style = {
          // 这里写成"padding: 0 10px"的形式是因为nvue的需要
          paddingLeft: this.$uv.addUnit(this.$uv.getPx(this.parentData.gutter) / 2),
          paddingRight: this.$uv.addUnit(this.$uv.getPx(this.parentData.gutter) / 2),
          alignItems: this.uAlignItem,
          justifyContent: this.uJustify,
          textAlign: this.textAlign,
          // 在非nvue上，使用百分比形式
          flex: `0 0 ${100 / this.gridNum * this.span}%`,
          marginLeft: 100 / 12 * this.offset + "%"
        };
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        this.updateParentData();
        this.width = await this.parent.getComponentWidth();
      },
      updateParentData() {
        this.getParentData("uv-row");
      },
      clickHandler(e2) {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$1e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-col", [
          "uv-col-" + _ctx.span
        ]]),
        ref: "uv-col",
        style: vue.normalizeStyle([$options.colStyle]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1$8 = /* @__PURE__ */ _export_sfc(_sfc_main$1f, [["render", _sfc_render$1e], ["__scopeId", "data-v-d2bffd23"], ["__file", "E:/BankSystem/user/uni_modules/uv-row/components/uv-col/uv-col.vue"]]);
  const props$l = {
    props: {
      // 给col添加间距，左右边距各占一半
      gutter: {
        type: [String, Number],
        default: 0
      },
      // 水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)
      justify: {
        type: String,
        default: "start"
      },
      // 垂直对齐方式，可选值为top、center、bottom
      align: {
        type: String,
        default: "center"
      },
      ...(_v = (_u = uni.$uv) == null ? void 0 : _u.props) == null ? void 0 : _v.row
    }
  };
  const _sfc_main$1e = {
    name: "uv-row",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$l],
    data() {
      return {};
    },
    computed: {
      uJustify() {
        if (this.justify == "end" || this.justify == "start")
          return "flex-" + this.justify;
        else if (this.justify == "around" || this.justify == "between")
          return "space-" + this.justify;
        else
          return this.justify;
      },
      uAlignItem() {
        if (this.align == "top")
          return "flex-start";
        if (this.align == "bottom")
          return "flex-end";
        else
          return this.align;
      },
      rowStyle() {
        const style = {
          alignItems: this.uAlignItem,
          justifyContent: this.uJustify
        };
        if (this.gutter) {
          style.marginLeft = this.$uv.addUnit(-Number(this.gutter) / 2);
          style.marginRight = this.$uv.addUnit(-Number(this.gutter) / 2);
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    methods: {
      clickHandler(e2) {
        this.$emit("click");
      },
      async getComponentWidth() {
        await this.$uv.sleep();
        return new Promise((resolve) => {
          this.$uvGetRect(".uv-row").then((res) => {
            resolve(res.width);
          });
        });
      }
    }
  };
  function _sfc_render$1d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-row",
        ref: "uv-row",
        style: vue.normalizeStyle([$options.rowStyle]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_2$4 = /* @__PURE__ */ _export_sfc(_sfc_main$1e, [["render", _sfc_render$1d], ["__scopeId", "data-v-692ff899"], ["__file", "E:/BankSystem/user/uni_modules/uv-row/components/uv-row/uv-row.vue"]]);
  const props$k = {
    props: {
      // 宫格的name
      name: {
        type: [String, Number, null],
        default: null
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: "transparent"
      },
      ...(_x = (_w = uni.$uv) == null ? void 0 : _w.props) == null ? void 0 : _x.gridItem
    }
  };
  const _sfc_main$1d = {
    name: "uv-grid-item",
    mixins: [mpMixin, mixin, props$k],
    emits: ["$uvGridItem", "click"],
    data() {
      return {
        parentData: {
          col: 3,
          // 父组件划分的宫格数
          border: true
          // 是否显示边框，根据父组件决定
        },
        classes: []
        // 类名集合，用于判断是否显示右边和下边框
      };
    },
    created() {
      this.updateParentData();
    },
    mounted() {
      this.init();
    },
    computed: {
      // vue下放到computed中，否则会因为延时造成闪烁
      width() {
        return 100 / Number(this.parentData.col) + "%";
      },
      itemStyle() {
        const style = {
          background: this.bgColor,
          width: this.width
        };
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    methods: {
      init() {
        uni.$on("$uvGridItem", () => {
          this.gridItemClasses();
        });
        uni.$emit("$uvGridItem");
        this.gridItemClasses();
      },
      // 获取父组件的参数
      updateParentData() {
        this.getParentData("uv-grid");
      },
      clickHandler() {
        var _a;
        let name = this.name;
        const children = (_a = this.parent) == null ? void 0 : _a.children;
        if (children && this.name === null) {
          name = children.findIndex((child) => child === this);
        }
        this.parent && this.parent.childClick(name);
        this.$emit("click", name);
      },
      async getItemWidth() {
        let width = 0;
        if (this.parent) {
          const parentWidth = await this.getParentWidth();
          width = parentWidth / Number(this.parentData.col) + "px";
        }
        this.width = width;
      },
      // 获取父元素的尺寸
      getParentWidth() {
      },
      gridItemClasses() {
        if (this.parentData.border) {
          let classes = [];
          this.parent.children.map((child, index2) => {
            if (this === child) {
              const len = this.parent.children.length;
              if ((index2 + 1) % this.parentData.col !== 0 && index2 + 1 !== len) {
                classes.push("uv-border-right");
              }
              const lessNum = len % this.parentData.col === 0 ? this.parentData.col : len % this.parentData.col;
              if (index2 < len - lessNum) {
                classes.push("uv-border-bottom");
              }
            }
          });
          this.classes = classes;
        }
      }
    },
    unmounted() {
      uni.$off("$uvGridItem");
    }
  };
  function _sfc_render$1c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-grid-item", $data.classes]),
        "hover-class": "uv-grid-item--hover-class",
        "hover-stay-time": 200,
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args)),
        style: vue.normalizeStyle([$options.itemStyle])
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1d, [["render", _sfc_render$1c], ["__scopeId", "data-v-0657340f"], ["__file", "E:/BankSystem/user/uni_modules/uv-grid/components/uv-grid-item/uv-grid-item.vue"]]);
  const props$j = {
    props: {
      // 分成几列
      col: {
        type: [String, Number],
        default: 3
      },
      // 是否显示边框
      border: {
        type: Boolean,
        default: false
      },
      // 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右
      align: {
        type: String,
        default: "left"
      },
      ...(_z = (_y = uni.$uv) == null ? void 0 : _y.props) == null ? void 0 : _z.grid
    }
  };
  const _sfc_main$1c = {
    name: "uv-grid",
    mixins: [mpMixin, mixin, props$j],
    emits: ["click"],
    data() {
      return {
        index: 0,
        width: 0
      };
    },
    watch: {
      // 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
      parentData() {
        if (this.children.length) {
          this.children.map((child) => {
            typeof child.updateParentData == "function" && child.updateParentData();
          });
        }
      }
    },
    created() {
      this.children = [];
    },
    computed: {
      // 计算父组件的值是否发生变化
      parentData() {
        return [this.hoverClass, this.col, this.size, this.border];
      },
      // 宫格对齐方式
      gridStyle() {
        let style = {};
        switch (this.align) {
          case "left":
            style.justifyContent = "flex-start";
            break;
          case "center":
            style.justifyContent = "center";
            break;
          case "right":
            style.justifyContent = "flex-end";
            break;
          default:
            style.justifyContent = "flex-start";
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    methods: {
      // 此方法由uv-grid-item触发，用于在uv-grid发出事件
      childClick(name) {
        this.$emit("click", name);
      }
    }
  };
  function _sfc_render$1b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-grid",
        ref: "uv-grid",
        style: vue.normalizeStyle([$options.gridStyle])
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_5$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1c, [["render", _sfc_render$1b], ["__scopeId", "data-v-fb64a415"], ["__file", "E:/BankSystem/user/uni_modules/uv-grid/components/uv-grid/uv-grid.vue"]]);
  const _sfc_main$1b = {
    data() {
      return {
        headerPosition: "fixed",
        name: ""
      };
    },
    methods: {
      clickLogin() {
        uni.navigateTo({
          url: "/pages/login/login"
        });
      },
      clickAccount() {
        uni.navigateTo({
          url: "/pages/accountView/accountView"
        });
      },
      clickSettings() {
        uni.navigateTo({
          url: "/pages/securityAndSettings/securityAndSettings"
        });
      },
      clickRecord() {
        uni.navigateTo({
          url: "/pages/monthIE/monthIE"
        });
      },
      clickExit() {
        uni.showModal({
          content: "请确认是否退出当前登录账号？",
          success(res) {
            if (res.confirm) {
              uni.getStorage({
                key: "token",
                success: function(res2) {
                  let _token = res2.data;
                  uni.showLoading({
                    title: "",
                    mask: true
                  });
                  uni.request({
                    url: "https://120.55.37.93/user/logout",
                    method: "GET",
                    header: {
                      "token": _token
                    },
                    data: {},
                    success: function(res3) {
                      if (res3.data.code == 200) {
                        uni.showToast({
                          title: "注销成功"
                        });
                        uni.navigateTo({
                          url: "/pages/login/login"
                        });
                      }
                      uni.hideLoading();
                    },
                    fail: function(error2) {
                      uni.hideLoading();
                      uni.showToast({
                        title: "错误，稍后再试",
                        icon: "error",
                        duration: 2e3
                      });
                    }
                  });
                }
              });
            }
          }
        });
      },
      //扫一扫
      scan() {
        uni.scanCode({
          success: (res) => {
            uni.showToast({ title: "条码内容：" + res.result });
          }
        });
      },
      //搜索跳转
      toSearch() {
        uni.showToast({ title: "建议跳转到新页面做搜索功能" });
      },
      clickTransferRecord() {
        uni.navigateTo({
          url: "/pages/transferRecord/transferRecord"
        });
      },
      clickAccountView() {
        uni.navigateTo({
          url: "/pages/accountView/accountView"
        });
      },
      clickTransactionRecord() {
        uni.navigateTo({
          url: "/pages/transactionRecord/transactionRecord"
        });
      }
    },
    computed: {
      // islogin: function(){
      // 	return getApp().globalData.islogin
      // },
      // name: function(){
      // 	let temp = ""
      // 	uni.getStorage({
      // 		key:'name',
      // 		success(res) {
      // 			__f__('log','at pages/myself/myself.vue:216',res)
      // 			temp = res.data
      // 		}
      // 	})
      // 	return temp
      // },
      timePeriod: function() {
        const now = /* @__PURE__ */ new Date();
        const hours = now.getHours();
        if (hours >= 6 && hours < 12) {
          return "早上好";
        } else if (hours >= 12 && hours < 18) {
          return "下午好";
        } else {
          return "晚上好";
        }
      }
    },
    onLoad() {
      this.name = uni.getStorageSync("name");
    }
  };
  function _sfc_render$1a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_avatar = resolveEasycom(vue.resolveDynamicComponent("uv-avatar"), __easycom_0$f);
    const _component_uv_col = resolveEasycom(vue.resolveDynamicComponent("uv-col"), __easycom_1$8);
    const _component_uv_row = resolveEasycom(vue.resolveDynamicComponent("uv-row"), __easycom_2$4);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_grid_item = resolveEasycom(vue.resolveDynamicComponent("uv-grid-item"), __easycom_4$1);
    const _component_uv_grid = resolveEasycom(vue.resolveDynamicComponent("uv-grid"), __easycom_5$1);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_4$2);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" 状态栏 "),
      vue.createElementVNode(
        "view",
        {
          class: "status",
          style: vue.normalizeStyle({ position: $data.headerPosition })
        },
        null,
        4
        /* STYLE */
      ),
      vue.createCommentVNode(" 漂浮头部 "),
      vue.createElementVNode(
        "view",
        {
          class: "header",
          style: vue.normalizeStyle({ position: $data.headerPosition })
        },
        [
          vue.createElementVNode("view", { class: "menu" }, [
            vue.createElementVNode("image", {
              mode: "widthFix",
              src: "/static/icon/icon_exit.svg",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.clickExit && $options.clickExit(...args))
            })
          ]),
          vue.createCommentVNode(' 	    	<view v-else class="menu">\r\n	    		<image mode="widthFix" src="../../static/icon/icon_exit.svg" @click="clickLogin"></image>\r\n	    	</view> '),
          vue.createElementVNode("view", { class: "input" }, [
            vue.createElementVNode("view", { class: "icon search" }),
            vue.createElementVNode("input", {
              placeholder: "搜索一下",
              onClick: _cache[1] || (_cache[1] = ($event) => $options.toSearch())
            })
          ]),
          vue.createElementVNode("view", { class: "scan" }, [
            vue.createElementVNode("view", {
              class: "icon scan",
              onClick: _cache[2] || (_cache[2] = (...args) => $options.scan && $options.scan(...args))
            })
          ])
        ],
        4
        /* STYLE */
      ),
      vue.createElementVNode("view", { class: "place" }),
      vue.createElementVNode("view", { class: "swiper-view" }, [
        vue.createVNode(_component_uv_row, { class: "avatar-box" }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_col, { span: "3" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "avatar" }, [
                  vue.createVNode(_component_uv_avatar, {
                    text: $data.name,
                    "random-bg-color": "",
                    size: "50"
                  }, null, 8, ["text"])
                ])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_col, { span: "9" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  { class: "avatar-text" },
                  vue.toDisplayString($options.timePeriod) + "，" + vue.toDisplayString($data.name),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("view", { class: "keep-out" })
      ]),
      vue.createCommentVNode(' 		<view class="keep-out"></view> '),
      vue.createElementVNode("view", { class: "category" }, [
        vue.createElementVNode("view", { class: "gird-box" }, [
          vue.createVNode(_component_uv_grid, {
            border: false,
            col: 4
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_grid_item, { onClick: $options.clickAccountView }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_icon, {
                    customStyle: { paddingTop: "20rpx" },
                    name: "/static/icon/icon_account.svg",
                    size: 32
                  }),
                  vue.createElementVNode("text", { class: "grid-text" }, "账户")
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"]),
              vue.createVNode(_component_uv_grid_item, { onClick: $options.clickTransactionRecord }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_icon, {
                    customStyle: { paddingTop: "20rpx" },
                    name: "/static/icon/icon_record.svg",
                    size: 32
                  }),
                  vue.createElementVNode("text", { class: "grid-text" }, "交易明细")
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"]),
              vue.createVNode(_component_uv_grid_item, { onClick: $options.clickTransferRecord }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_icon, {
                    customStyle: { paddingTop: "20rpx" },
                    name: "/static/icon/icon_transfer.svg",
                    size: 32
                  }),
                  vue.createElementVNode("text", { class: "grid-text" }, "转账记录")
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"]),
              vue.createVNode(_component_uv_grid_item, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_icon, {
                    customStyle: { paddingTop: "20rpx" },
                    name: "grid",
                    size: 32
                  }),
                  vue.createElementVNode("text", { class: "grid-text" }, "全部")
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "pick" }, [
        vue.createElementVNode("view", { class: "list" }, [
          vue.createElementVNode("view", {
            class: "list-item",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.clickAccount && $options.clickAccount(...args))
          }, "我的账户"),
          vue.createVNode(_component_uv_line, { margin: "10rpx" }),
          vue.createElementVNode("view", {
            class: "list-item",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.clickSettings && $options.clickSettings(...args))
          }, "安全与设置"),
          vue.createVNode(_component_uv_line, { margin: "10rpx" }),
          vue.createElementVNode("view", {
            class: "list-item",
            onClick: _cache[5] || (_cache[5] = (...args) => $options.clickRecord && $options.clickRecord(...args))
          }, "收支记录"),
          vue.createVNode(_component_uv_line, { margin: "10rpx" }),
          vue.createElementVNode("view", { class: "list-item" }, "关于我们"),
          vue.createVNode(_component_uv_line, { margin: "10rpx" }),
          vue.createElementVNode("view", { class: "list-item" }, "隐私政策")
        ]),
        vue.createElementVNode("view", { style: { "height": "600rpx" } })
      ])
    ]);
  }
  const PagesMyselfMyself = /* @__PURE__ */ _export_sfc(_sfc_main$1b, [["render", _sfc_render$1a], ["__file", "E:/BankSystem/user/pages/myself/myself.vue"]]);
  const _sfc_main$1a = {
    name: "uniLink",
    props: {
      href: {
        type: String,
        default: ""
      },
      text: {
        type: String,
        default: ""
      },
      download: {
        type: String,
        default: ""
      },
      showUnderLine: {
        type: [Boolean, String],
        default: true
      },
      copyTips: {
        type: String,
        default: "已自动复制网址，请在手机浏览器里粘贴该网址"
      },
      color: {
        type: String,
        default: "#999999"
      },
      fontSize: {
        type: [Number, String],
        default: 14
      }
    },
    computed: {
      isShowA() {
        if ((this.isMail() || this.isTel()) && this._isH5 === true) {
          return true;
        }
        return false;
      }
    },
    created() {
      this._isH5 = null;
    },
    methods: {
      isMail() {
        return this.href.startsWith("mailto:");
      },
      isTel() {
        return this.href.startsWith("tel:");
      },
      openURL() {
        if (this.isTel()) {
          this.makePhoneCall(this.href.replace("tel:", ""));
        } else {
          plus.runtime.openURL(this.href);
        }
      },
      makePhoneCall(phoneNumber) {
        uni.makePhoneCall({
          phoneNumber
        });
      }
    }
  };
  function _sfc_render$19(_ctx, _cache, $props, $setup, $data, $options) {
    return $options.isShowA ? (vue.openBlock(), vue.createElementBlock("a", {
      key: 0,
      class: vue.normalizeClass(["uni-link", { "uni-link--withline": $props.showUnderLine === true || $props.showUnderLine === "true" }]),
      href: $props.href,
      style: vue.normalizeStyle({ color: $props.color, fontSize: $props.fontSize + "px" }),
      download: $props.download
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        vue.createTextVNode(
          vue.toDisplayString($props.text),
          1
          /* TEXT */
        )
      ], true)
    ], 14, ["href", "download"])) : (vue.openBlock(), vue.createElementBlock(
      "text",
      {
        key: 1,
        class: vue.normalizeClass(["uni-link", { "uni-link--withline": $props.showUnderLine === true || $props.showUnderLine === "true" }]),
        style: vue.normalizeStyle({ color: $props.color, fontSize: $props.fontSize + "px" }),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.openURL && $options.openURL(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createTextVNode(
            vue.toDisplayString($props.text),
            1
            /* TEXT */
          )
        ], true)
      ],
      6
      /* CLASS, STYLE */
    ));
  }
  const __easycom_0$e = /* @__PURE__ */ _export_sfc(_sfc_main$1a, [["render", _sfc_render$19], ["__scopeId", "data-v-5db80ddb"], ["__file", "E:/BankSystem/user/uni_modules/uni-link/components/uni-link/uni-link.vue"]]);
  const _sfc_main$19 = {
    data() {
      return {
        href: "https://uniapp.dcloud.io/component/README?id=uniui"
      };
    },
    methods: {}
  };
  function _sfc_render$18(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_link = resolveEasycom(vue.resolveDynamicComponent("uni-link"), __easycom_0$e);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "intro" }, "本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。"),
      vue.createElementVNode("text", { class: "intro" }, "详见："),
      vue.createVNode(_component_uni_link, {
        href: $data.href,
        text: $data.href
      }, null, 8, ["href", "text"])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$19, [["render", _sfc_render$18], ["__file", "E:/BankSystem/user/pages/index/index.vue"]]);
  const props$i = {
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 输入框类型
      // number-数字输入键盘，app-vue下可以输入浮点数，app-nvue和小程序平台下只能输入整数
      // idcard-身份证输入键盘，微信、支付宝、百度、QQ小程序
      // digit-带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序
      // text-文本输入键盘
      type: {
        type: String,
        default: "text"
      },
      // 是否禁用输入框
      disabled: {
        type: Boolean,
        default: false
      },
      // 禁用状态时的背景色
      disabledColor: {
        type: String,
        default: "#f5f7fa"
      },
      // 是否显示清除控件
      clearable: {
        type: Boolean,
        default: false
      },
      // 是否密码类型
      password: {
        type: Boolean,
        default: false
      },
      // 最大输入长度，设置为 -1 的时候不限制最大长度
      maxlength: {
        type: [String, Number],
        default: -1
      },
      // 	输入框为空时的占位符
      placeholder: {
        type: String,
        default: null
      },
      // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
      placeholderClass: {
        type: String,
        default: "input-placeholder"
      },
      // 指定placeholder的样式
      placeholderStyle: {
        type: [String, Object],
        default: "color: #c0c4cc"
      },
      // 设置右下角按钮的文字，有效值：send|search|next|go|done，兼容性详见uni-app文档
      // https://uniapp.dcloud.io/component/input
      // https://uniapp.dcloud.io/component/textarea
      confirmType: {
        type: String,
        default: "done"
      },
      // 点击键盘右下角按钮时是否保持键盘不收起，H5无效
      confirmHold: {
        type: Boolean,
        default: false
      },
      // focus时，点击页面的时候不收起键盘，微信小程序有效
      holdKeyboard: {
        type: Boolean,
        default: false
      },
      // 自动获取焦点
      // 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
      focus: {
        type: Boolean,
        default: false
      },
      // 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
      autoBlur: {
        type: Boolean,
        default: false
      },
      // 指定focus时光标的位置
      cursor: {
        type: [String, Number],
        default: -1
      },
      // 输入框聚焦时底部与键盘的距离
      cursorSpacing: {
        type: [String, Number],
        default: 30
      },
      // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
      selectionStart: {
        type: [String, Number],
        default: -1
      },
      // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
      selectionEnd: {
        type: [String, Number],
        default: -1
      },
      // 键盘弹起时，是否自动上推页面
      adjustPosition: {
        type: Boolean,
        default: true
      },
      // 输入框内容对齐方式，可选值为：left|center|right
      inputAlign: {
        type: String,
        default: "left"
      },
      // 输入框字体的大小
      fontSize: {
        type: [String, Number],
        default: "14px"
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: "#303133"
      },
      // 输入框前置图标
      prefixIcon: {
        type: String,
        default: ""
      },
      // 前置图标样式，对象或字符串
      prefixIconStyle: {
        type: [String, Object],
        default: ""
      },
      // 输入框后置图标
      suffixIcon: {
        type: String,
        default: ""
      },
      // 后置图标样式，对象或字符串
      suffixIconStyle: {
        type: [String, Object],
        default: ""
      },
      // 边框类型，surround-四周边框，bottom-底部边框，none-无边框
      border: {
        type: String,
        default: "surround"
      },
      // 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
      readonly: {
        type: Boolean,
        default: false
      },
      // 输入框形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: "square"
      },
      // 用于处理或者过滤输入框内容的方法
      formatter: {
        type: [Function, null],
        default: null
      },
      // 是否忽略组件内对文本合成系统事件的处理
      ignoreCompositionEvent: {
        type: Boolean,
        default: true
      },
      ...(_B = (_A = uni.$uv) == null ? void 0 : _A.props) == null ? void 0 : _B.input
    }
  };
  const _sfc_main$18 = {
    name: "uv-input",
    mixins: [mpMixin, mixin, props$i],
    data() {
      return {
        // 输入框的值
        innerValue: "",
        // 是否处于获得焦点状态
        focused: false,
        // 过滤处理方法
        innerFormatter: (value2) => value2
      };
    },
    created() {
      this.innerValue = this.modelValue;
    },
    watch: {
      value(newVal) {
        this.innerValue = newVal;
      },
      modelValue(newVal) {
        this.innerValue = newVal;
      }
    },
    computed: {
      // 是否显示清除控件
      isShowClear() {
        const { clearable, readonly, focused, innerValue } = this;
        return !!clearable && !readonly && !!focused && innerValue !== "";
      },
      // 组件的类名
      inputClass() {
        let classes = [], { border, disabled, shape } = this;
        border === "surround" && (classes = classes.concat(["uv-border", "uv-input--radius"]));
        classes.push(`uv-input--${shape}`);
        border === "bottom" && (classes = classes.concat([
          "uv-border-bottom",
          "uv-input--no-radius"
        ]));
        return classes.join(" ");
      },
      // 组件的样式
      wrapperStyle() {
        const style = {};
        if (this.disabled) {
          style.backgroundColor = this.disabledColor;
        }
        if (this.border === "none") {
          style.padding = "0";
        } else {
          style.paddingTop = "6px";
          style.paddingBottom = "6px";
          style.paddingLeft = "9px";
          style.paddingRight = "9px";
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      // 输入框的样式
      inputStyle() {
        const style = {
          color: this.color,
          fontSize: this.$uv.addUnit(this.fontSize),
          textAlign: this.inputAlign
        };
        if (this.disabled || this.readonly) {
          style["pointer-events"] = "none";
        }
        return style;
      }
    },
    methods: {
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e2) {
        this.innerFormatter = e2;
      },
      // 当键盘输入时，触发input事件
      onInput(e2) {
        let { value: value2 = "" } = e2.detail || {};
        const formatter = this.formatter || this.innerFormatter;
        const formatValue = formatter(value2);
        this.innerValue = value2;
        this.$nextTick(() => {
          this.innerValue = formatValue;
          this.valueChange();
        });
      },
      // 输入框失去焦点时触发
      onBlur(event) {
        this.$emit("blur", event.detail.value);
        this.$uv.sleep(100).then(() => {
          this.focused = false;
        });
        this.$uv.formValidate(this, "blur");
      },
      // 输入框聚焦时触发
      onFocus(event) {
        this.focused = true;
        this.$emit("focus");
      },
      // 点击完成按钮时触发
      onConfirm(event) {
        this.$emit("confirm", this.innerValue);
      },
      // 键盘高度发生变化的时候触发此事件
      // 兼容性：微信小程序2.7.0+、App 3.1.0+
      onkeyboardheightchange(e2) {
        this.$emit("keyboardheightchange", e2);
      },
      // 内容发生变化，进行处理
      valueChange() {
        if (this.isClear)
          this.innerValue = "";
        const value2 = this.innerValue;
        this.$nextTick(() => {
          this.$emit("input", value2);
          this.$emit("update:modelValue", value2);
          this.$emit("change", value2);
          this.$uv.formValidate(this, "change");
        });
      },
      // 点击清除控件
      onClear() {
        this.innerValue = "";
        this.isClear = true;
        this.$uv.sleep(200).then((res) => {
          this.isClear = false;
        });
        this.$nextTick(() => {
          this.$emit("clear");
          this.valueChange();
        });
      },
      /**
       * 在安卓nvue上，事件无法冒泡
       * 在某些时间，我们希望监听uv-from-item的点击事件，此时会导致点击uv-form-item内的uv-input后
       * 无法触发uv-form-item的点击事件，这里通过手动调用uv-form-item的方法进行触发
       */
      clickHandler() {
      }
    }
  };
  function _sfc_render$17(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-input", $options.inputClass]),
        style: vue.normalizeStyle([$options.wrapperStyle])
      },
      [
        vue.createElementVNode("view", { class: "uv-input__content" }, [
          vue.createElementVNode("view", { class: "uv-input__content__prefix-icon" }, [
            vue.renderSlot(_ctx.$slots, "prefix", {}, () => [
              _ctx.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                key: 0,
                name: _ctx.prefixIcon,
                size: "18",
                customStyle: _ctx.prefixIconStyle
              }, null, 8, ["name", "customStyle"])) : vue.createCommentVNode("v-if", true)
            ], true)
          ]),
          vue.createElementVNode("view", {
            class: "uv-input__content__field-wrapper",
            onClick: _cache[5] || (_cache[5] = (...args) => $options.clickHandler && $options.clickHandler(...args))
          }, [
            vue.createCommentVNode(" 根据uni-app的input组件文档，H5和APP中只要声明了password参数(无论true还是false)，type均失效，此时\r\n				为了防止type=number时，又存在password属性，type无效，此时需要设置password为undefined\r\n			 "),
            vue.createElementVNode("input", {
              class: "uv-input__content__field-wrapper__field",
              style: vue.normalizeStyle([$options.inputStyle]),
              type: _ctx.type,
              focus: _ctx.focus,
              cursor: _ctx.cursor,
              value: $data.innerValue,
              "auto-blur": _ctx.autoBlur,
              disabled: _ctx.disabled || _ctx.readonly,
              maxlength: _ctx.maxlength,
              placeholder: _ctx.placeholder,
              "placeholder-style": _ctx.placeholderStyle,
              "placeholder-class": _ctx.placeholderClass,
              "confirm-type": _ctx.confirmType,
              "confirm-hold": _ctx.confirmHold,
              "hold-keyboard": _ctx.holdKeyboard,
              "cursor-spacing": _ctx.cursorSpacing,
              "adjust-position": _ctx.adjustPosition,
              "selection-end": _ctx.selectionEnd,
              "selection-start": _ctx.selectionStart,
              password: _ctx.password || _ctx.type === "password" || void 0,
              ignoreCompositionEvent: _ctx.ignoreCompositionEvent,
              onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
              onFocus: _cache[2] || (_cache[2] = (...args) => $options.onFocus && $options.onFocus(...args)),
              onConfirm: _cache[3] || (_cache[3] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[4] || (_cache[4] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "focus", "cursor", "value", "auto-blur", "disabled", "maxlength", "placeholder", "placeholder-style", "placeholder-class", "confirm-type", "confirm-hold", "hold-keyboard", "cursor-spacing", "adjust-position", "selection-end", "selection-start", "password", "ignoreCompositionEvent"])
          ]),
          $options.isShowClear ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uv-input__content__clear",
            onClick: _cache[6] || (_cache[6] = (...args) => $options.onClear && $options.onClear(...args))
          }, [
            vue.createVNode(_component_uv_icon, {
              name: "close",
              size: "11",
              color: "#ffffff",
              customStyle: "line-height: 12px"
            })
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "uv-input__content__subfix-icon" }, [
            vue.renderSlot(_ctx.$slots, "suffix", {}, () => [
              _ctx.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                key: 0,
                name: _ctx.suffixIcon,
                size: "18",
                customStyle: _ctx.suffixIconStyle
              }, null, 8, ["name", "customStyle"])) : vue.createCommentVNode("v-if", true)
            ], true)
          ])
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$d = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["render", _sfc_render$17], ["__scopeId", "data-v-651602aa"], ["__file", "E:/BankSystem/user/uni_modules/uv-input/components/uv-input/uv-input.vue"]]);
  const props$h = {
    props: {
      // 倒计时总秒数
      seconds: {
        type: [String, Number],
        default: 60
      },
      // 尚未开始时提示
      startText: {
        type: String,
        default: "获取验证码"
      },
      // 正在倒计时中的提示
      changeText: {
        type: String,
        default: "X秒重新获取"
      },
      // 倒计时结束时的提示
      endText: {
        type: String,
        default: "重新获取"
      },
      // 是否在H5刷新或各端返回再进入时继续倒计时
      keepRunning: {
        type: Boolean,
        default: false
      },
      // 为了区分多个页面，或者一个页面多个倒计时组件本地存储的继续倒计时变了
      uniqueKey: {
        type: String,
        default: ""
      },
      ...(_D = (_C = uni.$uv) == null ? void 0 : _C.props) == null ? void 0 : _D.code
    }
  };
  const _sfc_main$17 = {
    name: "uv-code",
    mixins: [mpMixin, mixin, props$h],
    data() {
      return {
        secNum: this.seconds,
        timer: null,
        canGetCode: true
        // 是否可以执行验证码操作
      };
    },
    mounted() {
      this.checkKeepRunning();
    },
    watch: {
      seconds: {
        immediate: true,
        handler(n2) {
          this.secNum = n2;
        }
      }
    },
    methods: {
      checkKeepRunning() {
        let lastTimestamp = Number(uni.getStorageSync(this.uniqueKey + "_$uCountDownTimestamp"));
        if (!lastTimestamp)
          return this.changeEvent(this.startText);
        let nowTimestamp = Math.floor(+/* @__PURE__ */ new Date() / 1e3);
        if (this.keepRunning && lastTimestamp && lastTimestamp > nowTimestamp) {
          this.secNum = lastTimestamp - nowTimestamp;
          uni.removeStorageSync(this.uniqueKey + "_$uCountDownTimestamp");
          this.start();
        } else {
          this.changeEvent(this.startText);
        }
      },
      // 开始倒计时
      start() {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        this.$emit("start");
        this.canGetCode = false;
        this.changeEvent(this.changeText.replace(/x|X/, this.secNum));
        this.timer = setInterval(() => {
          if (--this.secNum) {
            this.changeEvent(this.changeText.replace(/x|X/, this.secNum));
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.changeEvent(this.endText);
            this.secNum = this.seconds;
            this.$emit("end");
            this.canGetCode = true;
          }
        }, 1e3);
        this.setTimeToStorage();
      },
      // 重置，可以让用户再次获取验证码
      reset() {
        this.canGetCode = true;
        clearInterval(this.timer);
        this.secNum = this.seconds;
        this.changeEvent(this.endText);
      },
      changeEvent(text) {
        this.$emit("change", text);
      },
      // 保存时间戳，为了防止倒计时尚未结束，H5刷新或者各端的右上角返回上一页再进来
      setTimeToStorage() {
        if (!this.keepRunning || !this.timer)
          return;
        if (this.secNum > 0 && this.secNum <= this.seconds) {
          let nowTimestamp = Math.floor(+/* @__PURE__ */ new Date() / 1e3);
          uni.setStorage({
            key: this.uniqueKey + "_$uCountDownTimestamp",
            data: nowTimestamp + Number(this.secNum)
          });
        }
      }
    },
    // 组件销毁，兼容vue3
    unmounted() {
      this.setTimeToStorage();
      clearTimeout(this.timer);
      this.timer = null;
    }
  };
  function _sfc_render$16(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-code" }, [
      vue.createCommentVNode(" 此组件功能由js完成，无需写html逻辑 ")
    ]);
  }
  const __easycom_6$1 = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["render", _sfc_render$16], ["__file", "E:/BankSystem/user/uni_modules/uv-code/components/uv-code/uv-code.vue"]]);
  const _sfc_main$16 = {
    data() {
      return {
        model1: {
          phoneNumber: "",
          gcode: "",
          code: ""
        },
        yanzhenma: "",
        tips: "",
        rule1: {}
      };
    },
    mounted() {
      this.generateCaptcha();
    },
    methods: {
      generateRandomString(length) {
        const characters = "0123456789";
        let randomString = "";
        for (let i2 = 0; i2 < length; i2++) {
          randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomString;
      },
      createCaptcha(text) {
        const canvas = uni.createCanvasContext("captchaCanvas", this);
        canvas.setFillStyle("#fff");
        canvas.fillRect(0, 0, 200, 50);
        let fontSize = 40;
        let textWidth = 0;
        while (textWidth < 200 - 40) {
          fontSize += 1;
          canvas.setFontSize(fontSize);
          textWidth = canvas.measureText(text).width;
        }
        fontSize -= 30;
        canvas.setFontSize(fontSize);
        canvas.setFillStyle("#000");
        canvas.setTextAlign("center");
        canvas.setTextBaseline("middle");
        canvas.fillText(text, 80, 20);
        for (let i2 = 0; i2 < 50; i2++) {
          canvas.beginPath();
          canvas.arc(Math.random() * 200, Math.random() * 50, 1, 0, Math.PI * 2);
          canvas.setFillStyle("#000");
          canvas.fill();
        }
        for (let i2 = 0; i2 < 5; i2++) {
          canvas.beginPath();
          canvas.moveTo(Math.random() * 200, Math.random() * 50);
          canvas.lineTo(Math.random() * 200, Math.random() * 50);
          canvas.setStrokeStyle("#000");
          canvas.stroke();
        }
        canvas.draw();
        this.yanzhenma = text;
      },
      generateCaptcha() {
        const captchaText = this.generateRandomString(4);
        this.createCaptcha(captchaText, "captchaCanvas");
      },
      getCode() {
        let that = this;
        if (this.$refs.uCode.canGetCode & this.model1.gcode === this.yanzhenma & this.model1.phoneNumber.length === 11) {
          uni.showLoading({
            title: "正在获取验证码"
          });
          uni.request({
            url: "https://120.55.37.93/sendsms/nologin?phoneNumber=" + this.model1.phoneNumber,
            method: "GET",
            header: {},
            data: {},
            success: function(res) {
            },
            fail: function(error2) {
              formatAppLog("log", "at pages/register/register.vue:128", "获取验证码失败");
            }
          });
          setTimeout(() => {
            uni.hideLoading();
            this.$refs.uCode.start();
          }, 2e3);
        } else {
          uni.showLoading({
            title: "请先输入正确的图形验证码或手机号"
          });
          that.generateCaptcha();
          setTimeout(() => {
            uni.hideLoading();
          }, 1e3);
        }
      },
      codeChange(text) {
        this.tips = text;
      },
      zhuce() {
        let that = this;
        uni.request({
          url: "https://120.55.37.93/register/appAccount",
          method: "POST",
          data: {
            "phoneNumber": that.model1.phoneNumber,
            "verifyCode": that.model1.code
          },
          success: function(res) {
            formatAppLog("log", "at pages/register/register.vue:162", res);
            formatAppLog("log", "at pages/register/register.vue:163", 11);
            uni.setStorageSync("token", res.data.data.token);
            uni.navigateTo({
              url: "/pages/modifyPassword/modifyPassword",
              success: function(res2) {
              }
            });
          },
          fail: function(error2) {
            formatAppLog("log", "at pages/register/register.vue:173", "寄咯");
          }
        });
      }
    },
    onReady() {
      this.$refs.form1.setRules(this.rule1);
    }
  };
  function _sfc_render$15(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0$d);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1$b);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_2$6);
    const _component_uv_code = resolveEasycom(vue.resolveDynamicComponent("uv-code"), __easycom_6$1);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { style: { "margin-top": "200rpx", "margin-left": "30rpx", "font-weight": "bold", "font-size": "160%" } }, [
        vue.createElementVNode("text", null, "你好,")
      ]),
      vue.createElementVNode("view", { style: { "font-weight": "bold", "margin-left": "30rpx", "font-size": "160%" } }, [
        vue.createElementVNode("text", null, "欢迎来到中国银行")
      ]),
      vue.createVNode(_component_uv_form, {
        model: $data.model1,
        rules: $data.rule1,
        ref: "form1",
        style: { "margin-top": "100rpx", "margin-left": "30rpx", "margin-right": "30rpx" }
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_form_item, {
            label: "+86",
            borderBottom: true
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_input, {
                modelValue: $data.model1.phoneNumber,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.model1.phoneNumber = $event),
                border: "none",
                style: { "margin-left": "20rpx", "margin-right": "20rpx", "height": "60rpx" },
                placeholder: "手机号(中国内地)",
                clearable: true
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["model", "rules"]),
      vue.createVNode(_component_uv_form, {
        model: $data.model1,
        rules: $data.rule1,
        ref: "form1",
        style: { "margin-top": "20rpx", "margin-left": "30rpx", "margin-right": "30rpx" }
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_form_item, { borderBottom: true }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_input, {
                modelValue: $data.model1.gcode,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.model1.gcode = $event),
                border: "none",
                style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                placeholder: "验证码",
                clearable: true
              }, null, 8, ["modelValue"]),
              vue.createElementVNode("canvas", {
                onClick: _cache[2] || (_cache[2] = (...args) => $options.generateCaptcha && $options.generateCaptcha(...args)),
                "canvas-id": "captchaCanvas",
                style: { "width": "300rpx", "height": "60rpx", "display": "inline", "margin-right": "20rpx" }
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["model", "rules"]),
      vue.createVNode(_component_uv_form, {
        model: $data.model1,
        rules: $data.rule1,
        ref: "form1",
        style: { "margin-top": "20rpx", "margin-left": "30rpx", "margin-right": "30rpx" }
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_form_item, {
            label: "手机验证码",
            borderBottom: true,
            "label-width": "100"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_input, {
                modelValue: $data.model1.code,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.model1.code = $event),
                border: "none",
                style: { "margin-left": "20rpx", "margin-right": "20rpx", "height": "60rpx" },
                placeholder: "手机验证码",
                clearable: true
              }, null, 8, ["modelValue"]),
              vue.createVNode(_component_uv_code, {
                ref: "uCode",
                onChange: $options.codeChange,
                "keep-running": "",
                "start-text": "获取验证码"
              }, null, 8, ["onChange"]),
              vue.createElementVNode(
                "text",
                {
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.getCode && $options.getCode(...args)),
                  style: { "color": "blue" }
                },
                vue.toDisplayString($data.tips),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["model", "rules"]),
      vue.createElementVNode("view", { style: { "margin-top": "60rpx" } }, [
        vue.createElementVNode("button", {
          style: { "margin-left": "30rpx", "margin-right": "30rpx", "border-radius": "30rpx", "background-color": "red", "color": "white" },
          onClick: _cache[5] || (_cache[5] = (...args) => $options.zhuce && $options.zhuce(...args))
        }, "注册")
      ])
    ]);
  }
  const PagesRegisterRegister = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["render", _sfc_render$15], ["__file", "E:/BankSystem/user/pages/register/register.vue"]]);
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$15 = {
    name: "uni-easyinput",
    emits: ["click", "iconClick", "update:modelValue", "input", "focus", "blur", "confirm", "clear", "eyes", "change", "keyboardheightchange"],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: false
      },
      cursorSpacing: {
        type: Number,
        default: 0
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            backgroundColor: "#fff",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: "",
        isEnter: false
        // 用于判断当前是否是使用回车操作
      };
    },
    computed: {
      // 输入框内是否有值
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      // 处理外层样式的style
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      // input 内容的类和样式处理
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled,
          "is-focused": this.focusShow
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      // input右侧样式
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        this.val = newVal;
      },
      modelValue(newVal) {
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      /**
       * 初始化变量值
       */
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0 || this.modelValue === "") {
          this.val = this.modelValue;
        } else {
          this.val = null;
        }
      },
      /**
       * 点击图标时触发
       * @param {Object} type
       */
      onClickIcon(type2) {
        this.$emit("iconClick", type2);
      },
      /**
       * 显示隐藏内容，密码框时生效
       */
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      /**
       * 输入时触发
       * @param {Object} event
       */
      onInput(event) {
        let value2 = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value2 = this.trimStr(value2);
          }
          if (typeof this.trim === "string") {
            value2 = this.trimStr(value2, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value2;
        this.$emit("input", value2);
        this.$emit("update:modelValue", value2);
      },
      /**
       * 外部调用方法
       * 获取焦点时触发
       * @param {Object} event
       */
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      /**
       * 外部调用方法
       * 失去焦点时触发
       * @param {Object} event
       */
      onBlur() {
        this.focused = false;
        this.$emit("focus", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        if (this.isEnter === false) {
          this.$emit("change", this.val);
        }
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      /**
       * 按下键盘的发送键
       * @param {Object} e
       */
      onConfirm(e2) {
        this.$emit("confirm", this.val);
        this.isEnter = true;
        this.$emit("change", this.val);
        this.$nextTick(() => {
          this.isEnter = false;
        });
      },
      /**
       * 清理内容
       * @param {Object} event
       */
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      /**
       * 键盘高度发生变化的时候触发此事件
       * 兼容性：微信小程序2.7.0+、App 3.1.0+
       * @param {Object} event
       */
      onkeyboardheightchange(event) {
        this.$emit("keyboardheightchange", event);
      },
      /**
       * 去除空格
       */
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$14(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$g);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
        style: vue.normalizeStyle($options.boxStyle)
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
            style: vue.normalizeStyle($options.inputContentStyle)
          },
          [
            $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
              key: 0,
              class: "content-clear-icon",
              type: $props.prefixIcon,
              color: "#c0c4cc",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
              size: "22"
            }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
            $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
              key: 1,
              class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
              name: $props.name,
              value: $data.val,
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              disabled: $props.disabled,
              "placeholder-class": "uni-easyinput__placeholder-class",
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              autoHeight: $props.autoHeight,
              "cursor-spacing": $props.cursorSpacing,
              onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
              onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
              onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight", "cursor-spacing"])) : (vue.openBlock(), vue.createElementBlock("input", {
              key: 2,
              type: $props.type === "password" ? "text" : $props.type,
              class: "uni-easyinput__content-input",
              style: vue.normalizeStyle($options.inputStyle),
              name: $props.name,
              value: $data.val,
              password: !$data.showPassword && $props.type === "password",
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              "placeholder-class": "uni-easyinput__placeholder-class",
              disabled: $props.disabled,
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              confirmType: $props.confirmType,
              "cursor-spacing": $props.cursorSpacing,
              onFocus: _cache[6] || (_cache[6] = (...args) => $options._Focus && $options._Focus(...args)),
              onBlur: _cache[7] || (_cache[7] = (...args) => $options._Blur && $options._Blur(...args)),
              onInput: _cache[8] || (_cache[8] = (...args) => $options.onInput && $options.onInput(...args)),
              onConfirm: _cache[9] || (_cache[9] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[10] || (_cache[10] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing"])),
            $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                vue.createCommentVNode(" 开启密码时显示小眼睛 "),
                $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
                  size: 22,
                  color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onEyes
                }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 4 },
              [
                $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: "content-clear-icon",
                  type: $props.suffixIcon,
                  color: "#c0c4cc",
                  onClick: _cache[11] || (_cache[11] = ($event) => $options.onClickIcon("suffix")),
                  size: "22"
                }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 5 },
              [
                $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: "clear",
                  size: $props.clearSize,
                  color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onClear
                }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$c = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["render", _sfc_render$14], ["__scopeId", "data-v-09fd5285"], ["__file", "E:/BankSystem/user/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$14 = {
    name: "uniFormsItem",
    options: {
      virtualHost: true
    },
    provide() {
      return {
        uniFormItem: this
      };
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      }
    },
    props: {
      // 表单校验规则
      rules: {
        type: Array,
        default() {
          return null;
        }
      },
      // 表单域的属性名，在使用校验规则时必填
      name: {
        type: [String, Array],
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      // label的宽度 ，默认 80
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: ""
      },
      // 强制显示错误信息
      errorMessage: {
        type: [String, Boolean],
        default: ""
      },
      // 1.4.0 弃用，统一使用 form 的校验时机
      // validateTrigger: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 弃用，统一使用 form 的label 位置
      // labelPosition: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 以下属性已经废弃，请使用  #label 插槽代替
      leftIcon: String,
      iconColor: {
        type: String,
        default: "#606266"
      }
    },
    data() {
      return {
        errMsg: "",
        userRules: null,
        localLabelAlign: "left",
        localLabelWidth: "65px",
        localLabelPos: "left",
        border: false,
        isFirstBorder: false
      };
    },
    computed: {
      // 处理错误信息
      msg() {
        return this.errorMessage || this.errMsg;
      }
    },
    watch: {
      // 规则发生变化通知子组件更新
      "form.formRules"(val) {
        this.init();
      },
      "form.labelWidth"(val) {
        this.localLabelWidth = this._labelWidthUnit(val);
      },
      "form.labelPosition"(val) {
        this.localLabelPos = this._labelPosition();
      },
      "form.labelAlign"(val) {
      }
    },
    created() {
      this.init(true);
      if (this.name && this.form) {
        this.$watch(
          () => {
            const val = this.form._getDataValue(this.name, this.form.localData);
            return val;
          },
          (value2, oldVal) => {
            const isEqual2 = this.form._isEqual(value2, oldVal);
            if (!isEqual2) {
              const val = this.itemSetValue(value2);
              this.onFieldChange(val, false);
            }
          },
          {
            immediate: false
          }
        );
      }
    },
    unmounted() {
      this.__isUnmounted = true;
      this.unInit();
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules2 = null) {
        this.userRules = rules2;
        this.init(false);
      },
      // 兼容老版本表单组件
      setValue() {
      },
      /**
       * 外部调用方法
       * 校验数据
       * @param {any} value 需要校验的数据
       * @param {boolean} 是否立即校验
       * @return {Array|null} 校验内容
       */
      async onFieldChange(value2, formtrigger = true) {
        const {
          formData,
          localData,
          errShowType,
          validateCheck,
          validateTrigger,
          _isRequiredField,
          _realName
        } = this.form;
        const name = _realName(this.name);
        if (!value2) {
          value2 = this.form.formData[name];
        }
        const ruleLen = this.itemRules.rules && this.itemRules.rules.length;
        if (!this.validator || !ruleLen || ruleLen === 0)
          return;
        const isRequiredField2 = _isRequiredField(this.itemRules.rules || []);
        let result = null;
        if (validateTrigger === "bind" || formtrigger) {
          result = await this.validator.validateUpdate(
            {
              [name]: value2
            },
            formData
          );
          if (!isRequiredField2 && (value2 === void 0 || value2 === "")) {
            result = null;
          }
          if (result && result.errorMessage) {
            if (errShowType === "undertext") {
              this.errMsg = !result ? "" : result.errorMessage;
            }
            if (errShowType === "toast") {
              uni.showToast({
                title: result.errorMessage || "校验错误",
                icon: "none"
              });
            }
            if (errShowType === "modal") {
              uni.showModal({
                title: "提示",
                content: result.errorMessage || "校验错误"
              });
            }
          } else {
            this.errMsg = "";
          }
          validateCheck(result ? result : null);
        } else {
          this.errMsg = "";
        }
        return result ? result : null;
      },
      /**
       * 初始组件数据
       */
      init(type2 = false) {
        const {
          validator,
          formRules,
          childrens,
          formData,
          localData,
          _realName,
          labelWidth,
          _getDataValue,
          _setDataValue
        } = this.form || {};
        this.localLabelAlign = this._justifyContent();
        this.localLabelWidth = this._labelWidthUnit(labelWidth);
        this.localLabelPos = this._labelPosition();
        this.form && type2 && childrens.push(this);
        if (!validator || !formRules)
          return;
        if (!this.form.isFirstBorder) {
          this.form.isFirstBorder = true;
          this.isFirstBorder = true;
        }
        if (this.group) {
          if (!this.group.isFirstBorder) {
            this.group.isFirstBorder = true;
            this.isFirstBorder = true;
          }
        }
        this.border = this.form.border;
        const name = _realName(this.name);
        const itemRule = this.userRules || this.rules;
        if (typeof formRules === "object" && itemRule) {
          formRules[name] = {
            rules: itemRule
          };
          validator.updateSchema(formRules);
        }
        const itemRules = formRules[name] || {};
        this.itemRules = itemRules;
        this.validator = validator;
        this.itemSetValue(_getDataValue(this.name, localData));
      },
      unInit() {
        if (this.form) {
          const {
            childrens,
            formData,
            _realName
          } = this.form;
          childrens.forEach((item, index2) => {
            if (item === this) {
              this.form.childrens.splice(index2, 1);
              delete formData[_realName(item.name)];
            }
          });
        }
      },
      // 设置item 的值
      itemSetValue(value2) {
        const name = this.form._realName(this.name);
        const rules2 = this.itemRules.rules || [];
        const val = this.form._getValue(name, value2, rules2);
        this.form._setDataValue(name, this.form.formData, val);
        return val;
      },
      /**
       * 移除该表单项的校验结果
       */
      clearValidate() {
        this.errMsg = "";
      },
      // 是否显示星号
      _isRequired() {
        return this.required;
      },
      // 处理对齐方式
      _justifyContent() {
        if (this.form) {
          const {
            labelAlign
          } = this.form;
          let labelAli = this.labelAlign ? this.labelAlign : labelAlign;
          if (labelAli === "left")
            return "flex-start";
          if (labelAli === "center")
            return "center";
          if (labelAli === "right")
            return "flex-end";
        }
        return "flex-start";
      },
      // 处理 label宽度单位 ,继承父元素的值
      _labelWidthUnit(labelWidth) {
        return this.num2px(this.labelWidth ? this.labelWidth : labelWidth || (this.label ? 65 : "auto"));
      },
      // 处理 label 位置
      _labelPosition() {
        if (this.form)
          return this.form.labelPosition || "left";
        return "left";
      },
      /**
       * 触发时机
       * @param {Object} rule 当前规则内时机
       * @param {Object} itemRlue 当前组件时机
       * @param {Object} parentRule 父组件时机
       */
      isTrigger(rule, itemRlue, parentRule) {
        if (rule === "submit" || !rule) {
          if (rule === void 0) {
            if (itemRlue !== "bind") {
              if (!itemRlue) {
                return parentRule === "" ? "bind" : "submit";
              }
              return "submit";
            }
            return "bind";
          }
          return "submit";
        }
        return "bind";
      },
      num2px(num) {
        if (typeof num === "number") {
          return `${num}px`;
        }
        return num;
      }
    }
  };
  function _sfc_render$13(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-forms-item", ["is-direction-" + $data.localLabelPos, $data.border ? "uni-forms-item--border" : "", $data.border && $data.isFirstBorder ? "is-first-border" : ""]])
      },
      [
        vue.renderSlot(_ctx.$slots, "label", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__label", { "no-label": !$props.label && !$props.required }]),
              style: vue.normalizeStyle({ width: $data.localLabelWidth, justifyContent: $data.localLabelAlign })
            },
            [
              $props.required ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "is-required"
              }, "*")) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($props.label),
                1
                /* TEXT */
              )
            ],
            6
            /* CLASS, STYLE */
          )
        ], true),
        vue.createElementVNode("view", { class: "uni-forms-item__content" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__error", { "msg--active": $options.msg }])
            },
            [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($options.msg),
                1
                /* TEXT */
              )
            ],
            2
            /* CLASS */
          )
        ])
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1$7 = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["render", _sfc_render$13], ["__scopeId", "data-v-462874dd"], ["__file", "E:/BankSystem/user/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue"]]);
  var pattern = {
    email: /^\S+?@\S+?\.\S+?$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    )
  };
  const FORMAT_MAPPING = {
    "int": "integer",
    "bool": "boolean",
    "double": "number",
    "long": "number",
    "password": "string"
    // "fileurls": 'array'
  };
  function formatMessage(args, resources = "") {
    var defaultMessage = ["label"];
    defaultMessage.forEach((item) => {
      if (args[item] === void 0) {
        args[item] = "";
      }
    });
    let str = resources;
    for (let key in args) {
      let reg = new RegExp("{" + key + "}");
      str = str.replace(reg, args[key]);
    }
    return str;
  }
  function isEmptyValue(value2, type2) {
    if (value2 === void 0 || value2 === null) {
      return true;
    }
    if (typeof value2 === "string" && !value2) {
      return true;
    }
    if (Array.isArray(value2) && !value2.length) {
      return true;
    }
    if (type2 === "object" && !Object.keys(value2).length) {
      return true;
    }
    return false;
  }
  const types = {
    integer(value2) {
      return types.number(value2) && parseInt(value2, 10) === value2;
    },
    string(value2) {
      return typeof value2 === "string";
    },
    number(value2) {
      if (isNaN(value2)) {
        return false;
      }
      return typeof value2 === "number";
    },
    "boolean": function(value2) {
      return typeof value2 === "boolean";
    },
    "float": function(value2) {
      return types.number(value2) && !types.integer(value2);
    },
    array(value2) {
      return Array.isArray(value2);
    },
    object(value2) {
      return typeof value2 === "object" && !types.array(value2);
    },
    date(value2) {
      return value2 instanceof Date;
    },
    timestamp(value2) {
      if (!this.integer(value2) || Math.abs(value2).toString().length > 16) {
        return false;
      }
      return true;
    },
    file(value2) {
      return typeof value2.url === "string";
    },
    email(value2) {
      return typeof value2 === "string" && !!value2.match(pattern.email) && value2.length < 255;
    },
    url(value2) {
      return typeof value2 === "string" && !!value2.match(pattern.url);
    },
    pattern(reg, value2) {
      try {
        return new RegExp(reg).test(value2);
      } catch (e2) {
        return false;
      }
    },
    method(value2) {
      return typeof value2 === "function";
    },
    idcard(value2) {
      return typeof value2 === "string" && !!value2.match(pattern.idcard);
    },
    "url-https"(value2) {
      return this.url(value2) && value2.startsWith("https://");
    },
    "url-scheme"(value2) {
      return value2.startsWith("://");
    },
    "url-web"(value2) {
      return false;
    }
  };
  class RuleValidator {
    constructor(message) {
      this._message = message;
    }
    async validateRule(fieldKey, fieldValue, value2, data, allData) {
      var result = null;
      let rules2 = fieldValue.rules;
      let hasRequired = rules2.findIndex((item) => {
        return item.required;
      });
      if (hasRequired < 0) {
        if (value2 === null || value2 === void 0) {
          return result;
        }
        if (typeof value2 === "string" && !value2.length) {
          return result;
        }
      }
      var message = this._message;
      if (rules2 === void 0) {
        return message["default"];
      }
      for (var i2 = 0; i2 < rules2.length; i2++) {
        let rule = rules2[i2];
        let vt = this._getValidateType(rule);
        Object.assign(rule, {
          label: fieldValue.label || `["${fieldKey}"]`
        });
        if (RuleValidatorHelper[vt]) {
          result = RuleValidatorHelper[vt](rule, value2, message);
          if (result != null) {
            break;
          }
        }
        if (rule.validateExpr) {
          let now = Date.now();
          let resultExpr = rule.validateExpr(value2, allData, now);
          if (resultExpr === false) {
            result = this._getMessage(rule, rule.errorMessage || this._message["default"]);
            break;
          }
        }
        if (rule.validateFunction) {
          result = await this.validateFunction(rule, value2, data, allData, vt);
          if (result !== null) {
            break;
          }
        }
      }
      if (result !== null) {
        result = message.TAG + result;
      }
      return result;
    }
    async validateFunction(rule, value2, data, allData, vt) {
      let result = null;
      try {
        let callbackMessage = null;
        const res = await rule.validateFunction(rule, value2, allData || data, (message) => {
          callbackMessage = message;
        });
        if (callbackMessage || typeof res === "string" && res || res === false) {
          result = this._getMessage(rule, callbackMessage || res, vt);
        }
      } catch (e2) {
        result = this._getMessage(rule, e2.message, vt);
      }
      return result;
    }
    _getMessage(rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message["default"]);
    }
    _getValidateType(rule) {
      var result = "";
      if (rule.required) {
        result = "required";
      } else if (rule.format) {
        result = "format";
      } else if (rule.arrayType) {
        result = "arrayTypeFormat";
      } else if (rule.range) {
        result = "range";
      } else if (rule.maximum !== void 0 || rule.minimum !== void 0) {
        result = "rangeNumber";
      } else if (rule.maxLength !== void 0 || rule.minLength !== void 0) {
        result = "rangeLength";
      } else if (rule.pattern) {
        result = "pattern";
      } else if (rule.validateFunction) {
        result = "validateFunction";
      }
      return result;
    }
  }
  const RuleValidatorHelper = {
    required(rule, value2, message) {
      if (rule.required && isEmptyValue(value2, rule.format || typeof value2)) {
        return formatMessage(rule, rule.errorMessage || message.required);
      }
      return null;
    },
    range(rule, value2, message) {
      const {
        range: range2,
        errorMessage
      } = rule;
      let list = new Array(range2.length);
      for (let i2 = 0; i2 < range2.length; i2++) {
        const item = range2[i2];
        if (types.object(item) && item.value !== void 0) {
          list[i2] = item.value;
        } else {
          list[i2] = item;
        }
      }
      let result = false;
      if (Array.isArray(value2)) {
        result = new Set(value2.concat(list)).size === list.length;
      } else {
        if (list.indexOf(value2) > -1) {
          result = true;
        }
      }
      if (!result) {
        return formatMessage(rule, errorMessage || message["enum"]);
      }
      return null;
    },
    rangeNumber(rule, value2, message) {
      if (!types.number(value2)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let {
        minimum,
        maximum,
        exclusiveMinimum,
        exclusiveMaximum
      } = rule;
      let min = exclusiveMinimum ? value2 <= minimum : value2 < minimum;
      let max = exclusiveMaximum ? value2 >= maximum : value2 > maximum;
      if (minimum !== void 0 && min) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMinimum ? "exclusiveMinimum" : "minimum"]);
      } else if (maximum !== void 0 && max) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMaximum ? "exclusiveMaximum" : "maximum"]);
      } else if (minimum !== void 0 && maximum !== void 0 && (min || max)) {
        return formatMessage(rule, rule.errorMessage || message["number"].range);
      }
      return null;
    },
    rangeLength(rule, value2, message) {
      if (!types.string(value2) && !types.array(value2)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let min = rule.minLength;
      let max = rule.maxLength;
      let val = value2.length;
      if (min !== void 0 && val < min) {
        return formatMessage(rule, rule.errorMessage || message["length"].minLength);
      } else if (max !== void 0 && val > max) {
        return formatMessage(rule, rule.errorMessage || message["length"].maxLength);
      } else if (min !== void 0 && max !== void 0 && (val < min || val > max)) {
        return formatMessage(rule, rule.errorMessage || message["length"].range);
      }
      return null;
    },
    pattern(rule, value2, message) {
      if (!types["pattern"](rule.pattern, value2)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      return null;
    },
    format(rule, value2, message) {
      var customTypes = Object.keys(types);
      var format2 = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;
      if (customTypes.indexOf(format2) > -1) {
        if (!types[format2](value2)) {
          return formatMessage(rule, rule.errorMessage || message.typeError);
        }
      }
      return null;
    },
    arrayTypeFormat(rule, value2, message) {
      if (!Array.isArray(value2)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
      for (let i2 = 0; i2 < value2.length; i2++) {
        const element = value2[i2];
        let formatResult = this.format(rule, element, message);
        if (formatResult !== null) {
          return formatResult;
        }
      }
      return null;
    }
  };
  class SchemaValidator extends RuleValidator {
    constructor(schema, options) {
      super(SchemaValidator.message);
      this._schema = schema;
      this._options = options || null;
    }
    updateSchema(schema) {
      this._schema = schema;
    }
    async validate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async validateAll(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, true, allData);
      }
      return result;
    }
    async validateUpdate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidateUpdate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async invokeValidate(data, all, allData) {
      let result = [];
      let schema = this._schema;
      for (let key in schema) {
        let value2 = schema[key];
        let errorMessage = await this.validateRule(key, value2, data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    async invokeValidateUpdate(data, all, allData) {
      let result = [];
      for (let key in data) {
        let errorMessage = await this.validateRule(key, this._schema[key], data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    _checkFieldInSchema(data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return "";
      }
      var noExistFields = keys.filter((key) => {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields)
      }, SchemaValidator.message.TAG + SchemaValidator.message["defaultInvalid"]);
      return [{
        key: "invalid",
        errorMessage
      }];
    }
  }
  function Message() {
    return {
      TAG: "",
      default: "验证错误",
      defaultInvalid: "提交的字段{field}在数据库中并不存在",
      validateFunction: "验证无效",
      required: "{label}必填",
      "enum": "{label}超出范围",
      timestamp: "{label}格式无效",
      whitespace: "{label}不能为空",
      typeError: "{label}类型无效",
      date: {
        format: "{label}日期{value}格式无效",
        parse: "{label}日期无法解析,{value}无效",
        invalid: "{label}日期{value}无效"
      },
      length: {
        minLength: "{label}长度不能少于{minLength}",
        maxLength: "{label}长度不能超过{maxLength}",
        range: "{label}必须介于{minLength}和{maxLength}之间"
      },
      number: {
        minimum: "{label}不能小于{minimum}",
        maximum: "{label}不能大于{maximum}",
        exclusiveMinimum: "{label}不能小于等于{minimum}",
        exclusiveMaximum: "{label}不能大于等于{maximum}",
        range: "{label}必须介于{minimum}and{maximum}之间"
      },
      pattern: {
        mismatch: "{label}格式不匹配"
      }
    };
  }
  SchemaValidator.message = new Message();
  const deepCopy = (val) => {
    return JSON.parse(JSON.stringify(val));
  };
  const typeFilter = (format2) => {
    return format2 === "int" || format2 === "double" || format2 === "number" || format2 === "timestamp";
  };
  const getValue = (key, value2, rules2) => {
    const isRuleNumType = rules2.find((val) => val.format && typeFilter(val.format));
    const isRuleBoolType = rules2.find((val) => val.format && val.format === "boolean" || val.format === "bool");
    if (!!isRuleNumType) {
      if (!value2 && value2 !== 0) {
        value2 = null;
      } else {
        value2 = isNumber(Number(value2)) ? Number(value2) : value2;
      }
    }
    if (!!isRuleBoolType) {
      value2 = isBoolean(value2) ? value2 : false;
    }
    return value2;
  };
  const setDataValue = (field, formdata, value2) => {
    formdata[field] = value2;
    return value2 || "";
  };
  const getDataValue = (field, data) => {
    return objGet(data, field);
  };
  const realName = (name, data = {}) => {
    const base_name = _basePath(name);
    if (typeof base_name === "object" && Array.isArray(base_name) && base_name.length > 1) {
      const realname = base_name.reduce((a2, b2) => a2 += `#${b2}`, "_formdata_");
      return realname;
    }
    return base_name[0] || name;
  };
  const isRealName = (name) => {
    const reg = /^_formdata_#*/;
    return reg.test(name);
  };
  const rawData = (object2 = {}, name) => {
    let newData = JSON.parse(JSON.stringify(object2));
    let formData = {};
    for (let i2 in newData) {
      let path = name2arr(i2);
      objSet(formData, path, newData[i2]);
    }
    return formData;
  };
  const name2arr = (name) => {
    let field = name.replace("_formdata_#", "");
    field = field.split("#").map((v2) => isNumber(v2) ? Number(v2) : v2);
    return field;
  };
  const objSet = (object2, path, value2) => {
    if (typeof object2 !== "object")
      return object2;
    _basePath(path).reduce((o2, k, i2, _) => {
      if (i2 === _.length - 1) {
        o2[k] = value2;
        return null;
      } else if (k in o2) {
        return o2[k];
      } else {
        o2[k] = /^[0-9]{1,}$/.test(_[i2 + 1]) ? [] : {};
        return o2[k];
      }
    }, object2);
    return object2;
  };
  function _basePath(path) {
    if (Array.isArray(path))
      return path;
    return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  }
  const objGet = (object2, path, defaultVal = "undefined") => {
    let newPath = _basePath(path);
    let val = newPath.reduce((o2, k) => {
      return (o2 || {})[k];
    }, object2);
    return !val || val !== void 0 ? val : defaultVal;
  };
  const isNumber = (num) => {
    return !isNaN(Number(num));
  };
  const isBoolean = (bool) => {
    return typeof bool === "boolean";
  };
  const isRequiredField = (rules2) => {
    let isNoField = false;
    for (let i2 = 0; i2 < rules2.length; i2++) {
      const ruleData = rules2[i2];
      if (ruleData.required) {
        isNoField = true;
        break;
      }
    }
    return isNoField;
  };
  const isEqual = (a2, b2) => {
    if (a2 === b2) {
      return a2 !== 0 || 1 / a2 === 1 / b2;
    }
    if (a2 == null || b2 == null) {
      return a2 === b2;
    }
    var classNameA = toString.call(a2), classNameB = toString.call(b2);
    if (classNameA !== classNameB) {
      return false;
    }
    switch (classNameA) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a2 === "" + b2;
      case "[object Number]":
        if (+a2 !== +a2) {
          return +b2 !== +b2;
        }
        return +a2 === 0 ? 1 / +a2 === 1 / b2 : +a2 === +b2;
      case "[object Date]":
      case "[object Boolean]":
        return +a2 === +b2;
    }
    if (classNameA == "[object Object]") {
      var propsA = Object.getOwnPropertyNames(a2), propsB = Object.getOwnPropertyNames(b2);
      if (propsA.length != propsB.length) {
        return false;
      }
      for (var i2 = 0; i2 < propsA.length; i2++) {
        var propName = propsA[i2];
        if (a2[propName] !== b2[propName]) {
          return false;
        }
      }
      return true;
    }
    if (classNameA == "[object Array]") {
      if (a2.toString() == b2.toString()) {
        return true;
      }
      return false;
    }
  };
  const _sfc_main$13 = {
    name: "uniForms",
    emits: ["validate", "submit"],
    options: {
      virtualHost: true
    },
    props: {
      // 即将弃用
      value: {
        type: Object,
        default() {
          return null;
        }
      },
      // vue3 替换 value 属性
      modelValue: {
        type: Object,
        default() {
          return null;
        }
      },
      // 1.4.0 开始将不支持 v-model ，且废弃 value 和 modelValue
      model: {
        type: Object,
        default() {
          return null;
        }
      },
      // 表单校验规则
      rules: {
        type: Object,
        default() {
          return {};
        }
      },
      //校验错误信息提示方式 默认 undertext 取值 [undertext|toast|modal]
      errShowType: {
        type: String,
        default: "undertext"
      },
      // 校验触发器方式 默认 bind 取值 [bind|submit]
      validateTrigger: {
        type: String,
        default: "submit"
      },
      // label 位置，默认 left 取值  top/left
      labelPosition: {
        type: String,
        default: "left"
      },
      // label 宽度
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: "left"
      },
      border: {
        type: Boolean,
        default: false
      }
    },
    provide() {
      return {
        uniForm: this
      };
    },
    data() {
      return {
        // 表单本地值的记录，不应该与传如的值进行关联
        formData: {},
        formRules: {}
      };
    },
    computed: {
      // 计算数据源变化的
      localData() {
        const localVal = this.model || this.modelValue || this.value;
        if (localVal) {
          return deepCopy(localVal);
        }
        return {};
      }
    },
    watch: {
      // 监听数据变化 ,暂时不使用，需要单独赋值
      // localData: {},
      // 监听规则变化
      rules: {
        handler: function(val, oldVal) {
          this.setRules(val);
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      let getbinddata = getApp().$vm.$.appContext.config.globalProperties.binddata;
      if (!getbinddata) {
        getApp().$vm.$.appContext.config.globalProperties.binddata = function(name, value2, formName) {
          if (formName) {
            this.$refs[formName].setValue(name, value2);
          } else {
            let formVm;
            for (let i2 in this.$refs) {
              const vm = this.$refs[i2];
              if (vm && vm.$options && vm.$options.name === "uniForms") {
                formVm = vm;
                break;
              }
            }
            if (!formVm)
              return formatAppLog("error", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:182", "当前 uni-froms 组件缺少 ref 属性");
            formVm.setValue(name, value2);
          }
        };
      }
      this.childrens = [];
      this.inputChildrens = [];
      this.setRules(this.rules);
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules2) {
        this.formRules = Object.assign({}, this.formRules, rules2);
        this.validator = new SchemaValidator(rules2);
      },
      /**
       * 外部调用方法
       * 设置数据，用于设置表单数据，公开给用户使用 ， 不支持在动态表单中使用
       * @param {Object} key
       * @param {Object} value
       */
      setValue(key, value2) {
        let example = this.childrens.find((child) => child.name === key);
        if (!example)
          return null;
        this.formData[key] = getValue(key, value2, this.formRules[key] && this.formRules[key].rules || []);
        return example.onFieldChange(this.formData[key]);
      },
      /**
       * 外部调用方法
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      validate(keepitem, callback) {
        return this.checkAll(this.formData, keepitem, callback);
      },
      /**
       * 外部调用方法
       * 部分表单校验
       * @param {Array|String} props 需要校验的字段
       * @param {Function} 回调函数
       */
      validateField(props2 = [], callback) {
        props2 = [].concat(props2);
        let invalidFields = {};
        this.childrens.forEach((item) => {
          const name = realName(item.name);
          if (props2.indexOf(name) !== -1) {
            invalidFields = Object.assign({}, invalidFields, {
              [name]: this.formData[name]
            });
          }
        });
        return this.checkAll(invalidFields, [], callback);
      },
      /**
       * 外部调用方法
       * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
       * @param {Array|String} props 需要移除校验的字段 ，不填为所有
       */
      clearValidate(props2 = []) {
        props2 = [].concat(props2);
        this.childrens.forEach((item) => {
          if (props2.length === 0) {
            item.errMsg = "";
          } else {
            const name = realName(item.name);
            if (props2.indexOf(name) !== -1) {
              item.errMsg = "";
            }
          }
        });
      },
      /**
       * 外部调用方法 ，即将废弃
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      submit(keepitem, callback, type2) {
        for (let i2 in this.dataValue) {
          const itemData = this.childrens.find((v2) => v2.name === i2);
          if (itemData) {
            if (this.formData[i2] === void 0) {
              this.formData[i2] = this._getValue(i2, this.dataValue[i2]);
            }
          }
        }
        if (!type2) {
          formatAppLog("warn", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:289", "submit 方法即将废弃，请使用validate方法代替！");
        }
        return this.checkAll(this.formData, keepitem, callback, "submit");
      },
      // 校验所有
      async checkAll(invalidFields, keepitem, callback, type2) {
        if (!this.validator)
          return;
        let childrens = [];
        for (let i2 in invalidFields) {
          const item = this.childrens.find((v2) => realName(v2.name) === i2);
          if (item) {
            childrens.push(item);
          }
        }
        if (!callback && typeof keepitem === "function") {
          callback = keepitem;
        }
        let promise2;
        if (!callback && typeof callback !== "function" && Promise) {
          promise2 = new Promise((resolve, reject) => {
            callback = function(valid, invalidFields2) {
              !valid ? resolve(invalidFields2) : reject(valid);
            };
          });
        }
        let results = [];
        let tempFormData = JSON.parse(JSON.stringify(invalidFields));
        for (let i2 in childrens) {
          const child = childrens[i2];
          let name = realName(child.name);
          const result = await child.onFieldChange(tempFormData[name]);
          if (result) {
            results.push(result);
            if (this.errShowType === "toast" || this.errShowType === "modal")
              break;
          }
        }
        if (Array.isArray(results)) {
          if (results.length === 0)
            results = null;
        }
        if (Array.isArray(keepitem)) {
          keepitem.forEach((v2) => {
            let vName = realName(v2);
            let value2 = getDataValue(v2, this.localData);
            if (value2 !== void 0) {
              tempFormData[vName] = value2;
            }
          });
        }
        if (type2 === "submit") {
          this.$emit("submit", {
            detail: {
              value: tempFormData,
              errors: results
            }
          });
        } else {
          this.$emit("validate", results);
        }
        let resetFormData = {};
        resetFormData = rawData(tempFormData, this.name);
        callback && typeof callback === "function" && callback(results, resetFormData);
        if (promise2 && callback) {
          return promise2;
        } else {
          return null;
        }
      },
      /**
       * 返回validate事件
       * @param {Object} result
       */
      validateCheck(result) {
        this.$emit("validate", result);
      },
      _getValue: getValue,
      _isRequiredField: isRequiredField,
      _setDataValue: setDataValue,
      _getDataValue: getDataValue,
      _realName: realName,
      _isRealName: isRealName,
      _isEqual: isEqual
    }
  };
  function _sfc_render$12(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-forms" }, [
      vue.createElementVNode("form", null, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  const __easycom_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["render", _sfc_render$12], ["__scopeId", "data-v-9a1e3c32"], ["__file", "E:/BankSystem/user/uni_modules/uni-forms/components/uni-forms/uni-forms.vue"]]);
  const _sfc_main$12 = {
    name: "UniSection",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      title: {
        type: String,
        required: true,
        default: ""
      },
      titleFontSize: {
        type: String,
        default: "14px"
      },
      titleColor: {
        type: String,
        default: "#333"
      },
      subTitle: {
        type: String,
        default: ""
      },
      subTitleFontSize: {
        type: String,
        default: "12px"
      },
      subTitleColor: {
        type: String,
        default: "#999"
      },
      padding: {
        type: [Boolean, String],
        default: false
      }
    },
    computed: {
      _padding() {
        if (typeof this.padding === "string") {
          return this.padding;
        }
        return this.padding ? "10px" : "";
      }
    },
    watch: {
      title(newVal) {
        if (uni.report && newVal !== "") {
          uni.report("title", newVal);
        }
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$11(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-section" }, [
      vue.createElementVNode("view", {
        class: "uni-section-header",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
      }, [
        $props.type ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uni-section-header__decoration", $props.type])
          },
          null,
          2
          /* CLASS */
        )) : vue.renderSlot(_ctx.$slots, "decoration", { key: 1 }, void 0, true),
        vue.createElementVNode("view", { class: "uni-section-header__content" }, [
          vue.createElementVNode(
            "text",
            {
              style: vue.normalizeStyle({ "font-size": $props.titleFontSize, "color": $props.titleColor }),
              class: vue.normalizeClass(["uni-section__content-title", { "distraction": !$props.subTitle }])
            },
            vue.toDisplayString($props.title),
            7
            /* TEXT, CLASS, STYLE */
          ),
          $props.subTitle ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 0,
              style: vue.normalizeStyle({ "font-size": $props.subTitleFontSize, "color": $props.subTitleColor }),
              class: "uni-section-header__content-sub"
            },
            vue.toDisplayString($props.subTitle),
            5
            /* TEXT, STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", { class: "uni-section-header__slot-right" }, [
          vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
        ])
      ]),
      vue.createElementVNode(
        "view",
        {
          class: "uni-section-content",
          style: vue.normalizeStyle({ padding: $options._padding })
        },
        [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const __easycom_3$2 = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["render", _sfc_render$11], ["__scopeId", "data-v-637fd36b"], ["__file", "E:/BankSystem/user/uni_modules/uni-section/components/uni-section/uni-section.vue"]]);
  const _sfc_main$11 = {
    data() {
      return {
        balance: "",
        cardNumber: "",
        cardId: "",
        that: "",
        balance2: "",
        // 自定义表单数据
        customFormData: {
          money: "",
          name: "",
          moneyid: "",
          write: ""
        },
        // 自定义表单校验规则
        customRules: {
          money: {
            rules: [{
              required: true,
              errorMessage: "转账金额不能为空"
            }, {
              format: "number",
              errorMessage: "请输入数字"
            }]
          },
          name: {
            rules: [{
              required: true,
              errorMessage: "收款人姓名不能为空"
            }, {
              format: "string",
              errorMessage: "请输入正确的姓名"
            }]
          },
          moneyid: {
            rules: [
              {
                required: true,
                errorMessage: "收款账号不能为空"
              },
              {
                format: "string",
                errorMessage: "请输入正确的收款账号"
              }
            ]
          },
          write: {
            rules: [{
              required: false,
              errorMessage: ""
            }]
          }
        }
      };
    },
    methods: {
      choose() {
        uni.navigateTo({
          url: "/pages/transferCloose/transferCloose"
        });
      },
      allIn() {
        this.customFormData.money = this.balance;
      },
      onClickItem(e2) {
        formatAppLog("log", "at pages/transfer/transfer.vue:99", e2);
        this.current = e2.currentIndex;
      },
      del(id) {
        let index2 = this.dynamicLists.findIndex((v2) => v2.id === id);
        this.dynamicLists.splice(index2, 1);
      },
      submit(ref) {
        this.$refs[ref].validate().then((res) => {
          formatAppLog("log", "at pages/transfer/transfer.vue:109", "success", res);
          let transferData = {
            Amount: res.money,
            receiverName: res.name,
            receiverCardNumber: res.moneyid,
            postscript: res.write
          };
          uni.setStorageSync("transfer", transferData);
          const temp = uni.getStorageSync("transfer");
          formatAppLog("log", "at pages/transfer/transfer.vue:123", res.money);
          formatAppLog("log", "at pages/transfer/transfer.vue:124", temp);
          uni.navigateTo({
            url: "/pages/transferConfirm/transferConfirm"
          });
        }).catch((err) => {
          formatAppLog("log", "at pages/transfer/transfer.vue:133", "err", err);
        });
      }
    },
    onLoad() {
      let balance;
      let cardNumber;
      const cardId = uni.getStorageSync("tranferCardId");
      formatAppLog("log", "at pages/transfer/transfer.vue:142");
      let that = this;
      uni.request({
        url: "https://120.55.37.93/query/singleCard?cardId=" + cardId,
        header: {
          "token": uni.getStorageSync("token")
        },
        success: (res) => {
          balance = res.data.data.balance;
          cardNumber = res.data.data.cardNumber;
          that.balance = balance;
          that.cardNumber = cardNumber;
          uni.setStorageSync("transferNumberOut", this.cardNumber);
          formatAppLog("log", "at pages/transfer/transfer.vue:157", this.cardNumber);
          let value2 = that.balance.toFixed(2);
          that.balance2 = value2;
        }
      });
    }
  };
  function _sfc_render$10(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$c);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$7);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_2$3);
    const _component_uni_section = resolveEasycom(vue.resolveDynamicComponent("uni-section"), __easycom_3$2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode(
        "text",
        {
          class: "transferNumber",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.choose && $options.choose(...args))
        },
        "付款账户：" + vue.toDisplayString($data.cardNumber),
        1
        /* TEXT */
      ),
      vue.createVNode(_component_uni_section, { title: "" }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-end" } }, [
            vue.createElementVNode(
              "text",
              { class: "balance" },
              "可用余额：" + vue.toDisplayString($data.balance2),
              1
              /* TEXT */
            ),
            vue.createElementVNode("button", {
              class: "mini-button",
              type: "warn",
              size: "mini",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.allIn && $options.allIn(...args))
            }, "全部转出")
          ]),
          vue.createElementVNode("view", { class: "example" }, [
            vue.createCommentVNode(" 自定义表单校验 "),
            vue.createVNode(_component_uni_forms, {
              ref: "customForm",
              rules: $data.customRules,
              modelValue: $data.customFormData
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_forms_item, {
                  label: "转账金额",
                  required: "",
                  name: "money",
                  "label-width": "40"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $data.customFormData.money,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.customFormData.money = $event),
                      style: { "margin-left": "29rpx", "width": "510rpx" },
                      placeholder: "请输入转账金额"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_forms_item, {
                  label: "收款人姓名",
                  required: "",
                  name: "name",
                  "label-width": "40"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $data.customFormData.name,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.customFormData.name = $event),
                      placeholder: "请输入收款人姓名"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_forms_item, {
                  label: "收款账号",
                  required: "",
                  name: "moneyid",
                  "label-width": "40"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $data.customFormData.moneyid,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.customFormData.moneyid = $event),
                      style: { "margin-left": "29rpx", "width": "510rpx" },
                      placeholder: "请输入收款账号"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_forms_item, {
                  label: "附言",
                  name: "write",
                  "label-width": "40",
                  style: { "margin-left": "14rpx" }
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: $data.customFormData.write,
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.customFormData.write = $event),
                      style: { "margin-left": "85rpx", "width": "510rpx" },
                      placeholder: "请输入附言"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }, 8, ["rules", "modelValue"]),
            vue.createElementVNode("button", {
              class: "next",
              type: "warn",
              onClick: _cache[6] || (_cache[6] = ($event) => $options.submit("customForm"))
            }, "提交")
          ])
        ]),
        _: 1
        /* STABLE */
      })
    ]);
  }
  const PagesTransferTransfer = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["render", _sfc_render$10], ["__file", "E:/BankSystem/user/pages/transfer/transfer.vue"]]);
  const props$g = {
    props: {
      // 是否虚线
      dashed: {
        type: Boolean,
        default: false
      },
      // 是否细线
      hairline: {
        type: Boolean,
        default: true
      },
      // 是否以点替代文字，优先于text字段起作用
      dot: {
        type: Boolean,
        default: false
      },
      // 内容文本的位置，left-左边，center-中间，right-右边
      textPosition: {
        type: String,
        default: "center"
      },
      // 文本内容
      text: {
        type: [String, Number],
        default: ""
      },
      // 文本大小
      textSize: {
        type: [String, Number],
        default: 14
      },
      // 文本颜色
      textColor: {
        type: String,
        default: "#909399"
      },
      // 线条颜色
      lineColor: {
        type: String,
        default: "#dcdfe6"
      },
      ...(_F = (_E = uni.$uv) == null ? void 0 : _E.props) == null ? void 0 : _F.divider
    }
  };
  const _sfc_main$10 = {
    name: "uv-divider",
    mixins: [mpMixin, mixin, props$g],
    emits: ["click"],
    computed: {
      textStyle() {
        const style = {};
        style.fontSize = this.$uv.addUnit(this.textSize);
        style.color = this.textColor;
        return style;
      },
      // 左边线条的的样式
      leftLineStyle() {
        const style = {};
        if (this.textPosition === "left") {
          style.width = "80rpx";
        } else {
          style.flex = 1;
        }
        return style;
      },
      // 右边线条的的样式
      rightLineStyle() {
        const style = {};
        if (this.textPosition === "right") {
          style.width = "80rpx";
        } else {
          style.flex = 1;
        }
        return style;
      }
    },
    methods: {
      // divider组件被点击时触发
      click() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$$(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_4$2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-divider",
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args))
      },
      [
        vue.createVNode(_component_uv_line, {
          color: _ctx.lineColor,
          customStyle: $options.leftLineStyle,
          hairline: _ctx.hairline,
          dashed: _ctx.dashed
        }, null, 8, ["color", "customStyle", "hairline", "dashed"]),
        _ctx.dot ? (vue.openBlock(), vue.createElementBlock("text", {
          key: 0,
          class: "uv-divider__dot"
        }, "●")) : _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "uv-divider__text",
            style: vue.normalizeStyle([$options.textStyle])
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createVNode(_component_uv_line, {
          color: _ctx.lineColor,
          customStyle: $options.rightLineStyle,
          hairline: _ctx.hairline,
          dashed: _ctx.dashed
        }, null, 8, ["color", "customStyle", "hairline", "dashed"])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$b = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["render", _sfc_render$$], ["__scopeId", "data-v-222d1a38"], ["__file", "E:/BankSystem/user/uni_modules/uv-divider/components/uv-divider/uv-divider.vue"]]);
  let Calendar$1 = class Calendar {
    constructor({
      selected,
      startDate,
      endDate,
      range: range2
    } = {}) {
      this.date = this.getDateObj(/* @__PURE__ */ new Date());
      this.selected = selected || [];
      this.startDate = startDate;
      this.endDate = endDate;
      this.range = range2;
      this.cleanMultipleStatus();
      this.weeks = {};
      this.lastHover = false;
    }
    /**
     * 设置日期
     * @param {Object} date
     */
    setDate(date2) {
      const selectDate = this.getDateObj(date2);
      this.getWeeks(selectDate.fullDate);
    }
    /**
     * 清理多选状态
     */
    cleanMultipleStatus() {
      this.multipleStatus = {
        before: "",
        after: "",
        data: []
      };
    }
    setStartDate(startDate) {
      this.startDate = startDate;
    }
    setEndDate(endDate) {
      this.endDate = endDate;
    }
    getPreMonthObj(date2) {
      date2 = fixIosDateFormat(date2);
      date2 = new Date(date2);
      const oldMonth = date2.getMonth();
      date2.setMonth(oldMonth - 1);
      const newMonth = date2.getMonth();
      if (oldMonth !== 0 && newMonth - oldMonth === 0) {
        date2.setMonth(newMonth - 1);
      }
      return this.getDateObj(date2);
    }
    getNextMonthObj(date2) {
      date2 = fixIosDateFormat(date2);
      date2 = new Date(date2);
      const oldMonth = date2.getMonth();
      date2.setMonth(oldMonth + 1);
      const newMonth = date2.getMonth();
      if (newMonth - oldMonth > 1) {
        date2.setMonth(newMonth - 1);
      }
      return this.getDateObj(date2);
    }
    /**
     * 获取指定格式Date对象
     */
    getDateObj(date2) {
      date2 = fixIosDateFormat(date2);
      date2 = new Date(date2);
      return {
        fullDate: getDate(date2),
        year: date2.getFullYear(),
        month: addZero(date2.getMonth() + 1),
        date: addZero(date2.getDate()),
        day: date2.getDay()
      };
    }
    /**
     * 获取上一个月日期集合
     */
    getPreMonthDays(amount2, dateObj) {
      const result = [];
      for (let i2 = amount2 - 1; i2 >= 0; i2--) {
        const month = dateObj.month - 1;
        result.push({
          date: new Date(dateObj.year, month, -i2).getDate(),
          month,
          disable: true
        });
      }
      return result;
    }
    /**
     * 获取本月日期集合
     */
    getCurrentMonthDays(amount2, dateObj) {
      const result = [];
      const fullDate = this.date.fullDate;
      for (let i2 = 1; i2 <= amount2; i2++) {
        const currentDate = `${dateObj.year}-${dateObj.month}-${addZero(i2)}`;
        const isToday = fullDate === currentDate;
        const info = this.selected && this.selected.find((item) => {
          if (this.dateEqual(currentDate, item.date)) {
            return item;
          }
        });
        if (this.startDate) {
          dateCompare(this.startDate, currentDate);
        }
        if (this.endDate) {
          dateCompare(currentDate, this.endDate);
        }
        let multiples = this.multipleStatus.data;
        let multiplesStatus = -1;
        if (this.range && multiples) {
          multiplesStatus = multiples.findIndex((item) => {
            return this.dateEqual(item, currentDate);
          });
        }
        const checked = multiplesStatus !== -1;
        result.push({
          fullDate: currentDate,
          year: dateObj.year,
          date: i2,
          multiple: this.range ? checked : false,
          beforeMultiple: this.isLogicBefore(currentDate, this.multipleStatus.before, this.multipleStatus.after),
          afterMultiple: this.isLogicAfter(currentDate, this.multipleStatus.before, this.multipleStatus.after),
          month: dateObj.month,
          disable: this.startDate && !dateCompare(this.startDate, currentDate) || this.endDate && !dateCompare(currentDate, this.endDate),
          isToday,
          userChecked: false,
          extraInfo: info
        });
      }
      return result;
    }
    /**
     * 获取下一个月日期集合
     */
    _getNextMonthDays(amount2, dateObj) {
      const result = [];
      const month = dateObj.month + 1;
      for (let i2 = 1; i2 <= amount2; i2++) {
        result.push({
          date: i2,
          month,
          disable: true
        });
      }
      return result;
    }
    /**
     * 获取当前日期详情
     * @param {Object} date
     */
    getInfo(date2) {
      if (!date2) {
        date2 = /* @__PURE__ */ new Date();
      }
      return this.calendar.find((item) => item.fullDate === this.getDateObj(date2).fullDate);
    }
    /**
     * 比较时间是否相等
     */
    dateEqual(before, after) {
      before = new Date(fixIosDateFormat(before));
      after = new Date(fixIosDateFormat(after));
      return before.valueOf() === after.valueOf();
    }
    /**
     *  比较真实起始日期
     */
    isLogicBefore(currentDate, before, after) {
      let logicBefore = before;
      if (before && after) {
        logicBefore = dateCompare(before, after) ? before : after;
      }
      return this.dateEqual(logicBefore, currentDate);
    }
    isLogicAfter(currentDate, before, after) {
      let logicAfter = after;
      if (before && after) {
        logicAfter = dateCompare(before, after) ? after : before;
      }
      return this.dateEqual(logicAfter, currentDate);
    }
    /**
     * 获取日期范围内所有日期
     * @param {Object} begin
     * @param {Object} end
     */
    geDateAll(begin, end) {
      var arr = [];
      var ab = begin.split("-");
      var ae = end.split("-");
      var db = /* @__PURE__ */ new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de = /* @__PURE__ */ new Date();
      de.setFullYear(ae[0], ae[1] - 1, ae[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1e3;
      var unixDe = de.getTime() - 24 * 60 * 60 * 1e3;
      for (var k = unixDb; k <= unixDe; ) {
        k = k + 24 * 60 * 60 * 1e3;
        arr.push(this.getDateObj(new Date(parseInt(k))).fullDate);
      }
      return arr;
    }
    /**
     *  获取多选状态
     */
    setMultiple(fullDate) {
      if (!this.range)
        return;
      let {
        before,
        after
      } = this.multipleStatus;
      if (before && after) {
        if (!this.lastHover) {
          this.lastHover = true;
          return;
        }
        this.multipleStatus.before = fullDate;
        this.multipleStatus.after = "";
        this.multipleStatus.data = [];
        this.multipleStatus.fulldate = "";
        this.lastHover = false;
      } else {
        if (!before) {
          this.multipleStatus.before = fullDate;
          this.lastHover = false;
        } else {
          this.multipleStatus.after = fullDate;
          if (dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
          } else {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
          }
          this.lastHover = true;
        }
      }
      this.getWeeks(fullDate);
    }
    /**
     *  鼠标 hover 更新多选状态
     */
    setHoverMultiple(fullDate) {
      if (!this.range || this.lastHover)
        return;
      const { before } = this.multipleStatus;
      if (!before) {
        this.multipleStatus.before = fullDate;
      } else {
        this.multipleStatus.after = fullDate;
        if (dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
        } else {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
        }
      }
      this.getWeeks(fullDate);
    }
    /**
     * 更新默认值多选状态
     */
    setDefaultMultiple(before, after) {
      this.multipleStatus.before = before;
      this.multipleStatus.after = after;
      if (before && after) {
        if (dateCompare(before, after)) {
          this.multipleStatus.data = this.geDateAll(before, after);
          this.getWeeks(after);
        } else {
          this.multipleStatus.data = this.geDateAll(after, before);
          this.getWeeks(before);
        }
      }
    }
    /**
     * 获取每周数据
     * @param {Object} dateData
     */
    getWeeks(dateData) {
      const {
        year,
        month
      } = this.getDateObj(dateData);
      const preMonthDayAmount = new Date(year, month - 1, 1).getDay();
      const preMonthDays = this.getPreMonthDays(preMonthDayAmount, this.getDateObj(dateData));
      const currentMonthDayAmount = new Date(year, month, 0).getDate();
      const currentMonthDays = this.getCurrentMonthDays(currentMonthDayAmount, this.getDateObj(dateData));
      const nextMonthDayAmount = 42 - preMonthDayAmount - currentMonthDayAmount;
      const nextMonthDays = this._getNextMonthDays(nextMonthDayAmount, this.getDateObj(dateData));
      const calendarDays = [...preMonthDays, ...currentMonthDays, ...nextMonthDays];
      const weeks = new Array(6);
      for (let i2 = 0; i2 < calendarDays.length; i2++) {
        const index2 = Math.floor(i2 / 7);
        if (!weeks[index2]) {
          weeks[index2] = new Array(7);
        }
        weeks[index2][i2 % 7] = calendarDays[i2];
      }
      this.calendar = calendarDays;
      this.weeks = weeks;
    }
  };
  function getDateTime(date2, hideSecond) {
    return `${getDate(date2)} ${getTime(date2, hideSecond)}`;
  }
  function getDate(date2) {
    date2 = fixIosDateFormat(date2);
    date2 = new Date(date2);
    const year = date2.getFullYear();
    const month = date2.getMonth() + 1;
    const day = date2.getDate();
    return `${year}-${addZero(month)}-${addZero(day)}`;
  }
  function getTime(date2, hideSecond) {
    date2 = fixIosDateFormat(date2);
    date2 = new Date(date2);
    const hour = date2.getHours();
    const minute = date2.getMinutes();
    const second = date2.getSeconds();
    return hideSecond ? `${addZero(hour)}:${addZero(minute)}` : `${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
  }
  function addZero(num) {
    if (num < 10) {
      num = `0${num}`;
    }
    return num;
  }
  function getDefaultSecond(hideSecond) {
    return hideSecond ? "00:00" : "00:00:00";
  }
  function dateCompare(startDate, endDate) {
    startDate = new Date(fixIosDateFormat(startDate));
    endDate = new Date(fixIosDateFormat(endDate));
    return startDate <= endDate;
  }
  function checkDate(date2) {
    const dateReg = /((19|20)\d{2})(-|\/)\d{1,2}(-|\/)\d{1,2}/g;
    return date2.match(dateReg);
  }
  const dateTimeReg = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])( [0-5][0-9]:[0-5][0-9]:[0-5][0-9])?$/;
  function fixIosDateFormat(value2) {
    if (typeof value2 === "string" && dateTimeReg.test(value2)) {
      value2 = value2.replace(/-/g, "/");
    }
    return value2;
  }
  const _sfc_main$$ = {
    props: {
      weeks: {
        type: Object,
        default() {
          return {};
        }
      },
      calendar: {
        type: Object,
        default: () => {
          return {};
        }
      },
      selected: {
        type: Array,
        default: () => {
          return [];
        }
      },
      checkHover: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      choiceDate(weeks) {
        this.$emit("change", weeks);
      },
      handleMousemove(weeks) {
        this.$emit("handleMouse", weeks);
      }
    }
  };
  function _sfc_render$_(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-calendar-item__weeks-box", {
          "uni-calendar-item--disable": $props.weeks.disable,
          "uni-calendar-item--before-checked-x": $props.weeks.beforeMultiple,
          "uni-calendar-item--multiple": $props.weeks.multiple,
          "uni-calendar-item--after-checked-x": $props.weeks.afterMultiple
        }]),
        onClick: _cache[0] || (_cache[0] = ($event) => $options.choiceDate($props.weeks)),
        onMouseenter: _cache[1] || (_cache[1] = ($event) => $options.handleMousemove($props.weeks))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-calendar-item__weeks-box-item", {
              "uni-calendar-item--checked": $props.calendar.fullDate === $props.weeks.fullDate && ($props.calendar.userChecked || !$props.checkHover),
              "uni-calendar-item--checked-range-text": $props.checkHover,
              "uni-calendar-item--before-checked": $props.weeks.beforeMultiple,
              "uni-calendar-item--multiple": $props.weeks.multiple,
              "uni-calendar-item--after-checked": $props.weeks.afterMultiple,
              "uni-calendar-item--disable": $props.weeks.disable
            }])
          },
          [
            $props.selected && $props.weeks.extraInfo ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "uni-calendar-item__weeks-box-circle"
            })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "text",
              { class: "uni-calendar-item__weeks-box-text uni-calendar-item__weeks-box-text-disable uni-calendar-item--checked-text" },
              vue.toDisplayString($props.weeks.date),
              1
              /* TEXT */
            )
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass({ "uni-calendar-item--today": $props.weeks.isToday })
          },
          null,
          2
          /* CLASS */
        )
      ],
      34
      /* CLASS, HYDRATE_EVENTS */
    );
  }
  const calendarItem = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["render", _sfc_render$_], ["__scopeId", "data-v-3c762a01"], ["__file", "E:/BankSystem/user/uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar-item.vue"]]);
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format2, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format2.length) {
      let char = format2[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format2[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format2[position++];
        }
        const isClosed = char === endDelimiter;
        const type2 = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type: type2 });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index2 = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index2 < tokens.length) {
      const token = tokens[index2];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index2++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
    if (messages2 && Object.keys(messages2).length > 0) {
      locales = Object.keys(messages2);
    }
    const lang = startsWith(locale, locales);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index2 = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index2, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      [locale, messages2] = [
        messages2,
        locale
      ];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const en = {
    "uni-datetime-picker.selectDate": "select date",
    "uni-datetime-picker.selectTime": "select time",
    "uni-datetime-picker.selectDateTime": "select date and time",
    "uni-datetime-picker.startDate": "start date",
    "uni-datetime-picker.endDate": "end date",
    "uni-datetime-picker.startTime": "start time",
    "uni-datetime-picker.endTime": "end time",
    "uni-datetime-picker.ok": "ok",
    "uni-datetime-picker.clear": "clear",
    "uni-datetime-picker.cancel": "cancel",
    "uni-datetime-picker.year": "-",
    "uni-datetime-picker.month": "",
    "uni-calender.MON": "MON",
    "uni-calender.TUE": "TUE",
    "uni-calender.WED": "WED",
    "uni-calender.THU": "THU",
    "uni-calender.FRI": "FRI",
    "uni-calender.SAT": "SAT",
    "uni-calender.SUN": "SUN",
    "uni-calender.confirm": "confirm"
  };
  const zhHans = {
    "uni-datetime-picker.selectDate": "选择日期",
    "uni-datetime-picker.selectTime": "选择时间",
    "uni-datetime-picker.selectDateTime": "选择日期时间",
    "uni-datetime-picker.startDate": "开始日期",
    "uni-datetime-picker.endDate": "结束日期",
    "uni-datetime-picker.startTime": "开始时间",
    "uni-datetime-picker.endTime": "结束时间",
    "uni-datetime-picker.ok": "确定",
    "uni-datetime-picker.clear": "清除",
    "uni-datetime-picker.cancel": "取消",
    "uni-datetime-picker.year": "年",
    "uni-datetime-picker.month": "月",
    "uni-calender.SUN": "日",
    "uni-calender.MON": "一",
    "uni-calender.TUE": "二",
    "uni-calender.WED": "三",
    "uni-calender.THU": "四",
    "uni-calender.FRI": "五",
    "uni-calender.SAT": "六",
    "uni-calender.confirm": "确认"
  };
  const zhHant = {
    "uni-datetime-picker.selectDate": "選擇日期",
    "uni-datetime-picker.selectTime": "選擇時間",
    "uni-datetime-picker.selectDateTime": "選擇日期時間",
    "uni-datetime-picker.startDate": "開始日期",
    "uni-datetime-picker.endDate": "結束日期",
    "uni-datetime-picker.startTime": "開始时间",
    "uni-datetime-picker.endTime": "結束时间",
    "uni-datetime-picker.ok": "確定",
    "uni-datetime-picker.clear": "清除",
    "uni-datetime-picker.cancel": "取消",
    "uni-datetime-picker.year": "年",
    "uni-datetime-picker.month": "月",
    "uni-calender.SUN": "日",
    "uni-calender.MON": "一",
    "uni-calender.TUE": "二",
    "uni-calender.WED": "三",
    "uni-calender.THU": "四",
    "uni-calender.FRI": "五",
    "uni-calender.SAT": "六",
    "uni-calender.confirm": "確認"
  };
  const i18nMessages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  const { t: t$2 } = initVueI18n(i18nMessages);
  const _sfc_main$_ = {
    name: "UniDatetimePicker",
    data() {
      return {
        indicatorStyle: `height: 50px;`,
        visible: false,
        fixNvueBug: {},
        dateShow: true,
        timeShow: true,
        title: "日期和时间",
        // 输入框当前时间
        time: "",
        // 当前的年月日时分秒
        year: 1920,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        // 起始时间
        startYear: 1920,
        startMonth: 1,
        startDay: 1,
        startHour: 0,
        startMinute: 0,
        startSecond: 0,
        // 结束时间
        endYear: 2120,
        endMonth: 12,
        endDay: 31,
        endHour: 23,
        endMinute: 59,
        endSecond: 59
      };
    },
    props: {
      type: {
        type: String,
        default: "datetime"
      },
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      start: {
        type: [Number, String],
        default: ""
      },
      end: {
        type: [Number, String],
        default: ""
      },
      returnType: {
        type: String,
        default: "string"
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: [Boolean, String],
        default: true
      },
      hideSecond: {
        type: [Boolean, String],
        default: false
      }
    },
    watch: {
      modelValue: {
        handler(newVal) {
          if (newVal) {
            this.parseValue(fixIosDateFormat(newVal));
            this.initTime(false);
          } else {
            this.time = "";
            this.parseValue(Date.now());
          }
        },
        immediate: true
      },
      type: {
        handler(newValue) {
          if (newValue === "date") {
            this.dateShow = true;
            this.timeShow = false;
            this.title = "日期";
          } else if (newValue === "time") {
            this.dateShow = false;
            this.timeShow = true;
            this.title = "时间";
          } else {
            this.dateShow = true;
            this.timeShow = true;
            this.title = "日期和时间";
          }
        },
        immediate: true
      },
      start: {
        handler(newVal) {
          this.parseDatetimeRange(fixIosDateFormat(newVal), "start");
        },
        immediate: true
      },
      end: {
        handler(newVal) {
          this.parseDatetimeRange(fixIosDateFormat(newVal), "end");
        },
        immediate: true
      },
      // 月、日、时、分、秒可选范围变化后，检查当前值是否在范围内，不在则当前值重置为可选范围第一项
      months(newVal) {
        this.checkValue("month", this.month, newVal);
      },
      days(newVal) {
        this.checkValue("day", this.day, newVal);
      },
      hours(newVal) {
        this.checkValue("hour", this.hour, newVal);
      },
      minutes(newVal) {
        this.checkValue("minute", this.minute, newVal);
      },
      seconds(newVal) {
        this.checkValue("second", this.second, newVal);
      }
    },
    computed: {
      // 当前年、月、日、时、分、秒选择范围
      years() {
        return this.getCurrentRange("year");
      },
      months() {
        return this.getCurrentRange("month");
      },
      days() {
        return this.getCurrentRange("day");
      },
      hours() {
        return this.getCurrentRange("hour");
      },
      minutes() {
        return this.getCurrentRange("minute");
      },
      seconds() {
        return this.getCurrentRange("second");
      },
      // picker 当前值数组
      ymd() {
        return [this.year - this.minYear, this.month - this.minMonth, this.day - this.minDay];
      },
      hms() {
        return [this.hour - this.minHour, this.minute - this.minMinute, this.second - this.minSecond];
      },
      // 当前 date 是 start
      currentDateIsStart() {
        return this.year === this.startYear && this.month === this.startMonth && this.day === this.startDay;
      },
      // 当前 date 是 end
      currentDateIsEnd() {
        return this.year === this.endYear && this.month === this.endMonth && this.day === this.endDay;
      },
      // 当前年、月、日、时、分、秒的最小值和最大值
      minYear() {
        return this.startYear;
      },
      maxYear() {
        return this.endYear;
      },
      minMonth() {
        if (this.year === this.startYear) {
          return this.startMonth;
        } else {
          return 1;
        }
      },
      maxMonth() {
        if (this.year === this.endYear) {
          return this.endMonth;
        } else {
          return 12;
        }
      },
      minDay() {
        if (this.year === this.startYear && this.month === this.startMonth) {
          return this.startDay;
        } else {
          return 1;
        }
      },
      maxDay() {
        if (this.year === this.endYear && this.month === this.endMonth) {
          return this.endDay;
        } else {
          return this.daysInMonth(this.year, this.month);
        }
      },
      minHour() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart) {
            return this.startHour;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          return this.startHour;
        }
      },
      maxHour() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd) {
            return this.endHour;
          } else {
            return 23;
          }
        }
        if (this.type === "time") {
          return this.endHour;
        }
      },
      minMinute() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart && this.hour === this.startHour) {
            return this.startMinute;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.startHour) {
            return this.startMinute;
          } else {
            return 0;
          }
        }
      },
      maxMinute() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd && this.hour === this.endHour) {
            return this.endMinute;
          } else {
            return 59;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.endHour) {
            return this.endMinute;
          } else {
            return 59;
          }
        }
      },
      minSecond() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart && this.hour === this.startHour && this.minute === this.startMinute) {
            return this.startSecond;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.startHour && this.minute === this.startMinute) {
            return this.startSecond;
          } else {
            return 0;
          }
        }
      },
      maxSecond() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd && this.hour === this.endHour && this.minute === this.endMinute) {
            return this.endSecond;
          } else {
            return 59;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.endHour && this.minute === this.endMinute) {
            return this.endSecond;
          } else {
            return 59;
          }
        }
      },
      /**
       * for i18n
       */
      selectTimeText() {
        return t$2("uni-datetime-picker.selectTime");
      },
      okText() {
        return t$2("uni-datetime-picker.ok");
      },
      clearText() {
        return t$2("uni-datetime-picker.clear");
      },
      cancelText() {
        return t$2("uni-datetime-picker.cancel");
      }
    },
    mounted() {
    },
    methods: {
      /**
       * @param {Object} item
       * 小于 10 在前面加个 0
       */
      lessThanTen(item) {
        return item < 10 ? "0" + item : item;
      },
      /**
       * 解析时分秒字符串，例如：00:00:00
       * @param {String} timeString
       */
      parseTimeType(timeString) {
        if (timeString) {
          let timeArr = timeString.split(":");
          this.hour = Number(timeArr[0]);
          this.minute = Number(timeArr[1]);
          this.second = Number(timeArr[2]);
        }
      },
      /**
       * 解析选择器初始值，类型可以是字符串、时间戳，例如：2000-10-02、'08:30:00'、 1610695109000
       * @param {String | Number} datetime
       */
      initPickerValue(datetime) {
        let defaultValue = null;
        if (datetime) {
          defaultValue = this.compareValueWithStartAndEnd(datetime, this.start, this.end);
        } else {
          defaultValue = Date.now();
          defaultValue = this.compareValueWithStartAndEnd(defaultValue, this.start, this.end);
        }
        this.parseValue(defaultValue);
      },
      /**
       * 初始值规则：
       * - 用户设置初始值 value
       * 	- 设置了起始时间 start、终止时间 end，并 start < value < end，初始值为 value， 否则初始值为 start
       * 	- 只设置了起始时间 start，并 start < value，初始值为 value，否则初始值为 start
       * 	- 只设置了终止时间 end，并 value < end，初始值为 value，否则初始值为 end
       * 	- 无起始终止时间，则初始值为 value
       * - 无初始值 value，则初始值为当前本地时间 Date.now()
       * @param {Object} value
       * @param {Object} dateBase
       */
      compareValueWithStartAndEnd(value2, start, end) {
        let winner = null;
        value2 = this.superTimeStamp(value2);
        start = this.superTimeStamp(start);
        end = this.superTimeStamp(end);
        if (start && end) {
          if (value2 < start) {
            winner = new Date(start);
          } else if (value2 > end) {
            winner = new Date(end);
          } else {
            winner = new Date(value2);
          }
        } else if (start && !end) {
          winner = start <= value2 ? new Date(value2) : new Date(start);
        } else if (!start && end) {
          winner = value2 <= end ? new Date(value2) : new Date(end);
        } else {
          winner = new Date(value2);
        }
        return winner;
      },
      /**
       * 转换为可比较的时间戳，接受日期、时分秒、时间戳
       * @param {Object} value
       */
      superTimeStamp(value2) {
        let dateBase = "";
        if (this.type === "time" && value2 && typeof value2 === "string") {
          const now = /* @__PURE__ */ new Date();
          const year = now.getFullYear();
          const month = now.getMonth() + 1;
          const day = now.getDate();
          dateBase = year + "/" + month + "/" + day + " ";
        }
        if (Number(value2)) {
          value2 = parseInt(value2);
          dateBase = 0;
        }
        return this.createTimeStamp(dateBase + value2);
      },
      /**
       * 解析默认值 value，字符串、时间戳
       * @param {Object} defaultTime
       */
      parseValue(value2) {
        if (!value2) {
          return;
        }
        if (this.type === "time" && typeof value2 === "string") {
          this.parseTimeType(value2);
        } else {
          let defaultDate = null;
          defaultDate = new Date(value2);
          if (this.type !== "time") {
            this.year = defaultDate.getFullYear();
            this.month = defaultDate.getMonth() + 1;
            this.day = defaultDate.getDate();
          }
          if (this.type !== "date") {
            this.hour = defaultDate.getHours();
            this.minute = defaultDate.getMinutes();
            this.second = defaultDate.getSeconds();
          }
        }
        if (this.hideSecond) {
          this.second = 0;
        }
      },
      /**
       * 解析可选择时间范围 start、end，年月日字符串、时间戳
       * @param {Object} defaultTime
       */
      parseDatetimeRange(point, pointType) {
        if (!point) {
          if (pointType === "start") {
            this.startYear = 1920;
            this.startMonth = 1;
            this.startDay = 1;
            this.startHour = 0;
            this.startMinute = 0;
            this.startSecond = 0;
          }
          if (pointType === "end") {
            this.endYear = 2120;
            this.endMonth = 12;
            this.endDay = 31;
            this.endHour = 23;
            this.endMinute = 59;
            this.endSecond = 59;
          }
          return;
        }
        if (this.type === "time") {
          const pointArr = point.split(":");
          this[pointType + "Hour"] = Number(pointArr[0]);
          this[pointType + "Minute"] = Number(pointArr[1]);
          this[pointType + "Second"] = Number(pointArr[2]);
        } else {
          if (!point) {
            pointType === "start" ? this.startYear = this.year - 60 : this.endYear = this.year + 60;
            return;
          }
          if (Number(point)) {
            point = parseInt(point);
          }
          const hasTime = /[0-9]:[0-9]/;
          if (this.type === "datetime" && pointType === "end" && typeof point === "string" && !hasTime.test(
            point
          )) {
            point = point + " 23:59:59";
          }
          const pointDate = new Date(point);
          this[pointType + "Year"] = pointDate.getFullYear();
          this[pointType + "Month"] = pointDate.getMonth() + 1;
          this[pointType + "Day"] = pointDate.getDate();
          if (this.type === "datetime") {
            this[pointType + "Hour"] = pointDate.getHours();
            this[pointType + "Minute"] = pointDate.getMinutes();
            this[pointType + "Second"] = pointDate.getSeconds();
          }
        }
      },
      // 获取 年、月、日、时、分、秒 当前可选范围
      getCurrentRange(value2) {
        const range2 = [];
        for (let i2 = this["min" + this.capitalize(value2)]; i2 <= this["max" + this.capitalize(value2)]; i2++) {
          range2.push(i2);
        }
        return range2;
      },
      // 字符串首字母大写
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      // 检查当前值是否在范围内，不在则当前值重置为可选范围第一项
      checkValue(name, value2, values) {
        if (values.indexOf(value2) === -1) {
          this[name] = values[0];
        }
      },
      // 每个月的实际天数
      daysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
      },
      //兼容 iOS、safari 日期格式
      fixIosDateFormat(value2) {
        if (typeof value2 === "string") {
          value2 = value2.replace(/-/g, "/");
        }
        return value2;
      },
      /**
       * 生成时间戳
       * @param {Object} time
       */
      createTimeStamp(time) {
        if (!time)
          return;
        if (typeof time === "number") {
          return time;
        } else {
          time = time.replace(/-/g, "/");
          if (this.type === "date") {
            time = time + " 00:00:00";
          }
          return Date.parse(time);
        }
      },
      /**
       * 生成日期或时间的字符串
       */
      createDomSting() {
        const yymmdd = this.year + "-" + this.lessThanTen(this.month) + "-" + this.lessThanTen(this.day);
        let hhmmss = this.lessThanTen(this.hour) + ":" + this.lessThanTen(this.minute);
        if (!this.hideSecond) {
          hhmmss = hhmmss + ":" + this.lessThanTen(this.second);
        }
        if (this.type === "date") {
          return yymmdd;
        } else if (this.type === "time") {
          return hhmmss;
        } else {
          return yymmdd + " " + hhmmss;
        }
      },
      /**
       * 初始化返回值，并抛出 change 事件
       */
      initTime(emit = true) {
        this.time = this.createDomSting();
        if (!emit)
          return;
        if (this.returnType === "timestamp" && this.type !== "time") {
          this.$emit("change", this.createTimeStamp(this.time));
          this.$emit("input", this.createTimeStamp(this.time));
          this.$emit("update:modelValue", this.createTimeStamp(this.time));
        } else {
          this.$emit("change", this.time);
          this.$emit("input", this.time);
          this.$emit("update:modelValue", this.time);
        }
      },
      /**
       * 用户选择日期或时间更新 data
       * @param {Object} e
       */
      bindDateChange(e2) {
        const val = e2.detail.value;
        this.year = this.years[val[0]];
        this.month = this.months[val[1]];
        this.day = this.days[val[2]];
      },
      bindTimeChange(e2) {
        const val = e2.detail.value;
        this.hour = this.hours[val[0]];
        this.minute = this.minutes[val[1]];
        this.second = this.seconds[val[2]];
      },
      /**
       * 初始化弹出层
       */
      initTimePicker() {
        if (this.disabled)
          return;
        const value2 = fixIosDateFormat(this.time);
        this.initPickerValue(value2);
        this.visible = !this.visible;
      },
      /**
       * 触发或关闭弹框
       */
      tiggerTimePicker(e2) {
        this.visible = !this.visible;
      },
      /**
       * 用户点击“清空”按钮，清空当前值
       */
      clearTime() {
        this.time = "";
        this.$emit("change", this.time);
        this.$emit("input", this.time);
        this.$emit("update:modelValue", this.time);
        this.tiggerTimePicker();
      },
      /**
       * 用户点击“确定”按钮
       */
      setTime() {
        this.initTime();
        this.tiggerTimePicker();
      }
    }
  };
  function _sfc_render$Z(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-datetime-picker" }, [
      vue.createElementVNode("view", {
        onClick: _cache[0] || (_cache[0] = (...args) => $options.initTimePicker && $options.initTimePicker(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-datetime-picker-timebox-pointer", { "uni-datetime-picker-disabled": $props.disabled, "uni-datetime-picker-timebox": $props.border }])
            },
            [
              vue.createElementVNode(
                "text",
                { class: "uni-datetime-picker-text" },
                vue.toDisplayString($data.time),
                1
                /* TEXT */
              ),
              !$data.time ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-datetime-picker-time"
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-text" },
                  vue.toDisplayString($options.selectTimeText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ], true)
      ]),
      $data.visible ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        id: "mask",
        class: "uni-datetime-picker-mask",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.tiggerTimePicker && $options.tiggerTimePicker(...args))
      })) : vue.createCommentVNode("v-if", true),
      $data.visible ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          class: vue.normalizeClass(["uni-datetime-picker-popup", [$data.dateShow && $data.timeShow ? "" : "fix-nvue-height"]]),
          style: vue.normalizeStyle($data.fixNvueBug)
        },
        [
          vue.createElementVNode("view", { class: "uni-title" }, [
            vue.createElementVNode(
              "text",
              { class: "uni-datetime-picker-text" },
              vue.toDisplayString($options.selectTimeText),
              1
              /* TEXT */
            )
          ]),
          $data.dateShow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-datetime-picker__container-box"
          }, [
            vue.createElementVNode("picker-view", {
              class: "uni-datetime-picker-view",
              "indicator-style": $data.indicatorStyle,
              value: $options.ymd,
              onChange: _cache[2] || (_cache[2] = (...args) => $options.bindDateChange && $options.bindDateChange(...args))
            }, [
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.years, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index2
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.months, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index2
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.days, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index2
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ], 40, ["indicator-style", "value"]),
            vue.createCommentVNode(" 兼容 nvue 不支持伪类 "),
            vue.createElementVNode("text", { class: "uni-datetime-picker-sign sign-left" }, "-"),
            vue.createElementVNode("text", { class: "uni-datetime-picker-sign sign-right" }, "-")
          ])) : vue.createCommentVNode("v-if", true),
          $data.timeShow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "uni-datetime-picker__container-box"
          }, [
            vue.createElementVNode("picker-view", {
              class: vue.normalizeClass(["uni-datetime-picker-view", [$props.hideSecond ? "time-hide-second" : ""]]),
              "indicator-style": $data.indicatorStyle,
              value: $options.hms,
              onChange: _cache[3] || (_cache[3] = (...args) => $options.bindTimeChange && $options.bindTimeChange(...args))
            }, [
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.hours, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index2
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.minutes, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index2
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              !$props.hideSecond ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.seconds, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index2
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ], 42, ["indicator-style", "value"]),
            vue.createCommentVNode(" 兼容 nvue 不支持伪类 "),
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["uni-datetime-picker-sign", [$props.hideSecond ? "sign-center" : "sign-left"]])
              },
              ":",
              2
              /* CLASS */
            ),
            !$props.hideSecond ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "uni-datetime-picker-sign sign-right"
            }, ":")) : vue.createCommentVNode("v-if", true)
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "uni-datetime-picker-btn" }, [
            vue.createElementVNode("view", {
              onClick: _cache[4] || (_cache[4] = (...args) => $options.clearTime && $options.clearTime(...args))
            }, [
              vue.createElementVNode(
                "text",
                { class: "uni-datetime-picker-btn-text" },
                vue.toDisplayString($options.clearText),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "uni-datetime-picker-btn-group" }, [
              vue.createElementVNode("view", {
                class: "uni-datetime-picker-cancel",
                onClick: _cache[5] || (_cache[5] = (...args) => $options.tiggerTimePicker && $options.tiggerTimePicker(...args))
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-btn-text" },
                  vue.toDisplayString($options.cancelText),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", {
                onClick: _cache[6] || (_cache[6] = (...args) => $options.setTime && $options.setTime(...args))
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-btn-text" },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])
            ])
          ])
        ],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const TimePicker = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["render", _sfc_render$Z], ["__scopeId", "data-v-1d532b70"], ["__file", "E:/BankSystem/user/uni_modules/uni-datetime-picker/components/uni-datetime-picker/time-picker.vue"]]);
  const { t: t$1 } = initVueI18n(i18nMessages);
  const _sfc_main$Z = {
    components: {
      calendarItem,
      timePicker: TimePicker
    },
    props: {
      date: {
        type: String,
        default: ""
      },
      defTime: {
        type: [String, Object],
        default: ""
      },
      selectableTimes: {
        type: [Object],
        default() {
          return {};
        }
      },
      selected: {
        type: Array,
        default() {
          return [];
        }
      },
      startDate: {
        type: String,
        default: ""
      },
      endDate: {
        type: String,
        default: ""
      },
      startPlaceholder: {
        type: String,
        default: ""
      },
      endPlaceholder: {
        type: String,
        default: ""
      },
      range: {
        type: Boolean,
        default: false
      },
      hasTime: {
        type: Boolean,
        default: false
      },
      insert: {
        type: Boolean,
        default: true
      },
      showMonth: {
        type: Boolean,
        default: true
      },
      clearDate: {
        type: Boolean,
        default: true
      },
      checkHover: {
        type: Boolean,
        default: true
      },
      hideSecond: {
        type: [Boolean],
        default: false
      },
      pleStatus: {
        type: Object,
        default() {
          return {
            before: "",
            after: "",
            data: [],
            fulldate: ""
          };
        }
      },
      defaultValue: {
        type: [String, Object, Array],
        default: ""
      }
    },
    data() {
      return {
        show: false,
        weeks: [],
        calendar: {},
        nowDate: {},
        aniMaskShow: false,
        firstEnter: true,
        time: "",
        timeRange: {
          startTime: "",
          endTime: ""
        },
        tempSingleDate: "",
        tempRange: {
          before: "",
          after: ""
        }
      };
    },
    watch: {
      date: {
        immediate: true,
        handler(newVal) {
          if (!this.range) {
            this.tempSingleDate = newVal;
            setTimeout(() => {
              this.init(newVal);
            }, 100);
          }
        }
      },
      defTime: {
        immediate: true,
        handler(newVal) {
          if (!this.range) {
            this.time = newVal;
          } else {
            this.timeRange.startTime = newVal.start;
            this.timeRange.endTime = newVal.end;
          }
        }
      },
      startDate(val) {
        if (!this.cale) {
          return;
        }
        this.cale.setStartDate(val);
        this.cale.setDate(this.nowDate.fullDate);
        this.weeks = this.cale.weeks;
      },
      endDate(val) {
        if (!this.cale) {
          return;
        }
        this.cale.setEndDate(val);
        this.cale.setDate(this.nowDate.fullDate);
        this.weeks = this.cale.weeks;
      },
      selected(newVal) {
        if (!this.cale) {
          return;
        }
        this.cale.setSelectInfo(this.nowDate.fullDate, newVal);
        this.weeks = this.cale.weeks;
      },
      pleStatus: {
        immediate: true,
        handler(newVal) {
          const {
            before,
            after,
            fulldate,
            which
          } = newVal;
          this.tempRange.before = before;
          this.tempRange.after = after;
          setTimeout(() => {
            if (fulldate) {
              this.cale.setHoverMultiple(fulldate);
              if (before && after) {
                this.cale.lastHover = true;
                if (this.rangeWithinMonth(after, before))
                  return;
                this.setDate(before);
              } else {
                this.cale.setMultiple(fulldate);
                this.setDate(this.nowDate.fullDate);
                this.calendar.fullDate = "";
                this.cale.lastHover = false;
              }
            } else {
              if (!this.cale) {
                return;
              }
              this.cale.setDefaultMultiple(before, after);
              if (which === "left" && before) {
                this.setDate(before);
                this.weeks = this.cale.weeks;
              } else if (after) {
                this.setDate(after);
                this.weeks = this.cale.weeks;
              }
              this.cale.lastHover = true;
            }
          }, 16);
        }
      }
    },
    computed: {
      timepickerStartTime() {
        const activeDate = this.range ? this.tempRange.before : this.calendar.fullDate;
        return activeDate === this.startDate ? this.selectableTimes.start : "";
      },
      timepickerEndTime() {
        const activeDate = this.range ? this.tempRange.after : this.calendar.fullDate;
        return activeDate === this.endDate ? this.selectableTimes.end : "";
      },
      /**
       * for i18n
       */
      selectDateText() {
        return t$1("uni-datetime-picker.selectDate");
      },
      startDateText() {
        return this.startPlaceholder || t$1("uni-datetime-picker.startDate");
      },
      endDateText() {
        return this.endPlaceholder || t$1("uni-datetime-picker.endDate");
      },
      okText() {
        return t$1("uni-datetime-picker.ok");
      },
      yearText() {
        return t$1("uni-datetime-picker.year");
      },
      monthText() {
        return t$1("uni-datetime-picker.month");
      },
      MONText() {
        return t$1("uni-calender.MON");
      },
      TUEText() {
        return t$1("uni-calender.TUE");
      },
      WEDText() {
        return t$1("uni-calender.WED");
      },
      THUText() {
        return t$1("uni-calender.THU");
      },
      FRIText() {
        return t$1("uni-calender.FRI");
      },
      SATText() {
        return t$1("uni-calender.SAT");
      },
      SUNText() {
        return t$1("uni-calender.SUN");
      },
      confirmText() {
        return t$1("uni-calender.confirm");
      }
    },
    created() {
      this.cale = new Calendar$1({
        selected: this.selected,
        startDate: this.startDate,
        endDate: this.endDate,
        range: this.range
      });
      this.init(this.date);
    },
    methods: {
      leaveCale() {
        this.firstEnter = true;
      },
      handleMouse(weeks) {
        if (weeks.disable)
          return;
        if (this.cale.lastHover)
          return;
        let {
          before,
          after
        } = this.cale.multipleStatus;
        if (!before)
          return;
        this.calendar = weeks;
        this.cale.setHoverMultiple(this.calendar.fullDate);
        this.weeks = this.cale.weeks;
        if (this.firstEnter) {
          this.$emit("firstEnterCale", this.cale.multipleStatus);
          this.firstEnter = false;
        }
      },
      rangeWithinMonth(A, B) {
        const [yearA, monthA] = A.split("-");
        const [yearB, monthB] = B.split("-");
        return yearA === yearB && monthA === monthB;
      },
      // 蒙版点击事件
      maskClick() {
        this.close();
        this.$emit("maskClose");
      },
      clearCalender() {
        if (this.range) {
          this.timeRange.startTime = "";
          this.timeRange.endTime = "";
          this.tempRange.before = "";
          this.tempRange.after = "";
          this.cale.multipleStatus.before = "";
          this.cale.multipleStatus.after = "";
          this.cale.multipleStatus.data = [];
          this.cale.lastHover = false;
        } else {
          this.time = "";
          this.tempSingleDate = "";
        }
        this.calendar.fullDate = "";
        this.setDate(/* @__PURE__ */ new Date());
      },
      bindDateChange(e2) {
        const value2 = e2.detail.value + "-1";
        this.setDate(value2);
      },
      /**
       * 初始化日期显示
       * @param {Object} date
       */
      init(date2) {
        if (!this.cale) {
          return;
        }
        this.cale.setDate(date2 || /* @__PURE__ */ new Date());
        this.weeks = this.cale.weeks;
        this.nowDate = this.cale.getInfo(date2);
        this.calendar = { ...this.nowDate };
        if (!date2) {
          this.calendar.fullDate = "";
          if (this.defaultValue && !this.range) {
            const defaultDate = new Date(this.defaultValue);
            const fullDate = getDate(defaultDate);
            const year = defaultDate.getFullYear();
            const month = defaultDate.getMonth() + 1;
            const date3 = defaultDate.getDate();
            const day = defaultDate.getDay();
            this.calendar = {
              fullDate,
              year,
              month,
              date: date3,
              day
            }, this.tempSingleDate = fullDate;
            this.time = getTime(defaultDate, this.hideSecond);
          }
        }
      },
      /**
       * 打开日历弹窗
       */
      open() {
        if (this.clearDate && !this.insert) {
          this.cale.cleanMultipleStatus();
          this.init(this.date);
        }
        this.show = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.aniMaskShow = true;
          }, 50);
        });
      },
      /**
       * 关闭日历弹窗
       */
      close() {
        this.aniMaskShow = false;
        this.$nextTick(() => {
          setTimeout(() => {
            this.show = false;
            this.$emit("close");
          }, 300);
        });
      },
      /**
       * 确认按钮
       */
      confirm() {
        this.setEmit("confirm");
        this.close();
      },
      /**
       * 变化触发
       */
      change() {
        if (!this.insert)
          return;
        this.setEmit("change");
      },
      /**
       * 选择月份触发
       */
      monthSwitch() {
        let {
          year,
          month
        } = this.nowDate;
        this.$emit("monthSwitch", {
          year,
          month: Number(month)
        });
      },
      /**
       * 派发事件
       * @param {Object} name
       */
      setEmit(name) {
        if (!this.range) {
          if (!this.calendar.fullDate) {
            this.calendar = this.cale.getInfo(/* @__PURE__ */ new Date());
            this.tempSingleDate = this.calendar.fullDate;
          }
          if (this.hasTime && !this.time) {
            this.time = getTime(/* @__PURE__ */ new Date(), this.hideSecond);
          }
        }
        let {
          year,
          month,
          date: date2,
          fullDate,
          extraInfo
        } = this.calendar;
        this.$emit(name, {
          range: this.cale.multipleStatus,
          year,
          month,
          date: date2,
          time: this.time,
          timeRange: this.timeRange,
          fulldate: fullDate,
          extraInfo: extraInfo || {}
        });
      },
      /**
       * 选择天触发
       * @param {Object} weeks
       */
      choiceDate(weeks) {
        if (weeks.disable)
          return;
        this.calendar = weeks;
        this.calendar.userChecked = true;
        this.cale.setMultiple(this.calendar.fullDate, true);
        this.weeks = this.cale.weeks;
        this.tempSingleDate = this.calendar.fullDate;
        const beforeDate = new Date(this.cale.multipleStatus.before).getTime();
        const afterDate = new Date(this.cale.multipleStatus.after).getTime();
        if (beforeDate > afterDate && afterDate) {
          this.tempRange.before = this.cale.multipleStatus.after;
          this.tempRange.after = this.cale.multipleStatus.before;
        } else {
          this.tempRange.before = this.cale.multipleStatus.before;
          this.tempRange.after = this.cale.multipleStatus.after;
        }
        this.change();
      },
      changeMonth(type2) {
        let newDate;
        if (type2 === "pre") {
          newDate = this.cale.getPreMonthObj(this.nowDate.fullDate).fullDate;
        } else if (type2 === "next") {
          newDate = this.cale.getNextMonthObj(this.nowDate.fullDate).fullDate;
        }
        this.setDate(newDate);
        this.monthSwitch();
      },
      /**
       * 设置日期
       * @param {Object} date
       */
      setDate(date2) {
        this.cale.setDate(date2);
        this.weeks = this.cale.weeks;
        this.nowDate = this.cale.getInfo(date2);
      }
    }
  };
  function _sfc_render$Y(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_calendar_item = vue.resolveComponent("calendar-item");
    const _component_time_picker = vue.resolveComponent("time-picker");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$g);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uni-calendar",
        onMouseleave: _cache[9] || (_cache[9] = (...args) => $options.leaveCale && $options.leaveCale(...args))
      },
      [
        !$props.insert && $data.show ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uni-calendar__mask", { "uni-calendar--mask-show": $data.aniMaskShow }]),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.maskClick && $options.maskClick(...args))
          },
          null,
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true),
        $props.insert || $data.show ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: vue.normalizeClass(["uni-calendar__content", { "uni-calendar--fixed": !$props.insert, "uni-calendar--ani-show": $data.aniMaskShow, "uni-calendar__content-mobile": $data.aniMaskShow }])
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["uni-calendar__header", { "uni-calendar__header-mobile": !$props.insert }])
              },
              [
                vue.createElementVNode("view", {
                  class: "uni-calendar__header-btn-box",
                  onClick: _cache[1] || (_cache[1] = vue.withModifiers(($event) => $options.changeMonth("pre"), ["stop"]))
                }, [
                  vue.createElementVNode("view", { class: "uni-calendar__header-btn uni-calendar--left" })
                ]),
                vue.createElementVNode("picker", {
                  mode: "date",
                  value: $props.date,
                  fields: "month",
                  onChange: _cache[2] || (_cache[2] = (...args) => $options.bindDateChange && $options.bindDateChange(...args))
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__header-text" },
                    vue.toDisplayString(($data.nowDate.year || "") + $options.yearText + ($data.nowDate.month || "") + $options.monthText),
                    1
                    /* TEXT */
                  )
                ], 40, ["value"]),
                vue.createElementVNode("view", {
                  class: "uni-calendar__header-btn-box",
                  onClick: _cache[3] || (_cache[3] = vue.withModifiers(($event) => $options.changeMonth("next"), ["stop"]))
                }, [
                  vue.createElementVNode("view", { class: "uni-calendar__header-btn uni-calendar--right" })
                ]),
                !$props.insert ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "dialog-close",
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.close && $options.close(...args))
                }, [
                  vue.createElementVNode("view", {
                    class: "dialog-close-plus",
                    "data-id": "close"
                  }),
                  vue.createElementVNode("view", {
                    class: "dialog-close-plus dialog-close-rotate",
                    "data-id": "close"
                  })
                ])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode("view", { class: "uni-calendar__box" }, [
              $props.showMonth ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-calendar__box-bg"
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-calendar__box-bg-text" },
                  vue.toDisplayString($data.nowDate.month),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", {
                class: "uni-calendar__weeks",
                style: { "padding-bottom": "7px" }
              }, [
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.SUNText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.MONText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.TUEText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.WEDText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.THUText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.FRIText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.SATText),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.weeks, (item, weekIndex) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "uni-calendar__weeks",
                    key: weekIndex
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(item, (weeks, weeksIndex) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "uni-calendar__weeks-item",
                          key: weeksIndex
                        }, [
                          vue.createVNode(_component_calendar_item, {
                            class: "uni-calendar-item--hook",
                            weeks,
                            calendar: $data.calendar,
                            selected: $props.selected,
                            checkHover: $props.range,
                            onChange: $options.choiceDate,
                            onHandleMouse: $options.handleMouse
                          }, null, 8, ["weeks", "calendar", "selected", "checkHover", "onChange", "onHandleMouse"])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            !$props.insert && !$props.range && $props.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uni-date-changed uni-calendar--fixed-top",
              style: { "padding": "0 80px" }
            }, [
              vue.createElementVNode(
                "view",
                { class: "uni-date-changed--time-date" },
                vue.toDisplayString($data.tempSingleDate ? $data.tempSingleDate : $options.selectDateText),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_time_picker, {
                type: "time",
                start: $options.timepickerStartTime,
                end: $options.timepickerEndTime,
                modelValue: $data.time,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.time = $event),
                disabled: !$data.tempSingleDate,
                border: false,
                "hide-second": $props.hideSecond,
                class: "time-picker-style"
              }, null, 8, ["start", "end", "modelValue", "disabled", "hide-second"])
            ])) : vue.createCommentVNode("v-if", true),
            !$props.insert && $props.range && $props.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "uni-date-changed uni-calendar--fixed-top"
            }, [
              vue.createElementVNode("view", { class: "uni-date-changed--time-start" }, [
                vue.createElementVNode(
                  "view",
                  { class: "uni-date-changed--time-date" },
                  vue.toDisplayString($data.tempRange.before ? $data.tempRange.before : $options.startDateText),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  start: $options.timepickerStartTime,
                  modelValue: $data.timeRange.startTime,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.timeRange.startTime = $event),
                  border: false,
                  "hide-second": $props.hideSecond,
                  disabled: !$data.tempRange.before,
                  class: "time-picker-style"
                }, null, 8, ["start", "modelValue", "hide-second", "disabled"])
              ]),
              vue.createElementVNode("view", { style: { "line-height": "50px" } }, [
                vue.createVNode(_component_uni_icons, {
                  type: "arrowthinright",
                  color: "#999"
                })
              ]),
              vue.createElementVNode("view", { class: "uni-date-changed--time-end" }, [
                vue.createElementVNode(
                  "view",
                  { class: "uni-date-changed--time-date" },
                  vue.toDisplayString($data.tempRange.after ? $data.tempRange.after : $options.endDateText),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  end: $options.timepickerEndTime,
                  modelValue: $data.timeRange.endTime,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.timeRange.endTime = $event),
                  border: false,
                  "hide-second": $props.hideSecond,
                  disabled: !$data.tempRange.after,
                  class: "time-picker-style"
                }, null, 8, ["end", "modelValue", "hide-second", "disabled"])
              ])
            ])) : vue.createCommentVNode("v-if", true),
            !$props.insert ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "uni-date-changed uni-date-btn--ok"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "uni-datetime-picker--btn",
                  onClick: _cache[8] || (_cache[8] = (...args) => $options.confirm && $options.confirm(...args))
                },
                vue.toDisplayString($options.confirmText),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true)
      ],
      32
      /* HYDRATE_EVENTS */
    );
  }
  const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["render", _sfc_render$Y], ["__scopeId", "data-v-1d379219"], ["__file", "E:/BankSystem/user/uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar.vue"]]);
  const _sfc_main$Y = {
    name: "UniDatetimePicker",
    options: {
      virtualHost: true
    },
    components: {
      Calendar,
      TimePicker
    },
    data() {
      return {
        isRange: false,
        hasTime: false,
        displayValue: "",
        inputDate: "",
        calendarDate: "",
        pickerTime: "",
        calendarRange: {
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: ""
        },
        displayRangeValue: {
          startDate: "",
          endDate: ""
        },
        tempRange: {
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: ""
        },
        // 左右日历同步数据
        startMultipleStatus: {
          before: "",
          after: "",
          data: [],
          fulldate: ""
        },
        endMultipleStatus: {
          before: "",
          after: "",
          data: [],
          fulldate: ""
        },
        pickerVisible: false,
        pickerPositionStyle: null,
        isEmitValue: false,
        isPhone: false,
        isFirstShow: true,
        i18nT: () => {
        }
      };
    },
    props: {
      type: {
        type: String,
        default: "datetime"
      },
      value: {
        type: [String, Number, Array, Date],
        default: ""
      },
      modelValue: {
        type: [String, Number, Array, Date],
        default: ""
      },
      start: {
        type: [Number, String],
        default: ""
      },
      end: {
        type: [Number, String],
        default: ""
      },
      returnType: {
        type: String,
        default: "string"
      },
      placeholder: {
        type: String,
        default: ""
      },
      startPlaceholder: {
        type: String,
        default: ""
      },
      endPlaceholder: {
        type: String,
        default: ""
      },
      rangeSeparator: {
        type: String,
        default: "-"
      },
      border: {
        type: [Boolean],
        default: true
      },
      disabled: {
        type: [Boolean],
        default: false
      },
      clearIcon: {
        type: [Boolean],
        default: true
      },
      hideSecond: {
        type: [Boolean],
        default: false
      },
      defaultValue: {
        type: [String, Object, Array],
        default: ""
      }
    },
    watch: {
      type: {
        immediate: true,
        handler(newVal) {
          this.hasTime = newVal.indexOf("time") !== -1;
          this.isRange = newVal.indexOf("range") !== -1;
        }
      },
      modelValue: {
        immediate: true,
        handler(newVal) {
          if (this.isEmitValue) {
            this.isEmitValue = false;
            return;
          }
          this.initPicker(newVal);
        }
      },
      start: {
        immediate: true,
        handler(newVal) {
          if (!newVal)
            return;
          this.calendarRange.startDate = getDate(newVal);
          if (this.hasTime) {
            this.calendarRange.startTime = getTime(newVal);
          }
        }
      },
      end: {
        immediate: true,
        handler(newVal) {
          if (!newVal)
            return;
          this.calendarRange.endDate = getDate(newVal);
          if (this.hasTime) {
            this.calendarRange.endTime = getTime(newVal, this.hideSecond);
          }
        }
      }
    },
    computed: {
      timepickerStartTime() {
        const activeDate = this.isRange ? this.tempRange.startDate : this.inputDate;
        return activeDate === this.calendarRange.startDate ? this.calendarRange.startTime : "";
      },
      timepickerEndTime() {
        const activeDate = this.isRange ? this.tempRange.endDate : this.inputDate;
        return activeDate === this.calendarRange.endDate ? this.calendarRange.endTime : "";
      },
      mobileCalendarTime() {
        const timeRange = {
          start: this.tempRange.startTime,
          end: this.tempRange.endTime
        };
        return this.isRange ? timeRange : this.pickerTime;
      },
      mobSelectableTime() {
        return {
          start: this.calendarRange.startTime,
          end: this.calendarRange.endTime
        };
      },
      datePopupWidth() {
        return this.isRange ? 653 : 301;
      },
      /**
       * for i18n
       */
      singlePlaceholderText() {
        return this.placeholder || (this.type === "date" ? this.selectDateText : this.selectDateTimeText);
      },
      startPlaceholderText() {
        return this.startPlaceholder || this.startDateText;
      },
      endPlaceholderText() {
        return this.endPlaceholder || this.endDateText;
      },
      selectDateText() {
        return this.i18nT("uni-datetime-picker.selectDate");
      },
      selectDateTimeText() {
        return this.i18nT("uni-datetime-picker.selectDateTime");
      },
      selectTimeText() {
        return this.i18nT("uni-datetime-picker.selectTime");
      },
      startDateText() {
        return this.startPlaceholder || this.i18nT("uni-datetime-picker.startDate");
      },
      startTimeText() {
        return this.i18nT("uni-datetime-picker.startTime");
      },
      endDateText() {
        return this.endPlaceholder || this.i18nT("uni-datetime-picker.endDate");
      },
      endTimeText() {
        return this.i18nT("uni-datetime-picker.endTime");
      },
      okText() {
        return this.i18nT("uni-datetime-picker.ok");
      },
      clearText() {
        return this.i18nT("uni-datetime-picker.clear");
      },
      showClearIcon() {
        return this.clearIcon && !this.disabled && (this.displayValue || this.displayRangeValue.startDate && this.displayRangeValue.endDate);
      }
    },
    created() {
      this.initI18nT();
      this.platform();
    },
    methods: {
      initI18nT() {
        const vueI18n = initVueI18n(i18nMessages);
        this.i18nT = vueI18n.t;
      },
      initPicker(newVal) {
        if (!newVal && !this.defaultValue || Array.isArray(newVal) && !newVal.length) {
          this.$nextTick(() => {
            this.clear(false);
          });
          return;
        }
        if (!Array.isArray(newVal) && !this.isRange) {
          if (newVal) {
            this.displayValue = this.inputDate = this.calendarDate = getDate(newVal);
            if (this.hasTime) {
              this.pickerTime = getTime(newVal, this.hideSecond);
              this.displayValue = `${this.displayValue} ${this.pickerTime}`;
            }
          } else if (this.defaultValue) {
            this.inputDate = this.calendarDate = getDate(this.defaultValue);
            if (this.hasTime) {
              this.pickerTime = getTime(this.defaultValue, this.hideSecond);
            }
          }
        } else {
          const [before, after] = newVal;
          if (!before && !after)
            return;
          const beforeDate = getDate(before);
          const beforeTime = getTime(before, this.hideSecond);
          const afterDate = getDate(after);
          const afterTime = getTime(after, this.hideSecond);
          const startDate = beforeDate;
          const endDate = afterDate;
          this.displayRangeValue.startDate = this.tempRange.startDate = startDate;
          this.displayRangeValue.endDate = this.tempRange.endDate = endDate;
          if (this.hasTime) {
            this.displayRangeValue.startDate = `${beforeDate} ${beforeTime}`;
            this.displayRangeValue.endDate = `${afterDate} ${afterTime}`;
            this.tempRange.startTime = beforeTime;
            this.tempRange.endTime = afterTime;
          }
          const defaultRange = {
            before: beforeDate,
            after: afterDate
          };
          this.startMultipleStatus = Object.assign({}, this.startMultipleStatus, defaultRange, {
            which: "right"
          });
          this.endMultipleStatus = Object.assign({}, this.endMultipleStatus, defaultRange, {
            which: "left"
          });
        }
      },
      updateLeftCale(e2) {
        const left = this.$refs.left;
        left.cale.setHoverMultiple(e2.after);
        left.setDate(this.$refs.left.nowDate.fullDate);
      },
      updateRightCale(e2) {
        const right = this.$refs.right;
        right.cale.setHoverMultiple(e2.after);
        right.setDate(this.$refs.right.nowDate.fullDate);
      },
      platform() {
        const { windowWidth } = uni.getSystemInfoSync();
        this.isPhone = windowWidth <= 500;
        this.windowWidth = windowWidth;
      },
      show() {
        if (this.disabled) {
          return;
        }
        this.platform();
        if (this.isPhone) {
          this.$refs.mobile.open();
          return;
        }
        this.pickerPositionStyle = {
          top: "10px"
        };
        const dateEditor = uni.createSelectorQuery().in(this).select(".uni-date-editor");
        dateEditor.boundingClientRect((rect) => {
          if (this.windowWidth - rect.left < this.datePopupWidth) {
            this.pickerPositionStyle.right = 0;
          }
        }).exec();
        setTimeout(() => {
          this.pickerVisible = !this.pickerVisible;
          if (!this.isPhone && this.isRange && this.isFirstShow) {
            this.isFirstShow = false;
            const {
              startDate,
              endDate
            } = this.calendarRange;
            if (startDate && endDate) {
              if (this.diffDate(startDate, endDate) < 30) {
                this.$refs.right.changeMonth("pre");
              }
            } else {
              this.$refs.right.changeMonth("next");
              this.$refs.right.cale.lastHover = false;
            }
          }
        }, 50);
      },
      close() {
        setTimeout(() => {
          this.pickerVisible = false;
          this.$emit("maskClick", this.value);
          this.$refs.mobile && this.$refs.mobile.close();
        }, 20);
      },
      setEmit(value2) {
        if (this.returnType === "timestamp" || this.returnType === "date") {
          if (!Array.isArray(value2)) {
            if (!this.hasTime) {
              value2 = value2 + " 00:00:00";
            }
            value2 = this.createTimestamp(value2);
            if (this.returnType === "date") {
              value2 = new Date(value2);
            }
          } else {
            if (!this.hasTime) {
              value2[0] = value2[0] + " 00:00:00";
              value2[1] = value2[1] + " 00:00:00";
            }
            value2[0] = this.createTimestamp(value2[0]);
            value2[1] = this.createTimestamp(value2[1]);
            if (this.returnType === "date") {
              value2[0] = new Date(value2[0]);
              value2[1] = new Date(value2[1]);
            }
          }
        }
        this.$emit("update:modelValue", value2);
        this.$emit("input", value2);
        this.$emit("change", value2);
        this.isEmitValue = true;
      },
      createTimestamp(date2) {
        date2 = fixIosDateFormat(date2);
        return Date.parse(new Date(date2));
      },
      singleChange(e2) {
        this.calendarDate = this.inputDate = e2.fulldate;
        if (this.hasTime)
          return;
        this.confirmSingleChange();
      },
      confirmSingleChange() {
        if (!checkDate(this.inputDate)) {
          const now = /* @__PURE__ */ new Date();
          this.calendarDate = this.inputDate = getDate(now);
          this.pickerTime = getTime(now, this.hideSecond);
        }
        let startLaterInputDate = false;
        let startDate, startTime;
        if (this.start) {
          let startString = this.start;
          if (typeof this.start === "number") {
            startString = getDateTime(this.start, this.hideSecond);
          }
          [startDate, startTime] = startString.split(" ");
          if (this.start && !dateCompare(startDate, this.inputDate)) {
            startLaterInputDate = true;
            this.inputDate = startDate;
          }
        }
        let endEarlierInputDate = false;
        let endDate, endTime;
        if (this.end) {
          let endString = this.end;
          if (typeof this.end === "number") {
            endString = getDateTime(this.end, this.hideSecond);
          }
          [endDate, endTime] = endString.split(" ");
          if (this.end && !dateCompare(this.inputDate, endDate)) {
            endEarlierInputDate = true;
            this.inputDate = endDate;
          }
        }
        if (this.hasTime) {
          if (startLaterInputDate) {
            this.pickerTime = startTime || getDefaultSecond(this.hideSecond);
          }
          if (endEarlierInputDate) {
            this.pickerTime = endTime || getDefaultSecond(this.hideSecond);
          }
          if (!this.pickerTime) {
            this.pickerTime = getTime(Date.now(), this.hideSecond);
          }
          this.displayValue = `${this.inputDate} ${this.pickerTime}`;
        } else {
          this.displayValue = this.inputDate;
        }
        this.setEmit(this.displayValue);
        this.pickerVisible = false;
      },
      leftChange(e2) {
        const {
          before,
          after
        } = e2.range;
        this.rangeChange(before, after);
        const obj = {
          before: e2.range.before,
          after: e2.range.after,
          data: e2.range.data,
          fulldate: e2.fulldate
        };
        this.startMultipleStatus = Object.assign({}, this.startMultipleStatus, obj);
      },
      rightChange(e2) {
        const {
          before,
          after
        } = e2.range;
        this.rangeChange(before, after);
        const obj = {
          before: e2.range.before,
          after: e2.range.after,
          data: e2.range.data,
          fulldate: e2.fulldate
        };
        this.endMultipleStatus = Object.assign({}, this.endMultipleStatus, obj);
      },
      mobileChange(e2) {
        if (this.isRange) {
          const { before, after } = e2.range;
          if (!before || !after) {
            return;
          }
          this.handleStartAndEnd(before, after, true);
          if (this.hasTime) {
            const {
              startTime,
              endTime
            } = e2.timeRange;
            this.tempRange.startTime = startTime;
            this.tempRange.endTime = endTime;
          }
          this.confirmRangeChange();
        } else {
          if (this.hasTime) {
            this.displayValue = e2.fulldate + " " + e2.time;
          } else {
            this.displayValue = e2.fulldate;
          }
          this.setEmit(this.displayValue);
        }
        this.$refs.mobile.close();
      },
      rangeChange(before, after) {
        if (!(before && after))
          return;
        this.handleStartAndEnd(before, after, true);
        if (this.hasTime)
          return;
        this.confirmRangeChange();
      },
      confirmRangeChange() {
        if (!this.tempRange.startDate || !this.tempRange.endDate) {
          this.pickerVisible = false;
          return;
        }
        if (!checkDate(this.tempRange.startDate)) {
          this.tempRange.startDate = getDate(Date.now());
        }
        if (!checkDate(this.tempRange.endDate)) {
          this.tempRange.endDate = getDate(Date.now());
        }
        let start, end;
        let startDateLaterRangeStartDate = false;
        let startDateLaterRangeEndDate = false;
        let startDate, startTime;
        if (this.start) {
          let startString = this.start;
          if (typeof this.start === "number") {
            startString = getDateTime(this.start, this.hideSecond);
          }
          [startDate, startTime] = startString.split(" ");
          if (this.start && !dateCompare(this.start, this.tempRange.startDate)) {
            startDateLaterRangeStartDate = true;
            this.tempRange.startDate = startDate;
          }
          if (this.start && !dateCompare(this.start, this.tempRange.endDate)) {
            startDateLaterRangeEndDate = true;
            this.tempRange.endDate = startDate;
          }
        }
        let endDateEarlierRangeStartDate = false;
        let endDateEarlierRangeEndDate = false;
        let endDate, endTime;
        if (this.end) {
          let endString = this.end;
          if (typeof this.end === "number") {
            endString = getDateTime(this.end, this.hideSecond);
          }
          [endDate, endTime] = endString.split(" ");
          if (this.end && !dateCompare(this.tempRange.startDate, this.end)) {
            endDateEarlierRangeStartDate = true;
            this.tempRange.startDate = endDate;
          }
          if (this.end && !dateCompare(this.tempRange.endDate, this.end)) {
            endDateEarlierRangeEndDate = true;
            this.tempRange.endDate = endDate;
          }
        }
        if (!this.hasTime) {
          start = this.displayRangeValue.startDate = this.tempRange.startDate;
          end = this.displayRangeValue.endDate = this.tempRange.endDate;
        } else {
          if (startDateLaterRangeStartDate) {
            this.tempRange.startTime = startTime || getDefaultSecond(this.hideSecond);
          } else if (endDateEarlierRangeStartDate) {
            this.tempRange.startTime = endTime || getDefaultSecond(this.hideSecond);
          }
          if (!this.tempRange.startTime) {
            this.tempRange.startTime = getTime(Date.now(), this.hideSecond);
          }
          if (startDateLaterRangeEndDate) {
            this.tempRange.endTime = startTime || getDefaultSecond(this.hideSecond);
          } else if (endDateEarlierRangeEndDate) {
            this.tempRange.endTime = endTime || getDefaultSecond(this.hideSecond);
          }
          if (!this.tempRange.endTime) {
            this.tempRange.endTime = getTime(Date.now(), this.hideSecond);
          }
          start = this.displayRangeValue.startDate = `${this.tempRange.startDate} ${this.tempRange.startTime}`;
          end = this.displayRangeValue.endDate = `${this.tempRange.endDate} ${this.tempRange.endTime}`;
        }
        if (!dateCompare(start, end)) {
          [start, end] = [end, start];
        }
        this.displayRangeValue.startDate = start;
        this.displayRangeValue.endDate = end;
        const displayRange = [start, end];
        this.setEmit(displayRange);
        this.pickerVisible = false;
      },
      handleStartAndEnd(before, after, temp = false) {
        if (!(before && after))
          return;
        const type2 = temp ? "tempRange" : "range";
        const isStartEarlierEnd = dateCompare(before, after);
        this[type2].startDate = isStartEarlierEnd ? before : after;
        this[type2].endDate = isStartEarlierEnd ? after : before;
      },
      /**
       * 比较时间大小
       */
      dateCompare(startDate, endDate) {
        startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
        endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
        return startDate <= endDate;
      },
      /**
       * 比较时间差
       */
      diffDate(startDate, endDate) {
        startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
        endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
        const diff = (endDate - startDate) / (24 * 60 * 60 * 1e3);
        return Math.abs(diff);
      },
      clear(needEmit = true) {
        if (!this.isRange) {
          this.displayValue = "";
          this.inputDate = "";
          this.pickerTime = "";
          if (this.isPhone) {
            this.$refs.mobile && this.$refs.mobile.clearCalender();
          } else {
            this.$refs.pcSingle && this.$refs.pcSingle.clearCalender();
          }
          if (needEmit) {
            this.$emit("change", "");
            this.$emit("input", "");
            this.$emit("update:modelValue", "");
          }
        } else {
          this.displayRangeValue.startDate = "";
          this.displayRangeValue.endDate = "";
          this.tempRange.startDate = "";
          this.tempRange.startTime = "";
          this.tempRange.endDate = "";
          this.tempRange.endTime = "";
          if (this.isPhone) {
            this.$refs.mobile && this.$refs.mobile.clearCalender();
          } else {
            this.$refs.left && this.$refs.left.clearCalender();
            this.$refs.right && this.$refs.right.clearCalender();
            this.$refs.right && this.$refs.right.changeMonth("next");
          }
          if (needEmit) {
            this.$emit("change", []);
            this.$emit("input", []);
            this.$emit("update:modelValue", []);
          }
        }
      }
    }
  };
  function _sfc_render$X(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$g);
    const _component_time_picker = vue.resolveComponent("time-picker");
    const _component_Calendar = vue.resolveComponent("Calendar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-date" }, [
      vue.createElementVNode("view", {
        class: "uni-date-editor",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.show && $options.show(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-date-editor--x", { "uni-date-editor--x__disabled": $props.disabled, "uni-date-x--border": $props.border }])
            },
            [
              !$data.isRange ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-date-x uni-date-single"
              }, [
                vue.createVNode(_component_uni_icons, {
                  class: "icon-calendar",
                  type: "calendar",
                  color: "#c0c4cc",
                  size: "22"
                }),
                vue.createElementVNode(
                  "view",
                  { class: "uni-date__x-input" },
                  vue.toDisplayString($data.displayValue || $options.singlePlaceholderText),
                  1
                  /* TEXT */
                )
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-date-x uni-date-range"
              }, [
                vue.createVNode(_component_uni_icons, {
                  class: "icon-calendar",
                  type: "calendar",
                  color: "#c0c4cc",
                  size: "22"
                }),
                vue.createElementVNode(
                  "view",
                  { class: "uni-date__x-input text-center" },
                  vue.toDisplayString($data.displayRangeValue.startDate || $options.startPlaceholderText),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "range-separator" },
                  vue.toDisplayString($props.rangeSeparator),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "uni-date__x-input text-center" },
                  vue.toDisplayString($data.displayRangeValue.endDate || $options.endPlaceholderText),
                  1
                  /* TEXT */
                )
              ])),
              $options.showClearIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "uni-date__icon-clear",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.clear && $options.clear(...args), ["stop"]))
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "clear",
                  color: "#c0c4cc",
                  size: "22"
                })
              ])) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ], true)
      ]),
      vue.withDirectives(vue.createElementVNode(
        "view",
        {
          class: "uni-date-mask--pc",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.close && $options.close(...args))
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $data.pickerVisible]
      ]),
      !$data.isPhone ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          ref: "datePicker",
          class: "uni-date-picker__container"
        },
        [
          !$data.isRange ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: "uni-date-single--x",
              style: vue.normalizeStyle($data.pickerPositionStyle)
            },
            [
              vue.createElementVNode("view", { class: "uni-popper__arrow" }),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-date-changed popup-x-header"
              }, [
                vue.withDirectives(vue.createElementVNode("input", {
                  class: "uni-date__input text-center",
                  type: "text",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.inputDate = $event),
                  placeholder: $options.selectDateText
                }, null, 8, ["placeholder"]), [
                  [vue.vModelText, $data.inputDate]
                ]),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  modelValue: $data.pickerTime,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.pickerTime = $event),
                  border: false,
                  disabled: !$data.inputDate,
                  start: $options.timepickerStartTime,
                  end: $options.timepickerEndTime,
                  hideSecond: $props.hideSecond,
                  style: { "width": "100%" }
                }, {
                  default: vue.withCtx(() => [
                    vue.withDirectives(vue.createElementVNode("input", {
                      class: "uni-date__input text-center",
                      type: "text",
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.pickerTime = $event),
                      placeholder: $options.selectTimeText,
                      disabled: !$data.inputDate
                    }, null, 8, ["placeholder", "disabled"]), [
                      [vue.vModelText, $data.pickerTime]
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["modelValue", "disabled", "start", "end", "hideSecond"])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createVNode(_component_Calendar, {
                ref: "pcSingle",
                showMonth: false,
                "start-date": $data.calendarRange.startDate,
                "end-date": $data.calendarRange.endDate,
                date: $data.calendarDate,
                onChange: $options.singleChange,
                "default-value": $props.defaultValue,
                style: { "padding": "0 8px" }
              }, null, 8, ["start-date", "end-date", "date", "onChange", "default-value"]),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "popup-x-footer"
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: "confirm-text",
                    onClick: _cache[6] || (_cache[6] = (...args) => $options.confirmSingleChange && $options.confirmSingleChange(...args))
                  },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          )) : (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 1,
              class: "uni-date-range--x",
              style: vue.normalizeStyle($data.pickerPositionStyle)
            },
            [
              vue.createElementVNode("view", { class: "uni-popper__arrow" }),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "popup-x-header uni-date-changed"
              }, [
                vue.createElementVNode("view", { class: "popup-x-header--datetime" }, [
                  vue.withDirectives(vue.createElementVNode("input", {
                    class: "uni-date__input uni-date-range__input",
                    type: "text",
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.tempRange.startDate = $event),
                    placeholder: $options.startDateText
                  }, null, 8, ["placeholder"]), [
                    [vue.vModelText, $data.tempRange.startDate]
                  ]),
                  vue.createVNode(_component_time_picker, {
                    type: "time",
                    modelValue: $data.tempRange.startTime,
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.tempRange.startTime = $event),
                    start: $options.timepickerStartTime,
                    border: false,
                    disabled: !$data.tempRange.startDate,
                    hideSecond: $props.hideSecond
                  }, {
                    default: vue.withCtx(() => [
                      vue.withDirectives(vue.createElementVNode("input", {
                        class: "uni-date__input uni-date-range__input",
                        type: "text",
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.tempRange.startTime = $event),
                        placeholder: $options.startTimeText,
                        disabled: !$data.tempRange.startDate
                      }, null, 8, ["placeholder", "disabled"]), [
                        [vue.vModelText, $data.tempRange.startTime]
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "start", "disabled", "hideSecond"])
                ]),
                vue.createVNode(_component_uni_icons, {
                  type: "arrowthinright",
                  color: "#999",
                  style: { "line-height": "40px" }
                }),
                vue.createElementVNode("view", { class: "popup-x-header--datetime" }, [
                  vue.withDirectives(vue.createElementVNode("input", {
                    class: "uni-date__input uni-date-range__input",
                    type: "text",
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.tempRange.endDate = $event),
                    placeholder: $options.endDateText
                  }, null, 8, ["placeholder"]), [
                    [vue.vModelText, $data.tempRange.endDate]
                  ]),
                  vue.createVNode(_component_time_picker, {
                    type: "time",
                    modelValue: $data.tempRange.endTime,
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.tempRange.endTime = $event),
                    end: $options.timepickerEndTime,
                    border: false,
                    disabled: !$data.tempRange.endDate,
                    hideSecond: $props.hideSecond
                  }, {
                    default: vue.withCtx(() => [
                      vue.withDirectives(vue.createElementVNode("input", {
                        class: "uni-date__input uni-date-range__input",
                        type: "text",
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.tempRange.endTime = $event),
                        placeholder: $options.endTimeText,
                        disabled: !$data.tempRange.endDate
                      }, null, 8, ["placeholder", "disabled"]), [
                        [vue.vModelText, $data.tempRange.endTime]
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "end", "disabled", "hideSecond"])
                ])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "popup-x-body" }, [
                vue.createVNode(_component_Calendar, {
                  ref: "left",
                  showMonth: false,
                  "start-date": $data.calendarRange.startDate,
                  "end-date": $data.calendarRange.endDate,
                  range: true,
                  pleStatus: $data.endMultipleStatus,
                  onChange: $options.leftChange,
                  onFirstEnterCale: $options.updateRightCale,
                  style: { "padding": "0 8px" }
                }, null, 8, ["start-date", "end-date", "pleStatus", "onChange", "onFirstEnterCale"]),
                vue.createVNode(_component_Calendar, {
                  ref: "right",
                  showMonth: false,
                  "start-date": $data.calendarRange.startDate,
                  "end-date": $data.calendarRange.endDate,
                  range: true,
                  onChange: $options.rightChange,
                  pleStatus: $data.startMultipleStatus,
                  onFirstEnterCale: $options.updateLeftCale,
                  style: { "padding": "0 8px", "border-left": "1px solid #F1F1F1" }
                }, null, 8, ["start-date", "end-date", "onChange", "pleStatus", "onFirstEnterCale"])
              ]),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "popup-x-footer"
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    onClick: _cache[13] || (_cache[13] = (...args) => $options.clear && $options.clear(...args))
                  },
                  vue.toDisplayString($options.clearText),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  {
                    class: "confirm-text",
                    onClick: _cache[14] || (_cache[14] = (...args) => $options.confirmRangeChange && $options.confirmRangeChange(...args))
                  },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          ))
        ],
        512
        /* NEED_PATCH */
      )), [
        [vue.vShow, $data.pickerVisible]
      ]) : vue.createCommentVNode("v-if", true),
      $data.isPhone ? (vue.openBlock(), vue.createBlock(_component_Calendar, {
        key: 1,
        ref: "mobile",
        clearDate: false,
        date: $data.calendarDate,
        defTime: $options.mobileCalendarTime,
        "start-date": $data.calendarRange.startDate,
        "end-date": $data.calendarRange.endDate,
        selectableTimes: $options.mobSelectableTime,
        startPlaceholder: $props.startPlaceholder,
        endPlaceholder: $props.endPlaceholder,
        "default-value": $props.defaultValue,
        pleStatus: $data.endMultipleStatus,
        showMonth: false,
        range: $data.isRange,
        hasTime: $data.hasTime,
        insert: false,
        hideSecond: $props.hideSecond,
        onConfirm: $options.mobileChange,
        onMaskClose: $options.close
      }, null, 8, ["date", "defTime", "start-date", "end-date", "selectableTimes", "startPlaceholder", "endPlaceholder", "default-value", "pleStatus", "range", "hasTime", "hideSecond", "onConfirm", "onMaskClose"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["render", _sfc_render$X], ["__scopeId", "data-v-9802168a"], ["__file", "E:/BankSystem/user/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue"]]);
  const props$f = {
    props: {
      // 是否展示工具条
      show: {
        type: Boolean,
        default: true
      },
      // 是否显示下边框
      showBorder: {
        type: Boolean,
        default: false
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确认"
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: "#909193"
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: "#3c9cff"
      },
      // 标题文字
      title: {
        type: String,
        default: ""
      },
      ...(_H = (_G = uni.$uv) == null ? void 0 : _G.props) == null ? void 0 : _H.toolbar
    }
  };
  const _sfc_main$X = {
    name: "uv-toolbar",
    emits: ["confirm", "cancel"],
    mixins: [mpMixin, mixin, props$f],
    methods: {
      // 点击取消按钮
      cancel() {
        this.$emit("cancel");
      },
      // 点击确定按钮
      confirm() {
        this.$emit("confirm");
      }
    }
  };
  function _sfc_render$W(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-toolbar", { "uv-border-bottom": _ctx.showBorder }]),
        onTouchmove: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop", "prevent"]))
      },
      [
        vue.createElementVNode("view", {
          class: "uv-toolbar__cancel__wrapper",
          "hover-class": "uv-hover-class"
        }, [
          vue.createElementVNode(
            "text",
            {
              class: "uv-toolbar__wrapper__cancel",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.cancel && $options.cancel(...args)),
              style: vue.normalizeStyle({
                color: _ctx.cancelColor
              })
            },
            vue.toDisplayString(_ctx.cancelText),
            5
            /* TEXT, STYLE */
          )
        ]),
        _ctx.title ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "uv-toolbar__title uv-line-1"
          },
          vue.toDisplayString(_ctx.title),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", {
          class: "uv-toolbar__confirm__wrapper",
          "hover-class": "uv-hover-class"
        }, [
          vue.createElementVNode(
            "text",
            {
              class: "uv-toolbar__wrapper__confirm",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.confirm && $options.confirm(...args)),
              style: vue.normalizeStyle({
                color: _ctx.confirmColor
              })
            },
            vue.toDisplayString(_ctx.confirmText),
            5
            /* TEXT, STYLE */
          )
        ])
      ],
      34
      /* CLASS, HYDRATE_EVENTS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$a = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["render", _sfc_render$W], ["__scopeId", "data-v-298cf9e4"], ["__file", "E:/BankSystem/user/uni_modules/uv-toolbar/components/uv-toolbar/uv-toolbar.vue"]]);
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    const startRGB = hexToRgb(startColor, false);
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];
    const endRGB = hexToRgb(endColor, false);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];
    const sR = (endR - startR) / step;
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;
    const colorArr = [];
    for (let i2 = 0; i2 < step; i2++) {
      let hex = rgbToHex(`rgb(${Math.round(sR * i2 + startR)},${Math.round(sG * i2 + startG)},${Math.round(sB * i2 + startB)})`);
      if (i2 === 0)
        hex = rgbToHex(startColor);
      if (i2 === step - 1)
        hex = rgbToHex(endColor);
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = String(sColor).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i2 = 1; i2 < 4; i2 += 1) {
          sColorNew += sColor.slice(i2, i2 + 1).concat(sColor.slice(i2, i2 + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i2 = 1; i2 < 7; i2 += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i2, i2 + 2)}`));
      }
      if (!str) {
        return sColorChange;
      }
      return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
    }
    if (/^(rgb|RGB)/.test(sColor)) {
      const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    }
    return sColor;
  }
  function rgbToHex(rgb) {
    const _this = rgb;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i2 = 0; i2 < aColor.length; i2++) {
        let hex = Number(aColor[i2]).toString(16);
        hex = String(hex).length == 1 ? `${0}${hex}` : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    }
    if (reg.test(_this)) {
      const aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      }
      if (aNum.length === 3) {
        let numHex = "#";
        for (let i2 = 0; i2 < aNum.length; i2 += 1) {
          numHex += aNum[i2] + aNum[i2];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  const props$e = {
    props: {
      // 是否显示组件
      show: {
        type: Boolean,
        default: true
      },
      // 颜色
      color: {
        type: String,
        default: "#909193"
      },
      // 提示文字颜色
      textColor: {
        type: String,
        default: "#909193"
      },
      // 文字和图标是否垂直排列
      vertical: {
        type: Boolean,
        default: false
      },
      // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
      mode: {
        type: String,
        default: "spinner"
      },
      // 图标大小，单位默认px
      size: {
        type: [String, Number],
        default: 24
      },
      // 文字大小
      textSize: {
        type: [String, Number],
        default: 15
      },
      // 文字样式
      textStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 文字内容
      text: {
        type: [String, Number],
        default: ""
      },
      // 动画模式 https://www.runoob.com/cssref/css3-pr-animation-timing-function.html
      timingFunction: {
        type: String,
        default: "linear"
      },
      // 动画执行周期时间
      duration: {
        type: [String, Number],
        default: 1200
      },
      // mode=circle时的暗边颜色
      inactiveColor: {
        type: String,
        default: ""
      },
      ...(_J = (_I = uni.$uv) == null ? void 0 : _I.props) == null ? void 0 : _J.loadingIcon
    }
  };
  const _sfc_main$W = {
    name: "uv-loading-icon",
    mixins: [mpMixin, mixin, props$e],
    data() {
      return {
        // Array.form可以通过一个伪数组对象创建指定长度的数组
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        array12: Array.from({
          length: 12
        }),
        // 这里需要设置默认值为360，否则在安卓nvue上，会延迟一个duration周期后才执行
        // 在iOS nvue上，则会一开始默认执行两个周期的动画
        aniAngel: 360,
        // 动画旋转角度
        webviewHide: false,
        // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
        loading: false
        // 是否运行中，针对nvue使用
      };
    },
    computed: {
      // 当为circle类型时，给其另外三边设置一个更轻一些的颜色
      // 之所以需要这么做的原因是，比如父组件传了color为红色，那么需要另外的三个边为浅红色
      // 而不能是固定的某一个其他颜色(因为这个固定的颜色可能浅蓝，导致效果没有那么细腻良好)
      otherBorderColor() {
        const lightColor = colorGradient(this.color, "#ffffff", 100)[80];
        if (this.mode === "circle") {
          return this.inactiveColor ? this.inactiveColor : lightColor;
        } else {
          return "transparent";
        }
      }
    },
    watch: {
      show(n2) {
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        setTimeout(() => {
          this.show && this.addEventListenerToWebview();
        }, 20);
      },
      // 监听webview的显示与隐藏
      addEventListenerToWebview() {
        const pages2 = getCurrentPages();
        const page2 = pages2[pages2.length - 1];
        const currentWebview = page2.$getAppWebview();
        currentWebview.addEventListener("hide", () => {
          this.webviewHide = true;
        });
        currentWebview.addEventListener("show", () => {
          this.webviewHide = false;
        });
      }
    }
  };
  function _sfc_render$V(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-loading-icon", [_ctx.vertical && "uv-loading-icon--vertical"]]),
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        !$data.webviewHide ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uv-loading-icon__spinner", [`uv-loading-icon__spinner--${_ctx.mode}`]]),
            ref: "ani",
            style: vue.normalizeStyle({
              color: _ctx.color,
              width: _ctx.$uv.addUnit(_ctx.size),
              height: _ctx.$uv.addUnit(_ctx.size),
              borderTopColor: _ctx.color,
              borderBottomColor: $options.otherBorderColor,
              borderLeftColor: $options.otherBorderColor,
              borderRightColor: $options.otherBorderColor,
              "animation-duration": `${_ctx.duration}ms`,
              "animation-timing-function": _ctx.mode === "semicircle" || _ctx.mode === "circle" ? _ctx.timingFunction : ""
            })
          },
          [
            _ctx.mode === "spinner" ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList($data.array12, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index2,
                  class: "uv-loading-icon__dot"
                });
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "uv-loading-icon__text",
            style: vue.normalizeStyle([{
              fontSize: _ctx.$uv.addUnit(_ctx.textSize),
              color: _ctx.textColor
            }, _ctx.$uv.addStyle(_ctx.textStyle)])
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["render", _sfc_render$V], ["__scopeId", "data-v-29b619ea"], ["__file", "E:/BankSystem/user/uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon.vue"]]);
  const props$d = {
    props: {
      // 是否显示遮罩
      show: {
        type: Boolean,
        default: false
      },
      // 层级z-index
      zIndex: {
        type: [String, Number],
        default: 10070
      },
      // 遮罩的过渡时间，单位为ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 不透明度值，当做rgba的第四个参数
      opacity: {
        type: [String, Number],
        default: 0.5
      },
      ...(_L = (_K = uni.$uv) == null ? void 0 : _K.props) == null ? void 0 : _L.overlay
    }
  };
  const _sfc_main$V = {
    name: "uv-overlay",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$d],
    watch: {
      show(newVal) {
      }
    },
    computed: {
      overlayStyle() {
        const style = {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: this.zIndex,
          bottom: 0,
          "background-color": `rgba(0, 0, 0, ${this.opacity})`
        };
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    methods: {
      clickHandler() {
        this.$emit("click");
      },
      clear() {
      }
    }
  };
  function _sfc_render$U(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_4$3);
    return vue.openBlock(), vue.createBlock(_component_uv_transition, {
      show: _ctx.show,
      mode: "fade",
      "custom-class": "uv-overlay",
      duration: _ctx.duration,
      "custom-style": $options.overlayStyle,
      onClick: $options.clickHandler,
      onTouchmove: vue.withModifiers($options.clear, ["stop", "prevent"])
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "duration", "custom-style", "onClick", "onTouchmove"]);
  }
  const __easycom_0$9 = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["render", _sfc_render$U], ["__scopeId", "data-v-7303e1aa"], ["__file", "E:/BankSystem/user/uni_modules/uv-overlay/components/uv-overlay/uv-overlay.vue"]]);
  const props$c = {
    props: {
      bgColor: {
        type: String,
        default: "transparent"
      }
    }
  };
  const _sfc_main$U = {
    name: "uv-status-bar",
    mixins: [mpMixin, mixin, props$c],
    data() {
      return {};
    },
    computed: {
      style() {
        const style = {};
        style.height = this.$uv.addUnit(this.$uv.sys().statusBarHeight, "px");
        if (this.bgColor) {
          if (this.bgColor.indexOf("gradient") > -1) {
            style.backgroundImage = this.bgColor;
          } else {
            style.background = this.bgColor;
          }
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$T(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$options.style]),
        class: "uv-status-bar"
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$6 = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["render", _sfc_render$T], ["__scopeId", "data-v-f5bd6f5a"], ["__file", "E:/BankSystem/user/uni_modules/uv-status-bar/components/uv-status-bar/uv-status-bar.vue"]]);
  const _sfc_main$T = {
    name: "uv-safe-bottom",
    mixins: [mpMixin, mixin],
    data() {
      return {
        safeAreaBottomHeight: 0,
        isNvue: false
      };
    },
    computed: {
      style() {
        const style = {};
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    mounted() {
    }
  };
  function _sfc_render$S(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-safe-bottom", [!$data.isNvue && "uv-safe-area-inset-bottom"]]),
        style: vue.normalizeStyle([$options.style])
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$S], ["__scopeId", "data-v-560f16b2"], ["__file", "E:/BankSystem/user/uni_modules/uv-safe-bottom/components/uv-safe-bottom/uv-safe-bottom.vue"]]);
  const _sfc_main$S = {
    name: "uv-popup",
    components: {},
    mixins: [mpMixin, mixin],
    emits: ["change", "maskClick"],
    props: {
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      mode: {
        type: String,
        default: "center"
      },
      // 动画时长，单位ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 层级
      zIndex: {
        type: [String, Number],
        default: 10075
      },
      bgColor: {
        type: String,
        default: "#ffffff"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      // 是否显示遮罩
      overlay: {
        type: Boolean,
        default: true
      },
      // 点击遮罩是否关闭弹窗
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 遮罩的透明度，0-1之间
      overlayOpacity: {
        type: [Number, String],
        default: 0.4
      },
      // 自定义遮罩的样式
      overlayStyle: {
        type: [Object, String],
        default: ""
      },
      // 是否为iPhoneX留出底部安全距离
      safeAreaInsetBottom: {
        type: Boolean,
        default: true
      },
      // 是否留出顶部安全距离（状态栏高度）
      safeAreaInsetTop: {
        type: Boolean,
        default: false
      },
      // 是否显示关闭图标
      closeable: {
        type: Boolean,
        default: false
      },
      // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
      closeIconPos: {
        type: String,
        default: "top-right"
      },
      // mode=center，也即中部弹出时，是否使用缩放模式
      zoom: {
        type: Boolean,
        default: true
      },
      round: {
        type: [Number, String],
        default: 0
      },
      ...(_N = (_M = uni.$uv) == null ? void 0 : _M.props) == null ? void 0 : _N.popup
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type2) {
          if (!this.config[type2])
            return;
          this[this.config[type2]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.mode]](true);
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        transitionStyle: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupClass: this.isDesktop ? "fixforpc-top" : "top",
        direction: ""
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.bgColor === "" || this.bgColor === "none" || this.$uv.getPx(this.round) > 0) {
          return "transparent";
        }
        return this.bgColor;
      },
      contentStyle() {
        const style = {};
        if (this.bgColor) {
          style.backgroundColor = this.bg;
        }
        if (this.round) {
          const value2 = this.$uv.addUnit(this.round);
          const mode = this.direction ? this.direction : this.mode;
          style.backgroundColor = this.bgColor;
          if (mode === "top") {
            style.borderBottomLeftRadius = value2;
            style.borderBottomRightRadius = value2;
          } else if (mode === "bottom") {
            style.borderTopLeftRadius = value2;
            style.borderTopRightRadius = value2;
          } else if (mode === "center") {
            style.borderRadius = value2;
          }
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    created() {
      this.messageChild = null;
      this.clearPropagation = false;
    },
    methods: {
      setH5Visible() {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      // TODO nvue 取消冒泡
      clear(e2) {
        e2.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.mode;
        } else {
          this.direction = direction;
        }
        if (!this.config[direction]) {
          return this.$uv.error(`缺少类型：${direction}`);
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type2) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.mode
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.closeOnClickOverlay)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type2) {
        this.popupClass = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.mode === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type2) {
        this.popupClass = "bottom";
        this.ani = ["slide-bottom"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: this.bg
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type2) {
        this.popupClass = "center";
        this.ani = this.zoom ? ["zoom-in", "fade"] : ["fade"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type2) {
        this.popupClass = "left";
        this.ani = ["slide-left"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type2) {
        this.popupClass = "right";
        this.ani = ["slide-right"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$R(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_overlay = resolveEasycom(vue.resolveDynamicComponent("uv-overlay"), __easycom_0$9);
    const _component_uv_status_bar = resolveEasycom(vue.resolveDynamicComponent("uv-status-bar"), __easycom_1$6);
    const _component_uv_safe_bottom = resolveEasycom(vue.resolveDynamicComponent("uv-safe-bottom"), __easycom_0$8);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_4$3);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-popup", [$data.popupClass, $options.isDesktop ? "fixforpc-z-index" : ""]]),
        style: vue.normalizeStyle([{ zIndex: $props.zIndex }])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[2] || (_cache[2] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            vue.createCommentVNode(" 遮罩层 "),
            $data.maskShow && $props.overlay ? (vue.openBlock(), vue.createBlock(_component_uv_overlay, {
              key: "1",
              show: $data.showTrans,
              duration: $props.duration,
              "custom-style": $props.overlayStyle,
              opacity: $props.overlayOpacity,
              zIndex: $props.zIndex,
              onClick: $options.onTap
            }, null, 8, ["show", "duration", "custom-style", "opacity", "zIndex", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uv_transition, {
              key: "2",
              mode: $data.ani,
              name: "content",
              "custom-style": $data.transitionStyle,
              duration: $props.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uv-popup__content", [$data.popupClass]]),
                    style: vue.normalizeStyle([$options.contentStyle]),
                    onClick: _cache[1] || (_cache[1] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    $props.safeAreaInsetTop ? (vue.openBlock(), vue.createBlock(_component_uv_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
                    $props.safeAreaInsetBottom ? (vue.openBlock(), vue.createBlock(_component_uv_safe_bottom, { key: 1 })) : vue.createCommentVNode("v-if", true),
                    $props.closeable ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 2,
                        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.close && $options.close(...args), ["stop"])),
                        class: vue.normalizeClass(["uv-popup__content__close", ["uv-popup__content__close--" + $props.closeIconPos]]),
                        "hover-class": "uv-popup__content__close--hover",
                        "hover-stay-time": "150"
                      },
                      [
                        vue.createVNode(_component_uv_icon, {
                          name: "close",
                          color: "#909399",
                          size: "18",
                          bold: ""
                        })
                      ],
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode", "custom-style", "duration", "show", "onClick"])
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$R], ["__scopeId", "data-v-01a3ad6e"], ["__file", "E:/BankSystem/user/uni_modules/uv-popup/components/uv-popup/uv-popup.vue"]]);
  const props$b = {
    props: {
      // 是否展示顶部的操作栏
      showToolbar: {
        type: Boolean,
        default: true
      },
      // 顶部标题
      title: {
        type: String,
        default: ""
      },
      // 弹窗圆角
      round: {
        type: [String, Number],
        default: 0
      },
      // 对象数组，设置每一列的数据
      columns: {
        type: Array,
        default: () => []
      },
      // 是否显示加载中状态
      loading: {
        type: Boolean,
        default: false
      },
      // 各列中，单个选项的高度
      itemHeight: {
        type: [String, Number],
        default: 44
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确定"
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: "#909193"
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: "#3c9cff"
      },
      // 文字颜色
      color: {
        type: String,
        default: ""
      },
      // 选中文字的颜色
      activeColor: {
        type: String,
        default: ""
      },
      // 每列中可见选项的数量
      visibleItemCount: {
        type: [String, Number],
        default: 5
      },
      // 选项对象中，需要展示的属性键名
      keyName: {
        type: String,
        default: "text"
      },
      // 是否允许点击遮罩关闭选择器
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 是否允许点击确认关闭选择器
      closeOnClickConfirm: {
        type: Boolean,
        default: true
      },
      // 各列的默认索引
      defaultIndex: {
        type: Array,
        default: () => []
      },
      // 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，只在微信2.21.1及以上有效
      immediateChange: {
        type: Boolean,
        default: true
      },
      ...(_P = (_O = uni.$uv) == null ? void 0 : _O.props) == null ? void 0 : _P.picker
    }
  };
  const _sfc_main$R = {
    name: "uv-picker",
    emits: ["confirm", "cancel", "close", "change"],
    mixins: [mpMixin, mixin, props$b],
    computed: {
      // 为了解决支付宝不生效
      textStyle() {
        return (index2, index1) => {
          const style = {};
          style.display = "block";
          if (this.color) {
            style.color = this.color;
          }
          if (this.activeColor && index1 === this.innerIndex[index2]) {
            style.color = this.activeColor;
          }
          return style;
        };
      }
    },
    data() {
      return {
        // 上一次选择的列索引
        lastIndex: [],
        // 索引值 ，对应picker-view的value
        innerIndex: [],
        // 各列的值
        innerColumns: [],
        // 上一次的变化列索引
        columnIndex: 0
      };
    },
    watch: {
      // 监听默认索引的变化，重新设置对应的值
      defaultIndex: {
        immediate: true,
        handler(n2) {
          this.setIndexs(n2, true);
        }
      },
      // 监听columns参数的变化
      columns: {
        deep: true,
        immediate: true,
        handler(n2) {
          this.setColumns(n2);
        }
      }
    },
    methods: {
      open() {
        this.$refs.pickerPopup.open();
      },
      close() {
        this.$refs.pickerPopup.close();
      },
      popupChange(e2) {
        if (!e2.show)
          this.$emit("close");
      },
      // 获取item需要显示的文字，判别为对象还是文本
      getItemText(item) {
        if (this.$uv.test.object(item)) {
          return item[this.keyName];
        } else {
          return item;
        }
      },
      // 点击工具栏的取消按钮
      cancel() {
        this.$emit("cancel");
        this.close();
      },
      // 点击工具栏的确定按钮
      confirm() {
        this.$emit("confirm", this.$uv.deepClone({
          indexs: this.innerIndex,
          value: this.innerColumns.map((item, index2) => item[this.innerIndex[index2]]),
          values: this.innerColumns
        }));
        if (this.closeOnClickConfirm) {
          this.close();
        }
      },
      // 选择器某一列的数据发生变化时触发
      changeHandler(e2) {
        const {
          value: value2
        } = e2.detail;
        let index2 = 0, columnIndex = 0;
        for (let i2 = 0; i2 < value2.length; i2++) {
          let item = value2[i2];
          if (item !== (this.lastIndex[i2] || 0)) {
            columnIndex = i2;
            index2 = item;
            break;
          }
        }
        this.columnIndex = columnIndex;
        const values = this.innerColumns;
        this.setLastIndex(value2);
        this.setIndexs(value2);
        this.$emit("change", {
          value: this.innerColumns.map((item, index3) => item[value2[index3]]),
          index: index2,
          indexs: value2,
          // values为当前变化列的数组内容
          values,
          columnIndex
        });
      },
      // 设置index索引，此方法可被外部调用设置
      setIndexs(index2, setLastIndex) {
        this.innerIndex = this.$uv.deepClone(index2);
        if (setLastIndex) {
          this.setLastIndex(index2);
        }
      },
      // 记录上一次的各列索引位置
      setLastIndex(index2) {
        this.lastIndex = this.$uv.deepClone(index2);
      },
      // 设置对应列选项的所有值
      setColumnValues(columnIndex, values) {
        this.innerColumns.splice(columnIndex, 1, values);
        let tmpIndex = this.$uv.deepClone(this.innerIndex);
        for (let i2 = 0; i2 < this.innerColumns.length; i2++) {
          if (i2 > this.columnIndex) {
            tmpIndex[i2] = 0;
          }
        }
        this.setIndexs(tmpIndex);
      },
      // 获取对应列的所有选项
      getColumnValues(columnIndex) {
        (async () => {
          await this.$uv.sleep();
        })();
        return this.innerColumns[columnIndex];
      },
      // 设置整体各列的columns的值
      setColumns(columns) {
        this.innerColumns = this.$uv.deepClone(columns);
        if (this.innerIndex.length === 0) {
          this.innerIndex = new Array(columns.length).fill(0);
        }
      },
      // 获取各列选中值对应的索引
      getIndexs() {
        return this.innerIndex;
      },
      // 获取各列选中的值
      getValues() {
        (async () => {
          await this.$uv.sleep();
        })();
        return this.innerColumns.map((item, index2) => item[this.innerIndex[index2]]);
      }
    }
  };
  function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_toolbar = resolveEasycom(vue.resolveDynamicComponent("uv-toolbar"), __easycom_0$a);
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_2$2);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_4);
    return vue.openBlock(), vue.createBlock(_component_uv_popup, {
      ref: "pickerPopup",
      mode: "bottom",
      round: _ctx.round,
      "close-on-click-overlay": _ctx.closeOnClickOverlay,
      onChange: $options.popupChange
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "uv-picker" }, [
          _ctx.showToolbar ? (vue.openBlock(), vue.createBlock(_component_uv_toolbar, {
            key: 0,
            cancelColor: _ctx.cancelColor,
            confirmColor: _ctx.confirmColor,
            cancelText: _ctx.cancelText,
            confirmText: _ctx.confirmText,
            title: _ctx.title,
            onCancel: $options.cancel,
            onConfirm: $options.confirm
          }, null, 8, ["cancelColor", "confirmColor", "cancelText", "confirmText", "title", "onCancel", "onConfirm"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("picker-view", {
            class: "uv-picker__view",
            indicatorStyle: `height: ${_ctx.$uv.addUnit(_ctx.itemHeight)}`,
            value: $data.innerIndex,
            immediateChange: _ctx.immediateChange,
            style: vue.normalizeStyle({
              height: `${_ctx.$uv.addUnit(_ctx.visibleItemCount * _ctx.itemHeight)}`
            }),
            onChange: _cache[0] || (_cache[0] = (...args) => $options.changeHandler && $options.changeHandler(...args))
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.innerColumns, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("picker-view-column", {
                  key: index2,
                  class: "uv-picker__view__column"
                }, [
                  _ctx.$uv.test.array(item) ? (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    { key: 0 },
                    vue.renderList(item, (item1, index1) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          class: "uv-picker__view__column__item uv-line-1",
                          key: index1,
                          style: vue.normalizeStyle([{
                            height: _ctx.$uv.addUnit(_ctx.itemHeight),
                            lineHeight: _ctx.$uv.addUnit(_ctx.itemHeight),
                            fontWeight: index1 === $data.innerIndex[index2] ? "bold" : "normal"
                          }, $options.textStyle(index2, index1)])
                        },
                        vue.toDisplayString($options.getItemText(item1)),
                        5
                        /* TEXT, STYLE */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )) : vue.createCommentVNode("v-if", true)
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 44, ["indicatorStyle", "value", "immediateChange"]),
          _ctx.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "uv-picker--loading"
          }, [
            vue.createVNode(_component_uv_loading_icon, { mode: "circle" })
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      _: 1
      /* STABLE */
    }, 8, ["round", "close-on-click-overlay", "onChange"]);
  }
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$Q], ["__scopeId", "data-v-f74a1703"], ["__file", "E:/BankSystem/user/uni_modules/uv-picker/components/uv-picker/uv-picker.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type2, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type2)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type2 === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type2}(${args + unit}) `;
      } else {
        styles.styles[type2] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type2) => {
    MPAnimation.prototype[type2] = function(...args) {
      this.animation[type2](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$Q = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i2 in styles) {
          let line = this.toLine(i2);
          transform += line + ":" + styles[i2] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i2 in obj) {
          try {
            if (typeof obj[i2] === "object") {
              this.animation[i2](...obj[i2]);
            } else {
              this.animation[i2](obj[i2]);
            }
          } catch (e2) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:143", `方法 ${i2} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type2) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type2) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type3, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type3)[mode];
          } else {
            styles.transform += this.animationType(type3)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type2, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type2, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type2) {
        let buildTranfrom = (type3, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type3 ? 0 : 1;
          } else {
            aniNum = type3 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type3 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type3 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type3 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type3 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type2, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type2, mode);
          });
        }
        return this.animation;
      },
      animationType(type2) {
        return {
          fade: type2 ? 1 : 0,
          "slide-top": `translateY(${type2 ? "0" : "-100%"})`,
          "slide-right": `translateX(${type2 ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type2 ? "0" : "100%"})`,
          "slide-left": `translateX(${type2 ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type2 ? 1 : 0.8}) scaleY(${type2 ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type2 ? 1 : 1.2}) scaleY(${type2 ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.isShow || $props.onceRender ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$P], ["__file", "E:/BankSystem/user/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$P = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type2) {
          if (!this.config[type2])
            return;
          this[this.config[type2]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: this.isDesktop ? "fixforpc-top" : "top"
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible() {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e2) {
        e2.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:279", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type2) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type2) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type2) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type2) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type2) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type2) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$6);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle({ backgroundColor: $options.bg }),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_7 = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$O], ["__scopeId", "data-v-4dd3c44b"], ["__file", "E:/BankSystem/user/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const props$a = {
    props: {
      // 键盘的类型，number-数字键盘，card-身份证键盘
      mode: {
        type: String,
        default: "number"
      },
      // 是否显示键盘的"."符号
      dotDisabled: {
        type: Boolean,
        default: false
      },
      // 是否打乱键盘按键的顺序
      random: {
        type: Boolean,
        default: false
      }
    }
  };
  const _sfc_main$O = {
    mixins: [mpMixin, mixin, props$a],
    emits: ["backspace", "change"],
    data() {
      return {
        backspace: "backspace",
        // 退格键内容
        dot: ".",
        // 点
        timer: null,
        // 长按多次删除的事件监听
        cardX: "X"
        // 身份证的X符号
      };
    },
    computed: {
      // 键盘需要显示的内容
      numList() {
        if (this.dotDisabled && this.mode == "number") {
          if (!this.random) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
          } else {
            return this.$uv.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
          }
        } else if (!this.dotDisabled && this.mode == "number") {
          if (!this.random) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0];
          } else {
            return this.$uv.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0]);
          }
        } else if (this.mode == "card") {
          if (!this.random) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0];
          } else {
            return this.$uv.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0]);
          }
        }
      },
      // 按键的样式，在非乱序&&数字键盘&&不显示点按钮时，index为9时，按键占位两个空间
      itemStyle() {
        return (index2) => {
          let style = {};
          if (this.mode == "number" && this.dotDisabled && index2 == 9)
            style.width = "464rpx";
          return style;
        };
      },
      // 是否让按键显示灰色，只在非乱序&&数字键盘&&且允许点按键的时候
      btnBgGray() {
        return (index2) => {
          if (!this.random && index2 == 9 && (this.mode != "number" || this.mode == "number" && !this.dotDisabled))
            return true;
          else
            return false;
        };
      }
    },
    created() {
    },
    methods: {
      // 点击退格键
      backspaceClick() {
        this.$emit("backspace");
        clearInterval(this.timer);
        this.timer = null;
        this.timer = setInterval(() => {
          this.$emit("backspace");
        }, 250);
      },
      clearTimer() {
        clearInterval(this.timer);
        this.timer = null;
      },
      // 获取键盘显示的内容
      keyboardClick(val) {
        if (!this.dotDisabled && val != this.dot && val != this.cardX)
          val = Number(val);
        this.$emit("change", val);
      }
    }
  };
  function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-keyboard",
        onTouchmove: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop", "prevent"]))
      },
      [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($options.numList, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "uv-keyboard__button-wrapper",
              key: index2
            }, [
              vue.createElementVNode("view", {
                class: "uv-keyboard__button-wrapper__button",
                style: vue.normalizeStyle([$options.itemStyle(index2)]),
                onClick: ($event) => $options.keyboardClick(item),
                "hover-class": "uv-hover-class",
                "hover-stay-time": 200
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uv-keyboard__button-wrapper__button__text" },
                  vue.toDisplayString(item),
                  1
                  /* TEXT */
                )
              ], 12, ["onClick"])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createElementVNode("view", { class: "uv-keyboard__button-wrapper" }, [
          vue.createElementVNode(
            "view",
            {
              class: "uv-keyboard__button-wrapper__button uv-keyboard__button-wrapper__button--gray",
              "hover-class": "uv-hover-class",
              "hover-stay-time": 200,
              onTouchstart: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.backspaceClick && $options.backspaceClick(...args), ["stop"])),
              onTouchend: _cache[1] || (_cache[1] = (...args) => $options.clearTimer && $options.clearTimer(...args))
            },
            [
              vue.createVNode(_component_uv_icon, {
                name: "backspace",
                color: "#303133",
                size: "28"
              })
            ],
            32
            /* HYDRATE_EVENTS */
          )
        ])
      ],
      32
      /* HYDRATE_EVENTS */
    );
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$N], ["__scopeId", "data-v-ac786518"], ["__file", "E:/BankSystem/user/uni_modules/uv-keyboard/components/uv-keyboard-number/uv-keyboard-number.vue"]]);
  const props$9 = {
    props: {
      // 是否打乱键盘按键的顺序
      random: {
        type: Boolean,
        default: false
      },
      // 输入一个中文后，是否自动切换到英文
      autoChange: {
        type: Boolean,
        default: false
      },
      // 被禁用的键
      disKeys: {
        type: Array,
        default: () => []
      },
      // 是否自定义abc
      customabc: {
        type: Boolean,
        default: false
      }
    }
  };
  const _sfc_main$N = {
    name: "uv-keyboard",
    mixins: [mpMixin, mixin, props$9],
    emits: ["backspace", "change", "changeCarInputMode"],
    data() {
      return {
        // 车牌输入时，abc=true为输入车牌号码，bac=false为输入省份中文简称
        abc: false
      };
    },
    computed: {
      areaList() {
        let data = [
          "京",
          "沪",
          "粤",
          "津",
          "冀",
          "豫",
          "云",
          "辽",
          "黑",
          "湘",
          "皖",
          "鲁",
          "苏",
          "浙",
          "赣",
          "鄂",
          "桂",
          "甘",
          "晋",
          "陕",
          "蒙",
          "吉",
          "闽",
          "贵",
          "渝",
          "川",
          "青",
          "琼",
          "宁",
          "挂",
          "藏",
          "港",
          "澳",
          "新",
          "使",
          "学"
        ];
        let tmp = [];
        if (this.random)
          data = this.$uv.randomArray(data);
        tmp[0] = data.slice(0, 10);
        tmp[1] = data.slice(10, 20);
        tmp[2] = data.slice(20, 30);
        tmp[3] = data.slice(30, 36);
        return tmp;
      },
      engKeyBoardList() {
        let data = [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          0,
          "Q",
          "W",
          "E",
          "R",
          "T",
          "Y",
          "U",
          "I",
          "O",
          "P",
          "A",
          "S",
          "D",
          "F",
          "G",
          "H",
          "J",
          "K",
          "L",
          "Z",
          "X",
          "C",
          "V",
          "B",
          "N",
          "M"
        ];
        let tmp = [];
        if (this.random)
          data = this.$uv.randomArray(data);
        tmp[0] = data.slice(0, 10);
        tmp[1] = data.slice(10, 20);
        tmp[2] = data.slice(20, 30);
        tmp[3] = data.slice(30, 36);
        return tmp;
      },
      isDisabled(i2, j) {
        return (i3, j2) => {
          let value2 = "";
          if (this.abc)
            value2 = this.engKeyBoardList[i3][j2];
          else
            value2 = this.areaList[i3][j2];
          return this.disKeys.indexOf(value2) > -1;
        };
      }
    },
    methods: {
      // 点击键盘按钮
      carInputClick(i2, j) {
        if (this.isDisabled(i2, j))
          return;
        let value2 = "";
        if (this.abc)
          value2 = this.engKeyBoardList[i2][j];
        else
          value2 = this.areaList[i2][j];
        if (!this.abc && this.autoChange)
          this.$uv.sleep(200).then(() => this.abc = true);
        this.$emit("change", value2);
      },
      // 修改汽车牌键盘的输入模式，中文|英文
      changeCarInputMode() {
        this.abc = !this.abc;
        this.$emit("changeCarInputMode", this.abc);
      },
      // 点击退格键
      backspaceClick() {
        this.$emit("backspace");
        clearInterval(this.timer);
        this.timer = null;
        this.timer = setInterval(() => {
          this.$emit("backspace");
        }, 250);
      },
      clearTimer() {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  };
  function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-keyboard",
        onTouchmove: _cache[3] || (_cache[3] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop", "prevent"]))
      },
      [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.abc ? $options.engKeyBoardList : $options.areaList, (group, i2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: i2,
              class: vue.normalizeClass(["uv-keyboard__button", [i2 + 1 === 4 && "uv-keyboard__button--center"]]),
              index: i2
            }, [
              i2 === 3 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uv-keyboard__button__inner-wrapper"
              }, [
                vue.createElementVNode("view", {
                  class: "uv-keyboard__button__inner-wrapper__left",
                  "hover-class": "uv-hover-class",
                  "hover-stay-time": 200,
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.changeCarInputMode && $options.changeCarInputMode(...args))
                }, [
                  vue.renderSlot(_ctx.$slots, "default", {}, () => [
                    !_ctx.customabc ? (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      { key: 0 },
                      [
                        vue.createElementVNode(
                          "text",
                          {
                            class: vue.normalizeClass(["uv-keyboard__button__inner-wrapper__left__lang", [!$data.abc && "uv-keyboard__button__inner-wrapper__left__lang--active"]])
                          },
                          "中",
                          2
                          /* CLASS */
                        ),
                        vue.createElementVNode("text", { class: "uv-keyboard__button__inner-wrapper__left__line" }, "/"),
                        vue.createElementVNode(
                          "text",
                          {
                            class: vue.normalizeClass(["uv-keyboard__button__inner-wrapper__left__lang", [$data.abc && "uv-keyboard__button__inner-wrapper__left__lang--active"]])
                          },
                          "英",
                          2
                          /* CLASS */
                        )
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : vue.createCommentVNode("v-if", true)
                  ], true)
                ])
              ])) : vue.createCommentVNode("v-if", true),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(group, (item, j) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "uv-keyboard__button__inner-wrapper",
                    key: j
                  }, [
                    vue.createElementVNode("view", {
                      class: vue.normalizeClass(["uv-keyboard__button__inner-wrapper__inner", { "uv-keyboard__button__inner-wrapper__inner--disabled": $options.isDisabled(i2, j) }]),
                      "hover-stay-time": 200,
                      onClick: ($event) => $options.carInputClick(i2, j),
                      "hover-class": $options.isDisabled(i2, j) ? "none" : "uv-hover-class"
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uv-keyboard__button__inner-wrapper__inner__text" },
                        vue.toDisplayString(item),
                        1
                        /* TEXT */
                      )
                    ], 10, ["onClick", "hover-class"]),
                    $options.isDisabled(i2, j) ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "uv-keyboard__button__inner-wrapper__disabled--mask"
                    })) : vue.createCommentVNode("v-if", true)
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              i2 === 3 ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 1,
                  onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.backspaceClick && $options.backspaceClick(...args)),
                  onTouchend: _cache[2] || (_cache[2] = (...args) => $options.clearTimer && $options.clearTimer(...args)),
                  class: "uv-keyboard__button__inner-wrapper"
                },
                [
                  vue.createElementVNode("view", {
                    class: "uv-keyboard__button__inner-wrapper__right",
                    "hover-class": "uv-hover-class",
                    "hover-stay-time": 200
                  }, [
                    vue.createVNode(_component_uv_icon, {
                      size: "28",
                      name: "backspace",
                      color: "#303133"
                    })
                  ])
                ],
                32
                /* HYDRATE_EVENTS */
              )) : vue.createCommentVNode("v-if", true)
            ], 10, ["index"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      32
      /* HYDRATE_EVENTS */
    );
  }
  const __easycom_1$5 = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$M], ["__scopeId", "data-v-3460c081"], ["__file", "E:/BankSystem/user/uni_modules/uv-keyboard/components/uv-keyboard-car/uv-keyboard-car.vue"]]);
  const props$8 = {
    props: {
      // 键盘的类型，number-数字键盘，card-身份证键盘，car-车牌号键盘
      mode: {
        type: String,
        default: "number"
      },
      // 是否显示键盘的"."符号
      dotDisabled: {
        type: Boolean,
        default: false
      },
      // 是否显示顶部工具条
      tooltip: {
        type: Boolean,
        default: true
      },
      // 是否显示工具条中间的提示
      showTips: {
        type: Boolean,
        default: true
      },
      // 工具条中间的提示文字
      tips: {
        type: String,
        default: ""
      },
      // 是否显示工具条左边的"取消"按钮
      showCancel: {
        type: Boolean,
        default: true
      },
      // 是否显示工具条右边的"完成"按钮
      showConfirm: {
        type: Boolean,
        default: true
      },
      // 是否打乱键盘按键的顺序
      random: {
        type: Boolean,
        default: false
      },
      // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
      safeAreaInsetBottom: {
        type: Boolean,
        default: true
      },
      // 是否允许通过点击遮罩关闭键盘
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 是否允许点击确认按钮关闭组件
      closeOnClickConfirm: {
        type: Boolean,
        default: true
      },
      // 是否显示遮罩，某些时候数字键盘时，用户希望看到自己的数值，所以可能不想要遮罩
      overlay: {
        type: Boolean,
        default: true
      },
      // z-index值
      zIndex: {
        type: [String, Number],
        default: 10075
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确定"
      },
      // 输入一个中文后，是否自动切换到英文
      autoChange: {
        type: Boolean,
        default: false
      },
      // 被禁用的键
      disKeys: {
        type: Array,
        default: () => []
      },
      // 是否自定义abc
      customabc: {
        type: Boolean,
        default: false
      },
      ...(_R = (_Q = uni.$uv) == null ? void 0 : _Q.props) == null ? void 0 : _R.keyboard
    }
  };
  const _sfc_main$M = {
    name: "uv-keyboard",
    mixins: [mpMixin, mixin, props$8],
    emits: ["close", "change", "confirm", "cancel", "backspace", "changeCarInputMode"],
    methods: {
      open() {
        this.$refs.keyboardPopup.open();
      },
      close() {
        this.$refs.keyboardPopup.close();
      },
      popupChange(e2) {
        if (!e2.show)
          this.$emit("close");
      },
      change(e2) {
        this.$emit("change", e2);
      },
      // 输入完成
      onConfirm() {
        this.$emit("confirm");
        if (this.closeOnClickConfirm)
          this.close();
      },
      // 取消输入
      onCancel() {
        this.$emit("cancel");
        this.close();
      },
      // 退格键
      backspace() {
        this.$emit("backspace");
      },
      // car模式切换中文|英文方法
      changeCarInputMode(e2) {
        this.$emit("changeCarInputMode", e2);
      },
      changeCarMode() {
        this.$refs.uvKeyboardCarRef && this.$refs.uvKeyboardCarRef.changeCarInputMode();
      }
    }
  };
  function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_keyboard_number = resolveEasycom(vue.resolveDynamicComponent("uv-keyboard-number"), __easycom_0$5);
    const _component_uv_keyboard_car = resolveEasycom(vue.resolveDynamicComponent("uv-keyboard-car"), __easycom_1$5);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_4);
    return vue.openBlock(), vue.createBlock(_component_uv_popup, {
      ref: "keyboardPopup",
      mode: "bottom",
      overlay: _ctx.overlay,
      closeOnClickOverlay: _ctx.closeOnClickOverlay,
      safeAreaInsetBottom: _ctx.safeAreaInsetBottom,
      zIndex: _ctx.zIndex,
      customStyle: { backgroundColor: "rgb(214, 218, 220)" },
      onChange: $options.popupChange
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "uv-keyboard" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
          _ctx.tooltip ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uv-keyboard__tooltip"
          }, [
            vue.createElementVNode("view", {
              "hover-class": "uv-hover-class",
              "hover-stay-time": 100
            }, [
              _ctx.showCancel ? (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 0,
                  class: "uv-keyboard__tooltip__item uv-keyboard__tooltip__cancel",
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.onCancel && $options.onCancel(...args))
                },
                vue.toDisplayString(_ctx.showCancel && _ctx.cancelText),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("view", null, [
              _ctx.showTips ? (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 0,
                  class: "uv-keyboard__tooltip__item uv-keyboard__tooltip__tips"
                },
                vue.toDisplayString(_ctx.tips ? _ctx.tips : _ctx.mode == "number" ? "数字键盘" : _ctx.mode == "card" ? "身份证键盘" : "车牌号键盘"),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("view", {
              "hover-class": "uv-hover-class",
              "hover-stay-time": 100
            }, [
              _ctx.showConfirm ? (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 0,
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
                  class: "uv-keyboard__tooltip__item uv-keyboard__tooltip__submit",
                  "hover-class": "uv-hover-class"
                },
                vue.toDisplayString(_ctx.showConfirm && _ctx.confirmText),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ])
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.mode == "number" || _ctx.mode == "card" ? (vue.openBlock(), vue.createBlock(_component_uv_keyboard_number, {
            key: 1,
            random: _ctx.random,
            onBackspace: $options.backspace,
            onChange: $options.change,
            mode: _ctx.mode,
            dotDisabled: _ctx.dotDisabled
          }, null, 8, ["random", "onBackspace", "onChange", "mode", "dotDisabled"])) : (vue.openBlock(), vue.createBlock(_component_uv_keyboard_car, {
            key: 2,
            ref: "uvKeyboardCarRef",
            random: _ctx.random,
            autoChange: _ctx.autoChange,
            disKeys: _ctx.disKeys,
            customabc: _ctx.customabc,
            onBackspace: $options.backspace,
            onChange: $options.change,
            onChangeCarInputMode: $options.changeCarInputMode
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "abc", {}, void 0, true)
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["random", "autoChange", "disKeys", "customabc", "onBackspace", "onChange", "onChangeCarInputMode"]))
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["overlay", "closeOnClickOverlay", "safeAreaInsetBottom", "zIndex", "customStyle", "onChange"]);
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$L], ["__scopeId", "data-v-7eb5d0db"], ["__file", "E:/BankSystem/user/uni_modules/uv-keyboard/components/uv-keyboard/uv-keyboard.vue"]]);
  const _sfc_main$L = {
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        totalPage: 1,
        show: false,
        selectedDate: 1,
        //约定1为近一周，2为一个月，3为三个月
        dateStart: "",
        dateEnd: "",
        moneyStart: "0.00",
        moneyEnd: "99999999999.99",
        cardText: "全部账户",
        cardId: null,
        payee: null,
        selectedAll: true,
        selectedScc: false,
        selectedFail: false,
        recordItem: [],
        cardItem: [{
          account: "",
          class: "全部账户",
          id: null
        }],
        cardPicker: [[]]
      };
    },
    computed: {
      currentDate: function() {
        return this.formattedDate((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 1, (/* @__PURE__ */ new Date()).getDate());
      },
      defaultDateStart: function() {
        const [year, month, day] = this.currentDate.split("-");
        const date2 = new Date(year, month - 1, day);
        const oneWeekAgo = new Date(date2.setDate(date2.getDate() - 7));
        return this.formattedDate(oneWeekAgo.getFullYear(), oneWeekAgo.getMonth() + 1, oneWeekAgo.getDate());
      },
      payeeName: function() {
        return isNaN(this.payee) ? this.payee : null;
      },
      payeePhone: function() {
        return isNaN(this.payee) ? null : this.payee;
      },
      status: function() {
        if (this.selectedAll)
          return "0";
        else if (this.selectedScc)
          return "1";
        else
          return "2";
      }
    },
    methods: {
      getScrollHeight() {
        let sys2 = uni.getSystemInfoSync();
        let winWidth = sys2.windowWidth;
        let winrate = 750 / winWidth;
        let winHeight = parseInt(sys2.windowHeight * winrate);
        return winHeight - 20;
      },
      loadMore() {
        if (this.pageNum < this.totalPage) {
          this.pageNum++;
          this.requestTransferRecord();
        }
      },
      requestTransferRecord() {
        let that = this;
        uni.getStorage({
          key: "token",
          success: function(res) {
            let _token = res.data;
            uni.showLoading({
              title: "",
              mask: true
            });
            uni.request({
              url: "https://120.55.37.93/query/transferRecord?pageNum=" + that.pageNum + "&pageSize=" + that.pageSize,
              method: "POST",
              header: {
                "token": _token
              },
              data: {
                "startTime": that.dateStart + " 00:00:00",
                "endTime": that.dateEnd + " 23:59:59",
                "cardId": that.cardId,
                "miniAmount": that.moneyStart,
                "maxAmount": that.moneyEnd,
                "payeeName": that.payeeName,
                "payeePhoneNumber": this.payeePhone,
                "status": that.status
              },
              success: function(res2) {
                formatAppLog("log", "at pages/transferRecord/transferRecord.vue:181", res2);
                if (res2.data.code == 200) {
                  formatAppLog("log", "at pages/transferRecord/transferRecord.vue:184", res2);
                  that.totalPage = res2.data.data.totalPage;
                  res2.data.data.list.forEach((item) => {
                    let temp = { "name": "", "amount": "", "date": "", "class": "", "id": "", "payerCardNumber": "" };
                    temp.name = item.payerName;
                    temp.amount = parseFloat(item.transferAmount).toFixed(2);
                    temp.date = item.transferTime;
                    temp.class = item.statusComments;
                    temp.id = item.transactionId;
                    temp.payerCardNumber = item.payerCardNumber;
                    that.recordItem.push(temp);
                  });
                }
                uni.hideLoading();
              },
              fail: function(error2) {
                uni.hideLoading();
                uni.showToast({
                  title: "错误，稍后再试",
                  icon: "error",
                  duration: 2e3
                });
              }
            });
          }
        });
      },
      requestCard() {
        let that = this;
        uni.getStorage({
          key: "token",
          success: function(res) {
            let _token = res.data;
            uni.showLoading({
              title: "",
              mask: true
            });
            uni.request({
              url: "https://120.55.37.93/query/bankCard",
              method: "GET",
              header: {
                "token": _token
              },
              data: {},
              success: function(res2) {
                if (res2.data.code == 200) {
                  res2.data.data.forEach((item) => {
                    let temp = { account: "", id: "", class: "借记卡" };
                    temp.account = item.cardNumber;
                    temp.id = item.id;
                    that.cardItem.push(temp);
                  });
                  that.requestTransferRecord();
                }
                uni.hideLoading();
              },
              fail: function(error2) {
                uni.hideLoading();
                uni.showToast({
                  title: "错误，稍后再试",
                  icon: "error",
                  duration: 2e3
                });
              }
            });
          }
        });
      },
      clickRecord(index2) {
        let that = this;
        uni.navigateTo({
          url: "/pages/transferDetail/transferDetail",
          success: function(res) {
            res.eventChannel.emit("transferDetail", that.recordItem[index2].id);
          }
        });
      },
      openScreen() {
        this.show = true;
        this.$refs.popup.open();
      },
      cancel() {
        this.$refs.popup.close();
      },
      formattedDate(year, month, day) {
        const formattedMonth = month < 10 ? "0" + month : month;
        const formattedDay = day < 10 ? "0" + day : day;
        return `${year}-${formattedMonth}-${formattedDay}`;
      },
      clickOneWeek() {
        this.selectedDate = 1;
        this.dateEnd = this.currentDate;
        var date2 = new Date(this.dateEnd);
        date2.setDate(date2.getDate() - 7);
        this.dateStart = date2.toISOString().slice(0, 10);
      },
      clickOneMonth() {
        this.selectedDate = 2;
        this.dateEnd = this.currentDate;
        var date2 = new Date(this.dateEnd);
        date2.setMonth(date2.getMonth() - 1);
        this.dateStart = date2.toISOString().slice(0, 10);
      },
      clickThreeMonth() {
        this.selectedDate = 3;
        this.dateEnd = this.currentDate;
        var date2 = new Date(this.dateEnd);
        date2.setMonth(date2.getMonth() - 3);
        this.dateStart = date2.toISOString().slice(0, 10);
      },
      buttonCard() {
        this.cardPicker = [[]];
        let index2 = 0;
        this.cardItem.forEach((item) => {
          if (index2)
            this.cardPicker[0].push(item.class + "(" + item.account.slice(-4) + ")");
          else
            this.cardPicker[0].push(item.class);
          index2++;
        });
        this.$refs.picker.open();
      },
      cardConfirm(e2) {
        this.cardText = e2.value[0];
        this.cardId = this.cardItem[e2.indexs[0]].id;
      },
      dateStartChange(e2) {
        if (this.dateStart > this.dateEnd) {
          uni.showToast({
            title: "日期范围有误",
            icon: "error"
          });
          this.dateStart = this.defaultDateStart;
        }
      },
      dateEndChange(e2) {
        if (this.dateEnd > this.currentDate) {
          uni.showToast({
            title: "超过当前日期",
            icon: "error"
          });
          this.dateEnd = this.currentDate;
        }
        if (this.dateStart > this.dateEnd) {
          uni.showToast({
            title: "日期范围有误",
            icon: "error"
          });
          this.dateEnd = this.currentDate;
        }
      },
      inputStartMoney() {
        this.$refs.keyboardStart.open();
      },
      inputEndMoney() {
        this.$refs.keyboardEnd.open();
      },
      startMoneyNorm() {
        this.moneyStart = parseFloat(this.moneyStart).toFixed(2);
      },
      endMoneyNorm() {
        this.moneyEnd = parseFloat(this.moneyEnd).toFixed(2);
      },
      moneyInPut(obj) {
        if (obj.s == "" && obj.val == ".") {
          obj.s = "0.";
        }
        if (obj.s == "0" && obj.val != ".")
          ;
        else {
          if (obj.s.includes(".")) {
            var match = obj.s.match(/\.\d*$/);
            let num = match ? match[0].length - 1 : 0;
            if (obj.val == ".")
              ;
            else if (num == 2)
              ;
            else
              obj.s += obj.val;
          } else
            obj.s += obj.val;
        }
        return obj.s;
      },
      keyboardStartChange(val) {
        let obj = { "s": this.moneyStart, "val": val };
        this.moneyInPut(obj);
        this.moneyStart = obj.s;
      },
      keyboardEndChange(val) {
        let obj = { "s": this.moneyEnd, "val": val };
        this.moneyInPut(obj);
        this.moneyEnd = obj.s;
      },
      startBackSpace() {
        if (this.moneyStart.length)
          this.moneyStart = this.moneyStart.substr(0, this.moneyStart.length - 1);
      },
      endBackSpace() {
        if (this.moneyEnd.length)
          this.moneyEnd = this.moneyEnd.substr(0, this.moneyEnd.length - 1);
      },
      inputPayee(val) {
        this.payee = val;
      },
      selectAll() {
        this.selectedAll = true;
        this.selectedScc = false;
        this.selectedFail = false;
      },
      selectScc() {
        this.selectedAll = false;
        this.selectedScc = true;
        this.selectedFail = false;
      },
      selectFail() {
        this.selectedAll = false;
        this.selectedScc = false;
        this.selectedFail = true;
      },
      clickReset() {
        this.dateStart = this.defaultDateStart;
        this.dateEnd = this.currentDate;
        this.selectedDate = 1;
        this.moneyStart = "0.00";
        this.moneyEnd = "99999999999.99";
        this.payee = null;
        this.selectAll();
      },
      clickConfirm() {
        this.pageNum = 1;
        this.recordItem = [];
        this.requestTransferRecord();
        this.$refs.popup.close();
      }
    },
    onLoad(option) {
      formatAppLog("log", "at pages/transferRecord/transferRecord.vue:417", option);
      this.dateEnd = this.currentDate;
      this.dateStart = this.defaultDateStart;
      let that = this;
      this.cardId = option.cardId;
      that.requestCard();
    }
  };
  function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_divider = resolveEasycom(vue.resolveDynamicComponent("uv-divider"), __easycom_0$b);
    const _component_uni_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("uni-datetime-picker"), __easycom_3$1);
    const _component_uv_picker = resolveEasycom(vue.resolveDynamicComponent("uv-picker"), __easycom_0$7);
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0$d);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_7);
    const _component_uv_keyboard = resolveEasycom(vue.resolveDynamicComponent("uv-keyboard"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "screen-button-box" }, [
        vue.createElementVNode("view", { class: "column1" }, "查询结果"),
        vue.createElementVNode("view", {
          class: "column2",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.openScreen && $options.openScreen(...args))
        }, [
          vue.createElementVNode("text", null, "筛选"),
          vue.createVNode(_component_uv_icon, {
            name: "/static/icon/icon_screen.svg",
            size: "22"
          })
        ])
      ]),
      $data.recordItem.length > 0 ? (vue.openBlock(), vue.createElementBlock(
        "scroll-view",
        {
          key: 0,
          "scroll-y": "true",
          onScrolltolower: _cache[1] || (_cache[1] = ($event) => $options.loadMore()),
          style: vue.normalizeStyle({ height: $options.getScrollHeight() + "rpx" })
        },
        [
          vue.createElementVNode("view", { class: "record-box" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.recordItem, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index2,
                  class: "record-item",
                  onClick: ($event) => $options.clickRecord(index2)
                }, [
                  vue.createElementVNode("view", { class: "column1" }, [
                    vue.createElementVNode(
                      "view",
                      null,
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { style: { "margin-top": "10rpx", "color": "#A8A8A8", "font-size": "0.8em" } },
                      "尾号(" + vue.toDisplayString(item.payerCardNumber) + ")",
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "column2" }, [
                    item.class == "交易成功" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      style: { "display": "flex" }
                    }, [
                      vue.createVNode(_component_uv_icon, { name: "/static/icon/icon_success.svg" }),
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(item.class),
                        1
                        /* TEXT */
                      )
                    ])) : (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      style: { "display": "flex" }
                    }, [
                      vue.createVNode(_component_uv_icon, { name: "/static/icon/icon_fail.svg" }),
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(item.class),
                        1
                        /* TEXT */
                      )
                    ])),
                    vue.createElementVNode(
                      "view",
                      { style: { "color": "#A8A8A8" } },
                      vue.toDisplayString(item.date),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { style: { "font-weight": "bold" } },
                      "人民币元 " + vue.toDisplayString(item.amount),
                      1
                      /* TEXT */
                    )
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ],
        36
        /* STYLE, HYDRATE_EVENTS */
      )) : vue.createCommentVNode("v-if", true),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "popup",
          type: "right",
          "background-color": "#ffffff",
          style: { "position": "relative" }
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", {
                style: { "margin-right": "20rpx", "display": "flex", "justify-content": "flex-end", "color": "red", "padding-left": "500rpx", "font-weight": "bold" },
                onClick: _cache[2] || (_cache[2] = (...args) => $options.cancel && $options.cancel(...args))
              }, "取消")
            ]),
            vue.createVNode(_component_uv_divider),
            vue.createElementVNode("view", { style: { "font-weight": "bold", "margin-left": "20rpx", "margin-top": "30rpx" } }, "交易日期"),
            vue.createElementVNode("view", { style: { "margin-top": "30rpx", "display": "flex", "justify-content": "space-around" } }, [
              vue.createElementVNode(
                "button",
                {
                  class: vue.normalizeClass($data.selectedDate == 1 ? "date-selected" : "date-unselected"),
                  onClick: _cache[3] || (_cache[3] = (...args) => $options.clickOneWeek && $options.clickOneWeek(...args))
                },
                "近1周",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "button",
                {
                  class: vue.normalizeClass($data.selectedDate == 2 ? "date-selected" : "date-unselected"),
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.clickOneMonth && $options.clickOneMonth(...args))
                },
                "近1月",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "button",
                {
                  class: vue.normalizeClass($data.selectedDate == 3 ? "date-selected" : "date-unselected"),
                  onClick: _cache[5] || (_cache[5] = (...args) => $options.clickThreeMonth && $options.clickThreeMonth(...args))
                },
                "近3月",
                2
                /* CLASS */
              )
            ]),
            vue.createElementVNode("view", { style: { "margin-top": "30rpx", "display": "flex", "justify-content": "space-between" } }, [
              vue.createElementVNode("view", null, [
                vue.createVNode(_component_uni_datetime_picker, {
                  modelValue: $data.dateStart,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.dateStart = $event),
                  type: "date",
                  onChange: $options.dateStartChange,
                  style: { "margin-left": "60rpx" }
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(
                      vue.toDisplayString($data.dateStart),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["modelValue", "onChange"])
              ]),
              vue.createElementVNode("view", null, "-"),
              vue.createElementVNode("view", null, [
                vue.createVNode(_component_uni_datetime_picker, {
                  modelValue: $data.dateEnd,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.dateEnd = $event),
                  type: "date",
                  onChange: $options.dateEndChange,
                  style: { "margin-right": "60rpx" }
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(
                      vue.toDisplayString($data.dateEnd),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["modelValue", "onChange"])
              ])
            ]),
            vue.createVNode(_component_uv_divider),
            vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "space-between" } }, [
              vue.createElementVNode("view", { style: { "margin-left": "20rpx", "font-weight": "bold" } }, "付款账户"),
              vue.createElementVNode("view", {
                style: { "display": "flex" },
                onClick: _cache[8] || (_cache[8] = (...args) => $options.buttonCard && $options.buttonCard(...args))
              }, [
                vue.createElementVNode(
                  "view",
                  null,
                  vue.toDisplayString($data.cardText),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_uv_icon, { name: "arrow-right" })
              ]),
              vue.createVNode(_component_uv_picker, {
                ref: "picker",
                columns: $data.cardPicker,
                onConfirm: $options.cardConfirm
              }, null, 8, ["columns", "onConfirm"])
            ]),
            vue.createVNode(_component_uv_divider),
            vue.createElementVNode("view", { style: { "margin-top": "30rpx", "display": "flex", "justify-content": "space-between" } }, [
              vue.createElementVNode("view", null, [
                vue.createElementVNode(
                  "text",
                  {
                    style: { "margin-left": "60rpx" },
                    onClick: _cache[9] || (_cache[9] = (...args) => $options.inputStartMoney && $options.inputStartMoney(...args))
                  },
                  vue.toDisplayString($data.moneyStart),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", null, "-"),
              vue.createElementVNode("view", null, [
                vue.createElementVNode(
                  "text",
                  {
                    style: { "margin-right": "60rpx" },
                    onClick: _cache[10] || (_cache[10] = (...args) => $options.inputEndMoney && $options.inputEndMoney(...args))
                  },
                  vue.toDisplayString($data.moneyEnd),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createVNode(_component_uv_divider),
            vue.createElementVNode("view", { style: { "font-weight": "bold", "margin-left": "20rpx", "margin-bottom": "20rpx" } }, "收款人"),
            vue.createVNode(_component_uv_input, {
              placeholder: "请输入收款人姓名/账号",
              border: "bottom",
              inputAlign: "center",
              modelValue: $data.payee,
              "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.payee = $event),
              clearable: "",
              onInput: $options.inputPayee
            }, null, 8, ["modelValue", "onInput"]),
            vue.createElementVNode("view", { style: { "font-weight": "bold", "margin-left": "20rpx", "margin-top": "30rpx" } }, "交易状态"),
            vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "space-between", "margin-top": "30rpx" } }, [
              vue.createElementVNode("view", null, [
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass($data.selectedAll ? "bottom-selected" : "bottom-unselected"),
                    onClick: _cache[12] || (_cache[12] = (...args) => $options.selectAll && $options.selectAll(...args)),
                    style: { "margin-left": "20rpx" }
                  },
                  "全部",
                  2
                  /* CLASS */
                )
              ]),
              vue.createElementVNode("view", null, [
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass($data.selectedScc ? "bottom-selected" : "bottom-unselected"),
                    onClick: _cache[13] || (_cache[13] = (...args) => $options.selectScc && $options.selectScc(...args))
                  },
                  "交易成功",
                  2
                  /* CLASS */
                )
              ]),
              vue.createElementVNode("view", null, [
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass($data.selectedFail ? "bottom-selected" : "bottom-unselected"),
                    onClick: _cache[14] || (_cache[14] = (...args) => $options.selectFail && $options.selectFail(...args)),
                    style: { "margin-right": "20rpx" }
                  },
                  "交易失败",
                  2
                  /* CLASS */
                )
              ])
            ]),
            vue.createElementVNode("view", { style: { "position": "absolute", "bottom": "0", "display": "flex", "justify-content": "space-between" } }, [
              vue.createElementVNode("button", {
                class: "resetButton",
                onClick: _cache[15] || (_cache[15] = (...args) => $options.clickReset && $options.clickReset(...args))
              }, "重置"),
              vue.createElementVNode("button", {
                class: "confirmButton",
                onClick: _cache[16] || (_cache[16] = (...args) => $options.clickConfirm && $options.clickConfirm(...args))
              }, "确认")
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(_component_uv_keyboard, {
        ref: "keyboardStart",
        mode: "number",
        showCancel: false,
        closeOnClickOverlay: false,
        onChange: $options.keyboardStartChange,
        onBackspace: $options.startBackSpace,
        onConfirm: $options.startMoneyNorm
      }, null, 8, ["onChange", "onBackspace", "onConfirm"]),
      vue.createVNode(_component_uv_keyboard, {
        ref: "keyboardEnd",
        mode: "number",
        showCancel: false,
        closeOnClickOverlay: false,
        onChange: $options.keyboardEndChange,
        onBackspace: $options.endBackSpace,
        onConfirm: $options.endMoneyNorm
      }, null, 8, ["onChange", "onBackspace", "onConfirm"])
    ]);
  }
  const PagesTransferRecordTransferRecord = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$K], ["__file", "E:/BankSystem/user/pages/transferRecord/transferRecord.vue"]]);
  const _sfc_main$K = {
    data() {
      return {
        transactionId: "",
        record: {
          id: "",
          date: "",
          amount: "",
          //balance:"",
          name: "",
          account: "",
          otherName: "",
          otherAccount: "",
          class: "",
          postscript: ""
        }
      };
    },
    onLoad(option) {
      let that = this;
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on("transferDetail", function(data) {
        that.transactionId = data;
        uni.getStorage({
          key: "token",
          success: function(res) {
            let _token = res.data;
            uni.showLoading({
              title: "",
              mask: true
            });
            uni.request({
              url: "https://120.55.37.93/query/transferRecordDetail?transactionId=" + that.transactionId,
              method: "GET",
              header: {
                "token": _token
              },
              success: function(res2) {
                if (res2.data.code == 200) {
                  res2 = res2.data.data;
                  that.record.id = res2.transactionId;
                  that.record.date = res2.transferTime;
                  that.record.amount = parseFloat(res2.amount).toFixed(2);
                  that.record.name = res2.receiverName;
                  that.record.account = res2.receiverCardNumber;
                  that.record.otherName = res2.senderName;
                  that.record.otherAccount = res2.senderCardNumber;
                  that.record.postscript = res2.postscript;
                  that.record.class = res2.status == 1 ? "交易成功" : "交易失败";
                }
                uni.hideLoading();
              },
              fail: function(error2) {
                uni.hideLoading();
                uni.showToast({
                  title: "错误，稍后再试",
                  icon: "error",
                  duration: 2e3
                });
              }
            });
          }
        });
      });
    }
  };
  function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_col = resolveEasycom(vue.resolveDynamicComponent("uv-col"), __easycom_1$8);
    const _component_uv_row = resolveEasycom(vue.resolveDynamicComponent("uv-row"), __easycom_2$4);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { style: { "background-color": "#FFFFFF" } }, [
        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "space-between" } }, [
          vue.createElementVNode("view", { style: { "margin-left": "20rpx" } }, "转账金额（人民币元）"),
          $data.record.class == "交易成功" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            style: { "display": "flex", "margin-right": "20rpx" }
          }, [
            vue.createVNode(_component_uv_icon, { name: "/static/icon/icon_success.svg" }),
            vue.createElementVNode(
              "view",
              null,
              vue.toDisplayString($data.record.class),
              1
              /* TEXT */
            )
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            style: { "display": "flex" }
          }, [
            vue.createVNode(_component_uv_icon, { name: "/static/icon/icon_fail.svg" }),
            vue.createElementVNode(
              "view",
              null,
              vue.toDisplayString($data.record.class),
              1
              /* TEXT */
            )
          ]))
        ]),
        vue.createElementVNode(
          "view",
          { style: { "margin-left": "20rpx", "font-size": "1.5em", "font-weight": "bold", "margin-top": "40rpx" } },
          vue.toDisplayString($data.record.amount),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { style: { "height": "60rpx" } })
      ]),
      vue.createElementVNode("view", { style: { "margin-top": "20rpx", "background-color": "#FFFFFF" } }, [
        vue.createElementVNode("view", { style: { "height": "1rpx" } }),
        vue.createVNode(_component_uv_row, { class: "item" }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_col, { span: "5" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "left" }, "收款人名称")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_col, { span: "7" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  { class: "right" },
                  vue.toDisplayString($data.record.otherName),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_uv_row, { class: "item" }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_col, { span: "5" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "left" }, "收款账号")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_col, { span: "7" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  { class: "right" },
                  vue.toDisplayString($data.record.otherAccount),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_uv_row, { class: "item" }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_col, { span: "5" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "left" }, "附言")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_col, { span: "7" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  { class: "right" },
                  vue.toDisplayString($data.record.postscript),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_uv_row, { class: "item" }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_col, { span: "5" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "left" }, "付款账户")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_col, { span: "7" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  { class: "right" },
                  vue.toDisplayString($data.record.name) + " " + vue.toDisplayString($data.record.account),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_uv_row, { class: "item" }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_col, { span: "5" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "left" }, "交易序号")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_col, { span: "7" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  { class: "right" },
                  vue.toDisplayString($data.record.id),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_uv_row, { class: "item" }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_col, { span: "5" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "left" }, "交易时间")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_col, { span: "7" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  { class: "right" },
                  vue.toDisplayString($data.record.date),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("view", { style: { "height": "1rpx" } })
      ])
    ]);
  }
  const PagesTransferDetailTransferDetail = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$J], ["__file", "E:/BankSystem/user/pages/transferDetail/transferDetail.vue"]]);
  const props$7 = {
    props: {
      // 是否显示圆点
      isDot: {
        type: Boolean,
        default: false
      },
      // 显示的内容
      value: {
        type: [Number, String],
        default: ""
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      // 最大值，超过最大值会显示 '{max}+'
      max: {
        type: [Number, String],
        default: 999
      },
      // 主题类型，error|warning|success|primary
      type: {
        type: [String, void 0, null],
        default: "error"
      },
      // 当数值为 0 时，是否展示 Badge
      showZero: {
        type: Boolean,
        default: false
      },
      // 背景颜色，优先级比type高，如设置，type参数会失效
      bgColor: {
        type: [String, null],
        default: null
      },
      // 字体颜色
      color: {
        type: [String, null],
        default: null
      },
      // 徽标形状，circle-四角均为圆角，horn-左下角为直角
      shape: {
        type: [String, void 0, null],
        default: "circle"
      },
      // 设置数字的显示方式，overflow|ellipsis|limit
      // overflow会根据max字段判断，超出显示`${max}+`
      // ellipsis会根据max判断，超出显示`${max}...`
      // limit会依据1000作为判断条件，超出1000，显示`${value/1000}K`，比如2.2k、3.34w，最多保留2位小数
      numberType: {
        type: [String, void 0, null],
        default: "overflow"
      },
      // 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
      offset: {
        type: Array,
        default: () => []
      },
      // 是否反转背景和字体颜色
      inverted: {
        type: Boolean,
        default: false
      },
      // 是否绝对定位
      absolute: {
        type: Boolean,
        default: false
      },
      ...(_T = (_S = uni.$uv) == null ? void 0 : _S.props) == null ? void 0 : _T.badge
    }
  };
  const _sfc_main$J = {
    name: "uv-badge",
    mixins: [mpMixin, mixin, props$7],
    computed: {
      // 是否将badge中心与父组件右上角重合
      boxStyle() {
        let style = {};
        return style;
      },
      // 整个组件的样式
      badgeStyle() {
        const style = {};
        if (this.color) {
          style.color = this.color;
        }
        if (this.bgColor && !this.inverted) {
          style.backgroundColor = this.bgColor;
        }
        if (this.absolute) {
          style.position = "absolute";
          if (this.offset.length) {
            const top = this.offset[0];
            const right = this.offset[1] || top;
            style.top = this.$uv.addUnit(top);
            style.right = this.$uv.addUnit(right);
          }
        }
        return style;
      },
      showValue() {
        switch (this.numberType) {
          case "overflow":
            return Number(this.value) > Number(this.max) ? this.max + "+" : this.value;
          case "ellipsis":
            return Number(this.value) > Number(this.max) ? "..." : this.value;
          case "limit":
            return Number(this.value) > 999 ? Number(this.value) >= 9999 ? Math.floor(this.value / 1e4 * 100) / 100 + "w" : Math.floor(this.value / 1e3 * 100) / 100 + "k" : this.value;
          default:
            return Number(this.value);
        }
      },
      propsType() {
        return this.type || "error";
      }
    }
  };
  function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show && ((Number(_ctx.value) === 0 ? _ctx.showZero : true) || _ctx.isDot) ? (vue.openBlock(), vue.createElementBlock(
      "text",
      {
        key: 0,
        class: vue.normalizeClass([[_ctx.isDot ? "uv-badge--dot" : "uv-badge--not-dot", _ctx.inverted && "uv-badge--inverted", _ctx.shape === "horn" && "uv-badge--horn", `uv-badge--${$options.propsType}${_ctx.inverted ? "--inverted" : ""}`], "uv-badge"]),
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle), $options.badgeStyle])
      },
      vue.toDisplayString(_ctx.isDot ? "" : $options.showValue),
      7
      /* TEXT, CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$I], ["__scopeId", "data-v-91e4945b"], ["__file", "E:/BankSystem/user/uni_modules/uv-badge/components/uv-badge/uv-badge.vue"]]);
  const props$6 = {
    props: {
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      modelValue: {
        type: [Boolean, String, Number],
        default: false
      },
      // 是否为加载中状态
      loading: {
        type: Boolean,
        default: false
      },
      // 是否为禁用装填
      disabled: {
        type: Boolean,
        default: false
      },
      // 开关尺寸，单位px
      size: {
        type: [String, Number],
        default: 25
      },
      // 打开时的背景颜色
      activeColor: {
        type: String,
        default: "#2979ff"
      },
      // 关闭时的背景颜色
      inactiveColor: {
        type: String,
        default: "#fff"
      },
      // switch打开时的值
      activeValue: {
        type: [String, Number, Boolean],
        default: true
      },
      // switch关闭时的值
      inactiveValue: {
        type: [String, Number, Boolean],
        default: false
      },
      // 是否开启异步变更，开启后需要手动控制输入值
      asyncChange: {
        type: Boolean,
        default: false
      },
      // 圆点与外边框的距离
      space: {
        type: [String, Number],
        default: 0
      },
      ...(_V = (_U = uni.$uv) == null ? void 0 : _U.props) == null ? void 0 : _V.switch
    }
  };
  const _sfc_main$I = {
    name: "uv-switch",
    mixins: [mpMixin, mixin, props$6],
    data() {
      return {
        bgColor: "#ffffff",
        innerValue: false
      };
    },
    watch: {
      modelValue: {
        immediate: true,
        handler(newVal) {
          if (newVal !== this.inactiveValue && newVal !== this.activeValue) {
            return this.$uv.error("v-model绑定的值必须为inactiveValue、activeValue二者之一");
          }
          this.innerValue = newVal;
        }
      }
    },
    created() {
      this.innerValue = this.value || this.modelValue;
    },
    computed: {
      isActive() {
        return this.innerValue === this.activeValue;
      },
      switchStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.$uv.getPx(this.size) * 2 + 2);
        style.height = this.$uv.addUnit(this.$uv.getPx(this.size) + 2);
        if (this.customInactiveColor) {
          style.borderColor = "rgba(0, 0, 0, 0)";
        }
        style.backgroundColor = this.isActive ? this.activeColor : this.inactiveColor;
        return style;
      },
      nodeStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.$uv.getPx(this.size) - this.space);
        style.height = this.$uv.addUnit(this.$uv.getPx(this.size) - this.space);
        const translateX = this.isActive ? this.$uv.addUnit(this.space) : this.$uv.addUnit(this.$uv.getPx(this.size));
        style.transform = `translateX(-${translateX})`;
        return style;
      },
      bgStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.$uv.getPx(this.size) * 2 - this.$uv.getPx(this.size) / 2);
        style.height = this.$uv.addUnit(this.$uv.getPx(this.size));
        style.backgroundColor = this.inactiveColor;
        style.transform = `scale(${this.isActive ? 0 : 1})`;
        return style;
      },
      customInactiveColor() {
        return this.inactiveColor !== "#fff" && this.inactiveColor !== "#ffffff";
      }
    },
    methods: {
      clickHandler() {
        if (!this.disabled && !this.loading) {
          const oldValue = this.isActive ? this.inactiveValue : this.activeValue;
          if (!this.asyncChange) {
            this.$emit("input", oldValue);
            this.$emit("update:modelValue", oldValue);
          }
          this.$nextTick(() => {
            this.$emit("change", oldValue);
          });
        }
      }
    }
  };
  function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_2$2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-switch", [_ctx.disabled && "uv-switch--disabled"]]),
        style: vue.normalizeStyle([$options.switchStyle, _ctx.$uv.addStyle(_ctx.customStyle)]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "uv-switch__bg",
            style: vue.normalizeStyle([$options.bgStyle])
          },
          null,
          4
          /* STYLE */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uv-switch__node", [$data.innerValue && "uv-switch__node--on"]]),
            style: vue.normalizeStyle([$options.nodeStyle]),
            ref: "uv-switch__node"
          },
          [
            vue.createVNode(_component_uv_loading_icon, {
              show: _ctx.loading,
              mode: "circle",
              timingFunction: "linear",
              color: $data.innerValue ? _ctx.activeColor : "#AAABAD",
              size: _ctx.size * 0.6
            }, null, 8, ["show", "color", "size"])
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$H], ["__scopeId", "data-v-c713e4c9"], ["__file", "E:/BankSystem/user/uni_modules/uv-switch/components/uv-switch/uv-switch.vue"]]);
  const _sfc_main$H = {
    name: "uv-list-item",
    mixins: [mpMixin, mixin],
    emits: ["click", "switchChange"],
    props: {
      direction: {
        type: String,
        default: "row"
      },
      title: {
        type: String,
        default: ""
      },
      note: {
        type: String,
        default: ""
      },
      ellipsis: {
        type: [Number, String],
        default: 0
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      clickable: {
        type: Boolean,
        default: false
      },
      showArrow: {
        type: [Boolean, String],
        default: false
      },
      link: {
        type: [Boolean, String],
        default: false
      },
      to: {
        type: String,
        default: ""
      },
      showSwitch: {
        type: [Boolean, String],
        default: false
      },
      switchChecked: {
        type: [Boolean, String],
        default: false
      },
      showBadge: {
        type: [Boolean, String],
        default: false
      },
      badge: {
        type: Object,
        default() {
          return {};
        }
      },
      rightText: {
        type: String,
        default: ""
      },
      thumb: {
        type: String,
        default: ""
      },
      thumbSize: {
        type: String,
        default: "base"
      },
      showExtraIcon: {
        type: [Boolean, String],
        default: false
      },
      extraIcon: {
        type: Object,
        default() {
          return {
            name: "",
            color: "#000000",
            size: 20,
            customPrefix: ""
          };
        }
      },
      border: {
        type: Boolean,
        default: false
      },
      customStyle: {
        type: Object,
        default() {
          return {
            padding: "",
            backgroundColor: "#FFFFFF"
          };
        }
      },
      keepScrollPosition: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      directionData() {
        return this.direction ? this.direction : this.parentData.direction ? this.parentData.direction : "row";
      }
    },
    watch: {
      "customStyle.padding": {
        handler(padding) {
          if (padding)
            this.setPadding(padding);
        },
        immediate: true
      }
    },
    data() {
      return {
        isFirstChild: false,
        padding: {
          top: "",
          right: "",
          bottom: "",
          left: ""
        },
        parentData: {
          direction: "row",
          padding: 0
        }
      };
    },
    created() {
      this.updateParentData();
    },
    mounted() {
      this.init();
      this.list = this.getForm();
      if (this.list) {
        if (!this.list.firstChildAppend) {
          this.list.firstChildAppend = true;
          this.isFirstChild = true;
        }
      }
    },
    methods: {
      init() {
        if (!this.parent) {
          this.$uv.error("uv-list-item必须搭配uv-list组件使用");
        }
        this.$nextTick(() => {
          if (!(this.padding.top || this.padding.right || this.padding.bottom || this.padding.left)) {
            this.setPadding(this.parentData.padding);
          }
        });
      },
      updateParentData() {
        this.getParentData("uv-list");
      },
      setPadding(padding) {
        if (typeof padding == "number") {
          padding += "";
        }
        let paddingArr = padding.split(" ");
        if (paddingArr.length === 1) {
          const allPadding = paddingArr[0];
          this.padding = {
            "top": allPadding,
            "right": allPadding,
            "bottom": allPadding,
            "left": allPadding
          };
        } else if (paddingArr.length === 2) {
          const [verticalPadding, horizontalPadding] = paddingArr;
          this.padding = {
            "top": verticalPadding,
            "right": horizontalPadding,
            "bottom": verticalPadding,
            "left": horizontalPadding
          };
        } else if (paddingArr.length === 4) {
          const [topPadding, rightPadding, bottomPadding, leftPadding] = paddingArr;
          this.padding = {
            "top": topPadding,
            "right": rightPadding,
            "bottom": bottomPadding,
            "left": leftPadding
          };
        }
      },
      /**
       * 获取父元素实例
       */
      getForm(name = "uniList") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      onClick() {
        if (this.to !== "") {
          this.openPage();
          return;
        }
        if (this.clickable || this.link) {
          this.$emit("click", {
            data: {}
          });
        }
      },
      onSwitchChange(e2) {
        this.$emit("switchChange", e2);
      },
      openPage() {
        if (["navigateTo", "redirectTo", "reLaunch", "switchTab"].indexOf(this.link) !== -1) {
          this.pageApi(this.link);
        } else {
          this.pageApi("navigateTo");
        }
      },
      pageApi(api) {
        let callback = {
          url: this.to,
          success: (res) => {
            this.$emit("click", {
              data: res
            });
          },
          fail: (err) => {
            this.$emit("click", {
              data: err
            });
          }
        };
        switch (api) {
          case "navigateTo":
            uni.navigateTo(callback);
            break;
          case "redirectTo":
            uni.redirectTo(callback);
            break;
          case "reLaunch":
            uni.reLaunch(callback);
            break;
          case "switchTab":
            uni.switchTab(callback);
            break;
          default:
            uni.navigateTo(callback);
        }
      }
    }
  };
  function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_badge = resolveEasycom(vue.resolveDynamicComponent("uv-badge"), __easycom_1$4);
    const _component_uv_switch = resolveEasycom(vue.resolveDynamicComponent("uv-switch"), __easycom_2$1);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass([{ "uv-list-item--disabled": $props.disabled }, "uv-list-item"]),
      style: vue.normalizeStyle([_ctx.$uv.addStyle($props.customStyle), { "background-color": $props.customStyle.backgroundColor ? $props.customStyle.backgroundColor : "#fff" }]),
      "hover-class": !$props.clickable && !$props.link || $props.disabled || $props.showSwitch ? "" : "uv-list-item--hover",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.isFirstChild ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["border--left", { "uv-list--border": $props.border }])
        },
        null,
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "uv-list-item__wrapper" }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uv-list-item__container", { "container--right": $props.showArrow || $props.link, "flex--direction": $options.directionData === "column" }]),
              style: vue.normalizeStyle({ paddingTop: $data.padding.top, paddingLeft: $data.padding.left, paddingRight: $data.padding.right, paddingBottom: $data.padding.bottom })
            },
            [
              vue.renderSlot(_ctx.$slots, "header", {}, () => [
                vue.createElementVNode("view", { class: "uv-list-item__header" }, [
                  $props.thumb ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "uv-list-item__icon"
                  }, [
                    vue.createElementVNode("image", {
                      src: $props.thumb,
                      class: vue.normalizeClass(["uv-list-item__icon-img", ["uv-list--" + $props.thumbSize]])
                    }, null, 10, ["src"])
                  ])) : $props.showExtraIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "uv-list-item__icon"
                  }, [
                    vue.createVNode(_component_uv_icon, {
                      name: $props.extraIcon.icon,
                      customPrefix: $props.extraIcon.customPrefix,
                      color: $props.extraIcon.color,
                      size: $props.extraIcon.size
                    }, null, 8, ["name", "customPrefix", "color", "size"])
                  ])) : vue.createCommentVNode("v-if", true)
                ])
              ], true),
              vue.renderSlot(_ctx.$slots, "body", {}, () => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uv-list-item__content", { "uv-list-item__content--center": $props.thumb || $props.showExtraIcon || $props.showBadge || $props.showSwitch }])
                  },
                  [
                    $props.title ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: vue.normalizeClass(["uv-list-item__content-title", [$props.ellipsis && `uv-line-${$props.ellipsis}`]])
                      },
                      vue.toDisplayString($props.title),
                      3
                      /* TEXT, CLASS */
                    )) : vue.createCommentVNode("v-if", true),
                    $props.note ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 1,
                        class: "uv-list-item__content-note"
                      },
                      vue.toDisplayString($props.note),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                )
              ], true),
              vue.renderSlot(_ctx.$slots, "footer", {}, () => [
                $props.rightText || $props.showBadge || $props.showSwitch ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 0,
                    class: vue.normalizeClass(["uv-list-item__extra", { "flex--justify": $options.directionData === "column" }])
                  },
                  [
                    $props.rightText ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: "uv-list-item__extra-text"
                      },
                      vue.toDisplayString($props.rightText),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true),
                    $props.showBadge ? (vue.openBlock(), vue.createBlock(_component_uv_badge, {
                      key: 1,
                      show: !!($props.badge.show || $props.badge.isDot || $props.badge.value),
                      isDot: $props.badge.isDot,
                      value: $props.badge.value,
                      max: $props.badge.max,
                      type: $props.badge.type,
                      showZero: $props.badge.showZero,
                      bgColor: $props.badge.bgColor,
                      color: $props.badge.color,
                      shape: $props.badge.shape,
                      numberType: $props.badge.numberType,
                      inverted: $props.badge.inverted,
                      customStyle: "margin-left: 4px;"
                    }, null, 8, ["show", "isDot", "value", "max", "type", "showZero", "bgColor", "color", "shape", "numberType", "inverted"])) : vue.createCommentVNode("v-if", true),
                    $props.showSwitch ? (vue.openBlock(), vue.createBlock(_component_uv_switch, {
                      key: 2,
                      value: $props.switchChecked,
                      disabled: $props.disabled,
                      onChange: $options.onSwitchChange
                    }, null, 8, ["value", "disabled", "onChange"])) : vue.createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                )) : vue.createCommentVNode("v-if", true)
              ], true)
            ],
            6
            /* CLASS, STYLE */
          )
        ], true)
      ]),
      $props.showArrow || $props.link ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
        key: 1,
        size: "34rpx",
        class: "uv-icon-wrapper",
        color: "#bbb",
        name: "arrow-right"
      })) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$G], ["__scopeId", "data-v-d568ce32"], ["__file", "E:/BankSystem/user/uni_modules/uv-list/components/uv-list-item/uv-list-item.vue"]]);
  const _sfc_main$G = {
    name: "uv-list",
    mixins: [mpMixin, mixin],
    "mp-weixin": {
      options: {
        multipleSlots: false
      }
    },
    props: {
      border: {
        type: Boolean,
        default: false
      },
      borderColor: {
        type: String,
        default: "#dadbde"
      },
      // 排版方向，默认row，列表里面使用其他组件  最好设置成column
      direction: {
        type: String,
        default: "row"
      },
      // 内边距
      padding: {
        type: [String, Number],
        default: "20rpx 30rpx"
      }
    },
    created() {
      this.firstChildAppend = false;
    },
    computed: {
      parentData() {
        return [this.direction, this.padding];
      }
    },
    methods: {
      loadMore(e2) {
        this.$emit("scrolltolower");
      },
      scroll(e2) {
        this.$emit("scroll", e2);
      }
    }
  };
  function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-list",
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        $props.border ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "uv-list--border-top",
            style: vue.normalizeStyle([{ "background-color": $props.borderColor }])
          },
          null,
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
        $props.border ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: "uv-list--border-bottom",
            style: vue.normalizeStyle([{ "background-color": $props.borderColor }])
          },
          null,
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$F], ["__scopeId", "data-v-53ea9bef"], ["__file", "E:/BankSystem/user/uni_modules/uv-list/components/uv-list/uv-list.vue"]]);
  const _sfc_main$F = {
    data() {
      return {};
    }
  };
  function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_list_item = resolveEasycom(vue.resolveDynamicComponent("uv-list-item"), __easycom_0$3);
    const _component_uv_list = resolveEasycom(vue.resolveDynamicComponent("uv-list"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_uv_list, {
        class: "list",
        border: ""
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_list_item, {
            title: "修改登录密码",
            border: "",
            link: "",
            to: "/pages/modifyPassword/modifyPassword",
            onClick: _cache[0] || (_cache[0] = ($event) => 1)
          }),
          vue.createVNode(_component_uv_list_item, {
            title: "安全工具",
            border: "",
            link: "",
            to: "",
            onClick: _cache[1] || (_cache[1] = ($event) => 1)
          }),
          vue.createVNode(_component_uv_list_item, {
            title: "个人信息",
            border: "",
            link: "",
            to: "/pages/personalInformation/personalInformation",
            onClick: _cache[2] || (_cache[2] = ($event) => 1)
          }),
          vue.createVNode(_component_uv_list_item, {
            title: "修改支付密码",
            border: "",
            link: "",
            to: "/pages/modifyPaymentCode/modifyPaymentCode",
            onClick: _cache[3] || (_cache[3] = ($event) => 1)
          }),
          vue.createVNode(_component_uv_list_item, {
            title: "清除缓存",
            border: "",
            link: "",
            to: "",
            onClick: _cache[4] || (_cache[4] = ($event) => 1)
          })
        ]),
        _: 1
        /* STABLE */
      })
    ]);
  }
  const PagesSecurityAndSettingsSecurityAndSettings = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$E], ["__file", "E:/BankSystem/user/pages/securityAndSettings/securityAndSettings.vue"]]);
  const _sfc_main$E = {
    data() {
      return {
        isvisible: false,
        totalAssets: "******",
        card: []
      };
    },
    methods: {
      clickVisble() {
        this.isvisible = !this.isvisible;
        let sum = 0;
        this.card.forEach((item) => {
          sum += Number(item.balance);
        });
        this.totalAssets = parseFloat(sum.toString()).toFixed(2);
      },
      clickInvisble() {
        this.isvisible = !this.isvisible;
        this.totalAssets = "******";
      },
      clickCard(index2) {
        let that = this;
        uni.navigateTo({
          url: "/pages/accountDetail/accountDetail",
          success: function(res) {
            res.eventChannel.emit("card", that.card[index2]);
          }
        });
      },
      clickBindCard() {
        uni.navigateTo({
          url: "/pages/bindIdCard/bindIdCard"
        });
      }
    },
    onLoad() {
      let that = this;
      uni.getStorage({
        key: "token",
        success: function(res) {
          let _token = res.data;
          uni.showLoading({
            title: "",
            mask: true
          });
          uni.request({
            url: "https://120.55.37.93/query/bankCard",
            method: "GET",
            header: {
              "token": _token
            },
            data: {},
            success: function(res2) {
              if (res2.data.code == 200) {
                res2.data.data.forEach((item) => {
                  let temp = { account: "", id: "", class: "借记卡", balance: "" };
                  temp.account = item.cardNumber;
                  temp.id = item.cardId;
                  temp.balance = parseFloat(item.balance).toFixed(2);
                  that.card.push(temp);
                });
              }
              uni.hideLoading();
            },
            fail: function(error2) {
              uni.hideLoading();
              uni.showToast({
                title: "错误，稍后再试",
                icon: "error",
                duration: 2e3
              });
            }
          });
        }
      });
    }
  };
  function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    return vue.openBlock(), vue.createElementBlock("view", { style: { "display": "flex", "flex-direction": "column", "align-items": "center" } }, [
      vue.createElementVNode("view", { class: "total-view" }, [
        vue.createElementVNode("view", { class: "row1" }, [
          vue.createElementVNode("view", {
            class: "text",
            style: { "margin-right": "40rpx" }
          }, "总资产(折算人民币元)"),
          $data.isvisible ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 0,
            name: "/static/icon/icon_visible.svg",
            onClick: $options.clickInvisble
          }, null, 8, ["onClick"])) : (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 1,
            name: "/static/icon/icon_invisible.svg",
            onClick: $options.clickVisble
          }, null, 8, ["onClick"]))
        ]),
        vue.createElementVNode(
          "view",
          { class: "row2" },
          vue.toDisplayString($data.totalAssets),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { style: { "margin-top": "50rpx", "display": "flex", "flex-direction": "column", "align-items": "center" } }, [
        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-end", "width": "750rpx", "margin-right": "100rpx" } }, [
          vue.createVNode(_component_uv_icon, {
            name: "reload",
            size: "18"
          })
        ]),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.card, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index2,
              class: "card",
              onClick: ($event) => $options.clickCard(index2)
            }, [
              vue.createElementVNode("view", { style: { "display": "flex", "height": "50%", "align-items": "center" } }, [
                vue.createVNode(_component_uv_icon, {
                  name: "/static/icon/icon_card.svg",
                  size: "55",
                  style: { "margin-left": "20rpx" }
                }),
                vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column", "margin-left": "40rpx" } }, [
                  vue.createElementVNode(
                    "view",
                    { style: { "font-weight": "bold" } },
                    vue.toDisplayString(item.account),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { style: { "color": "#80817E" } },
                    vue.toDisplayString(item.class),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("view", { style: { "background-color": "#F9F9EF", "display": "flex", "justify-content": "space-between", "height": "50%", "align-items": "center" } }, [
                vue.createElementVNode("view", { style: { "margin-left": "40rpx", "color": "#80817E" } }, "账面余额"),
                vue.createElementVNode("view", { style: { "display": "flex" } }, [
                  vue.createElementVNode("view", { style: { "margin-right": "20rpx", "color": "#80817E" } }, "人民币元"),
                  vue.createElementVNode(
                    "view",
                    { style: { "margin-right": "40rpx", "font-weight": "bold" } },
                    vue.toDisplayString(item.balance),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", {
        class: "add-box",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickBindCard && $options.clickBindCard(...args))
      }, [
        vue.createElementVNode("view", null, "+手动添加卡/账户")
      ])
    ]);
  }
  const PagesAccountViewAccountView = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$D], ["__file", "E:/BankSystem/user/pages/accountView/accountView.vue"]]);
  const props$5 = {
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 键盘弹起时，是否自动上推页面
      adjustPosition: {
        type: Boolean,
        default: true
      },
      // 最大输入长度
      maxlength: {
        type: [String, Number],
        default: 6
      },
      // 是否用圆点填充
      dot: {
        type: Boolean,
        default: false
      },
      // 显示模式，box-盒子模式，line-底部横线模式
      mode: {
        type: String,
        default: "box"
      },
      // 是否细边框
      hairline: {
        type: Boolean,
        default: false
      },
      // 字符间的距离
      space: {
        type: [String, Number],
        default: 10
      },
      // 是否自动获取焦点
      focus: {
        type: Boolean,
        default: false
      },
      // 字体是否加粗
      bold: {
        type: Boolean,
        default: false
      },
      // 字体颜色
      color: {
        type: String,
        default: "#606266"
      },
      // 字体大小
      fontSize: {
        type: [String, Number],
        default: 18
      },
      // 输入框的大小，宽等于高
      size: {
        type: [String, Number],
        default: 35
      },
      // 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true
      disabledKeyboard: {
        type: Boolean,
        default: false
      },
      // 边框和线条颜色
      borderColor: {
        type: String,
        default: "#c9cacc"
      },
      // 是否禁止输入"."符号
      disabledDot: {
        type: Boolean,
        default: true
      },
      ...(_X = (_W = uni.$uv) == null ? void 0 : _W.props) == null ? void 0 : _X.codeInput
    }
  };
  const _sfc_main$D = {
    name: "uv-code-input",
    mixins: [mpMixin, mixin, props$5],
    data() {
      return {
        inputValue: "",
        isFocus: this.focus
      };
    },
    created() {
      const value2 = String(this.value) || String(this.modelValue);
      this.inputValue = String(value2).substring(0, this.maxlength);
    },
    watch: {
      value(newVal) {
        this.inputValue = String(newVal).substring(0, this.maxlength);
        if (this.disabledKeyboard) {
          this.customInput();
        }
      },
      modelValue(newVal) {
        this.inputValue = String(newVal).substring(0, this.maxlength);
        if (this.disabledKeyboard) {
          this.customInput();
        }
      }
    },
    computed: {
      // 根据长度，循环输入框的个数，因为头条小程序数值不能用于v-for
      codeLength() {
        return new Array(Number(this.maxlength));
      },
      // 循环item的样式
      itemStyle() {
        return (index2) => {
          const addUnit2 = this.$uv.addUnit;
          const style = {
            width: addUnit2(this.size),
            height: addUnit2(this.size)
          };
          if (this.mode === "box") {
            style.border = `${this.hairline ? 0.5 : 1}px solid ${this.borderColor}`;
            if (this.$uv.getPx(this.space) === 0) {
              if (index2 === 0) {
                style.borderTopLeftRadius = "3px";
                style.borderBottomLeftRadius = "3px";
              }
              if (index2 === this.codeLength.length - 1) {
                style.borderTopRightRadius = "3px";
                style.borderBottomRightRadius = "3px";
              }
              if (index2 !== this.codeLength.length - 1) {
                style.borderRight = "none";
              }
            }
          }
          if (index2 !== this.codeLength.length - 1) {
            style.marginRight = addUnit2(this.space);
          } else {
            style.marginRight = 0;
          }
          return style;
        };
      },
      // 将输入的值，转为数组，给item历遍时，根据当前的索引显示数组的元素
      codeArray() {
        return String(this.inputValue).split("");
      },
      // 下划线模式下，横线的样式
      lineStyle() {
        const style = {};
        style.height = this.hairline ? "1px" : "4px";
        style.width = this.$uv.addUnit(this.size);
        style.backgroundColor = this.borderColor;
        return style;
      }
    },
    methods: {
      // 监听输入框的值发生变化
      inputHandler(e2) {
        const value2 = e2.detail.value;
        this.inputValue = value2;
        if (this.disabledDot) {
          this.$nextTick(() => {
            this.inputValue = value2.replace(".", "");
          });
        }
        this.$emit("change", value2);
        this.$emit("input", value2);
        this.$emit("update:modelValue", value2);
        if (String(value2).length >= Number(this.maxlength)) {
          this.$emit("finish", value2);
        }
      },
      // 自定义键盘输入值监听
      customInput() {
        const value2 = this.inputValue;
        if (this.disabledDot) {
          this.$nextTick(() => {
            this.inputValue = value2.replace(".", "");
          });
        }
        this.$emit("change", value2);
        if (String(value2).length >= Number(this.maxlength)) {
          this.$emit("finish", value2);
        }
      }
    }
  };
  function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-code-input" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($options.codeLength, (item, index2) => {
          return vue.openBlock(), vue.createElementBlock(
            "view",
            {
              class: "uv-code-input__item",
              style: vue.normalizeStyle([$options.itemStyle(index2)]),
              key: index2
            },
            [
              _ctx.dot && $options.codeArray.length > index2 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uv-code-input__item__dot"
              })) : (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 1,
                  style: vue.normalizeStyle({
                    fontSize: _ctx.$uv.addUnit(_ctx.fontSize),
                    fontWeight: _ctx.bold ? "bold" : "normal",
                    color: _ctx.color
                  })
                },
                vue.toDisplayString($options.codeArray[index2]),
                5
                /* TEXT, STYLE */
              )),
              _ctx.mode === "line" ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 2,
                  class: "uv-code-input__item__line",
                  style: vue.normalizeStyle([$options.lineStyle])
                },
                null,
                4
                /* STYLE */
              )) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      vue.createElementVNode("input", {
        disabled: _ctx.disabledKeyboard,
        type: "number",
        focus: _ctx.focus,
        value: $data.inputValue,
        maxlength: _ctx.maxlength,
        adjustPosition: _ctx.adjustPosition,
        class: "uv-code-input__input",
        onInput: _cache[0] || (_cache[0] = (...args) => $options.inputHandler && $options.inputHandler(...args)),
        style: vue.normalizeStyle({
          height: _ctx.$uv.addUnit(_ctx.size)
        }),
        onFocus: _cache[1] || (_cache[1] = ($event) => $data.isFocus = true),
        onBlur: _cache[2] || (_cache[2] = ($event) => $data.isFocus = false)
      }, null, 44, ["disabled", "focus", "value", "maxlength", "adjustPosition"])
    ]);
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$C], ["__scopeId", "data-v-bdd8c54a"], ["__file", "E:/BankSystem/user/uni_modules/uv-code-input/components/uv-code-input/uv-code-input.vue"]]);
  const _sfc_main$C = {
    data() {
      return {
        codeTips: "",
        isvisible: false,
        phoneTail: "",
        card: {
          id: "",
          account: "",
          class: "",
          balance: "",
          wholeAccount: ""
        },
        recordItem: []
      };
    },
    computed: {
      currentDate: function() {
        return this.formattedDate((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 1, (/* @__PURE__ */ new Date()).getDate());
      },
      defaultDateStart: function() {
        const [year, month, day] = this.currentDate.split("-");
        const date2 = new Date(year, month - 1, day);
        const oneWeekAgo = new Date(date2.setDate(date2.getDate() - 7));
        return this.formattedDate(oneWeekAgo.getFullYear(), oneWeekAgo.getMonth() + 1, oneWeekAgo.getDate());
      }
    },
    methods: {
      formattedDate(year, month, day) {
        const formattedMonth = month < 10 ? "0" + month : month;
        const formattedDay = day < 10 ? "0" + day : day;
        return `${year}-${formattedMonth}-${formattedDay}`;
      },
      requestTransactionRecord() {
        let that = this;
        uni.getStorage({
          key: "token",
          success: function(res) {
            let _token = res.data;
            uni.showLoading({
              title: "",
              mask: true
            });
            uni.request({
              url: "https://120.55.37.93/query/transactionRecord?pageNum=" + that.pageNum + "&pageSize=" + that.pageSize,
              method: "POST",
              header: {
                "token": _token
              },
              data: {
                "startTime": that.currentDate + " 00:00:00",
                "endTime": that.defaultDateStart + " 23:59:59",
                "cardId": that.card.id,
                "miniAmount": that.moneyStart,
                "maxAmount": that.moneyEnd,
                "payeeName": null,
                "payeePhoneNumber": null,
                "status": that.status
              },
              success: function(res2) {
                formatAppLog("log", "at pages/accountDetail/accountDetail.vue:121", res2);
                if (res2.data.code == 200) {
                  formatAppLog("log", "at pages/accountDetail/accountDetail.vue:123", res2);
                  that.totalPage = res2.data.data.totalPage;
                  res2.data.data.list.forEach((item) => {
                    let temp = { "counterpartyName": "", "transactionId": null, "balance": null, "amount": -648, "status": 0, "statusComments": "转账支出" };
                    temp.counterpartyName = item.counterpartyName;
                    temp.balance = parseFloat(item.balance).toFixed(2);
                    temp.transactionId = item.transactionId;
                    temp.statusComments = item.statusComments;
                    temp.amount = parseFloat(item.amount).toFixed(2);
                    that.recordItem.push(temp);
                  });
                }
                uni.hideLoading();
              },
              fail: function(error2) {
                uni.hideLoading();
                uni.showToast({
                  title: "错误，稍后再试",
                  icon: "error",
                  duration: 2e3
                });
              }
            });
          }
        });
      },
      getScrollHeight() {
        let sys2 = uni.getSystemInfoSync();
        let winWidth = sys2.windowWidth;
        let winrate = 750 / winWidth;
        let winHeight = parseInt(sys2.windowHeight * winrate);
        return winHeight - 20;
      },
      loadMore() {
        if (this.pageNum < this.totalPage) {
          this.pageNum++;
          this.requestTransactionRecord();
        }
      },
      codeChange(text) {
        this.codeTips = text;
      },
      getCode() {
        if (this.$refs.uCode.canGetCode) {
          let that = this;
          uni.getStorage({
            key: "token",
            success: function(res) {
              let _token = res.data;
              uni.showLoading({
                title: "正在获取验证码",
                mask: true
              });
              uni.request({
                url: "https://120.55.37.93/sendsms/login",
                method: "GET",
                header: {
                  "token": _token
                },
                success: function(res2) {
                  uni.hideLoading();
                  that.$refs.uCode.start();
                },
                fail: function(error2) {
                  uni.hideLoading();
                  uni.showToast({
                    title: "错误，稍后再试",
                    icon: "error",
                    duration: 2e3
                  });
                }
              });
            }
          });
          this.$refs.uCode.start();
        } else {
          this.$u.toast("倒计时结束后再发送");
        }
      },
      codeInputFinish(e2) {
        let that = this;
        uni.getStorage({
          key: "token",
          success: function(res) {
            let _token = res.data;
            uni.showLoading({
              title: "",
              mask: true
            });
            uni.request({
              url: "https://120.55.37.93/query/cardNumber",
              method: "POST",
              header: {
                "token": _token
              },
              data: {
                "cardId": that.card.id,
                "verifyCode": String(e2)
              },
              success: function(res2) {
                if (res2.data.code == "110") {
                  uni.hideLoading();
                  that.$refs.popup.close();
                  uni.showToast({
                    title: "验证码错误",
                    icon: "none"
                  });
                } else {
                  that.record.wholeAccount = res2.data.data;
                  uni.hideLoading();
                }
              },
              fail: function(error2) {
                uni.hideLoading();
                uni.showToast({
                  title: "错误，稍后再试",
                  icon: "error",
                  duration: 2e3
                });
              }
            });
          }
        });
      },
      clickVisble() {
        this.$refs.popup.open();
      },
      clickInvisble() {
        this.isvisible = !this.isvisible;
      },
      clickTransfer() {
        uni.navigateTo({
          url: "/pages/transfer/transfer"
        });
      },
      clickTransferRecord() {
        let that = this;
        uni.navigateTo({
          url: "/pages/transferRecord/transferRecord?cardId=" + that.card.id
        });
      },
      clickCardLoss() {
        uni.navigateTo({
          url: ""
        });
      },
      clickLimitSetting() {
        uni.navigateTo({
          url: ""
        });
      },
      clickRecord(index2) {
        let that = this;
        uni.navigateTo({
          url: "/pages/transactionDetail/transactionDetail?transactionId=" + that.recordItem[index2].transactionId
        });
      }
    },
    onLoad(option) {
      let that = this;
      let temp = "";
      temp = uni.getStorageSync("userName");
      temp = temp.slice(-4);
      this.phoneTail = temp;
      formatAppLog("log", "at pages/accountDetail/accountDetail.vue:289", this.phoneTail);
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on("card", function(data) {
        that.card.id = data.id;
        that.card.account = data.account;
        that.card.balance = data.balance;
      });
    }
  };
  function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_4$2);
    const _component_uv_code_input = resolveEasycom(vue.resolveDynamicComponent("uv-code-input"), __easycom_5);
    const _component_uv_code = resolveEasycom(vue.resolveDynamicComponent("uv-code"), __easycom_6$1);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_7);
    return vue.openBlock(), vue.createElementBlock("view", { style: { "display": "flex", "flex-direction": "column", "align-items": "center" } }, [
      vue.createElementVNode("view", { class: "box" }, [
        vue.createElementVNode("view", { class: "card" }, [
          vue.createVNode(_component_uv_icon, {
            name: "/static/icon/icon_card.svg",
            size: "55",
            style: { "margin-left": "20rpx", "margin-right": "20rpx" }
          }),
          vue.createElementVNode(
            "view",
            { style: { "font-weight": "bold", "margin-right": "20rpx" } },
            vue.toDisplayString($data.isvisible ? $data.card.wholeAccount : $data.card.account),
            1
            /* TEXT */
          ),
          $data.isvisible ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 0,
            name: "/static/icon/icon_visible.svg",
            onClick: $options.clickInvisble
          }, null, 8, ["onClick"])) : (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 1,
            name: "/static/icon/icon_invisible.svg",
            onClick: $options.clickVisble
          }, null, 8, ["onClick"]))
        ]),
        vue.createElementVNode("view", { class: "text" }, [
          vue.createElementVNode("view", { class: "text1" }, "账户类别"),
          vue.createElementVNode("view", { class: "text2" }, "借记卡")
        ]),
        vue.createElementVNode("view", { class: "text" }, [
          vue.createElementVNode("view", { class: "text1" }, "人民币元"),
          vue.createElementVNode(
            "view",
            { class: "text2" },
            vue.toDisplayString($data.card.balance),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", {
          class: "transfer",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.clickTransfer && $options.clickTransfer(...args))
        }, "转账")
      ]),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "popup",
          type: "center",
          isMaskClick: false
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-end", "background-color": "#FFFFFF" } }, [
              vue.createVNode(_component_uv_icon, {
                name: "close",
                size: "14",
                style: { "margin-right": "5rpx" },
                onClick: _cache[1] || (_cache[1] = ($event) => this.$refs.popup.close())
              })
            ]),
            vue.createElementVNode("view", { style: { "width": "600rpx", "height": "350rpx", "display": "flex", "flex-direction": "column", "align-items": "center", "background-color": "#FFFFFF" } }, [
              vue.createElementVNode("view", null, "手机交易码"),
              vue.createVNode(_component_uv_line, { margin: "10rpx" }),
              vue.createElementVNode(
                "view",
                { style: { "margin-top": "20rpx" } },
                "正在向尾号" + vue.toDisplayString($data.phoneTail) + "的手机发送验证码",
                1
                /* TEXT */
              ),
              vue.createVNode(_component_uv_code_input, {
                mode: "line",
                size: "28",
                onFinish: $options.codeInputFinish,
                style: { "margin-top": "40rpx" }
              }, null, 8, ["onFinish"]),
              vue.createVNode(_component_uv_code, {
                ref: "uCode",
                onChange: $options.codeChange,
                seconds: "60"
              }, null, 8, ["onChange"]),
              vue.createElementVNode(
                "button",
                {
                  onClick: _cache[2] || (_cache[2] = (...args) => $options.getCode && $options.getCode(...args)),
                  style: { "border-radius": "10rpx", "width": "300rpx", "height": "60rpx", "font-size": "0.8em", "margin-top": "40rpx", "background-color": "red", "color": "#FFFFFF" }
                },
                vue.toDisplayString($data.codeTips),
                1
                /* TEXT */
              )
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createElementVNode("view", { style: { "width": "700rpx", "display": "flex", "justify-content": "space-around", "margin-top": "50rpx", "align-items": "center" } }, [
        vue.createElementVNode("view", {
          onClick: _cache[3] || (_cache[3] = (...args) => $options.clickTransferRecord && $options.clickTransferRecord(...args))
        }, [
          vue.createVNode(_component_uv_icon, {
            name: "/static/icon/icon_transferRecord.svg",
            size: "30",
            style: { "margin-left": "15rpx" }
          }),
          vue.createElementVNode("text", { style: { "font-size": "0.8em" } }, "转账记录")
        ]),
        vue.createElementVNode("view", {
          onClick: _cache[4] || (_cache[4] = (...args) => $options.clickCardLoss && $options.clickCardLoss(...args))
        }, [
          vue.createVNode(_component_uv_icon, {
            name: "/static/icon/icon_cardLoss.svg",
            size: "30",
            style: { "margin-left": "15rpx" }
          }),
          vue.createElementVNode("text", { style: { "font-size": "0.8em" } }, "卡号挂失")
        ]),
        vue.createElementVNode("view", {
          onClick: _cache[5] || (_cache[5] = (...args) => $options.clickLimitSetting && $options.clickLimitSetting(...args))
        }, [
          vue.createVNode(_component_uv_icon, {
            name: "/static/icon/icon_limitSetting.svg",
            size: "30",
            style: { "margin-left": "15rpx" }
          }),
          vue.createElementVNode("text", { style: { "font-size": "0.8em" } }, "限额设置")
        ])
      ]),
      vue.createCommentVNode(` 	<scroll-view v-if="recordItem.length > 0" scroll-y="true" @scrolltolower="loadMore()" :style="{ height: getScrollHeight() + 'rpx' }">\r
	<view class="record-box">\r
		<view v-for="(item,index) in recordItem" :key="index" class="record-item" @click="clickRecord(index)">\r
			<view class="column1">\r
				<view>{{item.statusComments}}</view>\r
				<view style="margin-top: 10rpx; color: #A8A8A8; font-size: 0.8em;">余额 {{item.balance}}</view>\r
			</view>\r
			<view class="column2">\r
				<view style="color: #A8A8A8;">{{item.counterpartyName}}</view>\r
				<view style="margin-top: 10rpx; font-weight: bold; display: flex;">\r
					<view>人民币元</view> \r
					<view :class="item.amount>=0 ? 'in' : 'out' ">{{item.amount}}</view> \r
				</view>\r
			</view>\r
		</view>\r
	</view>\r
	</scroll-view> `)
    ]);
  }
  const PagesAccountDetailAccountDetail = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$B], ["__file", "E:/BankSystem/user/pages/accountDetail/accountDetail.vue"]]);
  const props$4 = {
    props: {
      // 背景颜色（默认transparent）
      bgColor: {
        type: String,
        default: "transparent"
      },
      // 分割槽高度，单位px（默认20）
      height: {
        type: [String, Number],
        default: 20
      },
      // 与上一个组件的距离
      marginTop: {
        type: [String, Number],
        default: 0
      },
      // 与下一个组件的距离
      marginBottom: {
        type: [String, Number],
        default: 0
      },
      ...(_Z = (_Y = uni.$uv) == null ? void 0 : _Y.props) == null ? void 0 : _Z.gap
    }
  };
  const _sfc_main$B = {
    name: "uv-gap",
    mixins: [mpMixin, mixin, props$4],
    computed: {
      gapStyle() {
        const style = {
          backgroundColor: this.bgColor,
          height: this.$uv.addUnit(this.height),
          marginTop: this.$uv.addUnit(this.marginTop),
          marginBottom: this.$uv.addUnit(this.marginBottom)
        };
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-gap",
        style: vue.normalizeStyle([$options.gapStyle])
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$A], ["__file", "E:/BankSystem/user/uni_modules/uv-gap/components/uv-gap/uv-gap.vue"]]);
  const props$3 = {
    props: {
      // 标题，有值则显示，同时会显示关闭按钮
      title: {
        type: String,
        default: ""
      },
      // 选项上方的描述信息
      description: {
        type: String,
        default: ""
      },
      // 数据
      actions: {
        type: Array,
        default: () => []
      },
      // 取消按钮的文字，不为空时显示按钮
      cancelText: {
        type: String,
        default: ""
      },
      // 点击某个菜单项时是否关闭弹窗
      closeOnClickAction: {
        type: Boolean,
        default: true
      },
      // 处理底部安全区（默认true）
      safeAreaInsetBottom: {
        type: Boolean,
        default: true
      },
      // 小程序的打开方式
      openType: {
        type: String,
        default: ""
      },
      // 点击遮罩是否允许关闭 (默认true)
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 圆角值
      round: {
        type: [Boolean, String, Number],
        default: 0
      },
      ...(_$ = (__ = uni.$uv) == null ? void 0 : __.props) == null ? void 0 : _$.actionSheet
    }
  };
  const _sfc_main$A = {
    name: "uv-action-sheet",
    mixins: [openType, button, mpMixin, mixin, props$3],
    emits: ["close", "select"],
    computed: {
      // 操作项目的样式
      itemStyle() {
        return (index2) => {
          let style = {};
          if (this.actions[index2].color)
            style.color = this.actions[index2].color;
          if (this.actions[index2].fontSize)
            style.fontSize = this.$uv.addUnit(this.actions[index2].fontSize);
          if (this.actions[index2].disabled)
            style.color = "#c0c4cc";
          return style;
        };
      }
    },
    methods: {
      open() {
        this.$refs.popup.open();
      },
      close() {
        this.$refs.popup.close();
      },
      popupChange(e2) {
        if (!e2.show)
          this.$emit("close");
      },
      // 点击取消按钮
      cancel() {
        this.close();
      },
      selectHandler(index2) {
        const item = this.actions[index2];
        if (item && !item.disabled && !item.loading) {
          this.$emit("select", item);
          if (this.closeOnClickAction) {
            this.close();
          }
        }
      }
    }
  };
  function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_4$2);
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_2$2);
    const _component_uv_gap = resolveEasycom(vue.resolveDynamicComponent("uv-gap"), __easycom_3);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_4);
    return vue.openBlock(), vue.createBlock(_component_uv_popup, {
      ref: "popup",
      mode: "bottom",
      safeAreaInsetBottom: _ctx.safeAreaInsetBottom,
      round: _ctx.round,
      "close-on-click-overlay": _ctx.closeOnClickOverlay,
      onChange: $options.popupChange
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "uv-action-sheet" }, [
          _ctx.title ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uv-action-sheet__header"
          }, [
            vue.createElementVNode(
              "text",
              { class: "uv-action-sheet__header__title uv-line-1" },
              vue.toDisplayString(_ctx.title),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", {
              class: "uv-action-sheet__header__icon-wrap",
              onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.cancel && $options.cancel(...args), ["stop"]))
            }, [
              vue.createVNode(_component_uv_icon, {
                name: "close",
                size: "17",
                color: "#c8c9cc",
                bold: ""
              })
            ])
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.description ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 1,
              class: "uv-action-sheet__description",
              style: vue.normalizeStyle([{
                marginTop: `${_ctx.title && _ctx.description ? 0 : "18px"}`
              }])
            },
            vue.toDisplayString(_ctx.description),
            5
            /* TEXT, STYLE */
          )) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            _ctx.description ? (vue.openBlock(), vue.createBlock(_component_uv_line, { key: 0 })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "uv-action-sheet__item-wrap" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(_ctx.actions, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock("view", { key: index2 }, [
                    vue.createElementVNode("view", {
                      class: "uv-action-sheet__item-wrap__item",
                      onClick: vue.withModifiers(($event) => $options.selectHandler(index2), ["stop"]),
                      "hover-class": !item.disabled && !item.loading ? "uv-action-sheet--hover" : "",
                      "hover-stay-time": 150
                    }, [
                      !item.loading ? (vue.openBlock(), vue.createElementBlock(
                        vue.Fragment,
                        { key: 0 },
                        [
                          vue.createElementVNode(
                            "text",
                            {
                              class: "uv-action-sheet__item-wrap__item__name",
                              style: vue.normalizeStyle([$options.itemStyle(index2)])
                            },
                            vue.toDisplayString(item.name),
                            5
                            /* TEXT, STYLE */
                          ),
                          item.subname ? (vue.openBlock(), vue.createElementBlock(
                            "text",
                            {
                              key: 0,
                              class: "uv-action-sheet__item-wrap__item__subname"
                            },
                            vue.toDisplayString(item.subname),
                            1
                            /* TEXT */
                          )) : vue.createCommentVNode("v-if", true)
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      )) : (vue.openBlock(), vue.createBlock(_component_uv_loading_icon, {
                        key: 1,
                        "custom-class": "van-action-sheet__loading",
                        size: "18",
                        mode: "circle"
                      }))
                    ], 8, ["onClick", "hover-class"]),
                    index2 !== _ctx.actions.length - 1 ? (vue.openBlock(), vue.createBlock(_component_uv_line, { key: 0 })) : vue.createCommentVNode("v-if", true)
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ], true),
          _ctx.cancelText ? (vue.openBlock(), vue.createBlock(_component_uv_gap, {
            key: 2,
            bgColor: "#eaeaec",
            height: "6"
          })) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { "hover-class": "uv-action-sheet--hover" }, [
            _ctx.cancelText ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                }, ["stop", "prevent"])),
                "hover-stay-time": 150,
                class: "uv-action-sheet__cancel-text",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.cancel && $options.cancel(...args))
              },
              vue.toDisplayString(_ctx.cancelText),
              33
              /* TEXT, HYDRATE_EVENTS */
            )) : vue.createCommentVNode("v-if", true)
          ])
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["safeAreaInsetBottom", "round", "close-on-click-overlay", "onChange"]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$z], ["__scopeId", "data-v-39528ed0"], ["__file", "E:/BankSystem/user/uni_modules/uv-action-sheet/components/uv-action-sheet/uv-action-sheet.vue"]]);
  const props$2 = {
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 是否打开组件
      show: {
        type: Boolean,
        default: false
      },
      // 是否展示顶部的操作栏
      showToolbar: {
        type: Boolean,
        default: true
      },
      // 顶部标题
      title: {
        type: String,
        default: ""
      },
      // 展示格式，mode=date为日期选择，mode=time为时间选择，mode=year-month为年月选择，mode=datetime为日期时间选择
      mode: {
        type: String,
        default: "datetime"
      },
      // 可选的最大时间
      maxDate: {
        type: Number,
        // 最大默认值为后10年
        default: new Date((/* @__PURE__ */ new Date()).getFullYear() + 10, 0, 1).getTime()
      },
      // 可选的最小时间
      minDate: {
        type: Number,
        // 最小默认值为前10年
        default: new Date((/* @__PURE__ */ new Date()).getFullYear() - 10, 0, 1).getTime()
      },
      // 可选的最小小时，仅mode=time有效
      minHour: {
        type: Number,
        default: 0
      },
      // 可选的最大小时，仅mode=time有效
      maxHour: {
        type: Number,
        default: 23
      },
      // 可选的最小分钟，仅mode=time有效
      minMinute: {
        type: Number,
        default: 0
      },
      // 可选的最大分钟，仅mode=time有效
      maxMinute: {
        type: Number,
        default: 59
      },
      // 选项过滤函数
      filter: {
        type: [Function, null],
        default: null
      },
      // 选项格式化函数
      formatter: {
        type: [Function, null],
        default: null
      },
      // 是否显示加载中状态
      loading: {
        type: Boolean,
        default: false
      },
      // 各列中，单个选项的高度
      itemHeight: {
        type: [String, Number],
        default: 44
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确认"
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: "#909193"
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: "#3c9cff"
      },
      // 每列中可见选项的数量
      visibleItemCount: {
        type: [String, Number],
        default: 5
      },
      // 是否允许点击遮罩关闭选择器
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 是否允许点击确认关闭选择器
      closeOnClickConfirm: {
        type: Boolean,
        default: true
      },
      // 是否清空上次选择内容
      clearDate: {
        type: Boolean,
        default: false
      },
      // 圆角
      round: {
        type: [String, Number],
        default: 0
      },
      ...(_ba = (_aa = uni.$uv) == null ? void 0 : _aa.props) == null ? void 0 : _ba.datetimePicker
    }
  };
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var require_dayjs_min = __commonJS({
    "uvuidayjs"(exports, module) {
      !function(t2, e2) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e2() : "function" == typeof define && define.amd ? define(e2) : (t2 = "undefined" != typeof globalThis ? globalThis : t2 || self).dayjs = e2();
      }(exports, function() {
        var t2 = 1e3, e2 = 6e4, n2 = 36e5, r2 = "millisecond", i2 = "second", s2 = "minute", u2 = "hour", a2 = "day", o2 = "week", f2 = "month", h2 = "quarter", c2 = "year", d2 = "date", l2 = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t22) {
          var e22 = ["th", "st", "nd", "rd"], n22 = t22 % 100;
          return "[" + t22 + (e22[(n22 - 20) % 10] || e22[n22] || e22[0]) + "]";
        } }, m2 = function(t22, e22, n22) {
          var r22 = String(t22);
          return !r22 || r22.length >= e22 ? t22 : "" + Array(e22 + 1 - r22.length).join(n22) + t22;
        }, v2 = { s: m2, z: function(t22) {
          var e22 = -t22.utcOffset(), n22 = Math.abs(e22), r22 = Math.floor(n22 / 60), i22 = n22 % 60;
          return (e22 <= 0 ? "+" : "-") + m2(r22, 2, "0") + ":" + m2(i22, 2, "0");
        }, m: function t22(e22, n22) {
          if (e22.date() < n22.date())
            return -t22(n22, e22);
          var r22 = 12 * (n22.year() - e22.year()) + (n22.month() - e22.month()), i22 = e22.clone().add(r22, f2), s22 = n22 - i22 < 0, u22 = e22.clone().add(r22 + (s22 ? -1 : 1), f2);
          return +(-(r22 + (n22 - i22) / (s22 ? i22 - u22 : u22 - i22)) || 0);
        }, a: function(t22) {
          return t22 < 0 ? Math.ceil(t22) || 0 : Math.floor(t22);
        }, p: function(t22) {
          return { M: f2, y: c2, w: o2, d: a2, D: d2, h: u2, m: s2, s: i2, ms: r2, Q: h2 }[t22] || String(t22 || "").toLowerCase().replace(/s$/, "");
        }, u: function(t22) {
          return void 0 === t22;
        } }, g2 = "en", D = {};
        D[g2] = M;
        var p2 = function(t22) {
          return t22 instanceof _;
        }, S = function t22(e22, n22, r22) {
          var i22;
          if (!e22)
            return g2;
          if ("string" == typeof e22) {
            var s22 = e22.toLowerCase();
            D[s22] && (i22 = s22), n22 && (D[s22] = n22, i22 = s22);
            var u22 = e22.split("-");
            if (!i22 && u22.length > 1)
              return t22(u22[0]);
          } else {
            var a22 = e22.name;
            D[a22] = e22, i22 = a22;
          }
          return !r22 && i22 && (g2 = i22), i22 || !r22 && g2;
        }, w = function(t22, e22) {
          if (p2(t22))
            return t22.clone();
          var n22 = "object" == typeof e22 ? e22 : {};
          return n22.date = t22, n22.args = arguments, new _(n22);
        }, O = v2;
        O.l = S, O.i = p2, O.w = function(t22, e22) {
          return w(t22, { locale: e22.$L, utc: e22.$u, x: e22.$x, $offset: e22.$offset });
        };
        var _ = function() {
          function M2(t22) {
            this.$L = S(t22.locale, null, true), this.parse(t22);
          }
          var m22 = M2.prototype;
          return m22.parse = function(t22) {
            this.$d = function(t3) {
              var e22 = t3.date, n22 = t3.utc;
              if (null === e22)
                return /* @__PURE__ */ new Date(NaN);
              if (O.u(e22))
                return /* @__PURE__ */ new Date();
              if (e22 instanceof Date)
                return new Date(e22);
              if ("string" == typeof e22 && !/Z$/i.test(e22)) {
                var r22 = e22.match($);
                if (r22) {
                  var i22 = r22[2] - 1 || 0, s22 = (r22[7] || "0").substring(0, 3);
                  return n22 ? new Date(Date.UTC(r22[1], i22, r22[3] || 1, r22[4] || 0, r22[5] || 0, r22[6] || 0, s22)) : new Date(r22[1], i22, r22[3] || 1, r22[4] || 0, r22[5] || 0, r22[6] || 0, s22);
                }
              }
              return new Date(e22);
            }(t22), this.$x = t22.x || {}, this.init();
          }, m22.init = function() {
            var t22 = this.$d;
            this.$y = t22.getFullYear(), this.$M = t22.getMonth(), this.$D = t22.getDate(), this.$W = t22.getDay(), this.$H = t22.getHours(), this.$m = t22.getMinutes(), this.$s = t22.getSeconds(), this.$ms = t22.getMilliseconds();
          }, m22.$utils = function() {
            return O;
          }, m22.isValid = function() {
            return !(this.$d.toString() === l2);
          }, m22.isSame = function(t22, e22) {
            var n22 = w(t22);
            return this.startOf(e22) <= n22 && n22 <= this.endOf(e22);
          }, m22.isAfter = function(t22, e22) {
            return w(t22) < this.startOf(e22);
          }, m22.isBefore = function(t22, e22) {
            return this.endOf(e22) < w(t22);
          }, m22.$g = function(t22, e22, n22) {
            return O.u(t22) ? this[e22] : this.set(n22, t22);
          }, m22.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
          }, m22.valueOf = function() {
            return this.$d.getTime();
          }, m22.startOf = function(t22, e22) {
            var n22 = this, r22 = !!O.u(e22) || e22, h22 = O.p(t22), l22 = function(t3, e3) {
              var i22 = O.w(n22.$u ? Date.UTC(n22.$y, e3, t3) : new Date(n22.$y, e3, t3), n22);
              return r22 ? i22 : i22.endOf(a2);
            }, $2 = function(t3, e3) {
              return O.w(n22.toDate()[t3].apply(n22.toDate("s"), (r22 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n22);
            }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v22 = "set" + (this.$u ? "UTC" : "");
            switch (h22) {
              case c2:
                return r22 ? l22(1, 0) : l22(31, 11);
              case f2:
                return r22 ? l22(1, M3) : l22(0, M3 + 1);
              case o2:
                var g22 = this.$locale().weekStart || 0, D2 = (y2 < g22 ? y2 + 7 : y2) - g22;
                return l22(r22 ? m3 - D2 : m3 + (6 - D2), M3);
              case a2:
              case d2:
                return $2(v22 + "Hours", 0);
              case u2:
                return $2(v22 + "Minutes", 1);
              case s2:
                return $2(v22 + "Seconds", 2);
              case i2:
                return $2(v22 + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }, m22.endOf = function(t22) {
            return this.startOf(t22, false);
          }, m22.$set = function(t22, e22) {
            var n22, o22 = O.p(t22), h22 = "set" + (this.$u ? "UTC" : ""), l22 = (n22 = {}, n22[a2] = h22 + "Date", n22[d2] = h22 + "Date", n22[f2] = h22 + "Month", n22[c2] = h22 + "FullYear", n22[u2] = h22 + "Hours", n22[s2] = h22 + "Minutes", n22[i2] = h22 + "Seconds", n22[r2] = h22 + "Milliseconds", n22)[o22], $2 = o22 === a2 ? this.$D + (e22 - this.$W) : e22;
            if (o22 === f2 || o22 === c2) {
              var y2 = this.clone().set(d2, 1);
              y2.$d[l22]($2), y2.init(), this.$d = y2.set(d2, Math.min(this.$D, y2.daysInMonth())).$d;
            } else
              l22 && this.$d[l22]($2);
            return this.init(), this;
          }, m22.set = function(t22, e22) {
            return this.clone().$set(t22, e22);
          }, m22.get = function(t22) {
            return this[O.p(t22)]();
          }, m22.add = function(r22, h22) {
            var d22, l22 = this;
            r22 = Number(r22);
            var $2 = O.p(h22), y2 = function(t22) {
              var e22 = w(l22);
              return O.w(e22.date(e22.date() + Math.round(t22 * r22)), l22);
            };
            if ($2 === f2)
              return this.set(f2, this.$M + r22);
            if ($2 === c2)
              return this.set(c2, this.$y + r22);
            if ($2 === a2)
              return y2(1);
            if ($2 === o2)
              return y2(7);
            var M3 = (d22 = {}, d22[s2] = e2, d22[u2] = n2, d22[i2] = t2, d22)[$2] || 1, m3 = this.$d.getTime() + r22 * M3;
            return O.w(m3, this);
          }, m22.subtract = function(t22, e22) {
            return this.add(-1 * t22, e22);
          }, m22.format = function(t22) {
            var e22 = this, n22 = this.$locale();
            if (!this.isValid())
              return n22.invalidDate || l2;
            var r22 = t22 || "YYYY-MM-DDTHH:mm:ssZ", i22 = O.z(this), s22 = this.$H, u22 = this.$m, a22 = this.$M, o22 = n22.weekdays, f22 = n22.months, h22 = function(t3, n3, i3, s3) {
              return t3 && (t3[n3] || t3(e22, r22)) || i3[n3].slice(0, s3);
            }, c22 = function(t3) {
              return O.s(s22 % 12 || 12, t3, "0");
            }, d22 = n22.meridiem || function(t3, e3, n3) {
              var r3 = t3 < 12 ? "AM" : "PM";
              return n3 ? r3.toLowerCase() : r3;
            }, $2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a22 + 1, MM: O.s(a22 + 1, 2, "0"), MMM: h22(n22.monthsShort, a22, f22, 3), MMMM: h22(f22, a22), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h22(n22.weekdaysMin, this.$W, o22, 2), ddd: h22(n22.weekdaysShort, this.$W, o22, 3), dddd: o22[this.$W], H: String(s22), HH: O.s(s22, 2, "0"), h: c22(1), hh: c22(2), a: d22(s22, u22, true), A: d22(s22, u22, false), m: String(u22), mm: O.s(u22, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i22 };
            return r22.replace(y, function(t3, e3) {
              return e3 || $2[t3] || i22.replace(":", "");
            });
          }, m22.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }, m22.diff = function(r22, d22, l22) {
            var $2, y2 = O.p(d22), M3 = w(r22), m3 = (M3.utcOffset() - this.utcOffset()) * e2, v22 = this - M3, g22 = O.m(this, M3);
            return g22 = ($2 = {}, $2[c2] = g22 / 12, $2[f2] = g22, $2[h2] = g22 / 3, $2[o2] = (v22 - m3) / 6048e5, $2[a2] = (v22 - m3) / 864e5, $2[u2] = v22 / n2, $2[s2] = v22 / e2, $2[i2] = v22 / t2, $2)[y2] || v22, l22 ? g22 : O.a(g22);
          }, m22.daysInMonth = function() {
            return this.endOf(f2).$D;
          }, m22.$locale = function() {
            return D[this.$L];
          }, m22.locale = function(t22, e22) {
            if (!t22)
              return this.$L;
            var n22 = this.clone(), r22 = S(t22, e22, true);
            return r22 && (n22.$L = r22), n22;
          }, m22.clone = function() {
            return O.w(this.$d, this);
          }, m22.toDate = function() {
            return new Date(this.valueOf());
          }, m22.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
          }, m22.toISOString = function() {
            return this.$d.toISOString();
          }, m22.toString = function() {
            return this.$d.toUTCString();
          }, M2;
        }(), T = _.prototype;
        return w.prototype = T, [["$ms", r2], ["$s", i2], ["$m", s2], ["$H", u2], ["$W", a2], ["$M", f2], ["$y", c2], ["$D", d2]].forEach(function(t22) {
          T[t22[1]] = function(e22) {
            return this.$g(e22, t22[0], t22[1]);
          };
        }), w.extend = function(t22, e22) {
          return t22.$i || (t22(e22, _, w), t22.$i = true), w;
        }, w.locale = S, w.isDayjs = p2, w.unix = function(t22) {
          return w(1e3 * t22);
        }, w.en = D[g2], w.Ls = D, w.p = {}, w;
      });
    }
  });
  const dayjs = require_dayjs_min();
  function times(n2, iteratee) {
    let index2 = -1;
    const result = Array(n2 < 0 ? 0 : n2);
    while (++index2 < n2) {
      result[index2] = iteratee(index2);
    }
    return result;
  }
  const _sfc_main$z = {
    name: "uv-datetime-picker",
    emits: ["close", "cancel", "confirm", "input", "change", "update:modelValue"],
    mixins: [mpMixin, mixin, props$2],
    data() {
      return {
        columns: [],
        innerDefaultIndex: [],
        innerFormatter: (type2, value2) => value2
      };
    },
    watch: {
      propsChange() {
        this.init();
      }
    },
    computed: {
      // 如果以下这些变量发生了变化，意味着需要重新初始化各列的值
      propsChange() {
        const propsValue = this.value || this.modelValue;
        return [this.mode, this.maxDate, this.minDate, this.minHour, this.maxHour, this.minMinute, this.maxMinute, this.filter, propsValue];
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getValue();
        this.updateColumnValue(this.innerValue);
      },
      getValue() {
        const propsValue = this.value || this.modelValue;
        this.innerValue = this.correctValue(propsValue);
      },
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e2) {
        this.innerFormatter = e2;
      },
      open() {
        this.$refs.picker.open();
        this.getValue();
        this.updateColumnValue(this.innerValue);
      },
      close() {
        this.$emit("close");
      },
      // 点击工具栏的取消按钮
      cancel() {
        this.$emit("cancel");
      },
      // 点击工具栏的确定按钮
      confirm() {
        this.$emit("confirm", {
          value: this.innerValue,
          mode: this.mode
        });
        if (!this.clearDate) {
          this.$emit("input", this.innerValue);
          this.$emit("update:modelValue", this.innerValue);
        }
      },
      //用正则截取输出值,当出现多组数字时,抛出错误
      intercept(e2, type2) {
        let judge = e2.match(/\d+/g);
        if (judge.length > 1) {
          this.$uv.error("请勿在过滤或格式化函数时添加数字");
          return 0;
        } else if (type2 && judge[0].length == 4) {
          return judge[0];
        } else if (judge[0].length > 2) {
          this.$uv.error("请勿在过滤或格式化函数时添加数字");
          return 0;
        } else {
          return judge[0];
        }
      },
      // 列发生变化时触发
      change(e2) {
        const { indexs, values } = e2;
        let selectValue = "";
        if (this.mode === "time") {
          selectValue = `${this.intercept(values[0][indexs[0]])}:${this.intercept(values[1][indexs[1]])}`;
        } else if (this.mode === "year") {
          const year = parseInt(this.intercept(values[0][indexs[0]], "year"));
          selectValue = Number(new Date(year, 0));
        } else {
          const year = parseInt(this.intercept(values[0][indexs[0]], "year"));
          const month = parseInt(this.intercept(values[1][indexs[1]]));
          let date2 = parseInt(values[2] ? this.intercept(values[2][indexs[2]]) : 1);
          let hour = 0, minute = 0;
          const maxDate = dayjs(`${year}-${month}`).daysInMonth();
          if (this.mode === "year-month") {
            date2 = 1;
          }
          date2 = Math.min(maxDate, date2);
          if (this.mode === "datetime") {
            hour = parseInt(this.intercept(values[3][indexs[3]]));
            minute = parseInt(this.intercept(values[4][indexs[4]]));
          }
          selectValue = Number(new Date(year, month - 1, date2, hour, minute));
        }
        selectValue = this.correctValue(selectValue);
        this.innerValue = selectValue;
        this.updateColumnValue(selectValue);
        this.$emit("change", {
          value: selectValue,
          mode: this.mode
        });
      },
      // 更新各列的值，进行补0、格式化等操作
      updateColumnValue(value2) {
        this.innerValue = value2;
        this.updateColumns();
        this.updateIndexs(value2);
      },
      // 更新索引
      updateIndexs(value2) {
        let values = [];
        const formatter = this.formatter || this.innerFormatter;
        if (this.mode === "time") {
          const timeArr = value2.split(":");
          values = [formatter("hour", timeArr[0]), formatter("minute", timeArr[1])];
        } else {
          values = [
            formatter("year", `${dayjs(value2).year()}`),
            // 月份补0
            formatter("month", this.$uv.padZero(dayjs(value2).month() + 1))
          ];
          if (this.mode === "date") {
            values.push(formatter("day", this.$uv.padZero(dayjs(value2).date())));
          }
          if (this.mode === "datetime") {
            values.push(formatter("day", this.$uv.padZero(dayjs(value2).date())), formatter("hour", this.$uv.padZero(dayjs(value2).hour())), formatter("minute", this.$uv.padZero(dayjs(value2).minute())));
          }
        }
        const indexs = this.columns.map((column, index2) => {
          return Math.max(0, column.findIndex((item) => item === values[index2]));
        });
        this.$nextTick(() => {
          this.$uv.sleep(100).then((res) => {
            this.$refs.picker.setIndexs(indexs, true);
          });
        });
      },
      // 更新各列的值
      updateColumns() {
        const formatter = this.formatter || this.innerFormatter;
        const results = this.getOriginColumns().map((column) => column.values.map((value2) => formatter(column.type, value2)));
        this.columns = results;
      },
      getOriginColumns() {
        const results = this.getRanges().map(({ type: type2, range: range2 }) => {
          let values = times(range2[1] - range2[0] + 1, (index2) => {
            let value2 = range2[0] + index2;
            value2 = type2 === "year" ? `${value2}` : this.$uv.padZero(value2);
            return value2;
          });
          if (this.filter) {
            values = this.filter(type2, values);
          }
          return { type: type2, values };
        });
        return results;
      },
      // 通过最大值和最小值生成数组
      generateArray(start, end) {
        return Array.from(new Array(end + 1).keys()).slice(start);
      },
      // 得出合法的时间
      correctValue(value2) {
        const isDateMode = this.mode !== "time";
        if (isDateMode && !this.$uv.test.date(value2)) {
          value2 = this.minDate;
        } else if (!isDateMode && !value2) {
          value2 = `${this.$uv.padZero(this.minHour)}:${this.$uv.padZero(this.minMinute)}`;
        }
        if (!isDateMode) {
          if (String(value2).indexOf(":") === -1)
            return this.$uv.error("时间错误，请传递如12:24的格式");
          let [hour, minute] = value2.split(":");
          hour = this.$uv.padZero(this.$uv.range(this.minHour, this.maxHour, Number(hour)));
          minute = this.$uv.padZero(this.$uv.range(this.minMinute, this.maxMinute, Number(minute)));
          return `${hour}:${minute}`;
        } else {
          value2 = dayjs(value2).isBefore(dayjs(this.minDate)) ? this.minDate : value2;
          value2 = dayjs(value2).isAfter(dayjs(this.maxDate)) ? this.maxDate : value2;
          return value2;
        }
      },
      // 获取每列的最大和最小值
      getRanges() {
        if (this.mode === "time") {
          return [{
            type: "hour",
            range: [this.minHour, this.maxHour]
          }, {
            type: "minute",
            range: [this.minMinute, this.maxMinute]
          }];
        }
        const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = this.getBoundary("max", this.innerValue);
        const { minYear, minDate, minMonth, minHour, minMinute } = this.getBoundary("min", this.innerValue);
        const result = [{
          type: "year",
          range: [minYear, maxYear]
        }, {
          type: "month",
          range: [minMonth, maxMonth]
        }, {
          type: "day",
          range: [minDate, maxDate]
        }, {
          type: "hour",
          range: [minHour, maxHour]
        }, {
          type: "minute",
          range: [minMinute, maxMinute]
        }];
        if (this.mode === "date")
          result.splice(3, 2);
        if (this.mode === "year-month")
          result.splice(2, 3);
        if (this.mode === "year")
          result.splice(1, 4);
        return result;
      },
      // 根据minDate、maxDate、minHour、maxHour等边界值，判断各列的开始和结束边界值
      getBoundary(type2, innerValue) {
        const value2 = new Date(innerValue);
        const boundary = new Date(this[`${type2}Date`]);
        const year = dayjs(boundary).year();
        let month = 1;
        let date2 = 1;
        let hour = 0;
        let minute = 0;
        if (type2 === "max") {
          month = 12;
          date2 = dayjs(value2).daysInMonth();
          hour = 23;
          minute = 59;
        }
        if (dayjs(value2).year() === year) {
          month = dayjs(boundary).month() + 1;
          if (dayjs(value2).month() + 1 === month) {
            date2 = dayjs(boundary).date();
            if (dayjs(value2).date() === date2) {
              hour = dayjs(boundary).hour();
              if (dayjs(value2).hour() === hour) {
                minute = dayjs(boundary).minute();
              }
            }
          }
        }
        return {
          [`${type2}Year`]: year,
          [`${type2}Month`]: month,
          [`${type2}Date`]: date2,
          [`${type2}Hour`]: hour,
          [`${type2}Minute`]: minute
        };
      }
    }
  };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_picker = resolveEasycom(vue.resolveDynamicComponent("uv-picker"), __easycom_0$7);
    return vue.openBlock(), vue.createBlock(_component_uv_picker, {
      ref: "picker",
      closeOnClickOverlay: _ctx.closeOnClickOverlay,
      closeOnClickConfirm: _ctx.closeOnClickConfirm,
      columns: $data.columns,
      title: _ctx.title,
      itemHeight: _ctx.itemHeight,
      showToolbar: _ctx.showToolbar,
      visibleItemCount: _ctx.visibleItemCount,
      defaultIndex: $data.innerDefaultIndex,
      cancelText: _ctx.cancelText,
      confirmText: _ctx.confirmText,
      cancelColor: _ctx.cancelColor,
      confirmColor: _ctx.confirmColor,
      onClose: $options.close,
      onCancel: $options.cancel,
      onConfirm: $options.confirm,
      onChange: $options.change,
      round: _ctx.round
    }, null, 8, ["closeOnClickOverlay", "closeOnClickConfirm", "columns", "title", "itemHeight", "showToolbar", "visibleItemCount", "defaultIndex", "cancelText", "confirmText", "cancelColor", "confirmColor", "onClose", "onCancel", "onConfirm", "onChange", "round"]);
  }
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$y], ["__file", "E:/BankSystem/user/uni_modules/uv-datetime-picker/components/uv-datetime-picker/uv-datetime-picker.vue"]]);
  const _sfc_main$y = {
    data() {
      return {
        model1: {
          userInfo: {
            num: "",
            name: "",
            ename: "",
            cardType: "",
            cardNumber: "",
            country: "",
            nation: "",
            sex: "",
            bornTime: "",
            bornPlace: ""
          },
          cardInfo: {
            country: "",
            region: "",
            detailAddress: ""
          },
          addressInfo: {
            country: "",
            region: "",
            detailAddress: "",
            zipCode: ""
          },
          workInfo: {
            profession: "",
            workPlaceName: "",
            schoolName: "",
            sector: "",
            salaryInterval: ""
          },
          phonenumber: ""
        },
        pickDate: "",
        rule1: {
          "userInfo.num": {
            tpye: "number",
            required: true,
            trigger: ["change"]
          },
          "userInfo.name": {
            tpye: "string",
            required: true,
            trigger: ["change"],
            message: "姓名不能为空"
          },
          "userInfo.sex": {
            tpye: "string",
            required: true,
            trigger: ["change"]
          },
          "addressInfo.zipCode": {
            tpye: "number",
            require: true,
            trigger: ["change"],
            len: 6,
            message: "请输入6位的有效邮编"
          }
        },
        sexes: [
          {
            name: "男"
          },
          {
            name: "女"
          },
          {
            name: "其他"
          }
        ],
        nations: [
          [
            "汉族",
            "蒙古族",
            "回族",
            "藏族",
            "维吾尔族",
            "苗族",
            "彝族",
            "壮族",
            "布依族",
            "朝鲜族",
            "满族",
            "侗族",
            "瑶族",
            "白族",
            "土家族",
            "哈尼族",
            "哈萨克族",
            "傣族",
            "黎族",
            "傈僳族",
            "佤族",
            "畲族",
            "高山族",
            "拉祜族",
            "水族",
            "东乡族",
            "纳西族",
            "景颇族",
            "柯尔克孜族",
            "土族",
            "达斡尔族",
            "仫佬族",
            "羌族",
            "布朗族",
            "撒拉族",
            "毛南族",
            "仡佬族",
            "锡伯族",
            "阿昌族",
            "普米族",
            "塔吉克族",
            "怒族",
            "乌孜别克族",
            "俄罗斯族",
            "鄂温克族",
            "德昂族",
            "保安族",
            "裕固族",
            "京族",
            "塔塔尔族",
            "独龙族",
            "鄂伦春族",
            "赫哲族",
            "门巴族",
            "珞巴族",
            "基诺族"
          ]
        ],
        countries: [
          [
            "巴哈马",
            "巴林",
            "孟加拉国",
            "巴巴多斯",
            "白俄罗斯",
            "比利时",
            "伯利兹",
            "贝宁",
            "不丹",
            "玻利维亚",
            "波斯尼亚和黑塞哥维那",
            "博茨瓦纳",
            "巴西",
            "文莱达鲁萨兰国",
            "保加利亚",
            "布基纳法索",
            "布隆迪",
            "柬埔寨",
            "喀麦隆",
            "加拿大",
            "佛得角",
            "开曼群岛",
            "中非共和国",
            "乍得",
            "智利",
            "中国",
            "哥伦比亚",
            "科摩罗",
            "刚果（金）",
            "刚果（布）",
            "哥斯达黎加",
            "科特迪瓦",
            "克罗地亚",
            "古巴",
            "塞浦路斯",
            "捷克共和国",
            "丹麦",
            "吉布提",
            "多米尼克国",
            "多米尼加共和国",
            "厄瓜多尔",
            "埃及",
            "萨尔瓦多",
            "赤道几内亚",
            "厄立特里亚",
            "爱沙尼亚",
            "埃塞俄比亚",
            "斐济",
            "芬兰",
            "法国",
            "加蓬",
            "冈比亚",
            "格鲁吉亚",
            "德国",
            "加纳",
            "希腊",
            "格林纳达",
            "危地马拉",
            "几内亚比绍",
            "几内亚共和国",
            "圭亚那合作共和国",
            "海地共和国",
            "洪都拉斯共和国",
            "匈牙利共和国",
            "冰岛共和国",
            "印度",
            "印度尼西亚共和国",
            "伊朗伊斯兰共和国",
            "伊拉克共和国",
            "爱尔兰共和国",
            "以色列国",
            "意大利共和国",
            "牙买加共和国",
            "日本国",
            "约旦哈希姆王国",
            "哈萨克斯坦共和国",
            "肯尼亚共和国",
            "基里巴斯共和国",
            "朝鲜民主主义人民共和国",
            "大韩民国",
            "科威特国",
            "吉尔吉斯共和国",
            "老挝人民",
            "民主共和国",
            "拉脱维亚共和国",
            "黎巴嫩共和国",
            "莱索托王国",
            "列支敦士登公国",
            "立陶宛共和国",
            "卢森堡大公国",
            "马其顿王国",
            "马拉维共和国",
            "马来西亚联邦",
            "马里共和国",
            "毛里塔尼亚伊斯兰共和国",
            "毛里求斯共和国",
            "美利坚合众国",
            "蒙古国",
            "黑山共和国",
            "摩洛哥王国",
            "莫桑比克共和国",
            "缅甸联邦共和国",
            "纳米比亚共和国",
            "尼泊尔王国",
            "荷兰王国",
            "新西兰王国（包括库克群岛和纽埃）",
            "新喀里多尼亚群岛的新喀里多尼亚（法国）",
            "尼加拉瓜共和国",
            "诺福克岛（澳大利亚）",
            "挪威王国",
            "阿曼苏丹国",
            "巴基斯坦伊斯兰共和国",
            "巴拿马共和国",
            "巴布亚新几内亚独立国",
            "巴拉圭共和国",
            "秘鲁共和国",
            "菲律宾共和国（菲律宾）",
            "波兰共和国（波兰）",
            "葡萄牙共和国（葡萄牙）",
            "卡塔尔国（卡塔尔）",
            "韩国民国（韩国）",
            "大阿拉伯利比亚人民社会主义民众国（利比亚）",
            "罗马尼亚（罗马尼亚）",
            "俄罗斯联邦（俄罗斯）",
            "卢旺达共和国（卢旺达）",
            "沙特阿拉伯王国（沙特阿拉伯）",
            "塞内加尔共和国（塞内加尔）",
            "塞尔维亚共和国（塞尔维亚）",
            "塞舌尔共和国（塞舌尔）",
            "塞拉利昂共和国（塞拉利昂）",
            "新加坡共和国（新加坡）",
            "斯洛伐克共和国（斯洛伐克）",
            "斯洛文尼亚共和国（斯洛文尼亚）",
            "所罗门群岛（所罗门群岛）",
            "索马里联邦共和国（索马里）",
            "南非共和国（南非）",
            "西班牙王国（西班牙）",
            "斯里兰卡民主社会主义共和国（斯里兰卡）",
            "苏丹共和国（苏丹）",
            "苏里南共和国（苏里南）",
            "阿拉伯叙利亚人民社会主义民主国（叙利亚）",
            "塔吉克斯坦共和国（塔吉克斯坦）",
            "坦桑尼亚联合共和国（坦桑尼亚）",
            "泰国王国（泰国）",
            "前南斯拉夫的马其顿共和国（马其顿）"
          ]
        ],
        state: [
          [
            "北京市",
            "天津市",
            "上海市",
            "重庆市",
            "河北省",
            "山西省",
            "辽宁省",
            "吉林省",
            "黑龙江省",
            "江苏省",
            "浙江省",
            "安徽省",
            "福建省",
            "江西省",
            "山东省",
            "河南省",
            "湖北省",
            "湖南省",
            "广东省",
            "海南省",
            "四川省",
            "贵州省",
            "云南省",
            "陕西省",
            "甘肃省",
            "青海省",
            "台湾省",
            "内蒙古自治区",
            "广西壮族自治区",
            "宁夏回族自治区",
            "新疆维吾尔自治区",
            "西藏自治区",
            "香港特别行政区",
            "澳门特别行政区"
          ]
        ],
        career: [
          [
            "中国共产党中央委员会和地方各级组织负责人",
            "国家机关及其工作机构负责人",
            "民主党派，社会团体及工作机构负责人",
            "事业单位负责人",
            "企业负责人",
            "科学研究人员",
            "工程技术（计算机）人员",
            "农业技术人员",
            "飞行和船舶技术等人员",
            "卫生专业技术人员",
            "经济业务人员（不含会计师）",
            "会计师",
            "金融业务人员（不含律师）",
            "律师",
            "教学人员",
            "文学艺术工作人员",
            "体育工作人员",
            "新闻出版，文化工作人员",
            "其他专业技术人员",
            "行政办公人员",
            "安全保卫和消防工作人员",
            "邮电和电信业务人员",
            "事业单位员工",
            "其他办事人员和有关人员",
            "商业，服务业人员",
            "农，林，牧，渔，水利业生产人员",
            "生产，运输设备操作人员及有关人员",
            "军人",
            "学生",
            "外交人员",
            "私营业主",
            "退休人员",
            "家庭主妇",
            "无职业活动人员（不含退休人员，家庭主妇）"
          ]
        ],
        sector: [
          [
            "农，林，牧，渔业",
            "采矿业",
            "制造业",
            "电力，热力，燃气及水生产和供应业",
            "建筑业",
            "批发和零售业（不含贸易代理）",
            "贸易代理",
            "交通运输，仓储和邮政业",
            "住宿和餐饮业",
            "信息传输，软件和信息技术服务业",
            "金融业",
            "房地产业",
            "租赁业",
            "商务服务业",
            "法律服务",
            "会计，审计及税务服务",
            "旅行社及相关服务",
            "科学研究和技术服务业",
            "水利，环境和公共设施管理业",
            "居民服务，修理和其他服务业",
            "教育",
            "卫生和社会工作",
            "文化，体育和娱乐业",
            "公共管理，社会保障和社会组织",
            "国际组织",
            "其他未包含的行业"
          ]
        ],
        incomeRage: [
          [
            "0-4999",
            "5000-19999",
            "20000-49999",
            "50000-99999",
            "100000以上"
          ]
        ]
      };
    },
    onReady() {
      this.$refs.form1.setRules(this.rule1);
    },
    onLoad() {
      let that = this;
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on("personalInformation", (data) => {
        that.model1.userInfo.num = data.num;
        that.model1.userInfo.name = data.name;
        that.model1.userInfo.ename = data.ename;
        that.model1.userInfo.cardNumber = data.cardNumber;
        that.model1.userInfo.nation = data.nation;
        that.model1.userInfo.sex = data.sex;
        that.model1.userInfo.bornTime = data.bornTime;
        that.model1.userInfo.bornPlace = data.bornPlace;
        that.model1.addressInfo.region = data.region;
        that.model1.addressInfo.detailAddress = data.detailAddress;
        that.model1.addressInfo.zipCode = data.zipCode;
        that.model1.workInfo.profession = data.profession;
        that.model1.workInfo.workPlaceName = data.workPlaceName;
        that.model1.workInfo.sector = data.sector;
        that.model1.workInfo.salaryInterval = data.salaryInterval;
        that.model1.phonenumber = data.phonenumber;
      });
    },
    methods: {
      // 性别选择
      showSexSelect() {
        this.$refs.sexSelect.open();
        this.hideKeyboard();
      },
      setSex(e2) {
        this.model1.userInfo.sex = e2.name;
        this.$refs.form1.validateField("userInfo.sex");
      },
      close() {
        formatAppLog("log", "at pages/modifyPersonalInformation/modifyPersonalInformation.vue:676", "关闭");
      },
      hideKeyboard() {
        uni.hideKeyboard();
      },
      setNation(e2) {
        this.model1.userInfo.nation = e2.value[0];
        this.$refs.form1.validateField("userInfo.nation");
      },
      showNationSelect() {
        this.$refs.nationPicker.open();
        this.hideKeyboard();
      },
      setCountry(e2) {
        this.model1.cardInfo.country = e2.value[0];
        this.$refs.form2.validateField("cardInfo.country");
      },
      showCountrySelect() {
        this.$refs.countryPicker.open();
        this.hideKeyboard();
      },
      setState(e2) {
        this.model1.cardInfo.region = e2.value[0];
        this.$refs.form2.validateField("cardInfo.region");
      },
      showStateSelect() {
        this.$refs.statePicker.open();
        this.hideKeyboard();
      },
      setCountri(e2) {
        this.model1.addressInfo.country = e2.value[0];
        this.$refs.form2.validateField("addressInfo.country");
      },
      showCountriSelect() {
        this.$refs.countriPicker.open();
        this.hideKeyboard();
      },
      setRegion(e2) {
        this.model1.addressInfo.region = e2.value[0];
        this.$refs.form2.validateField("addressInfo.region");
      },
      showRegionSelect() {
        this.$refs.regionPicker.open();
        this.hideKeyboard();
      },
      showBornTimeSelect() {
        this.$refs.BornTimePicker.open();
        this.hideKeyboard();
      },
      showCareerSelect() {
        this.$refs.professionPicker.open();
        this.hideKeyboard();
      },
      setCareer(e2) {
        this.model1.workInfo.profession = e2.value[0];
        this.$refs.form4.validateField("workInfo.profession");
      },
      showSectorSelect() {
        this.$refs.sectorPicker.open();
        this.hideKeyboard();
      },
      setSector(e2) {
        this.model1.workInfo.sector = e2.value[0];
        this.$refs.form4.validateField("workInfo.sector");
      },
      showSalarySelect() {
        this.$refs.salaryPicker.open();
        this.hideKeyboard();
      },
      setSalary(e2) {
        this.model1.workInfo.salaryInterval = e2.value[0];
        this.$refs.form4.validateField("workInfo.salaryInterval");
      },
      bornTimeChange(e2) {
        let date2 = new Date(e2.value).getFullYear() + "/" + (new Date(e2.value).getMonth() + 1) + "/" + new Date(e2.value).getDate();
        const [year, month, day] = date2.split("/");
        const formattedMonth = month < 10 ? "0" + month : month;
        const formattedDay = day < 10 ? "0" + day : day;
        date2 = `${year}/${formattedMonth}/${formattedDay}`;
        if (date2 > this.currentDate()) {
          uni.showToast({
            title: "超过当前日期",
            icon: "error"
          });
          this.pickDate = this.currentDate();
        }
        formatAppLog("log", "at pages/modifyPersonalInformation/modifyPersonalInformation.vue:776", this.pickDate);
      },
      currentDate() {
        let date2 = (/* @__PURE__ */ new Date()).getFullYear() + "/" + ((/* @__PURE__ */ new Date()).getMonth() + 1) + "/" + (/* @__PURE__ */ new Date()).getDate();
        const [year, month, day] = date2.split("/");
        const formattedMonth = month < 10 ? "0" + month : month;
        const formattedDay = day < 10 ? "0" + day : day;
        return `${year}/${formattedMonth}/${formattedDay}`;
      },
      formatter(type2, value2) {
        if (type2 === "year") {
          return `${value2}年`;
        }
        if (type2 === "month") {
          return `${value2}月`;
        }
        if (type2 === "day") {
          return `${value2}日`;
        }
        return value2;
      },
      setBornTimeChange(e2) {
        let date2 = new Date(e2.value).getFullYear() + "/" + (new Date(e2.value).getMonth() + 1) + "/" + new Date(e2.value).getDate();
        const [year, month, day] = date2.split("/");
        const formattedMonth = month < 10 ? "0" + month : month;
        const formattedDay = day < 10 ? "0" + day : day;
        date2 = `${year}/${formattedMonth}/${formattedDay}`;
        if (date2 < this.currentDate()) {
          this.model1.userInfo.bornTime = date2;
          this.$refs.form1.validateField("userInfo.bornTime");
        }
      },
      turnToNext() {
        let that = this;
        uni.navigateTo({
          url: "/pages/confirmModifyPersonalInformation/confirmModifyPersonalInformation",
          success: function(res) {
            res.eventChannel.emit("newpersonalInformation", {
              "num": that.model1.userInfo.num,
              "name": that.model1.userInfo.name,
              "ename": that.model1.userInfo.ename,
              "cardNumber": that.model1.userInfo.cardNumber,
              "nation": that.model1.userInfo.nation,
              "sex": that.model1.userInfo.sex,
              "bornTime": that.model1.userInfo.bornTime,
              "bornPlace": that.model1.userInfo.bornPlace,
              "region": that.model1.addressInfo.region,
              "detailAddress": that.model1.addressInfo.detailAddress,
              "zipCode": that.model1.addressInfo.zipCode,
              "profession": that.model1.workInfo.profession,
              "workPlaceName": that.model1.workInfo.workPlaceName,
              "sector": that.model1.workInfo.sector,
              "salaryInterval": that.model1.workInfo.salaryInterval,
              "phonenumber": that.model1.phonenumber
            });
          }
        });
      }
    }
  };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0$d);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1$b);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_2$6);
    const _component_uv_action_sheet = resolveEasycom(vue.resolveDynamicComponent("uv-action-sheet"), __easycom_2);
    const _component_uv_picker = resolveEasycom(vue.resolveDynamicComponent("uv-picker"), __easycom_0$7);
    const _component_uv_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("uv-datetime-picker"), __easycom_6);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx" } }, [
          vue.createElementVNode("text", null, "基本信息"),
          vue.createVNode(_component_uv_form, {
            model: $data.model1,
            rules: $data.rule1,
            ref: "form1",
            style: { "background": "white", "margin-right": "20rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_form_item, {
                label: "电子银行客户序号",
                "label-width": "150rpx",
                prop: "userInfo.number",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.num,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.model1.userInfo.num = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true,
                    "input-align": "right"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "姓名",
                "label-width": "150rpx",
                prop: "userInfo.name",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.name,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.model1.userInfo.name = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true,
                    "input-align": "right"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "英文/拼音姓名",
                "label-width": "150rpx",
                prop: "userInfo.ename",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.ename,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.model1.userInfo.ename = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true,
                    "input-align": "right"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "证件号码",
                "label-width": "150rpx",
                prop: "userInfo.cardNumber",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.cardNumber,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.model1.userInfo.cardNumber = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true,
                    "input-align": "right"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "民族",
                "label-width": "150rpx",
                prop: "userInfo.nation",
                borderBottom: true,
                ref: "item1",
                onClick: $options.showNationSelect
              }, {
                right: vue.withCtx(() => [
                  vue.createVNode(_component_uv_icon, { name: "arrow-right" })
                ]),
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.nation,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.model1.userInfo.nation = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "font-weight": "bold", "margin-right": "20rpx" },
                    "input-align": "right",
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"]),
              vue.createVNode(_component_uv_form_item, {
                label: "性别",
                "label-width": "150rpx",
                prop: "userInfo.sex",
                borderBottom: true,
                onClick: $options.showSexSelect,
                ref: "item2"
              }, {
                right: vue.withCtx(() => [
                  vue.createVNode(_component_uv_icon, { name: "arrow-right" })
                ]),
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.sex,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.model1.userInfo.sex = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "font-weight": "bold", "margin-right": "20rpx" },
                    readonly: true,
                    "input-align": "right"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"]),
              vue.createVNode(_component_uv_form_item, {
                label: "出生日期",
                "label-width": "150rpx",
                prop: "userInfo.bornTime",
                borderBottom: true,
                ref: "item3",
                onClick: $options.showBornTimeSelect
              }, {
                right: vue.withCtx(() => [
                  vue.createVNode(_component_uv_icon, { name: "arrow-right" })
                ]),
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.bornTime,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.model1.userInfo.bornTime = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "font-weight": "bold", "margin-right": "20rpx" },
                    "input-align": "right",
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"]),
              vue.createVNode(_component_uv_form_item, {
                label: "出生地",
                "label-width": "150rpx",
                prop: "userInfo.bornPlace",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.bornPlace,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.model1.userInfo.bornPlace = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "font-weight": "bold", "margin-right": "20rpx" },
                    "input-align": "right"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ]),
        vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx", "margin-right": "20rpx" } }, [
          vue.createElementVNode("text", null, "本人常住地址信息"),
          vue.createVNode(_component_uv_form, {
            model: $data.model1,
            rules: $data.rule1,
            ref: "form3",
            style: { "background": "white" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_form_item, {
                label: "省/市/区",
                "label-width": "150rpx",
                prop: "addressInfo.region",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.addressInfo.region,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.model1.addressInfo.region = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true,
                    "input-align": "right"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "详细地址",
                "label-width": "150rpx",
                prop: "addressInfo.detailAddress",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.addressInfo.detailAddress,
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.model1.addressInfo.detailAddress = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "font-weight": "bold", "margin-right": "20rpx" },
                    "input-align": "right"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "邮编",
                "label-width": "150rpx",
                prop: "addressInfo.zipCode",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.addressInfo.zipCode,
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.model1.addressInfo.zipCode = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "font-weight": "bold", "margin-right": "20rpx" },
                    "input-align": "right"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ]),
        vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx" } }, [
          vue.createElementVNode("text", null, "工作信息"),
          vue.createVNode(_component_uv_form, {
            model: $data.model1,
            rules: $data.rule1,
            ref: "form4",
            style: { "background": "white" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_form_item, {
                label: "职业",
                "label-width": "150rpx",
                prop: "workInfo.profession",
                borderBottom: true,
                onClick: $options.showCareerSelect
              }, {
                right: vue.withCtx(() => [
                  vue.createVNode(_component_uv_icon, { name: "arrow-right" })
                ]),
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.workInfo.profession,
                    "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.model1.workInfo.profession = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "font-weight": "bold", "margin-right": "20rpx" },
                    "input-align": "right",
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"]),
              vue.createVNode(_component_uv_form_item, {
                label: "工作单位名称",
                "label-width": "150rpx",
                prop: "workInfo.workPlaceName",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.workInfo.workPlaceName,
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.model1.workInfo.workPlaceName = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "font-weight": "bold", "margin-right": "20rpx" },
                    "input-align": "right"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "单位所属行业",
                "label-width": "150rpx",
                prop: "workInfo.sector",
                borderBottom: true,
                onClick: $options.showSectorSelect
              }, {
                right: vue.withCtx(() => [
                  vue.createVNode(_component_uv_icon, { name: "arrow-right" })
                ]),
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.workInfo.sector,
                    "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $data.model1.workInfo.sector = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "font-weight": "bold", "margin-right": "20rpx" },
                    "input-align": "right",
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"]),
              vue.createVNode(_component_uv_form_item, {
                label: "个人月收入区间",
                "label-width": "150rpx",
                prop: "workInfo.salaryInterval",
                borderBottom: true,
                onClick: $options.showSalarySelect
              }, {
                right: vue.withCtx(() => [
                  vue.createVNode(_component_uv_icon, { name: "arrow-right" })
                ]),
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.workInfo.salaryInterval,
                    "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $data.model1.workInfo.salaryInterval = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "font-weight": "bold", "margin-right": "20rpx" },
                    "input-align": "right",
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ]),
        vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx", "margin-right": "20rpx" } }, [
          vue.createElementVNode("text", null, "联系信息"),
          vue.createVNode(_component_uv_form, {
            model: $data.model1,
            rules: $data.rule1,
            ref: "form5",
            style: { "background": "white" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_form_item, {
                label: "手机号码",
                "label-width": "150rpx",
                prop: "phonenumber",
                borderBottom: true
              }, {
                right: vue.withCtx(() => [
                  vue.createVNode(_component_uv_icon, { name: "arrow-right" })
                ]),
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.phonenumber,
                    "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $data.model1.phonenumber = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ]),
        vue.createElementVNode("view", null, [
          vue.createElementVNode("button", {
            style: { "color": "white", "background-color": "blue" },
            onClick: _cache[16] || (_cache[16] = (...args) => $options.turnToNext && $options.turnToNext(...args))
          }, "下一步")
        ]),
        vue.createVNode(_component_uv_action_sheet, {
          ref: "sexSelect",
          actions: $data.sexes,
          title: "请选择性别",
          onSelect: $options.setSex
        }, null, 8, ["actions", "onSelect"]),
        vue.createVNode(_component_uv_picker, {
          ref: "nationPicker",
          columns: $data.nations,
          onConfirm: $options.setNation
        }, null, 8, ["columns", "onConfirm"]),
        vue.createVNode(_component_uv_picker, {
          ref: "countryPicker",
          columns: $data.countries,
          onConfirm: $options.setCountry
        }, null, 8, ["columns", "onConfirm"]),
        vue.createVNode(_component_uv_picker, {
          ref: "statePicker",
          columns: $data.state,
          onConfirm: $options.setState
        }, null, 8, ["columns", "onConfirm"]),
        vue.createVNode(_component_uv_picker, {
          ref: "countriPicker",
          columns: $data.countries,
          onConfirm: $options.setCountri
        }, null, 8, ["columns", "onConfirm"]),
        vue.createVNode(_component_uv_picker, {
          ref: "regionPicker",
          columns: $data.state,
          onConfirm: $options.setRegion
        }, null, 8, ["columns", "onConfirm"]),
        vue.createVNode(_component_uv_picker, {
          ref: "professionPicker",
          columns: $data.career,
          onConfirm: $options.setCareer
        }, null, 8, ["columns", "onConfirm"]),
        vue.createVNode(_component_uv_picker, {
          ref: "sectorPicker",
          columns: $data.sector,
          onConfirm: $options.setSector
        }, null, 8, ["columns", "onConfirm"]),
        vue.createVNode(_component_uv_picker, {
          ref: "salaryPicker",
          columns: $data.incomeRage,
          onConfirm: $options.setSalary
        }, null, 8, ["columns", "onConfirm"]),
        vue.createVNode(_component_uv_datetime_picker, {
          ref: "BornTimePicker",
          mode: "date",
          modelValue: $data.pickDate,
          "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $data.pickDate = $event),
          onChange: $options.bornTimeChange,
          formatter: $options.formatter,
          onConfirm: $options.setBornTimeChange
        }, null, 8, ["modelValue", "onChange", "formatter", "onConfirm"])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesModifyPersonalInformationModifyPersonalInformation = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$x], ["__file", "E:/BankSystem/user/pages/modifyPersonalInformation/modifyPersonalInformation.vue"]]);
  const _sfc_main$x = {
    data() {
      return {
        model1: {
          userInfo: {
            num: "",
            name: "",
            ename: "",
            cardType: "",
            cardNumber: "",
            country: "",
            nation: "",
            sex: "",
            bornTime: "",
            bornPlace: ""
          },
          cardInfo: {
            country: "",
            region: "",
            detailAddress: ""
          },
          addressInfo: {
            country: "",
            region: "",
            detailAddress: "",
            zipCode: ""
          },
          workInfo: {
            profession: "",
            workPlaceName: "",
            schoolName: "",
            sector: "",
            salaryInterval: ""
          },
          phonenumber: ""
        },
        rule1: {
          "userInfo.num": {
            tpye: "number",
            required: true,
            trigger: ["change"]
          },
          "userInfo.name": {
            tpye: "string",
            required: true,
            trigger: ["change"],
            message: "姓名不能为空"
          }
        },
        actions: [
          {
            name: "男"
          },
          {
            name: "女"
          },
          {
            name: "其他"
          }
        ]
      };
    },
    onReady() {
      this.$refs.form1.setRules(this.rule1);
      let that = this;
      uni.getStorage({
        key: "token",
        success: function(res) {
          let _token = res.data;
          uni.request({
            url: "https://120.55.37.93/query/customerInfo",
            method: "GET",
            header: {
              "token": _token
            },
            data: {},
            success: function(res2) {
              formatAppLog("log", "at pages/personalInformation/personalInformation.vue:177", res2);
              that.model1.userInfo.num = res2.data.data.customerId;
              that.model1.userInfo.name = res2.data.data.surname + res2.data.data.name;
              that.model1.userInfo.ename = res2.data.data.spellName;
              that.model1.userInfo.cardNumber = res2.data.data.identityCard;
              that.model1.userInfo.nation = res2.data.data.nationality;
              that.model1.userInfo.sex = res2.data.data.sex;
              that.model1.userInfo.bornTime = res2.data.data.dateOfBirth;
              that.model1.userInfo.bornPlace = res2.data.data.placeOfBirth;
              that.model1.addressInfo.region = res2.data.data.provincesCity;
              that.model1.addressInfo.detailAddress = res2.data.data.detailedAddress;
              that.model1.addressInfo.zipCode = res2.data.data.postalCode;
              that.model1.workInfo.profession = res2.data.data.profession;
              that.model1.workInfo.workPlaceName = res2.data.data.workOfUnit;
              that.model1.workInfo.sector = res2.data.data.industryOfTheOrganization;
              that.model1.workInfo.salaryInterval = res2.data.data.incomeRange;
              that.model1.phonenumber = res2.data.data.phoneNumber;
            },
            fail: function(error2) {
              formatAppLog("log", "at pages/personalInformation/personalInformation.vue:196", "寄咯");
            }
          });
        },
        fail: function(error2) {
          formatAppLog("log", "at pages/personalInformation/personalInformation.vue:201", "获取token失败", error2);
        }
      });
    },
    methods: {
      // 性别选择
      showSexSelect() {
        this.$refs.sexSelect.open();
      },
      sexSelect(e2) {
        this.model1.userInfo.sex = e2.name;
        this.$refs.form1.validateField("userInfo.sex");
      },
      close() {
        formatAppLog("log", "at pages/personalInformation/personalInformation.vue:217", "关闭");
      },
      modifyPI() {
        let that = this;
        uni.navigateTo({
          url: "/pages/modifyPersonalInformation/modifyPersonalInformation",
          success: function(res) {
            res.eventChannel.emit("personalInformation", {
              "num": that.model1.userInfo.num,
              "name": that.model1.userInfo.name,
              "ename": that.model1.userInfo.ename,
              "cardNumber": that.model1.userInfo.cardNumber,
              "nation": that.model1.userInfo.nation,
              "sex": that.model1.userInfo.sex,
              "bornTime": that.model1.userInfo.bornTime,
              "bornPlace": that.model1.userInfo.bornPlace,
              "region": that.model1.addressInfo.region,
              "detailAddress": that.model1.addressInfo.detailAddress,
              "zipCode": that.model1.addressInfo.zipCode,
              "profession": that.model1.workInfo.profession,
              "workPlaceName": that.model1.workInfo.workPlaceName,
              "sector": that.model1.workInfo.sector,
              "salaryInterval": that.model1.workInfo.salaryInterval,
              "phonenumber": that.model1.phonenumber
            });
          }
        });
      }
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0$d);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1$b);
    const _component_uv_action_sheet = resolveEasycom(vue.resolveDynamicComponent("uv-action-sheet"), __easycom_2);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_2$6);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx" } }, [
          vue.createElementVNode("view", { style: { "margin-right": "20rpx", "text-align": "right" } }, [
            vue.createElementVNode("text", {
              style: { "margin-right": "20rpx", "font-weight": "bold", "text-align": "right" },
              onClick: _cache[0] || (_cache[0] = (...args) => $options.modifyPI && $options.modifyPI(...args))
            }, "修改")
          ]),
          vue.createElementVNode("text", null, "基本信息"),
          vue.createVNode(_component_uv_form, {
            model: $data.model1,
            rules: $data.rule1,
            ref: "form1",
            style: { "background": "white", "margin-right": "20rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_form_item, {
                label: "电子银行客户序号",
                "label-width": "150rpx",
                prop: "userInfo.number",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.num,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.model1.userInfo.num = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "姓名",
                "label-width": "150rpx",
                prop: "userInfo.name",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.name,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.model1.userInfo.name = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "英文/拼音姓名",
                "label-width": "150rpx",
                prop: "userInfo.ename",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.ename,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.model1.userInfo.ename = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "证件号码",
                "label-width": "150rpx",
                prop: "userInfo.cardNumber",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.cardNumber,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.model1.userInfo.cardNumber = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "民族",
                "label-width": "150rpx",
                prop: "userInfo.nation",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.nation,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.model1.userInfo.nation = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "性别",
                "label-width": "150rpx",
                prop: "userInfo.sex",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.sex,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.model1.userInfo.sex = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true,
                    onClick: $options.showSexSelect
                  }, null, 8, ["modelValue", "onClick"]),
                  vue.createVNode(_component_uv_action_sheet, {
                    ref: "sexSelect",
                    actions: $data.actions,
                    title: "请选择性别",
                    onSelect: $options.sexSelect,
                    onClose: $options.close
                  }, null, 8, ["actions", "onSelect", "onClose"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "出生日期",
                "label-width": "150rpx",
                prop: "userInfo.bornTime",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.bornTime,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.model1.userInfo.bornTime = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "出生地",
                "label-width": "150rpx",
                prop: "userInfo.bornPlace",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.bornPlace,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.model1.userInfo.bornPlace = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ]),
        vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx" } }, [
          vue.createElementVNode("text", null, "本人常住地址信息"),
          vue.createVNode(_component_uv_form, {
            model: $data.model1,
            rules: $data.rule1,
            ref: "form3",
            style: { "background": "white", "margin-right": "20rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_form_item, {
                label: "省/市/区",
                "label-width": "150rpx",
                prop: "addressInfo.region",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.addressInfo.region,
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.model1.addressInfo.region = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "详细地址",
                "label-width": "150rpx",
                prop: "addressInfo.detailAddress",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.addressInfo.detailAddress,
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.model1.addressInfo.detailAddress = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "邮编",
                "label-width": "150rpx",
                prop: "addressInfo.zipCode",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.addressInfo.zipCode,
                    "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.model1.addressInfo.zipCode = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ]),
        vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx" } }, [
          vue.createElementVNode("text", null, "工作信息"),
          vue.createVNode(_component_uv_form, {
            model: $data.model1,
            rules: $data.rule1,
            ref: "form4",
            style: { "background": "white", "margin-right": "20rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_form_item, {
                label: "职业",
                "label-width": "150rpx",
                prop: "workInfo.profession",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.workInfo.profession,
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.model1.workInfo.profession = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "工作单位名称",
                "label-width": "150rpx",
                prop: "workInfo.workPlaceName",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.workInfo.workPlaceName,
                    "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $data.model1.workInfo.workPlaceName = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "单位所属行业",
                "label-width": "150rpx",
                prop: "workInfo.sector",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.workInfo.sector,
                    "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $data.model1.workInfo.sector = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "个人月收入区间",
                "label-width": "150rpx",
                prop: "workInfo.salaryInterval",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.workInfo.salaryInterval,
                    "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $data.model1.workInfo.salaryInterval = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ]),
        vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx" } }, [
          vue.createElementVNode("text", null, "联系信息"),
          vue.createVNode(_component_uv_form, {
            model: $data.model1,
            rules: $data.rule1,
            ref: "form5",
            style: { "background": "white", "margin-right": "20rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_form_item, {
                label: "手机号码",
                "label-width": "150rpx",
                prop: "phonenumber",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.phonenumber,
                    "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $data.model1.phonenumber = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesPersonalInformationPersonalInformation = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$w], ["__file", "E:/BankSystem/user/pages/personalInformation/personalInformation.vue"]]);
  const _sfc_main$w = {
    data() {
      return {
        transferRecodes: [
          {
            tailNumber: "1234",
            transferDate: "2023/1/1",
            transferType: "网上快捷支付",
            movingAccountTpye: "收入",
            transferNum: "10.00",
            otherAccount: "123",
            tradeChannel: "1"
          },
          {
            tailNumber: "1234",
            transferDate: "2023/1/2",
            transferType: "网上快捷支付",
            movingAccountTpye: "支出",
            transferNum: "10.00",
            otherAccount: "123",
            tradeChannel: "2"
          },
          {
            tailNumber: "1234",
            transferDate: "2023/1/3",
            transferType: "网上快捷支付",
            movingAccountTpye: "支出",
            transferNum: "10.00",
            otherAccount: "123",
            tradeChannel: "3"
          },
          {
            tailNumber: "1234",
            transferDate: "2023/1/4",
            transferType: "网上快捷支付",
            movingAccountTpye: "收入",
            transferNum: "10.00",
            otherAccount: "123",
            tradeChannel: "4"
          },
          {
            tailNumber: "1234",
            transferDate: "2023/1/5",
            transferType: "网上快捷支付",
            movingAccountTpye: "支出",
            transferNum: "10.00",
            otherAccount: "123",
            tradeChannel: "5"
          },
          {
            tailNumber: "1234",
            transferDate: "2023/1/6",
            transferType: "网上快捷支付",
            movingAccountTpye: "收入",
            transferNum: "10.00",
            otherAccount: "123",
            tradeChannel: "6"
          }
        ]
      };
    },
    methods: {},
    computed: {},
    onLoad() {
      uni.setStorage({
        key: "token",
        data: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhNmYxMWMxN2ZmYzc0ZGQwYWFiMzI0ZjlmZDUyOTEzZSIsInN1YiI6IjYiLCJpc3MiOiJwbSIsImlhdCI6MTcwMjc5MjU2MywiZXhwIjoxNzAyNzk2MTYzfQ.7dYaX8L5KN33KqYkZJDla5UIqqt3B-r8W0O0g2w-gPg"
      });
    }
  };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(true), vue.createElementBlock(
      vue.Fragment,
      null,
      vue.renderList($data.transferRecodes, (transferRecode) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", { style: { "text-align": "center" } }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString(transferRecode.transferDate),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { style: { "width": "700rpx", "margin-left": "20rpx", "margin-bottom": "20rpx", "background-color": "white" } }, [
            vue.createElementVNode("text", { style: { "font-weight": "bold", "margin-left": "20rpx" } }, "借记卡动账提醒"),
            vue.createElementVNode("view", { style: { "text-align": "center", "margin-top": "20rpx" } }, [
              vue.createElementVNode("text", null, "交易金额（人民币)")
            ]),
            vue.createElementVNode("view", { style: { "text-align": "center" } }, [
              vue.createElementVNode(
                "text",
                {
                  class: vue.normalizeClass(transferRecode.movingAccountTpye == "支出" ? "transferType" : "receiptTpye")
                },
                vue.toDisplayString(transferRecode.movingAccountTpye),
                3
                /* TEXT, CLASS */
              ),
              vue.createElementVNode(
                "text",
                { style: { "font-size": "120%" } },
                vue.toDisplayString(transferRecode.transferNum),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", { style: { "margin-left": "20rpx" } }, "尊敬的用户：")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode(
                "text",
                { style: { "margin-left": "20rpx" } },
                "您尾号为" + vue.toDisplayString(transferRecode.tailNumber) + "的中国银行账户发生了一笔动账交易",
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode(
                "text",
                { style: { "margin-left": "20rpx" } },
                "交易时间：" + vue.toDisplayString(transferRecode.transferDate),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode(
                "text",
                { style: { "margin-left": "20rpx" } },
                "交易类型：" + vue.toDisplayString(transferRecode.transferType),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode(
                "text",
                { style: { "margin-left": "20rpx" } },
                "动账类型：" + vue.toDisplayString(transferRecode.movingAccountTpye),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode(
                "text",
                { style: { "margin-left": "20rpx" } },
                "交易金额：" + vue.toDisplayString(transferRecode.transferNum),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode(
                "text",
                { style: { "margin-left": "20rpx" } },
                "对方账户：" + vue.toDisplayString(transferRecode.otherAccount),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode(
                "text",
                { style: { "margin-left": "20rpx" } },
                "交易渠道：" + vue.toDisplayString(transferRecode.tradeChannel),
                1
                /* TEXT */
              )
            ])
          ])
        ]);
      }),
      256
      /* UNKEYED_FRAGMENT */
    );
  }
  const PagesTransferNoticeTransferNotice = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v], ["__file", "E:/BankSystem/user/pages/transferNotice/transferNotice.vue"]]);
  const _sfc_main$v = {
    data() {
      return {
        pageNum: 1,
        pageSize: 15,
        show: false,
        selectedDate: 1,
        //约定1为近一周，2为一个月，3为三个月
        dateStart: "",
        dateEnd: "",
        moneyStart: "0.00",
        moneyEnd: "99999999999.99",
        cardAccountText: "",
        cardId: null,
        payee: null,
        selectedAll: true,
        selectedOut: false,
        selectedIn: false,
        cardItem: [
          // {
          // 	cardId:"",
          // 	account:"",
          //  class: "借记卡"
          // }
        ],
        recordItem: [
          // {
          // 	// "transactionId": 390851114166460400,
          // 	// "counterpartyName": "邹海帆",
          // 	// "balance": null,
          // 	// "amount": -648,
          // 	// "status": 0,
          // 	// "statusComments": "转账支出"
          // }
        ],
        cardPicker: [[]]
      };
    },
    computed: {
      currentDate: function() {
        return this.formattedDate((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 1, (/* @__PURE__ */ new Date()).getDate());
      },
      defaultDateStart: function() {
        const [year, month, day] = this.currentDate.split("-");
        const date2 = new Date(year, month - 1, day);
        const oneWeekAgo = new Date(date2.setDate(date2.getDate() - 7));
        return this.formattedDate(oneWeekAgo.getFullYear(), oneWeekAgo.getMonth() + 1, oneWeekAgo.getDate());
      },
      payeeName: function() {
        return isNaN(this.payee) ? this.payee : null;
      },
      payeePhone: function() {
        return isNaN(this.payee) ? null : this.payee;
      },
      status: function() {
        if (this.selectedAll)
          return "0";
        else if (this.selectedScc)
          return "1";
        else
          return "2";
      }
    },
    methods: {
      requestTransactionRecord() {
        let that = this;
        uni.getStorage({
          key: "token",
          success: function(res) {
            let _token = res.data;
            uni.showLoading({
              title: "",
              mask: true
            });
            uni.request({
              url: "https://120.55.37.93/query/transactionRecord?pageNum=" + that.pageNum + "&pageSize=" + that.pageSize,
              method: "POST",
              header: {
                "token": _token
              },
              data: {
                "startTime": that.dateStart + " 00:00:00",
                "endTime": that.dateEnd + " 23:59:59",
                "cardId": that.cardId,
                "miniAmount": that.moneyStart,
                "maxAmount": that.moneyEnd,
                "payeeName": that.payeeName,
                "payeePhoneNumber": this.payeePhone,
                "status": that.status
              },
              success: function(res2) {
                formatAppLog("log", "at pages/transactionRecord/transactionRecord.vue:169", res2);
                if (res2.data.code == 200) {
                  formatAppLog("log", "at pages/transactionRecord/transactionRecord.vue:171", res2);
                  that.totalPage = res2.data.data.totalPage;
                  res2.data.data.list.forEach((item) => {
                    let temp = { "counterpartyName": "", "transactionId": null, "balance": null, "amount": -648, "status": 0, "statusComments": "转账支出" };
                    temp.counterpartyName = item.counterpartyName;
                    temp.balance = parseFloat(item.balance).toFixed(2);
                    temp.transactionId = item.transactionId;
                    temp.statusComments = item.statusComments;
                    temp.amount = parseFloat(item.amount).toFixed(2);
                    that.recordItem.push(temp);
                  });
                }
                uni.hideLoading();
              },
              fail: function(error2) {
                uni.hideLoading();
                uni.showToast({
                  title: "错误，稍后再试",
                  icon: "error",
                  duration: 2e3
                });
              }
            });
          }
        });
      },
      requestCard() {
        let that = this;
        uni.getStorage({
          key: "token",
          success: function(res) {
            let _token = res.data;
            uni.showLoading({
              title: "",
              mask: true
            });
            uni.request({
              url: "https://120.55.37.93/query/bankCard",
              method: "GET",
              header: {
                "token": _token
              },
              data: {},
              success: function(res2) {
                if (res2.data.code == 200) {
                  res2.data.data.forEach((item) => {
                    let temp = { account: "", id: "", class: "借记卡" };
                    temp.account = item.cardNumber;
                    temp.id = item.id;
                    that.cardItem.push(temp);
                  });
                  that.cardId = that.cardItem[0].id;
                  that.cardAccountText = that.cardItem[0].account;
                  that.requestTransactionRecord();
                }
                uni.hideLoading();
              },
              fail: function(error2) {
                uni.hideLoading();
                uni.showToast({
                  title: "错误，稍后再试",
                  icon: "error",
                  duration: 2e3
                });
              }
            });
          }
        });
      },
      getScrollHeight() {
        let sys2 = uni.getSystemInfoSync();
        let winWidth = sys2.windowWidth;
        let winrate = 750 / winWidth;
        let winHeight = parseInt(sys2.windowHeight * winrate);
        return winHeight - 20;
      },
      loadMore() {
        if (this.pageNum < this.totalPage) {
          this.pageNum++;
          this.requestTransactionRecord();
        }
      },
      buttonCard() {
        this.cardPicker = [[]];
        this.cardItem.forEach((item) => {
          this.cardPicker[0].push(item.class + "(" + item.account.slice(-4) + ")");
        });
        this.$refs.picker.open();
      },
      cardConfirm(e2) {
        this.cardId = this.cardItem[e2.indexs[0]].id;
        this.cardAccountText = this.cardItem[e2.indexs[0]].account;
        this.recordItem = [];
        this.requestTransactionRecord();
      },
      clickRecord(index2) {
        let that = this;
        uni.navigateTo({
          url: "/pages/transactionDetail/transactionDetail?transactionId=" + that.recordItem[index2].transactionId
        });
      },
      openScreen() {
        this.show = true;
        this.$refs.popup.open();
      },
      cancel() {
        this.$refs.popup.close();
      },
      formattedDate(year, month, day) {
        const formattedMonth = month < 10 ? "0" + month : month;
        const formattedDay = day < 10 ? "0" + day : day;
        return `${year}-${formattedMonth}-${formattedDay}`;
      },
      clickOneWeek() {
        this.selectedDate = 1;
        this.dateEnd = this.currentDate;
        var date2 = new Date(this.dateEnd);
        date2.setDate(date2.getDate() - 7);
        this.dateStart = date2.toISOString().slice(0, 10);
      },
      clickOneMonth() {
        this.selectedDate = 2;
        this.dateEnd = this.currentDate;
        var date2 = new Date(this.dateEnd);
        date2.setMonth(date2.getMonth() - 1);
        this.dateStart = date2.toISOString().slice(0, 10);
      },
      clickThreeMonth() {
        this.selectedDate = 3;
        this.dateEnd = this.currentDate;
        var date2 = new Date(this.dateEnd);
        date2.setMonth(date2.getMonth() - 3);
        this.dateStart = date2.toISOString().slice(0, 10);
      },
      dateStartChange(e2) {
        if (this.dateStart > this.dateEnd) {
          uni.showToast({
            title: "日期范围有误",
            icon: "error"
          });
          this.dateStart = this.defaultDateStart;
        }
      },
      dateEndChange(e2) {
        if (this.dateEnd > this.currentDate) {
          uni.showToast({
            title: "超过当前日期",
            icon: "error"
          });
          this.dateEnd = this.currentDate;
        }
        if (this.dateStart > this.dateEnd) {
          uni.showToast({
            title: "日期范围有误",
            icon: "error"
          });
          this.dateEnd = this.currentDate;
        }
      },
      inputStartMoney() {
        this.$refs.keyboardStart.open();
      },
      inputEndMoney() {
        this.$refs.keyboardEnd.open();
      },
      startMoneyNorm() {
        this.moneyStart = parseFloat(this.moneyStart).toFixed(2);
      },
      endMoneyNorm() {
        this.moneyEnd = parseFloat(this.moneyEnd).toFixed(2);
      },
      moneyInPut(obj) {
        if (obj.s == "" && obj.val == ".") {
          obj.s = "0.";
        }
        if (obj.s == "0" && obj.val != ".")
          ;
        else {
          if (obj.s.includes(".")) {
            var match = obj.s.match(/\.\d*$/);
            let num = match ? match[0].length - 1 : 0;
            if (obj.val == ".")
              ;
            else if (num == 2)
              ;
            else
              obj.s += obj.val;
          } else
            obj.s += obj.val;
        }
        return obj.s;
      },
      keyboardStartChange(val) {
        let obj = { "s": this.moneyStart, "val": val };
        this.moneyInPut(obj);
        this.moneyStart = obj.s;
      },
      keyboardEndChange(val) {
        let obj = { "s": this.moneyEnd, "val": val };
        this.moneyInPut(obj);
        this.moneyEnd = obj.s;
      },
      startBackSpace() {
        if (this.moneyStart.length)
          this.moneyStart = this.moneyStart.substr(0, this.moneyStart.length - 1);
      },
      endBackSpace() {
        if (this.moneyEnd.length)
          this.moneyEnd = this.moneyEnd.substr(0, this.moneyEnd.length - 1);
      },
      inputPayee(val) {
        this.payee = val;
      },
      selectAll() {
        this.selectedAll = true;
        this.selectedOut = false;
        this.selectedIn = false;
      },
      selectOut() {
        this.selectedAll = false;
        this.selectedOut = true;
        this.selectedIn = false;
      },
      selectIn() {
        this.selectedAll = false;
        this.selectedOut = false;
        this.selectedIn = true;
      },
      clickReset() {
        this.dateStart = this.defaultDateStart;
        this.dateEnd = this.currentDate;
        this.selectedDate = 1;
        this.moneyStart = "0.00";
        this.moneyEnd = "99999999999.99";
        this.payee = null;
        this.selectAll();
      },
      clickConfirm() {
        this.pageNum = 1;
        this.recordItem = [];
        this.requestTransactionRecord();
        this.$refs.popup.close();
      }
    },
    onLoad() {
      this.dateEnd = this.currentDate;
      this.dateStart = this.defaultDateStart;
      this.requestCard();
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_picker = resolveEasycom(vue.resolveDynamicComponent("uv-picker"), __easycom_0$7);
    const _component_uv_divider = resolveEasycom(vue.resolveDynamicComponent("uv-divider"), __easycom_0$b);
    const _component_uni_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("uni-datetime-picker"), __easycom_3$1);
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0$d);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_7);
    const _component_uv_keyboard = resolveEasycom(vue.resolveDynamicComponent("uv-keyboard"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column", "align-items": "center" } }, [
          vue.createElementVNode("view", {
            class: "card",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.buttonCard && $options.buttonCard(...args))
          }, [
            vue.createElementVNode("view", { style: { "display": "flex", "height": "50%", "align-items": "center" } }, [
              vue.createVNode(_component_uv_icon, {
                name: "/static/icon/icon_card.svg",
                size: "55",
                style: { "margin-left": "20rpx" }
              }),
              vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column", "margin-left": "40rpx" } }, [
                vue.createElementVNode(
                  "view",
                  { style: { "font-weight": "bold" } },
                  vue.toDisplayString($data.cardAccountText),
                  1
                  /* TEXT */
                )
              ]),
              vue.createVNode(_component_uv_icon, {
                name: "arrow-right",
                style: { "margin-left": "40rpx" }
              })
            ])
          ])
        ]),
        vue.createVNode(_component_uv_picker, {
          ref: "picker",
          columns: $data.cardPicker,
          onConfirm: $options.cardConfirm
        }, null, 8, ["columns", "onConfirm"]),
        vue.createElementVNode("view", { class: "screen-button-box" }, [
          vue.createElementVNode("view", { class: "column1" }, "查询结果"),
          vue.createElementVNode("view", {
            class: "column2",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.openScreen && $options.openScreen(...args))
          }, [
            vue.createElementVNode("text", null, "筛选"),
            vue.createVNode(_component_uv_icon, {
              name: "/static/icon/icon_screen.svg",
              size: "22"
            })
          ])
        ]),
        $data.recordItem.length > 0 ? (vue.openBlock(), vue.createElementBlock(
          "scroll-view",
          {
            key: 0,
            "scroll-y": "true",
            onScrolltolower: _cache[2] || (_cache[2] = ($event) => $options.loadMore()),
            style: vue.normalizeStyle({ height: $options.getScrollHeight() + "rpx" })
          },
          [
            vue.createElementVNode("view", { class: "record-box" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.recordItem, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: index2,
                    class: "record-item",
                    onClick: ($event) => $options.clickRecord(index2)
                  }, [
                    vue.createElementVNode("view", { class: "column1" }, [
                      vue.createElementVNode(
                        "view",
                        null,
                        vue.toDisplayString(item.statusComments),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "view",
                        { style: { "margin-top": "10rpx", "color": "#A8A8A8", "font-size": "0.8em" } },
                        "余额 " + vue.toDisplayString(item.balance),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "column2" }, [
                      vue.createElementVNode(
                        "view",
                        { style: { "color": "#A8A8A8" } },
                        vue.toDisplayString(item.counterpartyName),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { style: { "margin-top": "10rpx", "font-weight": "bold", "display": "flex" } }, [
                        vue.createElementVNode("view", null, "人民币元"),
                        vue.createElementVNode(
                          "view",
                          {
                            class: vue.normalizeClass(item.amount >= 0 ? "in" : "out")
                          },
                          vue.toDisplayString(item.amount),
                          3
                          /* TEXT, CLASS */
                        )
                      ])
                    ])
                  ], 8, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ],
          36
          /* STYLE, HYDRATE_EVENTS */
        )) : vue.createCommentVNode("v-if", true),
        vue.createVNode(
          _component_uni_popup,
          {
            ref: "popup",
            type: "right",
            "background-color": "#ffffff",
            style: { "position": "relative" }
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", null, [
                vue.createElementVNode("text", {
                  style: { "margin-right": "20rpx", "display": "flex", "justify-content": "flex-end", "color": "red", "padding-left": "500rpx", "font-weight": "bold" },
                  onClick: _cache[3] || (_cache[3] = (...args) => $options.cancel && $options.cancel(...args))
                }, "取消")
              ]),
              vue.createVNode(_component_uv_divider),
              vue.createElementVNode("view", { style: { "font-weight": "bold", "margin-left": "20rpx", "margin-top": "30rpx" } }, "交易日期"),
              vue.createElementVNode("view", { style: { "margin-top": "30rpx", "display": "flex", "justify-content": "space-around" } }, [
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass($data.selectedDate == 1 ? "date-selected" : "date-unselected"),
                    onClick: _cache[4] || (_cache[4] = (...args) => $options.clickOneWeek && $options.clickOneWeek(...args))
                  },
                  "近1周",
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass($data.selectedDate == 2 ? "date-selected" : "date-unselected"),
                    onClick: _cache[5] || (_cache[5] = (...args) => $options.clickOneMonth && $options.clickOneMonth(...args))
                  },
                  "近1月",
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "button",
                  {
                    class: vue.normalizeClass($data.selectedDate == 3 ? "date-selected" : "date-unselected"),
                    onClick: _cache[6] || (_cache[6] = (...args) => $options.clickThreeMonth && $options.clickThreeMonth(...args))
                  },
                  "近3月",
                  2
                  /* CLASS */
                )
              ]),
              vue.createElementVNode("view", { style: { "margin-top": "30rpx", "display": "flex", "justify-content": "space-between" } }, [
                vue.createElementVNode("view", null, [
                  vue.createVNode(_component_uni_datetime_picker, {
                    modelValue: $data.dateStart,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.dateStart = $event),
                    type: "date",
                    onChange: $options.dateStartChange,
                    style: { "margin-left": "60rpx" }
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(
                        vue.toDisplayString($data.dateStart),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "onChange"])
                ]),
                vue.createElementVNode("view", null, "-"),
                vue.createElementVNode("view", null, [
                  vue.createVNode(_component_uni_datetime_picker, {
                    modelValue: $data.dateEnd,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.dateEnd = $event),
                    type: "date",
                    onChange: $options.dateEndChange,
                    style: { "margin-right": "60rpx" }
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(
                        vue.toDisplayString($data.dateEnd),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "onChange"])
                ])
              ]),
              vue.createVNode(_component_uv_divider),
              vue.createElementVNode("view", { style: { "margin-top": "30rpx", "display": "flex", "justify-content": "space-between" } }, [
                vue.createElementVNode("view", null, [
                  vue.createElementVNode(
                    "text",
                    {
                      style: { "margin-left": "60rpx" },
                      onClick: _cache[9] || (_cache[9] = (...args) => $options.inputStartMoney && $options.inputStartMoney(...args))
                    },
                    vue.toDisplayString($data.moneyStart),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", null, "-"),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode(
                    "text",
                    {
                      style: { "margin-right": "60rpx" },
                      onClick: _cache[10] || (_cache[10] = (...args) => $options.inputEndMoney && $options.inputEndMoney(...args))
                    },
                    vue.toDisplayString($data.moneyEnd),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createVNode(_component_uv_divider),
              vue.createElementVNode("view", { style: { "font-weight": "bold", "margin-left": "20rpx", "margin-bottom": "20rpx" } }, "收款人"),
              vue.createVNode(_component_uv_input, {
                placeholder: "请输入对方姓名/账号",
                border: "bottom",
                inputAlign: "center",
                modelValue: $data.payee,
                "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.payee = $event),
                clearable: "",
                onInput: $options.inputPayee
              }, null, 8, ["modelValue", "onInput"]),
              vue.createElementVNode("view", { style: { "font-weight": "bold", "margin-left": "20rpx", "margin-top": "30rpx" } }, "交易状态"),
              vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "space-between", "margin-top": "30rpx" } }, [
                vue.createElementVNode("view", null, [
                  vue.createElementVNode(
                    "button",
                    {
                      class: vue.normalizeClass($data.selectedAll ? "bottom-selected" : "bottom-unselected"),
                      onClick: _cache[12] || (_cache[12] = (...args) => $options.selectAll && $options.selectAll(...args)),
                      style: { "margin-left": "20rpx" }
                    },
                    "全部",
                    2
                    /* CLASS */
                  )
                ]),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode(
                    "button",
                    {
                      class: vue.normalizeClass($data.selectedOut ? "bottom-selected" : "bottom-unselected"),
                      onClick: _cache[13] || (_cache[13] = (...args) => $options.selectOut && $options.selectOut(...args))
                    },
                    "支出",
                    2
                    /* CLASS */
                  )
                ]),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode(
                    "button",
                    {
                      class: vue.normalizeClass($data.selectedIn ? "bottom-selected" : "bottom-unselected"),
                      onClick: _cache[14] || (_cache[14] = (...args) => $options.selectIn && $options.selectIn(...args)),
                      style: { "margin-right": "20rpx" }
                    },
                    "收入",
                    2
                    /* CLASS */
                  )
                ])
              ]),
              vue.createElementVNode("view", { style: { "position": "absolute", "bottom": "0", "display": "flex", "justify-content": "space-between" } }, [
                vue.createElementVNode("button", {
                  class: "resetButton",
                  onClick: _cache[15] || (_cache[15] = (...args) => $options.clickReset && $options.clickReset(...args))
                }, "重置"),
                vue.createElementVNode("button", {
                  class: "confirmButton",
                  onClick: _cache[16] || (_cache[16] = (...args) => $options.clickConfirm && $options.clickConfirm(...args))
                }, "确认")
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        ),
        vue.createVNode(_component_uv_keyboard, {
          ref: "keyboardStart",
          mode: "number",
          showCancel: false,
          closeOnClickOverlay: false,
          onChange: $options.keyboardStartChange,
          onBackspace: $options.startBackSpace,
          onConfirm: $options.startMoneyNorm
        }, null, 8, ["onChange", "onBackspace", "onConfirm"]),
        vue.createVNode(_component_uv_keyboard, {
          ref: "keyboardEnd",
          mode: "number",
          showCancel: false,
          closeOnClickOverlay: false,
          onChange: $options.keyboardEndChange,
          onBackspace: $options.endBackSpace,
          onConfirm: $options.endMoneyNorm
        }, null, 8, ["onChange", "onBackspace", "onConfirm"])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesTransactionRecordTransactionRecord = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["__file", "E:/BankSystem/user/pages/transactionRecord/transactionRecord.vue"]]);
  const _sfc_main$u = {
    data() {
      return {
        transactionId: null,
        record: {
          "transactionAccount": "",
          "balance": "",
          "counterpartyName": "",
          "counterpartyAccount": "",
          "amount": "",
          "postscript": "",
          "status": null,
          "statusComments": "",
          "transactionId": null,
          "transferTime": ""
        }
      };
    },
    onLoad(option) {
      this.transactionId = option.transactionId;
      let that = this;
      formatAppLog("log", "at pages/transactionDetail/transactionDetail.vue:63", "jiaoyi" + that.transactionId);
      uni.getStorage({
        key: "token",
        success: function(res) {
          let _token = res.data;
          uni.showLoading({
            title: "",
            mask: true
          });
          setTimeout(function() {
            uni.hideLoading();
          }, 1e3);
          uni.request({
            url: "https://120.55.37.93/query/transactionDetail?transactionId=" + that.transactionId,
            method: "GET",
            header: {
              "token": _token
            },
            success: function(res2) {
              if (res2.data.code == 200) {
                formatAppLog("log", "at pages/transactionDetail/transactionDetail.vue:83", res2);
                that.record.transactionAccount = res2.data.data.transactionAccount;
                that.record.balance = res2.data.data.balance;
                that.record.counterpartyName = res2.data.data.counterpartyName;
                that.record.counterpartyAccount = res2.data.data.counterpartyAccount;
                that.record.amount = res2.data.data.amount;
                that.record.postscript = res2.data.data.postscript;
                that.record.status = res2.data.data.status;
                that.record.statusComments = res2.data.data.statusComments;
                that.record.transactionId = res2.data.data.transactionId;
                that.record.transferTime = res2.data.data.transferTime;
              }
              uni.hideLoading();
            },
            fail: function(error2) {
              uni.hideLoading();
              uni.showToast({
                title: "错误，稍后再试",
                icon: "error",
                duration: 2e3
              });
            }
          });
        }
      });
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_divider = resolveEasycom(vue.resolveDynamicComponent("uv-divider"), __easycom_0$b);
    const _component_uv_col = resolveEasycom(vue.resolveDynamicComponent("uv-col"), __easycom_1$8);
    const _component_uv_row = resolveEasycom(vue.resolveDynamicComponent("uv-row"), __easycom_2$4);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { style: { "background-color": "#FFFFFF" } }, [
        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "space-between" } }, [
          vue.createElementVNode(
            "view",
            { style: { "margin-left": "20rpx" } },
            vue.toDisplayString($data.record.statusComments),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode(
          "view",
          { style: { "margin-left": "20rpx", "font-size": "1.5em", "font-weight": "bold", "margin-top": "40rpx", "margin-bottom": "20rpx" } },
          vue.toDisplayString($data.record.amount),
          1
          /* TEXT */
        ),
        vue.createVNode(_component_uv_divider),
        vue.createVNode(_component_uv_row, null, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_col, { span: "5" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { style: { "margin-left": "20rpx", "font-size": "0.9em" } }, "对方账户名称/账号")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_col, { span: "7" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  { class: "right" },
                  vue.toDisplayString($data.record.counterpartyName) + " " + vue.toDisplayString($data.record.counterpartyAccount),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("view", { style: { "height": "40rpx" } })
      ]),
      vue.createElementVNode("view", { style: { "margin-top": "20rpx", "background-color": "#FFFFFF" } }, [
        vue.createElementVNode("view", { style: { "height": "1rpx" } }),
        vue.createVNode(_component_uv_row, { class: "item" }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_col, { span: "5" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "left" }, "交易时间")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_col, { span: "7" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  { class: "right" },
                  vue.toDisplayString($data.record.transferTime),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_uv_row, { class: "item" }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_col, { span: "5" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "left" }, "交易类型")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_col, { span: "7" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  { class: "right" },
                  vue.toDisplayString($data.record.statusComments.slice(0, 4)),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_uv_row, { class: "item" }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_col, { span: "5" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "left" }, "交易后余额")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_col, { span: "7" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  { class: "right" },
                  "人民币元" + vue.toDisplayString($data.record.balance),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_uv_row, { class: "item" }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_col, { span: "5" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "left" }, "附言")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uv_col, { span: "7" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  { class: "right" },
                  vue.toDisplayString($data.record.postscript),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("view", { style: { "height": "1rpx" } })
      ])
    ]);
  }
  const PagesTransactionDetailTransactionDetail = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__file", "E:/BankSystem/user/pages/transactionDetail/transactionDetail.vue"]]);
  const _sfc_main$t = {
    data() {
      return {
        record: [
          // {
          // 	"yearMonth": "2023-2",
          // 	"outcome": "1993",
          // 	"income": "2558",
          // },
          // {
          // 	"yearMonth": "2023-3",
          // 	"outcome": "1993",
          // 	"income": "2558",
          // },
          // {
          // 	"yearMonth": "2023-4",
          // 	"outcome": "1993",
          // 	"income": "2558",
          // },
          // {
          // 	"yearMonth": "2023-5",
          // 	"outcome": "1993",
          // 	"income": "2558",
          // },
          // {
          // 	"yearMonth": "2023-6",
          // 	"outcome": "1993",
          // 	"income": "2558",
          // },
          // {
          // 	"yearMonth": "2023-7",
          // 	"outcome": "1993",
          // 	"income": "2558",
          // },
          // {
          // 	"yearMonth": "2023-8",
          // 	"outcome": "1993",
          // 	"income": "2558",
          // },
        ],
        month: /* @__PURE__ */ new Map([
          ["1", "Jan"],
          ["2", "Feb"],
          ["3", "Mar"],
          ["4", "Apr"],
          ["5", "May"],
          ["6", "Jun"],
          ["7", "Jul"],
          ["8", "Aug"],
          ["9", "Sept"],
          ["10", "Oct"],
          ["11", "Nov"],
          ["12", "Dec"]
        ])
      };
    },
    methods: {
      itemClass(item) {
        switch (item.yearMonth.split("-")[1]) {
          case "01":
            return "card-box01";
          case "02":
            return "card-box02";
          case "03":
            return "card-box03";
          case "04":
            return "card-box04";
          case "05":
            return "card-box05";
          case "06":
            return "card-box06";
          case "07":
            return "card-box07";
          case "08":
            return "card-box08";
          case "09":
            return "card-box09";
          case "10":
            return "card-box10";
          case "11":
            return "card-box11";
          case "12":
            return "card-box12";
          default:
            return "";
        }
      }
    },
    onLoad() {
      let that = this;
      uni.getStorage({
        key: "token",
        success: function(res) {
          let _token = res.data;
          uni.showLoading({
            title: "",
            mask: true
          });
          uni.request({
            url: "https://120.55.37.93/query/monthlycheck",
            method: "POST",
            header: {
              "token": _token
            },
            success: function(res2) {
              if (res2.data.code == 200) {
                res2.data.data.forEach((item) => {
                  let temp = { yearMonth: "", outcome: "", income: "" };
                  temp.yearMonth = item.yearMonth;
                  temp.outcome = item.outcome;
                  temp.income = item.income;
                  that.record.push(temp);
                });
              }
              uni.hideLoading();
            },
            fail: function(error2) {
              uni.hideLoading();
              uni.showToast({
                title: "错误，稍后再试",
                icon: "error",
                duration: 2e3
              });
            }
          });
        }
      });
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "box" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.record, (item, index2) => {
          return vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: index2,
              class: vue.normalizeClass($options.itemClass(item))
            },
            [
              vue.createElementVNode("view", { class: "row1" }, [
                vue.createElementVNode(
                  "text",
                  { class: "text1" },
                  vue.toDisplayString(item.yearMonth.split("-")[1]),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  null,
                  "月/" + vue.toDisplayString($data.month.get(item.yearMonth.split("-")[1])),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "row2" }, [
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("view", null, "收入"),
                  vue.createElementVNode(
                    "view",
                    null,
                    "￥" + vue.toDisplayString(parseFloat(item.income).toFixed(2)),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "col2" }, [
                  vue.createElementVNode("view", null, "支出"),
                  vue.createElementVNode(
                    "view",
                    null,
                    "￥" + vue.toDisplayString(parseFloat(item.outcome).toFixed(2)),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ],
            2
            /* CLASS */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesMonthIEMonthIE = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__file", "E:/BankSystem/user/pages/monthIE/monthIE.vue"]]);
  const _sfc_main$s = {
    data() {
      return {
        username: "",
        password: "",
        error: "",
        title: "uni-fab",
        directionStr: "垂直",
        horizontal: "left",
        vertical: "bottom",
        direction: "horizontal",
        that: "",
        pattern: {
          color: "#7A7E83",
          backgroundColor: "#fff",
          selectedColor: "#007AFF",
          buttonColor: "#ff0000",
          iconColor: "#fff"
        },
        is_color_type: false,
        content: [
          {
            iconPath: "/static/switch.png",
            text: "密码登录",
            active: false
          },
          {
            iconPath: "/static/find.png",
            text: "找回密码",
            active: false
          },
          {
            iconPath: "/static/register.png",
            text: "注册",
            active: false
          }
        ]
      };
    },
    onBackPress() {
      if (this.$refs.fab.isShow) {
        this.$refs.fab.close();
        return true;
      }
      return false;
    },
    methods: {
      onUsernameInput(event) {
        this.username = event.detail.value;
      },
      onPasswordInput(event) {
        this.password = event.detail.value;
      },
      onLoginClick() {
        let that = this;
        uni.request({
          url: "https://120.55.37.93/vcodelogin",
          method: "POST",
          data: {
            "phoneNumber": that.username,
            "verifyCode": that.password
            // "phoneNumber":'13106151700',  "verifyCode": '13106151700zhf' ,
          },
          success: (res) => {
            formatAppLog("log", "at pages/login-message/login-message.vue:112", res);
            if (res.data.code === 200) {
              uni.showToast({
                title: "登录成功",
                icon: "success"
              });
              getApp().globalData.islogin = true;
              uni.setStorageSync("userName", that.username);
              uni.setStorageSync("token", res.data.data.token);
              uni.request({
                url: "https://120.55.37.93/query/bankCard",
                method: "GET",
                data: {},
                header: {
                  "token": res.data.data.token
                },
                success: (res2) => {
                  uni.setStorageSync("tranferCardId", res2.data.data[0].cardId);
                },
                fail: (error2) => {
                  formatAppLog("log", "at pages/login-message/login-message.vue:133", error2);
                }
              });
              uni.request({
                url: "https://120.55.37.93/query/customerInfo",
                method: "GET",
                data: {},
                header: {
                  "token": res.data.data.token
                },
                success: (res2) => {
                  uni.setStorageSync("name", res2.data.data.surname + res2.data.data.name);
                },
                fail: (error2) => {
                  formatAppLog("log", "at pages/login-message/login-message.vue:147", error2);
                }
              });
              uni.switchTab({
                url: "/pages/home/home"
              });
            } else {
              uni.showToast({
                title: "请输入正确的手机号和验证码",
                icon: "error"
              });
            }
          },
          fail: (error2) => {
            if (error2.data.code === 300)
              ;
            else {
              formatAppLog("log", "at pages/login-message/login-message.vue:167", "登录失败，但原因未知");
              formatAppLog("log", "at pages/login-message/login-message.vue:168", error2);
            }
          }
        });
      },
      handleClick() {
        let that = this;
        uni.request({
          url: "https://120.55.37.93/sendsms/nologin?phoneNumber=" + that.username,
          method: "POST",
          data: {},
          success: (res) => {
            uni.showToast({
              title: "发送成功",
              icon: ""
            });
          }
        });
      },
      trigger(e2) {
        formatAppLog("log", "at pages/login-message/login-message.vue:195", e2);
        if (e2.index == 0)
          uni.navigateTo({
            url: "/pages/login/login"
          });
        if (e2.index == 1)
          uni.navigateTo({
            url: "/pages/findOne/findOne"
          });
        if (e2.index == 2)
          uni.navigateTo({
            url: "/pages/register/register"
          });
      },
      fabClick() {
      }
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1$b);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_2$6);
    const _component_uni_fab = resolveEasycom(vue.resolveDynamicComponent("uni-fab"), __easycom_2$5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("text", { class: "title" }),
      vue.createElementVNode("text", { class: "title" }),
      vue.createElementVNode("text", { class: "title" }),
      vue.createElementVNode("text", { class: "title" }),
      vue.createElementVNode("text", { class: "title" }),
      vue.createElementVNode("text", { class: "title" }),
      vue.createElementVNode("text", { class: "title" }),
      vue.createElementVNode("text", { class: "title" }),
      vue.createElementVNode("text", { class: "title" }, "登录"),
      vue.createVNode(_component_uv_form, null, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uv_form_item, {
            label: "+86",
            "border-bottom": "true"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "input",
                {
                  class: "input",
                  type: "text",
                  maxlength: "11",
                  placeholder: "  请输入手机号",
                  onInput: _cache[0] || (_cache[0] = (...args) => $options.onUsernameInput && $options.onUsernameInput(...args))
                },
                null,
                32
                /* HYDRATE_EVENTS */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uv_form_item, { "border-bottom": "true" }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "input",
                {
                  class: "input",
                  type: "password",
                  placeholder: "  请输入验证码",
                  onInput: _cache[1] || (_cache[1] = (...args) => $options.onPasswordInput && $options.onPasswordInput(...args))
                },
                null,
                32
                /* HYDRATE_EVENTS */
              )
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createElementVNode("button", {
        class: "button2",
        type: "warn",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.handleClick && $options.handleClick(...args))
      }, "获取验证码"),
      vue.createElementVNode("text", { class: "title" }),
      vue.createElementVNode("button", {
        class: "button",
        type: "warn",
        onClick: _cache[3] || (_cache[3] = (...args) => $options.onLoginClick && $options.onLoginClick(...args))
      }, "登录"),
      vue.createElementVNode("text", { class: "title" }),
      $data.error ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: "error"
        },
        vue.toDisplayString($data.error),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true),
      vue.createVNode(_component_uni_fab, {
        pattern: $data.pattern,
        content: $data.content,
        horizontal: $data.horizontal,
        vertical: $data.vertical,
        direction: $data.direction,
        onTrigger: $options.trigger,
        onFabClick: $options.fabClick
      }, null, 8, ["pattern", "content", "horizontal", "vertical", "direction", "onTrigger", "onFabClick"])
    ]);
  }
  const PagesLoginMessageLoginMessage = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__file", "E:/BankSystem/user/pages/login-message/login-message.vue"]]);
  const _sfc_main$r = {
    name: "UniCard",
    emits: ["click"],
    props: {
      title: {
        type: String,
        default: ""
      },
      subTitle: {
        type: String,
        default: ""
      },
      padding: {
        type: String,
        default: "10px"
      },
      margin: {
        type: String,
        default: "15px"
      },
      spacing: {
        type: String,
        default: "0 10px"
      },
      extra: {
        type: String,
        default: ""
      },
      cover: {
        type: String,
        default: ""
      },
      thumbnail: {
        type: String,
        default: ""
      },
      isFull: {
        // 内容区域是否通栏
        type: Boolean,
        default: false
      },
      isShadow: {
        // 是否开启阴影
        type: Boolean,
        default: true
      },
      shadow: {
        type: String,
        default: "0px 0px 3px 1px rgba(0, 0, 0, 0.08)"
      },
      border: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onClick(type2) {
        this.$emit("click", type2);
      }
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-card", { "uni-card--full": $props.isFull, "uni-card--shadow": $props.isShadow, "uni-card--border": $props.border }]),
        style: vue.normalizeStyle({ "margin": $props.isFull ? 0 : $props.margin, "padding": $props.spacing, "box-shadow": $props.isShadow ? $props.shadow : "" })
      },
      [
        vue.createCommentVNode(" 封面 "),
        vue.renderSlot(_ctx.$slots, "cover", {}, () => [
          $props.cover ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-card__cover"
          }, [
            vue.createElementVNode("image", {
              class: "uni-card__cover-image",
              mode: "widthFix",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick("cover")),
              src: $props.cover
            }, null, 8, ["src"])
          ])) : vue.createCommentVNode("v-if", true)
        ], true),
        vue.renderSlot(_ctx.$slots, "title", {}, () => [
          $props.title || $props.extra ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-card__header"
          }, [
            vue.createCommentVNode(" 卡片标题 "),
            vue.createElementVNode("view", {
              class: "uni-card__header-box",
              onClick: _cache[1] || (_cache[1] = ($event) => $options.onClick("title"))
            }, [
              $props.thumbnail ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-card__header-avatar"
              }, [
                vue.createElementVNode("image", {
                  class: "uni-card__header-avatar-image",
                  src: $props.thumbnail,
                  mode: "aspectFit"
                }, null, 8, ["src"])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "uni-card__header-content" }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-card__header-content-title uni-ellipsis" },
                  vue.toDisplayString($props.title),
                  1
                  /* TEXT */
                ),
                $props.title && $props.subTitle ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "uni-card__header-content-subtitle uni-ellipsis"
                  },
                  vue.toDisplayString($props.subTitle),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            vue.createElementVNode("view", {
              class: "uni-card__header-extra",
              onClick: _cache[2] || (_cache[2] = ($event) => $options.onClick("extra"))
            }, [
              vue.renderSlot(_ctx.$slots, "extra", {}, () => [
                vue.createElementVNode(
                  "text",
                  { class: "uni-card__header-extra-text" },
                  vue.toDisplayString($props.extra),
                  1
                  /* TEXT */
                )
              ], true)
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ], true),
        vue.createCommentVNode(" 卡片内容 "),
        vue.createElementVNode(
          "view",
          {
            class: "uni-card__content",
            style: vue.normalizeStyle({ padding: $props.padding }),
            onClick: _cache[3] || (_cache[3] = ($event) => $options.onClick("content"))
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode("view", {
          class: "uni-card__actions",
          onClick: _cache[4] || (_cache[4] = ($event) => $options.onClick("actions"))
        }, [
          vue.renderSlot(_ctx.$slots, "actions", {}, void 0, true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__scopeId", "data-v-ae4bee67"], ["__file", "E:/BankSystem/user/uni_modules/uni-card/components/uni-card/uni-card.vue"]]);
  const _sfc_main$q = {
    data() {
      return {
        transferNumberOut: "",
        transferData: "",
        cardId: "",
        codeTips: "",
        title: "",
        transferCard: "",
        transferNumber: "",
        transferName: "",
        transferMoney: "",
        transferMessage: "",
        token: "",
        phoneNumber: "",
        phoneTail: ""
      };
    },
    computed: {},
    methods: {
      getDataFromStorage() {
        const value1 = uni.getStorageSync("transferNumberOut");
        if (value1 !== void 0) {
          this.transferNumberOut = value1;
        } else {
          formatAppLog("log", "at pages/transferConfirm/transferConfirm.vue:80", "transferNumberOut not found in storage");
        }
        const value2 = uni.getStorageSync("transfer");
        if (value2 !== void 0) {
          this.transferData = value2;
        } else {
          formatAppLog("log", "at pages/transferConfirm/transferConfirm.vue:87", "transfernot found in storage");
        }
        const value3 = uni.getStorageSync("tranferCardId");
        if (value3 !== void 0) {
          this.cardId = value3;
        } else {
          formatAppLog("log", "at pages/transferConfirm/transferConfirm.vue:94", "transfernot found in storage");
        }
        const value4 = uni.getStorageSync("token");
        if (value4 !== void 0) {
          this.token = value4;
        } else {
          formatAppLog("log", "at pages/transferConfirm/transferConfirm.vue:100", "transfernot found in storage");
        }
      },
      codeChange(text) {
        this.codeTips = text;
      },
      getCode() {
        if (this.$refs.uCode.canGetCode) {
          let that = this;
          uni.getStorage({
            key: "token",
            success: function(res) {
              uni.showLoading({
                title: "正在获取验证码",
                mask: true
              });
              uni.request({
                url: "https://120.55.37.93/sendsms/login",
                method: "GET",
                header: {
                  "token": that.token
                },
                success: function(res2) {
                  uni.hideLoading();
                  that.$refs.uCode.start();
                },
                fail: function(error2) {
                  uni.hideLoading();
                  uni.showToast({
                    title: "错误，稍后再试",
                    icon: "error",
                    duration: 2e3
                  });
                }
              });
            }
          });
          this.$refs.uCode.start();
        } else {
          this.$u.toast("倒计时结束后再发送");
        }
      },
      Confirm() {
        this.$refs.popup.open();
      },
      codeInputFinish(e2) {
        let that = this;
        uni.getStorage({
          key: "token",
          success: function(res) {
            uni.request({
              url: "https://120.55.37.93/user/transferMoney",
              method: "POST",
              header: {
                "token": that.token
              },
              data: {
                "pojo": {
                  "senderCardId": that.cardId,
                  "receiverCardNumber": that.transferData.receiverCardNumber,
                  "receiverName": that.transferData.receiverName,
                  "Amount": that.transferData.Amount,
                  "postscript": that.transferData.postscript
                },
                "verifyCode": String(e2)
              },
              success: function(res2) {
                formatAppLog("log", "at pages/transferConfirm/transferConfirm.vue:172", res2);
                if (res2.data.code == "200") {
                  formatAppLog("log", "at pages/transferConfirm/transferConfirm.vue:174", res2);
                  uni.setStorageSync("transferRes", res2.data.data);
                  formatAppLog("log", "at pages/transferConfirm/transferConfirm.vue:176", res2.data.data.balance);
                  uni.navigateTo({
                    url: "/pages/transferResult/transferResult"
                  });
                } else if (res2.data.code == "110") {
                  uni.showToast({
                    title: "验证码错误",
                    icon: "none"
                  });
                } else if (res2.data.code == "3") {
                  uni.showToast({
                    title: "转账金额已达上限",
                    icon: "none"
                  });
                  uni.navigateBack();
                } else {
                  uni.showToast({
                    title: "请输入正确的转账信息",
                    icon: "none"
                  });
                  uni.navigateBack();
                }
              },
              fail: function(error2) {
                uni.hideLoading();
                uni.showToast({
                  title: "错误，稍后再试",
                  icon: "error",
                  duration: 2e3
                });
              }
            });
          }
        });
      }
    },
    onLoad() {
      let temp = "";
      temp = uni.getStorageSync("userName");
      temp = temp.slice(-4);
      this.phoneTail = temp;
      this.getDataFromStorage();
      let value2 = this.transferData.Amount;
      this.transferMoney = value2.toFixed(2);
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_0$2);
    const _component_uni_section = resolveEasycom(vue.resolveDynamicComponent("uni-section"), __easycom_3$2);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_4$2);
    const _component_uv_code_input = resolveEasycom(vue.resolveDynamicComponent("uv-code-input"), __easycom_5);
    const _component_uv_code = resolveEasycom(vue.resolveDynamicComponent("uv-code"), __easycom_6$1);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_7);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_uni_section, { title: "" }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_card, { isFull: true }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("text", null, [
                vue.createTextVNode("转账金额（人民币元)"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("text", { class: "aaaa" }, [
                vue.createTextVNode(
                  vue.toDisplayString(this.transferMoney) + " ",
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("br")
              ])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "popup",
          type: "center",
          isMaskClick: false
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-end", "background-color": "#FFFFFF" } }, [
              vue.createVNode(_component_uv_icon, {
                name: "close",
                size: "14",
                style: { "margin-right": "5rpx" },
                onClick: _cache[0] || (_cache[0] = ($event) => this.$refs.popup.close())
              })
            ]),
            vue.createElementVNode("view", { style: { "width": "600rpx", "height": "350rpx", "display": "flex", "flex-direction": "column", "align-items": "center", "background-color": "#FFFFFF" } }, [
              vue.createElementVNode("view", null, "手机交易码"),
              vue.createVNode(_component_uv_line, { margin: "10rpx" }),
              vue.createElementVNode(
                "view",
                { style: { "margin-top": "20rpx" } },
                "已发送至尾号" + vue.toDisplayString($data.phoneTail) + "的手机",
                1
                /* TEXT */
              ),
              vue.createVNode(_component_uv_code_input, {
                mode: "line",
                size: "28",
                onFinish: $options.codeInputFinish,
                style: { "margin-top": "40rpx" }
              }, null, 8, ["onFinish"]),
              vue.createVNode(_component_uv_code, {
                ref: "uCode",
                onChange: $options.codeChange,
                seconds: "60"
              }, null, 8, ["onChange"]),
              vue.createElementVNode(
                "button",
                {
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.getCode && $options.getCode(...args)),
                  style: { "border-radius": "10rpx", "width": "300rpx", "height": "60rpx", "font-size": "0.8em", "margin-top": "40rpx", "background-color": "red", "color": "#FFFFFF" }
                },
                vue.toDisplayString($data.codeTips),
                1
                /* TEXT */
              )
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(_component_uni_section, { title: "" }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_card, { isFull: true }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", null, [
                vue.createElementVNode("text", { class: "uni-bodyy" }, "收款人姓名"),
                vue.createElementVNode("text", { class: "uni-ininin" }, [
                  vue.createTextVNode(
                    vue.toDisplayString(this.transferData.receiverName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("br")
                ])
              ]),
              vue.createElementVNode("view", null, [
                vue.createElementVNode("text", { class: "uni-body" }, "收款账号"),
                vue.createElementVNode("text", { class: "uni-ininin" }, [
                  vue.createTextVNode(
                    vue.toDisplayString(this.transferData.receiverCardNumber),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("br")
                ])
              ]),
              vue.createElementVNode("view", null, [
                vue.createElementVNode("text", { class: "uni-body" }, "收款银行"),
                vue.createElementVNode("text", { class: "uni-ininin" }, [
                  vue.createTextVNode("中国银行"),
                  vue.createElementVNode("br")
                ])
              ]),
              vue.createElementVNode("view", null, [
                vue.createElementVNode("text", { class: "uni-body" }, "转账方式"),
                vue.createElementVNode("text", { class: "uni-ininin" }, [
                  vue.createTextVNode("实时"),
                  vue.createElementVNode("br")
                ])
              ]),
              vue.createElementVNode("view", null, [
                vue.createElementVNode("text", { class: "uni-body" }, "付款账号"),
                vue.createElementVNode("text", { class: "uni-ininin" }, [
                  vue.createTextVNode(
                    vue.toDisplayString($data.transferNumberOut),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("br")
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createElementVNode("button", {
        class: "button",
        type: "warn",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.Confirm && $options.Confirm(...args))
      }, "确认")
    ]);
  }
  const PagesTransferConfirmTransferConfirm = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__file", "E:/BankSystem/user/pages/transferConfirm/transferConfirm.vue"]]);
  const _sfc_main$p = {
    name: "UniBadge",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: "error"
      },
      inverted: {
        type: Boolean,
        default: false
      },
      isDot: {
        type: Boolean,
        default: false
      },
      maxNum: {
        type: Number,
        default: 99
      },
      absolute: {
        type: String,
        default: ""
      },
      offset: {
        type: Array,
        default() {
          return [0, 0];
        }
      },
      text: {
        type: [String, Number],
        default: ""
      },
      size: {
        type: String,
        default: "small"
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      width() {
        return String(this.text).length * 8 + 12;
      },
      classNames() {
        const {
          inverted,
          type: type2,
          size,
          absolute
        } = this;
        return [
          inverted ? "uni-badge--" + type2 + "-inverted" : "",
          "uni-badge--" + type2,
          "uni-badge--" + size,
          absolute ? "uni-badge--absolute" : ""
        ].join(" ");
      },
      positionStyle() {
        if (!this.absolute)
          return {};
        let w = this.width / 2, h2 = 10;
        if (this.isDot) {
          w = 5;
          h2 = 5;
        }
        const x = `${-w + this.offset[0]}px`;
        const y = `${-h2 + this.offset[1]}px`;
        const whiteList = {
          rightTop: {
            right: x,
            top: y
          },
          rightBottom: {
            right: x,
            bottom: y
          },
          leftBottom: {
            left: x,
            bottom: y
          },
          leftTop: {
            left: x,
            top: y
          }
        };
        const match = whiteList[this.absolute];
        return match ? match : whiteList["rightTop"];
      },
      dotStyle() {
        if (!this.isDot)
          return {};
        return {
          width: "10px",
          minWidth: "0",
          height: "10px",
          padding: "0",
          borderRadius: "10px"
        };
      },
      displayValue() {
        const {
          isDot,
          text,
          maxNum
        } = this;
        return isDot ? "" : Number(text) > maxNum ? `${maxNum}+` : text;
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-badge--x" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.text ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: vue.normalizeClass([$options.classNames, "uni-badge"]),
          style: vue.normalizeStyle([$options.positionStyle, $props.customStyle, $options.dotStyle]),
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick())
        },
        vue.toDisplayString($options.displayValue),
        7
        /* TEXT, CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-c97cb896"], ["__file", "E:/BankSystem/user/uni_modules/uni-badge/components/uni-badge/uni-badge.vue"]]);
  const _sfc_main$o = {
    name: "UniListItem",
    emits: ["click", "switchChange"],
    props: {
      direction: {
        type: String,
        default: "row"
      },
      title: {
        type: String,
        default: ""
      },
      note: {
        type: String,
        default: ""
      },
      ellipsis: {
        type: [Number, String],
        default: 0
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      clickable: {
        type: Boolean,
        default: false
      },
      showArrow: {
        type: [Boolean, String],
        default: false
      },
      link: {
        type: [Boolean, String],
        default: false
      },
      to: {
        type: String,
        default: ""
      },
      showBadge: {
        type: [Boolean, String],
        default: false
      },
      showSwitch: {
        type: [Boolean, String],
        default: false
      },
      switchChecked: {
        type: [Boolean, String],
        default: false
      },
      badgeText: {
        type: String,
        default: ""
      },
      badgeType: {
        type: String,
        default: "success"
      },
      badgeStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      rightText: {
        type: String,
        default: ""
      },
      thumb: {
        type: String,
        default: ""
      },
      thumbSize: {
        type: String,
        default: "base"
      },
      showExtraIcon: {
        type: [Boolean, String],
        default: false
      },
      extraIcon: {
        type: Object,
        default() {
          return {
            type: "",
            color: "#000000",
            size: 20,
            customPrefix: ""
          };
        }
      },
      border: {
        type: Boolean,
        default: true
      },
      customStyle: {
        type: Object,
        default() {
          return {
            padding: "",
            backgroundColor: "#FFFFFF"
          };
        }
      },
      keepScrollPosition: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      "customStyle.padding": {
        handler(padding) {
          if (typeof padding == "number") {
            padding += "";
          }
          let paddingArr = padding.split(" ");
          if (paddingArr.length === 1) {
            const allPadding = paddingArr[0];
            this.padding = {
              "top": allPadding,
              "right": allPadding,
              "bottom": allPadding,
              "left": allPadding
            };
          } else if (paddingArr.length === 2) {
            const [verticalPadding, horizontalPadding] = paddingArr;
            this.padding = {
              "top": verticalPadding,
              "right": horizontalPadding,
              "bottom": verticalPadding,
              "left": horizontalPadding
            };
          } else if (paddingArr.length === 4) {
            const [topPadding, rightPadding, bottomPadding, leftPadding] = paddingArr;
            this.padding = {
              "top": topPadding,
              "right": rightPadding,
              "bottom": bottomPadding,
              "left": leftPadding
            };
          }
        },
        immediate: true
      }
    },
    // inject: ['list'],
    data() {
      return {
        isFirstChild: false,
        padding: {
          top: "",
          right: "",
          bottom: "",
          left: ""
        }
      };
    },
    mounted() {
      this.list = this.getForm();
      if (this.list) {
        if (!this.list.firstChildAppend) {
          this.list.firstChildAppend = true;
          this.isFirstChild = true;
        }
      }
    },
    methods: {
      /**
       * 获取父元素实例
       */
      getForm(name = "uniList") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      onClick() {
        if (this.to !== "") {
          this.openPage();
          return;
        }
        if (this.clickable || this.link) {
          this.$emit("click", {
            data: {}
          });
        }
      },
      onSwitchChange(e2) {
        this.$emit("switchChange", e2.detail);
      },
      openPage() {
        if (["navigateTo", "redirectTo", "reLaunch", "switchTab"].indexOf(this.link) !== -1) {
          this.pageApi(this.link);
        } else {
          this.pageApi("navigateTo");
        }
      },
      pageApi(api) {
        let callback = {
          url: this.to,
          success: (res) => {
            this.$emit("click", {
              data: res
            });
          },
          fail: (err) => {
            this.$emit("click", {
              data: err
            });
          }
        };
        switch (api) {
          case "navigateTo":
            uni.navigateTo(callback);
            break;
          case "redirectTo":
            uni.redirectTo(callback);
            break;
          case "reLaunch":
            uni.reLaunch(callback);
            break;
          case "switchTab":
            uni.switchTab(callback);
            break;
          default:
            uni.navigateTo(callback);
        }
      }
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$g);
    const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_1$2);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass([{ "uni-list-item--disabled": $props.disabled }, "uni-list-item"]),
      style: vue.normalizeStyle({ "background-color": $props.customStyle.backgroundColor }),
      "hover-class": !$props.clickable && !$props.link || $props.disabled || $props.showSwitch ? "" : "uni-list-item--hover",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.isFirstChild ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["border--left", { "uni-list--border": $props.border }])
        },
        null,
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uni-list-item__container", { "container--right": $props.showArrow || $props.link, "flex--direction": $props.direction === "column" }]),
          style: vue.normalizeStyle({ paddingTop: $data.padding.top, paddingLeft: $data.padding.left, paddingRight: $data.padding.right, paddingBottom: $data.padding.bottom })
        },
        [
          vue.renderSlot(_ctx.$slots, "header", {}, () => [
            vue.createElementVNode("view", { class: "uni-list-item__header" }, [
              $props.thumb ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-list-item__icon"
              }, [
                vue.createElementVNode("image", {
                  src: $props.thumb,
                  class: vue.normalizeClass(["uni-list-item__icon-img", ["uni-list--" + $props.thumbSize]])
                }, null, 10, ["src"])
              ])) : $props.showExtraIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-list-item__icon"
              }, [
                vue.createVNode(_component_uni_icons, {
                  customPrefix: $props.extraIcon.customPrefix,
                  color: $props.extraIcon.color,
                  size: $props.extraIcon.size,
                  type: $props.extraIcon.type
                }, null, 8, ["customPrefix", "color", "size", "type"])
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ], true),
          vue.renderSlot(_ctx.$slots, "body", {}, () => [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["uni-list-item__content", { "uni-list-item__content--center": $props.thumb || $props.showExtraIcon || $props.showBadge || $props.showSwitch }])
              },
              [
                $props.title ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: vue.normalizeClass(["uni-list-item__content-title", [$props.ellipsis !== 0 && $props.ellipsis <= 2 ? "uni-ellipsis-" + $props.ellipsis : ""]])
                  },
                  vue.toDisplayString($props.title),
                  3
                  /* TEXT, CLASS */
                )) : vue.createCommentVNode("v-if", true),
                $props.note ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 1,
                    class: "uni-list-item__content-note"
                  },
                  vue.toDisplayString($props.note),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ], true),
          vue.renderSlot(_ctx.$slots, "footer", {}, () => [
            $props.rightText || $props.showBadge || $props.showSwitch ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: vue.normalizeClass(["uni-list-item__extra", { "flex--justify": $props.direction === "column" }])
              },
              [
                $props.rightText ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "uni-list-item__extra-text"
                  },
                  vue.toDisplayString($props.rightText),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true),
                $props.showBadge ? (vue.openBlock(), vue.createBlock(_component_uni_badge, {
                  key: 1,
                  type: $props.badgeType,
                  text: $props.badgeText,
                  "custom-style": $props.badgeStyle
                }, null, 8, ["type", "text", "custom-style"])) : vue.createCommentVNode("v-if", true),
                $props.showSwitch ? (vue.openBlock(), vue.createElementBlock("switch", {
                  key: 2,
                  disabled: $props.disabled,
                  checked: $props.switchChecked,
                  onChange: _cache[0] || (_cache[0] = (...args) => $options.onSwitchChange && $options.onSwitchChange(...args))
                }, null, 40, ["disabled", "checked"])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ], true)
        ],
        6
        /* CLASS, STYLE */
      ),
      $props.showArrow || $props.link ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
        key: 1,
        size: 16,
        class: "uni-icon-wrapper",
        color: "#bbb",
        type: "arrowright"
      })) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-c7524739"], ["__file", "E:/BankSystem/user/uni_modules/uni-list/components/uni-list-item/uni-list-item.vue"]]);
  const _sfc_main$n = {
    name: "uniList",
    "mp-weixin": {
      options: {
        multipleSlots: false
      }
    },
    props: {
      stackFromEnd: {
        type: Boolean,
        default: false
      },
      enableBackToTop: {
        type: [Boolean, String],
        default: false
      },
      scrollY: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: Boolean,
        default: true
      },
      renderReverse: {
        type: Boolean,
        default: false
      }
    },
    // provide() {
    // 	return {
    // 		list: this
    // 	};
    // },
    created() {
      this.firstChildAppend = false;
    },
    methods: {
      loadMore(e2) {
        this.$emit("scrolltolower");
      },
      scroll(e2) {
        this.$emit("scroll", e2);
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-list uni-border-top-bottom" }, [
      $props.border ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-list--border-top"
      })) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.border ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uni-list--border-bottom"
      })) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-c2f1266a"], ["__file", "E:/BankSystem/user/uni_modules/uni-list/components/uni-list/uni-list.vue"]]);
  const _sfc_main$m = {
    data() {
      return {
        temp: "12343",
        transferData: "",
        transferNumberOut: "",
        transferRes: ""
      };
    },
    methods: {
      getDataFromStorage() {
        const value1 = uni.getStorageSync("transferNumberOut");
        if (value1 !== void 0) {
          this.transferNumberOut = value1;
        } else {
          formatAppLog("log", "at pages/transferResult/transferResult.vue:82", "transferNumberOut not found in storage");
        }
        const value2 = uni.getStorageSync("transfer");
        if (value2 !== void 0) {
          this.transferData = value2;
        } else {
          formatAppLog("log", "at pages/transferResult/transferResult.vue:89", "transfernot found in storage");
        }
        const value3 = uni.getStorageSync("transferRes");
        if (value3 !== void 0) {
          this.transferRes = value3;
          formatAppLog("log", "at pages/transferResult/transferResult.vue:95", this.transferRes);
        } else {
          formatAppLog("log", "at pages/transferResult/transferResult.vue:97", "transfernot found in storage");
        }
      },
      backHome() {
        uni.switchTab({
          url: "/pages/home/home"
        });
      }
    },
    onLoad() {
      this.getDataFromStorage();
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_0$1);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_1$1);
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_0$2);
    const _component_uni_section = resolveEasycom(vue.resolveDynamicComponent("uni-section"), __easycom_3$2);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_uni_section, { title: "" }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("text", { class: "title1" }, "操作结果"),
            vue.createVNode(_component_uni_card, {
              padding: "0",
              isFull: true,
              spacing: "0"
            }, {
              cover: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "custom-cover" }, [
                  vue.createElementVNode("view", { class: "cover-content" }, [
                    vue.createElementVNode("image", {
                      src: "/static/Yes.png",
                      style: { "margin-top": "30rpx", "margin-bottom": "50rpx", "height": "150rpx", "width": "150rpx", "margin-left": "300rpx" }
                    }, [
                      vue.createElementVNode("br")
                    ]),
                    vue.createElementVNode("text", { class: "success" }, [
                      vue.createTextVNode(
                        vue.toDisplayString($data.transferData.Amount.toFixed(2)) + "元交易成功",
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("br")
                    ]),
                    vue.createElementVNode("text", { class: "message" }, "预计10秒内到账，具体时间取决于对方银行")
                  ])
                ])
              ]),
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_list, null, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_list_item, { title: "付款后可用余额" }, {
                      footer: vue.withCtx(() => [
                        vue.createElementVNode(
                          "text",
                          { class: "reslutNumber" },
                          vue.toDisplayString(this.transferRes.balance),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_list_item, { title: "付款账户" }, {
                      footer: vue.withCtx(() => [
                        vue.createElementVNode(
                          "text",
                          { class: "reslutNumber" },
                          vue.toDisplayString($data.transferNumberOut),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_list_item, { title: "收款人名称" }, {
                      footer: vue.withCtx(() => [
                        vue.createElementVNode(
                          "text",
                          { class: "reslutNumber" },
                          vue.toDisplayString($data.transferData.receiverName),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_list_item, { title: "收款账号" }, {
                      footer: vue.withCtx(() => [
                        vue.createElementVNode(
                          "text",
                          { class: "reslutNumber" },
                          vue.toDisplayString($data.transferData.receiverCardNumber),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_list_item, { title: "收款银行" }, {
                      footer: vue.withCtx(() => [
                        vue.createElementVNode("text", { class: "reslutNumber" }, "中国银行")
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_list_item, { title: "转账方式" }, {
                      footer: vue.withCtx(() => [
                        vue.createElementVNode("text", { class: "reslutNumber" }, "实时")
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_list_item, { title: "交易序号" }, {
                      footer: vue.withCtx(() => [
                        vue.createElementVNode(
                          "text",
                          { class: "reslutNumber" },
                          vue.toDisplayString(this.transferRes.transactionId),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_uni_card, {
          isFull: true,
          onClick: $options.backHome
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("text", { class: "back" }, "首页")
          ]),
          _: 1
          /* STABLE */
        }, 8, ["onClick"])
      ])
    ]);
  }
  const PagesTransferResultTransferResult = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__file", "E:/BankSystem/user/pages/transferResult/transferResult.vue"]]);
  const _sfc_main$l = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesFindOneFindOne = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__file", "E:/BankSystem/user/pages/findOne/findOne.vue"]]);
  const _sfc_main$k = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesFindTwoFindTwo = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__file", "E:/BankSystem/user/pages/findTwo/findTwo.vue"]]);
  const _sfc_main$j = {
    data() {
      return {
        that: "",
        datas: [{
          balance: "",
          cardId: "",
          cardNumber: "",
          isActive: ""
        }]
      };
    },
    methods: {
      handleCardClick(index2) {
        uni.setStorageSync("tranferCardId", this.datas[index2].cardId);
        uni.redirectTo({
          url: "/pages/transfer/transfer"
        });
        formatAppLog("log", "at pages/transferCloose/transferCloose.vue:36", "Card clicked:" + this.datas[index2].cardId);
      }
    },
    onLoad() {
      let that = this;
      uni.request({
        url: "https://120.55.37.93/query/bankCard",
        method: "GET",
        data: {},
        header: {
          "token": uni.getStorageSync("token")
        },
        success: (res) => {
          that.datas = res.data.data;
          formatAppLog("log", "at pages/transferCloose/transferCloose.vue:52", that.datas);
          formatAppLog("log", "at pages/transferCloose/transferCloose.vue:53", res);
        },
        fail: (error2) => {
          formatAppLog("log", "at pages/transferCloose/transferCloose.vue:56", error2);
        }
      });
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.datas, (card, index2) => {
          return vue.openBlock(), vue.createBlock(_component_uni_card, {
            class: "card",
            key: index2,
            onClick: ($event) => $options.handleCardClick(index2)
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { style: { "display": "flex" } }, [
                vue.createElementVNode("image", {
                  src: "/static/card.png",
                  class: "icc"
                }),
                vue.createElementVNode(
                  "text",
                  { class: "cardNumber" },
                  vue.toDisplayString(card.cardNumber),
                  1
                  /* TEXT */
                )
              ])
            ]),
            _: 2
            /* DYNAMIC */
          }, 1032, ["onClick"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesTransferClooseTransferCloose = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-6016e410"], ["__file", "E:/BankSystem/user/pages/transferCloose/transferCloose.vue"]]);
  const _sfc_main$i = {
    data() {
      return {
        show1: false,
        show2: false,
        fla: false,
        value1: "",
        value2: ""
      };
    },
    methods: {
      clickSetpassword: function(event) {
        if (this.value1 === this.value2) {
          this.fla = false;
          let res = /^[0-9]{6}$/;
          if (res.test(this.value1)) {
            uni.request({
              url: "https://120.55.37.93/edit/setLoginPassword",
              method: "POST",
              data: {
                "loginPassword": this.value1
              },
              success: function(res2) {
                formatAppLog("log", "at pages/setPassword/setPassword.vue:76", res2);
              },
              fail: function(err) {
                formatAppLog("log", "at pages/setPassword/setPassword.vue:79", err);
              }
            });
          } else {
            uni.showModal({
              title: "请输入六位数字密码"
            });
            this.value1 = "";
            this.value2 = "";
          }
        } else {
          this.value1 = "";
          this.value2 = "";
          this.fla = true;
        }
      },
      showkey1() {
        if (this.show2) {
          this.show2 = false;
        }
        this.show1 = true;
      },
      showkey2() {
        if (this.show1) {
          this.show1 = false;
        }
        this.show2 = true;
      },
      valchange(val) {
        if (this.value1.length <= 5)
          this.value1 += val;
      },
      backspace() {
        if (this.value1.length)
          this.value1 = this.value1.substr(0, this.value1.length - 1);
      },
      Clickclose() {
        this.show1 = false;
      },
      clickconfirm() {
        this.show1 = false;
      },
      valchange1(val) {
        if (this.value2.length <= 5)
          this.value2 += val;
      },
      backspace1() {
        if (this.value2.length)
          this.value2 = this.value2.substr(0, this.value2.length - 1);
      },
      Clickclose1() {
        this.show2 = false;
      },
      clickconfirm1() {
        this.show2 = false;
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "head" }, [
        vue.createElementVNode("view", { class: "shezhi" }, " 设置六位支付密码 "),
        vue.createElementVNode("view", { class: "zuoy" }, " 用于交易时使用 ")
      ]),
      vue.createElementVNode("view", { class: "zhimi" }, [
        vue.createElementVNode("text", { class: "textzhimi" }, "支付密码"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "zimi",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.showkey1 && $options.showkey1(...args)),
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.value1 = $event),
            maxlength: "6",
            type: "password",
            placeholder: "请输入六位支付密码"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.value1]
        ]),
        vue.createElementVNode("text", { class: "textquemi" }, "确认密码"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "quemi",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.showkey2 && $options.showkey2(...args)),
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.value2 = $event),
            maxlength: "6",
            type: "password",
            placeholder: "请输入六位确认密码"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.value2]
        ])
      ]),
      $data.fla ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "wrong"
      }, "密码输入不一致，请重新输入")) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("button", {
        class: "xbu",
        onClick: _cache[4] || (_cache[4] = (...args) => $options.clickSetpassword && $options.clickSetpassword(...args))
      }, "下一步"),
      vue.createCommentVNode(' <uv-keyboard\r\n		ref="uKeyboard1"\r\n		 mode="number"  \r\n		 @change="valchange" \r\n		 @backspace="backspace" \r\n		 :show="show1" \r\n		 @cancel="Clickclose"\r\n		@confirm="clickconfirm" \r\n		dotDisabled\r\n		:overlay="false"\r\n		:random="true"\r\n		tips="安全键盘"\r\n		></uv-keyboard>\r\n		<uv-keyboard\r\n		ref="uKeyboard2"\r\n		 mode="number"  \r\n		 @change="valchange1" \r\n		 @backspace="backspace1" \r\n		 :show="show2" \r\n		 @cancel="Clickclose1"\r\n		@confirm="clickconfirm1" \r\n		dotDisabled\r\n		:overlay="false"\r\n		:random="true"\r\n		tips="安全键盘"\r\n		></uv-keyboard> ')
    ]);
  }
  const PagesSetPasswordSetPassword = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__file", "E:/BankSystem/user/pages/setPassword/setPassword.vue"]]);
  const _sfc_main$h = {
    data() {
      return {
        show1: false,
        show2: false,
        showpick: false,
        ID_card: "",
        institute: "",
        password: "",
        columns: [
          ["中国银行", "工商银行", "农业银行", "建设银行", "交通银行", "邮储银行"]
        ]
      };
    },
    methods: {
      clickcheck: function(e2) {
        var reg = /^([1-9]{1})(\d{15}|\d{18})$/;
        if (!reg.test(this.ID_card)) {
          uni.showModal({
            title: "卡号错误"
          });
        } else if (this.password.trim() === "") {
          formatAppLog("log", "at pages/bindIdCard/bindIdCard.vue:67", "111");
          uni.showModal({
            title: "密码错误"
          });
        } else if (this.password.length != 6) {
          uni.showToast({
            title: "密码错误"
          });
        } else {
          let res = /^[0-9]{6}$/;
          if (res.test(this.password)) {
            let that = this;
            uni.getStorage({
              key: "token",
              success(res2) {
                let _token = res2.data;
                uni.request({
                  url: "https://120.55.37.93/register/verifyCardAndIdentity",
                  method: "POST",
                  header: {
                    "token": _token
                  },
                  data: {
                    "cardNumber": that.ID_card,
                    "password": that.password
                  },
                  success(data) {
                    formatAppLog("log", "at pages/bindIdCard/bindIdCard.vue:94", data);
                    uni.navigateTo({
                      url: "/pages/phoneNumber/phoneNumber"
                    });
                  }
                  // fail(error){
                  // 	__f__('log','at pages/bindIdCard/bindIdCard.vue:100',error)
                  // }
                });
              }
            });
          } else {
            uni.showModal({
              title: "请输入六位数字密码"
            });
            this.password = "";
          }
        }
      },
      showkey1() {
        if (this.show2) {
          this.show2 = false;
        }
        this.show1 = true;
      },
      showkey2() {
        if (this.show1) {
          this.show1 = false;
        }
        this.show2 = true;
      },
      valchange(val) {
        this.ID_card += val;
      },
      backspace() {
        if (this.ID_card.length)
          this.ID_card = this.ID_card.substr(0, this.ID_card.length - 1);
      },
      Clickclose() {
        this.show1 = false;
      },
      clickconfirm() {
        this.show1 = false;
      },
      valchange1(val) {
        this.password += val;
      },
      backspace1() {
        if (this.password.length)
          this.password = this.password.substr(0, this.password.length - 1);
      },
      Clickclose1() {
        this.show2 = false;
      },
      clickconfirm1() {
        this.show2 = false;
      },
      cancel() {
        this.$refs.Upicker.close();
      },
      confirm(index2) {
        this.institute = String(index2.value);
        this.$refs.Upicker.close();
      },
      bankclick() {
        this.$refs.Upicker.open();
        uni.hideKeyboard();
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_picker = resolveEasycom(vue.resolveDynamicComponent("uv-picker"), __easycom_0$7);
    const _component_u_keyboard = vue.resolveComponent("u-keyboard");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "info" }, " 绑定银行卡 "),
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          class: "kahao",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.showkey1 && $options.showkey1(...args)),
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.ID_card = $event),
          maxlength: "19",
          placeholder: "请输入银行卡号"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $data.ID_card]
      ]),
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          class: "yhang",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.bankclick && $options.bankclick(...args)),
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.institute = $event),
          maxlength: "10",
          placeholder: "请选择银行"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $data.institute]
      ]),
      vue.createVNode(_component_uv_picker, {
        ref: "Upicker",
        columns: $data.columns,
        onCancel: $options.cancel,
        onConfirm: $options.confirm
      }, null, 8, ["columns", "onCancel", "onConfirm"]),
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          class: "mima",
          onClick: _cache[4] || (_cache[4] = (...args) => $options.showkey2 && $options.showkey2(...args)),
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.password = $event),
          type: "password",
          maxlength: "6",
          placeholder: "请输入取款密码"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $data.password]
      ]),
      vue.createElementVNode("view", { class: "zhichi" }, " 1.支持中行借记卡、信用卡。 2.他行卡，目前只支持工商银行、农业银行、建设银行、交通银行、邮储银行。 3.自助注册手机银行对外转账日限题20000元人民币，您可以前往中行网点柜台解除。 "),
      vue.createElementVNode("button", {
        class: "xbu",
        onClick: _cache[6] || (_cache[6] = (...args) => $options.clickcheck && $options.clickcheck(...args))
      }, "下一步"),
      vue.createVNode(_component_u_keyboard, {
        ref: "uKeyboard",
        mode: "number",
        onChange: $options.valchange,
        onBackspace: $options.backspace,
        show: $data.show1,
        onCancel: $options.Clickclose,
        onConfirm: $options.clickconfirm,
        dotDisabled: "",
        overlay: false
      }, null, 8, ["onChange", "onBackspace", "show", "onCancel", "onConfirm"]),
      vue.createVNode(_component_u_keyboard, {
        ref: "uKeyboard",
        mode: "number",
        onChange: $options.valchange1,
        onBackspace: $options.backspace1,
        show: $data.show2,
        onCancel: $options.Clickclose1,
        onConfirm: $options.clickconfirm1,
        dotDisabled: "",
        overlay: false
      }, null, 8, ["onChange", "onBackspace", "show", "onCancel", "onConfirm"])
    ]);
  }
  const PagesBindIdCardBindIdCard = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__file", "E:/BankSystem/user/pages/bindIdCard/bindIdCard.vue"]]);
  const _sfc_main$g = {
    data() {
      return {
        show: false,
        showpick: false,
        ifchecked: false,
        tt: false,
        surname: "",
        name: "",
        ID: "",
        ID_type: "请选择证件类型",
        test: "",
        columns: [
          ["居民身份证", "护照", "港澳通行证"]
        ]
      };
    },
    methods: {
      clickNUM: function(event) {
        let that = this;
        if (this.ifchecked) {
          uni.getStorage({
            key: "token",
            success(res) {
              let _token = res.data;
              uni.request({
                url: "https://120.55.37.93/register/identityVerification",
                method: "POST",
                header: {
                  "token": _token
                },
                data: {
                  "surname": that.surname,
                  "name": that.name,
                  "identityCard": that.ID
                },
                success(data) {
                  formatAppLog("log", "at pages/idVerification/idVerification.vue:82", data);
                  if (data.data.code == 200) {
                    uni.navigateTo({
                      url: "/pages/bindIdCard/bindIdCard",
                      success: function(res2) {
                      }
                    });
                  }
                }
              });
            }
          });
        } else {
          uni.showModal({
            title: "请同意相关协议"
          });
        }
        if (this.surname.trim() === "") {
          uni.showModal({
            title: "姓不能为空"
          });
        }
        if (this.name.trim() === "") {
          uni.showToast({
            title: "名不能为空"
          });
        }
        if (this.ID_type == "请选择证件类型") {
          uni.showToast({
            title: "请选择证件类型"
          });
        }
        var p2 = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (p2.test(this.ID)) {
          let reg = /^([\u4e00-\u9fa5]{2,20}|[a-zA-Z.\s]{2,20})$/;
          var arr = [this.surname, this.name];
          this.test = arr.join("");
          if (!reg.test(this.test)) {
            uni.showToast({
              title: "姓名不正确"
            });
          }
        } else {
          uni.showModal({
            title: "身份证错误"
          });
        }
      },
      clickbuttom() {
        this.$refs.picker.open();
        uni.hideKeyboard();
      },
      handleChange(e2) {
        if (this.ifchecked) {
          this.ifchecked = false;
        } else {
          this.ifchecked = true;
        }
      },
      showkey() {
        this.$refs.uKeyboard.open();
      },
      valchange(val) {
        this.ID += val;
      },
      backspace() {
        if (this.ID.length)
          this.ID = this.ID.substr(0, this.ID.length - 1);
        formatAppLog("log", "at pages/idVerification/idVerification.vue:156", this.ID);
      },
      Clickclose() {
        this.show = false;
      },
      clickconfirm() {
        this.show = false;
      },
      cancel() {
        this.showpick = false;
      },
      confirm(index2) {
        this.ID_type = String(index2.value);
        this.showpick = false;
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_picker = resolveEasycom(vue.resolveDynamicComponent("uv-picker"), __easycom_0$7);
    const _component_uv_keyboard = resolveEasycom(vue.resolveDynamicComponent("uv-keyboard"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "title" }, [
      vue.createElementVNode("view", { class: "info" }, " 填写身份信息 "),
      vue.createElementVNode("view", { class: "tixin" }, " 您已成功注册手机银行，填写身份信息绑定银行卡，畅享更多服务 "),
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          class: "xing",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.surname = $event),
          maxlength: "10",
          placeholder: "请输入姓"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $data.surname]
      ]),
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          class: "ming",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.name = $event),
          maxlength: "10",
          placeholder: "请输入名"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $data.name]
      ]),
      vue.createElementVNode("view", null, [
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "idtype",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.clickbuttom && $options.clickbuttom(...args)),
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.ID_type = $event),
            placeholder: "请输入证件类型"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.ID_type]
        ]),
        vue.createVNode(_component_uv_picker, {
          ref: "picker",
          columns: $data.columns,
          onCancel: $options.cancel,
          onConfirm: $options.confirm,
          onChange: _ctx.change
        }, null, 8, ["columns", "onCancel", "onConfirm", "onChange"])
      ]),
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          class: "sfz",
          onClick: _cache[4] || (_cache[4] = (...args) => $options.showkey && $options.showkey(...args)),
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.ID = $event),
          maxlength: "19",
          placeholder: "请输入证件号码"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $data.ID]
      ]),
      vue.createElementVNode("view", { class: "uni-list" }, [
        vue.createElementVNode(
          "checkbox-group",
          {
            onChange: _cache[6] || (_cache[6] = (...args) => $options.handleChange && $options.handleChange(...args))
          },
          [
            vue.createElementVNode("checkbox", { class: "checkbox-3" }, [
              vue.createElementVNode("text", { class: "tonyi" }, " 本人(客户)已仔细阅读并理解《中国银行股份有限公司手机银行服务协议》《中国银行股份有限公司个人电子限行风险提示》完全同意和接受协议书全部欧和内容，愿融腊行和承担该协议书中约定的权利和义务。 ")
            ])
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ]),
      vue.createElementVNode("button", {
        class: "xbu",
        onClick: _cache[7] || (_cache[7] = (...args) => $options.clickNUM && $options.clickNUM(...args))
      }, "下一步"),
      vue.createVNode(_component_uv_keyboard, {
        ref: "uKeyboard",
        mode: "card",
        onChange: $options.valchange,
        onBackspace: $options.backspace,
        onCancel: $options.Clickclose,
        onConfirm: $options.clickconfirm,
        dotDisabled: "",
        overlay: false
      }, null, 8, ["onChange", "onBackspace", "onCancel", "onConfirm"])
    ]);
  }
  const PagesIdVerificationIdVerification = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__file", "E:/BankSystem/user/pages/idVerification/idVerification.vue"]]);
  const _sfc_main$f = {
    data() {
      return {
        newPhone: "aaaa",
        // 当前显示电话
        isReget: true,
        // 判断是否显示 ‘重新获取’按钮    
        timer: null,
        // 定时器
        count: 0,
        // 时间
        code: "",
        // 验证码  
        focus: true,
        // 焦点
        isCode: true,
        // ‘确定’按钮是否禁用
        suecurityphone: "",
        show1: false
      };
    },
    onLoad(e2) {
      let that = this;
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on("setData", function(data) {
        let num = String(data);
        that.suecurityphone = num.substring(0, 3) + "****" + num.substring(7, 11);
        that.newPhone = String(data);
      });
    },
    watch: {
      count(val) {
        if (val == 0) {
          this.isReget = true;
          clearInterval(this.timer);
        }
      }
    },
    methods: {
      /**
      * DESC: 定时器  
      * */
      getTimer() {
        this.timer = setInterval(() => {
          if (this.count == 0) {
            clearInterval(this.timer);
            uni.navigateBack({ delta: 1 });
            return;
          }
          this.count--;
        }, 1e3);
      },
      /**
       * DESC: 获取验证码   
       * */
      getCode() {
        let that = this;
        formatAppLog("log", "at pages/phoneCode/phoneCode.vue:100", "获取验证码", this.newPhone);
        this.code = "";
        if (this.count == 0) {
          this.count = 60;
          this.isReget = false;
          this.getTimer();
          uni.request({
            url: "https://120.55.37.93/sendsms/nologin?phoneNumber=" + that.newPhone,
            success(data) {
              formatAppLog("log", "at pages/phoneCode/phoneCode.vue:109", data);
              if (data.data.code == 200)
                ;
              else {
                uni.showToast({
                  title: "短信发送失败",
                  icon: "error"
                });
              }
            }
          });
        }
      },
      /**
       * DESC: 输入框输入事件 
       * */
      codeNumInputFun(e2) {
        let val = e2.detail.value;
        if (val.length == "6")
          this.isCode = false;
        else
          this.isCode = true;
      },
      /**
       * DESC: 输入框失去焦点事件 
       * */
      codeNumBlurFun(e2) {
        let val = e2.detail.value;
        formatAppLog("log", "at pages/phoneCode/phoneCode.vue:137", val);
        this.focus = false;
        if (this.code.length == "6") {
          this.isCode = false;
        } else
          this.isCode = true;
      },
      /**
       * DESC: 输入框点击事件
       * @param {Number} index 当前点击框索引
       * */
      codefocusFun(index2) {
        this.focus = true;
        this.$refs.uKeyboard.open();
      },
      /**
      * DESC: 按钮点击事件
      * */
      submitFun() {
        let that = this;
        uni.getStorage({
          key: "token",
          success(res) {
            let _token = res.data;
            uni.request({
              url: "https://120.55.37.93/register/bindBankCardForIdentity",
              method: "POST",
              header: {
                "token": _token
              },
              data: {
                "phoneNumber": that.newPhone,
                "verifyCode": that.code
              },
              success(data) {
                formatAppLog("log", "at pages/phoneCode/phoneCode.vue:174", data);
                if (data.data.code == 200) {
                  uni.switchTab({
                    url: "/pages/home/home"
                  });
                } else if (data.data.code == 7) {
                  uni.showModal({
                    title: "手机号与银行预留手机号不符,如果已更换手机号请持相关证件到柜台办理"
                  });
                }
              }
            });
          }
        });
      },
      showkey1() {
        this.$refs.uKeyboard.open();
      },
      valchange(val) {
        if (this.code.length <= 5) {
          this.code += val;
        }
        formatAppLog("log", "at pages/phoneCode/phoneCode.vue:199", 1);
        if (this.code.length == "6")
          this.isCode = false;
        else
          this.isCode = true;
      },
      backspace() {
        if (this.code.length)
          this.code = this.code.substr(0, this.code.length - 1);
        if (this.code.length != 6)
          this.isCode = true;
      },
      Clickclose() {
        this.$refs.uKeyboard.close();
      },
      clickconfirm() {
        this.$refs.uKeyboard.close();
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_keyboard = resolveEasycom(vue.resolveDynamicComponent("uv-keyboard"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "phone_code" }, [
      vue.createElementVNode("text", { class: "phone_code_label" }, "发送验证码"),
      vue.createElementVNode("view", { class: "phone_code_count" }, [
        vue.createElementVNode(
          "text",
          { class: "phone_code_count_new" },
          vue.toDisplayString($data.suecurityphone),
          1
          /* TEXT */
        ),
        $data.isReget ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "phone_code_count_reget"
        }, [
          vue.createElementVNode("button", {
            plain: "true",
            type: "warn",
            size: "mini",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.getCode && $options.getCode(...args))
          }, "获取验证码")
        ])) : (vue.openBlock(), vue.createElementBlock("text", {
          key: 1,
          class: "phone_code_count_down"
        }, [
          vue.createTextVNode("获取验证码"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($data.count),
            1
            /* TEXT */
          ),
          vue.createTextVNode("s")
        ]))
      ]),
      vue.createElementVNode("view", { class: "phone_code_single" }, [
        vue.withDirectives(vue.createElementVNode("input", {
          class: "phone_code_single_cinput",
          "adjust-position": "false",
          "auto-blur": "true",
          onBlur: _cache[1] || (_cache[1] = (...args) => $options.codeNumBlurFun && $options.codeNumBlurFun(...args)),
          onInput: _cache[2] || (_cache[2] = (...args) => $options.codeNumInputFun && $options.codeNumInputFun(...args)),
          focus: $data.focus,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.code = $event),
          type: "number",
          maxlength: "6"
        }, null, 40, ["focus"]), [
          [vue.vModelText, $data.code]
        ]),
        vue.createElementVNode("view", { class: "phone_code_single_codeinput" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(6, (item, index2) => {
              return vue.createElementVNode("view", {
                key: index2,
                onClick: ($event) => $options.codefocusFun(index2),
                style: vue.normalizeStyle(index2 == $data.code.length ? "background-color:#FEF2F2;" : "color: #313131;background-color:#eee")
              }, vue.toDisplayString($data.code[index2]), 13, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode("button", {
        disabled: $data.isCode,
        class: "btn",
        type: "warn",
        onClick: _cache[4] || (_cache[4] = ($event) => $options.submitFun())
      }, "确定", 8, ["disabled"]),
      vue.createVNode(_component_uv_keyboard, {
        ref: "uKeyboard",
        mode: "number",
        onChange: $options.valchange,
        onBackspace: $options.backspace,
        onCancel: $options.Clickclose,
        onConfirm: $options.clickconfirm,
        dotDisabled: "",
        overlay: false
      }, null, 8, ["onChange", "onBackspace", "onCancel", "onConfirm"])
    ]);
  }
  const PagesPhoneCodePhoneCode = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-058e95be"], ["__file", "E:/BankSystem/user/pages/phoneCode/phoneCode.vue"]]);
  const _sfc_main$e = {
    data() {
      return {
        phoneNUmber: "",
        xianshi: false,
        xiansi: false,
        ifchecked: false,
        refresh: false
      };
    },
    methods: {
      clickNUM() {
        let that = this;
        if (this.phoneNUmber.length === 11 && this.ifchecked) {
          uni.navigateTo({
            url: "/pages/phoneCode/phoneCode",
            success: function(res) {
              res.eventChannel.emit("setData", that.phoneNUmber);
            }
          });
        } else {
          if (this.ifchecked) {
            uni.showModal({
              title: "请输入正确的手机号"
            });
          } else {
            uni.showModal({
              title: "请同意相关协议"
            });
          }
        }
      },
      shishi() {
        const phoneReg = /^[1][3-9]\d{9}$/;
        const inputValue = this.phoneNUmber;
        const isPhoneValid = phoneReg.test(inputValue);
        if (isPhoneValid) {
          this.xiansi = false;
          formatAppLog("log", "at pages/phoneNumber/phoneNumber.vue:81", "1");
        } else {
          this.xiansi = true;
          formatAppLog("log", "at pages/phoneNumber/phoneNumber.vue:85", "2");
        }
      },
      handleChange(e2) {
        if (this.ifchecked) {
          this.ifchecked = false;
        } else {
          this.ifchecked = true;
        }
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "info" }, " 手机号码验证 "),
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          class: "phone",
          onInput: _cache[0] || (_cache[0] = (...args) => $options.shishi && $options.shishi(...args)),
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.phoneNUmber = $event),
          maxlength: "11",
          placeholder: "手机号(中国内地)"
        },
        null,
        544
        /* HYDRATE_EVENTS, NEED_PATCH */
      ), [
        [vue.vModelText, $data.phoneNUmber]
      ]),
      $data.xiansi ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "xiansi"
      }, "请输入正确的手机号")) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("button", {
        class: "xb",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.clickNUM && $options.clickNUM(...args))
      }, "下一步"),
      vue.createElementVNode("view", { class: "uni-list" }, [
        vue.createElementVNode(
          "checkbox-group",
          {
            onChange: _cache[3] || (_cache[3] = (...args) => $options.handleChange && $options.handleChange(...args))
          },
          [
            vue.createElementVNode("checkbox", { class: "checkbox-3" }, [
              vue.createElementVNode("text", { class: "tonyi" }, " 我已阅读并接受《用户服务协议》《隐私政策》 ")
            ])
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ])
    ]);
  }
  const PagesPhoneNumberPhoneNumber = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__file", "E:/BankSystem/user/pages/phoneNumber/phoneNumber.vue"]]);
  const _sfc_main$d = {
    data() {
      return {
        fla: false,
        value1: "",
        value2: ""
      };
    },
    methods: {
      clickSetpassword: function(e2) {
        if (this.value1 === this.value2) {
          let res = /^[0-9]{6}$/;
          if (res.test(this.value1)) {
            this.fla = false;
          } else {
            uni.showModal({
              title: "请输入六位数字密码"
            });
          }
        } else {
          this.value1 = "";
          this.value2 = "";
          this.fla = true;
        }
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "wangji" }, "忘记密码后，您可以重新设置支付密码"),
      vue.createElementVNode("view", { class: "zhifumima" }, "支付密码由 6位数字 组成"),
      vue.createElementVNode("view", { class: "zhimi" }, [
        vue.createElementVNode("text", { class: "textzhimi" }, "支付密码"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "zimi",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.value1 = $event),
            maxlength: "6",
            type: "password",
            placeholder: "请输入六位支付密码"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.value1]
        ]),
        vue.createElementVNode("text", { class: "textquemi" }, "确认密码"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "quemi",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.value2 = $event),
            maxlength: "6",
            type: "password",
            placeholder: "请输入六位确认密码"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.value2]
        ])
      ]),
      $data.fla ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "wrong"
      }, "密码输入不一致，请重新输入")) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("button", {
        class: "xbu",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.clickSetpassword && $options.clickSetpassword(...args))
      }, "下一步"),
      vue.createCommentVNode(' <input v-model="codenum"/>\r\n		<view class="codenumber">\r\n			<u-button \r\n			type="error"\r\n			:plain="true"\r\n			size="medium">获取验证码</u-button>\r\n		</view> ')
    ]);
  }
  const PagesResetPasswordResetPassword = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__file", "E:/BankSystem/user/pages/resetPassword/resetPassword.vue"]]);
  const _sfc_main$c = {
    data() {
      return {
        phoneTail: "",
        model1: {
          userInfo: {
            num: "",
            name: "",
            ename: "",
            cardType: "",
            cardNumber: "",
            country: "",
            nation: "",
            sex: "",
            bornTime: "",
            bornPlace: ""
          },
          cardInfo: {
            country: "",
            region: "",
            detailAddress: ""
          },
          addressInfo: {
            country: "",
            region: "",
            detailAddress: "",
            zipCode: ""
          },
          workInfo: {
            profession: "",
            workPlaceName: "",
            schoolName: "",
            sector: "",
            salaryInterval: ""
          },
          phonenumber: ""
        },
        codeTips: "",
        rule1: {
          "userInfo.num": {
            tpye: "number",
            required: true,
            trigger: ["change"]
          },
          "userInfo.name": {
            tpye: "string",
            required: true,
            trigger: ["change"],
            message: "姓名不能为空"
          }
        },
        actions: [
          {
            name: "男"
          },
          {
            name: "女"
          },
          {
            name: "其他"
          }
        ]
      };
    },
    computed: {},
    onReady() {
      this.$refs.form1.setRules(this.rule1);
      let that = this;
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on("newpersonalInformation", (data) => {
        formatAppLog("log", "at pages/confirmModifyPersonalInformation/confirmModifyPersonalInformation.vue:179", data);
        that.model1.userInfo.num = data.num;
        that.model1.userInfo.name = data.name;
        that.model1.userInfo.ename = data.ename;
        that.model1.userInfo.cardNumber = data.cardNumber;
        that.model1.userInfo.nation = data.nation;
        that.model1.userInfo.sex = data.sex;
        that.model1.userInfo.bornTime = data.bornTime;
        that.model1.userInfo.bornPlace = data.bornPlace;
        that.model1.addressInfo.region = data.region;
        that.model1.addressInfo.detailAddress = data.detailAddress;
        that.model1.addressInfo.zipCode = data.zipCode;
        that.model1.workInfo.profession = data.profession;
        that.model1.workInfo.workPlaceName = data.workPlaceName;
        that.model1.workInfo.sector = data.sector;
        that.model1.workInfo.salaryInterval = data.salaryInterval;
        that.model1.phonenumber = data.phonenumber;
      });
    },
    methods: {
      // 性别选择
      showSexSelect() {
        this.$refs.sexSelect.open();
      },
      sexSelect(e2) {
        this.model1.userInfo.sex = e2.name;
        this.$refs.form1.validateField("userInfo.sex");
      },
      close() {
        formatAppLog("log", "at pages/confirmModifyPersonalInformation/confirmModifyPersonalInformation.vue:211", "关闭");
      },
      confirmModify() {
        this.$refs.popup.open();
      },
      codeInputFinish(e2) {
        let that = this;
        uni.getStorage({
          key: "token",
          success: function(res) {
            let _token = res.data;
            uni.showLoading({
              title: "",
              mask: true
            });
            uni.request({
              url: "https://120.55.37.93/edit/customerInfo",
              method: "POST",
              header: {
                "token": _token
              },
              data: {
                "pojo": {
                  "nationality": that.model1.userInfo.nation,
                  "dateOfBirth": that.model1.userInfo.bornTime,
                  "placeOfBirth": that.model1.userInfo.bornPlace,
                  "provincesCity": that.model1.addressInfo.region,
                  "detailedAddress": that.model1.addressInfo.detailAddress,
                  "postalCode": that.model1.addressInfo.zipCode,
                  "profession": that.model1.workInfo.profession,
                  "workOfUnit": that.model1.workInfo.workPlaceName,
                  "industryOfTheOrganization": that.model1.workInfo.sector,
                  "incomeRange": that.model1.workInfo.salaryInterval
                },
                "verifyCode": String(e2)
              },
              success: function(res2) {
                uni.hideLoading();
                formatAppLog("log", "at pages/confirmModifyPersonalInformation/confirmModifyPersonalInformation.vue:251", res2);
                if (res2.data.code == 200) {
                  formatAppLog("log", "at pages/confirmModifyPersonalInformation/confirmModifyPersonalInformation.vue:253", 1111111);
                  uni.navigateTo({
                    url: "/pages/modifyPersonalInformationResult/modifyPersonalInformationResult",
                    success: function(res3) {
                      res3.eventChannel.emit("newnewpersonalInformation", {
                        "num": that.model1.userInfo.num,
                        "name": that.model1.userInfo.name,
                        "ename": that.model1.userInfo.ename,
                        "cardNumber": that.model1.userInfo.cardNumber,
                        "nation": that.model1.userInfo.nation,
                        "sex": that.model1.userInfo.sex,
                        "bornTime": that.model1.userInfo.bornTime,
                        "bornPlace": that.model1.userInfo.bornPlace,
                        "region": that.model1.addressInfo.region,
                        "detailAddress": that.model1.addressInfo.detailAddress,
                        "zipCode": that.model1.addressInfo.zipCode,
                        "profession": that.model1.workInfo.profession,
                        "workPlaceName": that.model1.workInfo.workPlaceName,
                        "sector": that.model1.workInfo.sector,
                        "salaryInterval": that.model1.workInfo.salaryInterval,
                        "phonenumber": that.model1.phonenumber
                      });
                    }
                  });
                }
              },
              fail: function(error2) {
                uni.hideLoading();
                uni.showToast({
                  title: "错误，稍后再试",
                  icon: "error",
                  duration: 2e3
                });
              }
            });
          }
        });
      },
      getCode() {
        if (this.$refs.uCode.canGetCode) {
          let that = this;
          uni.getStorage({
            key: "token",
            success: function(res) {
              let _token = res.data;
              uni.showLoading({
                title: "正在获取验证码",
                mask: true
              });
              uni.request({
                url: "http://x38h8d.natappfree.cc/sendsms/login",
                method: "GET",
                header: {
                  "token": _token
                },
                success: function(res2) {
                  uni.hideLoading();
                  that.$refs.uCode.start();
                },
                fail: function(error2) {
                  uni.hideLoading();
                }
              });
            }
          });
          this.$refs.uCode.start();
        } else {
          this.$u.toast("倒计时结束后再发送");
        }
      },
      codeChange(text) {
        this.codeTips = text;
      }
    },
    onLoad() {
      let temp = "";
      temp = uni.getStorageSync("userName");
      temp = temp.slice(-4);
      this.phoneTail = temp;
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0$d);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1$b);
    const _component_uv_action_sheet = resolveEasycom(vue.resolveDynamicComponent("uv-action-sheet"), __easycom_2);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_2$6);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_4$2);
    const _component_uv_code_input = resolveEasycom(vue.resolveDynamicComponent("uv-code-input"), __easycom_5);
    const _component_uv_code = resolveEasycom(vue.resolveDynamicComponent("uv-code"), __easycom_6$1);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_7);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx" } }, [
          vue.createElementVNode("text", null, "基本信息"),
          vue.createVNode(_component_uv_form, {
            model: $data.model1,
            rules: $data.rule1,
            ref: "form1",
            style: { "background": "white", "margin-right": "20rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_form_item, {
                label: "电子银行客户序号",
                "label-width": "150rpx",
                prop: "userInfo.number",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.num,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.model1.userInfo.num = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "姓名",
                "label-width": "150rpx",
                prop: "userInfo.name",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.name,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.model1.userInfo.name = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "英文/拼音姓名",
                "label-width": "150rpx",
                prop: "userInfo.ename",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.ename,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.model1.userInfo.ename = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "证件号码",
                "label-width": "150rpx",
                prop: "userInfo.cardNumber",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.cardNumber,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.model1.userInfo.cardNumber = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "民族",
                "label-width": "150rpx",
                prop: "userInfo.nation",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.nation,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.model1.userInfo.nation = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "性别",
                "label-width": "150rpx",
                prop: "userInfo.sex",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.sex,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.model1.userInfo.sex = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true,
                    onClick: $options.showSexSelect
                  }, null, 8, ["modelValue", "onClick"]),
                  vue.createVNode(_component_uv_action_sheet, {
                    ref: "sexSelect",
                    actions: $data.actions,
                    title: "请选择性别",
                    onSelect: $options.sexSelect,
                    onClose: $options.close
                  }, null, 8, ["actions", "onSelect", "onClose"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "出生日期",
                "label-width": "150rpx",
                prop: "userInfo.bornTime",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.bornTime,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.model1.userInfo.bornTime = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "出生地",
                "label-width": "150rpx",
                prop: "userInfo.bornPlace",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.userInfo.bornPlace,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.model1.userInfo.bornPlace = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ]),
        vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx" } }, [
          vue.createElementVNode("text", null, "本人常住地址信息"),
          vue.createVNode(_component_uv_form, {
            model: $data.model1,
            rules: $data.rule1,
            ref: "form3",
            style: { "background": "white", "margin-right": "20rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_form_item, {
                label: "省/市/区",
                "label-width": "150rpx",
                prop: "addressInfo.region",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.addressInfo.region,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.model1.addressInfo.region = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "详细地址",
                "label-width": "150rpx",
                prop: "addressInfo.detailAddress",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.addressInfo.detailAddress,
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.model1.addressInfo.detailAddress = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "邮编",
                "label-width": "150rpx",
                prop: "addressInfo.zipCode",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.addressInfo.zipCode,
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.model1.addressInfo.zipCode = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ]),
        vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx" } }, [
          vue.createElementVNode("text", null, "工作信息"),
          vue.createVNode(_component_uv_form, {
            model: $data.model1,
            rules: $data.rule1,
            ref: "form4",
            style: { "background": "white", "margin-right": "20rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_form_item, {
                label: "职业",
                "label-width": "150rpx",
                prop: "workInfo.profession",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.workInfo.profession,
                    "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.model1.workInfo.profession = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "工作单位名称",
                "label-width": "150rpx",
                prop: "workInfo.workPlaceName",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.workInfo.workPlaceName,
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.model1.workInfo.workPlaceName = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "单位所属行业",
                "label-width": "150rpx",
                prop: "workInfo.sector",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.workInfo.sector,
                    "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $data.model1.workInfo.sector = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uv_form_item, {
                label: "个人月收入区间",
                "label-width": "150rpx",
                prop: "workInfo.salaryInterval",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.workInfo.salaryInterval,
                    "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $data.model1.workInfo.salaryInterval = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ]),
        vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx" } }, [
          vue.createElementVNode("text", null, "联系信息"),
          vue.createVNode(_component_uv_form, {
            model: $data.model1,
            rules: $data.rule1,
            ref: "form5",
            style: { "background": "white", "margin-right": "20rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_form_item, {
                label: "手机号码",
                "label-width": "150rpx",
                prop: "phonenumber",
                borderBottom: true
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.phonenumber,
                    "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $data.model1.phonenumber = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                    readonly: true
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ]),
        vue.createElementVNode("view", null, [
          vue.createElementVNode("button", {
            style: { "color": "white", "background-color": "blue" },
            onClick: _cache[16] || (_cache[16] = (...args) => $options.confirmModify && $options.confirmModify(...args))
          }, "确认")
        ]),
        vue.createVNode(
          _component_uni_popup,
          {
            ref: "popup",
            type: "center",
            isMaskClick: false
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-end", "background-color": "#FFFFFF" } }, [
                vue.createVNode(_component_uv_icon, {
                  name: "close",
                  size: "14",
                  style: { "margin-right": "5rpx" },
                  onClick: _cache[17] || (_cache[17] = ($event) => this.$refs.popup.close())
                })
              ]),
              vue.createElementVNode("view", { style: { "width": "600rpx", "height": "350rpx", "display": "flex", "flex-direction": "column", "align-items": "center", "background-color": "#FFFFFF" } }, [
                vue.createElementVNode("view", null, "手机交易码"),
                vue.createVNode(_component_uv_line, { margin: "10rpx" }),
                vue.createElementVNode(
                  "view",
                  { style: { "margin-top": "20rpx" } },
                  "正在向尾号" + vue.toDisplayString($data.phoneTail) + "的手机发送验证码",
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_uv_code_input, {
                  mode: "line",
                  size: "28",
                  onFinish: $options.codeInputFinish,
                  style: { "margin-top": "40rpx" }
                }, null, 8, ["onFinish"]),
                vue.createVNode(_component_uv_code, {
                  ref: "uCode",
                  onChange: $options.codeChange,
                  seconds: "60"
                }, null, 8, ["onChange"]),
                vue.createElementVNode(
                  "button",
                  {
                    onClick: _cache[18] || (_cache[18] = (...args) => $options.getCode && $options.getCode(...args)),
                    style: { "border-radius": "10rpx", "width": "300rpx", "height": "60rpx", "font-size": "0.8em", "margin-top": "40rpx", "background-color": "red", "color": "#FFFFFF" }
                  },
                  vue.toDisplayString($data.codeTips),
                  1
                  /* TEXT */
                )
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesConfirmModifyPersonalInformationConfirmModifyPersonalInformation = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__file", "E:/BankSystem/user/pages/confirmModifyPersonalInformation/confirmModifyPersonalInformation.vue"]]);
  function o(o2) {
    this.mode = r.MODE_8BIT_BYTE, this.data = o2;
  }
  function e(o2, e2) {
    this.typeNumber = o2, this.errorCorrectLevel = e2, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = new Array();
  }
  o.prototype = { getLength: function(o2) {
    return this.data.length;
  }, write: function(o2) {
    for (var e2 = 0; e2 < this.data.length; e2++)
      o2.put(this.data.charCodeAt(e2), 8);
  } }, e.prototype = { addData: function(e2) {
    var r2 = new o(e2);
    this.dataList.push(r2), this.dataCache = null;
  }, isDark: function(o2, e2) {
    if (o2 < 0 || this.moduleCount <= o2 || e2 < 0 || this.moduleCount <= e2)
      throw new Error(o2 + "," + e2);
    return this.modules[o2][e2];
  }, getModuleCount: function() {
    return this.moduleCount;
  }, make: function() {
    if (this.typeNumber < 1) {
      var o2 = 1;
      for (o2 = 1; o2 < 40; o2++) {
        for (var e2 = v.getRSBlocks(o2, this.errorCorrectLevel), r2 = new p(), t2 = 0, i2 = 0; i2 < e2.length; i2++)
          t2 += e2[i2].dataCount;
        for (i2 = 0; i2 < this.dataList.length; i2++) {
          var n2 = this.dataList[i2];
          r2.put(n2.mode, 4), r2.put(n2.getLength(), h.getLengthInBits(n2.mode, o2)), n2.write(r2);
        }
        if (r2.getLengthInBits() <= 8 * t2)
          break;
      }
      this.typeNumber = o2;
    }
    this.makeImpl(false, this.getBestMaskPattern());
  }, makeImpl: function(o2, r2) {
    this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
    for (var t2 = 0; t2 < this.moduleCount; t2++) {
      this.modules[t2] = new Array(this.moduleCount);
      for (var i2 = 0; i2 < this.moduleCount; i2++)
        this.modules[t2][i2] = null;
    }
    this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(o2, r2), this.typeNumber >= 7 && this.setupTypeNumber(o2), null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, r2);
  }, setupPositionProbePattern: function(o2, e2) {
    for (var r2 = -1; r2 <= 7; r2++)
      if (!(o2 + r2 <= -1 || this.moduleCount <= o2 + r2))
        for (var t2 = -1; t2 <= 7; t2++)
          e2 + t2 <= -1 || this.moduleCount <= e2 + t2 || (this.modules[o2 + r2][e2 + t2] = 0 <= r2 && r2 <= 6 && (0 == t2 || 6 == t2) || 0 <= t2 && t2 <= 6 && (0 == r2 || 6 == r2) || 2 <= r2 && r2 <= 4 && 2 <= t2 && t2 <= 4);
  }, getBestMaskPattern: function() {
    for (var o2 = 0, e2 = 0, r2 = 0; r2 < 8; r2++) {
      this.makeImpl(true, r2);
      var t2 = h.getLostPoint(this);
      (0 == r2 || o2 > t2) && (o2 = t2, e2 = r2);
    }
    return e2;
  }, createMovieClip: function(o2, e2, r2) {
    var t2 = o2.createEmptyMovieClip(e2, r2);
    this.make();
    for (var i2 = 0; i2 < this.modules.length; i2++)
      for (var n2 = 1 * i2, a2 = 0; a2 < this.modules[i2].length; a2++) {
        var d2 = 1 * a2;
        this.modules[i2][a2] && (t2.beginFill(0, 100), t2.moveTo(d2, n2), t2.lineTo(d2 + 1, n2), t2.lineTo(d2 + 1, n2 + 1), t2.lineTo(d2, n2 + 1), t2.endFill());
      }
    return t2;
  }, setupTimingPattern: function() {
    for (var o2 = 8; o2 < this.moduleCount - 8; o2++)
      null == this.modules[o2][6] && (this.modules[o2][6] = o2 % 2 == 0);
    for (var e2 = 8; e2 < this.moduleCount - 8; e2++)
      null == this.modules[6][e2] && (this.modules[6][e2] = e2 % 2 == 0);
  }, setupPositionAdjustPattern: function() {
    for (var o2 = h.getPatternPosition(this.typeNumber), e2 = 0; e2 < o2.length; e2++)
      for (var r2 = 0; r2 < o2.length; r2++) {
        var t2 = o2[e2], i2 = o2[r2];
        if (null == this.modules[t2][i2])
          for (var n2 = -2; n2 <= 2; n2++)
            for (var a2 = -2; a2 <= 2; a2++)
              this.modules[t2 + n2][i2 + a2] = -2 == n2 || 2 == n2 || -2 == a2 || 2 == a2 || 0 == n2 && 0 == a2;
      }
  }, setupTypeNumber: function(o2) {
    for (var e2 = h.getBCHTypeNumber(this.typeNumber), r2 = 0; r2 < 18; r2++) {
      var t2 = !o2 && 1 == (e2 >> r2 & 1);
      this.modules[Math.floor(r2 / 3)][r2 % 3 + this.moduleCount - 8 - 3] = t2;
    }
    for (r2 = 0; r2 < 18; r2++) {
      t2 = !o2 && 1 == (e2 >> r2 & 1);
      this.modules[r2 % 3 + this.moduleCount - 8 - 3][Math.floor(r2 / 3)] = t2;
    }
  }, setupTypeInfo: function(o2, e2) {
    for (var r2 = this.errorCorrectLevel << 3 | e2, t2 = h.getBCHTypeInfo(r2), i2 = 0; i2 < 15; i2++) {
      var n2 = !o2 && 1 == (t2 >> i2 & 1);
      i2 < 6 ? this.modules[i2][8] = n2 : i2 < 8 ? this.modules[i2 + 1][8] = n2 : this.modules[this.moduleCount - 15 + i2][8] = n2;
    }
    for (i2 = 0; i2 < 15; i2++) {
      n2 = !o2 && 1 == (t2 >> i2 & 1);
      i2 < 8 ? this.modules[8][this.moduleCount - i2 - 1] = n2 : i2 < 9 ? this.modules[8][15 - i2 - 1 + 1] = n2 : this.modules[8][15 - i2 - 1] = n2;
    }
    this.modules[this.moduleCount - 8][8] = !o2;
  }, mapData: function(o2, e2) {
    for (var r2 = -1, t2 = this.moduleCount - 1, i2 = 7, n2 = 0, a2 = this.moduleCount - 1; a2 > 0; a2 -= 2)
      for (6 == a2 && a2--; ; ) {
        for (var d2 = 0; d2 < 2; d2++)
          if (null == this.modules[t2][a2 - d2]) {
            var u2 = false;
            n2 < o2.length && (u2 = 1 == (o2[n2] >>> i2 & 1)), h.getMask(e2, t2, a2 - d2) && (u2 = !u2), this.modules[t2][a2 - d2] = u2, -1 == --i2 && (n2++, i2 = 7);
          }
        if ((t2 += r2) < 0 || this.moduleCount <= t2) {
          t2 -= r2, r2 = -r2;
          break;
        }
      }
  } }, e.PAD0 = 236, e.PAD1 = 17, e.createData = function(o2, r2, t2) {
    for (var i2 = v.getRSBlocks(o2, r2), n2 = new p(), a2 = 0; a2 < t2.length; a2++) {
      var d2 = t2[a2];
      n2.put(d2.mode, 4), n2.put(d2.getLength(), h.getLengthInBits(d2.mode, o2)), d2.write(n2);
    }
    var u2 = 0;
    for (a2 = 0; a2 < i2.length; a2++)
      u2 += i2[a2].dataCount;
    if (n2.getLengthInBits() > 8 * u2)
      throw new Error("code length overflow. (" + n2.getLengthInBits() + ">" + 8 * u2 + ")");
    for (n2.getLengthInBits() + 4 <= 8 * u2 && n2.put(0, 4); n2.getLengthInBits() % 8 != 0; )
      n2.putBit(false);
    for (; !(n2.getLengthInBits() >= 8 * u2 || (n2.put(e.PAD0, 8), n2.getLengthInBits() >= 8 * u2)); )
      n2.put(e.PAD1, 8);
    return e.createBytes(n2, i2);
  }, e.createBytes = function(o2, e2) {
    for (var r2 = 0, t2 = 0, i2 = 0, n2 = new Array(e2.length), a2 = new Array(e2.length), d2 = 0; d2 < e2.length; d2++) {
      var u2 = e2[d2].dataCount, s2 = e2[d2].totalCount - u2;
      t2 = Math.max(t2, u2), i2 = Math.max(i2, s2), n2[d2] = new Array(u2);
      for (var g2 = 0; g2 < n2[d2].length; g2++)
        n2[d2][g2] = 255 & o2.buffer[g2 + r2];
      r2 += u2;
      var l2 = h.getErrorCorrectPolynomial(s2), c2 = new f(n2[d2], l2.getLength() - 1).mod(l2);
      a2[d2] = new Array(l2.getLength() - 1);
      for (g2 = 0; g2 < a2[d2].length; g2++) {
        var m2 = g2 + c2.getLength() - a2[d2].length;
        a2[d2][g2] = m2 >= 0 ? c2.get(m2) : 0;
      }
    }
    var v2 = 0;
    for (g2 = 0; g2 < e2.length; g2++)
      v2 += e2[g2].totalCount;
    var p2 = new Array(v2), C2 = 0;
    for (g2 = 0; g2 < t2; g2++)
      for (d2 = 0; d2 < e2.length; d2++)
        g2 < n2[d2].length && (p2[C2++] = n2[d2][g2]);
    for (g2 = 0; g2 < i2; g2++)
      for (d2 = 0; d2 < e2.length; d2++)
        g2 < a2[d2].length && (p2[C2++] = a2[d2][g2]);
    return p2;
  };
  for (var r = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 }, t = { L: 1, M: 0, Q: 3, H: 2 }, i = 0, n = 1, a = 2, d = 3, u = 4, s = 5, g = 6, l = 7, h = { PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: 1335, G18: 7973, G15_MASK: 21522, getBCHTypeInfo: function(o2) {
    for (var e2 = o2 << 10; h.getBCHDigit(e2) - h.getBCHDigit(h.G15) >= 0; )
      e2 ^= h.G15 << h.getBCHDigit(e2) - h.getBCHDigit(h.G15);
    return (o2 << 10 | e2) ^ h.G15_MASK;
  }, getBCHTypeNumber: function(o2) {
    for (var e2 = o2 << 12; h.getBCHDigit(e2) - h.getBCHDigit(h.G18) >= 0; )
      e2 ^= h.G18 << h.getBCHDigit(e2) - h.getBCHDigit(h.G18);
    return o2 << 12 | e2;
  }, getBCHDigit: function(o2) {
    for (var e2 = 0; 0 != o2; )
      e2++, o2 >>>= 1;
    return e2;
  }, getPatternPosition: function(o2) {
    return h.PATTERN_POSITION_TABLE[o2 - 1];
  }, getMask: function(o2, e2, r2) {
    switch (o2) {
      case i:
        return (e2 + r2) % 2 == 0;
      case n:
        return e2 % 2 == 0;
      case a:
        return r2 % 3 == 0;
      case d:
        return (e2 + r2) % 3 == 0;
      case u:
        return (Math.floor(e2 / 2) + Math.floor(r2 / 3)) % 2 == 0;
      case s:
        return e2 * r2 % 2 + e2 * r2 % 3 == 0;
      case g:
        return (e2 * r2 % 2 + e2 * r2 % 3) % 2 == 0;
      case l:
        return (e2 * r2 % 3 + (e2 + r2) % 2) % 2 == 0;
      default:
        throw new Error("bad maskPattern:" + o2);
    }
  }, getErrorCorrectPolynomial: function(o2) {
    for (var e2 = new f([1], 0), r2 = 0; r2 < o2; r2++)
      e2 = e2.multiply(new f([1, c.gexp(r2)], 0));
    return e2;
  }, getLengthInBits: function(o2, e2) {
    if (1 <= e2 && e2 < 10)
      switch (o2) {
        case r.MODE_NUMBER:
          return 10;
        case r.MODE_ALPHA_NUM:
          return 9;
        case r.MODE_8BIT_BYTE:
        case r.MODE_KANJI:
          return 8;
        default:
          throw new Error("mode:" + o2);
      }
    else if (e2 < 27)
      switch (o2) {
        case r.MODE_NUMBER:
          return 12;
        case r.MODE_ALPHA_NUM:
          return 11;
        case r.MODE_8BIT_BYTE:
          return 16;
        case r.MODE_KANJI:
          return 10;
        default:
          throw new Error("mode:" + o2);
      }
    else {
      if (!(e2 < 41))
        throw new Error("type:" + e2);
      switch (o2) {
        case r.MODE_NUMBER:
          return 14;
        case r.MODE_ALPHA_NUM:
          return 13;
        case r.MODE_8BIT_BYTE:
          return 16;
        case r.MODE_KANJI:
          return 12;
        default:
          throw new Error("mode:" + o2);
      }
    }
  }, getLostPoint: function(o2) {
    for (var e2 = o2.getModuleCount(), r2 = 0, t2 = 0; t2 < e2; t2++)
      for (var i2 = 0; i2 < e2; i2++) {
        for (var n2 = 0, a2 = o2.isDark(t2, i2), d2 = -1; d2 <= 1; d2++)
          if (!(t2 + d2 < 0 || e2 <= t2 + d2))
            for (var u2 = -1; u2 <= 1; u2++)
              i2 + u2 < 0 || e2 <= i2 + u2 || 0 == d2 && 0 == u2 || a2 == o2.isDark(t2 + d2, i2 + u2) && n2++;
        n2 > 5 && (r2 += 3 + n2 - 5);
      }
    for (t2 = 0; t2 < e2 - 1; t2++)
      for (i2 = 0; i2 < e2 - 1; i2++) {
        var s2 = 0;
        o2.isDark(t2, i2) && s2++, o2.isDark(t2 + 1, i2) && s2++, o2.isDark(t2, i2 + 1) && s2++, o2.isDark(t2 + 1, i2 + 1) && s2++, 0 != s2 && 4 != s2 || (r2 += 3);
      }
    for (t2 = 0; t2 < e2; t2++)
      for (i2 = 0; i2 < e2 - 6; i2++)
        o2.isDark(t2, i2) && !o2.isDark(t2, i2 + 1) && o2.isDark(t2, i2 + 2) && o2.isDark(t2, i2 + 3) && o2.isDark(t2, i2 + 4) && !o2.isDark(t2, i2 + 5) && o2.isDark(t2, i2 + 6) && (r2 += 40);
    for (i2 = 0; i2 < e2; i2++)
      for (t2 = 0; t2 < e2 - 6; t2++)
        o2.isDark(t2, i2) && !o2.isDark(t2 + 1, i2) && o2.isDark(t2 + 2, i2) && o2.isDark(t2 + 3, i2) && o2.isDark(t2 + 4, i2) && !o2.isDark(t2 + 5, i2) && o2.isDark(t2 + 6, i2) && (r2 += 40);
    var g2 = 0;
    for (i2 = 0; i2 < e2; i2++)
      for (t2 = 0; t2 < e2; t2++)
        o2.isDark(t2, i2) && g2++;
    return r2 += 10 * (Math.abs(100 * g2 / e2 / e2 - 50) / 5);
  } }, c = { glog: function(o2) {
    if (o2 < 1)
      throw new Error("glog(" + o2 + ")");
    return c.LOG_TABLE[o2];
  }, gexp: function(o2) {
    for (; o2 < 0; )
      o2 += 255;
    for (; o2 >= 256; )
      o2 -= 255;
    return c.EXP_TABLE[o2];
  }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256) }, m = 0; m < 8; m++)
    c.EXP_TABLE[m] = 1 << m;
  for (m = 8; m < 256; m++)
    c.EXP_TABLE[m] = c.EXP_TABLE[m - 4] ^ c.EXP_TABLE[m - 5] ^ c.EXP_TABLE[m - 6] ^ c.EXP_TABLE[m - 8];
  for (m = 0; m < 255; m++)
    c.LOG_TABLE[c.EXP_TABLE[m]] = m;
  function f(o2, e2) {
    if (null == o2.length)
      throw new Error(o2.length + "/" + e2);
    for (var r2 = 0; r2 < o2.length && 0 == o2[r2]; )
      r2++;
    this.num = new Array(o2.length - r2 + e2);
    for (var t2 = 0; t2 < o2.length - r2; t2++)
      this.num[t2] = o2[t2 + r2];
  }
  function v(o2, e2) {
    this.totalCount = o2, this.dataCount = e2;
  }
  function p() {
    this.buffer = new Array(), this.length = 0;
  }
  function C(o2) {
    return o2.setFillStyle = o2.setFillStyle || function(e2) {
      o2.fillStyle = e2;
    }, o2.setFontSize = o2.setFontSize || function(e2) {
      o2.font = `${e2}px`;
    }, o2.setTextAlign = o2.setTextAlign || function(e2) {
      o2.textAlign = e2;
    }, o2.setTextBaseline = o2.setTextBaseline || function(e2) {
      o2.textBaseline = e2;
    }, o2.setGlobalAlpha = o2.setGlobalAlpha || function(e2) {
      o2.globalAlpha = e2;
    }, o2.setStrokeStyle = o2.setStrokeStyle || function(e2) {
      o2.strokeStyle = e2;
    }, o2.setShadow = o2.setShadow || function(e2, r2, t2, i2) {
      o2.shadowOffsetX = e2, o2.shadowOffsetY = r2, o2.shadowBlur = t2, o2.shadowColor = i2;
    }, o2.draw = o2.draw || function(o3, e2) {
      e2 && e2();
    }, o2.clearRect = o2.clearRect || function(e2, r2, t2, i2) {
      o2.draw(false);
    }, o2;
  }
  function b(o2, e2) {
    var r2 = this.data = "", t2 = this.size = 200;
    this.useDynamicSize = false, this.dynamicSize = t2;
    var i2 = this.typeNumber = -1;
    this.errorCorrectLevel = b.errorCorrectLevel.H;
    var n2 = this.margin = 0;
    this.areaColor = "#FFFFFF", this.backgroundColor = "rgba(255,255,255,0)", this.backgroundImageSrc = void 0;
    var a2 = this.backgroundImageWidth = void 0, d2 = this.backgroundImageHeight = void 0, u2 = this.backgroundImageX = void 0, s2 = this.backgroundImageY = void 0;
    this.backgroundImageAlpha = 1, this.backgroundImageBorderRadius = 0;
    var g2 = this.backgroundPadding = 0;
    this.foregroundColor = "#000000", this.foregroundImageSrc = void 0;
    var l2 = this.foregroundImageWidth = void 0, h2 = this.foregroundImageHeight = void 0, c2 = this.foregroundImageX = void 0, m2 = this.foregroundImageY = void 0, f2 = this.foregroundImagePadding = 0;
    this.foregroundImageBackgroundColor = "#FFFFFF";
    var v2 = this.foregroundImageBorderRadius = 0, p2 = this.foregroundImageShadowOffsetX = 0, k = this.foregroundImageShadowOffsetY = 0, y = this.foregroundImageShadowBlur = 0;
    this.foregroundImageShadowColor = "#808080";
    var w = this.foregroundPadding = 0, I = this.positionProbeBackgroundColor = void 0, B = this.positionProbeForegroundColor = void 0, S = this.separatorColor = void 0, P = this.positionAdjustBackgroundColor = void 0, L = this.positionAdjustForegroundColor = void 0, D = this.timingBackgroundColor = void 0, A = this.timingForegroundColor = void 0, E = this.typeNumberBackgroundColor = void 0, T = this.typeNumberForegroundColor = void 0, N = this.darkBlockColor = void 0;
    this.base = void 0, this.modules = [], this.moduleCount = 0, this.drawModules = [];
    var M = this.canvasContext = void 0;
    this.loadImage, this.drawReserve = false, this.isMaked = false, Object.defineProperties(this, { data: { get() {
      if ("" === r2 || void 0 === r2)
        throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", "[uQRCode]: data must be set!"), new b.Error("data must be set!");
      return r2;
    }, set(o3) {
      r2 = String(o3);
    } }, size: { get: () => t2, set(o3) {
      t2 = Number(o3);
    } }, typeNumber: { get: () => i2, set(o3) {
      i2 = Number(o3);
    } }, margin: { get: () => n2, set(o3) {
      n2 = Number(o3);
    } }, backgroundImageWidth: { get() {
      return void 0 === a2 ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * a2 : a2;
    }, set(o3) {
      a2 = Number(o3);
    } }, backgroundImageHeight: { get() {
      return void 0 === d2 ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * d2 : d2;
    }, set(o3) {
      d2 = Number(o3);
    } }, backgroundImageX: { get() {
      return void 0 === u2 ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * u2 : u2;
    }, set(o3) {
      u2 = Number(o3);
    } }, backgroundImageY: { get() {
      return void 0 === s2 ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * s2 : s2;
    }, set(o3) {
      s2 = Number(o3);
    } }, backgroundPadding: { get: () => g2, set(o3) {
      g2 = o3 > 1 ? 1 : o3 < 0 ? 0 : o3;
    } }, foregroundImageWidth: { get() {
      return void 0 === l2 ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * l2 : l2;
    }, set(o3) {
      l2 = Number(o3);
    } }, foregroundImageHeight: { get() {
      return void 0 === h2 ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * h2 : h2;
    }, set(o3) {
      h2 = Number(o3);
    } }, foregroundImageX: { get() {
      return void 0 === c2 ? this.dynamicSize / 2 - this.foregroundImageWidth / 2 : this.useDynamicSize ? this.dynamicSize / this.size * c2 : c2;
    }, set(o3) {
      c2 = Number(o3);
    } }, foregroundImageY: { get() {
      return void 0 === m2 ? this.dynamicSize / 2 - this.foregroundImageHeight / 2 : this.useDynamicSize ? this.dynamicSize / this.size * m2 : m2;
    }, set(o3) {
      m2 = Number(o3);
    } }, foregroundImagePadding: { get() {
      return this.useDynamicSize ? this.dynamicSize / this.size * f2 : f2;
    }, set(o3) {
      f2 = Number(o3);
    } }, foregroundImageBorderRadius: { get() {
      return this.useDynamicSize ? this.dynamicSize / this.size * v2 : v2;
    }, set(o3) {
      v2 = Number(o3);
    } }, foregroundImageShadowOffsetX: { get() {
      return this.useDynamicSize ? this.dynamicSize / this.size * p2 : p2;
    }, set(o3) {
      p2 = Number(o3);
    } }, foregroundImageShadowOffsetY: { get() {
      return this.useDynamicSize ? this.dynamicSize / this.size * k : k;
    }, set(o3) {
      k = Number(o3);
    } }, foregroundImageShadowBlur: { get() {
      return this.useDynamicSize ? this.dynamicSize / this.size * y : y;
    }, set(o3) {
      y = Number(o3);
    } }, foregroundPadding: { get: () => w, set(o3) {
      w = o3 > 1 ? 1 : o3 < 0 ? 0 : o3;
    } }, positionProbeBackgroundColor: { get() {
      return I || this.backgroundColor;
    }, set(o3) {
      I = o3;
    } }, positionProbeForegroundColor: { get() {
      return B || this.foregroundColor;
    }, set(o3) {
      B = o3;
    } }, separatorColor: { get() {
      return S || this.backgroundColor;
    }, set(o3) {
      S = o3;
    } }, positionAdjustBackgroundColor: { get() {
      return P || this.backgroundColor;
    }, set(o3) {
      P = o3;
    } }, positionAdjustForegroundColor: { get() {
      return L || this.foregroundColor;
    }, set(o3) {
      L = o3;
    } }, timingBackgroundColor: { get() {
      return D || this.backgroundColor;
    }, set(o3) {
      D = o3;
    } }, timingForegroundColor: { get() {
      return A || this.foregroundColor;
    }, set(o3) {
      A = o3;
    } }, typeNumberBackgroundColor: { get() {
      return E || this.backgroundColor;
    }, set(o3) {
      E = o3;
    } }, typeNumberForegroundColor: { get() {
      return T || this.foregroundColor;
    }, set(o3) {
      T = o3;
    } }, darkBlockColor: { get() {
      return N || this.foregroundColor;
    }, set(o3) {
      N = o3;
    } }, canvasContext: { get() {
      if (void 0 === M)
        throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", "[uQRCode]: use drawCanvas, you need to set the canvasContext!"), new b.Error("use drawCanvas, you need to set the canvasContext!");
      return M;
    }, set(o3) {
      M = C(o3);
    } } }), b.plugins.forEach((o3) => o3(b, this, false)), o2 && this.setOptions(o2), e2 && (this.canvasContext = C(e2));
  }
  f.prototype = { get: function(o2) {
    return this.num[o2];
  }, getLength: function() {
    return this.num.length;
  }, multiply: function(o2) {
    for (var e2 = new Array(this.getLength() + o2.getLength() - 1), r2 = 0; r2 < this.getLength(); r2++)
      for (var t2 = 0; t2 < o2.getLength(); t2++)
        e2[r2 + t2] ^= c.gexp(c.glog(this.get(r2)) + c.glog(o2.get(t2)));
    return new f(e2, 0);
  }, mod: function(o2) {
    if (this.getLength() - o2.getLength() < 0)
      return this;
    for (var e2 = c.glog(this.get(0)) - c.glog(o2.get(0)), r2 = new Array(this.getLength()), t2 = 0; t2 < this.getLength(); t2++)
      r2[t2] = this.get(t2);
    for (t2 = 0; t2 < o2.getLength(); t2++)
      r2[t2] ^= c.gexp(c.glog(o2.get(t2)) + e2);
    return new f(r2, 0).mod(o2);
  } }, v.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], v.getRSBlocks = function(o2, e2) {
    var r2 = v.getRsBlockTable(o2, e2);
    if (null == r2)
      throw new Error("bad rs block @ typeNumber:" + o2 + "/errorCorrectLevel:" + e2);
    for (var t2 = r2.length / 3, i2 = new Array(), n2 = 0; n2 < t2; n2++)
      for (var a2 = r2[3 * n2 + 0], d2 = r2[3 * n2 + 1], u2 = r2[3 * n2 + 2], s2 = 0; s2 < a2; s2++)
        i2.push(new v(d2, u2));
    return i2;
  }, v.getRsBlockTable = function(o2, e2) {
    switch (e2) {
      case t.L:
        return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 0];
      case t.M:
        return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 1];
      case t.Q:
        return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 2];
      case t.H:
        return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 3];
      default:
        return;
    }
  }, p.prototype = { get: function(o2) {
    var e2 = Math.floor(o2 / 8);
    return 1 == (this.buffer[e2] >>> 7 - o2 % 8 & 1);
  }, put: function(o2, e2) {
    for (var r2 = 0; r2 < e2; r2++)
      this.putBit(1 == (o2 >>> e2 - r2 - 1 & 1));
  }, getLengthInBits: function() {
    return this.length;
  }, putBit: function(o2) {
    var e2 = Math.floor(this.length / 8);
    this.buffer.length <= e2 && this.buffer.push(0), o2 && (this.buffer[e2] |= 128 >>> this.length % 8), this.length++;
  } }, e.errorCorrectLevel = t, b.errorCorrectLevel = e.errorCorrectLevel, b.Error = function(o2) {
    this.errMsg = "[uQRCode]: " + o2;
  }, b.plugins = [], b.use = function(o2) {
    "function" == typeof o2 && b.plugins.push(o2);
  }, b.prototype.loadImage = function(o2) {
    return Promise.resolve(o2);
  }, b.prototype.setOptions = function(o2) {
    var e2, r2, t2, i2, n2, a2, d2, u2, s2, g2, l2, h2, c2, m2, f2, v2, p2, C2, b2, k, y, w, I, B, S, P, L, D, A, E, T, N, M, z, R, _, O, F, x, H, X, Y, j, W, G, K, Q, U, $, J, q, V, Z, oo, eo, ro;
    o2 && (Object.keys(o2).forEach((e3) => {
      this[e3] = o2[e3];
    }), function(o3 = {}, e3 = {}, r3 = false) {
      let t3;
      t3 = r3 ? o3 : { ...o3 };
      for (let o4 in e3) {
        var i3 = e3[o4];
        null != i3 && (i3.constructor == Object ? t3[o4] = this.deepReplace(t3[o4], i3) : i3.constructor != String || i3 ? t3[o4] = i3 : t3[o4] = t3[o4]);
      }
    }(this, { data: o2.data || o2.text, size: o2.size, useDynamicSize: o2.useDynamicSize, typeNumber: o2.typeNumber, errorCorrectLevel: o2.errorCorrectLevel, margin: o2.margin, areaColor: o2.areaColor, backgroundColor: o2.backgroundColor || (null === (e2 = o2.background) || void 0 === e2 ? void 0 : e2.color), backgroundImageSrc: o2.backgroundImageSrc || (null === (r2 = o2.background) || void 0 === r2 || null === (t2 = r2.image) || void 0 === t2 ? void 0 : t2.src), backgroundImageWidth: o2.backgroundImageWidth || (null === (i2 = o2.background) || void 0 === i2 || null === (n2 = i2.image) || void 0 === n2 ? void 0 : n2.width), backgroundImageHeight: o2.backgroundImageHeight || (null === (a2 = o2.background) || void 0 === a2 || null === (d2 = a2.image) || void 0 === d2 ? void 0 : d2.height), backgroundImageX: o2.backgroundImageX || (null === (u2 = o2.background) || void 0 === u2 || null === (s2 = u2.image) || void 0 === s2 ? void 0 : s2.x), backgroundImageY: o2.backgroundImageY || (null === (g2 = o2.background) || void 0 === g2 || null === (l2 = g2.image) || void 0 === l2 ? void 0 : l2.y), backgroundImageAlpha: o2.backgroundImageAlpha || (null === (h2 = o2.background) || void 0 === h2 || null === (c2 = h2.image) || void 0 === c2 ? void 0 : c2.alpha), backgroundImageBorderRadius: o2.backgroundImageBorderRadius || (null === (m2 = o2.background) || void 0 === m2 || null === (f2 = m2.image) || void 0 === f2 ? void 0 : f2.borderRadius), backgroundPadding: o2.backgroundPadding, foregroundColor: o2.foregroundColor || (null === (v2 = o2.foreground) || void 0 === v2 ? void 0 : v2.color), foregroundImageSrc: o2.foregroundImageSrc || (null === (p2 = o2.foreground) || void 0 === p2 || null === (C2 = p2.image) || void 0 === C2 ? void 0 : C2.src), foregroundImageWidth: o2.foregroundImageWidth || (null === (b2 = o2.foreground) || void 0 === b2 || null === (k = b2.image) || void 0 === k ? void 0 : k.width), foregroundImageHeight: o2.foregroundImageHeight || (null === (y = o2.foreground) || void 0 === y || null === (w = y.image) || void 0 === w ? void 0 : w.height), foregroundImageX: o2.foregroundImageX || (null === (I = o2.foreground) || void 0 === I || null === (B = I.image) || void 0 === B ? void 0 : B.x), foregroundImageY: o2.foregroundImageY || (null === (S = o2.foreground) || void 0 === S || null === (P = S.image) || void 0 === P ? void 0 : P.y), foregroundImagePadding: o2.foregroundImagePadding || (null === (L = o2.foreground) || void 0 === L || null === (D = L.image) || void 0 === D ? void 0 : D.padding), foregroundImageBackgroundColor: o2.foregroundImageBackgroundColor || (null === (A = o2.foreground) || void 0 === A || null === (E = A.image) || void 0 === E ? void 0 : E.backgroundColor), foregroundImageBorderRadius: o2.foregroundImageBorderRadius || (null === (T = o2.foreground) || void 0 === T || null === (N = T.image) || void 0 === N ? void 0 : N.borderRadius), foregroundImageShadowOffsetX: o2.foregroundImageShadowOffsetX || (null === (M = o2.foreground) || void 0 === M || null === (z = M.image) || void 0 === z ? void 0 : z.shadowOffsetX), foregroundImageShadowOffsetY: o2.foregroundImageShadowOffsetY || (null === (R = o2.foreground) || void 0 === R || null === (_ = R.image) || void 0 === _ ? void 0 : _.shadowOffsetY), foregroundImageShadowBlur: o2.foregroundImageShadowBlur || (null === (O = o2.foreground) || void 0 === O || null === (F = O.image) || void 0 === F ? void 0 : F.shadowBlur), foregroundImageShadowColor: o2.foregroundImageShadowColor || (null === (x = o2.foreground) || void 0 === x || null === (H = x.image) || void 0 === H ? void 0 : H.shadowColor), foregroundPadding: o2.foregroundPadding, positionProbeBackgroundColor: o2.positionProbeBackgroundColor || (null === (X = o2.positionProbe) || void 0 === X ? void 0 : X.backgroundColor) || (null === (Y = o2.positionDetection) || void 0 === Y ? void 0 : Y.backgroundColor), positionProbeForegroundColor: o2.positionProbeForegroundColor || (null === (j = o2.positionProbe) || void 0 === j ? void 0 : j.foregroundColor) || (null === (W = o2.positionDetection) || void 0 === W ? void 0 : W.foregroundColor), separatorColor: o2.separatorColor || (null === (G = o2.separator) || void 0 === G ? void 0 : G.color), positionAdjustBackgroundColor: o2.positionAdjustBackgroundColor || (null === (K = o2.positionAdjust) || void 0 === K ? void 0 : K.backgroundColor) || (null === (Q = o2.alignment) || void 0 === Q ? void 0 : Q.backgroundColor), positionAdjustForegroundColor: o2.positionAdjustForegroundColor || (null === (U = o2.positionAdjust) || void 0 === U ? void 0 : U.foregroundColor) || (null === ($ = o2.alignment) || void 0 === $ ? void 0 : $.foregroundColor), timingBackgroundColor: o2.timingBackgroundColor || (null === (J = o2.timing) || void 0 === J ? void 0 : J.backgroundColor), timingForegroundColor: o2.timingForegroundColor || (null === (q = o2.timing) || void 0 === q ? void 0 : q.foregroundColor), typeNumberBackgroundColor: o2.typeNumberBackgroundColor || (null === (V = o2.typeNumber) || void 0 === V ? void 0 : V.backgroundColor) || (null === (Z = o2.versionInformation) || void 0 === Z ? void 0 : Z.backgroundColor), typeNumberForegroundColor: o2.typeNumberForegroundColor || (null === (oo = o2.typeNumber) || void 0 === oo ? void 0 : oo.foregroundColor) || (null === (eo = o2.versionInformation) || void 0 === eo ? void 0 : eo.foregroundColor), darkBlockColor: o2.darkBlockColor || (null === (ro = o2.darkBlock) || void 0 === ro ? void 0 : ro.color) }, true));
  }, b.prototype.make = function() {
    let { foregroundColor: o2, backgroundColor: r2, typeNumber: t2, errorCorrectLevel: i2, data: n2, size: a2, margin: d2, useDynamicSize: u2 } = this;
    if (o2 === r2)
      throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", "[uQRCode]: foregroundColor and backgroundColor cannot be the same!"), new b.Error("foregroundColor and backgroundColor cannot be the same!");
    var s2 = new e(t2, i2);
    s2.addData(function(o3) {
      o3 = o3.toString();
      for (var e2, r3 = "", t3 = 0; t3 < o3.length; t3++)
        (e2 = o3.charCodeAt(t3)) >= 1 && e2 <= 127 ? r3 += o3.charAt(t3) : e2 > 2047 ? (r3 += String.fromCharCode(224 | e2 >> 12 & 15), r3 += String.fromCharCode(128 | e2 >> 6 & 63), r3 += String.fromCharCode(128 | e2 >> 0 & 63)) : (r3 += String.fromCharCode(192 | e2 >> 6 & 31), r3 += String.fromCharCode(128 | e2 >> 0 & 63));
      return r3;
    }(n2)), s2.make(), this.base = s2, this.typeNumber = s2.typeNumber, this.modules = s2.modules, this.moduleCount = s2.moduleCount, this.dynamicSize = u2 ? Math.ceil((a2 - 2 * d2) / s2.moduleCount) * s2.moduleCount + 2 * d2 : a2, function(o3) {
      let { dynamicSize: e2, margin: r3, backgroundColor: t3, backgroundPadding: i3, foregroundColor: n3, foregroundPadding: a3, modules: d3, moduleCount: u3 } = o3, s3 = (e2 - 2 * r3) / u3, g2 = s3, l2 = 0;
      i3 > 0 && (l2 = g2 * i3 / 2, g2 -= 2 * l2);
      let h2 = s3, c2 = 0;
      a3 > 0 && (c2 = h2 * a3 / 2, h2 -= 2 * c2);
      for (var m2 = 0; m2 < u3; m2++)
        for (var f2 = 0; f2 < u3; f2++) {
          var v2 = f2 * s3 + r3, p2 = m2 * s3 + r3;
          if (d3[m2][f2]) {
            var C2 = c2, b2 = v2 + c2, k = p2 + c2, y = h2, w = h2;
            d3[m2][f2] = { type: ["foreground"], color: n3, isBlack: true, isDrawn: false, destX: v2, destY: p2, destWidth: s3, destHeight: s3, x: b2, y: k, width: y, height: w, paddingTop: C2, paddingRight: C2, paddingBottom: C2, paddingLeft: C2 };
          } else
            C2 = l2, b2 = v2 + l2, k = p2 + l2, y = g2, w = g2, d3[m2][f2] = { type: ["background"], color: t3, isBlack: false, isDrawn: false, destX: v2, destY: p2, destWidth: s3, destHeight: s3, x: b2, y: k, width: y, height: w, paddingTop: C2, paddingRight: C2, paddingBottom: C2, paddingLeft: C2 };
        }
    }(this), function(o3) {
      let { modules: e2, moduleCount: r3, positionProbeBackgroundColor: t3, positionProbeForegroundColor: i3 } = o3, n3 = r3 - 7;
      [[0, 0, 1], [1, 0, 1], [2, 0, 1], [3, 0, 1], [4, 0, 1], [5, 0, 1], [6, 0, 1], [0, 1, 1], [1, 1, 0], [2, 1, 0], [3, 1, 0], [4, 1, 0], [5, 1, 0], [6, 1, 1], [0, 2, 1], [1, 2, 0], [2, 2, 1], [3, 2, 1], [4, 2, 1], [5, 2, 0], [6, 2, 1], [0, 3, 1], [1, 3, 0], [2, 3, 1], [3, 3, 1], [4, 3, 1], [5, 3, 0], [6, 3, 1], [0, 4, 1], [1, 4, 0], [2, 4, 1], [3, 4, 1], [4, 4, 1], [5, 4, 0], [6, 4, 1], [0, 5, 1], [1, 5, 0], [2, 5, 0], [3, 5, 0], [4, 5, 0], [5, 5, 0], [6, 5, 1], [0, 6, 1], [1, 6, 1], [2, 6, 1], [3, 6, 1], [4, 6, 1], [5, 6, 1], [6, 6, 1]].forEach((o4) => {
        var r4 = e2[o4[0]][o4[1]], a3 = e2[o4[0] + n3][o4[1]], d3 = e2[o4[0]][o4[1] + n3];
        d3.type.push("positionProbe"), a3.type.push("positionProbe"), r4.type.push("positionProbe"), r4.color = 1 == o4[2] ? i3 : t3, a3.color = 1 == o4[2] ? i3 : t3, d3.color = 1 == o4[2] ? i3 : t3;
      });
    }(this), function(o3) {
      let { modules: e2, moduleCount: r3, separatorColor: t3 } = o3;
      [[7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]].forEach((o4) => {
        var i3 = e2[o4[0]][o4[1]], n3 = e2[r3 - o4[0] - 1][o4[1]], a3 = e2[o4[0]][r3 - o4[1] - 1];
        a3.type.push("separator"), n3.type.push("separator"), i3.type.push("separator"), i3.color = t3, n3.color = t3, a3.color = t3;
      });
    }(this), function(o3) {
      let { typeNumber: e2, modules: r3, moduleCount: t3, foregroundColor: i3, backgroundColor: n3, positionAdjustForegroundColor: a3, positionAdjustBackgroundColor: d3, timingForegroundColor: u3, timingBackgroundColor: s3 } = o3;
      const g2 = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]][e2 - 1];
      if (g2) {
        const o4 = [[-2, -2, 1], [-1, -2, 1], [0, -2, 1], [1, -2, 1], [2, -2, 1], [-2, -1, 1], [-1, -1, 0], [0, -1, 0], [1, -1, 0], [2, -1, 1], [-2, 0, 1], [-1, 0, 0], [0, 0, 1], [1, 0, 0], [2, 0, 1], [-2, 1, 1], [-1, 1, 0], [0, 1, 0], [1, 1, 0], [2, 1, 1], [-2, 2, 1], [-1, 2, 1], [0, 2, 1], [1, 2, 1], [2, 2, 1]], e3 = g2.length;
        for (let l2 = 0; l2 < e3; l2++)
          for (let h2 = 0; h2 < e3; h2++) {
            let { x: e4, y: c2 } = { x: g2[l2], y: g2[h2] };
            e4 < 9 && c2 < 9 || e4 > t3 - 9 - 1 && c2 < 9 || c2 > t3 - 9 - 1 && e4 < 9 || o4.forEach((o5) => {
              var t4 = r3[e4 + o5[0]][c2 + o5[1]];
              t4.type.push("positionAdjust"), t4.type.includes("timing") ? 1 == o5[2] ? t4.color = a3 == i3 ? u3 : a3 : t4.color = a3 == i3 && d3 == n3 ? s3 : d3 : t4.color = 1 == o5[2] ? a3 : d3;
            });
          }
      }
    }(this), function(o3) {
      let { modules: e2, moduleCount: r3, timingForegroundColor: t3, timingBackgroundColor: i3 } = o3, n3 = r3 - 16;
      for (let o4 = 0; o4 < n3; o4++) {
        var a3 = e2[6][8 + o4], d3 = e2[8 + o4][6];
        a3.type.push("timing"), d3.type.push("timing"), a3.color = 1 & o4 ^ 1 ? t3 : i3, d3.color = 1 & o4 ^ 1 ? t3 : i3;
      }
    }(this), function(o3) {
      let { modules: e2, moduleCount: r3, darkBlockColor: t3 } = o3;
      var i3 = e2[r3 - 7 - 1][8];
      i3.type.push("darkBlock"), i3.color = t3;
    }(this), function(o3) {
      let { typeNumber: e2, modules: r3, moduleCount: t3, typeNumberBackgroundColor: i3, typeNumberForegroundColor: n3 } = o3;
      if (e2 < 7)
        return r3;
      const a3 = [0, 0, 0, 0, 0, 0, 0, "000111110010010100", "001000010110111100", "001001101010011001", "001010010011010011", "001011101111110110", "001100011101100010", "001101100001000111", "001110011000001101", "001111100100101000", "010000101101111000", "010001010001011101", "010010101000010111", "010011010100110010", "010100100110100110", "010101011010000011", "010110100011001001", "010111011111101100", "011000111011000100", "011001000111100001", "011010111110101011", "011011000010001110", "011100110000011010", "011101001100111111", "011110110101110101", "011111001001010000", "100000100111010101", "100001011011110000", "100010100010111010", "100011011110011111", "100100101100001011", "100101010000101110", "100110101001100100", "100111010101000001", "101000110001101001"];
      let d3 = a3[e2] + a3[e2], u3 = [t3 - 11, t3 - 10, t3 - 9];
      [[5, u3[2]], [5, u3[1]], [5, u3[0]], [4, u3[2]], [4, u3[1]], [4, u3[0]], [3, u3[2]], [3, u3[1]], [3, u3[0]], [2, u3[2]], [2, u3[1]], [2, u3[0]], [1, u3[2]], [1, u3[1]], [1, u3[0]], [0, u3[2]], [0, u3[1]], [0, u3[0]], [u3[2], 5], [u3[1], 5], [u3[0], 5], [u3[2], 4], [u3[1], 4], [u3[0], 4], [u3[2], 3], [u3[1], 3], [u3[0], 3], [u3[2], 2], [u3[1], 2], [u3[0], 2], [u3[2], 1], [u3[1], 1], [u3[0], 1], [u3[2], 0], [u3[1], 0], [u3[0], 0]].forEach((o4, e3) => {
        var t4 = r3[o4[0]][o4[1]];
        t4.type.push("typeNumber"), t4.color = "1" == d3[e3] ? n3 : i3;
      });
    }(this), this.isMaked = true, this.drawModules = [];
  }, b.prototype.getDrawModules = function() {
    if (this.drawModules && this.drawModules.length > 0)
      return this.drawModules;
    let o2 = this.drawModules = [], { modules: e2, moduleCount: r2, dynamicSize: t2, areaColor: i2, backgroundImageSrc: n2, backgroundImageX: a2, backgroundImageY: d2, backgroundImageWidth: u2, backgroundImageHeight: s2, backgroundImageAlpha: g2, backgroundImageBorderRadius: l2, foregroundImageSrc: h2, foregroundImageX: c2, foregroundImageY: m2, foregroundImageWidth: f2, foregroundImageHeight: v2, foregroundImagePadding: p2, foregroundImageBackgroundColor: C2, foregroundImageBorderRadius: b2, foregroundImageShadowOffsetX: k, foregroundImageShadowOffsetY: y, foregroundImageShadowBlur: w, foregroundImageShadowColor: I } = this;
    i2 && o2.push({ name: "area", type: "area", color: i2, x: 0, y: 0, width: t2, height: t2 }), n2 && o2.push({ name: "backgroundImage", type: "image", imageSrc: n2, mappingName: "backgroundImageSrc", x: a2, y: d2, width: u2, height: s2, alpha: g2, borderRadius: l2 });
    for (var B = 0; B < r2; B++)
      for (var S = 0; S < r2; S++) {
        var P = e2[B][S];
        P.isDrawn || (P.type.includes("foreground") ? o2.push({ name: "foreground", type: "tile", color: P.color, destX: P.destX, destY: P.destY, destWidth: P.destWidth, destHeight: P.destHeight, x: P.x, y: P.y, width: P.width, height: P.height, paddingTop: P.paddingTop, paddingRight: P.paddingRight, paddingBottom: P.paddingBottom, paddingLeft: P.paddingLeft, rowIndex: B, colIndex: S }) : o2.push({ name: "background", type: "tile", color: P.color, destX: P.destX, destY: P.destY, destWidth: P.destWidth, destHeight: P.destHeight, x: P.x, y: P.y, width: P.width, height: P.height, paddingTop: P.paddingTop, paddingRight: P.paddingRight, paddingBottom: P.paddingBottom, paddingLeft: P.paddingLeft, rowIndex: B, colIndex: S }), P.isDrawn = true);
      }
    return h2 && o2.push({ name: "foregroundImage", type: "image", imageSrc: h2, mappingName: "foregroundImageSrc", x: c2, y: m2, width: f2, height: v2, padding: p2, backgroundColor: C2, borderRadius: b2, shadowOffsetX: k, shadowOffsetY: y, shadowBlur: w, shadowColor: I }), o2;
  }, b.prototype.isBlack = function(o2, e2) {
    var r2 = this.moduleCount;
    return !(0 > o2 || 0 > e2 || o2 >= r2 || e2 >= r2) && this.modules[o2][e2].isBlack;
  }, b.prototype.drawCanvas = function() {
    let { isMaked: o2, canvasContext: e2, useDynamicSize: r2, dynamicSize: t2, foregroundColor: i2, foregroundPadding: n2, backgroundColor: a2, backgroundPadding: d2, drawReserve: u2, margin: s2 } = this;
    if (!o2)
      return formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", "[uQRCode]: please execute the make method first!"), Promise.reject(new b.Error("please execute the make method first!"));
    let g2 = this.getDrawModules(), l2 = async (o3, r3) => {
      try {
        e2.clearRect(0, 0, t2, t2), e2.draw(false);
        for (var i3 = 0; i3 < g2.length; i3++) {
          var n3 = g2[i3];
          switch (e2.save(), n3.type) {
            case "area":
              e2.setFillStyle(n3.color), e2.fillRect(n3.x, n3.y, n3.width, n3.height);
              break;
            case "tile":
              var a3 = n3.x, d3 = n3.y, s3 = n3.width, l3 = n3.height;
              e2.setFillStyle(n3.color), e2.fillRect(a3, d3, s3, l3);
              break;
            case "image":
              if ("backgroundImage" === n3.name) {
                a3 = Math.round(n3.x), d3 = Math.round(n3.y), s3 = Math.round(n3.width), l3 = Math.round(n3.height);
                s3 < 2 * (c2 = Math.round(n3.borderRadius)) && (c2 = s3 / 2), l3 < 2 * c2 && (c2 = l3 / 2), e2.setGlobalAlpha(n3.alpha), c2 > 0 && (e2.beginPath(), e2.moveTo(a3 + c2, d3), e2.arcTo(a3 + s3, d3, a3 + s3, d3 + l3, c2), e2.arcTo(a3 + s3, d3 + l3, a3, d3 + l3, c2), e2.arcTo(a3, d3 + l3, a3, d3, c2), e2.arcTo(a3, d3, a3 + s3, d3, c2), e2.closePath(), e2.setStrokeStyle("rgba(0,0,0,0)"), e2.stroke(), e2.clip());
                try {
                  var h2 = await this.loadImage(n3.imageSrc);
                  e2.drawImage(h2, a3, d3, s3, l3);
                } catch (o4) {
                  throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", `[uQRCode]: ${n3.mappingName} invalid!`), new b.Error(`${n3.mappingName} invalid!`);
                }
              } else if ("foregroundImage" === n3.name) {
                a3 = Math.round(n3.x), d3 = Math.round(n3.y), s3 = Math.round(n3.width), l3 = Math.round(n3.height);
                var c2, m2 = Math.round(n3.padding);
                s3 < 2 * (c2 = Math.round(n3.borderRadius)) && (c2 = s3 / 2), l3 < 2 * c2 && (c2 = l3 / 2);
                var f2 = a3 - m2, v2 = d3 - m2, p2 = s3 + 2 * m2, C2 = l3 + 2 * m2, k = Math.round(p2 / s3 * c2);
                p2 < 2 * k && (k = p2 / 2), C2 < 2 * k && (k = C2 / 2), e2.save(), e2.setShadow(n3.shadowOffsetX, n3.shadowOffsetY, n3.shadowBlur, n3.shadowColor), k > 0 ? (e2.beginPath(), e2.moveTo(f2 + k, v2), e2.arcTo(f2 + p2, v2, f2 + p2, v2 + C2, k), e2.arcTo(f2 + p2, v2 + C2, f2, v2 + C2, k), e2.arcTo(f2, v2 + C2, f2, v2, k), e2.arcTo(f2, v2, f2 + p2, v2, k), e2.closePath(), e2.setFillStyle(n3.backgroundColor), e2.fill()) : (e2.setFillStyle(n3.backgroundColor), e2.fillRect(f2, v2, p2, C2)), e2.restore(), e2.save(), k > 0 ? (e2.beginPath(), e2.moveTo(f2 + k, v2), e2.arcTo(f2 + p2, v2, f2 + p2, v2 + C2, k), e2.arcTo(f2 + p2, v2 + C2, f2, v2 + C2, k), e2.arcTo(f2, v2 + C2, f2, v2, k), e2.arcTo(f2, v2, f2 + p2, v2, k), e2.closePath(), e2.setFillStyle(m2 > 0 ? n3.backgroundColor : "rgba(0,0,0,0)"), e2.fill()) : (e2.setFillStyle(m2 > 0 ? n3.backgroundColor : "rgba(0,0,0,0)"), e2.fillRect(f2, v2, p2, C2)), e2.restore(), c2 > 0 && (e2.beginPath(), e2.moveTo(a3 + c2, d3), e2.arcTo(a3 + s3, d3, a3 + s3, d3 + l3, c2), e2.arcTo(a3 + s3, d3 + l3, a3, d3 + l3, c2), e2.arcTo(a3, d3 + l3, a3, d3, c2), e2.arcTo(a3, d3, a3 + s3, d3, c2), e2.closePath(), e2.setStrokeStyle("rgba(0,0,0,0)"), e2.stroke(), e2.clip());
                try {
                  h2 = await this.loadImage(n3.imageSrc);
                  e2.drawImage(h2, a3, d3, s3, l3);
                } catch (o4) {
                  throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", `[uQRCode]: ${n3.mappingName} invalid!`), new b.Error(`${n3.mappingName} invalid!`);
                }
              }
          }
          u2 && e2.draw(true), e2.restore();
        }
        e2.draw(true), setTimeout(o3, 150);
      } catch (o4) {
        if (!(o4 instanceof b.Error))
          throw o4;
        r3(o4);
      }
    };
    return new Promise((o3, e3) => {
      l2(o3, e3);
    });
  }, b.prototype.draw = function() {
    return this.drawCanvas();
  }, b.prototype.register = function(o2) {
    o2 && o2(b, this, true);
  };
  const _sfc_main$b = {
    data() {
      return {
        defaultSum: "",
        paymentReason: "",
        number: "",
        showBalance: false,
        cardNum: "",
        cardId: "",
        orderId: "111",
        card: [],
        token_: "",
        payeeId: "",
        op: {
          data: "1234"
        },
        modules: []
      };
    },
    onLoad() {
      let that = this;
      uni.getStorage({
        key: "token",
        success: function(res) {
          that.token_ = res.data;
          uni.getStorage({
            key: "token",
            success: function(res2) {
              let token_ = res2.data;
              uni.request({
                url: "https://120.55.37.93/query/bankCard",
                method: "GET",
                header: {
                  "token": token_
                },
                data: {},
                success: function(res3) {
                  formatAppLog("log", "at pages/QRcode/QRcode.vue:77", res3);
                  res3.data.data.forEach((item) => {
                    let temp = { "cardId": "", "cardNumber": "", "balance": "" };
                    temp.cardId = item.cardId;
                    temp.cardNumber = item.cardNumber;
                    temp.balance = item.balance;
                    that.card.push(temp);
                  });
                  that.cardNum = res3.data.data[0].cardNumber;
                  that.cardId = res3.data.data[0].cardId;
                  formatAppLog("log", "at pages/QRcode/QRcode.vue:87", that.cardId);
                  uni.request({
                    url: "https://120.55.37.93/TDCode/generate?cardId=" + that.cardId,
                    method: "GET",
                    header: {
                      "token": that.token_
                    },
                    data: {},
                    success: function(res4) {
                      formatAppLog("log", "at pages/QRcode/QRcode.vue:98", res4);
                      that.orderId = res4.data.data;
                      let qr = new b();
                      qr.data = that.orderId;
                      qr.make();
                      that.modules = qr.modules;
                      uni.setStorage({
                        key: "orderId",
                        data: res4.data.data
                      });
                    },
                    fail: function(error2) {
                      formatAppLog("log", "at pages/QRcode/QRcode.vue:110", "寄咯");
                    }
                  });
                },
                fail: function(error2) {
                  formatAppLog("log", "at pages/QRcode/QRcode.vue:115", "寄咯");
                }
              });
            },
            fail: function(error2) {
              formatAppLog("log", "at pages/QRcode/QRcode.vue:120", "获取token失败", error2);
            }
          });
        }
      });
    },
    methods: {
      transfer() {
      },
      setNum() {
      },
      changeCard() {
        uni.navigateTo({
          url: "/pages/chooseCard/chooseCard",
          success: function(res) {
          }
        });
      }
    },
    onReady() {
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "center", "margin-top": "100rpx" } }, [
          vue.createElementVNode("text", null, "打开扫一扫，向我付钱")
        ]),
        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "center", "margin-top": "40rpx" } }, [
          vue.createElementVNode("view", { class: "qrcode" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.modules, (row, rowI) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: rowI,
                  style: { "display": "flex", "flex-direction": "row" }
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(row, (col, colI) => {
                      return vue.openBlock(), vue.createElementBlock("view", { key: colI }, [
                        col.isBlack ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          style: { "width": "10px", "height": "10px", "background-color": "black" }
                        }, [
                          vue.createCommentVNode(" 黑色码点 ")
                        ])) : (vue.openBlock(), vue.createElementBlock("view", {
                          key: 1,
                          style: { "width": "10px", "height": "10px", "background-color": "white" }
                        }, [
                          vue.createCommentVNode(" 白色码点 ")
                        ]))
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.withDirectives(vue.createElementVNode(
          "view",
          { style: { "display": "flex", "justify-content": "center" } },
          [
            vue.createElementVNode(
              "text",
              null,
              "￥" + vue.toDisplayString(parseFloat($data.defaultSum).toFixed(2)),
              1
              /* TEXT */
            )
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $data.showBalance]
        ]),
        vue.withDirectives(vue.createElementVNode(
          "view",
          { style: { "display": "flex", "justify-content": "center" } },
          [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($data.paymentReason),
              1
              /* TEXT */
            )
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $data.showBalance]
        ]),
        vue.createElementVNode("view", { style: { "margin-top": "80rpx" } }, [
          vue.createElementVNode("text", { style: { "margin-left": "80rpx" } }, "收款账户"),
          vue.createElementVNode(
            "text",
            { style: { "margin-left": "20rpx" } },
            vue.toDisplayString($data.cardNum),
            1
            /* TEXT */
          ),
          vue.createElementVNode("text", {
            style: { "color": "blue", "margin-left": "20rpx" },
            onClick: _cache[0] || (_cache[0] = (...args) => $options.changeCard && $options.changeCard(...args))
          }, "更改")
        ]),
        vue.createElementVNode("view", null, [
          vue.createElementVNode("button", {
            onClick: _cache[1] || (_cache[1] = (...args) => $options.transfer && $options.transfer(...args))
          }, "扫一扫")
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesQRcodeQRcode = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__file", "E:/BankSystem/user/pages/QRcode/QRcode.vue"]]);
  const _sfc_main$a = {
    data() {
      return {
        model1: {
          balance: "",
          reason: ""
        },
        rule1: {
          "balance": {
            type: "number",
            required: true,
            trigger: ["change"],
            message: "请输入有效数字"
          }
        }
      };
    },
    methods: {
      returnPage() {
        let that = this;
        uni.navigateTo({
          url: "/pages/QRcode/QRcode",
          success: function(res) {
            res.eventChannel.emit("qr", {
              "balance": that.model1.balance,
              "reason": that.model1.reason
            });
          }
        });
      }
    },
    onReady() {
      this.$refs.form1.setRules(this.rule1);
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0$d);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1$b);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_2$6);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_uv_form, {
        style: { "margin-top": "20rpx" },
        model: $data.model1,
        rules: $data.rule1,
        ref: "form1"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(
            _component_uv_form_item,
            {
              label: "金额",
              style: { "background-color": "white" },
              prop: "balance",
              ref: "item1"
            },
            {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uv_input, {
                  border: "none",
                  modelValue: $data.model1.balance,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.model1.balance = $event)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          ),
          vue.createVNode(
            _component_uv_form_item,
            {
              label: "理由",
              style: { "background-color": "white" },
              prop: "reason",
              ref: "item1"
            },
            {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uv_input, {
                  border: "none",
                  modelValue: $data.model1.reason,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.model1.reason = $event)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["model", "rules"]),
      vue.createElementVNode("view", null, [
        vue.createElementVNode("button", {
          onClick: _cache[2] || (_cache[2] = (...args) => $options.returnPage && $options.returnPage(...args))
        }, "确认")
      ])
    ]);
  }
  const PagesSetBalanceSetBalance = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "E:/BankSystem/user/pages/setBalance/setBalance.vue"]]);
  const _sfc_main$9 = {
    data() {
      return {
        model1: {
          num: ""
        },
        balance: "",
        cardNum: "",
        cardId: "",
        card: [],
        token_: "",
        codeTips: "",
        orderId: "",
        rule1: {},
        name: "11",
        user: "11"
      };
    },
    computed: {
      phoneTail: function() {
        let temp = "";
        uni.getStorage({
          key: "userName",
          success(res) {
            formatAppLog("log", "at pages/codeTransfer/codeTransfer.vue:82", res);
            temp = res.data.slice(-4);
          }
        });
        return temp;
      }
    },
    methods: {
      modefiy() {
        uni.navigateTo({
          url: "/pages/selectCard/selectCard",
          success: function(res) {
          }
        });
      },
      confirmTransfer() {
        this.$refs.popup.open();
      },
      codeInputFinish(e2) {
        let that = this;
        formatAppLog("log", "at pages/codeTransfer/codeTransfer.vue:105", that.model1.num);
        formatAppLog("log", "at pages/codeTransfer/codeTransfer.vue:106", that.cardId);
        formatAppLog("log", "at pages/codeTransfer/codeTransfer.vue:107", that.orderId);
        uni.getStorage({
          key: "token",
          success: function(res) {
            let _token = res.data;
            uni.showLoading({
              title: "",
              mask: true
            });
            uni.request({
              url: "https://120.55.37.93/TDCode/transferMoney",
              method: "POST",
              header: {
                "token": _token
              },
              data: {
                "amount": that.model1.num,
                "password": String(e2),
                "payerCardId": that.cardId,
                "orderId": that.orderId
              },
              success: function(res2) {
                uni.hideLoading();
                formatAppLog("log", "at pages/codeTransfer/codeTransfer.vue:130", res2);
                formatAppLog("log", "at pages/codeTransfer/codeTransfer.vue:131", 1);
                uni.setStorage({
                  key: "transactionId",
                  data: res2.data.data.transactionId
                });
                uni.setStorage({
                  key: "transactionTime",
                  data: res2.data.data.transactionTime
                });
                uni.setStorage({
                  key: "payerNumber",
                  data: that.cardNum
                });
                uni.setStorage({
                  key: "tNum",
                  data: that.model1.num
                });
                uni.setStorage({
                  key: "payeeName",
                  data: that.name
                });
                uni.navigateTo({
                  url: "/pages/codeTransferResult/codeTransferResult",
                  success: function(res3) {
                  }
                });
              },
              fail: function(error2) {
                uni.hideLoading();
                uni.showToast({
                  title: "错误，稍后再试",
                  icon: "error",
                  duration: 2e3
                });
              }
            });
          }
        });
      },
      getCode() {
        if (this.$refs.uCode.canGetCode) {
          this.$refs.uCode.start();
        } else {
          this.$u.toast("倒计时结束后再发送");
        }
      },
      codeChange(text) {
        this.codeTips = text;
      }
    },
    onReady() {
      this.$refs.form1.setRules(this.rule1);
      let that = this;
      uni.getStorage({
        key: "orderId",
        success: function(res) {
          formatAppLog("log", "at pages/codeTransfer/codeTransfer.vue:193", res.data);
          that.orderId = res.data;
        }
      });
      uni.getStorage({
        key: "payeeName",
        success: function(res) {
          that.name = res.data;
        },
        fail() {
        }
      });
      uni.getStorage({
        key: "payeeCardNumber",
        success: function(res) {
          that.user = res.data;
        }
      });
      uni.getStorage({
        key: "token",
        success: function(res) {
          let _token = res.data;
          uni.request({
            url: "https://120.55.37.93/query/bankCard",
            method: "GET",
            header: {
              "token": _token
            },
            success: function(res2) {
              formatAppLog("log", "at pages/codeTransfer/codeTransfer.vue:224", res2);
              res2.data.data.forEach((item) => {
                let temp = { "cardId": "", "cardNumber": "", "balance": "" };
                temp.cardId = item.cardId;
                temp.cardNumber = item.cardNumber;
                temp.balance = item.balance;
                that.card.push(temp);
              });
              formatAppLog("log", "at pages/codeTransfer/codeTransfer.vue:232", that.card);
              that.cardNum = res2.data.data[0].cardNumber;
              that.cardId = res2.data.data[0].cardId;
              that.balance = res2.data.data[0].balance;
            },
            fail: function(error2) {
              formatAppLog("log", "at pages/codeTransfer/codeTransfer.vue:238", "寄咯");
            }
          });
        },
        fail: function(error2) {
          formatAppLog("log", "at pages/codeTransfer/codeTransfer.vue:243", "获取token失败", error2);
        }
      });
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0$d);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1$b);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_2$6);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_4$2);
    const _component_uv_code_input = resolveEasycom(vue.resolveDynamicComponent("uv-code-input"), __easycom_5);
    const _component_uv_code = resolveEasycom(vue.resolveDynamicComponent("uv-code"), __easycom_6$1);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_7);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", null, [
          vue.createElementVNode("view", null, [
            vue.createElementVNode("view", { style: { "margin-top": "50rpx" } }, [
              vue.createElementVNode("text", { style: { "margin-left": "20rpx" } }, "收款方"),
              vue.createElementVNode(
                "text",
                { style: { "margin-left": "178rpx" } },
                vue.toDisplayString($data.name),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { style: { "margin-top": "10rpx" } }, [
              vue.createElementVNode("text", { style: { "margin-left": "20rpx" } }, "收款账户"),
              vue.createElementVNode(
                "text",
                { style: { "margin-left": "150rpx" } },
                vue.toDisplayString($data.user),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { style: { "margin-top": "10rpx" } }, [
              vue.createElementVNode("text", { style: { "margin-left": "20rpx" } }, "所属银行"),
              vue.createElementVNode("text", { style: { "margin-left": "150rpx" } }, "中国银行")
            ])
          ]),
          vue.createVNode(_component_uv_form, {
            model: $data.model1,
            rules: $data.rule1,
            ref: "form1",
            style: { "margin-top": "100rpx", "margin-left": "30rpx", "margin-right": "30rpx", "background-color": "white" }
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", null, [
                vue.createElementVNode("text", { style: { "font-weight": "bold" } }, "付款金额（人民币元）")
              ]),
              vue.createVNode(_component_uv_form_item, { prop: "num" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uv_input, {
                    modelValue: $data.model1.num,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.model1.num = $event),
                    border: "none",
                    style: { "margin-left": "20rpx", "margin-right": "20rpx", "height": "150rpx", "font-size": "200%" },
                    placeholder: "请输入",
                    clearable: true,
                    "input-align": "center"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"]),
          vue.createElementVNode("view", null, [
            vue.createElementVNode("view", { style: { "margin-top": "50rpx" } }, [
              vue.createElementVNode("text", { style: { "margin-left": "20rpx" } }, "付款账户"),
              vue.createElementVNode(
                "text",
                { style: { "margin-left": "20rpx" } },
                vue.toDisplayString($data.cardNum),
                1
                /* TEXT */
              ),
              vue.createElementVNode("text", {
                style: { "color": "blue", "margin-left": "20rpx" },
                onClick: _cache[1] || (_cache[1] = (...args) => $options.modefiy && $options.modefiy(...args))
              }, "更改")
            ]),
            vue.createElementVNode("view", { style: { "margin-top": "10rpx" } }, [
              vue.createElementVNode("text", { style: { "margin-left": "20rpx" } }, "可用余额："),
              vue.createElementVNode(
                "text",
                { style: {} },
                vue.toDisplayString($data.balance),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode("view", { style: { "margin-top": "50rpx" } }, [
            vue.createElementVNode("button", {
              style: { "color": "white", "background-color": "blue" },
              onClick: _cache[2] || (_cache[2] = (...args) => $options.confirmTransfer && $options.confirmTransfer(...args))
            }, "确认")
          ])
        ]),
        vue.createVNode(
          _component_uni_popup,
          {
            ref: "popup",
            type: "center",
            isMaskClick: false
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-end", "background-color": "#FFFFFF" } }, [
                vue.createVNode(_component_uv_icon, {
                  name: "close",
                  size: "14",
                  style: { "margin-right": "5rpx" },
                  onClick: _cache[3] || (_cache[3] = ($event) => this.$refs.popup.close())
                })
              ]),
              vue.createElementVNode("view", { style: { "width": "600rpx", "height": "350rpx", "display": "flex", "flex-direction": "column", "align-items": "center", "background-color": "#FFFFFF" } }, [
                vue.createElementVNode("view", null, "手机交易码"),
                vue.createVNode(_component_uv_line, { margin: "10rpx" }),
                vue.createElementVNode("view", { style: { "margin-top": "20rpx" } }, "请输入支付密码"),
                vue.createVNode(_component_uv_code_input, {
                  mode: "line",
                  size: "28",
                  onFinish: $options.codeInputFinish,
                  style: { "margin-top": "40rpx" }
                }, null, 8, ["onFinish"]),
                vue.createVNode(_component_uv_code, {
                  ref: "uCode",
                  onChange: $options.codeChange,
                  seconds: "60"
                }, null, 8, ["onChange"])
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesCodeTransferCodeTransfer = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "E:/BankSystem/user/pages/codeTransfer/codeTransfer.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {
        card: []
      };
    },
    onReady() {
      let that = this;
      uni.getStorage({
        key: "token",
        success: function(res) {
          let _token = res.data;
          uni.request({
            url: "https://120.55.37.93/query/bankCard",
            method: "GET",
            header: {
              "token": _token
            },
            data: {},
            success: function(res2) {
              formatAppLog("log", "at pages/chooseCard/chooseCard.vue:35", res2);
              res2.data.data.forEach((item) => {
                let temp = { "cardId": "", "cardNumber": "", "balance": "" };
                temp.cardId = item.cardId;
                temp.cardNumber = item.cardNumber;
                temp.balance = item.balance;
                that.card.push(temp);
              });
              formatAppLog("log", "at pages/chooseCard/chooseCard.vue:43", that.card);
            },
            fail: function(error2) {
              formatAppLog("log", "at pages/chooseCard/chooseCard.vue:46", "寄咯");
            }
          });
        },
        fail: function(error2) {
          formatAppLog("log", "at pages/chooseCard/chooseCard.vue:51", "获取token失败", error2);
        }
      });
    },
    methods: {
      choose(c2) {
        formatAppLog("log", "at pages/chooseCard/chooseCard.vue:57", c2);
        uni.setStorage({
          key: "codeCardId",
          data: c2.cardId
        });
        uni.setStorage({
          key: "codeCardNumber",
          data: c2.cardNumber
        });
        uni.navigateTo({
          url: "/pages/QRcode/QRcode",
          success: function(res) {
          }
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    return vue.openBlock(), vue.createElementBlock("view", { style: { "margin-top": "10rpx" } }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.card, (c2) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            onClick: ($event) => $options.choose(c2)
          }, [
            vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-right": "20rpx", "background-color": "white", "margin-top": "20rpx", "height": "100rpx", "display": "flex", "vertical-align": "middle" } }, [
              vue.createVNode(_component_uv_icon, {
                name: "/static/icon/bankCard.jpg",
                size: "50",
                style: { "margin-left": "20rpx" }
              }),
              vue.createElementVNode(
                "text",
                { style: { "margin-top": "20rpx", "margin-left": "20rpx", "font-weight": "bold" } },
                vue.toDisplayString(c2.cardNumber),
                1
                /* TEXT */
              )
            ])
          ], 8, ["onClick"]);
        }),
        256
        /* UNKEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesChooseCardChooseCard = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "E:/BankSystem/user/pages/chooseCard/chooseCard.vue"]]);
  const _sfc_main$7 = {
    data() {
      return {
        model1: {
          code: "",
          precode: "",
          newcode: "",
          confirmcode: ""
        },
        rule1: {}
      };
    },
    onReady() {
      this.$refs.form1.setRules(this.rule1);
    },
    methods: {
      turnToNext() {
        let that = this;
        if (that.model1.newcode === that.model1.confirmcode) {
          formatAppLog("log", "at pages/modifyPaymentCode/modifyPaymentCode.vue:54", 1);
          uni.getStorage({
            key: "token",
            success: function(res) {
              let _token = res.data;
              uni.request({
                url: "https://120.55.37.93/edit/setPaymentPassword",
                method: "POST",
                header: {
                  "token": _token
                },
                data: {
                  "paymentPassword": that.model1.newcode
                },
                success: function(res2) {
                  formatAppLog("log", "at pages/modifyPaymentCode/modifyPaymentCode.vue:70", res2);
                  uni.navigateTo({
                    url: "/pages/modifyCodePResult/modifyCodePResult",
                    success: function(res3) {
                    }
                  });
                },
                fail: function(error2) {
                  formatAppLog("log", "at pages/modifyPaymentCode/modifyPaymentCode.vue:79", "寄咯");
                }
              });
            },
            fail: function(error2) {
              formatAppLog("log", "at pages/modifyPaymentCode/modifyPaymentCode.vue:84", "获取token失败", error2);
            }
          });
        } else {
          formatAppLog("log", "at pages/modifyPaymentCode/modifyPaymentCode.vue:89", 2);
        }
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0$d);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1$b);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_2$6);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", null, [
        vue.createElementVNode("view", { style: { "margin-top": "20rpx" } }, [
          vue.createVNode(_component_uv_form, {
            style: { "margin-top": "20rpx", "margin-left": "20rpx" },
            model: $data.model1,
            rules: $data.rule1,
            ref: "form1"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(
                _component_uv_form_item,
                {
                  label: "原密码",
                  "label-width": "120px",
                  style: { "background-color": "white" },
                  prop: "precode",
                  ref: "item1"
                },
                {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      border: "none",
                      modelValue: $data.model1.precode,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.model1.precode = $event),
                      placeholder: "请输入"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"]),
          vue.createElementVNode("view", { style: { "text-align": "right", "margin-top": "30rpx" } }, [
            vue.createElementVNode("text", { style: { "color": "blue" } }, "忘记密码？")
          ]),
          vue.createVNode(_component_uv_form, {
            style: { "margin-top": "30rpx", "margin-left": "20rpx" },
            model: $data.model1,
            rules: $data.rule1,
            ref: "form1"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(
                _component_uv_form_item,
                {
                  label: "新密码",
                  "label-width": "120px",
                  style: { "background-color": "white" },
                  prop: "newcode",
                  ref: "item1"
                },
                {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      border: "none",
                      modelValue: $data.model1.newcode,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.model1.newcode = $event),
                      placeholder: "请输入"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              ),
              vue.createVNode(
                _component_uv_form_item,
                {
                  label: "确认密码",
                  "label-width": "120px",
                  style: { "background-color": "white", "margin-top": "40rpx" },
                  prop: "confirmcode",
                  ref: "item1"
                },
                {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      border: "none",
                      modelValue: $data.model1.confirmcode,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.model1.confirmcode = $event),
                      placeholder: "请输入"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ]),
        vue.createElementVNode("view", { style: { "margin-top": "80rpx" } }, [
          vue.createElementVNode("button", {
            style: { "color": "white", "background-color": "blue" },
            onClick: _cache[3] || (_cache[3] = (...args) => $options.turnToNext && $options.turnToNext(...args))
          }, "确认")
        ])
      ])
    ]);
  }
  const PagesModifyPaymentCodeModifyPaymentCode = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "E:/BankSystem/user/pages/modifyPaymentCode/modifyPaymentCode.vue"]]);
  const props$1 = {
    props: {
      // item标签的名称，作为与uv-tabbar的value参数匹配的标识符
      name: {
        type: [String, Number, null],
        default: null
      },
      // uv-ui内置图标或者绝对路径的图片
      icon: {
        icon: String,
        default: ""
      },
      // 图标大小，默认uv-tabbar的iconSize=20
      iconSize: {
        type: [String, Number],
        default: ""
      },
      // 右上角的角标提示信息
      badge: {
        type: [String, Number, null],
        default: null
      },
      // 是否显示圆点，将会覆盖badge参数
      dot: {
        type: Boolean,
        default: false
      },
      // 描述文本
      text: {
        type: String,
        default: ""
      },
      // 控制徽标的位置，对象或者字符串形式，可以设置top和right属性
      badgeStyle: {
        type: [Object, String],
        default: "top: 6px;right:2px;"
      },
      ...(_da = (_ca = uni.$uv) == null ? void 0 : _ca.props) == null ? void 0 : _da.tabbarItem
    }
  };
  const _sfc_main$6 = {
    name: "uv-tabbar-item",
    mixins: [mpMixin, mixin, props$1],
    emits: ["click", "change"],
    data() {
      return {
        isActive: false,
        // 是否处于激活状态
        parentData: {
          value: null,
          activeColor: "",
          inactiveColor: "",
          iconSize: 20
        }
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.updateParentData();
        if (!this.parent) {
          this.$uv.error("uv-tabbar-item必须搭配uv-tabbar组件使用");
        }
        const index2 = this.parent.children.indexOf(this);
        this.isActive = (this.name || index2) === this.parentData.value;
      },
      updateParentData() {
        this.getParentData("uv-tabbar");
      },
      // 此方法将会被父组件uv-tabbar调用
      updateFromParent() {
        this.init();
      },
      clickHandler() {
        this.$nextTick(() => {
          const index2 = this.parent.children.indexOf(this);
          const name = this.name || index2;
          if (name !== this.parent.value) {
            this.parent.$emit("change", name);
          }
          this.$emit("click", name);
        });
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$h);
    const _component_uv_badge = resolveEasycom(vue.resolveDynamicComponent("uv-badge"), __easycom_1$4);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-tabbar-item",
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.createElementVNode("view", { class: "uv-tabbar-item__icon" }, [
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 0,
            name: _ctx.icon,
            color: $data.isActive ? $data.parentData.activeColor : $data.parentData.inactiveColor,
            size: _ctx.iconSize ? _ctx.iconSize : $data.parentData.iconSize
          }, null, 8, ["name", "color", "size"])) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              $data.isActive ? vue.renderSlot(_ctx.$slots, "active-icon", { key: 0 }, void 0, true) : vue.renderSlot(_ctx.$slots, "inactive-icon", { key: 1 }, void 0, true)
            ],
            64
            /* STABLE_FRAGMENT */
          )),
          vue.createVNode(_component_uv_badge, {
            absolute: "",
            offset: [0, _ctx.dot ? "34rpx" : _ctx.badge > 9 ? "14rpx" : "20rpx"],
            customStyle: _ctx.badgeStyle,
            isDot: _ctx.dot,
            value: _ctx.badge || (_ctx.dot ? 1 : null),
            show: _ctx.dot || _ctx.badge > 0
          }, null, 8, ["offset", "customStyle", "isDot", "value", "show"])
        ]),
        vue.renderSlot(_ctx.$slots, "text", {}, () => [
          vue.createElementVNode(
            "text",
            {
              class: "uv-tabbar-item__text",
              style: vue.normalizeStyle({
                color: $data.isActive ? $data.parentData.activeColor : $data.parentData.inactiveColor
              })
            },
            vue.toDisplayString(_ctx.text),
            5
            /* TEXT, STYLE */
          )
        ], true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-f9097980"], ["__file", "E:/BankSystem/user/uni_modules/uv-tabbar/components/uv-tabbar-item/uv-tabbar-item.vue"]]);
  const props = {
    props: {
      // 当前匹配项的name
      value: {
        type: [String, Number, null],
        default: null
      },
      // 是否为iPhoneX留出底部安全距离
      safeAreaInsetBottom: {
        type: Boolean,
        default: true
      },
      // 是否显示上方边框
      border: {
        type: Boolean,
        default: true
      },
      // 元素层级z-index
      zIndex: {
        type: [String, Number],
        default: 9
      },
      // 选中标签的颜色
      activeColor: {
        type: String,
        default: "#1989fa"
      },
      // 未选中标签的颜色
      inactiveColor: {
        type: String,
        default: "#7d7e80"
      },
      // 是否固定在底部
      fixed: {
        type: Boolean,
        default: true
      },
      // fixed定位固定在底部时，是否生成一个等高元素防止塌陷
      placeholder: {
        type: Boolean,
        default: true
      },
      // 图标大小
      iconSize: {
        type: [String, Number],
        default: 20
      },
      ...(_fa = (_ea = uni.$uv) == null ? void 0 : _ea.props) == null ? void 0 : _fa.tabbar
    }
  };
  const _sfc_main$5 = {
    name: "uv-tabbar",
    mixins: [mpMixin, mixin, props],
    data() {
      return {
        placeholderHeight: 0
      };
    },
    computed: {
      tabbarStyle() {
        const style = {
          zIndex: this.zIndex
        };
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      // 监听多个参数的变化，通过在computed执行对应的操作
      updateChild() {
        return [this.value, this.activeColor, this.inactiveColor];
      },
      updatePlaceholder() {
        return [this.fixed, this.placeholder];
      }
    },
    watch: {
      updateChild() {
        this.updateChildren();
      },
      updatePlaceholder() {
        this.setPlaceholderHeight();
      }
    },
    created() {
      this.children = [];
    },
    mounted() {
      this.setPlaceholderHeight();
    },
    methods: {
      updateChildren() {
        this.children.length && this.children.map((child) => child.updateFromParent());
      },
      // 设置用于防止塌陷元素的高度
      async setPlaceholderHeight() {
        if (!this.fixed || !this.placeholder)
          return;
        await this.$uv.sleep(20);
        this.$uvGetRect(".uv-tabbar__content").then(({ height = 50 }) => {
          this.placeholderHeight = height;
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_safe_bottom = resolveEasycom(vue.resolveDynamicComponent("uv-safe-bottom"), __easycom_0$8);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-tabbar" }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uv-tabbar__content", [_ctx.border && "uv-border-top", _ctx.fixed && "uv-tabbar--fixed"]]),
          ref: "uv-tabbar__content",
          onTouchmove: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop", "prevent"])),
          style: vue.normalizeStyle([$options.tabbarStyle])
        },
        [
          vue.createElementVNode("view", { class: "uv-tabbar__content__item-wrapper" }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ]),
          _ctx.safeAreaInsetBottom ? (vue.openBlock(), vue.createBlock(_component_uv_safe_bottom, { key: 0 })) : vue.createCommentVNode("v-if", true)
        ],
        38
        /* CLASS, STYLE, HYDRATE_EVENTS */
      ),
      _ctx.placeholder ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "uv-tabbar__placeholder",
          style: vue.normalizeStyle({
            height: $data.placeholderHeight + "px"
          })
        },
        null,
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-cae58123"], ["__file", "E:/BankSystem/user/uni_modules/uv-tabbar/components/uv-tabbar/uv-tabbar.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        showDetail: false,
        showButton: true,
        model1: {
          userInfo: {
            num: "",
            name: "",
            ename: "",
            cardType: "",
            cardNumber: "",
            country: "",
            nation: "",
            sex: "",
            bornTime: "",
            bornPlace: ""
          },
          cardInfo: {
            country: "",
            region: "",
            detailAddress: ""
          },
          addressInfo: {
            country: "",
            region: "",
            detailAddress: "",
            zipCode: ""
          },
          workInfo: {
            profession: "",
            workPlaceName: "",
            schoolName: "",
            sector: "",
            salaryInterval: ""
          },
          phonenumber: "",
          pickDate: ""
        },
        rule1: {
          "userInfo.num": {
            tpye: "number",
            required: true,
            trigger: ["change"]
          },
          "userInfo.name": {
            tpye: "string",
            required: true,
            trigger: ["change"],
            message: "姓名不能为空"
          },
          "userInfo.sex": {
            tpye: "string",
            required: true,
            trigger: ["change"]
          },
          "addressInfo.zipCode": {
            tpye: "number",
            require: true,
            trigger: ["change"],
            len: 6,
            message: "请输入6位的有效邮编"
          }
        }
      };
    },
    onReady() {
      this.$refs.form1.setRules(this.rule1);
      let that = this;
      formatAppLog("log", "at pages/modifyPersonalInformationResult/modifyPersonalInformationResult.vue:174", 1);
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on("newnewpersonalInformation", (data) => {
        formatAppLog("log", "at pages/modifyPersonalInformationResult/modifyPersonalInformationResult.vue:177", data);
        that.model1.userInfo.num = data.num;
        that.model1.userInfo.name = data.name;
        that.model1.userInfo.ename = data.ename;
        that.model1.userInfo.cardNumber = data.cardNumber;
        that.model1.userInfo.nation = data.nation;
        that.model1.userInfo.sex = data.sex;
        that.model1.userInfo.bornTime = data.bornTime;
        that.model1.userInfo.bornPlace = data.bornPlace;
        that.model1.addressInfo.region = data.region;
        that.model1.addressInfo.detailAddress = data.detailAddress;
        that.model1.addressInfo.zipCode = data.zipCode;
        that.model1.workInfo.profession = data.profession;
        that.model1.workInfo.workPlaceName = data.workPlaceName;
        that.model1.workInfo.sector = data.sector;
        that.model1.workInfo.salaryInterval = data.salaryInterval;
        that.model1.phonenumber = data.phonenumber;
      });
    },
    methods: {
      returnHome() {
        uni.switchTab({
          url: "/pages/home/home",
          success: function(res) {
          }
        });
      },
      display() {
        this.showDetail = true;
        this.showButton = false;
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_tabbar_item = resolveEasycom(vue.resolveDynamicComponent("uv-tabbar-item"), __easycom_0);
    const _component_uv_tabbar = resolveEasycom(vue.resolveDynamicComponent("uv-tabbar"), __easycom_1);
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0$d);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1$b);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_2$6);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { style: { "background-color": "white" } }, [
        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "center", "background-color": "white" } }, [
          vue.createElementVNode("image", {
            src: "/static/success.jpg",
            style: { "justify-content": "center", "width": "100rpx", "height": "100rpx", "margin-top": "50rpx" },
            mode: "scaleToFill"
          })
        ]),
        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "center", "margin-top": "30rpx", "font-size": "120%", "background-color": "white" } }, [
          vue.createElementVNode("text", { style: { "margin-bottom": "40rpx" } }, "个人信息修改完成")
        ]),
        vue.withDirectives(vue.createElementVNode(
          "view",
          null,
          [
            vue.createElementVNode("button", {
              style: { "color": "blue", "background-color": "white" },
              onClick: _cache[0] || (_cache[0] = (...args) => $options.display && $options.display(...args))
            }, "查看详情")
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $data.showButton]
        ])
      ]),
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_uv_tabbar, {
          "active-color": "red",
          style: { "color": "red" }
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_tabbar_item, {
              text: "返回首页",
              onClick: $options.returnHome
            }, null, 8, ["onClick"])
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      vue.withDirectives(vue.createElementVNode(
        "view",
        null,
        [
          vue.createElementVNode("view", { style: { "margin-left": "20rpx" } }, [
            vue.createVNode(_component_uv_form, {
              model: $data.model1,
              rules: $data.rule1,
              ref: "form1",
              style: { "background": "white", "margin-right": "20rpx" }
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uv_form_item, {
                  label: "电子银行客户序号",
                  "label-width": "150rpx",
                  prop: "userInfo.number",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.userInfo.num,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.model1.userInfo.num = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uv_form_item, {
                  label: "姓名",
                  "label-width": "150rpx",
                  prop: "userInfo.name",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.userInfo.name,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.model1.userInfo.name = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uv_form_item, {
                  label: "英文/拼音姓名",
                  "label-width": "150rpx",
                  prop: "userInfo.ename",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.userInfo.ename,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.model1.userInfo.ename = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uv_form_item, {
                  label: "证件号码",
                  "label-width": "150rpx",
                  prop: "userInfo.cardNumber",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.userInfo.cardNumber,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.model1.userInfo.cardNumber = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uv_form_item, {
                  label: "民族",
                  "label-width": "150rpx",
                  prop: "userInfo.nation",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.userInfo.nation,
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.model1.userInfo.nation = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uv_form_item, {
                  label: "性别",
                  "label-width": "150rpx",
                  prop: "userInfo.sex",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.userInfo.sex,
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.model1.userInfo.sex = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uv_form_item, {
                  label: "出生日期",
                  "label-width": "150rpx",
                  prop: "userInfo.bornTime",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.userInfo.bornTime,
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.model1.userInfo.bornTime = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uv_form_item, {
                  label: "出生地",
                  "label-width": "150rpx",
                  prop: "userInfo.bornPlace",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.userInfo.bornPlace,
                      "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.model1.userInfo.bornPlace = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }, 8, ["model", "rules"])
          ]),
          vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx" } }, [
            vue.createElementVNode("text", null, "本人常住地址信息"),
            vue.createVNode(_component_uv_form, {
              model: $data.model1,
              rules: $data.rule1,
              ref: "form3",
              style: { "background": "white", "margin-right": "20rpx" }
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uv_form_item, {
                  label: "详细地址",
                  "label-width": "150rpx",
                  prop: "addressInfo.detailAddress",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.addressInfo.detailAddress,
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.model1.addressInfo.detailAddress = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uv_form_item, {
                  label: "邮编",
                  "label-width": "150rpx",
                  prop: "addressInfo.zipCode",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.addressInfo.zipCode,
                      "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.model1.addressInfo.zipCode = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }, 8, ["model", "rules"])
          ]),
          vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx" } }, [
            vue.createElementVNode("text", null, "工作信息"),
            vue.createVNode(_component_uv_form, {
              model: $data.model1,
              rules: $data.rule1,
              ref: "form4",
              style: { "background": "white", "margin-right": "20rpx" }
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uv_form_item, {
                  label: "职业",
                  "label-width": "150rpx",
                  prop: "workInfo.profession",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.workInfo.profession,
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.model1.workInfo.profession = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uv_form_item, {
                  label: "工作单位名称",
                  "label-width": "150rpx",
                  prop: "workInfo.workPlaceName",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.workInfo.workPlaceName,
                      "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.model1.workInfo.workPlaceName = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uv_form_item, {
                  label: "单位所属行业",
                  "label-width": "150rpx",
                  prop: "workInfo.sector",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.workInfo.sector,
                      "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $data.model1.workInfo.sector = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uv_form_item, {
                  label: "个人月收入区间",
                  "label-width": "150rpx",
                  prop: "workInfo.salaryInterval",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.workInfo.salaryInterval,
                      "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $data.model1.workInfo.salaryInterval = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }, 8, ["model", "rules"])
          ]),
          vue.createElementVNode("view", { style: { "margin-left": "20rpx", "margin-top": "20rpx" } }, [
            vue.createElementVNode("text", null, "联系信息"),
            vue.createVNode(_component_uv_form, {
              model: $data.model1,
              rules: $data.rule1,
              ref: "form5",
              style: { "background": "white", "margin-right": "20rpx" }
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uv_form_item, {
                  label: "手机号码",
                  "label-width": "150rpx",
                  prop: "phonenumber",
                  borderBottom: true
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      modelValue: $data.model1.phonenumber,
                      "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $data.model1.phonenumber = $event),
                      border: "none",
                      style: { "margin-left": "20rpx", "margin-right": "20rpx" },
                      readonly: true
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }, 8, ["model", "rules"])
          ]),
          vue.createElementVNode("view")
        ],
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $data.showDetail]
      ])
    ]);
  }
  const PagesModifyPersonalInformationResultModifyPersonalInformationResult = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "E:/BankSystem/user/pages/modifyPersonalInformationResult/modifyPersonalInformationResult.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        payee: "",
        num: "",
        payerNumer: "",
        payNum: "",
        time: ""
      };
    },
    methods: {
      returnHome() {
        uni.switchTab({
          url: "/pages/home/home",
          success: function(res) {
          }
        });
      }
    },
    onReady() {
      let that = this;
      uni.getStorage({
        key: "transactionId",
        success(res) {
          that.payNum = res.data;
        }
      });
      uni.getStorage({
        key: "transactionTime",
        success(res) {
          that.time = res.data;
        }
      });
      uni.getStorage({
        key: "tNum",
        success(res) {
          that.num = res.data;
        }
      });
      uni.getStorage({
        key: "payeeName",
        success(res) {
          that.payee = res.data;
        }
      });
      uni.getStorage({
        key: "payerNumber",
        success(res) {
          that.payerNumer = res.data;
        }
      });
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_tabbar_item = resolveEasycom(vue.resolveDynamicComponent("uv-tabbar-item"), __easycom_0);
    const _component_uv_tabbar = resolveEasycom(vue.resolveDynamicComponent("uv-tabbar"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { style: { "background-color": "white" } }, [
        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "center", "background-color": "white" } }, [
          vue.createElementVNode("image", {
            src: "/static/success.jpg",
            style: { "justify-content": "center", "width": "100rpx", "height": "100rpx", "margin-top": "50rpx" },
            mode: "scaleToFill"
          })
        ]),
        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "center", "margin-top": "30rpx", "font-size": "120%", "background-color": "white" } }, [
          vue.createElementVNode(
            "text",
            { style: { "margin-bottom": "40rpx" } },
            "向" + vue.toDisplayString($data.payee) + "成功付款" + vue.toDisplayString($data.num) + "元",
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { style: { "display": "flex", "margin-top": "20rpx" } }, [
          vue.createElementVNode("text", { style: { "margin-left": "20rpx" } }, "付款账户"),
          vue.createElementVNode(
            "text",
            { style: { "margin-left": "80rpx" } },
            vue.toDisplayString($data.payerNumer),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { style: { "display": "flex", "margin-top": "20rpx" } }, [
          vue.createElementVNode("text", { style: { "margin-left": "20rpx" } }, "交易时间"),
          vue.createElementVNode(
            "text",
            { style: { "margin-left": "80rpx" } },
            vue.toDisplayString($data.time),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { style: { "display": "flex", "margin-top": "20rpx" } }, [
          vue.createElementVNode("text", { style: { "margin-left": "20rpx" } }, "付款凭证号"),
          vue.createElementVNode(
            "text",
            { style: { "margin-left": "80rpx" } },
            vue.toDisplayString($data.payNum),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_uv_tabbar, {
          "active-color": "red",
          style: { "color": "red" }
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uv_tabbar_item, {
              text: "返回首页",
              onClick: $options.returnHome
            }, null, 8, ["onClick"])
          ]),
          _: 1
          /* STABLE */
        })
      ])
    ]);
  }
  const PagesCodeTransferResultCodeTransferResult = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "E:/BankSystem/user/pages/codeTransferResult/codeTransferResult.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {};
    },
    methods: {
      returnHome() {
        uni.switchTab({
          url: "/pages/home/home",
          success: function(res) {
          }
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_tabbar_item = resolveEasycom(vue.resolveDynamicComponent("uv-tabbar-item"), __easycom_0);
    const _component_uv_tabbar = resolveEasycom(vue.resolveDynamicComponent("uv-tabbar"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { style: { "background-color": "white" } }, [
        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "center", "background-color": "white" } }, [
          vue.createElementVNode("image", {
            src: "/static/success.jpg",
            style: { "justify-content": "center", "width": "100rpx", "height": "100rpx", "margin-top": "50rpx" },
            mode: "scaleToFill"
          })
        ]),
        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "center", "margin-top": "30rpx", "font-size": "120%", "background-color": "white" } }, [
          vue.createElementVNode("text", { style: { "margin-bottom": "40rpx" } }, "支付密码修改完成")
        ]),
        vue.createElementVNode("view", null, [
          vue.createVNode(_component_uv_tabbar, {
            "active-color": "red",
            style: { "color": "red" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_tabbar_item, {
                text: "返回首页",
                onClick: $options.returnHome
              }, null, 8, ["onClick"])
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ])
    ]);
  }
  const PagesModifyCodePResultModifyCodePResult = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "E:/BankSystem/user/pages/modifyCodePResult/modifyCodePResult.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        model1: {
          code: "",
          precode: "",
          newcode: "",
          confirmcode: ""
        },
        rule1: {}
      };
    },
    onReady() {
      this.$refs.form1.setRules(this.rule1);
    },
    methods: {
      turnToNext() {
        let that = this;
        if (that.model1.newcode === that.model1.confirmcode) {
          formatAppLog("log", "at pages/modifyPassword/modifyPassword.vue:54", 1);
          uni.getStorage({
            key: "token",
            success: function(res) {
              let _token = res.data;
              uni.request({
                url: "https://120.55.37.93/edit/setLoginPassword",
                method: "POST",
                header: {
                  "token": _token
                },
                data: {
                  "loginPassword": that.model1.newcode
                },
                success: function(res2) {
                  formatAppLog("log", "at pages/modifyPassword/modifyPassword.vue:70", res2);
                  if (res2.data.code == 200) {
                    uni.navigateTo({
                      url: "/pages/idVerification/idVerification",
                      success: function(res3) {
                      }
                    });
                  } else {
                    uni.showToast({
                      title: "弱密码",
                      icon: "error"
                    });
                  }
                },
                fail: function(error2) {
                  formatAppLog("log", "at pages/modifyPassword/modifyPassword.vue:89", "寄咯");
                }
              });
            },
            fail: function(error2) {
              formatAppLog("log", "at pages/modifyPassword/modifyPassword.vue:94", "获取token失败", error2);
            }
          });
        } else {
          formatAppLog("log", "at pages/modifyPassword/modifyPassword.vue:99", 2);
        }
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_0$d);
    const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_1$b);
    const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_2$6);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", null, [
        vue.createElementVNode("view", { style: { "margin-top": "20rpx" } }, [
          vue.createVNode(_component_uv_form, {
            style: { "margin-top": "20rpx", "margin-left": "20rpx" },
            model: $data.model1,
            rules: $data.rule1,
            ref: "form1"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(
                _component_uv_form_item,
                {
                  label: "原密码",
                  "label-width": "120px",
                  style: { "background-color": "white" },
                  prop: "precode",
                  ref: "item1"
                },
                {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      border: "none",
                      modelValue: $data.model1.precode,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.model1.precode = $event),
                      placeholder: "请输入(如果未设置请为空)",
                      type: "password"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"]),
          vue.createElementVNode("view", { style: { "text-align": "right", "margin-top": "30rpx" } }, [
            vue.createElementVNode("text", { style: { "color": "blue" } }, "忘记密码？")
          ]),
          vue.createVNode(_component_uv_form, {
            style: { "margin-top": "30rpx", "margin-left": "20rpx" },
            model: $data.model1,
            rules: $data.rule1,
            ref: "form1"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(
                _component_uv_form_item,
                {
                  label: "新密码",
                  "label-width": "120px",
                  style: { "background-color": "white" },
                  prop: "newcode",
                  ref: "item1"
                },
                {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      border: "none",
                      modelValue: $data.model1.newcode,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.model1.newcode = $event),
                      placeholder: "请输入",
                      type: "password"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              ),
              vue.createVNode(
                _component_uv_form_item,
                {
                  label: "确认密码",
                  "label-width": "120px",
                  style: { "background-color": "white", "margin-top": "40rpx" },
                  prop: "confirmcode",
                  ref: "item1"
                },
                {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uv_input, {
                      border: "none",
                      modelValue: $data.model1.confirmcode,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.model1.confirmcode = $event),
                      placeholder: "请输入",
                      type: "password"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "rules"])
        ]),
        vue.createElementVNode("view", { style: { "margin-top": "80rpx" } }, [
          vue.createElementVNode("button", {
            style: { "color": "white", "background-color": "blue" },
            onClick: _cache[3] || (_cache[3] = (...args) => $options.turnToNext && $options.turnToNext(...args))
          }, "确认")
        ])
      ])
    ]);
  }
  const PagesModifyPasswordModifyPassword = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "E:/BankSystem/user/pages/modifyPassword/modifyPassword.vue"]]);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/home/home", PagesHomeHome);
  __definePage("pages/myself/myself", PagesMyselfMyself);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/register/register", PagesRegisterRegister);
  __definePage("pages/transfer/transfer", PagesTransferTransfer);
  __definePage("pages/transferRecord/transferRecord", PagesTransferRecordTransferRecord);
  __definePage("pages/transferDetail/transferDetail", PagesTransferDetailTransferDetail);
  __definePage("pages/securityAndSettings/securityAndSettings", PagesSecurityAndSettingsSecurityAndSettings);
  __definePage("pages/accountView/accountView", PagesAccountViewAccountView);
  __definePage("pages/accountDetail/accountDetail", PagesAccountDetailAccountDetail);
  __definePage("pages/modifyPersonalInformation/modifyPersonalInformation", PagesModifyPersonalInformationModifyPersonalInformation);
  __definePage("pages/personalInformation/personalInformation", PagesPersonalInformationPersonalInformation);
  __definePage("pages/transferNotice/transferNotice", PagesTransferNoticeTransferNotice);
  __definePage("pages/transactionRecord/transactionRecord", PagesTransactionRecordTransactionRecord);
  __definePage("pages/transactionDetail/transactionDetail", PagesTransactionDetailTransactionDetail);
  __definePage("pages/monthIE/monthIE", PagesMonthIEMonthIE);
  __definePage("pages/login-message/login-message", PagesLoginMessageLoginMessage);
  __definePage("pages/transferConfirm/transferConfirm", PagesTransferConfirmTransferConfirm);
  __definePage("pages/transferResult/transferResult", PagesTransferResultTransferResult);
  __definePage("pages/findOne/findOne", PagesFindOneFindOne);
  __definePage("pages/findTwo/findTwo", PagesFindTwoFindTwo);
  __definePage("pages/transferCloose/transferCloose", PagesTransferClooseTransferCloose);
  __definePage("pages/setPassword/setPassword", PagesSetPasswordSetPassword);
  __definePage("pages/bindIdCard/bindIdCard", PagesBindIdCardBindIdCard);
  __definePage("pages/idVerification/idVerification", PagesIdVerificationIdVerification);
  __definePage("pages/phoneCode/phoneCode", PagesPhoneCodePhoneCode);
  __definePage("pages/phoneNumber/phoneNumber", PagesPhoneNumberPhoneNumber);
  __definePage("pages/resetPassword/resetPassword", PagesResetPasswordResetPassword);
  __definePage("pages/confirmModifyPersonalInformation/confirmModifyPersonalInformation", PagesConfirmModifyPersonalInformationConfirmModifyPersonalInformation);
  __definePage("pages/QRcode/QRcode", PagesQRcodeQRcode);
  __definePage("pages/setBalance/setBalance", PagesSetBalanceSetBalance);
  __definePage("pages/codeTransfer/codeTransfer", PagesCodeTransferCodeTransfer);
  __definePage("pages/chooseCard/chooseCard", PagesChooseCardChooseCard);
  __definePage("pages/modifyPaymentCode/modifyPaymentCode", PagesModifyPaymentCodeModifyPaymentCode);
  __definePage("pages/modifyPersonalInformationResult/modifyPersonalInformationResult", PagesModifyPersonalInformationResultModifyPersonalInformationResult);
  __definePage("pages/codeTransferResult/codeTransferResult", PagesCodeTransferResultCodeTransferResult);
  __definePage("pages/modifyCodePResult/modifyCodePResult", PagesModifyCodePResultModifyCodePResult);
  __definePage("pages/modifyPassword/modifyPassword", PagesModifyPasswordModifyPassword);
  const _sfc_main = {
    globalData: {
      islogin: false
    },
    onLaunch: function() {
      formatAppLog("warn", "at App.vue:7", "当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
      formatAppLog("log", "at App.vue:8", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:11", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:14", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/BankSystem/user/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
