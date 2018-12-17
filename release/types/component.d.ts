import * as Control from '@singleware/ui-control';
import { Properties } from './properties';
import { Element } from './element';
import { Pattern } from './pattern';
/**
 * Password component class.
 */
export declare class Component<T extends Properties = Properties> extends Control.Component<T> {
    /**
     * Element instance.
     */
    private skeleton;
    /**
     * Gets the element.
     */
    readonly element: Element;
    /**
     * Gets the element's password patterns.
     */
    /**
    * Sets the element's password patterns.
    */
    patterns: Pattern;
    /**
     * Gets the element's password strength.
     */
    /**
    * Sets the element's password strength.
    */
    strength: number;
    /**
     * Gets the empty state of the element.
     */
    readonly empty: boolean;
    /**
     * Gets the element name.
     */
    /**
    * Sets the element name.
    */
    name: string;
    /**
     * Gets the element value.
     */
    /**
    * Sets the element value.
    */
    value: string;
    /**
     * Gets the element default value.
     */
    /**
    * Sets the element default value.
    */
    defaultValue: string;
    /**
     * Gets the required state of the element.
     */
    /**
    * Sets the required state of the element.
    */
    required: boolean;
    /**
     * Gets the read-only state of the element.
     */
    /**
    * Sets the read-only state of the element.
    */
    readOnly: boolean;
    /**
     * Gets the disabled state of the element.
     */
    /**
    * Sets the disabled state of the element.
    */
    disabled: boolean;
    /**
     * Gets the element orientation.
     */
    /**
    * Sets the element orientation.
    */
    orientation: string;
    /**
     * Move the focus to this element.
     */
    focus(): void;
    /**
     * Reset all fields in the element to its initial values.
     */
    reset(): void;
    /**
     * Checks the element validity.
     * @returns Returns true when the element is valid, false otherwise.
     */
    checkValidity(): boolean;
}
