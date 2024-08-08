import { Dispatch, RefObject, useEffect, useState } from 'react';

type PlaceholderAttributes = {
   ref: RefObject<HTMLInputElement | HTMLTextAreaElement>;
   placeholder: string;
   setPlaceholder: Dispatch<React.SetStateAction<string>>;
};

export const useReactPlaceholder = ({ ref, placeholder, setPlaceholder }: PlaceholderAttributes) => {
   const [tempPlaceholder, setTempPlaceholder] = useState<string>('');

   function placeholderChange() {
      setTempPlaceholder(placeholder);
      setPlaceholder(tempPlaceholder);
   }

   useEffect(() => {
      const { current } = ref;

      current?.addEventListener('focus', placeholderChange);
      current?.addEventListener('blur', placeholderChange);

      return () => {
         current?.removeEventListener('focus', placeholderChange);
         current?.removeEventListener('blur', placeholderChange);
      };
   });
};
