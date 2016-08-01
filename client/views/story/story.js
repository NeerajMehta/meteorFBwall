Template.story.events({
    'click .like':function(e) {
        e.preventDefault();
        var story = Blaze.getData(e.currentTarget);
        var liker = Meteor.user();
        var likeData = {name: liker.profile.firstname + " " + liker.profile.lastname};
        var alreadyLiked = _.findWhere(story.likes, likeData);
        if(!alreadyLiked){
            Stories.update({_id: story._id}, {$push:{likes: likeData}});
        } else {
            Stories.update({_id: story._id}, {$pull:{likes:likeData}});
        }
    }    
})
Template.story.events({
    'click .new-comment': function (e) {
        e.preventDefault();
        var story = Blaze.getData(e.currentTarget);
        var commenter = Meteor.user();
        var commentmsg = $("#new_comment").val();
        if (commentmsg.length) {
            var commentData = { name: commenter.profile.firstname + " " + commenter.profile.lastname, commentMsg: commentmsg };
            var alreadycomment = _.findWhere(story.comments, commentData);
            if (!alreadycomment) {
                Stories.update({ _id: story._id }, { $push: { comments: commentData } });
            } else {
                Stories.update({ _id: story._id }, { $pull: { comments: commentData } });
            }
            $("#new_comment").val("");
        }
    }
})

Template.story.helpers({
    status:function(){
        return this.createdFor === this.createdBy;
    },
    getComment:function (storyId) {
        var story = Stories.findOne({ _id: storyId });
        var comments = story.comments;      
        if (!comments.length) {
        }
        else {
            return comments[0].commentMsg;
        }
    },
    getCommenterName: function (storyId) {
        var story = Stories.findOne({ _id: storyId });
        var comments = story.comments;
        if (!comments.length) {
        }
        else {
            return comments[0].name;
        }
    },
    likeCount:function(storyId){
        var story = Stories.findOne({_id: storyId});
        var likes = story.likes;       
        if(!likes.length) {
            return "Nobody has liked this post yet.";
        } else if(likes.length <= 3) {
            var string = "";
            switch (likes.length) {
                case 1:
                    return likes[0].name + " likes this";
                    break;
                case 2:
                    return likes[0].name + " and " + likes[1].name + " like this";
                    break;
                case 3:
                    return likes[0].name + ", " + likes[1].name + " and " + likes[2].name + " like this";
                break;
            }

        } else {
            var correctLength = likes.length - 3;
            var correctOther;
            if(correctLength === 1) {
                correctOther = " other person likes this";
            } else {
                correctOther = " other people like this";
            }
            return likes[0].name + ", " + likes[1].name + ", " + likes[2].name + " and " + correctLength + correctOther;
        }

    }
})
