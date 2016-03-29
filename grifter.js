(function() {
"use strict";

function Grifter() {
	this._c = {};
	this._v = {};
}

Grifter.prototype.define = function define( c, v ) {
	if( typeof this._c[c] === 'undefined' ) {
		this._c[c] = v;
	}
	else {
		throw new Error( 'Cannot redeclare constant ' + c );
	}
};

window.grifter = function grifter() {
	return new Proxy( new Grifter, {
		get: function get(obj, name) {
			if( typeof obj[name] === 'undefined' ) {
				return obj._c[name] || obj._v[name];
			}
			else {
				return obj[name];
			}
		},
		set: function set(obj, name, val) {
			if( typeof obj._c[name] === 'undefined' ) {
				obj._v[name] = val;
			}
			else {
				throw new Error( 'Cannot modify constant ' + name );
			}
		},
		deleteProperty: function deleteProperty(obj, key) {
			if( typeof obj._c[key] !== 'undefined' ) {
				delete obj._c[key];
			}

			else if( typeof obj._v[key] !== 'undefined' ) {
				delete obj._v[key];
			}

			else {
				throw new Error(key + ' is not defined');
			}
		}
	});
};

})();
