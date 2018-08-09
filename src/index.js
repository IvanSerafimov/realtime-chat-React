import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {makeRoutes} from './routes';

const routes = makeRoutes();
ReactDOM.render(routes,document.getElementById('root'));
