/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Password input element interface.
 */
export interface Element extends HTMLDivElement {
  /**
   * Input value.
   */
  value: string;
  /**
   * Input name.
   */
  name: string;
  /**
   * Required state.
   */
  required: boolean;
  /**
   * Read-only state.
   */
  readOnly: boolean;
  /**
   * Disabled state.
   */
  disabled: boolean;
  /**
   * Orientation mode.
   */
  orientation: string;
}
