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
const DOM = require("@singleware/jsx");
const Control = require("@singleware/ui-control");
/**
 * Password template class.
 */
let Template = class Template extends Control.Component {
    /**
     * Default constructor.
     * @param properties Password properties.
     * @param children Password children.
     */
    constructor(properties, children) {
        super(properties, children);
        /**
         * Input states.
         */
        this.states = {
            name: '',
            required: false,
            readOnly: false,
            disabled: false
        };
        /**
         * Password element.
         */
        this.passwordSlot = DOM.create("slot", { name: "password", class: "password" });
        /**
         * Confirmation element.
         */
        this.confirmationSlot = DOM.create("slot", { name: "confirmation", class: "confirmation" });
        /**
         * Strength element.
         */
        this.strengthSlot = DOM.create("slot", { name: "strength", class: "strength" });
        /**
         * Field element.
         */
        this.field = (DOM.create("div", { class: "field" },
            this.passwordSlot,
            this.confirmationSlot));
        /**
         * Wrapper element.
         */
        this.wrapper = (DOM.create("div", { class: "wrapper" },
            this.field,
            this.strengthSlot));
        /**
         * Input styles.
         */
        this.styles = (DOM.create("style", null, `:host > .wrapper {
  display: flex;
  flex-direction: column;
}
:host > .wrapper > .field {
  display: flex;
}
:host > .wrapper > .field::slotted(*) {
  width: 100%;
  min-width: 0px;
}
:host > .wrapper > .field,
:host([data-orientation='row']) > .wrapper > .field {
  flex-direction: row;
}
:host([data-orientation='column']) > .wrapper > .field {
  flex-direction: column;
}`));
        /**
         * Input skeleton.
         */
        this.skeleton = (DOM.create("div", { slot: this.properties.slot, class: this.properties.class }, this.children));
        DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.wrapper);
        this.bindHandlers();
        this.bindProperties();
        this.assignProperties();
    }
    /**
     * Validates the confirmation password.
     */
    validateConfirmation() {
        const confirmation = Control.getChildByProperty(this.confirmationSlot, 'value');
        if (confirmation) {
            confirmation.setCustomValidity(this.value !== confirmation.value ? `Password string must be equal.` : ``);
        }
    }
    /**
     * Validates the password strength.
     */
    validateStrength() {
        const password = Control.getChildByProperty(this.passwordSlot, 'value');
        const progress = Control.getChildByProperty(this.strengthSlot, 'value');
        let current = 0;
        let maximum = 0;
        for (const strength in this.properties.patterns) {
            const level = parseInt(strength);
            if (this.properties.patterns[strength].test(password.value)) {
                current = Math.max(current, level);
            }
            maximum = Math.max(maximum, level);
        }
        if (progress) {
            progress.total = maximum;
            progress.value = current;
        }
        password.setCustomValidity(this.properties.strength > current ? `Password strength too weak.` : ``);
    }
    /**
     * Change event handler.
     */
    changeHandler() {
        this.validateConfirmation();
        this.validateStrength();
    }
    /**
     * Bind event handlers to update the custom element.
     */
    bindHandlers() {
        this.skeleton.addEventListener('keyup', this.changeHandler.bind(this));
    }
    /**
     * Bind exposed properties to the custom element.
     */
    bindProperties() {
        this.bindComponentProperties(this.skeleton, [
            'name',
            'value',
            'defaultValue',
            'empty',
            'required',
            'readOnly',
            'disabled',
            'orientation',
            'reset'
        ]);
    }
    /**
     * Assign all elements properties.
     */
    assignProperties() {
        this.assignComponentProperties(this.properties, ['name', 'value', 'required', 'readOnly', 'disabled']);
        this.orientation = this.properties.orientation || 'row';
        this.changeHandler();
    }
    /**
     * Get input name.
     */
    get name() {
        return this.states.name;
    }
    /**
     * Set input name.
     */
    set name(name) {
        this.states.name = name;
    }
    /**
     * Get default password value.
     */
    get defaultValue() {
        return this.properties.value || '';
    }
    /**
     * Get input value.
     */
    get value() {
        return Control.getChildProperty(this.passwordSlot, 'value');
    }
    /**
     * Set input value.
     */
    set value(value) {
        Control.setChildProperty(this.passwordSlot, 'value', value);
    }
    /**
     * Get empty state.
     */
    get empty() {
        return this.value.length === 0;
    }
    /**
     * Get required state.
     */
    get required() {
        return this.states.required;
    }
    /**
     * Set required state.
     */
    set required(state) {
        this.states.required = state;
        Control.setChildProperty(this.passwordSlot, 'required', state);
        Control.setChildProperty(this.confirmationSlot, 'required', state);
    }
    /**
     * Get read-only state.
     */
    get readOnly() {
        return this.states.readOnly;
    }
    /**
     * Set read-only state.
     */
    set readOnly(state) {
        this.states.readOnly = state;
        Control.setChildProperty(this.passwordSlot, 'readOnly', state);
        Control.setChildProperty(this.confirmationSlot, 'readOnly', state);
    }
    /**
     * Get disabled state.
     */
    get disabled() {
        return this.states.disabled;
    }
    /**
     * Set disabled state.
     */
    set disabled(state) {
        this.states.disabled = state;
        Control.setChildProperty(this.passwordSlot, 'disabled', state);
        Control.setChildProperty(this.confirmationSlot, 'disabled', state);
    }
    /**
     * Get orientation mode.
     */
    get orientation() {
        return this.skeleton.dataset.orientation || 'row';
    }
    /**
     * Set orientation mode.
     */
    set orientation(mode) {
        this.skeleton.dataset.orientation = mode;
    }
    /**
     * Password element.
     */
    get element() {
        return this.skeleton;
    }
    /**
     * Reset the password to its initial value and state.
     */
    reset() {
        this.value = this.defaultValue;
        this.changeHandler();
    }
};
__decorate([
    Class.Private()
], Template.prototype, "states", void 0);
__decorate([
    Class.Private()
], Template.prototype, "passwordSlot", void 0);
__decorate([
    Class.Private()
], Template.prototype, "confirmationSlot", void 0);
__decorate([
    Class.Private()
], Template.prototype, "strengthSlot", void 0);
__decorate([
    Class.Private()
], Template.prototype, "field", void 0);
__decorate([
    Class.Private()
], Template.prototype, "wrapper", void 0);
__decorate([
    Class.Private()
], Template.prototype, "styles", void 0);
__decorate([
    Class.Private()
], Template.prototype, "skeleton", void 0);
__decorate([
    Class.Private()
], Template.prototype, "validateConfirmation", null);
__decorate([
    Class.Private()
], Template.prototype, "validateStrength", null);
__decorate([
    Class.Private()
], Template.prototype, "changeHandler", null);
__decorate([
    Class.Private()
], Template.prototype, "bindHandlers", null);
__decorate([
    Class.Private()
], Template.prototype, "bindProperties", null);
__decorate([
    Class.Private()
], Template.prototype, "assignProperties", null);
__decorate([
    Class.Public()
], Template.prototype, "name", null);
__decorate([
    Class.Public()
], Template.prototype, "defaultValue", null);
__decorate([
    Class.Public()
], Template.prototype, "value", null);
__decorate([
    Class.Public()
], Template.prototype, "empty", null);
__decorate([
    Class.Public()
], Template.prototype, "required", null);
__decorate([
    Class.Public()
], Template.prototype, "readOnly", null);
__decorate([
    Class.Public()
], Template.prototype, "disabled", null);
__decorate([
    Class.Public()
], Template.prototype, "orientation", null);
__decorate([
    Class.Public()
], Template.prototype, "element", null);
__decorate([
    Class.Public()
], Template.prototype, "reset", null);
Template = __decorate([
    Class.Describe()
], Template);
exports.Template = Template;
