'use client';
import { Fragment } from 'react';
import useKanaStore from '@/features/Kana/store/useKanaStore';
import useKanjiStore from '@/features/Kanji/store/useKanjiStore';
import useVocabStore from '@/features/Vocabulary/store/useVocabStore';
import { MousePointerClick, Keyboard, CircleCheck, Circle } from 'lucide-react';
import clsx from 'clsx';
import { useClick } from '@/shared/hooks/useAudio';
import { usePathname } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { removeLocaleFromPath } from '@/shared/lib/pathUtils';

const GameModes = () => {
  const pathname = usePathname();
  const pathWithoutLocale = removeLocaleFromPath(pathname);

  const { playClick } = useClick();

  const { selectedGameModeKana, setSelectedGameModeKana } = useKanaStore(
    useShallow(state => ({
      selectedGameModeKana: state.selectedGameModeKana,
      setSelectedGameModeKana: state.setSelectedGameModeKana
    }))
  );

  const { selectedGameModeKanji, setSelectedGameModeKanji } = useKanjiStore(
    useShallow(state => ({
      selectedGameModeKanji: state.selectedGameModeKanji,
      setSelectedGameModeKanji: state.setSelectedGameModeKanji
    }))
  );

  const selectedGameModeVocab = useVocabStore(
    useShallow(state => state.selectedGameModeVocab)
  );

  const selectedGameMode =
    pathWithoutLocale === '/kana'
      ? selectedGameModeKana
      : pathWithoutLocale === '/kanji'
      ? selectedGameModeKanji
      : pathWithoutLocale === '/vocabulary'
      ? selectedGameModeVocab
      : '';

  const setSelectedGameModeVocab = useVocabStore(
    useShallow(state => state.setSelectedGameModeVocab)
  );

  const setSelectedGameMode =
    pathWithoutLocale === '/kana'
      ? setSelectedGameModeKana
      : pathWithoutLocale === '/kanji'
      ? setSelectedGameModeKanji
      : pathWithoutLocale === '/vocabulary'
      ? setSelectedGameModeVocab
      : () => {};

  // const gameModes = ['Pick', 'Reverse-Pick', 'Input', 'Reverse-Input'];
  const gameModes = ['Pick', 'Anti-Pick', 'Type'];

  return (
    <div className='flex rounded-2xl bg-[var(--card-color)]  border-[var(--border-color)] p-4 gap-4 flex-col md:flex-row'>
      {gameModes.map(gameMode => {
        const isSelected = gameMode === selectedGameMode;

        return (
          <button
            key={gameMode}
            onClick={() => {
              playClick();
              setSelectedGameMode(gameMode);
            }}
            className={clsx(
              'relative flex-1 px-4 py-3 rounded-2xl transition-colors duration-0',
              'flex flex-col items-center justify-center gap-2',
              isSelected
                ? 'bg-[var(--main-color)]/80 text-[var(--background-color)] shadow-sm border-b-4 border-[var(--main-color-accent)]'
                : 'text-[var(--main-color)] hover:bg-[var(--border-color)]/50'
            )}
          >
            <div className='flex items-center gap-2'>
              <span className='text-lg font-medium'>{gameMode}</span>
              {gameMode.toLowerCase() === 'pick' && (
                <MousePointerClick
                  size={20}
                  className={clsx(
                    isSelected
                      ? 'text-[var(--background-color)]'
                      : 'text-[var(--main-color)] motion-safe:animate-pulse'
                  )}
                />
              )}
              {gameMode.toLowerCase() === 'anti-pick' && (
                <MousePointerClick
                  size={20}
                  className={clsx(
                    'scale-x-[-1]',
                    isSelected
                      ? 'text-[var(--background-color)]'
                      : 'text-[var(--main-color)] motion-safe:animate-pulse'
                  )}
                />
              )}
              {gameMode.toLowerCase() === 'type' && (
                <Keyboard
                  size={20}
                  className={clsx(
                    isSelected
                      ? 'text-[var(--background-color)]'
                      : 'text-[var(--main-color)] motion-safe:animate-pulse'
                  )}
                />
              )}
              {gameMode.toLowerCase() === 'anti-type' && (
                <Keyboard
                  size={20}
                  className={clsx(
                    'scale-y-[-1]',
                    isSelected
                      ? 'text-[var(--background-color)]'
                      : 'text-[var(--main-color)] motion-safe:animate-pulse'
                  )}
                />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default GameModes;
