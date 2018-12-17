/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to use the password input.
 */
import * as Password from '../source';
import * as JSX from '@singleware/jsx';

const patterns = {
  10: /^(?=.*[a-zA-Z0-9]).{6,}$/i,
  20: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/,
  30: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W]).{6,}$/
};
const input = (
  <Password.Component patterns={patterns} strength={20}>
    <input slot="password" type="password" />
    <input slot="confirmation" type="password" />
    <input slot="strength" type="text" />
  </Password.Component>
) as Password.Element;

/**
 * Change the password input name.
 */
input.name = 'password-input';

/**
 * Change the password input value.
 */
input.value = 'test';
