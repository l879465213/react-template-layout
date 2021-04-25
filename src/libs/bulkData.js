export const labelSkeleton = (query) => {
  let labelSkeleton = []
  // for(let i= query.limit*1 * query.page*1; i > query.limit*1 * (query.page*1 - 1); i--){
    
  for(let i= (query.page*1-1) * 1; i < 4 + (query.page*1 -1); i++){
    let tmpSemester = query.semester
    for(let j = 0; j < 3; ++j){
      labelSkeleton.push({graduationYear: query.year*1 - i, graduationSemester: tmpSemester , koreaCount:0, othersCount:0})
      if(tmpSemester === "fall"){
        tmpSemester = "summer"
      }else if(tmpSemester === "summer"){
        tmpSemester = "spring"
      }else if(tmpSemester === "spring"){
        tmpSemester = "fall"
      }
    }
  }			

	return {
		labelSkeleton,
	}
}

export const drawerRoutes = [
  {
    label: "가입 회원 관리",
    path: "/member",
  },
  {
    label: "탈퇴 회원 관리",
    path: "/delmember",
  },
  {
    label: "전체 회원 관리",
    path: "/allmember",
  },
  {
    label: "로그 관리",
    path: "/log",
  },
  {
    label: "게시판 관리",
    path: "/board",
    items: [
      { label: "공지사항", path: "/board/notice" },
      { label: "FAQ", path: "/board/faq" },
    ],
  },
  {
    label: "신고 관리",
    path: "/report",
    items: [{ label: "신고 관리", path: "/report" }],
  }
];

export const getMainDepth = (location) => {
  if (location === "/member") {
    return { label: "회원 관리", path: "/member" };
  } else if (location === "/delmember") {
    return { label: "탈퇴 회원 관리", path: "/delmember" };
  }  else if (location === "/allmember") {
    return { label: "전체 회원 관리", path: "/allmember" };
  } else if (location === "/log") {
    return { label: "로그 관리", path: "/log" };
  } else if (location === "/board") {
    return { label: "게시판 관리", path: "/board" };
  } else if (location === "/report") {
    return { label: "신고 관리", path: "/report" };
  } else if (location === "/member/detail") {
    return { label: "회원 관리", path: "/member" };
  } else if (location === "/log/detail") {
    return { label: "로그 관리", path: "/log" };
  } else if (location === "/report/detail") {
    return { label: "신고 관리", path: "/report" };
  } else if (location === "/board/notice") {
    return { label: "게시판 관리", path: "/board" };
  } else if (location === "/board/notice/detail") {
    return { label: "게시판 관리", path: "/board/notice" };
  } else if (location === "/board/notice/add") {
    return { label: "게시판 관리", path: "/board/notice" };
  } else if (location === "/board/faq") {
    return { label: "게시판 관리", path: "/board/faq" };
  } else if (location === "/board/faq/detail") {
    return { label: "게시판 관리", path: "/board/faq" };
  } else if (location === "/board/faq/add") {
    return { label: "게시판 관리", path: "/board" };
  } else {
    return { label: "", path: "/" };
  }
};

export const getSubDepth = (location) => {
  if (location === "/member") {
    return { label: "회원 관리", path: "/member" };
  } else if (location === "/delmember") {
    return { label: "탈퇴 회원 관리", path: "/delmember" };
  } else if (location === "/allmember") {
    return { label: "전체 회원 관리", path: "/allmember" };
  } else if (location === "/log") {
    return { label: "로그 관리", path: "/log" };
  } else if (location === "/board") {
    return { label: "게시판 관리", path: "/board" };
  } else if (location === "/report") {
    return { label: "신고 관리", path: "/report" };
  } else if (location === "/member/detail") {
    return { label: "회원 관리 > 상세", path: "/member" };
  } else if (location === "/log/detail") {
    return { label: "로그 관리 > 상세", path: "/log" };
  } else if (location === "/report/detail") {
    return { label: "신고 관리 > 상세", path: "/report" };
  } else if (location === "/board/notice") {
    return { label: "게시판 관리 > 공지사항", path: "/board" };
  } else if (location === "/board/notice/detail") {
    return { label: "게시판 관리 > 공지사항 > 상세", path: "/board/notice" };
  } else if (location === "/board/notice/add") {
    return { label: "게시판 관리 > 공지사항 > 등록", path: "/board/notice" };
  } else if (location === "/board/faq") {
    return { label: "게시판 관리 > FAQ", path: "/board" };
  } else if (location === "/board/faq/detail") {
    return { label: "게시판 관리 > FAQ > 상세", path: "/board/faq" };
  } else if (location === "/board/faq/add") {
    return { label: "게시판 관리 > FAQ > 등록", path: "/board/faq" };
  } else {
    return { label: "", path: "/" };
  }
};

