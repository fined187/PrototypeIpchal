import { useRouter } from "next/router";
import { useRef } from "react";

export default function JusoPopup() {
  let input = ""
  const confmKeyRef = useRef<HTMLInputElement>(null);
  const returnUrlRef = useRef<HTMLInputElement>(null);
  const resultTypeRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const queryParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
  const inputYn = queryParams.get("inputYn");
  const roadAddr = queryParams.get("roadAddr");
  const roadAddrPart1 = queryParams.get("roadAddrPart1");
  const roadAddrPart2 = queryParams.get("roadAddrPart2");
  const jibunAddr = queryParams.get("jibunAddr");
  const engAddr = queryParams.get("engAddr");
  const zipNo = queryParams.get("zipNo");
  const admCd = queryParams.get("admCd");
  const rnMgtSn = queryParams.get("rnMgtSn");
  const bdMgtSn = queryParams.get("bdMgtSn");



  const handleSubmit = () => {
    const form = document.getElementById("form") as HTMLFormElement;
    form.action = "https://business.juso.go.kr/addrlink/addrLinkUrl.do";
    form.method = "post";
    form.submit();
  }

  const init = () => {
    const confmKey = process.env.NEXT_PUBLIC_ADDR_API_KEY;
    const returnUrl = location.href;
    const resultType = '4';
    const useDetailAddress = 'Y';
    
    if(input !== 'Y') {
      input = 'Y';
      if (confmKey) {
        confmKeyRef.current!.value = confmKey;
        returnUrlRef.current!.value = returnUrl;
        resultTypeRef.current!.value = resultType;
        handleSubmit();
      } else {
        console.log(roadAddr)
      }
    }
  }

  return (
    <body onLoad={init}>
      <form name="form" id="form" method="post">
        <input type="hidden" id="confmKey" name="confmKey" value="" ref={confmKeyRef} />
        <input type="hidden" id="returnUrl" name="returnUrl" value="" ref={returnUrlRef} />
        <input type="hidden" id="resultType" name="resultType" value="" ref={resultTypeRef} />
      </form>
    </body>
  )
}