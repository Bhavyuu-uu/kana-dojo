'use client';
import clsx from 'clsx';
import useCalligraphyStore from '../store/useCalligraphyStore';
import { hiraganaData } from '../data/hiraganaStrokes';
import { katakanaData } from '../data/katakanaStrokes';

const CharacterSelector = () => {
  const showCharacterSelector = useCalligraphyStore(
    state => state.showCharacterSelector
  );
  const setShowCharacterSelector = useCalligraphyStore(
    state => state.setShowCharacterSelector
  );
  const selectedKanaType = useCalligraphyStore(state => state.selectedKanaType);
  const setSelectedKanaType = useCalligraphyStore(
    state => state.setSelectedKanaType
  );
  const selectedCharacter = useCalligraphyStore(
    state => state.selectedCharacter
  );
  const setSelectedCharacter = useCalligraphyStore(
    state => state.setSelectedCharacter
  );
  const completedCharacters = useCalligraphyStore(
    state => state.completedCharacters
  );
  const resetStrokes = useCalligraphyStore(state => state.resetStrokes);

  if (!showCharacterSelector) return null;

  const characterData =
    selectedKanaType === 'hiragana' ? hiraganaData : katakanaData;

  const handleSelectCharacter = (char: (typeof characterData)[0]) => {
    setSelectedCharacter(char);
    resetStrokes();
    setShowCharacterSelector(false);
  };

  const handleClose = () => {
    setShowCharacterSelector(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      onClick={handleBackdropClick}
    >
      <div className='bg-[var(--card-color)] rounded-2xl border border-[var(--border-color)] max-w-lg w-full max-h-[85vh] overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-[var(--border-color)]'>
          <h3 className='text-lg font-medium text-[var(--main-color)]'>
            Select Character
          </h3>
          <button
            onClick={handleClose}
            className='p-2 rounded-lg bg-[var(--background-color)] text-[var(--secondary-color)] hover:text-[var(--main-color)] transition-colors'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Kana Type Tabs */}
        <div className='p-4 border-b border-[var(--border-color)]'>
          <div className='flex gap-2'>
            <button
              onClick={() => setSelectedKanaType('hiragana')}
              className={clsx(
                'flex-1 py-2.5 rounded-xl text-sm font-medium transition-all',
                selectedKanaType === 'hiragana'
                  ? 'bg-[var(--main-color)] text-[var(--background-color)]'
                  : 'bg-[var(--background-color)] text-[var(--secondary-color)] border border-[var(--border-color)] hover:text-[var(--main-color)]'
              )}
            >
              ひらがな Hiragana
            </button>
            <button
              onClick={() => setSelectedKanaType('katakana')}
              className={clsx(
                'flex-1 py-2.5 rounded-xl text-sm font-medium transition-all',
                selectedKanaType === 'katakana'
                  ? 'bg-[var(--main-color)] text-[var(--background-color)]'
                  : 'bg-[var(--background-color)] text-[var(--secondary-color)] border border-[var(--border-color)] hover:text-[var(--main-color)]'
              )}
            >
              カタカナ Katakana
            </button>
          </div>
        </div>

        {/* Character Grid */}
        <div className='p-4 overflow-y-auto max-h-[50vh]'>
          <div className='grid grid-cols-5 sm:grid-cols-10 gap-2'>
            {characterData.map(char => {
              const isSelected =
                selectedCharacter?.character === char.character;
              const isCompleted = completedCharacters.includes(char.character);

              return (
                <button
                  key={char.character}
                  onClick={() => handleSelectCharacter(char)}
                  className={clsx(
                    'aspect-square rounded-lg font-japanese text-xl flex items-center justify-center transition-all',
                    isSelected
                      ? 'bg-[var(--main-color)] text-[var(--background-color)] ring-2 ring-[var(--main-color)] ring-offset-2 ring-offset-[var(--card-color)]'
                      : isCompleted
                        ? 'bg-green-500/20 text-green-500 border border-green-500/40 hover:bg-green-500/30'
                        : 'bg-[var(--background-color)] text-[var(--main-color)] border border-[var(--border-color)] hover:border-[var(--main-color)] hover:bg-[var(--main-color)]/10'
                  )}
                >
                  {char.character}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className='p-4 border-t border-[var(--border-color)]'>
          <div className='flex justify-center gap-6 text-xs text-[var(--secondary-color)]'>
            <span className='flex items-center gap-1.5'>
              <span className='w-3 h-3 rounded bg-[var(--main-color)]'></span>
              Current
            </span>
            <span className='flex items-center gap-1.5'>
              <span className='w-3 h-3 rounded bg-green-500/30 border border-green-500/50'></span>
              Mastered
            </span>
            <span className='flex items-center gap-1.5'>
              <span className='w-3 h-3 rounded bg-[var(--background-color)] border border-[var(--border-color)]'></span>
              Available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelector;
