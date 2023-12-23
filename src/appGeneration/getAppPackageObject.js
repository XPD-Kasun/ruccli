let packageJSON = {
       "version": "0.1.0",
       "main": "dist/index.js",
       "private": true,
       "dependencies": {
              "react": "^18.0.0",
              "react-dom": "^18.0.0",
              "react-uberconsole": "1.0.1-alpha-5",
              "react-icons": "*"
       }
};

export default function getAppPackageObject(appName, language, useSlim) {

       packageJSON.name = appName;

       if (!useSlim) {
              // Both ts and js are now using react-scripts

              packageJSON['devDependencies'] = {
                     'react-scripts': '^5.0.1'
              };

              packageJSON['scripts'] = {
                     "start": "react-scripts start",
                     "build": "react-scripts build",
                     "eject": "react-scripts eject"
              };
       }
       else {
              if (language === 'ts') {

                     packageJSON['devDependencies'] = {
                            'webpack': '^5.0.0',
                            'typescript': '^4.8.0',
                            'ts-loader': '^9.4.0',
                            'css-loader': '*',
                            'style-loader': '*',
                            'sass': '*',
                            'sass-loader': '*',
                            'webpack-dev-server': '*',
                            'webpack-cli': '*'
                     }

                     packageJSON['scripts'] = {
                            "start": "webpack serve --config webpack.dev.config.js",
                            "build": "webpack --config webpack.prod.config.js"
                     };
              }
              else {
                     packageJSON['devDependencies'] = {
                            'webpack': '*',
                            'babel-loader': '*',
                            '@babel/core': '*',
                            '@babel/preset-env': '*',
                            '@babel/preset-react': '*',
                            'css-loader': '*',
                            'style-loader': '*',
                            'sass': '*',
                            'sass-loader': '*',
                            'webpack-dev-server': '*',
                            'webpack-cli': '*'
                     };

                     packageJSON['scripts'] = {
                            "start": "webpack serve --config webpack.dev.config.js",
                            "build": "webpack --config webpack.prod.config.js"
                     };
              }
       }

       return packageJSON;

}