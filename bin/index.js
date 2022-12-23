#! /usr/bin/env node
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ink_1 = require("ink");
var react_1 = __importDefault(require("react"));
var terminal_1 = require("../lib/terminal");
(0, ink_1.render)(react_1.default.createElement(terminal_1.Counter, null));
