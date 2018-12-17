"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to use the password input.
 */
const Password = require("../source");
const JSX = require("@singleware/jsx");
const patterns = {
    10: /^(?=.*[a-zA-Z0-9]).{6,}$/i,
    20: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/,
    30: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W]).{6,}$/
};
const input = (JSX.create(Password.Component, { patterns: patterns, strength: 20 },
    JSX.create("input", { slot: "password", type: "password" }),
    JSX.create("input", { slot: "confirmation", type: "password" }),
    JSX.create("input", { slot: "strength", type: "text" })));
/**
 * Change the password input name.
 */
input.name = 'password-input';
/**
 * Change the password input value.
 */
input.value = 'test';
