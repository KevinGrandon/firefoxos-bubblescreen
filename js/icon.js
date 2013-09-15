(function() {
	// Apps container
	var parent = document.getElementById('apps');

	/**
	 * Represents a single app icon on the homepage.
	 */
	function Icon(app, entryPoint) {
		this.app = app;
		this.entryPoint = entryPoint;
	}

	Icon.prototype = {

		get name() {
			return this.descriptor.name;
		},

		get icon() {
			if (!this.descriptor.icons) {
				return '';
			}
			for (var i in this.descriptor.icons) {
				return this.descriptor.icons[i];
			}
		},

		get descriptor() {
			if (this.entryPoint) {
				return this.app.manifest.entry_points[this.entryPoint];
			}
			return this.app.manifest;
		},

		get identifier() {
			var identifier = [this.app.origin];

			if (this.entryPoint) {
				identifier.push(this.entryPoint);
			} else {
				identifier.push(0);
			}

			return identifier.join('-');
		},

		/**
		 * Renders the icon to the container.
		 */
		render: function() {
			if (!this.icon) {
				return;
			}

			var tile = document.createElement('div');
			tile.className = 'tile';
			tile.dataset.identifier = this.identifier;
			tile.style.backgroundImage = 'url(' + this.app.origin + this.icon + ')';

			parent.appendChild(tile);
		},

		/**
		 * Launches the application for this icon.
		 */
		launch: function() {
			if (this.entryPoint) {
				this.app.launch(this.entryPoint);
			} else {
				this.app.launch();
			}
		}
	};

	window.Icon = Icon;

}());
