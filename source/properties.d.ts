/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import { Pattern } from './pattern';

/**
 * Password input properties interface.
 */
export interface Properties {
  /**
   * Password classes.
   */
  class?: string;
  /**
   * Password slot.
   */
  slot?: string;
  /**
   * Password name.
   */
  name?: string;
  /**
   * Password value.
   */
  value?: string;
  /**
   * Determines whether the password is required or not.
   */
  required?: boolean;
  /**
   * Determines whether the password is read-only or not.
   */
  readOnly?: boolean;
  /**
   * Determines whether the password is disabled or not.
   */
  disabled?: boolean;
  /**
   * Password orientation.
   */
  orientation?: string;
  /**
   * Password strength patterns.
   */
  patterns: Pattern;
  /**
   * Minimum value strength.
   */
  strength: number;
  /**
   * Password children.
   */
  children?: {};
}
