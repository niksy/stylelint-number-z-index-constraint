import stylelint from 'stylelint';

/**
 * @typedef {object} Options
 * @property {number} min
 * @property {number} max
 */

const ruleName = 'plugin/number-z-index-constraint';

const messages = stylelint.utils.ruleMessages(ruleName, {
	/**
	 * @param {number} expected
	 */
	largerThanMax: (expected) =>
		`Expected z-index to have maximum value of ${expected}.`,
	/**
	 * @param {number} expected
	 */
	smallerThanMin: (expected) =>
		`Expected z-index to have minimum value of ${expected}.`
});

/**
 * @param {number} value
 */
function isNegative(value) {
	return value < 0;
}

/**
 * @param {*} value
 */
function possibleValueTest(value) {
	return Object.values(value ?? {}).every(
		(value) => typeof value === 'number' && !isNegative(value)
	);
}

/**
 * @type {stylelint.RuleBase}
 */
function ruleFunction(/** @type Options */ options) {
	return (cssRoot, result) => {
		const validOptions = stylelint.utils.validateOptions(result, ruleName, {
			actual: options,
			possible: possibleValueTest
		});

		if (!validOptions) {
			return;
		}

		cssRoot.walkDecls('z-index', (decl) => {
			const value = Number(decl.value);

			if (Number.isNaN(value)) {
				return;
			}

			if (options.max && Math.abs(value) > options.max) {
				stylelint.utils.report({
					ruleName: ruleName,
					result: result,
					node: decl,
					message: messages.largerThanMax(
						isNegative(value) ? options.max * -1 : options.max
					)
				});
			}

			if (options.min && Math.abs(value) < options.min) {
				stylelint.utils.report({
					ruleName: ruleName,
					result: result,
					node: decl,
					message: messages.smallerThanMin(
						isNegative(value) ? options.min * -1 : options.min
					)
				});
			}
		});
	};
}

// @ts-ignore
const plugin = stylelint.createPlugin(ruleName, ruleFunction);

export default {
	...plugin,
	messages
};
