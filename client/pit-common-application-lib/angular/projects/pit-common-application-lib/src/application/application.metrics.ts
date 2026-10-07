export const applicationMetrics = [
    {
        selector: 'pit-application, .pit-dialog',
        variables: {
            '--pit-colour-blue': '#003366',
            '--pit-colour-white': '#ffffff',
            '--pit-colour-light-grey': '#c6c8cb',
            '--pit-colour-lighter-grey': '#f2f2f2',
            '--pit-colour-disabled-background': 'rgba(0, 0, 0, 0.06)',

            '--pit-header-background-color': '#003366',
            '--pit-header-color': 'white',
            '--pit-header-border-color': '#FCBA19',
            '--pit-header-environment-color': '#fcba19',

            '--pit-menu-expanded-width': '250px',
            '--pit-menu-collapsed-width': '50px',
            '--pit-menu-icon-size': '24px',
            '--pit-menu-icon-color': 'rgba(0, 0, 0, 0.9)',
            '--pit-menu-item-row-height': '48px',

            '--pit-menu-color': '#454545',
            '--pit-menu-background-color': '#f2f2f2',

            '--pit-menu-highlight-background-color': '#ddd',

            '--pit-menu-active-color': '#003366',
            '--pit-menu-active-font-weight': '600',
            '--pit-menu-active-background-color': '#ddd',

            '--pit-icon-size-small': '24px',
            '--pit-icon-size-medium': '32px',
            '--pit-gutter': '16px',

            '--pit-font-family-main': '"BCSans", "Noto Sans", Verdana, Arial, sans-serif',

            '--pit-font-size': '15px',          
            '--pit-font-size-emphasis': '17px',
            '--pit-font-weight-emphasis': '400',
            '--pit-font-weight-emphasis-more': '600',
            '--pit-border-radius': '5px',

            '--pit-colour-active-tab': '#ffffff',
            '--pit-colour-inactive-tab': '#f2f2f2',

            '--pit-menu-bar-background-color': '#355992',
            '--pit-menu-bar-font-weight': '16',
            '--pit-menu-bar-item-row-height': '20px',
            '--pit-menu-bar-divider-color': '#9b9b9b',

            '--pit-footer-background-color': '#003366',
            '--pit-footer-item-row-width': '150px',           
        },
    },
    {
        selector: 'pit-application.device-desktop, .pit-dialog .desktop',
        variables: {
            '--pit-header-height': '72px',
            '--pit-header-bcservice-logo-height': '40px',
            // '--pit-header-wildfire1-logo-height': '40px',
        }
    },
    {
        selector: 'pit-application.device-mobile, .pit-dialog .mobile',
        variables: {
            '--pit-header-height': '48px',
            '--pit-header-bcservice-logo-height': '30px',
            // '--pit-header-wildfire1-logo-height': '30px',
            '--pit-menu-expanded-width': '220px',
            '--pit-gutter': '8px',
        },
    }
]

