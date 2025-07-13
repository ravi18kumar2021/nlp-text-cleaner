import { useState } from "react";

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;
const uniqueWords = (text) => new Set(text.toLowerCase().trim().split(/\s+/).filter(Boolean)).size;

export default function TextInputSection({ setOriginalText, defaultOptions, options, setOptions, setProcessedText, setCalculatedStats,setActiveTab }) {
    const [textInput, setTextInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const API_URL = import.meta.env.VITE_API_URL;
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setOptions((prev) => ({ ...prev, [name]: checked }))
    }
    const handleSubmit = async () => {
        const text = textInput.trim();
        if (text === '') {
            setErrorMsg('Please Fill Out the Text');
            setProcessedText('');
            return
        }
        if (!Object.values(options).some(Boolean)) {
            setErrorMsg('Please select at least one preprocessing option');
            return
        };
        setLoading(true);
        setErrorMsg('');
        try {
            const result = await fetch(`${API_URL}/text_preprocess`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text, options })
            });
            if (!result.ok) {
                throw new Error('Failed to process text');
            }
            const data = await result.json();
            setProcessedText(data.processed);
            setActiveTab('Cleaned Text');
            setOriginalText(text);
            const originalWordsCount = countWords(text);
            const processedWordsCount = countWords(data.processed);
            const unique = uniqueWords(data.processed);
            setCalculatedStats({
                originalWordsCount: originalWordsCount,
                processedWordsCount: processedWordsCount,
                unique: unique
            });
            setErrorMsg('');
        } catch (error) {
            console.error('Error :', error.message);
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='max-w-4xl mx-auto bg-red-800 text-white rounded-lg p-6'>
            <h1 className='sm:text-2xl text-xl font-bold mb-4'>NLP Text Cleaner</h1>
            <textarea className='w-full sm:text-lg text-md bg-red-900 sm:p-3 p-2 border rounded mb-4'
                placeholder='Paste Your Text Here...'
                rows={6}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
            />
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4'>
                {Object.keys(defaultOptions).map((key) => (
                    <label key={key} className='flex items-center sm:text-base text-sm space-x-2'>
                        <input type="checkbox" name={key}
                            className='size-4'
                            checked={options[key]}
                            onChange={handleCheckboxChange}
                        />
                        <span className='capitalize'>{key.replace(/_/g, " ")}</span>
                    </label>
                ))}
            </div>
            <div className='flex items-center gap-4'>
                <button onClick={handleSubmit}
                    className='bg-blue-600 sm:px-4 sm:py-2 px-3 py-1 rounded hover:bg-blue-700 transition'
                >Preprocess Text</button>
                {loading && (
                    <span className='italic'>Loading...</span>
                )}
                {errorMsg && (
                    <span className='font-bold'>{errorMsg}</span>
                )}
            </div>
        </div>
    )
}