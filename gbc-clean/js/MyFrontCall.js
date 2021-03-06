/// FOURJS_START_COPYRIGHT(D,2014)
/// Property of Four Js*
/// (c) Copyright Four Js 2014, 2016. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///	 in the United States and elsewhere
/// 
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

"use strict";

modulum('FrontCallService.modules.mymodule', ['FrontCallService'],
	/**
	 * @param {gbc} context
	 * @param {classes} cls
	 */
	function(context, cls) {
		context.FrontCallService.modules.mymodule = {

//NJM Replace the html within a tag with an id= the passed id.
			replace_html: function (id, value) {
				var elt = document.getElementById(id);
				if ( elt ) {
					elt.innerHTML = value;
					return ["0"];
				}
				else {
					return ["1"];
				}
			},

//NJM isMobile
			isMobile: function () {
				return [window.isMobile()];
			}

		};
	}
);
