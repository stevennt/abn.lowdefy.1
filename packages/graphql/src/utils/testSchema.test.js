/*
  Copyright 2020 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import testSchema from './testSchema';
import { ConfigurationError } from '../context/errors';

test('Object matches schema', () => {
  const schema = {
    type: 'object',
    properties: {
      string: {
        type: 'string',
      },
    },
  };
  const object = {
    string: 'value',
  };
  expect(testSchema({ schema, object })).toBe(true);
});

test('Object does not match schema, one error', () => {
  const schema = {
    type: 'object',
    properties: {
      string: {
        type: 'string',
      },
    },
  };
  const object = {
    string: 7,
  };
  expect(() => testSchema({ schema, object })).toThrow(ConfigurationError);
  expect(() => testSchema({ schema, object })).toThrow('should be string');
});

test('Object does not match schema, two errors', () => {
  const schema = {
    type: 'object',
    properties: {
      string: {
        type: 'string',
      },
      number: {
        type: 'number',
      },
    },
  };
  const object = {
    string: 7,
    number: '7',
  };
  expect(() => testSchema({ schema, object })).toThrow(ConfigurationError);
  expect(() => testSchema({ schema, object })).toThrow('should be string; should be number');
});

test('Object does not match schema, three errors', () => {
  const schema = {
    type: 'object',
    properties: {
      string: {
        type: 'string',
      },
      number: {
        type: 'number',
      },
      boolean: {
        type: 'boolean',
      },
    },
  };
  const object = {
    string: 7,
    number: '7',
    boolean: 7,
  };
  expect(() => testSchema({ schema, object })).toThrow(ConfigurationError);
  expect(() => testSchema({ schema, object })).toThrow('should be string; should be boolean');
});

test('Object does not match schema, one error, error message', () => {
  const schema = {
    type: 'object',
    properties: {
      string: {
        type: 'string',
        errorMessage: {
          type: 'Custom error message.',
        },
      },
    },
  };
  const object = {
    string: 7,
  };
  expect(() => testSchema({ schema, object })).toThrow(ConfigurationError);
  expect(() => testSchema({ schema, object })).toThrow('Custom error message.');
});

test('Object does not match schema, two errors, error messages', () => {
  const schema = {
    type: 'object',
    properties: {
      string: {
        type: 'string',
        errorMessage: {
          type: 'Custom error string.',
        },
      },
      number: {
        type: 'number',
        errorMessage: {
          type: 'Custom error number.',
        },
      },
    },
  };
  const object = {
    string: 7,
    number: '7',
  };
  expect(() => testSchema({ schema, object })).toThrow(ConfigurationError);
  expect(() => testSchema({ schema, object })).toThrow(
    'Custom error string.; Custom error number.'
  );
});

test('Object does not match schema, three errors, error messages', () => {
  const schema = {
    type: 'object',
    properties: {
      string: {
        type: 'string',
        errorMessage: {
          type: 'Custom error string.',
        },
      },
      number: {
        type: 'number',
        errorMessage: {
          type: 'Custom error number.',
        },
      },
      boolean: {
        type: 'boolean',
        errorMessage: {
          type: 'Custom error boolean.',
        },
      },
    },
  };
  const object = {
    string: 7,
    number: '7',
    boolean: 7,
  };
  expect(() => testSchema({ schema, object })).toThrow(ConfigurationError);
  expect(() => testSchema({ schema, object })).toThrow(
    'Custom error string.; Custom error boolean.'
  );
});

test('Nunjucks template in error message', () => {
  const schema = {
    type: 'object',
    properties: {
      string: {
        type: 'string',
        errorMessage: {
          type: '{{ keyword }}:{{ dataPath }}:{{ schemaPath }}:{{ message }}',
        },
      },
    },
  };
  const object = {
    string: 7,
  };
  expect(() => testSchema({ schema, object })).toThrow(
    'errorMessage:/string:#/properties/string/errorMessage:{{ keyword }}:{{ dataPath }}:{{ schemaPath }}:{{ message }}'
  );
});

test('Nunjucks template in error message', () => {
  const schema = {
    type: 'object',
    properties: {
      string: {
        type: 'string',
        errorMessage: {
          type: '{{ keyword }}:{{ dataPath }}:{{ schemaPath }}:{{ message }}',
        },
      },
      number: {
        type: 'number',
        errorMessage: {
          type: '{{ keyword }}:{{ dataPath }}:{{ schemaPath }}:{{ message }}',
        },
      },
    },
  };
  const object = {
    string: 7,
    number: '7',
  };
  expect(() => testSchema({ schema, object })).toThrow(
    'errorMessage:/string:#/properties/string/errorMessage:{{ keyword }}:{{ dataPath }}:{{ schemaPath }}:{{ message }}; errorMessage:/number:#/properties/number/errorMessage:{{ keyword }}:{{ dataPath }}:{{ schemaPath }}:{{ message }}'
  );
});