/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as JSX from '@singleware/jsx';
import * as Control from '@singleware/ui-control';

import { Properties } from './properties';
import { Element } from './element';
import { Pattern } from './pattern';

/**
 * Password component class.
 */
@Class.Describe()
export class Component<T extends Properties = Properties> extends Control.Component<T> {
  /**
   * Element instance.
   */
  @Class.Private()
  private skeleton = (
    <swe-password
      class={this.properties.class}
      slot={this.properties.slot}
      patterns={this.properties.patterns}
      strength={this.properties.strength}
      name={this.properties.name}
      value={this.properties.value}
      required={this.properties.required}
      readOnly={this.properties.readOnly}
      disabled={this.properties.disabled}
      orientation={this.properties.orientation}
    >
      {this.children}
    </swe-password>
  ) as Element;

  /**
   * Gets the element.
   */
  @Class.Public()
  public get element(): Element {
    return this.skeleton;
  }

  /**
   * Gets the element's password patterns.
   */
  @Class.Public()
  public get patterns(): Pattern {
    return this.skeleton.patterns;
  }

  /**
   * Sets the element's password patterns.
   */
  public set patterns(patterns: Pattern) {
    this.skeleton.patterns = patterns;
  }

  /**
   * Gets the element's password strength.
   */
  @Class.Public()
  public get strength(): number {
    return this.skeleton.strength;
  }

  /**
   * Sets the element's password strength.
   */
  public set strength(strength: number) {
    this.skeleton.strength = strength;
  }

  /**
   * Gets the empty state of the element.
   */
  @Class.Public()
  public get empty(): boolean {
    return this.skeleton.empty;
  }

  /**
   * Gets the element name.
   */
  @Class.Public()
  public get name(): string {
    return this.skeleton.name;
  }

  /**
   * Sets the element name.
   */
  public set name(name: string) {
    this.skeleton.name = name;
  }

  /**
   * Gets the element value.
   */
  @Class.Public()
  public get value(): string {
    return this.skeleton.value;
  }

  /**
   * Sets the element value.
   */
  public set value(value: string) {
    this.skeleton.value = value;
  }

  /**
   * Gets the element default value.
   */
  @Class.Public()
  public get defaultValue(): string {
    return this.skeleton.defaultValue;
  }

  /**
   * Sets the element default value.
   */
  public set defaultValue(value: string) {
    this.skeleton.defaultValue = value;
  }

  /**
   * Gets the required state of the element.
   */
  @Class.Public()
  public get required(): boolean {
    return this.skeleton.required;
  }

  /**
   * Sets the required state of the element.
   */
  public set required(state: boolean) {
    this.skeleton.required = state;
  }

  /**
   * Gets the read-only state of the element.
   */
  @Class.Public()
  public get readOnly(): boolean {
    return this.skeleton.readOnly;
  }

  /**
   * Sets the read-only state of the element.
   */
  public set readOnly(state: boolean) {
    this.skeleton.readOnly = state;
  }

  /**
   * Gets the disabled state of the element.
   */
  @Class.Public()
  public get disabled(): boolean {
    return this.skeleton.disabled;
  }

  /**
   * Sets the disabled state of the element.
   */
  public set disabled(state: boolean) {
    this.skeleton.disabled = state;
  }

  /**
   * Gets the element orientation.
   */
  @Class.Public()
  public get orientation(): string {
    return this.skeleton.orientation;
  }

  /**
   * Sets the element orientation.
   */
  public set orientation(orientation: string) {
    this.skeleton.orientation = orientation;
  }

  /**
   * Move the focus to this element.
   */
  @Class.Public()
  public focus(): void {
    this.skeleton.focus();
  }

  /**
   * Reset all fields in the element to its initial values.
   */
  @Class.Public()
  public reset(): void {
    this.skeleton.reset();
  }

  /**
   * Checks the element validity.
   * @returns Returns true when the element is valid, false otherwise.
   */
  @Class.Public()
  public checkValidity(): boolean {
    return this.skeleton.checkValidity();
  }
}
