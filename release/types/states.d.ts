/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Password states interface.
 */
export interface States {
  /**
   * Password name.
   */
  name: string;
  /**
   * Determines whether the password is required or not.
   */
  required: boolean;
  /**
   * Determines whether the password is read-only or not.
   */
  readOnly: boolean;
  /**
   * Determines whether the password is disabled or not.
   */
  disabled: boolean;
}
