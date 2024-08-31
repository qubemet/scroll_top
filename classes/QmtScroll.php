<?php
/**
 * Plugin Initial Load.
 *
 * @since v.1.0.0
 */
namespace QMT_SCROLL;

defined('ABSPATH') || exit;

/*
 * Initial Class
 */
class QmtScroll
{
    /**
     * [__construct] Class constructor
     *
     * @since v.1.0.0
     */
    public function __construct()
    {
        $this->includes();
        add_action( 'in_admin_header', array($this, 'remove_notices') );
        add_action('admin_menu', array($this, 'admin_option_menu'));
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));
        add_filter( 'plugin_action_links_' . QMT_SCROLL_BASE, array( $this, 'plugin_action_links' ) );
        add_action( 'activated_plugin', array( $this, 'plugin_activation' ) );
        add_action( 'plugins_loaded', array( $this, 'load_plugin' ) );
        if( qmt_scroll()->get_setting('enable') ) {
            $this->front_options();
        }
    }

    /**
     * All Included Codes Here
     *
     * @since v.1.0.0
     * @return NULL
     */
    public function includes()
    {
        require_once QMT_SCROLL_PATH.'classes/RestApi.php';
        new RestApi();
    }

    /**
     * Remove Notices From Dashboard Page
     *
     * @return void
     * @since v.1.0.0
     */
    public static function remove_notices(): void
    {
        $current_page = isset( $_GET['page'] ) ? sanitize_text_field( $_GET['page'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended,WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        if ( $current_page === 'qmt-scroll' ) {
            remove_all_actions( 'admin_notices' );
            remove_all_actions( 'all_admin_notices' );
        }
    }

    /**
     * Add Menu Page
     *
     * @return void
     * @since v.1.0.0
     */
    public function admin_option_menu(): void
    {
        add_options_page(
            esc_html__( 'Scroll Top', 'qmt-scroll' ),
            esc_html__( 'Scroll Top - Qubemet', 'qmt-scroll' ),
            $this->menu_capability(),
            'qmt-scroll',
            array($this, 'scroll_dashboard'),
        );
    }

    /**
     * Dashboard Capability
     *
     * @return STRING
     * @since v.1.0.0
     */
    public function menu_capability(): string
    {
        return 'manage_options';
    }

    /**
     * Dashboard Content
     *
     * @return void
     * @since v.1.0.0
     */
    public function scroll_dashboard(): void
    {
        echo '<div id="qmt-scroll-dashboard"></div>';
    }

    /**
     * Admin Enqueue Script
     *
     * @return void
     * @since v.1.0.0
     */
    public function admin_scripts(): void
    {
        wp_enqueue_style('dashicons');
        wp_enqueue_style('qmt-scroll-dashboard', QMT_SCROLL_URL.'assets/css/dashboard.min.css', array(), QMT_SCROLL_VER);
        wp_enqueue_script('qmt-scroll-dashboard', QMT_SCROLL_URL.'assets/js/dashboard.js', array('wp-i18n', 'wp-element', 'wp-api-fetch'), QMT_SCROLL_VER, true);
        $localize_data = array(
            'security' => wp_create_nonce('qmt-scroll-nonce'),
            'scroll_icons' => qmt_scroll()->get_scroll_icons(),
            'version' => QMT_SCROLL_VER,
        );
        wp_localize_script('qmt-scroll-dashboard', 'qmt_scroll', $localize_data);
        wp_set_script_translations( 'qmt-scroll-dashboard', 'qmt-scroll', QMT_SCROLL_PATH . 'languages/' );
    }


    /**
     * Plugins Settings Meta Pro Link Add
     *
     * @param $links
     * @return array
     * @since v.todo
     */
    public function plugin_action_links( $links ) {
        $setting_link = array();
        $setting_link['qmt_scroll_settings'] = '<a href="' . esc_url( admin_url( 'options-general.php?page=qmt-scroll' ) ) .'">'. esc_html__( 'Settings', 'qmt-scroll' ) .'</a>';
        $setting_link['qmt_scroll_support'] = '<a href="https://qubemet.com/contact/" target="_blank">'. esc_html__( 'Support', 'qmt-scroll' ) .'</a>';
        return array_merge( $setting_link, $links );
    }

    /**
     * Redirect after plugin activation
     *
     * @param $plugin
     * @return void
     * @since v.todo
     */
    public function plugin_activation( $plugin ) {
        if ( wp_doing_ajax() || is_network_admin() ) {
            return;
        }
        if ( $plugin == 'qmt-scroll/qmt-scroll.php' ) {
            qmt_scroll()->set_setting('qmt_scroll_active_redirect', true);
        }
    }

    /**
     * Loads plugin files.
     *
     * @since v.todo
     *
     * @return void
     */
    public function load_plugin() {
        if ( is_admin() ) {
            $active_redirect = qmt_scroll()->get_setting('qmt_scroll_active_redirect');
            if ( $active_redirect ) {
                if ( ! is_multisite() ) {
                    qmt_scroll()->set_setting('qmt_scroll_active_redirect', false);
                    exit( wp_safe_redirect( admin_url( 'options-general.php?page=qmt-scroll' ) ) ); //phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
                }
            }
        }
    }

    /**
     * Frontend Related Code, Element Here
     *
     * @return void
     * @since v.1.0.0
     */
    public function front_options()
    {
        add_action('wp_enqueue_scripts', array($this, 'front_script'));
        add_action('wp_head', array($this, 'header_element'));
        add_action('wp_footer', array($this, 'footer_element'));
    }

    /**
     * Front End Enqueue Script
     *
     * @return void
     * @since v.1.0.0
     */
    public function front_script(): void
    {
        wp_enqueue_style('qmt-scroll', QMT_SCROLL_URL.'assets/css/qmt-scroll.min.css', array(), QMT_SCROLL_VER);
        wp_enqueue_script('qmt-scroll', QMT_SCROLL_URL.'assets/js/qmt-scroll.js', array('jquery'), QMT_SCROLL_VER, true);

    }

    /**
     * Add Element in Header like CSS
     *
     * @return void
     * @since v.1.0.0
     */
    public static function header_element(): void
    {
        echo '<style id="qmt-scroll-inline-css">' . qmt_scroll()->get_setting('css') .  '</style>'; //phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
    }

    /**
     * Show Scroll in Footer
     *
     * @return void
     * @since v.1.0.0
     */
    public static function footer_element()
    {
        $settings = qmt_scroll()->get_setting();
        if( wp_is_mobile() && $settings[ 'disableMobile' ] ) {
            return;
        }
        $btn_class = 'qmt-scroll-wrap qmt-scroll-' . $settings['position'] ;
        $icon = '<span class="qmt-scroll-icon">' . qmt_scroll()->get_scroll_icons($settings['scrollIcon']) . '</span>';
?>
        <div
            class="<?php echo esc_attr( $btn_class ); ?>"
            data-scroll-offset="<?php echo esc_attr( $settings['offset'] ) ?>"
            data-animation="<?php echo esc_attr( $settings['animation'] ) ?>"
        >
            <div class="qmt-scroll-content">
                <?php
                    if( ! empty( $settings['iconPosition'] ) && $settings['iconPosition'] == 'before_text' ) {
                        echo $icon; //phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
                    }
                    if( ! empty( $settings['enableText'] ) && ! empty( $settings['text'] ) ) {
                        echo '<span class="qmt-scroll-text">' . wp_kses_post( $settings['text'] )  . '</span>';
                    }
                    if( ! empty( $settings['iconPosition'] ) && $settings['iconPosition'] == 'after_text' ) {
                        echo $icon; //phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
                    }
                ?>
            </div>
        </div>
<?php
    }
}