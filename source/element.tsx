/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as JSX from '@singleware/jsx';

import { Pattern } from './pattern';

/**
 * Password element.
 */
@JSX.Describe('swe-password')
@Class.Describe()
export class Element extends HTMLElement {
  /**
   * Validation patterns.
   */
  @Class.Public()
  public patterns: Pattern = {};

  /**
   * Validation strength.
   */
  @Class.Public()
  public strength: number = 0;

  /**
   * Password slot element.
   */
  @Class.Private()
  private passwordSlot = <slot name="password" class="password" /> as HTMLSlotElement;

  /**
   * Confirmation slot element.
   */
  @Class.Private()
  private confirmationSlot = <slot name="confirmation" class="confirmation" /> as HTMLSlotElement;

  /**
   * Strength slot element.
   */
  @Class.Private()
  private strengthSlot = <slot name="strength" class="strength" /> as HTMLSlotElement;

  /**
   * Password layout element.
   */
  @Class.Private()
  private passwordLayout = (
    <div class="password">
      <div class="field">
        {this.passwordSlot}
        {this.confirmationSlot}
      </div>
      {this.strengthSlot}
    </div>
  ) as HTMLDivElement;

  /**
   * Password styles element.
   */
  @Class.Private()
  private passwordStyles = (
    <style>
      {`:host > .password {
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
}`}
    </style>
  ) as HTMLStyleElement;

  /**
   * Gets the first child element from specified slot element.
   * @param slot Slot element.
   * @throws Throws an error when there are no children in the specified slot.
   * @returns Returns the first child element.
   */
  @Class.Private()
  private getChildElement(slot: HTMLSlotElement): HTMLElement {
    const child = slot.assignedNodes()[0];
    if (!child) {
      throw new Error(`There are no children in the '${slot.name}' slot.`);
    }
    return child as HTMLElement;
  }

