import { useState, useRef, useEffect } from "react"
import Logo from "../assets/logo.svg"
import Ghost from "./Ghost"
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode"
import { useDaumPostcodePopup } from "react-daum-postcode"
import { toast, Toaster } from "react-hot-toast"




export default ({className, setVisible}) => {
    const [nowProgress, setPrograss] = useState(0)
    const name = useRef(null)
    const email = useRef(null)
    const phone = useRef(null)
    const school = useRef(null)
    const birthdate = useRef(null)
    const city = useRef(null)
    const address = useRef(null)
    const addressDetail = useRef(null)
    const foodNote = useRef(null)
    const [postalCode, setPostalCode] = useState(null)
    const tshirtSize = useRef(null)
    const hackathonExp = useRef(null)
    const introduction = useRef(null)
    const parentName = useRef(null)
    const parentEmail = useRef(null)
    const parentPhone = useRef(null)
    const questions = useRef(null)
    const experience = useRef(null)

    const validateAge = (birthdate) => {
        const today = new Date();
        const birth = new Date(birthdate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age >= 14;
    };

    function submitForm(token) {
        if (!validateAge(birthdate.current.value)) {
            toast.error("만 14세 이상만 참가 가능합니다.");
            return;
        }
        const cookies = document.cookie.split("; ").reduce((acc, currentCookie) => {
            const [name, value] = currentCookie.split("=");
            acc[name] = value;
            return acc;
        }, {});

        let accessToken = token;
        if (!accessToken) {
            accessToken = cookies["accessToken"];
        }

        if (!accessToken) {
            toast.error("인증에 실패했습니다. 관리자에게 문의해주세요.");
            return;
        }
        
        const body = JSON.stringify({
            legal_name: name.current.value,
            email: email.current.value,
            dob: birthdate.current.value,
            phone_number: phone.current.value.replace(/-/g, ''),
            address_line_1: address.current.value,
            address_line_2: addressDetail.current.value,
            city: city.current.value,
            state: city.current.value,
            postal_code: postalCode,
            dietary_restrictions: foodNote.current.value,
            t_shirt_size: tshirtSize.current.value,
            parent_name: parentName.current.value,
            parent_email: parentEmail.current.value,
            parent_phone_number: parentPhone.current.value.replace(/-/g, ''),
            experience: "Yes, in-person",
            number_of_hackathon: parseInt(hackathonExp.current.value),
            experience2: experience.current.value,
            selfintroduce: introduction.current.value,
            comments: questions.current.value,
            school: school.current.value,
            testing: false
        })
        console.log(body)
        fetch("https://api.counterspellbusan.com/application-form/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "content-type": "application/json",
            },
            body: body
        }).then((res) => {
            if (res.status === 401) {
                fetch("https://api.counterspellbusan.com/token/refresh/", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        refresh: cookies["refreshToken"]
                    })
                }).then(async (res) => {
                    console.log(res);
                    if (res.ok) {
                        const data = await res.json();
                        if (!token) submitForm(data.access);
                    }else {
                        toast.error("인증에 실패했습니다. 관리자에게 문의해주세요.");
                    }
                })
                return;
            }
            if (res.ok) {
                toast.success("신청이 완료되었습니다!");
                setTimeout(() => {
                    location.href = "https://dashboard.counterspellbusan.com";
                }, 3000)
            } else {
                res.text().then(text => {
                    console.error("Error response:", text);
                    toast.error("오류가 발생했습니다. 다시 시도해주세요.");
                });
            }
        }
        ).catch((e) => {
            toast.error("오류가 발생했습니다. 다시 시도해주세요.");
        });
    }

    useEffect(() => {
        const items = document.querySelectorAll(".item .main-input");

        const handleFocus = (e) => {
            const item = e.target.closest(".item");
            const index = Array.from(document.querySelectorAll(".item")).indexOf(item);
            for (let i = 0; i < index; i++) {
                let items = document.querySelectorAll(".item")[i].getElementsByClassName("main-input");
                for (let item of items) {
                    if (!item.checkValidity()) {
                        toast.error("입력값을 확인해주세요.");
                        item?.focus();
                        return;
                    }
                    if (item.pattern && !new RegExp(item.pattern).test(item.value)) {
                        toast.error("패턴이 올바르지 않습니다.");
                        item?.focus();
                        return;
                    }
                }
            }
            
            setPrograss(index);
        };

        items.forEach(item => item.addEventListener('focus', handleFocus));
        return () => {
            items.forEach(item => item.removeEventListener('focus', handleFocus));
        };
    }, []);

    useEffect(() => {
        const cookies = document.cookie.split("; ").reduce((acc, currentCookie) => {
            const [name, value] = currentCookie.split("=");
            acc[name] = value;
            return acc;
          }, {});

        const accessToken = cookies["accessToken"];

        fetch("https://api.counterspellbusan.com/check-submission/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "content-type": "application/json",
            },
          }).then(async (res) => {
            const data = await res.json();
            if (res.ok) {
              if (data.submitted) {
                toast.error("이미 신청서를 제출하셨습니다.");
                setTimeout(() => {
                    window.location.href = "https://dashboard.counterspellbusan.com";
                }, 3000);
            }
            }
          })
    }, [])

    return (
        <div id="join-us" className={className}>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div id="head">
                <a href="/">{"<"}</a>
                <h1>join us</h1>
                <div></div>
            </div>
            <progress value={nowProgress} max={8}/>

            <div id="mask">
                <div id="list" style={{ '--progress': nowProgress }}>
                    <div className="item">
                        <img src={Logo}/>
                        <h1>apply<br/>hackathon</h1>
                        <Ghost eyeX={-1} eyeY={1} size={80} id="ghost"/>
                    </div>
                    <div className="item">
                        <SurveyInput 
                            inputRef={name} 
                            title="이름이 무었인가요?" 
                            placeholder="홍길동 / Jack Marie" 
                            required
                            maxLength={255}
                            minLength={1}
                        />
                        <SurveyInput 
                            type="email" 
                            pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                            inputRef={email} 
                            title="이메일을 알려주세요" 
                            description="*참가자분들께 안내사항을 전달드릴 예정이예요!" 
                            placeholder="someone@example.com" 
                            required
                            minLength={1}
                        />
                        <SurveyInput 
                            inputRef={phone} 
                            pattern="^010-?\d{4}-?\d{4}$" 
                            title="전화번호를 알려주세요" 
                            description="*SMS 문자로 전화번호를 작성해주세요" 
                            placeholder="010-1234-5678"
                            maxLength={13}
                            required
                        />
                    </div>
                    <div className="item">
                        <SurveyInput 
                            inputRef={school} 
                            title="어느 학교에 다니시나요? (선택)" 
                            description="*자퇴 / 검정고시 등도 입력이 가능합니다" 
                            placeholder="금정고등학교"
                            maxLength={255}
                        />
                        <SurveyInput 
                            type="date" 
                            inputRef={birthdate} 
                            title="생년월일을 알려주세요" 
                            description="*만 14세 이상만 참가 가능합니다"
                            placeholder="2007-06-28" 
                            required
                            onChange={(e) => {
                                if (!validateAge(e.target.value)) {
                                    toast.error("만 14세 이상만 참가 가능합니다.");
                                    e.target.value = "";
                                }
                            }}
                        />
                    </div>
                    <div className="item">
                        <SurveyInput inputRef={city} title="도시" description="*또는 대략적인 지역" placeholder="부산" required/>
                        <SurveyAddr  inputRef={address} setPostalCode={setPostalCode} title="상세주소" description="*누르시면 외부 창으로 이동해요" placeholder="서울특별시 용산구 빙고로 137 (용산동6가)" disabled required/>
                        <SurveyInput inputRef={addressDetail} description="*추가 주소가 있는 경우에 입력해주세요" placeholder="?!?아파트 101동 1001호" required/>
                    </div>
                    <div className="item">
                        <SurveyInput 
                            inputRef={foodNote} 
                            title="음식관련 특이사항이 있으신가요? (선택)" 
                            description="*알레르기 특이사항이나 비건, 베지테리언 여부를 자유롭게 적어주세요" 
                            placeholder="없다면 칸을 비워두셔도 좋아요"
                            maxLength={255}
                        />
                        <SurveySelect 
                            options={[
                                ["Extra Small", "엑스트라 스몰"], 
                                ["Small", "스몰"], 
                                ["Medium", "미디엄"], 
                                ["Large", "라지"], 
                                ["Extra Large", "엑스트라 라지"]
                            ]} 
                            inputRef={tshirtSize} 
                            title="티셔츠 사이즈를 선택해주세요" 
                            description="*기념으로 티셔츠를 선물로 드릴 예정이예요" 
                            required
                        />
                    </div>
                    <div className="item">
                        <SurveyInput type="number" inputRef={hackathonExp} title="해커톤은 몇 번 참여해보셨나요?" placeholder="여기를 눌러 선택해주세요" required/>
                        <SurveyInput inputRef={experience} title="참가자의 관련 경험이 있나요? (선택)" placeholder="여기를 눌러 선택해주세요"/>
                        <SurveyInput inputRef={introduction} title="본인을 자유롭게 소개해주세요!" description="*자신의 분야와 관련된 경험을 작성해주세요" placeholder="진행해본 프로젝트, 실무경험, 공부한 내용 뭐든 좋아요!" required/>
                    </div>
                    <div className="item">
                        <SurveyInput 
                            inputRef={parentName} 
                            title="부모님 성함" 
                            placeholder="홍길동 / Jack Marie"
                            required
                            maxLength={255}
                            minLength={1}
                        />
                        <SurveyInput 
                            type="email" 
                            pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                            inputRef={parentEmail} 
                            title="부모님 이메일" 
                            description="*참가자분들께 안내사항을 전달드릴 예정이예요!" 
                            placeholder="someone@example.com"
                            required
                            minLength={1}
                        />
                        <SurveyInput 
                            inputRef={parentPhone} 
                            pattern="^010-?\d{4}-?\d{4}$" 
                            title="부모님 전화번호" 
                            description="*SMS 문자로 안내받는게 편하시다면 전화번호를 작성해주세요" 
                            placeholder="010-1234-5678"
                            required
                            maxLength={13}
                            minLength={1}
                        />
                    </div>
                    <div className="item">
                        <SurveyArea inputRef={questions} title="더 궁금한게 있으신가요? (선택)" placeholder="자유롭게 코멘트 남겨주세요!"/>
                    </div>
                    <div className="item">
                        <img src={Logo}/>
                        <h1>apply<br/>hackathon</h1>
                        <Ghost eyeX={-1} eyeY={1} size={80} id="ghost"/>
                    </div>
                </div>
            </div>
            <p id="back" onClick={() => {
                if (nowProgress > 0) {setPrograss(nowProgress - 1)}
            }} className={nowProgress!=0&&nowProgress!=8?"show":""}>뒤로가기</p>
            <div id="join-btn" className={nowProgress === 0 ? "go" : nowProgress === 8 ? "dash" : nowProgress === 7 ? "submit" : "next"} onClick={() => {
                let items = document.querySelectorAll(".item")[nowProgress].getElementsByClassName("main-input");
                for (let item of items) {
                    if (!item.checkValidity()) {
                        toast.error("입력값을 확인해주세요.");
                        item?.focus();
                        return;
                    }
                    if (item.pattern && !new RegExp(item.pattern).test(item.value)) {
                        toast.error("패턴이 올바르지 않습니다.");
                        item?.focus();
                        return;
                    }
                }

                if (nowProgress === 7) {
                    submitForm();
                }
                if (nowProgress < 8) setPrograss(nowProgress+1)
            }}>
                <p>GO</p>
                <p>다음</p>
                <p>제출</p>
                <p>대시보드로 가기</p>
            </div>
        </div>
    )
}


