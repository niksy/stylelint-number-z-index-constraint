import function_ from '../index.js';
import { runCodeTest } from './util/index.js';

const { ruleName, messages } = function_;

runCodeTest({
	ruleName: ruleName,
	config: {
		min: 10
	},

	accept: [
		{
			input: 'a { z-index:10; }',
			result: []
		},
		{
			input: 'a { z-index:-10; }',
			result: []
		},
		{
			input: 'a { z-index:auto; }',
			result: []
		}
	],
	reject: [
		{
			input: 'a { z-index:9 }',
			result: [
				{
					column: 5,
					line: 1,
					text: messages.smallerThanMin(10)
				}
			]
		},
		{
			input: 'a { z-index:-9 }',
			result: [
				{
					column: 5,
					line: 1,
					text: messages.smallerThanMin(-10)
				}
			]
		}
	]
});

runCodeTest({
	ruleName: ruleName,
	config: {
		max: 9999
	},

	accept: [
		{
			input: 'a { z-index:9999; }',
			result: []
		},
		{
			input: 'a { z-index:-9999; }',
			result: []
		},
		{
			input: 'a { z-index:auto; }',
			result: []
		}
	],
	reject: [
		{
			input: 'a { z-index:10000 }',
			result: [
				{
					column: 5,
					line: 1,
					text: messages.largerThanMax(9999)
				}
			]
		},
		{
			input: 'a { z-index:-10000 }',
			result: [
				{
					column: 5,
					line: 1,
					text: messages.largerThanMax(-9999)
				}
			]
		}
	]
});
