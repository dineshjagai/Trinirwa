import { 
    getUserInformation,
    addInterest,
    deleteInterest,
    fetchTweets,
    fetchAllTweets,
    fetchAllTweetsPaginated,
    getTweetCount,
    getProfileData,
    getFollowers,
    getTweets,
    getFriends,
    blockFollower,
    getBlockedFollowers,
    unBlockUser,
    getUsername,
    getAvatar,
    addTweet,
    addComment,
    getAllCommentsForTweet,
    updateTweetComments,
    updateComment,
    deleteComment,
    followUser,
    unfollowUser,
    fetchAllFollowers,
    fetchFollowers,
    searchFriend,
    deleteTweet,
    hideTweet,
    updateTweetLikes,
    updateTweetBlocks,
    isLiked,
    likeTweet,
    unLikeTweet,
    addMessage,
    fetchMessages,
    deactivateProfile,
    reactivateProfile,
    resetPassword,
    updatePassword,
    addUser,
    getUid,
    userLogin,
    addProfilePicture,
    getHiders
    } from '../components/Module';

test('test getUid', () => {
    getUid('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test userLogin', () => {
    userLogin('isimbi', 'Ana@124');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test addProfilePicture', () => {
    addProfilePicture('isimbi', 'Ana.png');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test getHiders', () => {
    getHiders(1);
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test addUser', () => {
    addUser('isimbi', 'Ana@123', 'Ana', 'Bizi', 'a@gmail.com');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test resetPassword', () => {
    resetPassword('isimbi', 'Ana@124');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test updatePassword', () => {
    updatePassword('isimbi', 'Ana@123', 'Ana@124');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test deactivateProfile', () => {
    deactivateProfile(1, 'Ana@123');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test reactivateProfile', () => {
    reactivateProfile(1, 'Ana@123');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test getUserInformation', () => {
    getUserInformation('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test addInterest', () => {
    addInterest('me','isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test deleteInterest', () => {
    deleteInterest('me','isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test fetchTweets', () => {
    fetchTweets('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test fetchAllTweets', () => {
    fetchAllTweets('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test fetchAllTweetsPaginated', () => {
    fetchAllTweetsPaginated('isimbi', 1, 5);
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test getTweetCount', () => {
    getTweetCount('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test getProfileData', () => {
    getProfileData('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test getFollowers', () => {
    getFollowers('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test getTweets', () => {
    getTweets('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test getFriends', () => {
    getFriends('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test blockFollower', () => {
    blockFollower(1, 'berwa');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test getBlockedFollowers', () => {
    getBlockedFollowers('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test unBlockUser', () => {
    unBlockUser('isimbi', 'berwa');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test getUsername', () => {
    getUsername(1260);
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test getAvatar', () => {
    getAvatar('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test addTweet', () => {
    addTweet('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test addComment', () => {
    addComment('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test getAllCommentsForTweet', () => {
    getAllCommentsForTweet(23);
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test updateTweetComments', () => {
     updateTweetComments(23, 23);
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test updateComment', () => {
     updateComment(23, "Hey");
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test deleteComment', () => {
     deleteComment(23);
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test followUser', () => {
     followUser(23, 'isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test unfollowUser', () => {
     unfollowUser(23, 'isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test fetchFollowers', () => {
    fetchFollowers(23);
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test fetchAllFollowers', () => {
    fetchAllFollowers('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test searchFriend', () => {
    searchFriend('isimbi', 'input');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test deleteTweet', () => {
    deleteTweet(23);
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test hideTweet', () => {
    hideTweet(23, 'isimbib');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test updateTweetLikes', () => {
    updateTweetLikes(23, 2);
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test updateTweetBlocks', () => {
    updateTweetBlocks(23, 2);
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test isLiked', () => {
    isLiked('isimbib', 2);
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test likeTweet', () => {
    likeTweet('isimbi', 2);
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test unlikeTweet', () => {
    unLikeTweet('isimbi', 2);
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test addMessage', () => {
    addMessage('isimbi');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});

test('test fetchMessages', () => {
    fetchMessages('isimbi', 'berwa');
    //expect(isValidPassword('Anaick@123')).toBe(true);
});



















