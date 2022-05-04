import { AiOutlineSearch, AiOutlineMessage } from 'react-icons/ai';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { FaUserCircle, FaRegEdit } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header({ handleLogout, userInfo, isLogin }) {
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isTrue, setIsTrue] = useState(false);

  const onClick = () => {
    setIsTrue(!isTrue);
  };
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });
  // 헤더 숨길 경로
  const hideHeader = ['/login', '/signup', '/write'];
  if (hideHeader.includes(location.pathname)) {
    return null;
  }

  if (isLogin) {
    return (
      <header className={scrollPosition ? 'header-active' : ''}>
        <div className="inner">
          <div className="nav">
            <div className="logo">
              <Link to="/">GANADA</Link>
            </div>
            <form className="search-input">
              <input
                type="text"
                name="search"
                placeholder="어디로 촬영 가시나요?"
              />
              <button type="submit">
                <AiOutlineSearch className="search-button" alt="Submit Form" />
              </button>
            </form>
            <ul className="right-header">
              <li className="left-chat">
                <Link to="/chat">
                  <AiOutlineMessage size="30" />
                </Link>
              </li>
              <div className="drop-menu " role="presentation" onClick={onClick}>
                <div className="profile">
                  <img
                    src="https://static.nid.naver.com/images/web/user/default.png?type=s160"
                    alt=""
                  />
                </div>
                <div className={isTrue ? 'list active' : 'list'}>
                  <h3>
                    {userInfo.name}님 <br />
                    <span>환영합니다!</span>
                  </h3>
                  <ul>
                    <li>
                      <FaUserCircle size="20" color="grey" className="icon" />
                      <Link to="/mypage/edit">마이페이지</Link>
                    </li>
                    <li>
                      <FaRegEdit size="20" color="grey" className="icon" />
                      <Link to="/">내가쓴글</Link>
                    </li>
                    <li>
                      <RiLogoutBoxRLine
                        size="20"
                        color="grey"
                        className="icon"
                      />
                      <Link to="/" onClick={handleLogout}>
                        로그아웃
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className={scrollPosition ? 'header-active' : ''}>
      <div className="inner">
        <div className="nav">
          <div className="logo">
            <Link to="/">GANADA</Link>
          </div>
          <form className="search-input">
            <input
              type="text"
              name="search"
              placeholder="어디로 촬영 가시나요?"
            />
            <button type="submit">
              <AiOutlineSearch className="search-button" alt="Submit Form" />
            </button>
          </form>
          <ul className="right-header">
            <li className="before">
              <Link to="/login">로그인</Link>
            </li>
            <li className="before">
              <Link to="/signup">회원가입</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
