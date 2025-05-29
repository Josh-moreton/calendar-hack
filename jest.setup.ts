import "@testing-library/jest-dom";
import { TextEncoder } from 'util';

// Polyfill TextEncoder for Node.js environment
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

// nanoid gives a syntax error without this (see: https://github.com/ai/nanoid/issues/363)
jest.mock("nanoid", () => { return {
    nanoid : ()=>{}
  } });