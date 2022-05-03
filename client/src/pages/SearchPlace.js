import { useState, useEffect } from 'react';
import PlaceList from '../components/Place-list/PlaceList';
import KakaoMap from '../components/Place-list/KakaoMap';
import SubNav from '../components/Place-list/SubNav';
import Pagination from '../components/Place-list/Pagination';
import { data, sample } from '../assets/dummyData';

function SearchPlace() {
  const [posts, setPosts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [tags, setTags] = useState([]);
  const [postsPerPage] = useState(8);
  // get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    // setLoading(true);
    // console.log('axios 데이터 요청');
    // setLoading(false);
    // console.log(tags); //에러
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="place-list-container">
      <SubNav />
      <div className="wrapper">
        <div className="place-list">
          {currentPosts.map((post) => {
            return <PlaceList key={post.id} post={post} />;
          })}
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
        <KakaoMap data={sample} />
      </div>
    </div>
  );
}

export default SearchPlace;
