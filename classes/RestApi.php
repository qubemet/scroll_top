<?php
/**
 * All Rest API Code Here
 *
 * @since v.1.0.0
 */
namespace QMT_SCROLL;

defined('ABSPATH') || exit;

/*
 * Rest API Class
 */
class RestApi
{
    /**
     * [__construct] Class constructor
     *
     * @since v.1.0.0
     */
    public function __construct()
    {
        add_action( 'rest_api_init', array($this, 'api_routes') );
    }

    /**
     * REST API All Routes
     *
     * @since v.1.0.0
     * @return void
     */
    public function api_routes()
    {
        register_rest_route(
            'qmt_scroll/v2',
            '/get_all_settings/',
            array(
                array(
                    'methods'  => 'POST',
                    'callback' => array($this, 'get_all_settings'),
                    'permission_callback' => function () {
                        return current_user_can('manage_options');
                    },
                    'args' => array()
                )
            )
        );
        register_rest_route(
            'qmt_scroll/v2',
            '/save_settings/',
            array(
                array(
                    'methods'  => 'POST',
                    'callback' => array($this, 'save_settings'),
                    'permission_callback' => function () {
                        return current_user_can('manage_options');
                    },
                    'args' => array()
                )
            )
        );
    }

    /**
     * All Settings
     *
     * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
     * @since v.1.0.0
     */
    public function get_all_settings() {
        return rest_ensure_response(['success' => true, 'settings' => qmt_scroll()->get_setting()]);
    }

    /**
     * Save Settings
     *
     * @param $server
     * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
     * @since v.1.0.0
     */
    public function save_settings( $server )
    {
        $data = $server->get_params();
        if ( ! ( isset( $data['wpnonce'] ) && wp_verify_nonce( sanitize_key( wp_unslash( $data['wpnonce'] ) ), 'qmt-scroll-nonce' ) ) ) {
            return rest_ensure_response( array() );
        }
        $data = qmt_scroll()->sanitize_data( $data['settings'] );
        if ( !empty( $data ) ) {
            foreach ($data as $key => $val) {
                qmt_scroll()->set_setting($key, $val);
            }
        }
        return rest_ensure_response([
            'success' => true,
            'message' => __('Settings Saved Successfully.', 'qmt-scroll'),
        ]);
    }
}