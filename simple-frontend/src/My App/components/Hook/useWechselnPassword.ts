import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import WechselnPasvord from '../../../App servise/ReactQuery/mutation/WechselnPasvord';
import type { WechselnPasvordType } from '../interface/interface';
import type { AxiosError } from 'axios';

const useWechselnPassword = () => {
  const [wechselnError, setWechselnerror] = useState<string | null>(null);

  const result = useMutation({
    mutationFn: (data: WechselnPasvordType) => WechselnPasvord(data),
    onError: (error: AxiosError) => {
      if(error.response?.status === 401) {
        setWechselnerror("პაროლი არასწორია");
      } else {
        setWechselnerror("სერვერთან დაკავშირება ვერ მოხერხდა");
      }
    },
    onSuccess: () => {
      setWechselnerror(null);
      console.log("Success");
    }
  });

  return {...result, wechselnError};
};

export default useWechselnPassword;
