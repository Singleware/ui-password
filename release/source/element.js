"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const JSX = require("@singleware/jsx");
/**
 * Password element.
 */
let Element = class Element extends HTMLElement {
    /**
     * Default constructor.
     */
    constructor() {
        super();
        /**
         * Validation patterns.
         */
        this.patterns = {};
        /**
         * Validation strength.
         */
        this.strength = 0;
        /**
         * Password slot element.
         */
        this.passwordSlot = JSX.create("slot", { name: "password", class: "password" });
        /**
         * Confirmation slot element.
         */
        this.confirmationSlot = JSX.create("slot", { name: "confirmation", class: "confirmation" });
        /**
         * Strength slot element.
         */
        this.strengthSlot = JSX.create("slot", { name: "strength", class: "strength" });
        /**
         * Password layout element.
         */
        this.passwordLayout = (JSX.create("div", { class: "password" },
            JSX.create("div", { class: "field" },
                this.passwordSlot,
                this.confirmationSlot),
            this.strengthSlot));
        /**
         * Password styles element.
         */
        this.passwordStyles = (JSX.create("style", null, `:host > .password {
  display: flex;
  flex-direction: column;
}
:host > .password > .field {
  display: flex;
}
:host > .password > .field::slotted(*) {
  width: 100%;
  min-width: 0px;
}
:host > .password > .field,
:host([orientation='row']) > .password > .field {
  flex-direction: row;
}
:host([orientation='column']) > .password > .field {
  flex-direction: column;
}`));
        const shadow = JSX.append(this.attachShadow({ mode: 'closed' }), this.passwordStyles, this.passwordLayout);
        const options = { capture: true, passive: true };
        const callback = this.changeHandler.bind(this);
        shadow.addEventListener('slotchange', callback, options);
        shadow.addEventListener('change', callback, options);
        shadow.addEventListener('keyup', callback, options);
        this.passwordSlot.addEventListener('keydown', this.clearConfirmationHandler.bind(this), options);
    }
    /**
     * Gets the first child element from specified slot element.
     * @param slot Slot element.
     * @throws Throws an error when there are no children in the specified slot.
     * @returns Returns the first child element.
     */
    getChildElement(slot) {
        const child = slot.assignedNodes()[0];
        if (!child) {
            throw new Error(`There are no children in the '${slot.name}' slot.`);
        }
        return child;
    }
    /**
     * Sets the property into the first child from specified slot element.
     * @param slot Slot element.
     * @param property Property name.
     * @param value Property value.
     * @throws Throws an error when there are no children in the specified slot.
     * @returns Returns true when the specified property has been assigned, false otherwise.
     */
    setChildProperty(slot, property, value) {
        const child = this.getChildElement(slot);
        if (property in child) {
            child[property] = value;
            return true;
        }
        return false;
    }
    /**
     * Gets the property from the first child in the specified slot element.
     * @param slot Slot element.
     * @param property Property name.
     * @returns Returns the property value.
     * @throws Throws an error when there are no children in the specified slot.
     */
    getChildProperty(slot, property) {
        return this.getChildElement(slot)[property];
    }
    /**
     * Updates the specified state in the element.
     * @param name State name.
     * @param state State value.
     */
    updateState(name, state) {
        if (state) {
            this.setAttribute(name, '');
        }
        else {
            this.removeAttribute(name);
        }
    }
    /**
     * Gets the empty state from the specified element.
     * @param element Element instance.
     * @returns Returns true when the element is empty or false otherwise.
     */
    getEmptyState(element) {
        if ('empty' in element) {
            return element.empty;
        }
        else {
            return element.value === void 0 || (typeof element.value === 'string' && element.value.length === 0);
        }
    }
    /**
     * Resets the specified element to its default value.
     * @param element Element instance.
     */
    resetElement(element) {
        if (element.reset instanceof Function) {
            element.reset();
        }
        else if ('value' in element) {
            element.value = element.defaultValue;
        }
    }
    /**
     * Validates the current password.
     */
    validatePassword() {
        const password = this.getChildElement(this.passwordSlot);
        const confirmation = this.getChildElement(this.confirmationSlot);
        const strength = this.getChildElement(this.strengthSlot);
        let current = 0;
        let maximum = 0;
        for (const strength in this.patterns) {
            const level = parseInt(strength);
            if (this.patterns[strength].test(password.value)) {
                current = Math.max(current, level);
            }
            maximum = Math.max(maximum, level);
        }
        strength.total = maximum;
        strength.value = current;
        password.setCustomValidity(this.strength > current ? `Password strength too weak.` : ``);
        confirmation.setCustomValidity(password.value !== confirmation.value ? `Password string must be equal.` : ``);
    }
    /**
     * Change, event handler.
     */
    changeHandler() {
        this.validatePassword();
        this.updateState('empty', this.empty);
        this.updateState('invalid', !this.empty && !this.checkValidity());
    }
    /**
     * Clear confirmation, event handler.
     */
    clearConfirmationHandler() {
        this.resetElement(this.getChildElement(this.confirmationSlot));
    }
    /**
     * Determines whether the element is empty or not.
     */
    get empty() {
        const password = this.getChildElement(this.passwordSlot);
        const confirmation = this.getChildElement(this.confirmationSlot);
        return this.getEmptyState(password) && this.getEmptyState(confirmation);
    }
    /**
     * Gets the element name.
     */
    get name() {
        return this.getChildProperty(this.passwordSlot, 'name');
    }
    /**
     * Sets the element name.
     */
    set name(name) {
        this.setChildProperty(this.passwordSlot, 'name', name);
    }
    /**
     * Gets the element value.
     */
    get value() {
        return this.getChildProperty(this.passwordSlot, 'value');
    }
    /**
     * Sets the element value.
     */
    set value(value) {
        this.setChildProperty(this.passwordSlot, 'value', value);
    }
    /**
     * Gets the default value of the element.
     */
    get defaultValue() {
        return this.getChildProperty(this.passwordSlot, 'defaultValue');
    }
    /**
     * Sets the default value of the element.
     */
    set defaultValue(value) {
        this.setChildProperty(this.passwordSlot, 'defaultValue', value);
    }
    /**
     * Gets the required state of the element.
     */
    get required() {
        return this.hasAttribute('required');
    }
    /**
     * Sets the required state of the element.
     */
    set required(state) {
        this.updateState('required', this.setChildProperty(this.passwordSlot, 'required', state) &&
            this.setChildProperty(this.confirmationSlot, 'required', state) &&
            state);
    }
    /**
     * Gets the read-only state of the element.
     */
    get readOnly() {
        return this.hasAttribute('readonly');
    }
    /**
     * Sets the read-only state of the element.
     */
    set readOnly(state) {
        this.updateState('readonly', this.setChildProperty(this.passwordSlot, 'readOnly', state) &&
            this.setChildProperty(this.confirmationSlot, 'readOnly', state) &&
            state);
    }
    /**
     * Gets the disabled state of the element.
     */
    get disabled() {
        return this.hasAttribute('disabled');
    }
    /**
     * Sets the disabled state of the element.
     */
    set disabled(state) {
        this.updateState('disabled', this.setChildProperty(this.passwordSlot, 'disabled', state) &&
            this.setChildProperty(this.confirmationSlot, 'disabled', state) &&
            state);
    }
    /**
     * Gets the element orientation.
     */
    get orientation() {
        return this.getAttribute('orientation') || 'row';
    }
    /**
     * Sets the element orientation.
     */
    set orientation(orientation) {
        this.setAttribute('orientation', orientation);
    }
    /**
     * Move the focus to this element.
     */
    focus() {
        const password = this.getChildElement(this.passwordSlot);
        const confirmation = this.getChildElement(this.confirmationSlot);
        if (password.focus instanceof Function && confirmation.focus instanceof Function) {
            if (this.getEmptyState(password)) {
                password.focus();
            }
            else if (this.getEmptyState(confirmation)) {
                confirmation.focus();
            }
            else {
                password.focus();
            }
        }
        else if (password.focus instanceof Function) {
            password.focus();
        }
        else if (confirmation.focus instanceof Function) {
            confirmation.focus();
        }
    }
    /**
     * Reset the element value to its initial value.
     */
    reset() {
        const password = this.getChildElement(this.passwordSlot);
        const confirmation = this.getChildElement(this.confirmationSlot);
        this.resetElement(password);
        this.resetElement(confirmation);
    }
    /**
     * Checks the element validity.
     * @returns Returns true when the element is valid, false otherwise.
     */
    checkValidity() {
        const password = this.getChildElement(this.passwordSlot);
        const confirmation = this.getChildElement(this.confirmationSlot);
        return ((!(password.checkValidity instanceof Function) || password.checkValidity()) &&
            (!(confirmation.checkValidity instanceof Function) || confirmation.checkValidity()));
    }
};
__decorate([
    Class.Public()
], Element.prototype, "patterns", void 0);
__decorate([
    Class.Public()
], Element.prototype, "strength", void 0);
__decorate([
    Class.Private()
], Element.prototype, "passwordSlot", void 0);
__decorate([
    Class.Private()
], Element.prototype, "confirmationSlot", void 0);
__decorate([
    Class.Private()
], Element.prototype, "strengthSlot", void 0);
__decorate([
    Class.Private()
], Element.prototype, "passwordLayout", void 0);
__decorate([
    Class.Private()
], Element.prototype, "passwordStyles", void 0);
__decorate([
    Class.Private()
], Element.prototype, "getChildElement", null);
__decorate([
    Class.Private()
], Element.prototype, "setChildProperty", null);
__decorate([
    Class.Private()
], Element.prototype, "getChildProperty", null);
__decorate([
    Class.Private()
], Element.prototype, "updateState", null);
__decorate([
    Class.Private()
], Element.prototype, "getEmptyState", null);
__decorate([
    Class.Private()
], Element.prototype, "resetElement", null);
__decorate([
    Class.Private()
], Element.prototype, "validatePassword", null);
__decorate([
    Class.Private()
], Element.prototype, "changeHandler", null);
__decorate([
    Class.Private()
], Element.prototype, "clearConfirmationHandler", null);
__decorate([
    Class.Public()
], Element.prototype, "empty", null);
__decorate([
    Class.Public()
], Element.prototype, "name", null);
__decorate([
    Class.Public()
], Element.prototype, "value", null);
__decorate([
    Class.Public()
], Element.prototype, "defaultValue", null);
__decorate([
    Class.Public()
], Element.prototype, "required", null);
__decorate([
    Class.Public()
], Element.prototype, "readOnly", null);
__decorate([
    Class.Public()
], Element.prototype, "disabled", null);
__decorate([
    Class.Public()
], Element.prototype, "orientation", null);
__decorate([
    Class.Public()
], Element.prototype, "focus", null);
__decorate([
    Class.Public()
], Element.prototype, "reset", null);
__decorate([
    Class.Public()
], Element.prototype, "checkValidity", null);
Element = __decorate([
    JSX.Describe('swe-password'),
    Class.Describe()
], Element);
exports.Element = Element;