  /**
   * Sets the property into the first child from specified slot element.
   * @param slot Slot element.
   * @param property Property name.
   * @param value Property value.
   * @throws Throws an error when there are no children in the specified slot.
   * @returns Returns true when the specified property has been assigned, false otherwise.
   */
  @Class.Private()
  private setChildProperty(slot: HTMLSlotElement, property: string, value: any): boolean {
    const child = this.getChildElement(slot) as any;
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
  @Class.Private()
  private getChildProperty(slot: HTMLSlotElement, property: string): any {
    return (this.getChildElement(slot) as any)[property];
  }

  /**
   * Updates the specified state in the element.
   * @param name State name.
   * @param state State value.
   */
  @Class.Private()
  private updateState(name: string, state: boolean): void {
    if (state) {
      this.setAttribute(name, '');
    } else {
      this.removeAttribute(name);
    }
  }

  /**
   * Gets the empty state from the specified element.
   * @param element Element instance.
   * @returns Returns true when the element is empty or false otherwise.
   */
  @Class.Private()
  private getEmptyState(element: HTMLInputElement): boolean {
    if ('empty' in element) {
      return (element as any).empty;
    } else {
      return element.value === void 0 || (typeof element.value === 'string' && element.value.length === 0);
    }
  }

  /**
   * Resets the specified element to its default value.
   * @param element Element instance.
   */
  @Class.Private()
  private resetElement(element: HTMLInputElement): void {
    if ((element as any).reset instanceof Function) {
      (element as any).reset();
    } else if ('value' in element) {
      element.value = element.defaultValue;
    }
  }

  /**
   * Validates the current password.
   */
  @Class.Private()
  private validatePassword(): void {
    const password = this.getChildElement(this.passwordSlot) as any;
    const confirmation = this.getChildElement(this.confirmationSlot) as any;
    const strength = this.getChildElement(this.strengthSlot) as any;
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
  @Class.Private()
  private changeHandler(): void {
    this.validatePassword();
    this.updateState('empty', this.empty);
    this.updateState('invalid', !this.empty && !this.checkValidity());
  }

  /**
   * Clear confirmation, event handler.
   */
  @Class.Private()
  private clearConfirmationHandler(): void {
    this.resetElement(this.getChildElement(this.confirmationSlot) as any);
  }

  /**
   * Default constructor.
   */
  constructor() {
    super();
    const shadow = JSX.append(this.attachShadow({ mode: 'closed' }), this.passwordStyles, this.passwordLayout) as ShadowRoot;
    const options = { capture: true, passive: true };
    const callback = this.changeHandler.bind(this);
    shadow.addEventListener('slotchange', callback, options);
    shadow.addEventListener('change', callback, options);
    shadow.addEventListener('keyup', callback, options);
    this.passwordSlot.addEventListener('keydown', this.clearConfirmationHandler.bind(this), options);
  }

  /**
   * Determines whether the element is empty or not.
   */
  @Class.Public()
  public get empty(): boolean {
    const password = this.getChildElement(this.passwordSlot) as any;
    const confirmation = this.getChildElement(this.confirmationSlot) as any;
    return this.getEmptyState(password) && this.getEmptyState(confirmation);
  }

  /**
   * Gets the element name.
   */
  @Class.Public()
  public get name(): string {
    return this.getChildProperty(this.passwordSlot, 'name');
  }

  /**
   * Sets the element name.
   */
  public set name(name: string) {
    this.setChildProperty(this.passwordSlot, 'name', name);
  }

  /**
   * Gets the element value.
   */
  @Class.Public()
  public get value(): any {
    return this.getChildProperty(this.passwordSlot, 'value');
  }

  /**
   * Sets the element value.
   */
  public set value(value: any) {
    this.setChildProperty(this.passwordSlot, 'value', value);
  }

  /**
   * Gets the default value of the element.
   */
  @Class.Public()
  public get defaultValue(): any {
    return this.getChildProperty(this.passwordSlot, 'defaultValue');
  }

  /**
   * Sets the default value of the element.
   */
  public set defaultValue(value: any) {
    this.setChildProperty(this.passwordSlot, 'defaultValue', value);
  }

  /**
   * Gets the required state of the element.
   */
  @Class.Public()
  public get required(): boolean {
    return this.hasAttribute('required');
  }

  /**
   * Sets the required state of the element.
   */
  public set required(state: boolean) {
    this.updateState(
      'required',
      this.setChildProperty(this.passwordSlot, 'required', state) &&
        this.setChildProperty(this.confirmationSlot, 'required', state) &&
        state
    );
  }

  /**
   * Gets the read-only state of the element.
   */
  @Class.Public()
  public get readOnly(): boolean {
    return this.hasAttribute('readonly');
  }

  /**
   * Sets the read-only state of the element.
   */
  public set readOnly(state: boolean) {
    this.updateState(
      'readonly',
      this.setChildProperty(this.passwordSlot, 'readOnly', state) &&
        this.setChildProperty(this.confirmationSlot, 'readOnly', state) &&
        state
    );
  }

  /**
   * Gets the disabled state of the element.
   */
  @Class.Public()
  public get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  /**
   * Sets the disabled state of the element.
   */
  public set disabled(state: boolean) {
    this.updateState(
      'disabled',
      this.setChildProperty(this.passwordSlot, 'disabled', state) &&
        this.setChildProperty(this.confirmationSlot, 'disabled', state) &&
        state
    );
  }

  /**
   * Gets the element orientation.
   */
  @Class.Public()
  public get orientation(): string {
    return this.getAttribute('orientation') || 'row';
  }

  /**
   * Sets the element orientation.
   */
  public set orientation(orientation: string) {
    this.setAttribute('orientation', orientation);
  }

  /**
   * Move the focus to this element.
   */
  @Class.Public()
  public focus(): void {
    const password = this.getChildElement(this.passwordSlot) as any;
    const confirmation = this.getChildElement(this.confirmationSlot) as any;
    if (password.focus instanceof Function && confirmation.focus instanceof Function) {
      if (this.getEmptyState(password)) {
        password.focus();
      } else if (this.getEmptyState(confirmation)) {
        confirmation.focus();
      } else {
        password.focus();
      }
    } else if (password.focus instanceof Function) {
      password.focus();
    } else if (confirmation.focus instanceof Function) {
      confirmation.focus();
    }
  }

  /**
   * Reset the element value to its initial value.
   */
  @Class.Public()
  public reset(): void {
    const password = this.getChildElement(this.passwordSlot) as any;
    const confirmation = this.getChildElement(this.confirmationSlot) as any;
    this.resetElement(password);
    this.resetElement(confirmation);
  }

  /**
   * Checks the element validity.
   * @returns Returns true when the element is valid, false otherwise.
   */
  @Class.Public()
  public checkValidity(): boolean {
    const password = this.getChildElement(this.passwordSlot) as any;
    const confirmation = this.getChildElement(this.confirmationSlot) as any;
    return (
      (!(password.checkValidity instanceof Function) || password.checkValidity()) &&
      (!(confirmation.checkValidity instanceof Function) || confirmation.checkValidity())
    );
  }
}
