**pineapple-juice** is a simple customizable app that creates a navigator menu and shows pages inside an `iframe`. [Click here for a demo version](http://mastro-elfo.github.io/pineapple-juice/ "Pineapple-Juice demo version").

#  How to customize

##  Configuration
First of all you need to define the navigator menu. This can be done by editing the file `config/config.json`. This file contains an `array` of objects with the following rules.

### name
Defines the name that will be displayed in the menu and in the top header. It accepts `HTML` tags and entities.

### description
Defines a little description of the link that is displayed under the name in menu. It accepts `HTML` tags and entities.

### icon
Defines the `src` attribute of an `img` tag in menu.

### icon-alt
Defines the `alt` attribute of an `img` tag in menu. It accepts `HTML` entities.

### title
Defines the `title` attribute of the menu item. This is useful only for pc.

### src
Defines the `src` attribute of the `iframe` tag used to display the page. Warning: some site can't be displayed inside an `iframe`.

### selected
Defines the default selected item that will be automatically opened on load.

### header-background
Defines the background color of the top header. It accepts any `CSS` color type.

### header-color
Defines the foreground color of the top header. It accepts any `CSS` color type.

## Style
Style can be customized by editing the file `css/style.css`.

## Application cache
Add the lines to cache the menu items icons in file `manifest.appcache`.