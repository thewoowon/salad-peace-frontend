import React from 'react';
import { useTime, useTimer } from 'react-timer-hook';
import DaumPostcode from 'react-daum-postcode';

interface AddressProps{
    toggle:boolean;
    setToggle:(current:boolean) => void;
}

export const Address = ({toggle,setToggle}:AddressProps) => {

    // const handle = {
    //     // 버튼 클릭 이벤트
    //     clickButton: () => {
    //         setToggle(current => !current);
    //     },
    //     // 주소 선택 이벤트
    //     selectAddress: (data: any) => {
    //         console.log(`
    //             주소: ${data.address},
    //             우편번호: ${data.zonecode}
    //         `)
    //         setOpenPostcode(false);
    //     },
    // }

    return (
        <div>
            {toggle && 
            <>
                <button className='w-12 h-12' onClick={() => { setToggle(false); } }>또글</button>
                <DaumPostcode
                    //onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                    autoClose={true} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    defaultQuery='빌딩의 주소를 입력해주세요!' // 팝업을 열때 기본적으로 입력되는 검색어 
                />
            </>}
        </div>
    );
  }
  