export const getInnerTitle = (location) => {
  if (location === "/member") {
    return { label: "회원 관리 - 리스트" };
  } else if (location === "/delmember") {
    return { label: "탈퇴 회원 관리 - 리스트" };
  } else if (location === "/allmember") {
    return { label: "전체 회원 관리 - 리스트" };
  } else if (location === "/member/detail") {
    return { label: "회원 관리 - 상세" };
  } else if (location === "/log") {
    return { label: "프로필 상세 조회 이력 - 리스트" };
  } else if (location === "/log/detail") {
    return { label: "프로필 상세 조회 이력 - 상세" };
  } else if (location === "/report") {
    return { label: "채팅 신고 게시글 관리 - 리스트" };
  } else if (location === "/report/detail") {
    return { label: "채팅 신고 게시글 관리 - 상세" };
  } else if (location === "/board") {
    return { label: "게시판 관리" };
  } else if (location === "/board/notice") {
    return { label: "공지사항" };
  } else if (location === "/board/notice/add") {
    return { label: "공지사항 - 등록" };
  } else if (location === "/board/notice/detail") {
    return { label: "공지사항 - 상세" };
  } else if (location === "/board/faq") {
    return { label: "FAQ" };
  } else if (location === "/board/faq/add") {
    return { label: "FAQ - 등록" };
  } else if (location === "/board/faq/detail") {
    return { label: "FAQ - 상세" };
  } else {
    return { label: "", path: "/" };
  }
};

export const getReportActionArr = [
  { label: "대기중", value: "wait" },
  { label: "정상", value: "normal" },
  { label: "삭제", value: "delete" },
];

export const getFaqTypeArr = [
  { label: "가입/변경/탈퇴", value: "auth" },
  { label: "친구 목록", value: "friend" },
  { label: "채팅", value: "chat" },
  { label: "친구 찾기", value: "find" },
  { label: "더보기", value: "more" },
];

export const getYearArr = [
  { label: "2021", value: "2021" },
  { label: "2020", value: "2020" },
  { label: "2019", value: "2019" },
  { label: "2018", value: "2018" },
  { label: "2017", value: "2017" },
  { label: "2016", value: "2016" },
  { label: "2015", value: "2015" },
  { label: "2014", value: "2014" },
  { label: "2013", value: "2013" },
  { label: "2012", value: "2012" },
  { label: "2011", value: "2011" },
  { label: "2010", value: "2010" },
  { label: "2009", value: "2009" },
  { label: "2008", value: "2008" },
  { label: "2007", value: "2007" },
  { label: "2006", value: "2006" },
  { label: "2005", value: "2005" },
  { label: "2004", value: "2004" },
  { label: "2003", value: "2003" },
  { label: "2002", value: "2002" },
  { label: "2001", value: "2001" },
  { label: "2000", value: "2000" },
  { label: "1999", value: "1999" },
  { label: "1998", value: "1998" },
];

export const getTodayTerm = (month) => {
  if (month === 3 || month === 4 || month === 5) {
    return "spring";
  } else if (month === 6 || month === 7 || month === 8) {
    return "summer";
  } else {
    return "fall";
  }
};
