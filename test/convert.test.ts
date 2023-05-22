import { describe, expect, test } from '@jest/globals';
import { convertJSON } from './../src/convert';

const iconfontJSON = require('../examples/iconfont.json');

describe('convert', () => {
  test('json', async () => {
    expect(
      [...Object.keys((await convertJSON(iconfontJSON)).icons)].length
    ).toBe(iconfontJSON.icons.length);
  });
});
