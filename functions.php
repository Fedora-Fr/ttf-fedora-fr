<?php
/**
 * TTF Fedora-Fr functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage TTF_BorsalinuxFr
 * @since TTF Fedora-Fr 1.0
 */

/**
 * Enqueues on the front.
 *
 * @return void
 */
function ttf_fedorafr_enqueue_styles(): void {
	wp_enqueue_style(
		'ttf-fedorafr-style',
		get_stylesheet_directory_uri() . '/style.css',
		array(),
		wp_get_theme()->get( 'Version' ),
		'all'
	);
	wp_enqueue_script(
		'ttf-fedorafr-script',
		get_stylesheet_directory_uri() . '/assets/dist/main.js',
		array(),
		wp_get_theme()->get( 'Version' ),
		true
	);
}

/**
 * Enqueues blocks.
 *
 * @return void
 */
function ttf_fedorafr_block_assets(): void {
	wp_enqueue_style(
		'ttf-fedorafr-block',
		get_stylesheet_directory_uri() . '/assets/dist/style.css',
		array(),
		wp_get_theme()->get( 'Version' ),
		'all'
	);
}

/**
 * Clean the <head> of unnecessary tags.
 */
function ttf_fedorafr_clean_wp_head(): void {
	remove_action( 'wp_head', 'rsd_link' );
	remove_action( 'wp_head', 'wlwmanifest_link' );
	remove_action( 'wp_head', 'wp_shortlink_wp_head' );
	remove_action( 'wp_head', 'rest_output_link_wp_head' );
	remove_action( 'wp_head', 'wp_generator' );
	remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
}

/**
 * Exclude sticky posts from the main query on the home page.
 *
 * @param WP_Query $query The WP_Query instance (passed by reference).
 */
function ttf_fedorafr_exclude_sticky_from_main_query( $query ) {
	if ( is_admin() || ! $query->is_main_query() ) {
		return;
	}

	if ( $query->is_home() ) {
		$sticky = get_option( 'sticky_posts' );
		if ( ! empty( $sticky ) && is_array( $sticky ) ) {
			$query->set( 'post__not_in', $sticky );
			$query->set( 'ignore_sticky_posts', 1 );
		}
	}
}

/**
 * RSS links from the HTML Header.
 */
function fedorafr_rss() {
	$url = get_bloginfo( 'url' );

	// Disable built-in RSS from the HTML Header.
	remove_action( 'wp_head', 'feed_links', 2 );
	remove_action( 'wp_head', 'feed_links_extra', 3 );

	if ( strpos( $url, 'planet' ) !== false ) {
		add_action(
			'wp_head',
			function () {
				echo '<link rel="alternate" type="application/rss+xml" title="RSS 2.0 Feed" href="' . esc_url( get_bloginfo( 'rss2_url' ) ) . '" />';
			}
		);
	}
}

/*
 * --------------------------------------------------------- Actions and filters
 */
// @see https://korben.info/accelerer-wordpress-styles-blocs-utilises.html
add_filter( 'should_load_separate_core_block_assets', '__return_true' );

add_action( 'pre_get_posts', 'ttf_fedorafr_exclude_sticky_from_main_query' );
add_action( 'wp_enqueue_scripts', 'ttf_fedorafr_enqueue_styles' );
add_action( 'enqueue_block_assets', 'ttf_fedorafr_block_assets' );
add_action( 'init', 'ttf_fedorafr_clean_wp_head' );
add_action( 'init', 'fedorafr_rss' );

add_menu_page( 'Reusable Blocks', 'Reusable Blocks', 'edit_posts', 'edit.php?post_type=wp_block', '', 'dashicons-editor-table', 22 );
