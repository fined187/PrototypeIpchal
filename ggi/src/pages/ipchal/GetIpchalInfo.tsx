import { stepState } from "@/atom";
import { IpchalType } from "@/type/IpchalType";
import { useRouter } from "next/router";
import { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { useSetRecoilState } from "recoil";

interface GetIpchalInfoProps {
  setIpchalStep?: React.Dispatch<React.SetStateAction<number>>;
  setFormData?: React.Dispatch<React.SetStateAction<IpchalType>>;
  formData?: IpchalType ;
}

export default function GetIpchalInfo({ setIpchalStep, setFormData, formData }: GetIpchalInfoProps) {
  //  idcode=A1423E3E3F3C3F3E3F403E3D473E3F47413E3C6&colmul_no=&startdate=20231212&bubnm=%BC%F6%BF%F810&ipchalamt=42428500&lowamt=424285000
  const router = useRouter();
  const { idcode, colmul_no, startdate, bubnm, ipchalamt, lowamt } = router.query;
  
  const [ipchalInfo, setIpchalInfo] = useState({
    sagunNum: '2023 타경 4016',
    mulgunNum: '1',
    ipchalDate: '2023-09-10',
    addr: '서울특별시 강남구 역삼동 123-45',
  });

  const stateNum = useSetRecoilState(stepState);

  return (
    <>
      <div className="bg-white">
        <div className="relative isolate px-2 pt-0 lg:px-8">
          <div className="mx-auto max-w-2xl py-20 ">
            <div className="text-center">
              <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                사건번호와 입찰일자를 확인해주세요.
              </h1>
              <div>
              <div className="px-4 sm:px-0 mt-10">
                <h3 className="text-base font-semibold leading-7 text-gray-900">사건 정보</h3>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">사건 번호</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ipchalInfo.sagunNum}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">물건 번호</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ipchalInfo.mulgunNum}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">입찰기일</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ipchalInfo.ipchalDate}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">주소</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ipchalInfo.addr}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="flex flex-row w-full justify-between mt-20">
              <div className="flex rounded-2xl bg-gray-200 w-[80px] h-[35px] justify-center items-center cursor-pointer hover:bg-gray-200" onClick={() => stateNum(0)}>
                <GrFormPrevious className="text-gray-700" />
                <span className="mr-1 text-gray-700">
                  이전
                </span>
              </div>
              <div className="flex rounded-2xl bg-gray-200 w-[80px] h-[35px] justify-center items-center cursor-pointer hover:bg-gray-200" onClick={() => stateNum(2)}>
                <span className="text-gray-700">
                  다음
                </span>
                <GrFormNext className="ml-1 text-gray-700" />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}