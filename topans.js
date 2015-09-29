$(document).ready( function() {
	$('.inspiration-getter').submit( function(event){
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='answerers']").val();
		getTopAnswered(tags);
	});
});

// this function takes the question object returned by StackOverflow 
// and creates new result to be appended to DOM
var showTopUser = function(topUser) {
	
	// clone our result template code
	var result = $('.reputationTemplate .reputation').clone();
	
	// Set the top user name in result
	var userName = result.find('.userName');
	userName.text(topUser.user.display_name);

	// Set the top user reputation
	var userRep = result.find('.userReputation');
	userRep.text(topUser.user.reputation);	

	// Set the top user post count
	var userPosts = result.find('.userPosts');
	userPosts.text(topUser.post_count);	

	return result;
};


// this function takes the results object from StackOverflow
// and creates info about search results to be appended to DOM
var showSearchResults = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query;
	return results;
};

// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};


// takes a string of semi-colon separated tags to be searched
// for on StackOverflow
var getTopAnswered = function(tags) {
	
	// the parameters we need to pass in our request to StackOverflow's API
	var request = {site: 'stackoverflow'};

	var result = $.ajax({
		url: "http://api.stackexchange.com/2.2/tags/" + tags + "/top-answerers/all_time",
		data: request,
		dataType: "jsonp",
		type: "GET",
		}).done(function(result){
		var searchResults = showSearchResults(tags, result.items.length);

		$('.search-results').html(searchResults);

		$.each(result.items, function(i, item) {
			var topUser = showTopUser(item);
			$('.results').append(topUser);
		});
	}).fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
	
};



