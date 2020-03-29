(function() {
	const DOM = {
		form: {
			root: document.querySelector('form'),
			nameField: document.querySelector('form')['name'],
			emailField: document.querySelector('form')['email'],
			messageField: document.querySelector('form')['message'],
			submitButton: document.querySelector('form')['submit'],
		},
		alertContainer: document.querySelector('.alert__container'),
	};

	const Template = {
		alert: function(type, message) {
			const div = document.createElement('div');
			div.classList.add('alert');
			if (type === 'success') {
				div.classList.add('alert--success');
			} else {
				div.classList.add('alert--failure');
			}

			div.dataset.alertnum = Template.alertnum;
			Template.alertnum++;
			div.innerText = message;
			return div;
		},
		alertnum: 0,
	};

	const Controller = {
		validation: {
			validateName: function(name) {
				if (name === '') {
					return {
						error: 'Name field can not be empty.',
					};
				} else if (/\d+/.test(name)) {
					return {
						error: 'Name field can not contain Numbers',
					};
				} else {
					return {
						success: 1,
					};
				}
			},
			validateEmail: function(email) {
				if (email === '') {
					return {
						error: 'Email field can not be empty.',
					};
				} else if (
					!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
				) {
					return {
						error: 'Email is invalid.',
					};
				} else {
					return {
						success: 1,
					};
				}
			},
			validateMessage: function(message) {
				if (message === '') {
					return {
						error: 'Message field can not be empty.',
					};
				} else {
					return {
						success: 1,
					};
				}
			},
		},
		clearAlert: function(alertContainer) {
			Array.from(alertContainer.children).forEach((child, index) => {
				setTimeout(function() {
					console.log(child + ' is removed');
					child.parentNode.removeChild(child);
				}, 3000 + index * 1000);
			});
		},
	};

	DOM.form.submitButton.addEventListener('click', function(e) {
		e.preventDefault();
		let name = DOM.form.nameField.value;
		let email = DOM.form.emailField.value;
		let message = DOM.form.messageField.value;

		let validatedName = Controller.validation.validateName(name);
		let validatedEmail = Controller.validation.validateEmail(email);
		let validatedMessage = Controller.validation.validateMessage(message);

		if (validatedName.error) {
			DOM.alertContainer.insertAdjacentElement(
				'beforeend',
				Template.alert('failure', validatedName.error),
			);
		} else {
			DOM.alertContainer.insertAdjacentElement(
				'beforeend',
				Template.alert('success', 'Name field is validated'),
			);
		}
		if (validatedEmail.error) {
			DOM.alertContainer.insertAdjacentElement(
				'beforeend',
				Template.alert('failure', validatedEmail.error),
			);
		} else {
			DOM.alertContainer.insertAdjacentElement(
				'beforeend',
				Template.alert('success', 'Name field is validated'),
			);
		}
		if (validatedMessage.error) {
			DOM.alertContainer.insertAdjacentElement(
				'beforeend',
				Template.alert('failure', validatedMessage.error),
			);
		} else {
			DOM.alertContainer.insertAdjacentElement(
				'beforeend',
				Template.alert('success', 'Message field is validated'),
			);
		}
		Controller.clearAlert(DOM.alertContainer);
	});
})();
