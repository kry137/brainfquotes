import { useEffect, useMemo, useRef, useState } from 'react';
import AnimateText from './components/AnimateText';
import getQuote from './utils/Quote';

import getBrainf from './utils/Brainf';

function App() {
  const [targetStr, setTargetQuote] = useState('');
  const targetBrainf = useMemo(() => getBrainf(targetStr), [targetStr]);

  // GET A NEW QUOTE
  useEffect(() => {
    async function getQuotes() {
      const newQuote = await getQuote();
      setTargetQuote(newQuote);
      setTimeout(getQuotes, 30000);
    }
    const animFrame = requestAnimationFrame(getQuotes);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div className='relative bg-gray-300 dark:bg-gray-900 text-gray-700 dark:text-white w-screen h-screen overflow-hidden'>
      <code className='absolute flex flex-row flex-wrap justify-center items-center inset-0 font-semibold text-2xl px-30 z-50'> 
        <div className='drop-shadow-[0px_0px_3px_rgba(0,0,0,0.2)] dark:drop-shadow-[0px_0px_3px_rgba(255,255,255,0.5)]'>
          <AnimateText text={targetStr} splitBy=' ' delay={10} />
        </div>
      </code>
      <code className='absolute flex justify-center items-center inset-0 px-10 opacity-20 break-all'>
        <div>
          <AnimateText text={targetBrainf} splitBy='.' delay={10} />
        </div>
      </code>
    </div>
  )
}

export default App
