import React from 'react';

const SocialFeed = () => {
  return (
    <div>
      {/* Social Feed Content */}
      <div className="container mt-5">
        <h2 className="fw-bold text-dark text-center">Latest Posts</h2>
        <div className="mt-4">
          {/* Post 1 */}
          <div className="post p-3 mb-4 border shadow-sm bg-white">
            <p><strong>User1:</strong> Just bought amazing wireless headphones!</p>
          </div>
          
          {/* Post 2 */}
          <div className="post p-3 mb-4 border shadow-sm bg-white">
            <p><strong>User2:</strong> Anyone tried the new smartphone case?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialFeed;
