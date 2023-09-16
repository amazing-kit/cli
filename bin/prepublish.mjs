#!/usr/bin/env zx

import { $ } from 'zx';

await $`cp package.json dist/`;
await $`cp README.md dist/`;
await $`cp LICENSE dist/`;