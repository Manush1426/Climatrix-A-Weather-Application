import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone } from 'react-icons/fa';

const VoiceSearch = ({ setInput, handleSearch }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (transcript && !listening) {
      setInput(transcript);
      if (handleSearch) {
        handleSearch({ preventDefault: () => {} });
      }
    }
  }, [transcript, listening, setInput, handleSearch]);

  const handleMicClick = () => {
    setError(null);
    resetTranscript();
    try {
      SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
    } catch (err) {
      setError('Microphone access failed.');
      console.error('SpeechRecognition error:', err);
    }
  };

  React.useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setError('Voice search is not supported in this browser. Please use Chrome on desktop.');
    }
  }, [browserSupportsSpeechRecognition]);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={handleMicClick}
        className={`absolute inset-y-0 end-0 flex items-center pe-3 group ${listening ? 'text-blue-600 animate-pulse' : 'text-gray-500'}`}
        tabIndex={0}
        aria-label="Start voice search"
        title={listening ? 'Listening...' : 'Voice Search'}
        style={{ top: '50%', transform: 'translateY(-50%)', height: '2.5rem', width: '2.5rem', padding: 0, background: 'none', border: 'none' }}
        disabled={!browserSupportsSpeechRecognition}
      >
        <span className="relative flex items-center justify-center w-full h-full">
          <span className={`absolute inline-flex h-10 w-10 rounded-full bg-blue-400/20 opacity-70 scale-0 group-hover:scale-100 transition-transform duration-300 ${listening ? 'animate-ping' : ''}`}></span>
          <FaMicrophone className={`w-6 h-6 z-10 drop-shadow-lg transition-transform duration-200 ${listening ? 'scale-110' : ''}`} />
        </span>
      </button>
      {error && (
        <div className="text-xs text-red-400 mt-1 absolute right-0 top-full w-max bg-black/80 px-2 py-1 rounded shadow z-50">
          {error}
        </div>
      )}
    </>
  );
};

export default VoiceSearch;