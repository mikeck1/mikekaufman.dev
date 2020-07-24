import React from 'react';

import Header from '../src/components/header';
import Banner from './components/banner';
import CodeLanguagesBar from './components/code-languages-bar';
import Projects from './components/projects'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css';
import './App.css';


function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <CodeLanguagesBar />
      <Projects />
    </div >
  );
}

export default App;
