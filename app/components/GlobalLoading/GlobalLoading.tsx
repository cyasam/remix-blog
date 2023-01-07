import { Progress } from '@chakra-ui/react';
import { useTransition } from '@remix-run/react';
import { useEffect, useState } from 'react';
import styles from './style.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

let interval: any = undefined;
/* const setProgress = (value: number, callback: Function) => {
  let secs = 0; // How many seconds to wait
  let perc = value; // How much percentage to update
  if (value < 100) {
    // Exit the loop if we reached 100
    perc = Math.min(perc + Math.floor(Math.random() * 40), 100); //Get the random percentage, make sure it is less than 100
    secs += Math.ceil(Math.random() * 2); // Get random Time

    setTimeout(function () {
      callback(perc);
    }, secs * 500);

    startPerc(perc, callback);
  }
}; */

export default function GlobalLoading() {
  const [running, setRunning] = useState(true);
  const [value, setValue] = useState(0);
  const transition = useTransition();

  useEffect(() => {
    if (running) {
      interval = setInterval(() => {
        setValue((prev) => prev + Math.random() * 20);
      }, 300);
    } else {
      clearInterval(interval);
    }
  }, [running]);

  useEffect(() => {
    if (value === 100) {
      setRunning(false);
      clearInterval(interval);
    }
  }, [value]);

  useEffect(() => {
    if (transition.state === 'idle' && value > 0) {
      setValue(0);
    }
  }, [transition.state, value]);

  if (transition.state === 'idle') {
    return null;
  }

  return (
    <div className="wrapper">
      <Progress
        colorScheme="green"
        size="sm"
        value={value}
        sx={{
          '& > div:first-child': {
            transitionProperty: 'width',
          },
        }}
      />
    </div>
  );
}
