/* eslint-disable mocha/no-exports */

import path from 'path';
import assert from 'assert';
import stylelint from 'stylelint';
import plugin from '../../index.js';

const { lint } = stylelint;

/**
 * @typedef {import('stylelint').CustomSyntax} CustomSyntax
 */

/**
 * @typedef {object} Test
 * @property {string}       input
 * @property {CustomSyntax} [syntax]
 * @property {object[]}     result
 */

/**
 * @typedef {object} TestOptions
 * @property {string} ruleName
 * @property {object} config
 * @property {Test[]} accept
 * @property {Test[]} reject
 */

/**
 * @param {TestOptions} options
 */
export const runCodeTest = (options) => {
	const { ruleName, config, accept, reject } = options ?? {};

	accept.forEach((/** @type {Test} */ { input, syntax }) => {
		it(`should pass for: \`${input}\``, async function () {
			const {
				results: [{ warnings }]
			} = await lint({
				code: input,
				customSyntax: syntax,
				config: {
					plugins: [plugin],
					rules: {
						[ruleName]: config
					}
				}
			});
			assert.equal(
				warnings.length,
				0,
				`Accept case contains warnings, expected 0, got ${warnings.length}`
			);
		});
	});

	reject.forEach((/** @type {Test} */ { input, syntax, result }) => {
		it(`should reject for: \`${input}\``, async function () {
			const {
				results: [{ warnings }]
			} = await lint({
				code: input,
				customSyntax: syntax,
				config: {
					plugins: [plugin],
					rules: {
						[ruleName]: config
					}
				}
			});
			const [{ rule, severity, ...warning }] = warnings;
			assert.deepEqual(warning, result[0], 'Expected different warning');
		});
	});
};

/**
 * @param {TestOptions} options
 */
export const runFileTest = (options) => {
	const { ruleName, config, accept, reject } = options ?? {};

	accept.forEach((/** @type {Test} */ { input, syntax }) => {
		it(`should pass for: \`${input}\``, async function () {
			const {
				results: [{ warnings }]
			} = await lint({
				files: path.resolve(__dirname, '../', input),
				customSyntax: syntax,
				config: {
					plugins: [plugin],
					rules: {
						[ruleName]: config
					}
				}
			});
			assert.equal(
				warnings.length,
				0,
				`Accept case contains warnings, expected 0, got ${warnings.length}`
			);
		});
	});

	reject.forEach((/** @type {Test} */ { input, syntax, result }) => {
		it(`should reject for: \`${input}\``, async function () {
			const {
				results: [{ warnings }]
			} = await lint({
				files: path.resolve(__dirname, '../', input),
				customSyntax: syntax,
				config: {
					plugins: [plugin],
					rules: {
						[ruleName]: config
					}
				}
			});
			assert.equal(
				warnings.length,
				result.length,
				`Not all warnings have been covered for reject case`
			);
			warnings.forEach(({ rule, severity, ...warning }, index) => {
				assert.deepEqual(
					warning,
					result[index],
					`Warning is not covered: "${warning.text}"`
				);
			});
		});
	});
};
