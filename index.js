'use strict';

const stylelint = require('stylelint');
const _ = require('lodash');

const ruleName = 'plugin/number-z-index-constraint';

const messages = stylelint.utils.ruleMessages(ruleName, {
	largerThanMax: ( expected ) => `Expected z-index to have maximum value of ${expected}.`,
	smallerThanMin: ( expected ) => `Expected z-index to have minimum value of ${expected}.`
});

/**
 * @param  {Number}  value
 *
 * @return {Boolean}
 */
function isNegative ( value ) {
	return value < 0;
}

/**
 * @param  {Mixed} value
 *
 * @return {Boolean}
 */
function possibleValueTest ( value ) {
	return _.isNumber(value) && !isNegative(value);
}

module.exports = stylelint.createPlugin(ruleName, ( options ) => ( cssRoot, result ) => {

	const validOptions = stylelint.utils.validateOptions(result, ruleName, {
		actual: options,
		possible: {
			min: possibleValueTest,
			max: possibleValueTest
		}
	});

	if ( !validOptions ) {
		return;
	}

	cssRoot.walkDecls('z-index', ( decl ) => {

		const value = Number(decl.value);

		if ( _.isNaN(value) ) {
			return;
		}

		if ( options.max && Math.abs(value) > options.max ) {
			stylelint.utils.report({
				ruleName: ruleName,
				result: result,
				node: decl,
				message: messages.largerThanMax(isNegative(value) ? options.max * -1 : options.max)
			});
		}

		if ( options.min && Math.abs(value) < options.min ) {
			stylelint.utils.report({
				ruleName: ruleName,
				result: result,
				node: decl,
				message: messages.smallerThanMin(isNegative(value) ? options.min * -1 : options.min)
			});
		}

	});

});
module.exports.ruleName = ruleName;
module.exports.messages = messages;
