import { Pattern } from './pattern';
/**
 * Password element.
 */
export declare class Element extends HTMLElement {
    /**
     * Validation patterns.
     */
    patterns: Pattern;
    /**
     * Validation strength.
     */
    strength: number;
    /**
     * Password slot element.
     */
    private passwordSlot;
    /**
     * Confirmation slot element.
     */
    private confirmationSlot;
    /**
     * Strength slot element.
     */
    private strengthSlot;
    /**
     * Password layout element.
     */
    private passwordLayout;
    /**
     * Password styles element.
     */
    private passwordStyles;
    /**
     * Gets the first child element from specified slot element.
     * @param slot Slot element.
     * @throws Throws an error when there are no children in the specified slot.
     * @returns Returns the first child element.
     */
    private getChildElement;
    /**
     * Sets the property into the first child from specified slot element.
     * @param slot Slot element.
     * @param property Property name.
     * @param value Property value.
     * @throws Throws an error when there are no children in the specified slot.
     * @returns Returns true when the specified property has been assigned, false otherwise.
     */
    private setChildProperty;
    /**
     * Gets the property from the first child in the specified slot element.
     * @param slot Slot element.
     * @param property Property name.
     * @returns Returns the property value.
     * @throws Throws an error when there are no children in the specified slot.
     */
    private getChildProperty;
    /**
     * Updates the specified state in the element.
     * @param name State name.
     * @param state State value.
     */
    private updateState;
    /**
     * Gets the empty state from the specified element.
     * @param element Element instance.
     * @returns Returns true when the element is empty or false otherwise.
     */
    private getEmptyState;
    /**
     * Resets the specified element to its default value.
     * @param element Element instance.
     */
    private resetElement;
    /**
     * Validates the current password.
     */
    private validatePassword;
    /**
     * Change, event handler.
     */
    private changeHandler;
    /**
     * Clear confirmation, event handler.
     */
    private clearConfirmationHandler;
    /**
     * Default constructor.
     */
    constructor();
    /**
     * Determines whether the element is empty or not.
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
    value: any;
    /**
     * Gets the default value of the element.
     */
    /**
    * Sets the default value of the element.
    */
    defaultValue: any;
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
     * Reset the element value to its initial value.
     */
    reset(): void;
    /**
     * Checks the element validity.
     * @returns Returns true when the element is valid, false otherwise.
     */
    checkValidity(): boolean;
}
