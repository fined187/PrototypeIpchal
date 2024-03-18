  //  민증 검증
  export const handleVerifyIdNum = (idNum: string) => {
    if (idNum.length > 0 && idNum.length < 14) {
      const idNumArr = idNum.split('')
      const idNumArr1 = (idNumArr.length > 0 && idNumArr.map((item) => parseInt(item)))
      const idNumArr2 = idNumArr1 && idNumArr1.map((item, index) => {
        if (index === 0) {
          return item * 2
        } else if (index === 1) {
          return item * 3
        } else if (index === 2) {
          return item * 4
        } else if (index === 3) {
          return item * 5
        } else if (index === 4) {
          return item * 6
        } else if (index === 5) {
          return item * 7
        } else if (index === 6) {
          return item * 8
        } else if (index === 7) {
          return item * 9
        } else if (index === 8) {
          return item * 2
        } else if (index === 9) {
          return item * 3
        } else if (index === 10) {
          return item * 4
        } else if (index === 11) {
          return item * 5
        } else if (index === 12) {
          return item * 1
        }
      })

      const idNumArr3 = (idNumArr2 && idNumArr2.reduce((acc: any, cur: any) => acc + cur)) 
      const idNumArr4 = (idNumArr3 && (idNumArr3 - idNumArr2[12]!) % 11) 
      const idNumArr5 = (idNumArr4 && 11 - idNumArr4) 
      const idNumArr6 = (idNumArr5 && idNumArr5 % 10)
      if (idNumArr6 === (idNumArr1 && idNumArr1[12])) {
        return true
      } else {
        return false
      }
    }
  }
  
  //  사업자 등록 번호 검증
  export const handleVerifyCorpNum = (num: string) => {
    if (num.length !== 10) {
      return false;
    }

    const regsplitNum = num.replace(/-/gi, '').split('').map(function(item) {
      return parseInt(item, 10);
    });
    
    if (regsplitNum.length === 10) {
      const regkey = [1, 3, 7, 1, 3, 7, 1, 3, 5];
      let regNumSum = 0;
      for (var i = 0; i < regkey.length; i++) {
        regNumSum += regkey[i] * regsplitNum[i];
      }
      regNumSum += parseInt(((regkey[8] * regsplitNum[8]) / 10).toString(), 10);
      const regCheck = (Math.floor(regsplitNum[9])) === ((10 - (regNumSum % 10) ) % 10);
    
      return regCheck;    
    }
  }

  //  법인등록번호 검증
  export const handleVerifyCorpReiNum = (num: string) => {
    const rawValue = num.replace(/[^\d]/g, '').split('').map(r => Number(r));
    const checkSum = rawValue.pop();

    const sum = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2].map((n, i) => n * rawValue[i]).reduce((sum, n) => {
      sum += n;
      return sum;
    }, 0) % 10;

    if (sum === (10 - (checkSum ? checkSum : 0)) % 10 === true) {
      return true
    } else {
      alert('법인등록번호를 확인해주세요')
      return false
    }
  }

  export const handleVerifyPhone = (phone: string) => {
    // const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/g
    const telRegex = /^(070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/
    const smartPhoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/g
    const telCheck = telRegex.test(phone)
    const smartPhoneCheck = smartPhoneRegex.test(phone)
    if (telCheck || smartPhoneCheck) {
      return true
    } else {
      return false
    }
  }