/// FOURJS_START_COPYRIGHT(D,2015)
/// Property of Four Js*
/// (c) Copyright Four Js 2015, 2023. All Rights Reserved.
/// * Trademark of Four Js Development Tools Europe Ltd
///   in the United States and elsewhere
///
/// This file can be modified by licensees according to the
/// product manual.
/// FOURJS_END_COPYRIGHT

'use strict';

modulum('MyDateEditWidget', ['DateEditWidget'],
  function(context, cls) {

    /**
     * DateEdit widget using pikaday.
     * @class DateEditWidget
     * @memberOf classes
     * @extends classes.DateEditWidgetBase
     * @publicdoc Widgets
     */
    cls.MyDateEditWidget = context.oo.Class(cls.DateEditWidget, function($super) {
      return /** @lends classes.DateEditWidget.prototype */ {
        __name: 'DateEditWidget',

        /**
         * Button Today
         * @type {classes.ButtonWidget}
         */
        _buttonToday: null,

        /**
         * Create calendar container depending of the calendarType 4ST style attribute.
         * By default we use modal style
         * @param {boolean} isModal - true if we use modal style
         */
        _createCalendarContainer: function(isModal) {

          // destroy previous calendar container
          this._destroyCalendarContainer();

          this._dropDown = cls.WidgetFactory.createWidget('DropDown', this.getBuildParameters());
          this._dropDown.setParentWidget(this);
          this._dropDown.maxHeight = gbc.ThemeService.getValue("theme-font-size-ratio") * this._coeffMaxHeight;
          if (!this._themeHandleRegistration) {
            this._themeHandleRegistration = context.ThemeService.whenThemeChanged(function() {
              this._dropDown.maxHeight = gbc.ThemeService.getValue("theme-font-size-ratio") * this._coeffMaxHeight;
            }.bind(this));
          }

          // For some obscure reasons, iOS may not recognize pikaday library elements as children of dropdown.
          // We need to add a custom "pikaday specific" check
          this._dropDown.shouldClose = function(targetElement) {
            return !targetElement.parent(
              "pika-lendar"); // top pikaday div recognized as (wrongly!) having no parentNode under iOS mobile
          };

          if (isModal) { // MODAL
            // Create button which will close dropdown
            this._buttonCancel = cls.WidgetFactory.createWidget('Button', this.getBuildParameters());
            this._buttonCancel.setParentWidget(this);
            this._buttonCancel.addClass('gbc_DateEditButton');
            this._buttonCancel.setText(i18next.t('gwc.button.cancel'));
            this._buttonCancel.when(context.constants.widgetEvents.click, this._onCancel.bind(this));

            this._buttonOk = cls.WidgetFactory.createWidget('Button', this.getBuildParameters());
            this._buttonOk.setParentWidget(this);
            this._buttonOk.addClass('gbc_DateEditButton');
            this._buttonOk.setText(i18next.t('gwc.button.okay'));
            this._buttonOk.when(context.constants.widgetEvents.click, this._onOk.bind(this));

            this._buttonToday = cls.WidgetFactory.createWidget('Button', this.getBuildParameters());
            this._buttonToday.setParentWidget(this);
            this._buttonToday.addClass('gbc_DateEditButton');
            this._buttonToday.setText(i18next.t('gwc.button.today'));
            this._buttonToday.when(context.constants.widgetEvents.click, this._onToday.bind(this));

            this._dropDown.onOpen(this._onCalendarTypeModalOpen.bind(this));
            this._dropDown.onClose(this._onCalendarTypeModalClose.bind(this));

          } else { // DIRECT CLICK
            this._dropDown.onOpen(this._onCalendarTypeDropDownOpen.bind(this));
          }
        },

        /**
         * Destroy calendar container
         * @private
         */
        _destroyCalendarContainer: function() {
          if (this._dropDown) {
            this._dropDown.destroy();
            this._dropDown = null;
          }
          if (this._buttonToday) {
            this._buttonToday.destroy();
            this._buttonToday = null;
          }
          if (this._buttonCancel) {
            this._buttonCancel.destroy();
            this._buttonCancel = null;
          }
          if (this._themeHandleRegistration) {
            this._themeHandleRegistration();
            this._themeHandleRegistration = null;
          }
        },

        /**
         * @inheritDoc
         */
        managePriorityKeyDown: function(keyString, domKeyEvent, repeat) {
          let keyProcessed = false;

          if (this.isEnabled() && this._dropDown.isVisible()) {
            let day = null;
            keyProcessed = true;
            switch (keyString) {
              case "home":
                day = context.dayjs(this._picker.getDate()).startOf('month').toDate();
                break;
              case "end":
                day = context.dayjs(this._picker.getDate()).endOf('month').toDate();
                break;
              case "left":
                day = context.dayjs(this._picker.getDate()).subtract(1, 'days').toDate();
                break;
              case "right":
                day = context.dayjs(this._picker.getDate()).add(1, 'days').toDate();
                break;
              case "up":
                day = context.dayjs(this._picker.getDate()).subtract(1, 'weeks').toDate();
                break;
              case "down":
                day = context.dayjs(this._picker.getDate()).add(1, 'weeks').toDate();
                break;
              case "pageup":
                day = context.dayjs(this._picker.getDate()).subtract(1, 'month').toDate();
                break;
              case "pagedown":
                day = context.dayjs(this._picker.getDate()).add(1, 'month').toDate();
                break;
              case "return":
              case "enter":
                this._onOk();
                break;
              case "f1":
                this._onToday();
                break;
              case "esc":
                this._onCancel();
                break;
              case "tab":
              case "shift+tab":
                this._onCancel();
                keyProcessed = false;
                break;
              default:
                keyProcessed = false;
            }

            if (keyProcessed && day) {
              this._keyPressed = true;
              this._picker.setDate(day);
            }

            if (!keyProcessed && !this._isModal) {
              // When using dropdown style for the calendar, key pressed should close calendar
              this._mustValid = false;
              this._dropDown.hide();
            }
          }

          if (keyProcessed) {
            return true;
          } else {
            return $super.managePriorityKeyDown.call(this, keyString, domKeyEvent, repeat);
          }
        },

        /**
         * Handler today
         */
        _onToday: function() {
          this._inputElement.value = new Date().toJSON().slice(0, 10); // Todays date
					this._picker.setDate( this._inputElement.value ); // Doesn't seem to work everytime ?
          const newValue = this.getValue();
          this.setEditing(newValue !== this._oldValue);
          this.setCursors(newValue.length, -1); // set cursors to the end to help autonext check happening on valueChanged
          this.emit(context.constants.widgetEvents.valueChanged, newValue);
          //this._dropDown.hide();
        },

        /**
         * Add OK/Cancel buttons to calendar
         */
        _addButtonsToPicker: function() {
          if (this._buttonCancel && this._buttonOk && this._buttonToday) {
            this._dropDown.getElement().appendChild(this._buttonToday.getElement());
            this._dropDown.getElement().appendChild(this._buttonOk.getElement());
            this._dropDown.getElement().appendChild(this._buttonCancel.getElement());
          }
        },

        /**
         * Remove OK/Cancel buttons to calendar
         */
        _removeButtonsFromPicker: function() {
          if (this._buttonCancel && this._buttonOk && this._buttonToday) {
            try {
              this._dropDown.getElement().removeChild(this._buttonToday.getElement());
              this._dropDown.getElement().removeChild(this._buttonOk.getElement());
              this._dropDown.getElement().removeChild(this._buttonCancel.getElement());
            } catch (e) {}
          }
        }

      };
    });
    cls.WidgetFactory.registerBuilder('DateEdit', cls.MyDateEditWidget);
  });
