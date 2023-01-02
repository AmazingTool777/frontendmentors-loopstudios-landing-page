import { toggleToggleable } from "../core/toggleable.js";

const defaultOptions = {
	toggle: '[data-toggle="navbar-collapse"]',
	openToggleClassName: "navbar-toggle--open",
	hiddenMenuClassName: "navbar-menu--hidden",
	expandedViewport: 1200,
	onToggle: () => {},
};

/**
 * Sets a navbar collapse system for a pair of menu-toggle
 *
 * @param {NavbarCollapseOptions} options The options for a navbar collpase system
 */
export function setNavbarCollapse(options = defaultOptions) {
	const opts = { ...defaultOptions, ...options };

	const toggle = typeof opts.toggle === "string" ? document.querySelector(opts.toggle) : opts.toggle;
	const menu = document.querySelector(toggle.getAttribute("data-target"));

	toggle.addEventListener("click", () => {
		const open = toggleToggleable(toggle, menu, {
			openToggle: opts.openToggleClassName,
			hiddenMenu: opts.hiddenMenuClassName,
		});
		// Calling the on toggle callback
		opts.onToggle(open);
	});

	/**
	 * As soon as the page has loaded,
	 * if the screen's viewport is greater than the expanded viewport, the navbar collpase should be toggled to true
	 * else it should be toggled to false
	 */
	window.addEventListener("load", () => {
		const isOpen = toggle.classList.contains(opts.openToggleClassName);
		if (window.innerWidth >= opts.expandedViewport) toggle.setAttribute("aria-expanded", isOpen);
	});

	/**
	 * On resize, if the screen size is greater than the expanded viewport
	 * then set the aria-expanded attribute to true since the navbar is displayed on that screen size.
	 * Otherwise, set the aria-expanded attribute to what the open state of the collapse
	 */
	window.addEventListener("resize", () => {
		const isOpen = toggle.classList.contains(opts.openToggleClassName);
		if (window.innerWidth >= opts.expandedViewport && !isOpen) {
			toggle.setAttribute("aria-expanded", true);
		} else if (
			window.innerWidth < opts.expandedViewport &&
			toggle.getAttribute("aria-expanded") !== isOpen.toString()
		) {
			toggle.setAttribute("aria-expanded", isOpen);
		}
	});
}

/**
 * Sets a navbar collapse system for all pairs of menu-toggle within the html page
 *
 * @param {NavbarCollapseOptions} options The options for a navbar collpase system
 */
export function setNavbarCollapses(options = defaultOptions) {
	const toggles = document.querySelectorAll('[data-toggle="navbar-collapse"]');
	Array.prototype.forEach.call(toggles, function (toggle) {
		setNavbarCollapse({
			...options,
			toggle,
		});
	});
}
