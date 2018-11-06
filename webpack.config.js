const path            = require( 'path' );
const minifyPlugin    = require( 'babel-minify-webpack-plugin' );
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' )
const webpack         = require( 'webpack' );

module.exports =
{
    // babel-polyfill is used to convert ES6 to ES5 code.
    // Requires a plugin reference in .babelrc options.
    entry : ['babel-polyfill', './src/index.js'],

    output :
    {
        // Path [LOCAL] to save compiled application.
        path          : path.resolve( __dirname, './dist' ),

        // Path [MAPPED] to save compiled application on SharePoint.
        // path          :'//sharepoint.domain.com/siteCollection/siteName/listName/',

        // Path [PUBLIC] to the compiled application. This is the reference point for all assets.
        // publicPath    : '/siteCollection/siteName/listName/',

        // Output file name of the compiled application.
        filename      : 'appBundle.js',
    },

    devtool : '#eval-source-map',

    resolve :
    {
        alias :
        {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    module :
    {
        rules :
        [
            {
                test    : /\.vue$/,
                loader  : 'vue-loader'
            },

            {
                test    : /\.js$/,
                loader  : 'babel-loader'
            },

            {
                test    : /\.(png|jpg|gif)$/,
                loader  : 'file-loader',
                options :
                {
                    name: '[name].[ext]?[hash]'
                }
            },

            {
                test : /\.css$/,
                use  :
                [
                    'vue-style-loader',
                    'css-loader'
                ]
            },

            {
                test : /\.scss$/,
                use :
                [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },

            {
                test   : /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader : 'file-loader?name=fonts/[name].[ext]'
            },
        ]
    },

    plugins :
    [
        new VueLoaderPlugin()
    ],

    stats :
    {
        colors: true
    },
}

if ( process.env.NODE_ENV === 'production' )
{
    module.exports.devtool = false;

    module.exports.plugins = ( module.exports.plugins || [] ).concat(
    [
        new webpack.DefinePlugin(
        {
            'process.env' :
            {
                NODE_ENV : '"production"'
            }
        }),

        new minifyPlugin(),
    ]);
}
