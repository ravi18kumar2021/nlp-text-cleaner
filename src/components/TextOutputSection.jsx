export default function TextOutputSection({originalText, options, processedText, calculatedStats, activeTab, setActiveTab}) {
    const tabs = ['Cleaned Text', 'Stats', 'Summary', 'Differences'];
    const handleDownloadText = () => {
        const blob = new Blob([processedText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'cleaned_text.txt';
        link.click();
    }
    return (
        <div>
            {processedText && (
                <div className='mt-6 max-w-4xl mx-auto text-white'>
                    <hr className='my-2 text-red-700' />
                    {tabs.map((tab) => (
                        <button key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`sm:px-4 sm:py-2 px-2 py-1 sm:text-base text-sm border ${activeTab === tab ? "bg-blue-800 font-semibold border-2 border-t" : "border-x bg-gray-500"}`}
                        >{tab}</button>
                    ))}
                    <div className='pt-4'>
                        {activeTab === 'Cleaned Text' && (
                            <div>
                                <div className='flex justify-between items-center'>
                                    <span className='font-bold'>Cleaned Output</span>
                                    <button onClick={handleDownloadText}
                                        className='border sm:px-4 sm:py-1 px-2 py-1 mb-1 rounded bg-green-700 hover:bg-green-800 transition'>Download .txt</button>
                                </div>
                                <pre className='whitespace-pre-wrap border sm:p-4 p-2 rounded bg-gray-900'>{processedText}</pre>
                            </div>
                        )}
                        {activeTab === 'Stats' && (
                            <div className='flex sm:flex-row flex-col gap-4 text-gray-800 text-center'>
                                <div className='border md:p-4 sm:p-3 py-2 rounded-md bg-orange-400 flex-1'>
                                    <span className="md:text-base text-sm">Original Word Count : </span><br />
                                    <span className='md:text-3xl sm:text-2xl text-xl font-bold'>{calculatedStats.originalWordsCount}</span>
                                </div>
                                <div className='border md:p-4 sm:p-3 py-2 rounded-md bg-orange-400 flex-1'>
                                    <span className="md:text-base text-sm">Processed Word Count : </span><br />
                                    <span className='md:text-3xl sm:text-2xl text-xl font-bold'>{calculatedStats.processedWordsCount}</span>
                                </div>
                                <div className='border md:p-4 sm:p-3 py-2 rounded-md bg-orange-400 flex-1'>
                                    <span className="md:text-base text-sm">Unique Words (Processed) : </span><br />
                                    <span className='md:text-3xl sm:text-2xl text-xl font-bold'>{calculatedStats.unique}</span>
                                </div>
                            </div>
                        )}
                        {activeTab === 'Summary' && (
                            <div>
                                <h2 className='text-xl font-semibold mb-2'>Processed Text :</h2>
                                <ul className='grid grid-cols-3 gap-3'>
                                    {Object.entries(options).map(([key, value]) => (
                                        <li className='capitalize' key={key}>
                                            {value ? "✅" : "⛔"} {key.replace(/_/g, " ")}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {activeTab === 'Differences' && (
                            <div className='flex sm:gap-3 gap-1'>
                                <div className='flex-1 flex flex-col'>
                                    <h3 className="font-semibold mb-2">Original</h3>
                                    <div className="sm:p-4 p-2 border rounded bg-gray-700 whitespace-pre-wrap flex-1">{originalText}</div>
                                </div>
                                <div className='flex-1 flex flex-col'>
                                    <h3 className="font-semibold mb-2">Processed</h3>
                                    <div className="sm:p-4 p-2 border rounded bg-gray-700 whitespace-pre-wrap flex-1">{processedText}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}