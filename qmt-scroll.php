<?php
/**
 * Plugin Name: Scroll Top - Qubemet
 * Plugin URI:  https://qubemet.com/scroll-top/
 * Description: Enables visitors to easily scroll back to the top of the page.
 * Version:     1.0.0
 * Author:      Qubemet
 * Author URI:  https://qubemet.com/
 * License:     GPLv3
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: qmt-scroll
 */

defined( 'ABSPATH' ) || exit;

// Define Constants
define( 'QMT_SCROLL_VER', '1.0.0' );
define( 'QMT_SCROLL_URL', plugin_dir_url( __FILE__ ) );
define( 'QMT_SCROLL_BASE', plugin_basename( __FILE__ ) );
define( 'QMT_SCROLL_PATH', plugin_dir_path( __FILE__ ) );

// Language and Template Load
add_action( 'init', 'qtm_scroll_language_load' );
function qtm_scroll_language_load() {
    // Load Language
    load_plugin_textdomain( 'qmt-scroll', false, basename( dirname( __FILE__ ) ) . "/languages/" );
}

if ( !function_exists( 'qmt_scroll' ) ) {
    function qmt_scroll() {
        require_once QMT_SCROLL_PATH . 'classes/Functions.php';
        return \QMT_SCROLL\Functions::get_instance();
    }
}

// Plugin Initial Load
require_once QMT_SCROLL_PATH . 'classes/QmtScroll.php';
new \QMT_SCROLL\QmtScroll();