document.addEventListener( 'DOMContentLoaded', () => {
	const tooltip = document.createElement( 'div' );
	tooltip.className = 'custom-tooltip';
	document.body.appendChild( tooltip );

	const elements = document.querySelectorAll(
		'[title], img[alt], abbr[title]'
	);

	elements.forEach( ( el ) => {
		let text = '';

		if ( el.getAttribute( 'title' ) ) {
			text = el.getAttribute( 'title' );
			el.removeAttribute( 'title' );
		} else if (
			el.tagName.toLowerCase() === 'img' &&
			el.getAttribute( 'alt' )
		) {
			text = el.getAttribute( 'alt' );
		}

		if ( ! text ) {
			return;
		}

		el.addEventListener( 'mouseenter', () => {
			tooltip.textContent = text;
			tooltip.classList.add( 'visible' );
		} );

		el.addEventListener( 'mouseleave', () => {
			tooltip.classList.remove( 'visible' );
		} );

		el.addEventListener( 'mousemove', ( e ) => {
			tooltip.style.left = e.pageX + 12 + 'px';
			tooltip.style.top = e.pageY + 12 + 'px';
		} );
	} );
} );
