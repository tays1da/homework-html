import 'flowbite';
import { createRoot } from 'react-dom/client';
import { App } from './app/app';
import { ContragentsProvider } from './context/ContragentsContext';
import './style.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <ContragentsProvider>
        <App />
    </ContragentsProvider>
);