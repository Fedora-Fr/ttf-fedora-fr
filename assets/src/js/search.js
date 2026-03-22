// Minimal search toggle: show input on click, restore button on blur/outside/Esc
document.addEventListener( 'DOMContentLoaded', () => {
	// Find the first search block on the page (adjust selector if needed)
	const search = document.querySelector( '.site-header .wp-block-search' );
	if ( ! search ) {
		return;
	}

	// Create toggle button with Font Awesome icon
	const btn = document.createElement( 'button' );
	btn.type = 'button';
	btn.className = 'search-toggle';
	btn.setAttribute( 'aria-label', 'Ouvrir la recherche' );
	btn.innerHTML = '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>';

	// Prepend button so layout stays correct (button before the wrapper)
	search.insertBefore( btn, search.firstChild );

	const wrapper = search.querySelector( '.wp-block-search__inside-wrapper' );
	const input = search.querySelector( '.wp-block-search__input' );

	// Guard
	if ( ! wrapper || ! input ) {
		return;
	}

	// Open handler
	function openSearch() {
		search.classList.add( 'active' );
		// small timeout to let CSS transition happen before focusing
		setTimeout( () => {
			input.focus();
			// select existing content if any
			input.select?.();
		}, 80 );
	}

	// Close handler
	function closeSearch() {
		search.classList.remove( 'active' );
		// remove focus from input
		try {
			input.blur();
		} catch ( e ) {}
	}

	// Button click: open search
	btn.addEventListener( 'click', ( ev ) => {
		ev.stopPropagation();
		openSearch();
	} );

	// If input loses focus, close (but delay slightly to allow focusing another control)
	input.addEventListener( 'blur', () => {
		// Check next active element after microtask to avoid closing when clicking inside search area
		setTimeout( () => {
			const active = document.activeElement;
			if ( ! search.contains( active ) ) {
				closeSearch();
			}
		}, 0 );
	} );

	// Close on Escape
	input.addEventListener( 'keydown', ( ev ) => {
		if ( ev.key === 'Escape' || ev.key === 'Esc' ) {
			closeSearch();
			btn.focus();
		}
	} );

	// Close when clicking outside
	document.addEventListener( 'click', ( ev ) => {
		if ( ! search.contains( ev.target ) ) {
			closeSearch();
		}
	} );

	// Optional: close on window blur (e.g. user switches tab)
	window.addEventListener( 'blur', () => closeSearch() );
} );
