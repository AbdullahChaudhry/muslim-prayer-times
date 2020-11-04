(function() {
  "use strict";
  function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }
  function __metadata(metadataKey, metadataValue) {
    if ("object" === typeof Reflect && "function" === typeof Reflect.metadata) return Reflect.metadata(metadataKey, metadataValue);
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P((function(resolve) {
        resolve(value);
      }));
    }
    return new (P || (P = Promise))((function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    }));
  }
  function __generator(thisArg, body) {
    var _ = {
      label: 0,
      sent: function() {
        if (1 & t[0]) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    }, f, y, t, g;
    return g = {
      next: verb(0),
      throw: verb(1),
      return: verb(2)
    }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([ n, v ]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_) try {
        if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
        0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [ 2 & op[0], t.value ];
        switch (op[0]) {
         case 0:
         case 1:
          t = op;
          break;

         case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

         case 5:
          _.label++;
          y = op[1];
          op = [ 0 ];
          continue;

         case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;

         default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
            _ = 0;
            continue;
          }
          if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (6 === op[0] && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [ 6, e ];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (5 & op[0]) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  function Component(options) {
    return function decorator(cls) {
      Reflect.defineMetadata("component", options, cls);
    };
  }
  function toTwelveHour(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [ time ];
    if (time.length > 1) {
      // If time format correct
      time = time.slice(1);
 // Remove full string match value
            time[0] = +time[0] % 12 || 12;
 // Adjust hours
        }
    return time.join("");
  }
  function toPeriod(time) {
    return time.replace(/:/, ".");
  }
  function formatTime(time) {
    return toPeriod(toTwelveHour(time));
  }
  function compileTemplate(template, context) {
    return template.replace(/{{(.*)}}/g, (function(x) {
      var str = x.replace("{{", "").replace("}}", "");
      if (str.includes(".")) return str.split(".").reduce((function(prev, next) {
        return prev[next];
      }), context); else return context[str];
    }));
  }
  var store = {};
  function setUpBindings(template) {
    // key: propName, value: id
    var iterator = template.matchAll(/.*{{(.*)}}.*/g);
    var result = iterator.next();
    while (!result.done) if (result.value) {
      var element = result.value[0];
      var propName = result.value[1];
      var idMatch = element.match(/id=["|'](.*)["|']/);
      var id = idMatch[1];
      if (!store[propName]) store[propName] = document.getElementById(id);
      result = iterator.next();
    }
    console.log(store);
  }
  function update(instance) {
    Object.keys(store).forEach((function(key) {
      store[key].innerText = instance[key];
    }));
  }
  function render(instance) {
    var _a = Reflect.getMetadata("component", instance.constructor), selector = _a.selector, template = _a.template;
    var compiled = compileTemplate(template, instance);
    var appElem = document.getElementById(selector);
    appElem.innerHTML = compiled;
    setUpBindings(template);
    return Promise.resolve(1);
  }
  function bootstrapComponent(component) {
    var instance = new component;
    document.onreadystatechange = function() {
      if ("complete" === document.readyState) render(instance).then((function() {
        instance.init().then((function() {
          setTimeout((function() {
            update(instance);
          }), 5e3);
        }));
      }));
    };
  }
  function platformBrowserDynamic() {
    return {
      bootstrapComponent: bootstrapComponent
    };
  }
  var endpoint = "https://api.aladhan.com/v1/timingsByCity";
  var country = "United Kingdom";
  var city = "London";
  var method = 8;
  var url = endpoint + "?city=" + city + "&country=" + country + "&method=" + method;
  var PrayerTimesService = function() {
    function PrayerTimesService() {}
    PrayerTimesService.prototype.getPrayerTimes = function() {
      return fetch(url).then((function(url) {
        return url.json();
      })).then((function(res) {
        return res.data;
      }));
    };
    return PrayerTimesService;
  }();
  var WallpaperService = function() {
    function WallpaperService() {
      this.mosques = [ {
        filename: "mosque1.jpg"
      }, {
        filename: "mosque2.jpg"
      } ];
    }
    WallpaperService.prototype.getRandom = function() {
      var rand = Math.floor(Math.random() * this.mosques.length);
      var mosque = this.mosques[rand].filename;
      var imgPath = "src/static/img";
      var path = imgPath + "/" + mosque;
      return Promise.resolve(path);
    };
    return WallpaperService;
  }();
  var Reflect$1;
  (function(Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function(factory) {
      var root = "object" === typeof global ? global : "object" === typeof self ? self : "object" === typeof this ? this : Function("return this;")();
      var exporter = makeExporter(Reflect);
      if ("undefined" === typeof root.Reflect) root.Reflect = Reflect; else exporter = makeExporter(root.Reflect, exporter);
      factory(exporter);
      function makeExporter(target, previous) {
        return function(key, value) {
          if ("function" !== typeof target[key]) Object.defineProperty(target, key, {
            configurable: true,
            writable: true,
            value: value
          });
          if (previous) previous(key, value);
        };
      }
    })((function(exporter) {
      var hasOwn = Object.prototype.hasOwnProperty;
      // feature test for Symbol support
            var supportsSymbol = "function" === typeof Symbol;
      var toPrimitiveSymbol = supportsSymbol && "undefined" !== typeof Symbol.toPrimitive ? Symbol.toPrimitive : "@@toPrimitive";
      var iteratorSymbol = supportsSymbol && "undefined" !== typeof Symbol.iterator ? Symbol.iterator : "@@iterator";
      var supportsCreate = "function" === typeof Object.create;
 // feature test for Object.create support
            var supportsProto = {
        __proto__: []
      } instanceof Array;
 // feature test for __proto__ support
            var downLevel = !supportsCreate && !supportsProto;
      var HashMap = {
        // create an object in dictionary mode (a.k.a. "slow" mode in v8)
        create: supportsCreate ? function() {
          return MakeDictionary(Object.create(null));
        } : supportsProto ? function() {
          return MakeDictionary({
            __proto__: null
          });
        } : function() {
          return MakeDictionary({});
        },
        has: downLevel ? function(map, key) {
          return hasOwn.call(map, key);
        } : function(map, key) {
          return key in map;
        },
        get: downLevel ? function(map, key) {
          return hasOwn.call(map, key) ? map[key] : void 0;
        } : function(map, key) {
          return map[key];
        }
      };
      // Load global or shim versions of Map, Set, and WeakMap
            var functionPrototype = Object.getPrototypeOf(Function);
      var usePolyfill = "object" === typeof process && process.env && "true" === process.env["REFLECT_METADATA_USE_MAP_POLYFILL"];
      var _Map = !usePolyfill && "function" === typeof Map && "function" === typeof Map.prototype.entries ? Map : CreateMapPolyfill();
      var _Set = !usePolyfill && "function" === typeof Set && "function" === typeof Set.prototype.entries ? Set : CreateSetPolyfill();
      var _WeakMap = !usePolyfill && "function" === typeof WeakMap ? WeakMap : CreateWeakMapPolyfill();
      // [[Metadata]] internal slot
      // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
            var Metadata = new _WeakMap;
      function decorate(decorators, target, propertyKey, attributes) {
        if (!IsUndefined(propertyKey)) {
          if (!IsArray(decorators)) throw new TypeError;
          if (!IsObject(target)) throw new TypeError;
          if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes)) throw new TypeError;
          if (IsNull(attributes)) attributes = void 0;
          propertyKey = ToPropertyKey(propertyKey);
          return DecorateProperty(decorators, target, propertyKey, attributes);
        } else {
          if (!IsArray(decorators)) throw new TypeError;
          if (!IsConstructor(target)) throw new TypeError;
          return DecorateConstructor(decorators, target);
        }
      }
      exporter("decorate", decorate);
      // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
      // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
            function metadata(metadataKey, metadataValue) {
        function decorator(target, propertyKey) {
          if (!IsObject(target)) throw new TypeError;
          if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey)) throw new TypeError;
          OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        return decorator;
      }
      exporter("metadata", metadata);
      function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError;
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      exporter("defineMetadata", defineMetadata);
      function hasMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError;
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasMetadata", hasMetadata);
      function hasOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError;
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasOwnMetadata", hasOwnMetadata);
      function getMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError;
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
      }
      exporter("getMetadata", getMetadata);
      function getOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError;
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("getOwnMetadata", getOwnMetadata);
      function getMetadataKeys(target, propertyKey) {
        if (!IsObject(target)) throw new TypeError;
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryMetadataKeys(target, propertyKey);
      }
      exporter("getMetadataKeys", getMetadataKeys);
      function getOwnMetadataKeys(target, propertyKey) {
        if (!IsObject(target)) throw new TypeError;
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryOwnMetadataKeys(target, propertyKey);
      }
      exporter("getOwnMetadataKeys", getOwnMetadataKeys);
      function deleteMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError;
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
        if (IsUndefined(metadataMap)) return false;
        if (!metadataMap.delete(metadataKey)) return false;
        if (metadataMap.size > 0) return true;
        var targetMetadata = Metadata.get(target);
        targetMetadata.delete(propertyKey);
        if (targetMetadata.size > 0) return true;
        Metadata.delete(target);
        return true;
      }
      exporter("deleteMetadata", deleteMetadata);
      function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
          var decorator = decorators[i];
          var decorated = decorator(target);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsConstructor(decorated)) throw new TypeError;
            target = decorated;
          }
        }
        return target;
      }
      function DecorateProperty(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
          var decorator = decorators[i];
          var decorated = decorator(target, propertyKey, descriptor);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsObject(decorated)) throw new TypeError;
            descriptor = decorated;
          }
        }
        return descriptor;
      }
      function GetOrCreateMetadataMap(O, P, Create) {
        var targetMetadata = Metadata.get(O);
        if (IsUndefined(targetMetadata)) {
          if (!Create) return;
          targetMetadata = new _Map;
          Metadata.set(O, targetMetadata);
        }
        var metadataMap = targetMetadata.get(P);
        if (IsUndefined(metadataMap)) {
          if (!Create) return;
          metadataMap = new _Map;
          targetMetadata.set(P, metadataMap);
        }
        return metadataMap;
      }
      // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
      // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
            function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn) return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent)) return OrdinaryHasMetadata(MetadataKey, parent, P);
        return false;
      }
      // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
      // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
            function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap)) return false;
        return ToBoolean(metadataMap.has(MetadataKey));
      }
      // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
      // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
            function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn) return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent)) return OrdinaryGetMetadata(MetadataKey, parent, P);
        return;
      }
      // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
      // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
            function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap)) return;
        return metadataMap.get(MetadataKey);
      }
      // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
      // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
            function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
        metadataMap.set(MetadataKey, MetadataValue);
      }
      // 3.1.6.1 OrdinaryMetadataKeys(O, P)
      // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
            function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (null === parent) return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0) return ownKeys;
        if (ownKeys.length <= 0) return parentKeys;
        var set = new _Set;
        var keys = [];
        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
          var key = ownKeys_1[_i];
          var hasKey = set.has(key);
          if (!hasKey) {
            set.add(key);
            keys.push(key);
          }
        }
        for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
          var key = parentKeys_1[_a];
          var hasKey = set.has(key);
          if (!hasKey) {
            set.add(key);
            keys.push(key);
          }
        }
        return keys;
      }
      // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
      // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
            function OrdinaryOwnMetadataKeys(O, P) {
        var keys = [];
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap)) return keys;
        var keysObj = metadataMap.keys();
        var iterator = GetIterator(keysObj);
        var k = 0;
        while (true) {
          var next = IteratorStep(iterator);
          if (!next) {
            keys.length = k;
            return keys;
          }
          var nextValue = IteratorValue(next);
          try {
            keys[k] = nextValue;
          } catch (e) {
            try {
              IteratorClose(iterator);
            } finally {
              throw e;
            }
          }
          k++;
        }
      }
      // 6 ECMAScript Data Typ0es and Values
      // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
            function Type(x) {
        if (null === x) return 1 /* Null */;
        switch (typeof x) {
         case "undefined":
          return 0 /* Undefined */;

         case "boolean":
          return 2 /* Boolean */;

         case "string":
          return 3 /* String */;

         case "symbol":
          return 4 /* Symbol */;

         case "number":
          return 5 /* Number */;

         case "object":
          return null === x ? 1 /* Null */ : 6 /* Object */;

         default:
          return 6 /* Object */;
        }
      }
      // 6.1.1 The Undefined Type
      // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
            function IsUndefined(x) {
        return void 0 === x;
      }
      // 6.1.2 The Null Type
      // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
            function IsNull(x) {
        return null === x;
      }
      // 6.1.5 The Symbol Type
      // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
            function IsSymbol(x) {
        return "symbol" === typeof x;
      }
      // 6.1.7 The Object Type
      // https://tc39.github.io/ecma262/#sec-object-type
            function IsObject(x) {
        return "object" === typeof x ? null !== x : "function" === typeof x;
      }
      // 7.1 Type Conversion
      // https://tc39.github.io/ecma262/#sec-type-conversion
      // 7.1.1 ToPrimitive(input [, PreferredType])
      // https://tc39.github.io/ecma262/#sec-toprimitive
            function ToPrimitive(input, PreferredType) {
        switch (Type(input)) {
         case 0 /* Undefined */ :
          return input;

         case 1 /* Null */ :
          return input;

         case 2 /* Boolean */ :
          return input;

         case 3 /* String */ :
          return input;

         case 4 /* Symbol */ :
          return input;

         case 5 /* Number */ :
          return input;
        }
        var hint = 3 /* String */ === PreferredType ? "string" : 5 /* Number */ === PreferredType ? "number" : "default";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
        if (void 0 !== exoticToPrim) {
          var result = exoticToPrim.call(input, hint);
          if (IsObject(result)) throw new TypeError;
          return result;
        }
        return OrdinaryToPrimitive(input, "default" === hint ? "number" : hint);
      }
      // 7.1.1.1 OrdinaryToPrimitive(O, hint)
      // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
            function OrdinaryToPrimitive(O, hint) {
        if ("string" === hint) {
          var toString_1 = O.toString;
          if (IsCallable(toString_1)) {
            var result = toString_1.call(O);
            if (!IsObject(result)) return result;
          }
          var valueOf = O.valueOf;
          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result)) return result;
          }
        } else {
          var valueOf = O.valueOf;
          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result)) return result;
          }
          var toString_2 = O.toString;
          if (IsCallable(toString_2)) {
            var result = toString_2.call(O);
            if (!IsObject(result)) return result;
          }
        }
        throw new TypeError;
      }
      // 7.1.2 ToBoolean(argument)
      // https://tc39.github.io/ecma262/2016/#sec-toboolean
            function ToBoolean(argument) {
        return !!argument;
      }
      // 7.1.12 ToString(argument)
      // https://tc39.github.io/ecma262/#sec-tostring
            function ToString(argument) {
        return "" + argument;
      }
      // 7.1.14 ToPropertyKey(argument)
      // https://tc39.github.io/ecma262/#sec-topropertykey
            function ToPropertyKey(argument) {
        var key = ToPrimitive(argument, 3 /* String */);
        if (IsSymbol(key)) return key;
        return ToString(key);
      }
      // 7.2 Testing and Comparison Operations
      // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
      // 7.2.2 IsArray(argument)
      // https://tc39.github.io/ecma262/#sec-isarray
            function IsArray(argument) {
        return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : "[object Array]" === Object.prototype.toString.call(argument);
      }
      // 7.2.3 IsCallable(argument)
      // https://tc39.github.io/ecma262/#sec-iscallable
            function IsCallable(argument) {
        // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
        return "function" === typeof argument;
      }
      // 7.2.4 IsConstructor(argument)
      // https://tc39.github.io/ecma262/#sec-isconstructor
            function IsConstructor(argument) {
        // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
        return "function" === typeof argument;
      }
      // 7.2.7 IsPropertyKey(argument)
      // https://tc39.github.io/ecma262/#sec-ispropertykey
            function IsPropertyKey(argument) {
        switch (Type(argument)) {
         case 3 /* String */ :
          return true;

         case 4 /* Symbol */ :
          return true;

         default:
          return false;
        }
      }
      // 7.3 Operations on Objects
      // https://tc39.github.io/ecma262/#sec-operations-on-objects
      // 7.3.9 GetMethod(V, P)
      // https://tc39.github.io/ecma262/#sec-getmethod
            function GetMethod(V, P) {
        var func = V[P];
        if (void 0 === func || null === func) return;
        if (!IsCallable(func)) throw new TypeError;
        return func;
      }
      // 7.4 Operations on Iterator Objects
      // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
            function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method)) throw new TypeError;
 // from Call
                var iterator = method.call(obj);
        if (!IsObject(iterator)) throw new TypeError;
        return iterator;
      }
      // 7.4.4 IteratorValue(iterResult)
      // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
            function IteratorValue(iterResult) {
        return iterResult.value;
      }
      // 7.4.5 IteratorStep(iterator)
      // https://tc39.github.io/ecma262/#sec-iteratorstep
            function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
      }
      // 7.4.6 IteratorClose(iterator, completion)
      // https://tc39.github.io/ecma262/#sec-iteratorclose
            function IteratorClose(iterator) {
        var f = iterator["return"];
        if (f) f.call(iterator);
      }
      // 9.1 Ordinary Object Internal Methods and Internal Slots
      // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
      // 9.1.1.1 OrdinaryGetPrototypeOf(O)
      // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
            function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if ("function" !== typeof O || O === functionPrototype) return proto;
        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
        // Try to determine the superclass constructor. Compatible implementations
        // must either set __proto__ on a subclass constructor to the superclass constructor,
        // or ensure each class has a valid `constructor` property on its prototype that
        // points back to the constructor.
        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
        // This is the case when in ES6 or when using __proto__ in a compatible browser.
                if (proto !== functionPrototype) return proto;
        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
                var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (null == prototypeProto || prototypeProto === Object.prototype) return proto;
        // If the constructor was not a function, then we cannot determine the heritage.
                var constructor = prototypeProto.constructor;
        if ("function" !== typeof constructor) return proto;
        // If we have some kind of self-reference, then we cannot determine the heritage.
                if (constructor === O) return proto;
        // we have a pretty good guess at the heritage.
                return constructor;
      }
      // naive Map shim
            function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = function() {
          function MapIterator(keys, values, selector) {
            this._index = 0;
            this._keys = keys;
            this._values = values;
            this._selector = selector;
          }
          MapIterator.prototype["@@iterator"] = function() {
            return this;
          };
          MapIterator.prototype[iteratorSymbol] = function() {
            return this;
          };
          MapIterator.prototype.next = function() {
            var index = this._index;
            if (index >= 0 && index < this._keys.length) {
              var result = this._selector(this._keys[index], this._values[index]);
              if (index + 1 >= this._keys.length) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              } else this._index++;
              return {
                value: result,
                done: false
              };
            }
            return {
              value: void 0,
              done: true
            };
          };
          MapIterator.prototype.throw = function(error) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            throw error;
          };
          MapIterator.prototype.return = function(value) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            return {
              value: value,
              done: true
            };
          };
          return MapIterator;
        }();
        return function() {
          function Map() {
            this._keys = [];
            this._values = [];
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          }
          Object.defineProperty(Map.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: true,
            configurable: true
          });
          Map.prototype.has = function(key) {
            return this._find(key, /*insert*/ false) >= 0;
          };
          Map.prototype.get = function(key) {
            var index = this._find(key, /*insert*/ false);
            return index >= 0 ? this._values[index] : void 0;
          };
          Map.prototype.set = function(key, value) {
            var index = this._find(key, /*insert*/ true);
            this._values[index] = value;
            return this;
          };
          Map.prototype.delete = function(key) {
            var index = this._find(key, /*insert*/ false);
            if (index >= 0) {
              var size = this._keys.length;
              for (var i = index + 1; i < size; i++) {
                this._keys[i - 1] = this._keys[i];
                this._values[i - 1] = this._values[i];
              }
              this._keys.length--;
              this._values.length--;
              if (key === this._cacheKey) {
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              return true;
            }
            return false;
          };
          Map.prototype.clear = function() {
            this._keys.length = 0;
            this._values.length = 0;
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          };
          Map.prototype.keys = function() {
            return new MapIterator(this._keys, this._values, getKey);
          };
          Map.prototype.values = function() {
            return new MapIterator(this._keys, this._values, getValue);
          };
          Map.prototype.entries = function() {
            return new MapIterator(this._keys, this._values, getEntry);
          };
          Map.prototype["@@iterator"] = function() {
            return this.entries();
          };
          Map.prototype[iteratorSymbol] = function() {
            return this.entries();
          };
          Map.prototype._find = function(key, insert) {
            if (this._cacheKey !== key) this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
            if (this._cacheIndex < 0 && insert) {
              this._cacheIndex = this._keys.length;
              this._keys.push(key);
              this._values.push(void 0);
            }
            return this._cacheIndex;
          };
          return Map;
        }();
        function getKey(key, _) {
          return key;
        }
        function getValue(_, value) {
          return value;
        }
        function getEntry(key, value) {
          return [ key, value ];
        }
      }
      // naive Set shim
            function CreateSetPolyfill() {
        return function() {
          function Set() {
            this._map = new _Map;
          }
          Object.defineProperty(Set.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: true,
            configurable: true
          });
          Set.prototype.has = function(value) {
            return this._map.has(value);
          };
          Set.prototype.add = function(value) {
            return this._map.set(value, value), this;
          };
          Set.prototype.delete = function(value) {
            return this._map.delete(value);
          };
          Set.prototype.clear = function() {
            this._map.clear();
          };
          Set.prototype.keys = function() {
            return this._map.keys();
          };
          Set.prototype.values = function() {
            return this._map.values();
          };
          Set.prototype.entries = function() {
            return this._map.entries();
          };
          Set.prototype["@@iterator"] = function() {
            return this.keys();
          };
          Set.prototype[iteratorSymbol] = function() {
            return this.keys();
          };
          return Set;
        }();
      }
      // naive WeakMap shim
            function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = HashMap.create();
        var rootKey = CreateUniqueKey();
        return function() {
          function WeakMap() {
            this._key = CreateUniqueKey();
          }
          WeakMap.prototype.has = function(target) {
            var table = GetOrCreateWeakMapTable(target, /*create*/ false);
            return void 0 !== table ? HashMap.has(table, this._key) : false;
          };
          WeakMap.prototype.get = function(target) {
            var table = GetOrCreateWeakMapTable(target, /*create*/ false);
            return void 0 !== table ? HashMap.get(table, this._key) : void 0;
          };
          WeakMap.prototype.set = function(target, value) {
            var table = GetOrCreateWeakMapTable(target, /*create*/ true);
            table[this._key] = value;
            return this;
          };
          WeakMap.prototype.delete = function(target) {
            var table = GetOrCreateWeakMapTable(target, /*create*/ false);
            return void 0 !== table ? delete table[this._key] : false;
          };
          WeakMap.prototype.clear = function() {
            // NOTE: not a real clear, just makes the previous data unreachable
            this._key = CreateUniqueKey();
          };
          return WeakMap;
        }();
        function CreateUniqueKey() {
          var key;
          do {
            key = "@@WeakMap@@" + CreateUUID();
          } while (HashMap.has(keys, key));
          keys[key] = true;
          return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
          if (!hasOwn.call(target, rootKey)) {
            if (!create) return;
            Object.defineProperty(target, rootKey, {
              value: HashMap.create()
            });
          }
          return target[rootKey];
        }
        function FillRandomBytes(buffer, size) {
          for (var i = 0; i < size; ++i) buffer[i] = 255 * Math.random() | 0;
          return buffer;
        }
        function GenRandomBytes(size) {
          if ("function" === typeof Uint8Array) {
            if ("undefined" !== typeof crypto) return crypto.getRandomValues(new Uint8Array(size));
            if ("undefined" !== typeof msCrypto) return msCrypto.getRandomValues(new Uint8Array(size));
            return FillRandomBytes(new Uint8Array(size), size);
          }
          return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
          var data = GenRandomBytes(UUID_SIZE);
          // mark as random - RFC 4122 § 4.4
                    data[6] = 79 & data[6] | 64;
          data[8] = 191 & data[8] | 128;
          var result = "";
          for (var offset = 0; offset < UUID_SIZE; ++offset) {
            var byte = data[offset];
            if (4 === offset || 6 === offset || 8 === offset) result += "-";
            if (byte < 16) result += "0";
            result += byte.toString(16).toLowerCase();
          }
          return result;
        }
      }
      // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
            function MakeDictionary(obj) {
        obj.__ = void 0;
        delete obj.__;
        return obj;
      }
    }));
  })(Reflect$1 || (Reflect$1 = {}));
  // import 'reflect-metadata';
    var AppComponent = function() {
    function AppComponent(wallpaperService, prayerTimesService) {
      if (void 0 === wallpaperService) wallpaperService = new WallpaperService;
      if (void 0 === prayerTimesService) prayerTimesService = new PrayerTimesService;
      this.currentWallpaper = "-";
      this.gregorianDate = "-";
      this.hijriDate = "-";
      this.fajr = "-";
      this.sunrise = "-";
      this.dhuhr = "-";
      this.asr = "-";
      this.maghrib = "-";
      this.isha = "-";
      this.wallpaperService = wallpaperService;
      this.prayerTimesService = prayerTimesService;
    }
    AppComponent.prototype.setWallpaper = function(path) {
      document.body.style.backgroundImage = "url(" + path + ")";
      this.currentWallpaper = path;
    };
    AppComponent.prototype.setPrayerTimes = function(prayerTimes) {
      this.gregorianDate = prayerTimes.date.gregorian.weekday.en + ", " + prayerTimes.date.gregorian.day + " " + prayerTimes.date.gregorian.month.en + " " + prayerTimes.date.gregorian.year;
      this.hijriDate = prayerTimes.date.hijri.day + " " + prayerTimes.date.hijri.month.en + " " + prayerTimes.date.hijri.year;
      this.fajr = formatTime(prayerTimes.timings["Fajr" /* Fajr */ ]);
      this.sunrise = formatTime(prayerTimes.timings["Sunrise" /* Sunrise */ ]);
      this.dhuhr = formatTime(prayerTimes.timings["Dhuhr" /* Dhuhr */ ]);
      this.asr = formatTime(prayerTimes.timings["Asr" /* Asr */ ]);
      this.maghrib = formatTime(prayerTimes.timings["Maghrib" /* Maghrib */ ]);
      this.isha = formatTime(prayerTimes.timings["Isha" /* Isha */ ]);
    };
    AppComponent.prototype.init = function() {
      return __awaiter(this, void 0, void 0, (function() {
        var path, prayerTimes;
        return __generator(this, (function(_a) {
          switch (_a.label) {
           case 0:
            return [ 4 /*yield*/ , this.wallpaperService.getRandom() ];

           case 1:
            path = _a.sent();
            this.setWallpaper(path);
            return [ 4 /*yield*/ , this.prayerTimesService.getPrayerTimes() ];

           case 2:
            prayerTimes = _a.sent();
            this.setPrayerTimes(prayerTimes);
            return [ 2 /*return*/ ];
          }
        }));
      }));
    };
    AppComponent = __decorate([ Component({
      selector: "app",
      template: '\n    <div id="gregorianDate">{{gregorianDate}}</div>\n    <div id=\'hijriDate\'>{{hijriDate}}</div>\n    <div id="location"></div>\n    <hr>\n    <div id="container">\n      <div class="prayer">\n        <div class="prayer-name">Fajr</div>\n        <div class="prayer-time" id="fajr">{{fajr}}</div>\n      </div>\n      <div class="prayer">\n        <div class="prayer-name">Sunrise</div>\n        <div class="prayer-time" id="sunrise">{{sunrise}}</div>\n      </div>\n      <div class="prayer">\n        <div class="prayer-name">Zuhr</div>\n        <div class="prayer-time" id="dhuhr">{{dhuhr}}</div>\n      </div>\n      <div class="prayer">\n        <div class="prayer-name">Asr</div>\n        <div class="prayer-time" id="asr">{{asr}}</div>\n      </div>\n      <div class="prayer">\n        <div class="prayer-name">Maghrib</div>\n        <div class="prayer-time" id="maghrib">{{maghrib}}</div>\n      </div>\n      <div class="prayer">\n        <div class="prayer-name">Isha</div>\n        <div class="prayer-time" id="isha">{{isha}}</div>\n      </div>\n   </div>;'
    }), __metadata("design:paramtypes", [ Object, Object ]) ], AppComponent);
    return AppComponent;
  }();
  platformBrowserDynamic().bootstrapComponent(AppComponent);
})();
