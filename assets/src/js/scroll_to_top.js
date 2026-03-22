document.addEventListener( 'DOMContentLoaded', () => {
	// Create button
	const btn = document.createElement( 'button' );
	btn.id = 'scrollTopBtn';
	btn.setAttribute( 'aria-label', 'Scroll to top' );
	btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

	// Append to body
	document.body.appendChild( btn );

	// Toggle visibility depending on scroll
	window.addEventListener( 'scroll', () => {
		if ( window.scrollY > 300 ) {
			btn.classList.add( 'visible' );
		} else {
			btn.classList.remove( 'visible' );
		}
	} );

	// Scroll behavior
	btn.addEventListener( 'click', () => {
		window.scrollTo( {
			top: 0,
			behavior: 'smooth',
		} );
	} );
} );
