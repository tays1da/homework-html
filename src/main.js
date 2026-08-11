import 'flowbite';
import { createRoot } from 'react-dom/client';
import { App } from './app/app';
import './style.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);