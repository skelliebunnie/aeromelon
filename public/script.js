$("document").ready(function() {
	$.get("/api/users", function(res) {
		listUsers(res);
	});

	$("button, input").click(function() {
		$("#warning").remove();
	});

	function listUsers(data) {
		$("#usersList").empty();
		for(var i in data) {
			let item = $("<li>", {class: "user-item"});
			item.attr("data-user-id", data[i].id);
			let user = $("<span>");
			user.text(data[i].name);

			if(data[i].isStudent) {
				user.prepend("<i class='fad fa-user-astronaut'></i>");
			} else {
				user.prepend(`<i class='fad fa-user-ninja'></i>`);
			}
			item.append(user);
			item.append(`<i class='fad fa-times' data-user-id='${data[i].id}'></i>`);

			$("#usersList").append(item);
		}
	}

	$("#getUser").click(function() {
		let name = $("#name").val().trim();

		if(name !== "") {
			$.get(`/api/users/${name}`, function(res) {
				listUsers(res);
			});
		} else {
			$("#usersList").before("<h3 id='warning'>Please provide a name!</h3>");
		}
	});

	$("#getAllUsers").click(function() {
		{
			$.get(`/api/users`, function(res) {
				listUsers(res);
			});
		}
	});

	$("#addUser").click(function(e) {
		e.preventDefault();

		let name = $("#name").val();

		if(name !== "") {
			const user = {
				name: name,
				isStudent: $("#isStudent").is(":checked") ? "student" : "instructor"
			};

			$.post({
				url: '/api/users',
				data: user
			}).then(function(res) {
				listUsers(res);
			});
		}

	});


	$("body").on("click", ".fa-times", function() {
		let id = $(this).data("user-id");

		$.ajax({
			url: `/api/users/${id}`,
			method: "DELETE"
		}).then(function(res) {
			listUsers(res);
		});
	});

});