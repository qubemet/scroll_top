<?php
/**
 * Common Function.
 *
 * @since v.1.0.0
 */
namespace QMT_SCROLL;

defined('ABSPATH') || exit;

class Functions
{
    private static ?Functions $instance = null;
    /**
     * [__construct] Class constructor
     *
     * @since v.1.0.0
     */
    public function __construct()
    {
        if ( !isset( $GLOBALS['qmt_scroll_options'] ) ) {
            $GLOBALS['qmt_scroll_options'] = get_option('qmt_scroll_options');
        }
    }

    /**
     * Gets the Functions class instance
     *
     * @returns Functions
     * @since v.v.1.0.0
     */
    public static function get_instance(): ?Functions
    {
        if ( is_null( self::$instance ) ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Get Icon by path
     *
     * @param string $key
     * @return array|string|void
     * @since v.1.0.0
     */
    public function get_scroll_icons( string $key = '' )
    {
        $icons = array(
            'scroll_1' => self::get_icon(QMT_SCROLL_PATH . 'assets/images/svg/scroll_1.svg'),
            'scroll_2' => self::get_icon(QMT_SCROLL_PATH . 'assets/images/svg/scroll_2.svg'),
            'scroll_3' => self::get_icon(QMT_SCROLL_PATH . 'assets/images/svg/scroll_3.svg'),
            'scroll_4' => self::get_icon(QMT_SCROLL_PATH . 'assets/images/svg/scroll_4.svg'),
            'scroll_5' => self::get_icon(QMT_SCROLL_PATH . 'assets/images/svg/scroll_5.svg'),
            'scroll_6' => self::get_icon(QMT_SCROLL_PATH . 'assets/images/svg/scroll_6.svg'),
        );
        if( $key && isset( $icons[$key] ) ) {
            return $icons[$key];
        }else {
            return $icons;
        }
    }

    /**
     * Get Icon by path
     *
     * @param string $path
     * @return string
     * @since v.1.0.0
     */
    public function get_icon(string $path): string
    {
        global $wp_filesystem;
        if (! $wp_filesystem ) {
            require_once ABSPATH . 'wp-admin/includes/file.php';
            WP_Filesystem();
        }
        return $wp_filesystem->get_contents( $path );
    }

    /**
     * Sanitize params
     * @param $params
     * @return array|bool|mixed|string
     * @since v.1.0.0
     */
    public function sanitize_data( $params )
    {
        if(is_array( $params )) {
            return array_map( array( $this,'sanitize_data' ),$params );
        } else {
            if(is_bool( $params )) {
                return rest_sanitize_boolean( $params );
            } else if(is_object( $params )) {
                return $params;
            } else {
                return sanitize_text_field( $params );
            }
        }
    }

    /**
     * Set Settings Data
     *
     * @param $key
     * @param $val
     * @return void
     * @since v.1.0.0
     */
    public function set_setting($key = '', $val = ''): void
    {
        if($key != ''){
            $data = $GLOBALS['qmt_scroll_options'];
            $data[$key] = $val;
            update_option('qmt_scroll_options', $data);
            $GLOBALS['qmt_scroll_options'] = $data;
        }
    }

    /**
     * Get Setting
     *
     * @param string $key
     * @return array|string
     * @since v.1.0.0
     */
    public function get_setting( string $key = '' )
    {
        $data = $GLOBALS['qmt_scroll_options'];
        if ($key != '') {
            if(isset($data[$key])) {
                return $data[$key];
            }
        } else {
            return $data;
        }
    }
}