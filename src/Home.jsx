import { MainPage } from './components/MainPage';

export function Home() {
    return (
        <div>
            <header></header>
            <main>
                <MainPage></MainPage>
            </main>
            <footer className='bg-black text-white space-y-2'>
                <p> Developed by Ashwini Chandrahasa  Copyright © 2025 Yousician Company</p>
            </footer>
        </div>
    );

}
