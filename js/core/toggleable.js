/*
 * This module is responsible for implementing the mechanism the toggleable elements
 * e.g: Dropdown, Collapse, Popup, Tab, etc ...
 */

/**
 * Toggles the attributes of the toggle and menu based on their open states or a given open action
 *
 * @param {HTMLElement} toggle The toggle element
 * @param {HTMLElement} menu The menu element
 * @param {{ openToggle: string, openMenu?: string, , showMenu?: string }} classNames The classNames for the toggle and menu
 * @param {boolean | null} open If boolean, forces the menu is to be whether open or closed. If null, the automatic toggle is run
 * @return {boolean} The open state after toggle
 */
export function toggleToggleable(toggle, menu, classNames, open = null) {
	const isOpen = toggle.classList.contains(classNames.openToggle);
	if ((open !== null && !open) || isOpen) {
		toggle.classList.remove(classNames.openToggle);
		toggle.setAttribute("aria-expanded", false);
		classNames.hiddenMenu ? menu.classList.add(classNames.hiddenMenu) : menu.classList.remove(classNames.openMenu);
	} else {
		toggle.classList.add(classNames.openToggle);
		toggle.setAttribute("aria-expanded", true);
		classNames.hiddenMenu ? menu.classList.remove(classNames.hiddenMenu) : menu.classList.add(classNames.openMenu);
	}
	return !isOpen;
}
