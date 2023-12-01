<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<% 
	inputYn = Request.Form("inputYn")
	roadFullAddr = Request.Form("roadFullAddr")
	roadAddrPart1 = Request.Form("roadAddrPart1")
	roadAddrPart2 = Request.Form("roadAddrPart2")
	engAddr = Request.Form("engAddr")
	jibunAddr = Request.Form("jibunAddr")
	zipNo = Request.Form("zipNo")
	addrDetail = Request.Form("addrDetail")
	admCd = Request.Form("admCd")
	rnMgtSn = Request.Form("rnMgtSn")
	bdMgtSn = Request.Form("bdMgtSn")
%>
</head>
<script language="javascript">
function init(){
	var url = location.href;
	<% if Request.ServerVariables("HTTP_HOST") = "210.16.195.60" then %>
	var confmKey = "U01TX0FVVEgyMDE2MDYxMDE0MTkyMTEyOTE0";  //백서버
	<%else %>
	var confmKey = "U01TX0FVVEgyMDE2MDYxMDE0NDA1NjEyOTE2";  //실서버	
	<%end if %>
	
	var inputYn= "<%=inputYn%>";
	if(inputYn != "Y"){
		document.form.confmKey.value = confmKey;
		document.form.returnUrl.value = url;
		document.form.action="https://www.juso.go.kr/addrlink/addrLinkUrl.do"; //인터넷망
		document.form.submit();
	}else{
		opener.jusoCallBack("<%=roadFullAddr%>","<%=roadAddrPart1%>","<%=addrDetail%>","<%=roadAddrPart2%>","<%=engAddr%>","<%=jibunAddr%>","<%=zipNo%>", "<%=admCd%>", "<%=rnMgtSn%>", "<%=bdMgtSn%>");
		window.close();
	}
}
</script>
<body onload="init();">
	<form id="form" name="form" method="post">
		<input type="hidden" id="confmKey" name="confmKey" value=""/>
		<input type="hidden" id="returnUrl" name="returnUrl" value=""/>
		<!-- 해당시스템의 인코딩타입이 EUC-KR일경우에만 추가 START-->
		<input type="hidden" id="encodingType" name="encodingType" value="EUC-KR"/>
		<!-- 해당시스템의 인코딩타입이 EUC-KR일경우에만 추가 END-->
	</form>
</body>
</html>