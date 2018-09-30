/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as DOM from '@singleware/jsx';
import * as Control from '@singleware/ui-control';

import { Properties } from './properties';
import { Element } from './element';
import { States } from './states';

/**
 * Password template class.
 */
@Class.Describe()
export class Template extends Control.Component<Properties> {
  /**
   * Input states.
   */
  @Class.Private()
  private states = {
    name: '',
    required: false,
    readOnly: false,
    disabled: false
  } as States;

  /**
   * Password element.
   */
  @Class.Private()
  private passwordSlot = <slot name="password" class="password" /> as HTMLSlotElement;

  /**
   * Confirmation element.
   */
  @Class.Private()
  private confirmationSlot = <slot name="confirmation" class="confirmation" /> as HTMLSlotElement;

  /**
   * Strength element.
   */
  @Class.Private()
  private strengthSlot = <slot name="strength" class="strength" /> as HTMLSlotElement;

  /**
   * Field element.
   */
  @Class.Private()
  private field = (
    <div class="field">
      {this.passwordSlot}
      {this.confirmationSlot}
    </div>
  ) as HTMLDivElement;

  /**
   * Wrapper element.
   */
  @Class.Private()
  private wrapper = (
    <div class="wrapper">
      {this.field}
      {this.strengthSlot}
    </div>
  ) as HTMLDivElement;

  /**
   * Input styles.
   */
  @Class.Private()
  private styles = (
    <style>
      {`:host > .wrapper {
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
}`}
    </style>
  ) as HTMLStyleElement;

  /**
   * Input skeleton.
   */
  @Class.Private()
  private skeleton = (
    <div slot={this.properties.slot} class={this.properties.class}>
      {this.children}
    </div>
  ) as Element;

  /**
   * Validates the confirmation password.
   */
  @Class.Private()
  private validateConfirmation(): void {
    const confirmation = Control.getChildByProperty(this.confirmationSlot, 'value') as any;
    if (confirmation) {
      confirmation.setCustomValidity(this.value !== confirmation.value ? `Password string must be equal.` : ``);
    }
  }

  /**
   * Validates the password strength.
   */
  @Class.Private()
  private validateStrength(): void {
    const password = Control.getChildByProperty(this.passwordSlot, 'value') as any;
    const progress = Control.getChildByProperty(this.strengthSlot, 'value') as any;

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
  @Class.Private()
  private changeHandler(): void {
    this.validateConfirmation();
    this.validateStrength();
  }

  /**
   * Bind event handlers to update the custom element.
   */
  @Class.Private()
  private bindHandlers(): void {
    this.skeleton.addEventListener('keyup', this.changeHandler.bind(this));
  }

  /**
   * Bind exposed properties to the custom element.
   */
  @Class.Private()
  private bindProperties(): void {
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
  @Class.Private()
  private assignProperties(): void {
    this.assignComponentProperties(this.properties, ['name', 'value', 'required', 'readOnly', 'disabled']);
    this.orientation = this.properties.orientation || 'row';
    this.changeHandler();
  }

  /**
   * Default constructor.
   * @param properties Password properties.
   * @param children Password children.
   */
  constructor(properties: Properties, children?: any[]) {
    super(properties, children);
    DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.wrapper);
    this.bindHandlers();
    this.bindProperties();
    this.assignProperties();
  }

  /**
   * Get input name.
   */
  @Class.Public()
  public get name(): string {
    return this.states.name;
  }

  /**
   * Set input name.
   */
  public set name(name: string) {
    this.states.name = name;
  }

  /**
   * Get default password value.
   */
  @Class.Public()
  public get defaultValue(): string {
    return this.properties.value || '';
  }

  /**
   * Get input value.
   */
  @Class.Public()
  public get value(): string {
    return Control.getChildProperty(this.passwordSlot, 'value');
  }

  /**
   * Set input value.
   */
  public set value(value: string) {
    Control.setChildProperty(this.passwordSlot, 'value', value);
  }

  /**
   * Get empty state.
   */
  @Class.Public()
  public get empty(): any {
    return this.value.length === 0;
  }

  /**
   * Get required state.
   */
  @Class.Public()
  public get required(): boolean {
    return this.states.required;
  }

  /**
   * Set required state.
   */
  public set required(state: boolean) {
    this.states.required = state;
    Control.setChildProperty(this.passwordSlot, 'required', state);
    Control.setChildProperty(this.confirmationSlot, 'required', state);
  }

  /**
   * Get read-only state.
   */
  @Class.Public()
  public get readOnly(): boolean {
    return this.states.readOnly;
  }

  /**
   * Set read-only state.
   */
  public set readOnly(state: boolean) {
    this.states.readOnly = state;
    Control.setChildProperty(this.passwordSlot, 'readOnly', state);
    Control.setChildProperty(this.confirmationSlot, 'readOnly', state);
  }

  /**
   * Get disabled state.
   */
  @Class.Public()
  public get disabled(): boolean {
    return this.states.disabled;
  }

  /**
   * Set disabled state.
   */
  public set disabled(state: boolean) {
    this.states.disabled = state;
    Control.setChildProperty(this.passwordSlot, 'disabled', state);
    Control.setChildProperty(this.confirmationSlot, 'disabled', state);
  }

  /**
   * Get orientation mode.
   */
  @Class.Public()
  public get orientation(): string {
    return this.skeleton.dataset.orientation || 'row';
  }

  /**
   * Set orientation mode.
   */
  public set orientation(mode: string) {
    this.skeleton.dataset.orientation = mode;
  }

  /**
   * Password element.
   */
  @Class.Public()
  public get element(): Element {
    return this.skeleton;
  }

  /**
   * Reset the password to its initial value and state.
   */
  @Class.Public()
  public reset(): void {
    this.value = this.defaultValue;
    this.changeHandler();
  }
}
