import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Returns scrollbar to top when moving to other pages.
function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

export default ScrollToTop;