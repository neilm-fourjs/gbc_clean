
/// FOURJS_START_COPYRIGHT(D,2015)
/// Property of Four Js*
/// (c) Copyright Four Js 2015, 2021. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

'use strict';

modulum('MyComboBoxWidget', ['ComboBoxWidget','ComboBoxWidgetBase', 'WidgetFactory'],
  function(context, cls) {

    /**
     * Combobox widget.
     * @class ComboBoxWidget
     * @memberOf classes
     * @extends classes.ComboBoxWidgetBase
     * @publicdoc Widgets
     */

    cls.MyComboBoxWidget = context.oo.Class(cls.ComboBoxWidget, function($super) {
      return /** @lends classes.ComboBoxWidget.prototype */ {
        __name: 'ComboBoxWidget',

        /** @type {string} */
        __dataContentPlaceholderSelector: '.gbc_dataContentPlaceholder',
        /** @type {classes.EditWidget}*/
        _editWidget: null,
        /** @type {classes.ListDropDownWidget} */
        _dropDown: null,
        /** @type {string} */
        _typedLetters: "",
        /** @function */
        _typedLettersCacheHandler: null,
        /** @function */
        _focusHandler: null,
        /** @function */
        _editFocusHandler: null,
        /** @function */
        _dropDownSelectHandler: null,
        /** @function */
        _visibilityChangeHandler: null,

        /** @type {HTMLElement} */
        _toggleIcon: null,

        /** @type {string} */
        _placeholderText: '',

        /** @type {string} */
        _currentValue: "",
        /** @type {string} */
        _lastVMValue: "",
        /** @type {boolean} */
        _allowMultipleValues: false,

        /**
         * Set widget mode. Useful when widget have peculiar behavior in certain mode
         * @param {string} mode the widget mode
         * @param {boolean} active the active state
         */
        setWidgetMode: function(mode, active) {
          if ( gbc.ThemeService.getValue("gbc-construct-legacy") ? 1 : 0 ) {
            this._allowMultipleValues = false;
          }
          else {
            this._allowMultipleValues = mode === "Construct";
          }
          this._dropDown.allowMultipleChoices(this._allowMultipleValues);
          this._updateEditState();
          this._updateTextTransform();
        }

      };
    });
    cls.WidgetFactory.registerBuilder('ComboBox', cls.MyComboBoxWidget);
    cls.WidgetFactory.registerBuilder('ComboBoxWidget', cls.MyComboBoxWidget);
  });
