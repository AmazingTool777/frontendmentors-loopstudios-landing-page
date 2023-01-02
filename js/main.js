import { setNavbarCollapses } from "./components/navbarCollpase.js";

setNavbarCollapses({
	onToggle(open) {
		if (open) {
			document.body.style.overflowY = "hidden";
			window.scrollTo({ top: 0 });
		} else {
			document.body.style.overflowY = "auto";
		}
	},
});
