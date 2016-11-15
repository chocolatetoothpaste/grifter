(function(exp) {
"use strict";

var _const = {};
var _var = {};

function Grifter() {
}

Grifter.prototype.define = function define( c, v ) {
	if( typeof _const[c] === 'undefined' ) {
		_const[c] = v;
	}
	else {
		throw new Error( 'Cannot redeclare constant ' + c );
	}
};

function grifter() {
	return new Proxy( new Grifter, {
		get: function get(obj, name) {
			return ( typeof obj[name] === 'undefined'
				? _const[name] || _var[name]
				: obj[name] );
		},
		set: function set(obj, name, val) {
			if( typeof _const[name] === 'undefined' ) {
				_var[name] = val;
			}
			else {
				throw new Error( 'Property conflicts with constant: ' + name );
			}
		},
		deleteProperty: function deleteProperty(obj, key) {
			if( typeof _const[key] !== 'undefined' ) {
				delete _const[key];
			}

			else if( typeof _var[key] !== 'undefined' ) {
				delete _var[key];
			}

			else {
				throw new Error(key + ' is not defined');
			}
		}
	});
};

// exp = grifter;

if( typeof module !== "undefined" && module.exports ) {
	module.exports = grifter;
}
else {
	window.grifter = grifter;
}

})( typeof module === 'undefined' ? (function() { window.grifter = {}; return window.grifter; })() : module.exports );
