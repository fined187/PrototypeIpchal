import React, { useState } from "react";
import Navbar from "./Navbar";
import { stepState } from "@/atom";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	const [menuTitle, setMenuTitle] = useState<string>("");
	const stepStateNum = useRecoilValue(stepState);
	const updateMenuTitle = () => {
		if (stepStateNum === 0 ) {
			setMenuTitle("입찰 시작하기");
		} else if (stepStateNum === 1) {
			setMenuTitle("입찰정보 확인");
		} else if (stepStateNum === 2) {
			setMenuTitle("대리인 확인");
		}
	}
	console.log(stepStateNum);
	useEffect(() => {
		updateMenuTitle();
	}, [stepStateNum]);
	
	return (
		<div className="layout">
			<Navbar menuTitle={menuTitle} />
			{children}
		</div>
	)
}