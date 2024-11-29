// import { useState, useRef, useEffect, useCallback, memo } from "react";
// import Logo from "../assets/logo.svg";
// import Ghost from "../components/Ghost";
// import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
// import { useDaumPostcodePopup } from "react-daum-postcode";
// import { toast, Toaster } from "react-hot-toast";

const checkUserLogin = async () => {
  const cookies = document.cookie.split("; ").reduce((acc, currentCookie) => {
    const [name, value] = currentCookie.split("=");
    acc[name] = value;
    return acc;
  }, {});

  const accessToken = cookies["accessToken"];

  if (!accessToken) {
    return false;
  }

  try {
    const response = await fetch("https://api.counterspellbusan.com/me/", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Error verifying access token:", error);
    return false;
  }
};

// const formatPhoneNumber = (value) => value.replace(/[^\d]/g, "").slice(0, 11);

// const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// const SurveyInput = memo(({ type = "text", title, description = "", placeholder, inputRef, optional = false, onClick = null, readOnly = false, onInput = null }) => (
//   <div className="survey-input">
//     <h1>{title}</h1>
//     {description && <h2>{description}</h2>}
//     <input
//       type={type}
//       ref={inputRef}
//       className="main-input"
//       placeholder={placeholder}
//       required={!optional}
//       onClick={onClick}
//       readOnly={readOnly}
//       onInput={onInput}
//     />
//   </div>
// ));

// const SurveyAddr = memo(({ title, description = "", placeholder, inputRef, setPostalCode, cityRef, optional = false, onClick = null, readOnly = false }) => {
//   const open = useDaumPostcodePopup(postcodeScriptUrl);

//   const handleComplete = (data) => {
//     const fullAddress = `${data.sigungu} ${data.address} ${data.bname || ''} ${data.buildingName || ''}`.trim();
//     inputRef.current.value = fullAddress;
//     setPostalCode(data.zonecode);
//     if (cityRef.current) cityRef.current.value = data.sido;
//   };

//   const handleClick = () => open({ onComplete: handleComplete });

//   return (
//     <div className="survey-input">
//       <h1>{title}</h1>
//       {description && <h2>{description}</h2>}
//       <div>
//         <input
//           type="text"
//           ref={inputRef}
//           id="addr"
//           placeholder={placeholder}
//           className="main-input"
//           required={!optional}
//           onClick={onClick}
//           readOnly={readOnly}
//         />
//         <button type="button" onClick={handleClick}>찾기</button>
//       </div>
//     </div>
//   );
// });

// const SurveyArea = memo(({ title, description = "", placeholder, inputRef, optional = false }) => (
//   <div className="survey-input">
//     <h1>{title}</h1>
//     {description && <h2>{description}</h2>}
//     <textarea
//       ref={inputRef}
//       className="main-input"
//       placeholder={placeholder}
//       required={!optional}
//     ></textarea>
//   </div>
// ));

// const SurveySelect = memo(({ title, description = "", placeholder, inputRef, options, optional = false }) => (
//   <div className="survey-input">
//     <h1>{title}</h1>
//     {description && <h2>{description}</h2>}
//     <select
//       ref={inputRef}
//       className="main-input"
//       aria-placeholder={placeholder}
//       required={!optional}
//     >
//       {options.map((option, index) => (
//         <option key={index} value={option[0]}>{option[1]}</option>
//       ))}
//     </select>
//   </div>
// ));

// const HackathonFormPage = () => {
//   const [nowProgress, setProgress] = useState(0);
//   const formRefs = useRef({
//     name: null, email: null, phone: null, school: null, birthdate: null, city: null,
//     address: null, addressDetail: null, foodNote: null, tshirtSize: null,
//     parentName: null, parentEmail: null, parentPhone: null, hackathonExp: null, introduction: null, questions: null,
//   });
//   const [postalCode, setPostalCode] = useState(null);

//   useEffect(() => {
//     const verifyLogin = async () => {
//       const isLoggedIn = await checkUserLogin();
//       if (!isLoggedIn) {
//         window.location.href = "https://dashboard.counterspellbusan.com/auth/login/?redirect=https://counterspellbusan.com/apply";
//       }
//     };
  
//     verifyLogin();
//   }, []);

//   const handleFormSubmit = useCallback(() => {
//     const items = document.querySelectorAll(".item")[nowProgress].getElementsByClassName("main-input");
//     for (const item of items) {
//       if (item?.value === "" && !item.hasAttribute("required")) continue;
//       if (item?.value === "") {
//         toast.error("모든 항목을 입력해주세요!");
//         item?.focus();
//         return;
//       }
//     }

//     if (nowProgress === 7) {
//       const accessToken = document.cookie.split("; ").reduce((acc, cookie) => {
//         const [name, value] = cookie.split("=");
//         if (name === "accessToken") acc = value;
//         return acc;
//       }, "");

//       if (!validateEmail(formRefs.current.email.value)) {
//         toast.error("이메일 형식이 잘못되었습니다.");
//         formRefs.current.email.focus();
//         return;
//       }

//       // POST 요청
//       fetch("https://api.counterspellbusan.com/application-form", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//           legal_name: formRefs.current.name.value,
//           email: formRefs.current.email.value,
//           dob: formRefs.current.birthdate.value,
//           phone_number: formatPhoneNumber(formRefs.current.phone.value),
//           address_line_1: formRefs.current.address.value,
//           address_line_2: formRefs.current.addressDetail.value,
//           city: formRefs.current.city.value,
//           state: formRefs.current.city.value,
//           postal_code: postalCode,
//           dietary_restrictions: formRefs.current.foodNote.value,
//           t_shirt_size: formRefs.current.tshirtSize.value,
//           parent_name: formRefs.current.parentName.value,
//           parent_email: formRefs.current.parentEmail.value,
//           parent_phone_number: formatPhoneNumber(formRefs.current.parentPhone.value),
//           number_of_hackathon: parseInt(formRefs.current.hackathonExp.value) || 0,
//           experience: formRefs.current.introduction.value,
//           selfintroduce: formRefs.current.introduction.value,
//           comments: formRefs.current.questions.value,
//           school: formRefs.current.school.value,
//           testing: true,
//         }),
//       }).then(async (res) => {
//         if (res.ok) {
//           toast.success("신청이 완료되었습니다!");
//           setProgress(0);
//         } else {
//           const errorData = await res.json();
//           toast.error("오류가 발생했습니다. 다시 시도해주세요.");
//         }
//       }).catch(() => {
//         toast.error("오류가 발생했습니다. 다시 시도해주세요.");
//       });
//     }

//     if (nowProgress < 8) setProgress(nowProgress + 1);
//   }, [nowProgress, formRefs, postalCode]);

//   return (
//     <div id="join-us">
//       <Toaster position="top-right" />
//       <div id="head">
//         <h1>JOIN US</h1>
//       </div>
//       <progress value={nowProgress} max={8} />
//       <div id="mask">
//         <div id="list" style={{ '--progress': nowProgress }}>
//           <div className="item">
//             <img src={Logo} alt="Logo" />
//             <h1>APPLY<br />HACKATHON</h1>
//             <Ghost eyeX={-1} eyeY={1} size={80} id="ghost" />
//           </div>
//           <div className="item">
//             <SurveyInput inputRef={(el) => formRefs.current.name = el} title="이름이 무었인가요?" placeholder="홍길동 / Jack Marie" />
//             <SurveyInput type="email" inputRef={(el) => formRefs.current.email = el} title="이메일을 알려주세요" description="*참가자분들께 안내사항을 전달드릴 예정이예요!" placeholder="someone@example.com"
//               onInput={(e) => {
//                 if (!validateEmail(e.target.value)) {
//                   e.target.setCustomValidity("유효한 이메일을 입력해주세요.");
//                 } else {
//                   e.target.setCustomValidity("");
//                 }
//               }}
//             />
//             <SurveyInput inputRef={(el) => formRefs.current.phone = el} title="전화번호를 알려주세요" description="*SMS 문자로 안내받는게 편하시다면 전화번호를 작성해주세요" placeholder="010-1234-5678"
//               onInput={(e) => {
//                 let formattedNumber = formatPhoneNumber(e.target.value);
//                 e.target.value = formattedNumber;
//               }}
//             />
//           </div>
//           <div className="item">
//             <SurveyInput inputRef={(el) => formRefs.current.school = el} title="어느 학교에 다니시나요?" description="*자퇴 / 검정고시 등도 입력이 가능합니다" placeholder="금정고등학교" />
//             <SurveyInput type="date" inputRef={(el) => formRefs.current.birthdate = el} title="생년월일을 알려주세요" placeholder="2007-06-28" />
//           </div>
//           <div className="item">
//             <SurveyInput inputRef={(el) => formRefs.current.city = el} title="도시" description="*또는 대략적인 지역" placeholder="부산광역시" optional={true} onClick={(e) => e.preventDefault()} readOnly />
//             <SurveyAddr inputRef={(el) => formRefs.current.address = el} setPostalCode={setPostalCode} title="상세주소" description="*누르시면 외부 창으로 이동해요" placeholder="서울특별시 용산구 서빙고로 137 (용산동6가)" cityRef={(el) => formRefs.current.city = el} optional={true} onClick={(e) => e.preventDefault()} readOnly />
//             <SurveyInput inputRef={(el) => formRefs.current.addressDetail = el} description="*추가 주소가 있는 경우에 입력해주세요" placeholder="101동 1001호" optional={true} />
//           </div>
//           <div className="item">
//             <SurveyInput inputRef={(el) => formRefs.current.foodNote = el} title="음식관련 특이사항이 있으신가요?" description="*알레르기 특이사항이나 비건, 베지테리언 여부를 자유롭게 적어주세요" placeholder="없다면 칸을 비워두셔도 좋아요" optional={true} />
//             <SurveySelect options={[["Extra Small", "엑스트라 스몰"], ["Small", "스몰"], ["Medium", "미디엄"], ["Large", "라지"], ["Extra Large", "엑스트라 라지"]]} inputRef={(el) => formRefs.current.tshirtSize = el} title="티셔츠 사이즈를 선택해주세요" description="*기념으로 티셔츠를 선물로 드릴 예정이예요" placeholder="XL" />
//           </div>
//           <div className="item">
//             <SurveyInput type="number" inputRef={(el) => formRefs.current.hackathonExp = el} title="해커톤은 몇 번 참여해보셨나요?" placeholder="여기를 눌러 선택해주세요" />
//             <SurveyInput inputRef={(el) => formRefs.current.introduction = el} title="본인을 자유롭게 소개해주세요!" description="*자신의 분야와 관련된 경험을 작성해주세요" placeholder="진행해본 프로젝트, 실무경험, 공부한 내용 뭐든 좋아요!" />
//           </div>
//           <div className="item">
//             <SurveyInput inputRef={(el) => formRefs.current.parentName = el} title="부모님 성함" placeholder="홍길동 / Jack Marie" />
//             <SurveyInput type="email" inputRef={(el) => formRefs.current.parentEmail = el} title="부모님 이메일을 알려주세요" description="*참가자분들께 안내사항을 전달드릴 예정이예요!" placeholder="someone@example.com"
//               onInput={(e) => {
//                 if (!validateEmail(e.target.value)) {
//                   e.target.setCustomValidity("유효한 이메일을 입력해주세요.");
//                 } else {
//                   e.target.setCustomValidity("");
//                 }
//               }}
//             />
//             <SurveyInput inputRef={(el) => formRefs.current.parentPhone = el} title="부모님 전화번호" description="*SMS 문자로 안내받는게 편하시다면 전화번호를 작성해주세요" placeholder="010-1234-5678"
//               onInput={(e) => {
//                 let formattedNumber = formatPhoneNumber(e.target.value);
//                 e.target.value = formattedNumber;
//               }}
//             />
//           </div>
//           <div className="item">
//             <SurveyArea inputRef={(el) => formRefs.current.questions = el} title="더 궁금한게 있으신가요?" placeholder="자유롭게 코멘트 남겨주세요!" optional={true} />
//           </div>
//           <div className="item">
//             <img src={Logo} alt="Logo" />
//             <h1>apply<br />hackathon</h1>
//             <Ghost eyeX={-1} eyeY={1} size={80} id="ghost" />
//           </div>
//         </div>
//       </div>
//       <button id="join-btn" className={`progress-btn-${nowProgress}`} onClick={handleFormSubmit}>
//         {nowProgress === 7 ? "제출" : "다음"}
//       </button>
//     </div>
//   );
// };


import { useEffect, useState } from "react";
import JoinUs from "../components/JoinUs";
const HackathonFormPage = () => {
  let [show, setShow] = useState(false);
  useEffect(() => {
    const verifyLogin = async () => {
      const isLoggedIn = await checkUserLogin();
      if (!isLoggedIn) {
        window.location.href = "https://dashboard.counterspellbusan.com/auth/login/?redirect=https://counterspellbusan.com/apply";
      }else {
        setShow(true);
      }
    };
  
    verifyLogin();
  }, []);

    return (
      <JoinUs className={show?"show":""} />
    );
}



export default HackathonFormPage;