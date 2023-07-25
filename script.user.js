// ==UserScript==
// @name         Fuck Elon Musk
// @namespace    https://greasyfork.org/scripts/471597-elon-musk
// @version      0.2.0
// @description  Fuck Elon Musk! Let's bring the Twitter bird back.
// @author       Ray (https://github.com/so1ve)
// @license      MIT
// @run-at       document-start
// @homepageURL  https://github.com/so1ve/fuck-elonmusk
// @supportURL   https://github.com/so1ve/fuck-elonmusk
// @match        https://twitter.com/**
// @grant        GM_addStyle
// ==/UserScript==

(() => {
	"use strict";

	const COLOR_CSS =
		'.r-1cvl2hr { color: rgb(29, 155, 240); } @media (prefers-color-scheme: dark) { a[href="/home"][aria-label="Twitter"] .r-1cvl2hr { color: rgb(231, 233, 234); } }';
	const TWITTER_LOGO = `<svg viewBox="0 0 24 24" aria-hidden="true" class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>`;
	const TWITTER_LOGO_FOR_SHORTCUT_ICON = `%3Csvg width='500' height='500' viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3Etwitter-logo%3C/title%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M170.2264 442.7654c162.2648 0 251.0168-140.0367 251.0168-261.4758 0-3.9775 0-7.9371-.258-11.8788 17.2659-13.009 32.1701-29.1167 44.0148-47.5687-16.1013 7.4318-33.1817 12.3057-50.6712 14.4587 18.4168-11.4849 32.2005-29.5486 38.786-50.8295-17.3177 10.7044-36.2637 18.2483-56.0204 22.3062-27.3466-30.29-70.8-37.7036-105.9942-18.0837-35.194 19.62-53.3763 61.3941-44.351 101.8979-70.9346-3.7043-137.0242-38.6047-181.8212-96.0154-23.4157 41.9903-11.4554 95.7083 27.3136 122.6754-14.0397-.4335-27.7732-4.3786-40.0416-11.5025v1.1646c.0115 43.7452 29.6141 81.4229 70.778 90.085-12.9882 3.6897-26.6156 4.229-39.8352 1.5766 11.5575 37.4355 44.6783 63.0807 82.4224 63.8192-31.2398 25.5748-69.831 39.4584-109.564 39.4166A172.495 172.495 0 0 1 35 401.4854c40.345 26.9696 87.2885 41.275 135.2264 41.2083' fill='%231DA1F2'/%3E%3Cpath d='M35 35h430v430H35z'/%3E%3C/g%3E%3C/svg%3E%0A`;

	/**
	 * @param {string} selector
	 * @returns {Promise<HTMLElement>}
	 */
	const waitForElement = (selector) =>
		new Promise((resolve) => {
			if (document.querySelector(selector)) {
				return resolve(document.querySelector(selector));
			}

			const observer = new MutationObserver(() => {
				if (document.querySelector(selector)) {
					resolve(document.querySelector(selector));
					observer.disconnect();
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true,
			});
		});

	/** @param {boolean} show */
	const makeTwitterLogoStyle = (show) =>
		`a[href="/home"][aria-label="Twitter"] { display: ${
			show ? "flex" : "block"
		}; }`;

	/** @param {boolean} show */
	const makePlaceholderStyle = (show) =>
		`#placeholder { display: ${show ? "flex" : "none"}; }`;

	GM_addStyle(makeTwitterLogoStyle(false));
	GM_addStyle(makePlaceholderStyle(false));
	GM_addStyle(COLOR_CSS);

	const iconEl = document.querySelector('link[rel="shortcut icon"]');
	iconEl.href = `data:image/svg+xml,${TWITTER_LOGO_FOR_SHORTCUT_ICON}`;

	waitForElement("#placeholder").then((placeholder) => {
		placeholder.children[0].innerHTML = TWITTER_LOGO;
		GM_addStyle(makePlaceholderStyle(true));
	});

	waitForElement('a[href="/home"][aria-label="Twitter"]').then((a) => {
		a.children[0].innerHTML = TWITTER_LOGO;
		GM_addStyle(makeTwitterLogoStyle(true));
	});
})();
