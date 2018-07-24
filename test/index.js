import runTest from 'stylelint-test-rule-tape';
import fn from '../index';

const { rule, ruleName, messages } = fn;

runTest(rule, {
	ruleName: ruleName,
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
			message: messages.smallerThanMin(10)
		},
		{
			code: 'a { z-index:-9 }',
			message: messages.smallerThanMin(-10)
		}
	]
});

runTest(rule, {
	ruleName: ruleName,
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
			message: messages.largerThanMax(9999)
		},
		{
			code: 'a { z-index:-10000 }',
			message: messages.largerThanMax(-9999)
		}
	]
});
