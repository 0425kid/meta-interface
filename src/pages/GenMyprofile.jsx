import React, { useState, useEffect } from "react";
import styles2 from "../styles/GenMyprofile.module.css";
import styles from "../styles/modules/CreateProject.module.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import OnLogModal from "../components/OnLogModal";
import Dot from "../components/Dot";
import SignInModal from "../components/SignInModal";
import SignUpModal from "../components/SignUpModal";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  // 팀 이름, 팀 소개, 프로젝트 설명, 모집 인원
  // 팀 구성원 추가
  // 팀 기술스택 추가
//   let plans = [
    
//   ];

//   let designs = [
    
//   ];
//   let options = [
    
//   ];

  const requestURL = `${window.baseURL}`;

  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUsers] = useState([]);
  const [interests, setInterests] = useState([]);
  const [addinter, setAddInter] = useState([]);
  const [interestIndex,setInterestIndex] = useState([]);
  const [userLogin, setUserLogin] = useRecoilState(userState);
  const [selectedValue, setSelectedValue] = useState(""); // 선택한 값을 저장할 상태 변수
  const [text, setText] = useState("");
  let [array, setArray] = useState([]);

  const [selectedOption1, setSelectedOption1] = useState(0);
  const [selectedOption2, setSelectedOption2] = useState(0);
  const [selectedOption3, setSelectedOption3] = useState(0);

  const [selectedIndex1, setSelectedIndex1] = useState(''); // 선택한 옵션의 index 값을 저장할 상태 변수
  const [selectedIndex2, setSelectedIndex2] = useState(''); // 선택한 옵션의 index 값을 저장할 상태 변수
  const [selectedIndex3, setSelectedIndex3] = useState(''); // 선택한 옵션의 index 값을 저장할 상태 변수

  const [plans,setPlans] = useState([]);
  const [designs,setDesigns]= useState(['디자인']);
  const [options,setOptions ]= useState(['개발']);

  const selectedValue1 = plans[selectedOption1];
  const selectedValue2 = designs[selectedOption2];
  const selectedValue3 = options[selectedOption3];

  const handleOption1Change = (event) => {
    setSelectedOption1(event.target.value);

    const selectedIndex = event.target.value; // 선택한 옵션의 index 값
    console.log(selectedIndex);
    setSelectedIndex1(selectedIndex);
    let num = parseInt(selectedIndex); // 정수로 변환

    dbJob(num);
  };

  const handleOption2Change = (event) => {
    setSelectedOption2(event.target.value);

    const selectedIndex = event.target.value; // 선택한 옵션의 index 값
    console.log("관심분야 인덱스다 이놈아"+selectedIndex);
    console.log("너는 무슨 형이니"+ typeof(selectedIndex));
    let num = parseInt(selectedIndex); // 정수로 변환
    console.log("너는 무슨 형이니"+ typeof(num));

    setSelectedIndex2(selectedIndex);

    dbJob(num);
  };

  const handleOption3Change = (event) => {
    setSelectedOption3(event.target.value);

    const selectedIndex = event.target.value; // 선택한 옵션의 index 값
    console.log(selectedIndex);
    setSelectedIndex3(selectedIndex);

    let num = parseInt(selectedIndex); // 정수로 변환

    dbJob(num);
    // dbJob();
    // console.log()
    //직무 이름에 해당하는 직무 id 가져오기 , 직무 db 저장하는 함수 호출하면서 직무 id넘겨주기
  };

  const navigate = useNavigate();

  const onClickButton = () => {
    setIsOpen(true);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value); // 선택한 값을 상태 변수에 저장
    const career =event.target.value;
    dbCareer(career);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    const txt = event.target.value;
    console.log(event.target.value);
    dbIntro(txt);
  };
  console.log();

  const userLoginString = userLogin.email.toString();

  useEffect(() => { //유저 기본정보 받아오기 / 유저 인덱스 = myArray[0]
    axios
      .post(requestURL+"userinfo", {
        "email": userLoginString
      })

      .then(function (res) {
        const myArray = Object.values(res.data);
        setUsers(myArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getInterests = async() => { //전체 관심분야, 직무 받아오기 

    await axios.get(requestURL+'userinfo/interested')
    .then(response => {
      // 요청이 성공한 경우
      const data = response.data;
      console.log(data);

      const filterData = data.filter(obj => obj.field_category === '기획')
                         .map(({ index, title }) => ({ index, title }));
      const filterData1 = data.filter(obj => obj.field_category === '개발')
                         .map(({ index, title }) => ({ index, title }));
      const filterData2 = data.filter(obj => obj.field_category === '디자인')
                         .map(({ index, title }) => ({ index, title }));
    
      const planfirst =[{"index":0,"title":"기획"}];
      const updatedPlans = [...planfirst, ...filterData];
      const aa = JSON.stringify(updatedPlans);
      console.log("기획이요"+aa);
      setPlans(updatedPlans);

      const designfirst =[{"index":0,"title":"디자인"}];
      const updatedDesigns = [...designfirst, ...filterData2];
      console.log("디자인이요"+updatedDesigns);
      setDesigns(updatedDesigns);

      const optionfirst =[{"index":0,"title":"개발"}];
      const updatedOptions = [...optionfirst, ...filterData1];
      console.log("개발이요"+updatedOptions);
      setOptions(updatedOptions);
    
    })
    .catch(error => {
      // 요청이 실패한 경우
      console.error(error);
    });
  }


  useEffect(() => {
    getInterests();
  }, []);


  const blockScroll = () => {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = "16px";
    document.body.style.backgroundColor = "white";
  };

  const freeScroll = () => {
    document.body.style.overflowY = "auto";
    document.body.style.paddingRight = "0px";

    // 다크모드와 화이트모드 다르게 설정 필요
    document.body.style.backgroundColor = "#111111";
  };

  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const openSignInModal = () => {
    setSignInModalOpen(true);
    blockScroll();
  };
  const closeSignInModal = () => {
    setSignInModalOpen(false);
    freeScroll();
  };

  // 회원가입창 팝업 관리 state
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
    blockScroll();
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
    freeScroll();
  };
  const handleButtonClick = () => {
    window.location.href = "/myprofile";
  };

  const userIndex = userData[0];

  const profileSave = () => {
    window.location.href = "/";
  };

  for(let i = 0; i<interests.length; i++){
    if (interests[i].title === selectedValue1){
        let interIndex = interests[i].index;
    }

  }

  //직무 db 저장
  const dbJob = (jobIndex) => {
    axios
    .post(requestURL+"userinfo/interested/put", {
      "name": userLoginString,
      "field_index": jobIndex
    })

    .then(function (res) {
      const myArray = Object.values(res.data);

      // setUsers(myArray);
      console.log("유저 직무 저장 성공------------");
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // useEffect(() => {
  //   dbJob();
  // }, []);

  //경력 저장
  const dbCareer = (career) => {
    axios
    .post(requestURL+"userinfo/put/career", {
      "index": userIndex,
      "career": career
    })

    .then(function (res) {
      const myArray = Object.values(res.data);

      // setUsers(myArray);
      console.log("유저 경력 저장 성공");
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // useEffect(() => {
  //   dbCareer();
  // }, []);

  //자기소개 저장
  const dbIntro = (intro) => {
    axios
    .post(requestURL+"userinfo/put/introduction", {
      "index": userIndex,
      "introduction": intro
    })

    .then(function (res) {
      const myArray = Object.values(res.data);

      // setUsers(myArray);
      console.log("유저 자기소개 저장 성공");
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // useEffect(() => {
  //   dbIntro();
  // }, []);

  const handleImageChange = () => {
    alert("추후에 추가될 예정입니다");
  };

  const option = {
    width: "300px",
    fontSize: "18px",
    borderRadius: "20px",
    padding: "10px",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
  };
  const option2 = {
    width: "600px",
    height: "200px",
    fontSize: "18px",
    borderRadius: "20px",
    padding: "10px",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
  };

  const option3 = {
    display: "flex",
    width: "150px",
    flexDirection: "row",
    gap: "20px",
  };

  const option4 = {
    display: "flex",
    height: "30px",
    flexDirection: "row",
    gap: "20px",
  };
  const txts = {
    color: "white",
  };

  return (
    <>
      <SignInModal
        open={signInModalOpen}
        close={closeSignInModal}
        openSignUpModal={openSignUpModal}
      ></SignInModal>
      <SignUpModal
        open={signUpModalOpen}
        close={closeSignUpModal}
      ></SignUpModal>
      <nav className={styles.navbar}>
        <span
          className={styles.navLink}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </span>
        {userLogin ? (
          <button
            className={styles.loginModal}
            onClick={() => {
              onClickButton();
            }}
          >
            {isOpen && (
              <OnLogModal
                open={isOpen}
                onClose={() => {
                  setIsOpen(false);
                }}
              />
            )}
            <img
              src="/public_assets/profileImg.png"
              width="44"
              height="44"
              alt="profile"
            />
            <img src="/public_assets/modal.png" alt="profile" />
          </button>
        ) : (
          <button className={styles.loginButton} onClick={openSignInModal}>
            <span>Login</span>
            <Dot />
          </button>
        )}
        <button onClick={handleButtonClick} className={styles.navLink}>
          Profile
        </button>
      </nav>
      <img src="/public_assets/VP.png" alt="darkModeBg" className={styles.VP} />
      <section className={styles.paddingSection}>
        <h1 className={styles.title}>{userData[1]}님 안녕하세요!</h1>

        <div className={styles.profileImg}>
          <span className={styles2.wrapper}>
            <img src="/public_assets/proex.png" />
            <p className={styles2.imgtxt} onClick={handleImageChange}>이미지 교체하기</p>
          </span>
        </div>

        <div className={styles2.name}>
          <div className={styles2.careearSelectWrapper}>
            <span className={styles2.middleFont}>경력</span>
            <div className={styles2.n}></div>
            <select
              style={option}
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="">선택하세요</option>
              {/* 1부터 10까지의 선택지 생성 */}
              {Array.from({ length: 10 }, (_, index) => (
                <option style={option} key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            {/* <p>선택한 값: {selectedValue.result}</p> */}
          </div>
        </div>
        <div className={styles2.basic}>
          <span className={styles2.middleFont}>자기소개</span>
          <div className={styles2.n}></div>
          <textarea style={option2} value={text} onChange={handleTextChange} />
          
        </div>
        <div className={styles2.basic}>
          <span className={styles2.middleFont}>직무(관심 분야)</span>
          <div className={styles2.n}></div>
          <div style={option4}>
          <select
            style={option3}
            value={selectedOption1}
            onChange={handleOption1Change}
            >
            {plans.map((option, index) => (
                <option key={index} value={option.index}>
                {option.title}
                </option>
            ))}
            </select>
            <br />
            <select
              style={option3}
              value={selectedOption2}
              onChange={handleOption2Change}
            >
              {designs.map((option, index) => (
                <option key={index} value={index}>
                  {option.title}
                </option>
              ))}
            </select>
            <br />
            <select
              style={option3}
              value={selectedOption3}
              onChange={handleOption3Change}
            >
              {options.map((option, index) => (
                <option key={index} value={index}>
                  {option.title}
                </option>
              ))}
            </select>
            <br />
            {/* <p style={txts}>직무선택 : </p> */}
            {/* {selectedValue1 && <p style={txts}>{selectedValue1.result}</p>}
            {selectedValue2 && <p style={txts}>{selectedValue2.result}</p>}
            {selectedValue3 && <p style={txts}>{selectedValue3.result}</p>} */}
          </div>
        </div>
        <div className="flex w-full justify-center gap-8">
          <button onClick={profileSave} className={styles.changeBtn}>
            수정반영
          </button>
        </div>
      </section>
    </>
  );
}
