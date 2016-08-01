Template.modal.events({
    'click .new-post':function(e){
        e.preventDefault();
        var profileUser = Meteor.user();
        var currentUser = Meteor.user();
        var story = $('textarea[name="new-post"]').val();      
        if(story.length) {
            Stories.insert({
                createdBy: currentUser._id,
                createdFor: profileUser._id,
                userImage: null,
                storyImage: null,
                storyText: story,
                creatorName: currentUser.profile.firstname + " " + currentUser.profile.lastname,
                creatorUsername: currentUser.profile.username,
                creatorThumbnail: null,
                createdForName: profileUser.profile.firstname + " " + profileUser.profile.lastname,
                createdForUsername: profileUser.profile.username,
                //createdForThumbnail: profileUser.profile.picture.thumbnail,
                likes: [],
                createdAt: new Date(),
                comments: []
            });
            $('textarea[name="new-post"]').val("");
        }

    }
})
