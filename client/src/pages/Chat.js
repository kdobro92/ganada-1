// import { IoMdSend } from 'react-icons/io';
// import axios from 'axios';
// import { useEffect, useState, useRef } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import Picker from 'emoji-picker-react';
// import { MdInsertEmoticon } from 'react-icons/md';
// import { io } from 'socket.io-client';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { register } from 'timeago.js';
// import ChatRooms from '../components/Chats/ChatRooms';
// import Message from '../components/Chats/Message';
// import Reservation from '../components/Chats/Reservation';
// import MessageNull from '../components/Chats/MessageNull';
// import RecieverName from '../components/Chats/RecieverName';
// import { setChatMessage } from '../redux/chatSlice';
// import { setChatRoom } from '../redux/chatRoomSlice';

// export default function Chat({ setReservationModal, setModal }) {
//   const socket = useRef();
//   const inSection = useRef();
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [chatUserInfo, setChatUserInfo] = useState({});
//   const [newMessage, setNewMessage] = useState('');
//   const [showEmoji, setShowEmojij] = useState(false);
//   const { chatRoomId } = useParams();
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const userInfo = useSelector((state) => state.userInfo);
//   const message = useSelector((state) => state.chatMessage).data;
//   const chatRooms = useSelector((state) => state.chatRoom).data;
//   const chatBoard = useSelector((state) => state.chatBoard).data;

//   useEffect(() => {
//     socket.current = io(`${process.env.REACT_APP_API_URL}`);
//   }, [token]);

//   useEffect(() => {
//     socket.current.on('receiveMessage', (data) => {
//       const { chats, userId, chatroomId, updatedAt, boardId } = data;
//       setArrivalMessage({
//         userId,
//         chats,
//         chatroomId,
//         updatedAt,
//         boardId,
//       });
//     });
//   }, [token, socket]);

//   useEffect(() => {
//     socket.current.emit('join', { chatroomId: chatRoomId });
//   }, [chatRoomId, token]);

//   useEffect(() => {
//     arrivalMessage && dispatch(setChatMessage([arrivalMessage, ...message]));
//   }, [arrivalMessage, chatRoomId, token]);

//   useEffect(() => {
//     const getMessage = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_API_URL}/chatContents/${chatRoomId}}`,
//           {
//             headers: { authorization: `Bearer ${token}` },
//           },
//           { withCredentials: true },
//         );
//         dispatch(setChatMessage(res.data.checkChatContents));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMessage();
//   }, [chatRoomId, token, chatUserInfo, dispatch, socket]);

//   useEffect(() => {
//     const getChatRooms = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_API_URL}/chatRooms/`,
//           {
//             headers: { authorization: `Bearer ${token}` },
//           },
//           { withCredentials: true },
//         );
//         dispatch(setChatRoom(res.data.data));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getChatRooms();
//   }, [token, arrivalMessage, chatRoomId]);

//   const sendMessage = (e) => {
//     if (newMessage === '' || newMessage === '\n') {
//       setNewMessage('');
//     } else {
//       const data = {
//         chats: newMessage,
//         userId: userInfo.id,
//         chatroomId: chatRoomId,
//         updatedAt: new Date(Date.now()),
//         boardId: chatBoard.id,
//       };
//       socket.current.emit('sendMessage', data);
//       setNewMessage('');
//     }
//   };

//   useEffect(() => {
//     const onClick = (e) => {
//       if (inSection.current && !inSection.current.contains(e.target)) {
//         setShowEmojij(false);
//       }
//     };

//     document.addEventListener('mousedown', onClick);
//   }, [chatRoomId]);

//   const emojiShowHide = () => {
//     setShowEmojij(!showEmoji);
//   };

//   const handleEmojiClick = (e, emojiObject) => {
//     let msg = newMessage;
//     msg += emojiObject.emoji;
//     setNewMessage(msg);
//   };

//   useEffect(() => {
//     socket.current.emit('sendNotification', {
//       chatroomId: chatRoomId,
//       arrivalMessage,
//     });
//   }, [token, arrivalMessage, chatRoomId]);

//   // 자동 textaarea높이 지정
//   const autoResizeTextarea = () => {
//     const textarea = document.querySelector('.autoTextarea');
//     if (textarea) {
//       textarea.style.height = 'auto';
//       const height = textarea.scrollHeight;
//       textarea.style.height = `${height + 3}px`;
//     }
//   };

//   const localeFunc = (number, index, totalSec) => {
//     return [
//       ['방금 전', 'right now'],
//       ['1분전', 'in 1 minute'],
//       ['%s분전', 'in %s minutes'],
//       ['1시간전', 'in 1 hour'],
//       ['%s시간전', 'in %s hours'],
//       ['1일전', 'in 1 day'],
//       ['%s일전', 'in %s days'],
//       ['1주전', 'in 1 week'],
//       ['%s주전', 'in %s weeks'],
//       ['1달전', 'in 1 month'],
//       ['%s달전', 'in %s months'],
//       ['1년전', 'in 1 year'],
//       ['%s년전', 'in %s years'],
//     ][index];
//   };
//   register('ko', localeFunc);

//   return (
//     <div className="chat">
//       <div className="back">
//         <div className="inner">
//           <div className="chat-rooms">
//             <div className="chat-rooms-wrraper">
//               <div className="nickname"> {userInfo.name} </div>
//               <div className="chatRooms">
//                 {chatRooms &&
//                   chatRooms.map((chatRoom) => (
//                     <Link
//                       to={`${chatRoom.id}`}
//                       onClick={(e) => setChatUserInfo(chatRoom)}
//                     >
//                       <ChatRooms chatRoom={chatRoom} />
//                     </Link>
//                   ))}
//               </div>
//             </div>
//           </div>
//           <div className="chat-message">
//             <div className="chat-message-wrraper">
//               {chatRoomId ? (
//                 <>
//                   <RecieverName message={message} chatUserInfo={chatUserInfo} />
//                   <Reservation
//                     setReservationModal={setReservationModal}
//                     setModal={setModal}
//                     chatRoomId={chatRoomId}
//                     arrivalMessage={arrivalMessage}
//                   />
//                 </>
//               ) : null}
//               <div className="messages">
//                 {chatRoomId ? (
//                   message &&
//                   message.map((chat) => (
//                     <Message
//                       chatRoomId={chatRoomId}
//                       chat={chat}
//                       reverse={chat.userId !== userInfo.id}
//                       chatRooms={chatRooms}
//                     />
//                   ))
//                 ) : (
//                   <MessageNull />
//                 )}
//               </div>
//               {chatRoomId ? (
//                 <div className="send-chat-input">
//                   <div className="emoji" ref={inSection}>
//                     {showEmoji && <Picker onEmojiClick={handleEmojiClick} />}
//                     <MdInsertEmoticon
//                       size="24"
//                       color="grey"
//                       onClick={emojiShowHide}
//                     />
//                   </div>
//                   <form className="input-wrraper">
//                     <textarea
//                       placeholder="메시지를 입력하세요"
//                       rows="1"
//                       className="autoTextarea"
//                       onKeyDown={autoResizeTextarea}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       value={newMessage}
//                       // eslint-disable-next-line react/jsx-no-duplicate-props
//                       onKeyUp={(e) =>
//                         e.key === 'Enter' && newMessage !== ''
//                           ? sendMessage(e)
//                           : null
//                       }
//                     />
//                     {chatRoomId ? (
//                       <button
//                         type="button"
//                         className={newMessage === '' ? 'send' : 'send active'}
//                         onClick={sendMessage}
//                       >
//                         <IoMdSend size="30" />
//                       </button>
//                     ) : null}
//                   </form>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
