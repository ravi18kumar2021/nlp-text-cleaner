import { useState } from 'react'
import './App.css'
import TextInputSection from './components/TextInputSection.jsx';
import TextOutputSection from './components/TextOutputSection.jsx';

const defaultOptions = {
    lowercase: false,
    remove_punctuation: false,
    remove_stopwords: false,
    lemmatization: false,
    remove_numbers: false,
    strip_whitespace: false
}

function App() {
    const [activeTab, setActiveTab] = useState('Cleaned Text');
    const [options, setOptions] = useState(defaultOptions);
    const [processedText, setProcessedText] = useState('');
    const [calculatedStats, setCalculatedStats] = useState({});
    const [originalText, setOriginalText] = useState('');
    return (
        <>
            <div className='min-h-screen bg-gray-800 p-6'>
                <TextInputSection setOptions={setOptions} options={options} setOriginalText={setOriginalText} setProcessedText={setProcessedText} defaultOptions={defaultOptions} setCalculatedStats={setCalculatedStats} setActiveTab={setActiveTab}/>
                <TextOutputSection originalText={originalText} calculatedStats={calculatedStats} activeTab={activeTab} setActiveTab={setActiveTab} processedText={processedText} options={options}/>
            </div>
        </>
    )
}

export default App
