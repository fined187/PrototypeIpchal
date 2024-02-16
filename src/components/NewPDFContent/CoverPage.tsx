import { TotalResultType } from "@/interface/IpchalType";
import classNames from 'classnames/bind'
import styles from './CoverPage.module.scss'

interface SingleProps {
  totalResult: TotalResultType;
}

const cx = classNames.bind(styles);

export default function CoverPage({ totalResult }: SingleProps) {
  return (
    <div className={cx('cover-wrap')}>
      <div className={cx('cover-wrap__title')}>
        <span>
          {totalResult && totalResult?.courtFullName + " " + totalResult?.caseYear + " - " + totalResult?.caseDetail + "[" + (totalResult?.mulNo === '' ? '1' : totalResult?.mulNo) + "]" + " " + totalResult?.usage}
          <br />
          기일입찰표
        </span>
      </div>
      <div className={cx('cover-date')}>
        <span>
          입찰기일 : {totalResult && totalResult?.biddingDate?.length === 8 ? totalResult?.biddingDate?.substring(0, 4) + "년 " + totalResult?.biddingDate?.substring(4, 6) + "월" + totalResult?.biddingDate?.substring(6, 8) + "일" : totalResult?.biddingDate}
        </span>
        <span>
          입찰법원 : {totalResult && totalResult?.reqCourtName}
        </span>
      </div>
      <div className={cx('cover-bottom__box')}>
        <span>
          - 입찰표는 대법원 표준서식에 따라 만들어졌으나 전산착오 및 오타 등으로 부정확하게 출력될 수 있으므로 제출 전 사건번호, 물건번호, 입찰기일, 입찰보증금 등은 반드시 확인하시기 바랍니다.
        </span>
        <span>
          - 표지는 제출 시 제거하여 주시기 바랍니다.
        </span>
      </div>
      <div className={cx('cover-img')}>
        <img  
          src={'/toplogo_red.png'}
          alt="logo"
          width={200}
          height={200}
        />
      </div>
    </div>
  )
}