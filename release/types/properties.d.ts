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
   * Input classes.
   */
  class?: string;
  /**
   * Input slot.
   */
  slot?: string;
  /**
   * Input name.
   */
  name?: string;
  /**
   * Input value.
   */
  value?: number;
  /**
   * Determines whether the input is required or not.
   */
  required?: boolean;
  /**
   * Determines whether the input is read-only or not.
   */
  readOnly?: boolean;
  /**
   * Determines whether the input is disabled or not.
   */
  disabled?: boolean;
  /**
   * Input orientation.
   */
  orientation?: string;
  /**
   * Input strength patterns.
   */
  patterns: Pattern;
  /**
   * Minimum strength value.
   */
  strength: number;
  /**
   * Input children.
   */
  children?: {};
}