function SurveyInput({title, description, placeholder, inputRef, ...props}) {
    return <div className="survey-input">
        <h1>{title}</h1>
        <h2>{description}</h2>
        <input ref={inputRef} className="main-input" placeholder={placeholder} {...props}/>

    </div>
}


function SurveyAddr({title, description, placeholder, inputRef, setPostalCode, ...props}) {
    const open = useDaumPostcodePopup(postcodeScriptUrl);

    const handleComplete = (data) => {
        const fullAddress = `${data.sigungu} ${data.address} ${data.bname || ''} ${data.buildingName || ''}`.trim();
        inputRef.current.value = fullAddress;
        setPostalCode(data.zonecode);
    };

    const handleClick = () => {
        open({onComplete: handleComplete});
    }
    return <div className="survey-input">
        <h1>{title}</h1>
        <h2>{description}</h2>
        <div>
            <input type="text" ref={inputRef} id="addr" placeholder={placeholder} className="main-input" {...props}/>
            <input type="button" value={"찾기"} onClick={handleClick}/>
        </div>

    </div>
}


function SurveyArea({title, description, placeholder, inputRef}) {
    return <div className="survey-input">
        <h1>{title}</h1>
        <h2>{description}</h2>
        <textarea ref={inputRef} className="main-input" placeholder={placeholder} required></textarea>
    </div>
}

function SurveySelect({title, description, placeholder, inputRef, options}) {
    return <div className="survey-input">
        <h1>{title}</h1>
        <h2>{description}</h2>
        <select name="" id="" ref={inputRef} className="main-input" aria-placeholder={placeholder}>
            {options.map((option) => <option value={option[0]}>{option[1]}</option>)}
        </select>
    </div>
}
