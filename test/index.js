'use strict';

const runTest = require('stylelint-test-rule-tape');
const fn = require('../');

runTest(fn.rule, {
	ruleName: fn.ruleName,
	config: {
		min: 10
	},
	skipBasicChecks: true,

	accept: [
		{
			code: 'a { z-index:10; }'
		},
		{
			code: 'a { z-index:-10; }'
		},
		{
			code: 'a { z-index:auto; }'
		}
	],
	reject: [
		{
			code: 'a { z-index:9 }',
			message: fn.messages.smallerThanMin(10)
		},
		{
			code: 'a { z-index:-9 }',
			message: fn.messages.smallerThanMin(-10)
		}
	]
});

runTest(fn.rule, {
	ruleName: fn.ruleName,
	config: {
		max: 9999
	},
	skipBasicChecks: true,

	accept: [
		{
			code: 'a { z-index:9999; }'
		},
		{
			code: 'a { z-index:-9999; }'
		},
		{
			code: 'a { z-index:auto; }'
		}
	],
	reject: [
		{
			code: 'a { z-index:10000 }',
			message: fn.messages.largerThanMax(9999)
		},
		{
			code: 'a { z-index:-10000 }',
			message: fn.messages.largerThanMax(-9999)
		}
	]
});
