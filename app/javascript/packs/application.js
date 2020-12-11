import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../application'
import '../stylesheets/application.scss';

require('@rails/ujs').start();
require('turbolinks').start();
require('@rails/activestorage').start();
require('channels');

require.context('../images', true);
