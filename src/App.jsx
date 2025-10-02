import { useEffect, useMemo, useRef, useState } from 'react';

function App() {
  const textRef = useRef(null);
  const codeRef = useRef(null);

  const [targetStr, setTargetStr] = useState('Hello World!');
  const targetBrainf = useMemo(() => {
    let memo = 0;
    let newSyntax = '';
    for (let i = 0; i < targetStr.length; i++) {
            
      const asciiCode = targetStr.charCodeAt(i);
      const different = asciiCode - memo;

      if (different > 0) newSyntax += '+'.repeat(different);
      else if (different < 0) newSyntax += '-'.repeat(-different);
      newSyntax += '.';

      memo = asciiCode;
    }

    return newSyntax;
  }, [targetStr]);

  const [currentStr, setCurrentStr] = useState('');
  const [currentBrainf, setCurrentBrainf] = useState('');

  useEffect(() => {
    if (targetStr === currentStr || targetBrainf === currentBrainf) return;
    console.log('Aktif');
    

    requestAnimationFrame(() => {
      const newBrainf = targetBrainf.slice(0, currentBrainf.length + 1);
      const lastBranf = newBrainf[newBrainf.length - 1];
      
      setCurrentBrainf(newBrainf);

      if (lastBranf === '.') {
        const newStr = targetStr.slice(0, currentStr.length + 1);
        setCurrentStr(newStr);
      }
    });
  }, [targetStr, targetBrainf, currentStr, currentBrainf]);

  return (
    <div className='flex flex-col items-center justify-center gap-4 p-8 bg-gray-900 text-white w-screen h-screen overflow-hidden transition-all'>
      <p ref={textRef} className='font-mono font-semibold text-2xl transition-all'> 
        { currentStr.split('').map((char, ind) => 
          <span key={ind} className='animate-fade inline-block'> 
            {char === ' ' ? '\u00A0' : char}
          </span>
        )}  
      </p>
      <code className="break-all transition-all">
        { currentBrainf.split('').map((char, ind) => 
          <span key={ind} className='animate-fade animate-duration-[50ms] inline-block'> 
            {char === ' ' ? '\u00A0' : char}
          </span>
        )}  
      </code>
    </div>
  )
}

export default App
