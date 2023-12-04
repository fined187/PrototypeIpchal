import { stepState } from "@/atom";
import { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useRecoilValue } from "recoil";

export default function Navbar() {
  const [menuTitle, setMenuTitle] = useState<string>("");
  const stepStateNum = useRecoilValue(stepState);
  const updateMenuTitle = () => {
    if (stepStateNum === 0) {
      setMenuTitle("");
    } else if (stepStateNum === 1) {
      setMenuTitle("사건번호 입찰일자 확인");
    } else if (stepStateNum === 2) {
      setMenuTitle("대리인 확인");
    } else if (stepStateNum === 3) {
      setMenuTitle("입찰자 수");
    } else if (stepStateNum === 4) {
      setMenuTitle("입찰자 본인 정보");
    }
  };

  useEffect(() => {
    updateMenuTitle();
  }, [stepStateNum]);

  return (
    <div
      className={`flex relative w-full h-20 ${
        stepStateNum === 0 ? "bg-white" : "bg-mybg"
      }`}
    >
      {stepStateNum === 0 ? (
        <div className="flex relative w-full">
          <div className="flex flex-row absolute top-0 right-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.159 12.6693C14.8855 12.1034 14.6508 11.5932 14.249 10.8135C13.879 10.0964 13.2962 9.00544 12.4986 8.01587C11.7 7.02631 10.8099 6.61258 10.3852 6.43754C9.9496 6.25753 9.38371 6.11631 8.93417 6.06857C8.70941 6.0447 8.36331 6.03674 8.06694 6.02879C8.08484 6.07752 8.10274 6.12526 8.12263 6.18692C8.2559 6.59567 8.30861 7.4649 7.91278 8.18693C7.5458 8.85626 6.79492 9.28093 5.95454 9.29684C5.93465 9.29684 5.91476 9.29684 5.89586 9.29684C5.12012 9.29684 4.62882 9.00743 4.39411 8.4127C4.1584 7.81498 4.56915 6.93481 4.61688 6.83735C4.67656 6.71402 4.82673 6.66131 4.95006 6.72198C5.07437 6.78165 5.12609 6.93083 5.06642 7.05515C4.97094 7.25406 4.72728 7.89553 4.85856 8.2297C4.96597 8.50121 5.18377 8.80952 5.94559 8.79758C6.60795 8.78565 7.19373 8.45944 7.47519 7.94725C7.77653 7.39926 7.75764 6.67822 7.64824 6.34207C7.61741 6.24659 7.5637 6.09542 7.51199 5.99696C7.50801 5.99497 7.49707 5.99398 7.49607 5.99298C7.31905 5.7175 6.98389 5.29183 6.26682 5.14265C5.68303 4.97657 5.16289 5.03922 4.44582 5.3883C3.41349 5.81894 2.78395 5.55141 2.5204 5.3883C2.25585 5.2252 1.91373 4.898 1.92069 4.38979C1.92865 3.72345 2.40802 3.33657 2.55521 3.18242C2.69544 3.03622 3.12309 2.70106 3.83021 2.37883C4.03607 2.28535 4.60594 2.11528 5.02663 2.04765C5.45826 1.97903 5.45826 2.02378 5.44633 1.71647C5.44036 1.54441 5.43141 1.42706 5.40854 1.14362C5.39262 0.950675 5.33991 0.984489 5.11117 0.976533C5.07935 0.975539 4.6139 0.967582 4.23598 1.01134C3.49405 1.09787 2.75511 1.36838 2.23994 1.67669C1.65117 2.02875 1.18672 2.39176 0.736197 3.09092C0.282688 3.79207 0.124556 4.8433 0.21307 5.72446C0.301584 6.60562 0.981848 7.40224 1.83019 8.2834C2.67853 9.16357 2.49255 9.82792 2.44084 10.1293C2.3921 10.4147 1.24043 11.9324 0.523366 12.5997C-0.15292 13.2282 0.0400206 13.1417 0.315508 13.6181C0.613869 14.1343 0.668569 13.9214 1.29413 13.4759C1.87693 13.0612 2.46172 12.6832 2.72925 12.5311C2.99778 12.3789 4.37919 11.7504 4.78397 11.6081C5.27626 11.4341 6.23898 11.1238 6.92222 11.0482C7.45231 10.9895 8.15346 10.9975 8.51348 11.0482C9.21861 11.1477 10.2718 11.4997 10.9829 11.8379C11.695 12.176 13.333 13.5435 13.694 13.9254C14.1595 14.4167 14.4728 14.003 14.6866 13.7981C15.3818 13.1328 15.3609 13.1507 15.158 12.6723L15.159 12.6693Z"
                fill="#E7433E"
              />
            </svg>
            <span className="text-sm text-red-600 font-semibold justify-center mr-1">
              지지옥션
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="nav__bar-title">
            <span className="text-mygold text-sm font-extrabold font-nanum leading-3 mt-1 not-italic">
              {menuTitle}
            </span>
            <div className="flex relative">
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="5.09865"
                    cy="5.23146"
                    r="3.84084"
                    stroke="#C39A28"
                  />
                </svg>
              </div>
              <div className="flex absolute top-0 left-1">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 10 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.08879 1.26965C8.49937 2.0671 5.06283 5.89755 3.74544 7.69235L0.55957 3.03791"
                    stroke="#C39A28"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
