import React from 'react';
import { useTime, useTimer } from 'react-timer-hook';

export const Timer: React.FC = ({expiryTimestamp}:any) => {
    const {
        seconds,
        minutes,
        hours,
        ampm,
      } = useTime({ format: '12-hour'});
    
  
    return (
      <div className='flex px-10 text-lg'>
        {
            // 오전이고 11시 이전이라면 주문이 가능함.
            ampm == 'am' && hours < 11
            ? (
                <>
                    <p>주문까지 남은 시간</p>
                    &nbsp;-&nbsp;
                    <span className='w-6'>{(11-hours).toString().length < 2 ? `0${11-hours}` : 11-hours}</span>
                    :&nbsp;
                    <span className='w-6'>{(60-minutes).toString().length < 2 ? `0${60-minutes}` : 60-minutes}</span>
                    :&nbsp;
                    <span className='w-6'>{(60-seconds).toString().length < 2 ? `0${60-seconds}` : 60-seconds}</span>
                </>
            )
            : (
                <div className=' text-center'>
                    <p>주문이 마감되었어요.</p>
                    <p>내일 아침에 만나요.</p>
                </div>
            )
        }
      </div>
    );
  }
  