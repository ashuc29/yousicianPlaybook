import { MainPage } from './components/MainPage';
import './styles/global.css';

export function Home() {
    return (
        <div>
            <header></header>
            <main>
                <MainPage></MainPage>
            </main>
            <footer className='footer-content'>
                <p>
                    Developed by Ashwini Chandrahasa  Copyright © 2025 Yousician Music Company
                </p>
            </footer>
        </div>
    );

}
