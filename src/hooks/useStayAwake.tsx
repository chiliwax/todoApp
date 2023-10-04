import { useEffect, useState } from 'react';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';

export const useStayAwake = () => {
  const DEFAULT_TAG: string = 'default';
  const [tags, setTags] = useState<string[]>([]);

  const lock = async (tag?: string) => {
    const usedTag = tag ? tag : getNextTag(DEFAULT_TAG);
    setTags([...tags, usedTag]);
    await activateKeepAwakeAsync(usedTag);
    return usedTag;
  };

  const unlock = async (tag?: string) => {
    const usedTag = tag ? tag : getNextTag(DEFAULT_TAG);
    setTags([...tags, usedTag]);
    await deactivateKeepAwake(usedTag);
    return usedTag;
  };

  const getActiveTags = (): Array<string> | undefined => {
    return tags;
  };

  const getNextTag = (tag: string, rev: number = 0): string => {
    const currentTag = rev === 0 ? tag : `${tag}_${rev}`
    if (tags.includes(currentTag)) {
      return getNextTag(tag, rev + 1);
    } else {
      return currentTag;
    }
  };

  return {
    stayAwake: lock,
    releaseStayAwake: unlock,
    getActiveSession: getActiveTags,
  };
};

export const useStayAwakeOnScreen = (tag?: string) => {
  useEffect(() => {
    activateKeepAwakeAsync(tag).then(() => {
      console.log(`stay awake activate with [${tag ? tag : 'default'}] tag`);
    });
    return () => {
      deactivateKeepAwake(tag).then(() => {
        console.log(
          `stay awake desactivate with [${tag ? tag : 'default'}] tag`
        );
      });
    };
  }, []);
};
